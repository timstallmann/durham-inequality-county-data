#!/usr/bin/env node

var csv = require('csv');
const fs = require('fs');
const vm = require('vm');
var program = require('commander');

program
    .version('0.0.1')
    .option('-c, --baseDir [path]', 'Base path to config files.')
    .option('-o, --outputDir [filename]', 'Directory for output files')
    .parse(process.argv);

var timeSeriesCalculate = function(year, header, outputStringifyStream) {
    return function(err, data) {
        if (err) {
            throw err;
        }

        csv.parse(data, {columns: true}, function(err, output) {
            var yearDataBase = output.filter(function(a) {
                return (a.GISJOIN == year.gisjoin);
            })[0];

            var yearOutput = {};
            header.forEach(
                function(property, index, array) {
                    if (year.hasOwnProperty(property)) {
                        if (year[property] instanceof Array) {
                            yearOutput[property] = year[property].reduce(function (previousValue, colName, curIndex, curArray) {
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
                    else if (config.derivedVariables.hasOwnProperty(property)) {
                        yearOutput[property] = config.derivedVariables[property](yearOutput);
                    }
                    else {
                        yearOutput[property] = '-';
                    }
                }
            );
            outputStringifyStream.write(yearOutput);
        });
    }
};

var processFile = function(config, outputFile) {
    var outputStringify = csv.stringify();
    outputStringify.on('readable', function() {
        while (row = outputStringify.read()) {
            outputFile.write(row);
        }
    });

// Final callback after no more data is being pushed to the stream.
    outputStringify.on('finish', function() {
        outputFile.end();
    });
    outputStringify.write(config.header);

    config.nhgisVariables.forEach(
        function(item, index, array) {
            fs.readFile(config.basePath + '/' + item.filename, timeSeriesCalculate(item, config.header, outputStringify));
        }
    );
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

                   // Check if outputdir is specified.
                   var outputFile;
                   if (typeof program.outputDir === 'undefined') {
                       outputFile = process.stdout;
                   }
                   else {
                       outputFile = fs.createWriteStream(__dirname + '/' + program.outputDir + '/' + filePath.substr(0,filePath.length -3) + '.csv');
                   }
                   processFile(config, outputFile);
               }
               catch (e) {
                   console.error(e);
                   console.error('CI not readable');
               }
           }
        });
    });
}


