OSH.UI.CesiumView = Class.create(OSH.UI.View, {
	initialize : function($super, divId, properties) {
		$super(divId);
		this.stylerToObj = {};
		this.init();
	},

	/**
	 * Add viewItem to the view
	 */
	addViewItem : function(viewItem) {
		if (viewItem.hasOwnProperty("styler")) {
			this.viewItems.push(viewItem);
			var styler = viewItem.styler;
			this.stylers.push(styler);
		}
	},

	updateMarker : function(styler,timeStamp) {
		var markerId = 0;

		if (!(styler.getId() in this.stylerToObj)) {
			markerId = this.addMarker({
				lat : styler.location.y,
				lon : styler.location.x,
				alt : styler.location.z,
				orientation : styler.orientation.heading,
				color : styler.color,
				icon : styler.icon,
				timeStamp: timeStamp
			});

			this.stylerToObj[styler.getId()] = markerId;
		} else {
			markerId = this.stylerToObj[styler.getId()];
		}

		this.updateMapMarker(markerId, {
			lat : styler.location.y,
			lon : styler.location.x,
			alt : styler.location.z,
			orientation : styler.orientation.heading,
			color : styler.color,
			icon : styler.icon,
			timeStamp: timeStamp
		});
	},

	setData : function(dataSourceId, data) {
		for (var i = 0; i < this.stylers.length; i++) {
			this.stylers[i].setData(dataSourceId, data, this);
		}
	},
	
	//---------- MAP SETUP --------------//
	init : function() {
		this.markers = {};
	    this.first = true;
	    
	    this.viewer = new Cesium.Viewer(this.divId, {
	    	imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
	    	    url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
	    	}),
	    	baseLayerPicker : false,
	    	timeline : false,
			homeButton : false,
			navigationInstructionsInitiallyVisible : false,
			navigationHelpButton : false,
			geocoder : false,
			fullscreenButton : false,
			showRenderLoopErrors : false,
			animation:false
	    });
	},
	
	addMarker : function(properties) {
		// gps position
		var imgIcon = 'images/cameralook.png';
		if(properties.icon != null) {
			imgIcon = properties.icon;
		}
		
		var entity = this.viewer.entities.add({
			position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
			billboard : {
				image : imgIcon,
				rotation : Cesium.Math.toRadians(-90),
				horizontalOrigin : Cesium.HorizontalOrigin.CENTER
			}
		});

		var id = "view-marker-"+OSH.Utils.randomUUID();
		this.markers[id] = entity;
		return id;
	},
	
	updateMapMarker: function(id,properties) {
		// updates position
        var lon = properties.lon;
        var lat = properties.lat;
        var alt = properties.lat;
        
        if (!isNaN(lon) && !isNaN(lat) && !isNaN(alt)) {
        	var marker =  this.markers[id];
        	var julianDate = Cesium.JulianDate.fromIso8601(new Date(properties.timeStamp).toISOString());
    		// set clock to GPS time
    		this.viewer.clock.currentTime = julianDate;

    		var rfPos = [ lon, lat, alt ];
    		var altitude = this.getAltitude(lat, lon);
    		if (altitude > 1) {
    			altitude += 0.3;
    		}

    		marker.position = Cesium.Cartesian3.fromDegrees(lon, lat, altitude);

    		if (this.first && this.viewer.trackedEntity != 'undefined') {
    			this.viewer.zoomTo(this.viewer.entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-10), Cesium.Math.toRadians(-30),3000));
    			this.first = false;
    		}
        }
	},
	
	getAltitude : function(lat, lon) {
		var position = Cesium.Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cesium.Cartesian3());
		var altitude = this.viewer.scene.globe.getHeight(Cesium.Ellipsoid.WGS84.cartesianToCartographic(position));

		if (altitude == 'undefined' || altitude <= 0)
			altitude = 0.1;
		return altitude;
	},
});