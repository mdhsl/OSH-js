OSH.UI.Styler.PointMarker = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.location = {x:0,y:0,z:0};
		this.orientation = 0;
		this.icon = null;
		this.color = "#000000";
		this.dataSourceToStylerMap = new Hashtable();
		
		if(typeof(properties.location) != "undefined"){
			this.location = properties.location;
		} 
		
		if(typeof(properties.orientation) != "undefined"){
			this.orientation = properties.orientation;
		} 
		
		if(typeof(properties.icon) != "undefined"){
			this.icon = properties.icon;
		} 
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec) {
				this.location = properties.locationFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap.put(properties.locationFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.orientationFunc) != "undefined") {
			this.orientationFunc = properties.orientationFunc.handler;
		}
		
		if(typeof(properties.iconFunc) != "undefined") {
			this.iconFunc = properties.iconFunc.handler;
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			this.colorFunc = properties.colorFunc.handler;
		}
	},
	
	setData: function($super,dataSourceId,rec,view) {
		if(this.dataSourceToStylerMap.containsKey(dataSourceId)) {
			this.dataSourceToStylerMap.get(dataSourceId)(rec.data);
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined"){
				view.updateMarker(this);
			}
		}
	}
});