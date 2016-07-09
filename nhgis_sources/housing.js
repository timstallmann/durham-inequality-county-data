var config = {
    basePath: 'nhgis_sources/housing',
    header: ['year', 'geography', 'filename', 'total_housing_units', 'occupied_housing_units', 'occupied_housing_units_with_black_householder', 'rental_housing_units', 'rental_housing_units_with_black_householder', 'percent_occupied', 'percent_rental', 'black_percent_rental', 'notes'],
    nhgisVariables: [
        {
            year: "1900",
            filename: "nhgis0019_ds31_1900_county.csv",
            occupied_housing_units: ["AZZ001", "AZZ002", "AZZ003", "AZZ004", "AZZ005", "AZZ006", "AZZ007", "AZZ008", "AZZ009", "AZZ010"],
            rental_housing_units: ["AZZ004", "AZZ009"],
            notes: "No clear data on occupied / vacant"
        },
        {
            year: "1910",
            filename: "nhgis0019_ds37_1910_county.csv",
            occupied_housing_units: ["A49001", "A49002", "A49003", "A49004", "A49005", "A49006", "A49007", "A49008", "A49009", "A49010"],
            rental_housing_units: ["A49004", "A49009"],
            notes: "No clear data on occupied / vacant"
        },
        {
            year: "1920",
            filename: "nhgis0019_ds43_1920_county.csv",
            occupied_housing_units: ["A83001", "A83002", "A83003"],
            rental_housing_units: ["A83001"],
            notes: "No clear data on occupied / vacant"
        },
        {
            year: "1930",
            filename: "nhgis0019_ds55_1930_county.csv",
            occupied_housing_units: ["BFU001", "BFU002"],
            rental_housing_units: ["BFU002"],
            notes: "No clear data on occupied / vacant. Non-farm homes only for rental data."
        },
        {
            year: "1940",
            filename: "nhgis0019_ds78_1940_county.csv",
            total_housing_units: ["BXR001"],
            occupied_housing_units: ["BXS001"],
            rental_housing_units: ["BXV002"],
        },
        {
            year: "1970",
            filename: "nhgis0021_ts_nominal_1970_county.csv",
            total_housing_units: ["A43AA1970", "A43AB1970"],
            occupied_housing_units: ["A43AA1970"],
            rental_housing_units: ["B37AB1970"],
            occupied_housing_units_with_black_householder: ["B39AA1970", "B39AB1970"],
            rental_housing_units_with_black_householder: ["B39AB1970"]
        },
        {
            year: "1980",
            filename: "nhgis0021_ts_nominal_1980_county.csv",
            total_housing_units: ["A43AA1980", "A43AB1980"],
            occupied_housing_units: ["A43AA1980"],
            rental_housing_units: ["B37AB1980"],
            occupied_housing_units_with_black_householder: ["B39AA1980", "B39AB1980"],
            rental_housing_units_with_black_householder: ["B39AB1980"]
        },
        {
            year: "1990",
            filename: "nhgis0021_ts_nominal_1990_county.csv",
            total_housing_units: ["A43AA1990", "A43AB1990"],
            occupied_housing_units: ["A43AA1990"],
            rental_housing_units: ["B37AB1990"],
            occupied_housing_units_with_black_householder: ["B39AA1990", "B39AB1990"],
            rental_housing_units_with_black_householder: ["B39AB1990"]
        },
        {
            year: "2000",
            filename: "nhgis0021_ts_nominal_2000_county.csv",
            total_housing_units: ["A43AA2000", "A43AB2000"],
            occupied_housing_units: ["A43AA2000"],
            rental_housing_units: ["B37AB2000"],
            occupied_housing_units_with_black_householder: ["B39AA2000", "B39AB2000"],
            rental_housing_units_with_black_householder: ["B39AB2000"]
        },
        {
            year: "2010",
            filename: "nhgis0021_ts_nominal_2010_county.csv",
            total_housing_units: ["A43AA2010", "A43AB2010"],
            occupied_housing_units: ["A43AA2010"],
            rental_housing_units: ["B37AB2010"],
            occupied_housing_units_with_black_householder: ["B39AA2010", "B39AB2010"],
            rental_housing_units_with_black_householder: ["B39AB2010"]
        },
    ],
    derivedVariables: {
        percent_occupied: function(row) {
            return row.total_housing_units > 0 ? (100 * (row.occupied_housing_units / row.total_housing_units)).toFixed(4) : '-';
        },
        percent_rental: function(row) {
            if (row.occupied_housing_units) {
                return row.occupied_housing_units > 0 ? (100 * (row.rental_housing_units / row.occupied_housing_units)).toFixed(4) : '-';
            }
            else {
                return row.total_housing_units > 0 ? (100 * (row.rental_housing_units / row.total_housing_units)).toFixed(4) : '-';
            }
        },
        black_percent_rental: function(row) {
            if (row.occupied_housing_units_with_black_householder) {
                return row.occupied_housing_units_with_black_householder > 0 ? (100 * (row.rental_housing_units_with_black_householder / row.occupied_housing_units_with_black_householder)).toFixed(4) : '-';
            }
        }
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
