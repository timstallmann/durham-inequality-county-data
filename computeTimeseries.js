#!/usr/bin/env node

var csv = require('csv');
const fs = require('fs');
const vm = require('vm');
var program = require('commander');

program
    .version('0.0.1')
    .option('-c, --configFile [path]', 'Javscript file which defines var config')
    .option('-o, --outputFile [filename]', 'Output file')
    .parse(process.argv);

if (typeof program.configFile === 'undefined') {
    console.error('No config file specified.');
    process.exit(1);
}
else {
    try {
        var includeInThisContext = function(path) {
            var code = fs.readFileSync(path);
            vm.runInThisContext(code, path);
        }.bind(this);
        includeInThisContext(__dirname + '/' + program.configFile);
    }
    catch (e) {
        console.error(e);
        console.error('Config file does not exist or is not readable');
        process.exit(1);
    }
}

if (typeof program.outputFile === 'undefined') {
    console.error('No output file given! Logging to console instead.');
    var outputFile = process.stdout;
}
else {
    var outputFile = fs.createWriteStream(program.outputFile);
}

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
            for (var calculation in config.derivedVariables) {
                yearOutput[calculation] = config.derivedVariables[calculation](yearOutput);
            }
            outputStream.write(yearOutput);
        });
    }
};

var outputStringify = csv.stringify();
outputStringify.on('readable', function() {
    while (row = outputStringify.read()) {
        outputFile.write(row);
    }
});

outputStringify.on('finish', function() {
    outputFile.end();
});
outputStringify.write(config.header);

for (var i = 0; i < config.nhgisVariables.length; i++) {
    var year = config.nhgisVariables[i];
    fs.readFile(config.basePath + '/' + year.filename, timeSeriesCalculate(year, outputStringify));
}
