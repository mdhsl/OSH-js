OSH.DataProvider.Video = Class.create(OSH.DataProvider.DataProvider,{
  initialize: function($super,name,url,options) {
    $super(name,url,options);
    
    var type = "mjpeg";
    
    if(typeof(options) && options.type) {
      type = options.type;
    }
    
    this.videoDataSource = null;
    
    if(type == "mp4") {
      this.videoDataSource = new OSH.DataSource.VideoMp4DataSource(name,url);
    } else if(type == "h264") {
      this.videoDataSource = new OSH.DataSource.VideoH264DataSource(name,url);
    } else {
      this.videoDataSource = new OSH.DataSource.VideoMjpegDataSource(name,url);
    }
  },
  
  parseTimeStamp: function($super,data){
    return this.videoDataSource.parseTimeStamp(data);
  },
  
  parseData: function($super,data){
    return this.videoDataSource.parseData(data);
  }
});
