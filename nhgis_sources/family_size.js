var config = {
    basePath: 'nhgis_sources/families_educational_attainment_and_labor_force',
    header: ['year', 'geography', 'filename', 'total_families', 'persons_in_families', 'average_family_size', 'notes'],
    nhgisVariables: [
        {
            year: "1970",
            filename: "nhgis0023_ts_nominal_1970_county.csv",
            total_families: ["A68AA1970"],
            persons_in_families: ["CL5AA1970"],
        },
        {
            year: "1980",
            filename: "nhgis0023_ts_nominal_1980_county.csv",
            total_families: ["A68AA1980"],
            persons_in_families: ["CL5AA1980"],
        },
        {
            year: "1990",
            filename: "nhgis0023_ts_nominal_1990_county.csv",
            total_families: ["A68AA1990"],
            persons_in_families: ["CL5AA1990"],
        },
        {
            year: "2000",
            filename: "nhgis0023_ts_nominal_2000_county.csv",
            total_families: ["A68AA2000"],
            persons_in_families: ["CL5AA2000"],
        },
        {
            year: "2010",
            filename: "nhgis0023_ts_nominal_2010_county.csv",
            total_families: ["A68AA2010"],
            persons_in_families: ["CL5AA2010"],
        },
    ],
    derivedVariables: {
        average_family_size: function(row) {
            return row.total_families > 0 ? (row.persons_in_families / row.total_families).toFixed(4) : '-';
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
