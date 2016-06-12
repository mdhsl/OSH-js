OSH.UI.VideoView = Class.create(OSH.UI.View, {
	initialize : function($super, divId, options) {
		$super(divId);

		var type = "";

		if (typeof (options) && options.type) {
			type = options.type;
		}

		this.videoView = null;

		if (type == "mp4") {
			this.videoView = new OSH.UI.Mp4View(divId, options);
		} else if (type == "h264") {
			this.videoView = new OSH.UI.H264View(divId, options);
		} else (type == "mjpeg") {
			this.videoView = new OSH.UI.MJpegView(divId, options);
		}
	},
	
	setData: function(dataSourceId,data) {
		if(this.videoView != null) {
			this.videoView.setData(data);
		}
	}
});