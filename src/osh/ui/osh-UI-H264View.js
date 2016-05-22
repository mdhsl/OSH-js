OSH.UI.H264View = Class.create(OSH.UI.View,{
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
    
    var useWorker = false;
    var reuseMemory = true;
    var webgl = "auto";
    this.hasSps = false;
    
    this.avcWs = new Player({
      useWorker: useWorker,
      reuseMemory: reuseMemory,
      webgl: webgl,
      size: {
        width: width,
        height: height
      }
    });
    
    this.video = this.avcWs.canvas
    this.video.setAttribute("class",css);
    this.video.setAttribute("width",width);
    this.video.setAttribute("height",height);
    var domNode = document.getElementById(this.divId);
    domNode.appendChild(this.video);                    
  },
  
  decode : function(fullNal) {
    this.avcWs.decode(fullNal);
  },
  
  setData: function(data) {
    this.computeFullNalFromRaw(data,function(nal) {
        var nalType = nal[0] & 0x1F;
        //7 => PPS
        //8 => SPS
        //6 => SEI
        //5 => IDR
        if (nalType != 7 && nalType != 8 && nalType != 1 && nalType != 5 & nalType != 6)
          return;
        if (nalType == 7)
          this.hasSps = true;
       if (this.hasSps){
           this.decode(nal);
       }
     }.bind(this));
  },
  
  update: function($super,dataViewId, data) {
    if(dataViewId == this.dataViewId) {
        this.setData(data.data);
    }
  },
  
  setDataViewId: function(dataViewId) {
    this.dataViewId = dataViewId;
    this.video.setAttribute("id", dataViewId);
  },
  
  hasDataView: function($super,dataViewId) {
      return this.dataViewId == dataViewId || this.associatedViews.indexOf(dataViewId) >= 0;
  },
  
  computeFullNalFromRaw : function(data,callback) {
    if(!(data && data.length)) {
      return;
    } else {
      var endIndex   = -1;
      var firstIndex = -1;

      // find first NAL separator
      var nalSeparator = false;
      while((firstIndex = data.indexOf(1,firstIndex+1)) != -1){
          nalSeparator = data[firstIndex-1] == 0;
          nalSeparator &= data[firstIndex-2] == 0;
          nalSeparator &= data[firstIndex-3] == 0;
          if (nalSeparator)
             break;
      }
          
      //if found a NAL separator
      if(nalSeparator) {
          endIndex = firstIndex;
          //gets the data until the next separator
          while((endIndex = data.indexOf(1,endIndex+1)) != -1){
            nalSeparator = data[endIndex-1] == 0;
            nalSeparator &= data[endIndex-2] == 0;
            nalSeparator &= data[endIndex-3] == 0;
        
            //end separator found, callback full NAL unit
            if(nalSeparator) {
                callback(data.subarray(firstIndex+1,endIndex-3)); // subarray provides a new view of the array
                firstIndex = endIndex;
          }
      }
      
      if(endIndex == -1) {
        //otherwise = end of buffer       
        callback(data.subarray(firstIndex+1,data.length));  // subarray provides a new view of the array
        firstIndex = endIndex;        
      }
    }
  }
}
});
