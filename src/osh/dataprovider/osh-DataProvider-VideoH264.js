OSH.DataProvider.VideoH264 = Class.create(OSH.DataSource.DataSource,{
  initialize: function($super,name,url,options) {
    $super(name,url,options);
  },
  
  parseTimeStamp: function($super,data){
    //gets the timeStamp
    return new DataView(data).getFloat64(0, false); // read double time stamp as big endian
  },
  
  parseData: function($super,data){
    var len = data.byteLength;
    return new Uint8Array(data, 8, len-8); // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
  }
});
