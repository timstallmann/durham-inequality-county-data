var config = {
    basePath: 'dist/data',
    outputFile: 'race_and_gender.csv',
    header: ['Year', 'Percent Female (Durham)', 'Percent Female (NC)', 'Percent Female (US)', 'Black Percent Female (Durham)', 'Black Percent Female (NC)', 'Black Percent Female (US)', 'White Percent Female (Durham)', 'White Percent Female (NC)', 'White Percent Female (US)', 'Notes'],
    columns: [
        {
            name: 'Year',
            year: true
        },
        {
            name: 'Total Population (Durham)',
            file: 'race_and_gender.csv',
            geography: 'durham_county',
            column: 'total'
        },
        {
            name: 'Percent Female (Durham)',
            file: 'race_and_gender.csv',
            geography: 'durham_county',
            column: 'pct_women'
        },
        {
            name: 'Percent Female (NC)',
            file: 'race_and_gender.csv',
            geography: 'state',
            column: 'pct_women'
        },
        {
            name: 'Percent Female (US)',
            file: 'race_and_gender.csv',
            geography: 'country',
            column: 'pct_women'
        },
        {
            name: 'Black Percent Female (Durham)',
            file: 'race_and_gender.csv',
            geography: 'durham_county',
            column: 'black_pct_women'
        },
        {
            name: 'Black Percent Female (NC)',
            file: 'race_and_gender.csv',
            geography: 'state',
            column: 'black_pct_women'
        },
        {
            name: 'Black Percent Female (US)',
            file: 'race_and_gender.csv',
            geography: 'country',
            column: 'black_pct_women'
        },
        {
            name: 'White Percent Female (Durham)',
            file: 'race_and_gender.csv',
            geography: 'durham_county',
            column: 'white_pct_women'
        },
        {
            name: 'White Percent Female (NC)',
            file: 'race_and_gender.csv',
            geography: 'state',
            column: 'white_pct_women'
        },
        {
            name: 'White Percent Female (US)',
            file: 'race_and_gender.csv',
            geography: 'country',
            column: 'white_pct_women'
        },
        {
            name: 'Notes',
            file: 'race_and_gender.csv',
            geography: 'durham_county',
            column: 'notes'
        }
    ]
}
