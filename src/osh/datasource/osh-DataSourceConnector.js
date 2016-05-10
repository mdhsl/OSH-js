OSH.DataSource.DataSourceConnector = Class.create({
  initialize: function(url) {
    this.url = url;
    this.id = "DataSourceConnector-"+OSH.Utils.randomUUID();
  },
  
  getId: function() {
    return this.id;
  },
  
  getUrl: function() {
    return this.url;
  },
  
  onMessage: function(data) {} 
});
