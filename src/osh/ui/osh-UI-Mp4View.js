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
    this.video = document.createElement("video");
    this.video.setAttribute("height", height);
    this.video.setAttribute("width", width);
    this.video.setAttribute("class", css);
    // appends <video> tag to <div>
    document.getElementById(this.divId).appendChild(this.video);
    
    // creates MediaSource object
    this.mediaSource = new MediaSource();
    this.buffer = null;
    this.queue = [];
    
    this.video.src = window.URL.createObjectURL(this.mediaSource);
    
    this.mediaSource.addEventListener('sourceopen', function(e) {
      this.mediaSource.duration = 10000000;
      this.video.play();

      this.buffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001E"');

      this.buffer.addEventListener('updatestart', function(e) { /*console.log('updatestart: ' + mediaSource.readyState); */});
      this.buffer.addEventListener('update', function(e) { /*console.log('update: ' + mediaSource.readyState); */});
      this.buffer.addEventListener('updateend', function(e) { /*console.log('updateend: ' + mediaSource.readyState); */});
      this.buffer.addEventListener('error', function(e) { /*console.log('error: ' + mediaSource.readyState); */});
      this.buffer.addEventListener('abort', function(e) { /*console.log('abort: ' + mediaSource.readyState); */});

      this.buffer.addEventListener('update', function() { // Note: Have tried 'updateend'
        if(this.queue.length > 0 && !this.buffer.updating) {
          this.buffer.appendBuffer(this.queue.shift());
        }
      }.bind(this));
    }.bind(this), false);

    this.mediaSource.addEventListener('sourceopen', function(e) { /*console.log('sourceopen: ' + mediaSource.readyState); */});
    this.mediaSource.addEventListener('sourceended', function(e) { /*console.log('sourceended: ' + mediaSource.readyState); */});
    this.mediaSource.addEventListener('sourceclose', function(e) { /*console.log('sourceclose: ' + mediaSource.readyState); */});
    this.mediaSource.addEventListener('error', function(e) { console.log('error: ' + this.mediaSource.readyState); });
    
  },
  
  setData: function(data) {
    if (this.buffer.updating || this.queue.length > 0) {
      this.queue.push(data);
    } else {
      this.buffer.appendBuffer(data);
    }
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
  }
});
