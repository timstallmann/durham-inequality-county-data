var config = {
    basePath: 'nhgis_sources/race',
    header: ['year', 'gisjoin', 'filename', 'black', 'white', 'total', 'pctBlack', 'pctPoC', 'notes'],
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
            black: ["A30003", "A30004"],
            white: ["A30001", "A30002"],
            total: ["A30001", "A30002", "A30003", "A30004"]
        },
        {
            year: "1920",
            gisjoin: "G3700630",
            filename: "nhgis0008_ds43_1920_county.csv",
            black: ["A8L005", "A8L006"],
            white: ["A8L001", "A8L002", "A8L003", "A8L004"],
            total: ["A8L001", "A8L002", "A8L003", "A8L004", "A8L005", "A8L006"]
        },
        {
            year: "1930",
            gisjoin: "G3700630",
            filename: "nhgis0008_ds53_1930_county.csv",
            black: ["BDK003", "BDK004"],
            white: ["BDK001", "BDK002"],
            total: ["BDK001", "BDK002", "BDK003", "BDK004", "BDK005", "BDK006"]
        },
        {
            year: "1940",
            gisjoin: "G3700630",
            filename: "nhgis0008_ds77_1940_county.csv",
            black: ["BV2003", "BV2004"],
            white: ["BV2001", "BV2002"],
            total: ["BV2001", "BV2002", "BV2003", "BV2004", "BV2005", "BV2006"]
        },
        {
            year: "1950",
            gisjoin: "G3700630",
            filename: "nhgis0009_ds83_1950_county.csv",
            black: [],
            white: ["B1T001"],
            total: ["B1T001", "B1T002"],
            notes: "For this year the only race categories were white and non-white."
        },
        {
            year: "1960",
            gisjoin: "G3700630",
            filename: "nhgis0008_ds91_1960_county.csv",
            black: ["B5S002", "B5S009"],
            white: ["B5S001", "B5S008"],
            total: ["B5S001", "B5S002", "B5S003", "B5S004", "B5S005", "B5S006", "B5S007", "B5S008", "B5S009", "B5S010", "B5S011", "B5S012", "B5S013", "B5S014"]
        },
        {
            year: "1970",
            gisjoin: "G3700630",
            filename: "nhgis0008_ts_nominal_1970_county.csv",
            black: ["B18AB1970"],
            white: ["B18AA1970"],
            total: ["B18AA1970", "B18AB1970", "B18AC1970", "B18AD1970", "B18AE1970"]
        },
        {
            year: "1980",
            gisjoin: "G3700630",
            filename: "nhgis0008_ts_nominal_1980_county.csv",
            black: ["B18AB1980"],
            white: ["B18AA1980"],
            total: ["B18AA1980", "B18AB1980", "B18AC1980", "B18AD1980", "B18AE1980"]
        },
        {
            year: "1990",
            gisjoin: "G3700630",
            filename: "nhgis0008_ts_nominal_1990_county.csv",
            black: ["B18AB1990"],
            white: ["B18AA1990"],
            total: ["B18AA1990", "B18AB1990", "B18AC1990", "B18AD1990", "B18AE1990"]
        },
        {
            year: "2000",
            gisjoin: "G3700630",
            filename: "nhgis0008_ts_nominal_2000_county.csv",
            black: ["B18AB2000"],
            white: ["B18AA2000"],
            total: ["B18AA2000", "B18AB2000", "B18AC2000", "B18AD2000", "B18AE2000"]
        },
        {
            year: "2010",
            gisjoin: "G3700630",
            filename: "nhgis0008_ts_nominal_2010_county.csv",
            black: ["B18AB2010"],
            white: ["B18AA2010"],
            total: ["B18AA2010", "B18AB2010", "B18AC2010", "B18AD2010", "B18AE2010"]
        }
    ],
    derivedVariables: {
        pctBlack: function (row) {
            return (100 * (row.total > 0 ? row.black / row.total : 0)).toFixed(4);
        },
        pctPoC: function(row) {
            return (row.total > 0 ? 100 * (1 - row.white / row.total) : 0).toFixed(4);
        }
    }
}