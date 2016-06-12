OSH.UI.Styler.PointMarker = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.location = {x:0,y:0,z:0};
		this.orientation = {heading:0};
		this.icon = null;
		this.color = "#000000";
		
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
			this.dataSourceToStylerMap[properties.locationFunc.dataSourceId] = fn;
		}
		
		if(typeof(properties.orientationFunc) != "undefined") {
			var fn = function(rec) {
				this.orientation = properties.orientationFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap[properties.orientationFunc.dataSourceId] = fn;
		}
		
		if(typeof(properties.iconFunc) != "undefined") {
			var fn = function(rec) {
				this.icon = properties.iconFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap[properties.iconFunc.dataSourceId] = fn;
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec) {
				this.color = properties.colorFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap[properties.colorFunc.dataSourceId] = fn;
		}
	},
	
	setData: function($super,dataSourceId,rec,view) {
		if (dataSourceId in this.dataSourceToStylerMap) {
			this.dataSourceToStylerMap[dataSourceId](rec.data);
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined"){
				view.updateMarker(this,rec.timeStamp);
			}
		}
	}
});