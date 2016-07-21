var config = {
    basePath: 'dist/data',
    outputFile: 'educational_attainment.csv',
    header: ['Year', 'Percent 9th grade or less (Durham)', 'Percent 9th grade or less (NC)', 'Percent 9th grade or less (US)', 'Percent college or more (Durham)', 'Percent college or more (NC)', 'Percent college or more (US)', 'Notes'],
    columns: [
        {
            name: 'Year',
            year: true
        },
        {
            name: 'Percent 9th grade or less (Durham)',
            file: 'educational_attainment.csv',
            geography: 'durham_county',
            column: 'percent_less_than_ninth_grade'
        },
        {
            name: 'Percent 9th grade or less (NC)',
            file: 'educational_attainment.csv',
            geography: 'state',
            column: 'percent_less_than_ninth_grade'
        },
        {
            name: 'Percent 9th grade or less (US)',
            file: 'educational_attainment.csv',
            geography: 'country',
            column: 'percent_less_than_ninth_grade'
        },
        {
            name: 'Percent college or more (Durham)',
            file: 'educational_attainment.csv',
            geography: 'durham_county',
            column: 'percent_four_year_college_or_more'
        },
        {
            name: 'Percent college or more (NC)',
            file: 'educational_attainment.csv',
            geography: 'state',
            column: 'percent_four_year_college_or_more'
        },
        {
            name: 'Percent college or more (US)',
            file: 'educational_attainment.csv',
            geography: 'country',
            column: 'percent_four_year_college_or_more'
        },
        {
            name: 'Notes',
            file: 'educational_attainment.csv',
            geography: 'durham_county',
            column: 'notes'
        }
    ]
}
