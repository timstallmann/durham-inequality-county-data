dist/data/*.csv:
	node computeTimeseries.js -c nhgis_sources -o dist/data

outputs: dist/data/*.csv
	node createOutputTables.js -c dist/outputs/race_over_time.js -o dist/outputs
	node createOutputTables.js -c dist/outputs/race_and_gender.js -o dist/outputs
	node createOutputTables.js -c dist/outputs/housing_tenure.js -o dist/outputs
	node createOutputTables.js -c dist/outputs/housing_occupancy.js -o dist/outputs