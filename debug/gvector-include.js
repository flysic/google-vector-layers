(function() {
	//TODO replace script list with the one from ../buid/deps.js
	var scripts = [
		'gvector.js',
		
		'core/Util.js', 
		'core/Class.js',
		
		'layer/Layer.js',
		'layer/AGS.js',
		'layer/A2E.js',
		'layer/GeoIQ.js'
	];
	
	function getSrcUrl() {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var src = scripts[i].src;
			if (src) {
				var res = src.match(/^(.*)gvector-include\.js$/);
				if (res) {
					return res[1] + '../src/';
				}
			}
		}
	}
	
	var path = getSrcUrl();
	for (var i = 0; i < scripts.length; i++) {
		document.writeln("<script type='text/javascript' src='" + path + "../src/" + scripts[i] + "'></script>");
	}
})();

function getRandomLatLng(map) {
	var bounds = map.getBounds(),
		southWest = bounds.getSouthWest(),
		northEast = bounds.getNorthEast(),
		lngSpan = northEast.lng - southWest.lng,
		latSpan = northEast.lat - southWest.lat;
	
	return new L.LatLng(
			southWest.lat + latSpan * Math.random(),
	        southWest.lng + lngSpan * Math.random());
}