OSH.UI.Styler.PointMarker = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.location = {x:0,y:0,z:0};
		this.orientation = {heading:0};
		this.icon = null;
		this.color = "#000000";
		
		this.functions = [];
		
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
			this.functions.push(properties.locationFunc);
			var fn = function(rec) {
				this.location = properties.locationFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.orientationFunc) != "undefined") {
			var fn = function(rec) {
				this.orientation = properties.orientationFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.orientationFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.iconFunc) != "undefined") {
			var fn = function(rec) {
				this.icon = properties.iconFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.iconFunc.dataSourceId,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec) {
				this.color = properties.colorFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceId,fn);
		}
	},
	addFn : function(dataSourceId, fn) {
		if(typeof(this.dataSourceToStylerMap[dataSourceId]) == "undefined") {
			this.dataSourceToStylerMap[dataSourceId] = [];
		}
		this.dataSourceToStylerMap[dataSourceId].push(fn);
	},
	
	setData: function($super,dataSourceId,rec,view) {
		if (dataSourceId in this.dataSourceToStylerMap) {
			var fnArr = this.dataSourceToStylerMap[dataSourceId];
			for(var i=0; i < fnArr.length;i++) {
				fnArr[i](rec.data);
			}
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined"){
				view.updateMarker(this,rec.timeStamp);
			}
		}
	},
	
	getDataSourceIds: function() {
		var res = [];
		for (var i in this.dataSourceToStylerMap) {
			res.push(i);
		}
		return res;
	},
	
    select: function($super,dataSourceIds) {
    	for(var i=0;i < dataSourceIds.length;i++) {
    		if(dataSourceIds[i] in this.dataSourceToStylerMap){
    			if(typeof(this.properties.locationFunc) != "undefined") {
    				this.properties.locationFunc.selected = true;
    			}
    			
    			if(typeof(this.properties.orientationFunc) != "undefined") {
    				this.properties.orientationFunc.selected = true;
    			}
    			
    			if(typeof(this.properties.iconFunc) != "undefined") {
    				this.properties.iconFunc.selected = true;
    			}
    			
    			if(typeof(this.properties.colorFunc) != "undefined") {
    				this.properties.colorFunc.selected = true;
    			}
    			break;
    		}
    	}
	}
});