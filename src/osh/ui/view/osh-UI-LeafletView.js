OSH.UI.LeafletView = Class.create(OSH.UI.View,{
	initialize:function($super,divId, properties) {
		$super(divId);
		// creates the leaflet renderer
		this.renderer = new OSH.UI.LeafletRenderer(divId);
		
		this.stylerToObj = new Hashtable();
	},
	
	/**
	 * Add viewItem to the view
	 */
	addViewItem: function(viewItem) {
		if(viewItem.hasOwnProperty("styler")) {
			this.viewItems.push(viewItem);
			var styler = viewItem.styler;
			this.stylers.push(styler);
		}
	},
	
	updateMarker: function(styler) {
		var markerId = 0;
		
		if(!this.stylerToObj.containsKey(styler.getId())) {
			// adds a new marker to the leaflet renderer
			markerId = this.renderer.addMarker({
				lat:styler.location.y,
				lon:styler.location.x,
				orientation:styler.orientation.heading,
				color:styler.color,
				icon:styler.icon
			});
			
			this.stylerToObj.put(styler.getId(),markerId);
		} else {
			markerId = this.stylerToObj.get(styler.getId());
		}
		
		this.renderer.updateMarker(markerId,{
			lat:styler.location.y,
			lon:styler.location.x,
			orientation:styler.orientation.heading,
			color:styler.color,
			icon:styler.icon
		});
	},
	
	updatePolyline: function(styler) {
		var polylineId = 0;
		
		if(!this.stylerToObj.containsKey(styler.getId())) {
			// adds a new marker to the leaflet renderer
			polylineId = this.renderer.addPolyline({
				color:styler.color,
				weight:styler.weight,
				locations:styler.locations,
				maxPoints:styler.maxPoints,
				opacity:styler.opacity,
				smoothFactor:styler.smoothFactor
			});
			
			this.stylerToObj.put(styler.getId(),polylineId);
		} else {
			polylineId = this.stylerToObj.get(styler.getId());
		}
		
		this.renderer.updatePolyline(polylineId,{
			color:styler.color,
			weight:styler.weight,
			locations:styler.locations,
			maxPoints:styler.maxPoints,
			opacity:styler.opacity,
			smoothFactor:styler.smoothFactor
		});
	},
	
	setData: function(dataSourceId,data) {
		for(var i=0;i < this.stylers.length;i++) {
			this.stylers[i].setData(dataSourceId,data,this);
		}
	}
});