OSH.DataConnector.WebSocketDataConnector = Class.create(OSH.DataConnector.DataConnector,{
  connect: function() {
    if(this.ws == null) {
      //creates Web Socket
      this.ws = new WebSocket(this.getUrl());
      this.ws.binaryType = 'arraybuffer';
      this.ws.onmessage = function(event) {
        //callback data on message received
        this.onMessage(event.data);
      }.bind(this);
    }
  }
});

