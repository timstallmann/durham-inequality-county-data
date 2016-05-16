var config = {
    basePath: 'nhgis_sources/race',
    header: ['year', 'geography', 'filename', 'black', 'white', 'total', 'percent_black', 'percent_nonwhite', 'notes'],
    nhgisVariables: [
        {
            year: "1880",
            filename: "nhgis0008_ds23_1880_county.csv",
            black: ["APP002"],
            white: ["APP001"],
            total: ["APP001", "APP002", "APP003", "APP004"],
            notes: "Race categories for this year were 'White', 'Colored', 'Chinese' and 'Indian'"
        },
        {
            year: "1890",
            filename: "nhgis0008_ds27_1890_county.csv",
            black: ["AV0007", "AV0008"],
            white: ["AV0001", "AV0002", "AV0003", "AV0004", "AV0005", "AV0006"],
            total: ["AV0001", "AV0002", "AV0003", "AV0004", "AV0005", "AV0006", "AV0007", "AV0008"],
            notes: "White includes foreign and native-born."
        },
        {
            year: "1900",
            filename: "nhgis0008_ds31_1900_county.csv",
            black: ["AZ3003", "AZ3004"],
            white: ["AZ2001"],
            total: ["AZ3001", "AZ3002", "AZ3003", "AZ3004", "AZ2001"]
        },
        {
            year: "1910",
            filename: "nhgis0008_ds37_1910_county.csv",
            black: ["A30003", "A30004"],
            white: ["A30001", "A30002"],
            total: ["A30001", "A30002", "A30003", "A30004"]
        },
        {
            year: "1920",
            filename: "nhgis0008_ds43_1920_county.csv",
            black: ["A8L005", "A8L006"],
            white: ["A8L001", "A8L002", "A8L003", "A8L004"],
            total: ["A8L001", "A8L002", "A8L003", "A8L004", "A8L005", "A8L006"],
            notes: "White includes foreign and native-born."
        },
        {
            year: "1930",
            filename: "nhgis0008_ds53_1930_county.csv",
            black: ["BDK003", "BDK004"],
            white: ["BDK001", "BDK002"],
            total: ["BDK001", "BDK002", "BDK003", "BDK004", "BDK005", "BDK006"]
        },
        {
            year: "1940",
            filename: "nhgis0008_ds77_1940_county.csv",
            black: ["BV2003", "BV2004"],
            white: ["BV2001", "BV2002"],
            total: ["BV2001", "BV2002", "BV2003", "BV2004", "BV2005", "BV2006"]
        },
        {
            year: "1950",
            filename: "nhgis0008_ds83_1950_county.csv",
            white: ["B1Z001", "B1Z002"],
            total: ["B1Z001", "B1Z002", "B1Z003", "B1Z004"],
            notes: "For this year the only race categories were white and non-white."
        },
        {
            year: "1960",
            filename: "nhgis0008_ds91_1960_county.csv",
            black: ["B5S002", "B5S009"],
            white: ["B5S001", "B5S008"],
            total: ["B5S001", "B5S002", "B5S003", "B5S004", "B5S005", "B5S006", "B5S007", "B5S008", "B5S009", "B5S010", "B5S011", "B5S012", "B5S013", "B5S014"]
        },
        {
            year: "1970",
            filename: "nhgis0012_ts_nominal_1970_county.csv",
            black: ["B21AB1970", "B21AG1970"],
            white: ["B21AA1970", "B21AF1970"],
            total: ["B21AA1970", "B21AB1970", "B21AC1970", "B21AD1970", "B21AE1970", "B21AF1970", "B21AG1970", "B21AH1970", "B21AI1970", "B21AJ1970"]
        },
        {
            year: "1980",
            filename: "nhgis0013_ts_nominal_1980_county.csv",
            black: ["AZ8AB1980", "AZ8AG1980"],
            white: ["AZ8AA1980", "AZ8AF1980"],
            total: ["AZ8AA1980", "AZ8AB1980", "AZ8AC1980", "AZ8AD1980", "AZ8AE1980", "AZ8AF1980", "AZ8AG1980", "AZ8AH1980", "AZ8AI1980", "AZ8AJ1980"],
            notes: "Excludes 'other race'"
        },
        {
            year: "1990",
            filename: "nhgis0012_ts_nominal_1990_county.csv",
            black: ["B21AB1990", "B21AG1990"],
            white: ["B21AA1990", "B21AF1990"],
            total: ["B21AA1990", "B21AB1990", "B21AC1990", "B21AD1990", "B21AE1990", "B21AF1990", "B21AG1990", "B21AH1990", "B21AI1990", "B21AJ1990"]
        },
        {
            year: "2000",
            filename: "nhgis0012_ts_nominal_2000_county.csv",
            black: ["B21AB2000", "B21AG2000"],
            white: ["B21AA2000", "B21AF2000"],
            total: ["B21AA2000", "B21AB2000", "B21AC2000", "B21AD2000", "B21AE2000", "B21AF2000", "B21AG2000", "B21AH2000", "B21AI2000", "B21AJ2000"]
        },
        {
            year: "2010",
            filename: "nhgis0012_ts_nominal_2010_county.csv",
            black: ["B21AB2010", "B21AG2010"],
            white: ["B21AA2010", "B21AF2010"],
            total: ["B21AA2010", "B21AB2010", "B21AC2010", "B21AD2010", "B21AE2010", "B21AF2010", "B21AG2010", "B21AH2010", "B21AI2010", "B21AJ2010"]
        }
    ],
    derivedVariables: {
        percent_black: function (row) {
            return (100 * (row.total > 0 ? row.black / row.total : 0)).toFixed(4);
        },
        percent_nonwhite: function(row) {
            return (row.total > 0 ? 100 * (1 - row.white / row.total) : 0).toFixed(4);
        }
    },
    geographyFilterCallbacks: {
        durham_county: function(row) {
            if (row.year == '1880') {
                return row.GISJOIN == 'G3701350';
            }
            else {
                return row.GISJOIN == 'G3700630';
            }
        },
        state: function(row) {
                return row.GISJOIN.substr(0, 3) == "G37";
            },
        country: function(row) {
                return true;
            }
    }
};
