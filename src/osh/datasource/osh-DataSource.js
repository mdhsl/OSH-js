OSH.DataSource.DataSource = Class.create({
  initialize: function(name,url,options) {
    // checks if type is WebSocket
    if(url && url.trim().startsWith("ws://")) {
      this.connector = new OSH.DataSource.WebSocketDataSourceConnector(url);
      // connects the callback 
      this.connector.onMessage = this.onMessage.bind(this);
      this.id = "DataSource-"+OSH.Utils.randomUUID();
      this.name = name;
    }
    
    this.androidShift = 0;
    
    if(options.androidShift) {
      this.androidShift = 16 * 1000;  
    }
  },
  
  connect: function() {
    this.connector.connect();
  },
  
  onMessage: function(data) {
    var data = {
      timeStamp: this.parseTimeStamp(data),
      data: this.parseData(data)
    };
    this.onData(data);
  },
  
  parseTimeStamp: function(data){
    return new Date().getTime();
  },
  
  parseData: function(data){
    return data;
  },
  
  /**
   * data is represented by 
   * data = { 
   *    timeStamp: timeStamp // number
   *    data: data // data to render
   * };
   */ 
  onData:function(data) {},
  
  getId: function() {
    return this.id;
  },
  
  getName: function() {
    return this.name;
  }
  
  
});
