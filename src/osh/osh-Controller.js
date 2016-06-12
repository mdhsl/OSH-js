OSH.Controller = Class.create({
  initialize: function() {
    this.views     = [];
    this.initEvents(); 
  },
  
  initEvents: function() {
   document.observe("osh:select", function(event) {
      for(var i = 0; i < this.views.length;i++) {
        this.views[i].selectDataView(event.memo);
      }
    }.bind(this));
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
  }
});
