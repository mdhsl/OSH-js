var first = true;

OSH.LeafletDataMarker = function(map) {
    this.map = map;
    this.pathCoordinates = [];
    //create marker
    this.markerIcon = L.icon({
        iconAnchor: [16, 16],
        iconUrl: 'images/arrow-direction.svg'
    });

    this.marker = L.marker([0, 0], {
        icon: this.markerIcon
    }).addTo(this.map);
    
    this.id = this.marker._leaflet_id;
    
    //create path
    this.path = new L.Polyline(this.pathCoordinates, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    }).addTo(this.map);
    
    // creates and binds a popup
    this.bindPopup();
}

/**
 * Callback after receiving location values
 */ 
OSH.LeafletDataMarker.prototype.onUpdateLocationData = function(data) {
  var self = this;
  var rec = String.fromCharCode.apply(null, new Uint8Array(data));
  var tokens = rec.trim().split(",");
  var lat = parseFloat(tokens[1]);
  var lon = parseFloat(tokens[2]);
  var alt = parseFloat(tokens[3]);

  if (!isNaN(lon) && !isNaN(lat)) {
      var newLatLng = new L.LatLng(lat, lon);
      self.marker.setLatLng(newLatLng);

      if (first) {
          self.map.setView(self.marker.getLatLng(), self.map.getZoom());
          first = false;
      }
  }
  
  if (self.pathCoordinates.length > 200) {
     self.pathCoordinates.shift();
  }

  // removes the layer
  self.map.removeLayer(self.path);
  
  // pushes new coordinates
  self.pathCoordinates.push(new L.LatLng(lat, lon));
  
  // adds the new layer
  var path = new L.Polyline(self.pathCoordinates, {
     color: 'blue',
     weight: 5,
     opacity: 0.5,
     smoothFactor: 1
  }).addTo(self.map);;
}

/**
 * Callback after receiving orientation values
 */ 
OSH.LeafletDataMarker.prototype.onUpdateOrientationData = function(data) {
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var qx = parseFloat(tokens[1]);
    var qy = parseFloat(tokens[2]);
    var qz = parseFloat(tokens[3]);
    var qw = parseFloat(tokens[4]);
    
    //normalize
    var norm = (qx * qx + qy * qy + qz * qz + qw * qw);

    if (norm > 0.0) {
        norm = 1.0 / Math.sqrt(norm);
        qx = norm * qx;
        qy = norm * qy;
        qz = norm * qz;
        qw = norm * qw;
    } else {
      qx = 0.0;
      qy = 0.0;
      qz = 0.0;
      qw = 0.0;
    }
    
    //rotate
    var v0 = 0;
    var v1 = 1;
    var v2 = 0;
    
    var twoxx = 2.0 * qx * qx;
    var twoyy = 2.0 * qy * qy;
    var twozz = 2.0 * qz * qz;
    
    var xy = qx * qy;
    var yz = qy * qz;
    var xz = qx * qz;
    var wx = qw * qx;
    var wy = qw * qy;
    var wz = qw * qz;
    
    var vx = v0 * (1.0 - twoyy - twozz) +
               v1 * (2.0 * (xy - wz)) +
               v2 * (2.0 * (xz + wy));
    
    var vy = v0 * (2.0 * (xy + wz)) +
               v1 * (1.0 - twoxx - twozz) +
               v2 * (2.0 * (yz - wx));
    
    var vz = v0 * (2.0 * (xz - wy)) +
               v1 * (2.0 * (yz + wx)) +
               v2 * (1.0 - twoxx - twoyy);
    
            
    var heading = 90. - ((Math.atan2(vy, vx)) * 180 / Math.PI); 
    heading = heading  * 180 / Math.PI;
    if (heading > 180.)
        heading -= 360.;
        
    console.log(heading);    
    
    this.marker.setRotationAngle(heading);
    
};

OSH.LeafletDataMarker.prototype.bindPopup = function() {
  //create popup 
  var videoDivId = "video-"+this.id;
  
  // creates div element to encapsulate img tag
  var div = document.createElement('div');
  // creates img tag
  var videoElt = '<img id="'+videoDivId+'" class="popup-video" width="250px" height="200px"></img>';
  div.innerHTML = videoElt;
  
  // binds the popup
  this.marker.bindPopup(div, {
    offset: new L.Point(0, -16),
    autoPan:false
  });

  // saves the imgTag  
  this.imgTag = div.firstChild;
  
  //unbind popup and open a new dialog providing the video content
  $(this.imgTag).click(function() {
    var closeFn = function(event,ui)  {
      this.bindPopup();
    }.bind(this);
    
    // opens a dialog based on the popup div
    $("#"+videoDivId).dialog({
        height:'auto', 
        width:'auto',
        close: closeFn,
        dialogClass:"popup-video"  
    });
    
    // close the current popup
    this.marker.closePopup();
    this.marker.unbindPopup();
  }.bind(this));
};

/**
 * Get binary video data
 */ 
OSH.LeafletDataMarker.prototype.onUpdateVideoData = function(data) {
  var imgBlob = new Blob([data]);
  var blobURL = window.URL.createObjectURL(imgBlob.slice(12));
  var oldBlobURL = this.imgTag.src;
  this.imgTag.src = blobURL;
  window.URL.revokeObjectURL(oldBlobURL);
};
