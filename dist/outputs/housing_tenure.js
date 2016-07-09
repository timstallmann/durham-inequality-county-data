var config = {
    basePath: 'dist/data',
    outputFile: 'housing_tenure.csv',
    header: ['Year', 'Occupied Housing Units (Durham)', 'Rental Housing Units (Durham)', 'Black-Occupied Housing Units (Durham)', 'Black-Rented Housing Units (Durham)', 'Percent Rental (Durham)', 'Percent Rental (NC)', 'Percent Rental (US)', 'Black Percent Rental (Durham)', 'Black Percent Rental (NC)', 'Black Percent Rental (US)'],
    columns: [
        {
            name: 'Year',
            year: true
        },
        {
            name: 'Occupied Housing Units (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'occupied_housing_units'
        },
        {
            name: 'Rental Housing Units (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'rental_housing_units'
        },
        {
            name: 'Black-Occupied Housing Units (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'occupied_housing_units_with_black_householder'
        },
        {
            name: 'Black-Rented Housing Units (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'rental_housing_units_with_black_householder'
        },
        {
            name: 'Percent Rental (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'percent_rental'
        },
        {
            name: 'Percent Rental (NC)',
            file: 'housing.csv',
            geography: 'state',
            column: 'percent_rental'
        },
        {
            name: 'Percent Rental (US)',
            file: 'housing.csv',
            geography: 'country',
            column: 'percent_rental'
        },
        {
            name: 'Black Percent Rental (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'black_percent_rental'
        },
        {
            name: 'Black Percent Rental (NC)',
            file: 'housing.csv',
            geography: 'state',
            column: 'black_percent_rental'
        },
        {
            name: 'Black Percent Rental (US)',
            file: 'housing.csv',
            geography: 'country',
            column: 'black_percent_rental'
        },
        {
            name: 'Notes',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'notes'
        }
    ]
}
