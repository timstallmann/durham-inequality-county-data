#!/usr/bin/env node

var csv = require('csv');
const fs = require('fs');
var program = require('commander');

program
    .version('0.0.1')
    .option('-b, --basePath [path]', 'Base path')
    .option('-o, --outputFile [filename]', 'Output file')
    .parse(process.argv);

if (typeof program.basePath === 'undefined') {
    program.basePath = '';
}
if (typeof program.outputFile === 'undefined') {
    console.error('No output file given!');
    process.exit(1);
}

var raceHeader = ['year', 'gisjoin', 'filename', 'black', 'white', 'total'];
var raceVariables = [
    {
        year: "1880",
        gisjoin: "G5400350",
        filename: "nhgis0008_ds23_1880_county.csv",
        black: ["APP002"],
        white: ["APP001"],
        total: ["APP001", "APP002", "APP003", "APP004"]
    },
    {
        year: "1890",
        gisjoin: "G5400350",
        filename: "nhgis0008_ds27_1890_county.csv",
        black: ["AV0007", "AV0008"],
        white: ["AV0001", "AV0002", "AV0003", "AV0004", "AV0005", "AV0006"],
        total: ["AV0001", "AV0002", "AV0003", "AV0004", "AV0005", "AV0006", "AV0007", "AV0008"]
    }
];

var timeSeriesCalculate = function(year, outputStream) {
    return function(err, data) {
        if (err) {
            throw err;
        }

        csv.parse(data, {columns: true}, function(err, output) {
            var yearDataBase = output.filter(function(a) {
                return (a.GISJOIN == year.gisjoin);
            })[0];

            var yearOutput = {};
            for (var property in year) {
                if (year[property] instanceof Array) {
                    yearOutput[property] = year[property].reduce(function(previousValue, colName, curIndex, curArray) {
                        if (yearDataBase.hasOwnProperty(colName)) {
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
            outputStream.write(yearOutput);
        });
    }
};

var outputStringify = csv.stringify();
var outputFile = fs.createWriteStream(program.outputFile);
outputStringify.on('readable', function() {
    while (row = outputStringify.read()) {
        outputFile.write(row);
    }
});

outputStringify.on('finish', function() {
    outputFile.end();
});
outputStringify.write(raceHeader);

for (var i = 0; i < raceVariables.length; i++) {
    var year = raceVariables[i];
    fs.readFile(program.basePath + '/' + year.filename, timeSeriesCalculate(year, outputStringify));
}
