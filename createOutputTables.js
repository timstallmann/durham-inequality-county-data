#!/usr/bin/env node

var csv = require('csv');
var parse = require('csv-parse/lib/sync');
const fs = require('fs');
const vm = require('vm');
var program = require('commander');

function convertToNumeric(value) {
    if (value != '-' && !isNaN(Number.parseFloat(value)) && isFinite(value)) {
        return Number.parseFloat(value);
    }
    else {
        return value;
    }
}


/**
 * Scans a row of an input table to see if it matches row.geography = geography
 * and if so extracts row.inputColName into a new outputColName property on the
 * year object corresponding to row.year in outputTable.
 *
 * @param geography
 *   String representing target geography.
 * @param outputColName
 *   String for output column name.
 * @param inputColName
 *   String for input column name.
 * @param outputTable
 *   Associative array/object keyed by year.
 * @param row
 *   The input row, as an object/associative array.
 */
function scanDataRow(geography, outputColName, inputColName, outputTable, row) {
    if (row.hasOwnProperty('year')
        && row.hasOwnProperty('geography')
        && row.geography == geography
        && row.hasOwnProperty(inputColName)
    ) {
        if (!outputTable.hasOwnProperty(row.year)) {
            outputTable[row.year] = {};
        }
        outputTable[row.year][outputColName] = row[inputColName];
    }
}

function saveOutput(filename, header, yearColumnName, columnCallbacks, outputTable) {
    var outputStringify = csv.stringify({ quotedString: true });
    var file = fs.createWriteStream(filename);

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
    var outputYears = Object.keys(outputTable);
    outputYears.sort();

    outputYears.forEach(function(year) {
        var outputRow = [];
        header.forEach(function(colName) {
            if (colName == yearColumnName) {
                outputRow.push(convertToNumeric(year));
            }
            else if (outputTable[year].hasOwnProperty(colName)) {
                outputRow.push(convertToNumeric(outputTable[year][colName]));
            }
            else if (typeof columnCallbacks[colName] == 'function') {
                var result = columnCallbacks[colName](outputTable[year])
                if (isNaN(result)) {
                    result = '-';
                }
                else {
                    result = Number.parseFloat(result);
                }
                outputRow.push(result);
            }
            else {
                outputRow.push('-');
            }
        });
        outputStringify.write(outputRow);
    });
}

program
    .version('0.0.1')
    .option('-c, --configFile [filename]', 'Config file.')
    .option('-o, --outputDir [path]', 'Directory for output file')
    .parse(process.argv);

if (typeof program.outputDir == 'undefined') {
    console.error('No output directory specified');
    process.exit(1);
}

if (typeof program.configFile == 'undefined' || !program.configFile.endsWith(".js")) {
    console.error('No config file specified or invalid config filename');
    process.exit(1);
}
else {
    try {
        var includeInThisContext = function (path) {
            var code = fs.readFileSync(path);
            vm.runInThisContext(code, path);
        }.bind(this);
        includeInThisContext(__dirname + '/' + program.configFile);
    }
    catch (e) {
        console.error("Error in reading config file");
        console.error(e);
    }
}

var outputTable = [];
var yearColumn;
var columnCallbacks = [];
var inputFilesRemaining = config.columns.length;
config.columns.forEach(
    function(configRow) {
        if (configRow.hasOwnProperty('year') && configRow.year) {
            yearColumn = configRow.name;
            inputFilesRemaining -= 1;
            return;
        }
        else if (configRow.hasOwnProperty('callback') && configRow.callback) {
            columnCallbacks[configRow.name] = configRow.callback;
            inputFilesRemaining -= 1;
            return;
        }
        
        // Read csv file
        fs.readFile(config.basePath + '/' + configRow.file, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var inputRows = parse(data, {columns: true});
                inputRows.forEach(
                    function(inputRow) {
                        scanDataRow(configRow.geography, configRow.name, configRow.column, outputTable, inputRow);
                    }
                );
                inputFilesRemaining -= 1;
                if (inputFilesRemaining == 0) {
                    saveOutput(__dirname + '/' + program.outputDir + '/' + config.outputFile, config.header, yearColumn, columnCallbacks, outputTable);
                }
            }
        });

        // loop through CSV file with scanDataRow function
    }
);

