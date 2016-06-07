OSH.UI.Styler = Class.create({
    initialize:function(jsonProperties) {
    	this.properties = jsonProperties;
    	this.id = "styler-"+OSH.Utils.randomUUID();
    },
    
    setData: function(dataSourceId,data, view) {},
    
    getId: function() {
    	return this.id;
    }
    
});