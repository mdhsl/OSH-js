OSH.UI.LeafletRenderer = Class.create(OSH.UI.Renderer,{
	initialize:function($super,divId, properties) {
		$super(divId);
		this.init();
	},
	
	init:function() {
	  this.map = new L.Map(this.divId, {
         fullscreenControl: true
      });
      this.map.setView(new L.LatLng(0, 0), 15);
      this.initLayers();
      this.markers = new Hashtable();
      this.first = true;
      this.polylines = new Hashtable();
	},
	
	initLayers: function() {
	   // create the tile layer with correct attribution
	   var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	   var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	   var osm = new L.TileLayer(osmUrl, {
	         minZoom: 1,
	         maxZoom: 17,
	         attribution: osmAttrib
	   });
	   this.map.addLayer(osm);
	},
	
	addMarker: function(properties) {
		 //create marker
		var marker = null;
		if(properties.icon != null) {
		    var markerIcon = L.icon({
		        iconAnchor: [16, 16],
		        iconUrl: properties.icon
		    });
		    
		    marker = L.marker([properties.lat, properties.lon], {
		        icon: markerIcon
		    });
		} else {
			marker = L.marker([properties.lat, properties.lon]);
		}
	    
	    //TODO:for selected marker event
	    //this.marker.on('click',this.onClick.bind(this));
	    
	    marker.addTo(this.map);
	    marker.setRotationAngle(properties.orientation);
	    
	    var id = "view-marker-"+OSH.Utils.randomUUID();
	    this.markers.put(id,marker);
	    
	    return id;
	},
	
	updateMarker: function(id,properties) {
		var marker =  this.markers.get(id);
		// updates position
        var lon = properties.lon;
        var lat = properties.lat;
        
        if (!isNaN(lon) && !isNaN(lat)) {
            var newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng);
        }
        
        // updates orientation
        marker.setRotationAngle(properties.orientation);
        
        if(properties.icon != null && marker._icon.iconUrl != properties.icon) {
        	// updates icon
        	var markerIcon = L.icon({
		        iconAnchor: [16, 16],
		        iconUrl: properties.icon
		    });
        	marker.setIcon(markerIcon);
        }
        
        if(this.first) {
            this.map.setView(new L.LatLng(lat, lon), this.map.getZoom());
            this.first = false;
        }  
	},
	
	addPolyline: function(properties) {
		var polylinePoints = [];
		
		for(var i=0;i < properties.locations.length;i++) {
			polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
        }
		
		//create path
		var polyline = new L.Polyline(polylinePoints, {
			color: properties.color,
			weight: properties.weight,
			opacity: properties.opacity,
			smoothFactor: properties.smootFactor
		}).addTo(this.map);
		
		var id = "view-polyline-"+OSH.Utils.randomUUID();
		this.polylines.put(id,polyline);
		
		return id;
	},
	
	updatePolyline: function(id,properties) {
		if(this.polylines.containsKey(id)) {
			var polyline = this.polylines.get(id);
			
			// removes the layer
	        this.map.removeLayer(polyline);
	        
	        var polylinePoints = [];
	        for(var i=0;i < properties.locations.length;i++) {
	        	polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
	        }
	        
	        //create path
			var polyline = new L.Polyline(polylinePoints, {
				color: properties.color,
				weight: properties.weight,
				opacity: properties.opacity,
				smoothFactor: properties.smoothFactor
			}).addTo(this.map);
			
			this.polylines.put(id,polyline);
		}
	}
});

/***  little hack starts here ***/
L.Map = L.Map.extend({
    openPopup: function(popup) {
        this._popup = popup;
        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
}); 

// Defines rotated marker
(function() {
  // save these original methods before they are overwritten
  var proto_initIcon = L.Marker.prototype._initIcon;
  var proto_setPos = L.Marker.prototype._setPos;

  var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

  L.Marker.addInitHook(function () {
      var iconAnchor = this.options.icon.options.iconAnchor;
      if (iconAnchor) {
          iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
      }
      this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom' ;
      this.options.rotationAngle = this.options.rotationAngle || 0;
  });

  L.Marker.include({
      _initIcon: function() {
          proto_initIcon.call(this);
      },

      _setPos: function (pos) {
          proto_setPos.call(this, pos);

          if(this.options.rotationAngle) {
              this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;

              if(oldIE) {
                  // for IE 9, use the 2D rotation
                  this._icon.style[L.DomUtil.TRANSFORM] = ' rotate(' + this.options.rotationAngle + 'deg)';
              } else {
                  // for modern browsers, prefer the 3D accelerated version
                  this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
              }
          }
      },

      setRotationAngle: function(angle) {
          this.options.rotationAngle = angle;
          this.update();
          return this;
      },

      setRotationOrigin: function(origin) {
          this.options.rotationOrigin = origin;
          this.update();
          return this;
      }
  });
})();

/***  end of hack ***/