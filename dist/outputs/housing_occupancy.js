var config = {
    basePath: 'dist/data',
    outputFile: 'housing_occupancy.csv',
    header: ['Year', 'Total Housing Units (Durham)', 'Occupied Housing Units (Durham)', 'Percent Occupied (Durham)', 'Percent Occupied (NC)', 'Percent Occupied (US)'],
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
            name: 'Percent Occupied (Durham)',
            file: 'housing.csv',
            geography: 'state',
            column: 'percent_occupied'
        },
        {
            name: 'Percent Occupied (NC)',
            file: 'housing.csv',
            geography: 'country',
            column: 'percent_occupied'
        },
        {
            name: 'Percent Occupied (US)',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'percent_occupied'
        },
        {
            name: 'Notes',
            file: 'housing.csv',
            geography: 'durham_county',
            column: 'notes'
        }
    ]
}
