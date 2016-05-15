#!/usr/bin/env node

var csv = require('csv');
var parse = require('csv-parse/lib/sync');
const fs = require('fs');
const vm = require('vm');
var program = require('commander');

program
    .version('0.0.1')
    .option('-c, --baseDir [path]', 'Base path to config files.')
    .option('-o, --outputDir [filename]', 'Directory for output files')
    .parse(process.argv);

var timeSeriesCalculate = function(data, year, config, output) {
        var input = parse(data, {columns: true});
        var yearDataBase = input.filter(function(a) {
            return (a.GISJOIN == year.gisjoin);
        })[0];

        var yearOutput = {};
        config.header.forEach(
            function(property, index, array) {
                if (year.hasOwnProperty(property)) {
                    if (year[property] instanceof Array) {
                        yearOutput[property] = year[property].reduce(function (previousValue, colName, curIndex, curArray) {
                            if (yearDataBase.hasOwnProperty(colName) && !isNaN(parseFloat(yearDataBase[colName]))) {
                                return previousValue + parseFloat(yearDataBase[colName]);
                            }
                            else {
                                return previousValue;
                            }
                        }, 0);

                    }
                    else {
                        yearOutput[property] = year[property];
                    }
                }
                else if (config.derivedVariables.hasOwnProperty(property)) {
                    yearOutput[property] = config.derivedVariables[property](yearOutput);
                    if (isNaN(yearOutput[property])) {
                        yearOutput[property] = '-';
                    }
                }
                else {
                    yearOutput[property] = '-';
                }

                // Convert numeric strings to numbers.
                if (!isNaN(Number.parseFloat(yearOutput[property])) && isFinite(yearOutput[property])) {
                    yearOutput[property] = Number.parseFloat(yearOutput[property]);
                }
            }
        );
        output.push(yearOutput);
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
                    outputRows.sort(function (a, b) { return Number(a.year) - Number(b.year); });
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
        file.end();
    });

    outputStringify.write(header);
    rows.forEach(function (item) { outputStringify.write(item); });
    outputStringify.end();
};

if (program.baseDir === 'undefined') {
    console.error('No config directory specified.');
    process.exit(1);
}
else {
    fs.readdir(__dirname + '/' + program.baseDir, function(err, files) {
       files.forEach(function (filePath, index, array) {
           if (filePath.endsWith(".js")) {
               try {
                   var includeInThisContext = function (path) {
                       var code = fs.readFileSync(path);
                       vm.runInThisContext(code, path);
                   }.bind(this);
                   includeInThisContext(__dirname + '/' + program.baseDir + '/' + filePath);
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


