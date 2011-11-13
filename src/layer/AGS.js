
gvector.Polyline = gvector.Layer.extend({
    statics: {
        LAYER_TYPE: "AGS"
    },
    
	initialize: function(options) {
		L.Path.prototype.initialize.call(this, options);
	},
	
	options: {
		where: "1=1",
		url: null
	},
	
	_getFeatures: function() {
	    // Build URL
	    var url = this._options.url + "search" + // Arc2Earth datasource url + search service
	        "?f=gjson" + // Return GeoJSON formatted data
	        "&q=" + this._options.where + // By default return all features but could pass SQL statement (value<90)
	        "&callback=" + this._globalPointer + "._processFeatures"; // Need this for JSONP
	        if (!this._options.showAll) {
	            url += "&bbox=" + this._buildBoundsString(this._options.map.getBounds()); // Build bbox geometry
	        }
	    
	    // Dynamically load JSONP
	    var head = document.getElementsByTagName("head")[0];
	    var script = document.createElement("script");
	    script.type = "text/javascript";
	    script.src = url;
	    head.appendChild(script);
	
	},
	
	_processFeatures: function(data) {
	    var bounds = this._options.map.getBounds();
	    
	    // Check to see if the _lastQueriedBounds is the same as the new bounds
	    // If true, don't bother querying again.
	    if (this._lastQueriedBounds && this._lastQueriedBounds.equals(bounds)) {
	        return;
	    }
	    
	    // Store the bounds in the _lastQueriedBounds member so we don't have
	    // to query the layer again if someone simply turns a layer on/off
	    this._lastQueriedBounds = bounds;
	
	    // If "data.features" exists and there's more than one feature in the array
	    if (data && data.features && data.features.length) {
	        
	        // Loop through the return features
	        for (var i = 0; i < data.features.length; i++) {
	        
	            // All objects are assumed to be false until proven true (remember COPS?)
	            var onMap = false;
	        
	            // If we have an "id" member for this GeoJSON object
	            if (data.features[i].id) {
	                
	                // Loop through all of the features currently on the map
	                for (var i2 = 0; i2 < this._vectors.length; i2++) {
	                
	                    // Does the "id" member for this feature match the feature on the map
	                    if (this._vectors[i2].id && data.features[i].id == this._vectors[i2].id) {
	                    
	                        // The feature is already on the map
	                        onMap = true;
	                        
	                    }
	                    
	                }
	                
	            }
	            
	            // If the feature isn't already or the map
	            if (!onMap) {
	                
	                // Convert GeoJSON to Google Maps vector (Point, Polyline, Polygon)
	                var vector_or_vectors = this._geojsonGeometryToGoogle(data.features[i].geometry, this._getFeatureVectorOptions(data.features[i]));
	                data.features[i][vector_or_vectors instanceof Array ? "vectors" : "vector"] = vector_or_vectors;
	                
	                // Show the vector or vectors on the map
	                if (data.features[i].vector) data.features[i].vector.setMap(this._options.map);
	                if (data.features[i].vectors && data.features[i].vectors.length) {
	                    for (var i3 = 0; i3 < data.features[i].vectors.length; i3++) {
	                        data.features[i].vectors[i3].setMap(this._options.map);
	                    }
	                }
	                
	                // Store the vector in an array so we can remove it later
	                this._vectors.push(data.features[i]);
	                
	                if (this._options.infoWindowTemplate) {
	                    
	                    var me = this;
	                    var feature = this._vectors[i2];
	                    
	                    this._setInfoWindowContent(feature);
	                    
	                    (function(feature){
	                        google.maps.event.addListener(feature.vector, "click", function(evt) {
	                            me._showInfoWindow(feature, evt);
	                        });
	                    }(feature));
	                    
	                }
	            
	            }
	            
	        }
	        
	    }
	
	}
});