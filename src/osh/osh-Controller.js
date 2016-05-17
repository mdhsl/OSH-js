var instanceController = null;

OSH.Controller = Class.create({
  initialize: function() {
    this.views     = [];
    this.initEvents(); 
  },
  
  initEvents: function() {
   document.observe("osh:dataView", function(event) {
      for(var i = 0; i < this.views.length;i++) {
        this.views[i].selectDataView(event.memo);
      }
    }.bind(this));
  },
  addDataSourceProvider: function(dataSourceProvider) {
    this.dataSourceProvider = dataSourceProvider;
    this.dataSourceProvider.onData = this.onDataUpdate.bind(this);
  },
  
  addView: function(oshView) {
    this.views.push(oshView);
    if(oshView.divId) {
      var div = $(oshView.divId);
      if(div != null){
        $(oshView.divId).observe("click", function(event) {
          if(event.target.id.startsWith("DataSource-")) {
            for(var i = 0; i < this.views.length;i++) {
              this.views[i].selectDataView([event.target.id]);
            }
          }
        }.bind(this));
      }
    }
  },
  
  onDataUpdate: function(id,data) {
    for(var i = 0; i < this.views.length;i++) {
      this.views[i].update(id,data);
    }
  }
});

OSH.Controller.getSingleton = function() {
	if(instanceController == null){
		instanceController = new OSH.Controller();
	}
	return instanceController;
}
