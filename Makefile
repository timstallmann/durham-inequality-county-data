dista/data/*.csv: nhgis_sources/race/*.csv
	node computeTimeseries.js -c nhgis_sources -o dist/data