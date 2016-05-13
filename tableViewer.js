var HandsOnTable = require('./bower_components/handsontable/dist/handsontable.full.js');
var parse = require('csv-parse/lib/sync');
var http = require('http');

var sourceFileName = "race.csv";

https.get('https://' + window.location.host + '/data/' + sourceFileName, function(res) {
    var data = "";

    res.on('data', function (d) {
        data += d.toString();
    });

    res.on('end', function() {
        var table = parse(data);
        var headers = table.shift();

        var container = document.getElementById('example');
        var hot = new HandsOnTable(container, {
            data: table,
            rowHeaders: true,
            colHeaders: headers,
            columnSorting: {
                column: 0
            }
        });
    })
}).on('error', function(e) {
    console.error(e);
});
