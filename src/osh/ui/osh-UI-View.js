OSH.UI.View = Class.create({
    initialize:function(divId) {
      this.divId = divId;
      this.id = "view-"+OSH.Utils.randomUUID();
      
      var div = document.getElementById(divId);
      if(div == "undefined" || div == null) {
        var hiddenDiv = document.createElement("div");
        hiddenDiv.style.display = "none";
        
        document.body.appendChild(hiddenDiv);
        
        var elementDiv = document.createElement("div");
        elementDiv.setAttribute("id",divId);
        
        hiddenDiv.appendChild(elementDiv);
      }
      this.associatedViews = [];
    },
    
    update: function(dataViewId, data) {},
    
    selectDataView:function(dataViewId) {},
    
    getId: function() {
      return this.id;
    },
    
    getDivId: function() {
      return this.divId;
    },
    
    addAssociatedDataViews: function(associatedViews) {
      this.associatedViews = this.associatedViews.concat(associatedViews);
    },
    
    hasDataView: function(dataViewId) {}
});
