var config = {
    basePath: 'nhgis_sources/race',
    header: ['year', 'geography', 'filename', 'black', 'hispanic', 'white', 'total', 'percent_black', 'percent_nonwhite', 'notes'],
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
            black: ["AZ3001", "AZ3002", "AZ3003", "AZ3004"],
            white: ["AZ2001"],
            total: ["AZ3001", "AZ3002", "AZ3003", "AZ3004", "AZ2001"],
            notes: "Includes both 'Negro' and 'Other Colored'"
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
            filename: "nhgis0015_ts_nominal_1980_county.csv",
            black: ["AE7AB1980", "AE7AH1980"],
            white: ["AE7AA1980"],
            hispanic: ["AE7AG1980", "AE7AH1980", "AE7AI1980", "AE7AJ1980", "AE7AK1980", "AE7AL1980"],
            total: ["AE7AA1980", "AE7AB1980", "AE7AC1980", "AE7AD1980", "AE7AE1980", "AE7AF1980", "AE7AG1980", "AE7AH1980", "AE7AI1980", "AE7AJ1980", "AE7AK1980", "AE7AL1980"],
            notes: "Excludes 'other race'; Black includes Hispanic black"
        },
        {
            year: "1990",
            filename: "nhgis0015_ts_nominal_1990_county.csv",
            black: ["AE7AB1990", "AE7AH1990"],
            white: ["AE7AA1990"],
            hispanic: ["AE7AG1990", "AE7AH1990", "AE7AI1990", "AE7AJ1990", "AE7AK1990", "AE7AL1990"],
            total: ["AE7AA1990", "AE7AB1990", "AE7AC1990", "AE7AD1990", "AE7AE1990", "AE7AF1990", "AE7AG1990", "AE7AH1990", "AE7AI1990", "AE7AJ1990", "AE7AK1990", "AE7AL1990"],
            notes: "Black includes Hispanic black"
        },
        {
            year: "2000",
            filename: "nhgis0015_ts_nominal_2000_county.csv",
            black: ["AE7AB2000", "AE7AH2000"],
            white: ["AE7AA2000"],
            hispanic: ["AE7AG2000", "AE7AH2000", "AE7AI2000", "AE7AJ2000", "AE7AK2000", "AE7AL2000"],
            total: ["AE7AA2000", "AE7AB2000", "AE7AC2000", "AE7AD2000", "AE7AE2000", "AE7AF2000", "AE7AG2000", "AE7AH2000", "AE7AI2000", "AE7AJ2000", "AE7AK2000", "AE7AL2000"],
            notes: "Black includes Hispanic black"
        },
        {
            year: "2010",
            filename: "nhgis0015_ts_nominal_2010_county.csv",
            black: ["AE7AB2010", "AE7AH2010"],
            white: ["AE7AA2010"],
            hispanic: ["AE7AG2010", "AE7AH2010", "AE7AI2010", "AE7AJ2010", "AE7AK2010", "AE7AL2010"],
            total: ["AE7AA2010", "AE7AB2010", "AE7AC2010", "AE7AD2010", "AE7AE2010", "AE7AF2010", "AE7AG2010", "AE7AH2010", "AE7AI2010", "AE7AJ2010", "AE7AK2010", "AE7AL2010"],
            notes: "Excludes 'other race'; Black includes Hispanic black"
        }
    ],
    derivedVariables: {
        percent_black: function (row) {
            return row.total > 0 ? (100 * (row.black / row.total)).toFixed(4) : '-';
        },
        percent_nonwhite: function(row) {
            return row.total > 0 ? (100 * (1 - row.white / row.total)).toFixed(4) : '-';
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
