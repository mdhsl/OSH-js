OSH.UI.VideoView = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
    $super(divId);
    
    var type = "mjpeg";
    
    if(typeof(options) && options.type) {
      type = options.type;
    }
    
    this.videoView = null;
    
    if(type == "mp4") {
      this.videoView = new OSH.UI.Mp4View(divId,options);
    } else if(type == "h264") {
      this.videoView = new OSH.UI.H264View(divId,options);
    } else {
      this.videoView = new OSH.UI.MJpegView(divId,options);
    }
  },
  
  setData: function(data) {
    this.videoView.setData(data);
  },
  
  update: function($super,dataViewId, data) {
    this.videoView.update(dataViewId,data);
  },
  
  setDataViewId: function(dataViewId) {
    this.videoView.setDataViewId(dataViewId);
  },
  
  hasDataView: function($super,dataViewId) {
      return this.videoView.hasDataView(dataViewId);
  }
});
