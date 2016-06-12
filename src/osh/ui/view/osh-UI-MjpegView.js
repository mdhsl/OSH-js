OSH.UI.MJpegView = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
    $super(divId);
    
    this.dataSourceId = -1;
    // sets dataSourceId
    if(typeof(options.dataSourceId) != "undefined") {
    	this.dataSourceId = options.dataSourceId;
    }
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
  
  setData: function(dataSourceId,data) {
	if(dataSourceId == this.dataSourceId) {  
	    var oldBlobURL = this.imgTag.src;
	    this.imgTag.src = data;
	    window.URL.revokeObjectURL(oldBlobURL);
	}
  }
});