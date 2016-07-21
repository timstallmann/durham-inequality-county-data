var config = {
    basePath: 'nhgis_sources/families_educational_attainment_and_labor_force',
    header: ['year', 'geography', 'filename', 'less_than_ninth_grade', 'percent_less_than_ninth_grade', 'four_year_college_or_more', 'percent_four_year_college_or_more', 'total', 'notes'],
    nhgisVariables: [
        {
            year: "1970",
            filename: "nhgis0023_ts_nominal_1970_county.csv",
            less_than_ninth_grade: ["B69AA1970"],
            four_year_college_or_more: ["B69AC1970"],
            total: ["B69AA1970", "B69AB1970", "B69AC1970"],
        },
        {
            year: "1980",
            filename: "nhgis0023_ts_nominal_1980_county.csv",
            less_than_ninth_grade: ["B69AA1980"],
            four_year_college_or_more: ["B69AC1980"],
            total: ["B69AA1980", "B69AB1980", "B69AC1980"],
        },
        {
            year: "1990",
            filename: "nhgis0023_ts_nominal_1990_county.csv",
            less_than_ninth_grade: ["B69AA1990"],
            four_year_college_or_more: ["B69AC1990"],
            total: ["B69AA1990", "B69AB1990", "B69AC1990"],
        },
        {
            year: "2000",
            filename: "nhgis0023_ts_nominal_2000_county.csv",
            less_than_ninth_grade: ["B69AA2000"],
            four_year_college_or_more: ["B69AC2000"],
            total: ["B69AA2000", "B69AB2000", "B69AC2000"],
        },
        {
            year: "2012",
            filename: "nhgis0023_ts_nominal_20125_county.csv",
            less_than_ninth_grade: ["B69AA125"],
            four_year_college_or_more: ["B69AC125"],
            total: ["B69AA125", "B69AB125", "B69AC125"],
            notes: "5-year ACS average"
        }
    ],
    derivedVariables: {
        percent_less_than_ninth_grade: function(row) {
            return row.total > 0 ? (100 * row.less_than_ninth_grade / row.total).toFixed(4) : '-';
        },
        percent_four_year_college_or_more: function(row) {
            return row.total > 0 ? (100 * row.four_year_college_or_more / row.total).toFixed(4) : '-';
        },
    },
    geographyFilterCallbacks: {
        durham_county: function(row) {
            return row.GISJOIN == 'G3700630';
        },
        state: function(row) {
            return row.GISJOIN.substr(0, 3) == "G37";
        },
        country: function(row) {
            return true;
        }
    }
};
