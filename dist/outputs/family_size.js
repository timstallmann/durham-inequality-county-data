var config = {
    basePath: 'dist/data',
    outputFile: 'family_size.csv',
    header: ['Year', 'Average Family Size (Durham)', 'Average Family Size (NC)', 'Average Family Size (US)', 'Percent of Population in Families (Durham)', 'Percent of Population in Families (NC)', 'Percent of Population in Families (US)'],
    columns: [
        {
            name: 'Year',
            year: true
        },
        {
            name: 'Average Family Size (Durham)',
            file: 'family_size.csv',
            geography: 'durham_county',
            column: 'average_family_size'
        },
        {
            name: 'Average Family Size (NC)',
            file: 'family_size.csv',
            geography: 'state',
            column: 'average_family_size'
        },
        {
            name: 'Average Family Size (US)',
            file: 'family_size.csv',
            geography: 'country',
            column: 'average_family_size'
        },
        {
            name: 'Persons in Families (Durham)',
            file: 'family_size.csv',
            geography: 'durham_county',
            column: 'persons_in_families'
        },
        {
            name: 'Persons in Families (NC)',
            file: 'family_size.csv',
            geography: 'state',
            column: 'persons_in_families'
        },
        {
            name: 'Persons in Families (US)',
            file: 'family_size.csv',
            geography: 'country',
            column: 'persons_in_families'
        },
        {
            name: 'Total Population (Durham)',
            file: 'race.csv',
            geography: 'durham_county',
            column: 'total'
        },
        {
            name: 'Total Population (NC)',
            file: 'race.csv',
            geography: 'state',
            column: 'total'
        },
        {
            name: 'Total Population (US)',
            file: 'race.csv',
            geography: 'country',
            column: 'total'
        },
        {
            name: 'Percent of Population in Families (Durham)',
            callback: function(row) {
                return row['Total Population (Durham)'] > 0 ? (100 * row['Persons in Families (Durham)'] / row['Total Population (Durham)']).toFixed(4) : '-';
            }
        },
        {
            name: 'Percent of Population in Families (NC)',
            callback: function(row) {
                return row['Total Population (NC)'] > 0 ? (100 * row['Persons in Families (NC)'] / row['Total Population (NC)']).toFixed(4) : '-';
            }
        },
        {
            name: 'Percent of Population in Families (US)',
            callback: function(row) {
                return row['Total Population (US)'] > 0 ? (100 * row['Persons in Families (US)'] / row['Total Population (US)']).toFixed(4) : '-';
            }
        },
        {
            name: 'Notes',
            file: 'family_size.csv',
            geography: 'durham_county',
            column: 'notes'
        }
    ]
}
