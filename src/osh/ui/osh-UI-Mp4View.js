OSH.UI.Mp4View = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
    $super(divId);
    
    var width = "640";
    var height = "480";
    var css = "";
    
    if(options.width) {
      width = options.width;
    }
    
    if(options.height) {
      height = options.height;
    }
    
    if(options.css) {
      css = options.css;
    }
    
    // creates video tag element
    this.imgTag = document.createElement("img");
    this.imgTag.setAttribute("height", height);
    this.imgTag.setAttribute("width", width);
    this.imgTag.setAttribute("class", css);
    this.imgTag.setAttribute("id", "dataview-"+OSH.Utils.randomUUID());
    
    // appends <img> tag to <div>
    document.getElementById(this.divId).appendChild(this.imgTag);
  },
  
  setData: function(data) {
    var oldBlobURL = this.imgTag.src;
    this.imgTag.src = data;
    window.URL.revokeObjectURL(oldBlobURL);  
  },
  
  update: function($super,dataViewId, data) {
    if(dataViewId == this.dataViewId) {
        this.setData(data.data);
    }
  },
  
  setDataViewId: function(dataViewId) {
    this.dataViewId = dataViewId;
    this.imgTag.setAttribute("id", dataViewId);
  },
  
  hasDataView: function($super,dataViewId) {
      return this.dataViewId == dataViewId || this.associatedViews.indexOf(dataViewId) >= 0;
  }
});
