var deps = {
	Core: {
		src: ['gvector.js',
		      'core/Util.js',
		      'core/Class.js',
		      'geo/crs/CRS.EPSG4326.js',
		      'map/Map.js'],
		desc: 'The core of the library, including OOP, base layer properties, etc.'
	},
	
	Layer: {
		src: ['layer/Layer.js'],
		desc: 'The base class for all layers',
		heading: 'Layers Core'
	},
	
	A2E: {
		src: ['layer/A2E.js'],
		desc: 'The Arc2Earth layer.',
		heading: 'Arc2Earth',
		deps: ['Layer']
	},
	
	AGS: {
		src: ['layer/AGS.js'],
		desc: 'The ArcGIS Server layer.',
		heading: 'ArcGIS Server',
		deps: ['Layer']
	},
	
	GeoIQ: {
		src: ['layer/GeoIQ.js'],
		desc: 'The GeoIQ layer.',
		heading: 'GeoIQ',
		deps: ['Layer']
	}
};