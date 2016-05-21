#!/usr/bin/env node

var csv = require('csv');
var parse = require('csv-parse/lib/sync');
const fs = require('fs');
const vm = require('vm');
var program = require('commander');

program
    .version('0.0.1')
    .option('-c, --configDir [path]', 'Base path to config files.')
    .option('-o, --outputDir [path]', 'Directory for output files')
    .parse(process.argv);

/**
 * Callback which computes aggregates for each row in the input data and appends them.
 *
 * @param row
 *   row object which will be modified.
 * @param propertyName
 *   Name of property to be calculated
 * @property
 *   Value of property in config object (either an array, in which case it is calculated as a sum of the
 *   property names in that array, or a single value, in which case that value is used directly).
 */
var computeRowVariable = function(row, propertyName, property) {
    if (property instanceof Array) {
        row[propertyName] = property.reduce(function (previousValue, colName, curIndex, curArray) {
            if (row.hasOwnProperty(colName) && !isNaN(parseFloat(row[colName]))) {
                return previousValue + parseFloat(row[colName]);
            }
            else {
                return previousValue;
            }
        }, 0);

    }
    else {
        row[propertyName] = property;
    }

    // Convert numeric strings to numbers.
    if (!isNaN(Number.parseFloat(row[propertyName])) && isFinite(row[propertyName])) {
        row[propertyName] = Number.parseFloat(row[propertyName]);
    }
};

/**
 * Roll up rows into subtotals.
 *
 * Right now, this function assumes that each year-specific variable should just be summed for aggregation.
 *
 * @param yearConfig
 *   Year config object.
 *
 * @returns {Function}
 *   Reduce callback to be applied to the subset of rows which should be totaled.
 */
var computeTotals = function(yearConfig) {
    return function (runningTotal, curValue, curIndex, allRows) {
        if (curIndex === 0) {
            return curValue;
        }
        else {
            for (var property in yearConfig) {
                if (yearConfig.hasOwnProperty(property) && yearConfig[property] instanceof Array) {
                    runningTotal[property] += curValue[property];
                }
            }
            return runningTotal;
        }
    }
};

/**
 * Computes derived variables for each row.
 *
 * @param derivedVariables
 *   Object each of whose properties is either a function callback, or a static value.
 * @param row
 */
var computeDerivedVariables = function(derivedVariables, row) {
    for (var derivedVariable in derivedVariables) {
        if (typeof derivedVariables[derivedVariable] == 'function') {
            row[derivedVariable] = derivedVariables[derivedVariable](row);
            if (isNaN(row[derivedVariable])) {
                row[derivedVariable] = '-';
            }
        }
        else {
            row[derivedVariable] = derivedVariables[derivedVariable];
        }
        if (!isNaN(Number.parseFloat(row[derivedVariable])) && isFinite(row[derivedVariable])) {
            row[derivedVariable] = Number.parseFloat(row[derivedVariable]);
        }
    }
};

var timeSeriesCalculate = function(data, year, config, output) {
    var input = parse(data, {columns: true});

    // Append aggregate variables to each row object.
    for (propertyName in year) {
        if (year.hasOwnProperty(propertyName)) {
            input.map(function(row) {
                computeRowVariable(row, propertyName, year[propertyName])
            });
        }
    }

    // Loop through geography filter callbacks.
    for (filterCallback in config.geographyFilterCallbacks) {
        // Filter to get a subset of rows
        var rowSubset = input.filter(config.geographyFilterCallbacks[filterCallback]);

        // Roll up this subset.
        var callback = computeTotals(year);
        var rowSubsetTotal = rowSubset.reduce(callback);

        // Compute derived variables.
        computeDerivedVariables(config.derivedVariables, rowSubsetTotal);

        rowSubsetTotal.geography = filterCallback;

        // Filter down to just what should be in the headers.
        var outputRow = {};
        config.header.forEach(function (colname) {
            if (rowSubsetTotal.hasOwnProperty(colname)) {
                outputRow[colname] = rowSubsetTotal[colname];
            }
            else {
                outputRow[colname] = '-';
            }
        });

        output.push(outputRow);
    }
};

var processFile = function(config, outputFile) {
    var inputFilesRemaining = config.nhgisVariables.length;
    var outputRows = Array();
    config.nhgisVariables.forEach(
        function(item, index, array) {
            fs.readFile(config.basePath + '/' + item.filename, function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    timeSeriesCalculate(data, item, config, outputRows);
                }
                inputFilesRemaining -= 1;

                if (inputFilesRemaining == 0) {
                    outputRows.sort(function (a, b) {
                        if (Number(a.year) - Number(b.year) != 0) {
                            return Number(a.year) - Number(b.year);
                        }
                        else {
                            return a.geography > b.geography ? 1 :
                                (a.geography < b.geography ? -1 : 0);
                        }
                    });
                    writeOutput(config.header, outputRows, outputFile);
                }
            });
        }
    );
};

var writeOutput = function(header, rows, file) {
    var outputStringify = csv.stringify({ quotedString: true });

    outputStringify.on('readable', function() {
        while (row = outputStringify.read()) {
            file.write(row);
        }
    });

    // Final callback after no more data is being pushed to the stream.
    outputStringify.on('finish', function() {
        if (typeof(program.outputDir) != 'undefined') {
            file.end();
        }
    });

    outputStringify.write(header);
    rows.forEach(function (item) { outputStringify.write(item); });
    outputStringify.end();
};

if (program.configDir === 'undefined') {
    console.error('No config directory specified.');
    process.exit(1);
}
else {
    fs.readdir(__dirname + '/' + program.configDir, function(err, files) {
       files.forEach(function (filePath, index, array) {
           if (filePath.endsWith(".js")) {
               try {
                   var includeInThisContext = function (path) {
                       var code = fs.readFileSync(path);
                       vm.runInThisContext(code, path);
                   }.bind(this);
                   includeInThisContext(__dirname + '/' + program.configDir + '/' + filePath);
               }
               catch (e) {
                   console.error("Error in reading config file");
                   console.error(e);
               }

               // Check if outputdir is specified.
               var outputFile;
               if (typeof program.outputDir === 'undefined') {
                   outputFile = process.stdout;
               }
               else {
                   outputFile = fs.createWriteStream(__dirname + '/' + program.outputDir + '/' + filePath.substr(0, filePath.length - 3) + '.csv');
               }
               processFile(config, outputFile);
           }
        });
    });
}


