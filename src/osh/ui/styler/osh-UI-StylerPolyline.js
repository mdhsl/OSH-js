OSH.UI.Styler.Polyline = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.locations = [];
     	this.color = 'red';
		this.weight = 1;
		this.opacity = 1;
		this.smoothFactor = 1;
		this.maxPoints = 10;
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.weight) != "undefined"){
			this.weight = properties.weight;
		} 
		
		if(typeof(properties.opacity) != "undefined"){
			this.opacity = properties.opacity;
		} 
		
		if(typeof(properties.smoothFactor) != "undefined"){
			this.smoothFactor = properties.smoothFactor;
		} 
		
		if(typeof(properties.maxPoints) != "undefined"){
			this.maxPoints = properties.maxPoints;
		} 
		
		if(typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec) {
				var loc = properties.locationFunc.handler(rec);
				this.locations.push(loc);
				if(this.locations.length > this.maxPoints) {
					this.locations.shift();
				}
			}.bind(this);
			this.dataSourceToStylerMap.put(properties.locationFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec) {
				this.color = properties.colorFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap.put(properties.colorFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.weightFunc) != "undefined") {
			var fn = function(rec) {
				this.weight = properties.weightFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap.put(properties.weightFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.opacityFunc) != "undefined") {
			var fn = function(rec) {
				this.opacity = properties.opacityFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap.put(properties.opacityFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.smoothFactorFunc) != "undefined") {
			var fn = function(rec) {
				this.smoothFactor = properties.smoothFactorFunc.handler(rec);
			}.bind(this);
			this.dataSourceToStylerMap.put(properties.smoothFactorFunc.dataSourceId,fn);
		}
	},
	
	setData: function($super,dataSourceId,rec,view) {
		if(this.dataSourceToStylerMap.containsKey(dataSourceId)) {
			this.dataSourceToStylerMap.get(dataSourceId)(rec.data);
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined"){
				view.updatePolyline(this);
			}
		}
	}
});