var config = {
    basePath: 'nhgis_sources/income',
    header: ['year', 'geography', 'filename', 'raw_median_hh_income', 'median_hh_income_2016_dollars', 'notes'],
    nhgisVariables: [
        {
            year: "1980",
            filename: "nhgis0014_ts_nominal_1980_county.csv",
            raw_median_hh_income: ["B79AA1980"]
        },
        {
            year: "1990",
            filename: "nhgis0014_ts_nominal_1990_county.csv",
            raw_median_hh_income: ["B79AA1990"]
        },
        {
            year: "2000",
            filename: "nhgis0014_ts_nominal_2000_county.csv",
            raw_median_hh_income: ["B79AA2000"]
        },
        {
            year: "2012",
            filename: "nhgis0014_ts_nominal_20125_county.csv",
            raw_median_hh_income: ["B79AA125"],
            notes: "This is a 5-year ACS average"
        }
    ],
    derivedVariables: {
        median_hh_income_2016_dollars: function(row) {
            var inflationCoefficients = {
                1950: 9.88,
                1980: 2.89,
                1990: 1.82,
                2000: 1.38,
                2012: 1.04
            };

            return row.raw_median_hh_income * inflationCoefficients[row["year"]];
        }
    },
    geographyFilterCallbacks: {
        durham_county: function(row) {
            return row.GISJOIN == 'G3700630';
        }
    }
};
