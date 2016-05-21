var config = {
    basePath: 'dist/data',
    outputFile: 'race_over_time.csv',
    header: ['Year', 'Total Population (Durham)', 'Percent Black (Durham)', 'Percent Black (NC)', 'Percent Black (US)', 'Percent non-white (Durham)', 'Percent non-white (NC)', 'Percent non-white (US)', 'Notes'],
    columns: [
        {
            name: 'Year',
            year: true
        },
        {
            name: 'Total Population (Durham)',
            file: 'race.csv',
            geography: 'durham_county',
            column: 'total'
        },
        {
            name: 'Percent Black (Durham)',
            file: 'race.csv',
            geography: 'durham_county',
            column: 'percent_black'
        },
        {
            name: 'Percent Black (NC)',
            file: 'race.csv',
            geography: 'state',
            column: 'percent_black'
        },
        {
            name: 'Percent Black (US)',
            file: 'race.csv',
            geography: 'country',
            column: 'percent_black'
        },
        {
            name: 'Percent non-white (Durham)',
            file: 'race.csv',
            geography: 'durham_county',
            column: 'percent_nonwhite'
        },
        {
            name: 'Percent non-white (NC)',
            file: 'race.csv',
            geography: 'state',
            column: 'percent_nonwhite'
        },
        {
            name: 'Percent non-white (US)',
            file: 'race.csv',
            geography: 'country',
            column: 'percent_nonwhite'
        },
        {
            name: 'Notes',
            file: 'race.csv',
            geography: 'durham_county',
            column: 'notes'
        }
    ]
}
