var config = {
    basePath: 'nhgis_sources/race',
    header: ['year', 'gisjoin', 'filename', 'black', 'white', 'total', 'pctBlack'],
    nhgisVariables: [
        {
            year: "1880",
            gisjoin: "G3701350",
            filename: "nhgis0008_ds23_1880_county.csv",
            black: ["APP002"],
            white: ["APP001"],
            total: ["APP001", "APP002", "APP003", "APP004"]
        },
        {
            year: "1890",
            gisjoin: "G3700630",
            filename: "nhgis0008_ds27_1890_county.csv",
            black: ["AV0007", "AV0008"],
            white: ["AV0001", "AV0002", "AV0003", "AV0004", "AV0005", "AV0006"],
            total: ["AV0001", "AV0002", "AV0003", "AV0004", "AV0005", "AV0006", "AV0007", "AV0008"]
        },
        {
            year: "1900",
            gisjoin: "G3700630",
            filename: "nhgis0008_ds31_1900_county.csv",
            black: ["AZ3003", "AZ3004"],
            white: ["AZ2001"],
            total: ["AZ3001", "AZ3002", "AZ3003", "AZ3004", "AZ2001"]
        },
        {
            year: "1910",
            gisjoin: "G3700630",
            filename: "nhgis0008_ds37_1910_county.csv",
            black: ["A30003", "A30003"],
            white: ["A30001", "A30002"],
            total: ["A30001", "A30002", "A30003", "A30003"]
        }
    ],
    derivedVariables: {
        pctBlack: function (row) {
            return (100 * (row.total > 0 ? row.black / row.total : 0)).toFixed(4);
        }
    }
}