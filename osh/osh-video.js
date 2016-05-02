OSH.Video = {
	version: 'dev'
};

window.OSH.Video = OSH.Video;

/**
 * The OSH.Video component is designed to decode and render video data.
 * Two format are supported for now: mp4 and mpeg.
 * The mpeg format uses the default blob and <img> tag implementation whereas the mp4 
 * format uses the Media Source Extended API and so the <video> tag.
 * The format can be specified as a constructor parameter as well as width and height such as:
 * params:{
 *  format:"mpeg"/"mp4",
 *  width:"500px",
 *  height:"500px"
 * }
 * The default width is 640 and height 480
 * The div parameter will be use to attach the corresponding tag to display video data.
 * 
 */
OSH.Video = function(options) {
    // sets mp4 as default format
    this.format = "mp4";
    this.width = "640px";
    this.height = "480px";
    this.div = "body";
    
    if(options.width) {
        this.width = options.width;
    }  
    if(options.height) {
        this.height = options.height;
    }
    if(options.div) {
        this.div = options.div;
    }
    
    // sets mpeg mpeg format if specified
    if(options.format && options.format == "mpeg") {
        this.format = "mpeg";
    } 

    var css = "";
    if(options.css) {
      css = options.css;
      //find width to reset default value
      //var width = OSH.Utils.getStyleRuleValue('width', '.'+css); // searches all sheets for the first .className rule and returns the set width style.
      //var height = OSH.Utils.getStyleRuleValue('height', '.'+css); // searches all sheets for the first .className rule and returns the set height style.
      //if(width != null) {
      //  this.width = width;
      //}
      //if(height != null) {
      //  this.height = height;
      //}
    }
    
    var id = OSH.Utils.randomUUID();
    if(options.id) {
      id = options.id;
    }
    
    var subParams = {
        width:this.width,
        height:this.height,
        css: css,
        id:id
    }

    if(this.format  == "mpeg") {
      this.video = new OSH.Video.Mpeg(document.getElementById(this.div),subParams);
    } else if(this.format == "mp4") {
      this.video = new OSH.Video.Mp4(document.getElementById(this.div),subParams);
      this.timeStampParser = new OSH.TimeStampParser.VideoMP4();
    }
};

OSH.Video.prototype.parseTimeStamp = function(data) {
    //TODO: find a way to keep "this" reference to use function assignment into constructor and avoid
    //this test
    //cannot assign a function directly without loosing this reference.
    if(this.format  == "mpeg") {
      return OSH.TimeStampParser.parseMpegVideo(data);
    } else if(this.format == "mp4") {
      return this.timeStampParser.parse(data);
    }
}

OSH.Video.prototype.onDataCallback = function(data) {
    this.video.onDataCallback(data);
};

//------------ MP4 -------------------/

OSH.Video.Mp4 = function(div,options) {
    // creates video tag element
    this.video = document.createElement("video");
    this.video.setAttribute("height", options.height);
    this.video.setAttribute("width", options.width);
    this.video.setAttribute("class", options.css);
    if(options.id) {
      this.video.setAttribute("id", options.id);
    }
    // appends <video> tag to <div>
    div.appendChild(this.video);
    
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
};

OSH.Video.Mp4.prototype.onDataCallback = function(data) {
    if (this.buffer.updating || this.queue.length > 0) {
      this.queue.push(data);
    } else {
      this.buffer.appendBuffer(data);
    }
};

//------------   MPEG -----------------//
OSH.Video.Mpeg = function(div,options) {
  // creates video tag element
  this.imgTag = document.createElement("img");
  this.imgTag.setAttribute("height", options.height);
  this.imgTag.setAttribute("width", options.width);
  this.imgTag.setAttribute("class", options.css);
  if(options.id) {
      this.imgTag.setAttribute("id", options.id);
    }
  // appends <img> tag to <div>
  div.appendChild(this.imgTag);
};

OSH.Video.Mpeg.prototype.onDataCallback = function(data) {
  var imgBlob = new Blob([data]);
  var blobURL = window.URL.createObjectURL(imgBlob.slice(12));
  var oldBlobURL = this.imgTag.src;
  this.imgTag.src = blobURL;
  window.URL.revokeObjectURL(oldBlobURL);
};
