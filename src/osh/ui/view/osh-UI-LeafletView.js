OSH.UI.LeafletView = Class.create(OSH.UI.View,{
	initialize:function($super,divId, properties) {
		$super(divId);
		// creates the leaflet renderer
		this.renderer = new OSH.UI.LeafletRenderer(divId);
		
		this.stylerToMarker = new Hashtable();
	},
	
	/**
	 * Add viewItem to the view
	 */
	addViewItem: function(viewItem) {
		if(viewItem.hasOwnProperty("styler")) {
			this.viewItems.push(viewItem);
			var styler = viewItem.styler;
			this.stylers.push(styler);
			
			// adds a new marker to the leaflet renderer
			var markerId = this.renderer.addMarker({
				lat:styler.location.y,
				lon:styler.location.x,
				orientation:styler.orientation.yaw,
				color:styler.color,
				icon:styler.icon
			});
			
			this.stylerToMarker.put(styler.getId(),markerId);
			
		}
	},
	
	updateMarker: function(styler) {
		var markerId = this.stylerToMarker.get(styler.getId());
		
		this.renderer.updateMarker(markerId,{
			lat:styler.location.y,
			lon:styler.location.x,
			orientation:styler.orientation.yaw,
			color:styler.color,
			icon:styler.icon
		});
	},
	
	setData: function(dataSourceId,data) {
		for(var i=0;i < this.stylers.length;i++) {
			this.stylers[i].setData(dataSourceId,data,this);
		}
	}
});