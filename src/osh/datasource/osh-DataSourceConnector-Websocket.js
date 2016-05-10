OSH.DataSource.WebSocketDataSourceConnector = Class.create(OSH.DataSource.DataSourceConnector,{
  connect: function() {
    if(this.ws == null) {
      //creates Web Socket
      var ws = new WebSocket(this.getUrl());
      ws.binaryType = 'arraybuffer';
      ws.onmessage = function(event) {
        //callback data on message received
        this.onMessage(event.data);
      }.bind(this);
    }
  }
});

