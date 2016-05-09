var instanceController = null;

OSH.Controller = Class.create({
  initialize: function() {
    this.views     = [];
  },
  
  addDataSourceProvider: function(dataSourceProvider) {
    this.dataSourceProvider = dataSourceProvider;
  },
  
  addView: function(oshView) {
    this.views.push(oshView);
  }
});

OSH.Controller.getSingleton = function() {
	if(instanceController == null){
		instanceController = new OSH.Controller();
	}
	return instanceController;
}
