OSH.Video = {
	version: 'dev'
};

window.OSH.Video = OSH.Video;

/**
 * The OSH.Video component is designed to decode and render video data.
 * Two format are supported for now: mp4 and mjpeg.
 * The mjpeg format uses the default blob and <img> tag implementation whereas the mp4 
 * format uses the Media Source Extended API and so the <video> tag.
 * The format can be specified as a constructor parameter as well as width and height such as:
 * params:{
 *  format:"mjpeg"/"mp4",
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
    if(options.format && options.format == "mjpeg") {
        this.format = "mjpeg";
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

    if(this.format  == "mjpeg") {
      this.player = new OSH.Video.Mjpeg(document.getElementById(this.div),subParams);
    } else if(this.format == "mp4") {
      this.player = new OSH.Video.Mp4(document.getElementById(this.div),subParams);
    }
};


OSH.Video.prototype.parseTimeStamp = function(data) {
   return this.player.parseTimeStamp(data);
}

OSH.Video.prototype.onDataCallback = function(data) {
    this.player.onDataCallback(data);
};

//------------ MP4 -------------------/

OSH.Video.Mp4 = function(div,options) {
    this.timeStampParser = new OSH.TimeStampParser.VideoMP4();
    
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
    this.sourceBuffer = null;
    this.queue = [];
    
    this.video.src = window.URL.createObjectURL(this.mediaSource);
    
    this.mediaSource.addEventListener('sourceopen', function(e) {
      this.mediaSource.duration = 10000000;
      this.video.play();

      this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001E"');
      this.sourceBuffer.pendingAppends = [];
      this.sourceBuffer.addEventListener('updateend', this.onUpdateEnd.bind(this));

    }.bind(this), false);

    this.mediaSource.addEventListener('error', function(e) { console.log('error: ' + this.mediaSource.readyState); });
    
};

OSH.Video.Mp4.prototype.onUpdateEnd = function() {
    if (this.sourceBuffer.updating === false && this.sourceBuffer.pendingAppends.length > 0) {
      this.sourceBuffer.appendBuffer(this.sourceBuffer.pendingAppends.shift());
    } 
}
    
OSH.Video.Mp4.prototype.parseTimeStamp = function(data) {
  return this.timeStampParser.parse(data);
};

OSH.Video.Mp4.prototype.onDataCallback = function(data) {
    var newData = new Uint8Array(data);
    //if(this.timeStampParser.absoluteTime > 0){
        //truncates the data by removing the moov part
    //    newData = newData.subarray(692, newData.byteLength);
    //} 
    /*if (this.buffer.updating || this.queue.length > 0) {
      this.queue.push(newData);
    } else {
      this.buffer.appendBuffer(newData);
    }*/
    this.sourceBuffer.pendingAppends.push(newData);
    this.onUpdateEnd.call(this);
};

//------------   MJPEG -----------------//
OSH.Video.Mjpeg = function(div,options) {
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

OSH.Video.Mjpeg.prototype.parseTimeStamp = function(data) {
  return OSH.TimeStampParser.parseMpegVideo(data);
};

OSH.Video.Mjpeg.prototype.onDataCallback = function(data) {
  var imgBlob = new Blob([data]);
  var blobURL = window.URL.createObjectURL(imgBlob.slice(12));
  var oldBlobURL = this.imgTag.src;
  this.imgTag.src = blobURL;
  window.URL.revokeObjectURL(oldBlobURL);
};
