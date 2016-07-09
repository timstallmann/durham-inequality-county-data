var config = {
    basePath: 'dist/data',
    outputFile: 'housing_occupancy.csv',
    header: ['Year', 'Total Housing Units (Durham)', 'Occupied Housing Units (Durham)', 'Percent Vacancy (Durham)', 'Percent Vacancy (NC)', 'Percent Vacancy (US)'],
    columns: [
        {
            name: 'Year',
            year: true
        },
        {
            name: 'Total Housing Units (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'total_housing_units'
        },
        {
            name: 'Occupied Housing Units (Durham)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'occupied_housing_units'
        },
        {
            name: 'Percent Vacancy (Durham)',
            file: 'housing.csv',
            geography: 'state',
            column: 'percent_vacant'
        },
        {
            name: 'Percent Vacancy (NC)',
            file: 'housing.csv',
            geography: 'country',
            column: 'percent_vacant'
        },
        {
            name: 'Percent Vacancy (US)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'percent_vacant'
        },
        {
            name: 'Notes',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'notes'
        }
    ]
}
