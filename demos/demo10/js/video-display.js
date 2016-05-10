function init() {
  
  var data = [];
  var replayFactor = 3;
  
  // inits the data. It's the same data at different time
  var dat_1 = {
    GPS_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T08:00:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    ORIENTATION_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/OrientationQuaternion&temporalFilter=phenomenonTime,2015-02-16T08:00:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    VIDEO_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/VideoFrame&temporalFilter=phenomenonTime,2015-02-16T08:00:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor
  }

  var dat_2 = {
    GPS_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T08:01:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    ORIENTATION_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/OrientationQuaternion&temporalFilter=phenomenonTime,2015-02-16T08:01:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    VIDEO_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/VideoFrame&temporalFilter=phenomenonTime,2015-02-16T08:01:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor
  }

  var dat_3 = {
    GPS_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T08:02:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    ORIENTATION_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/OrientationQuaternion&temporalFilter=phenomenonTime,2015-02-16T08:02:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    VIDEO_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/VideoFrame&temporalFilter=phenomenonTime,2015-02-16T08:02:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor
  }

  var dat_4 = {
    GPS_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T08:03:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    ORIENTATION_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/OrientationQuaternion&temporalFilter=phenomenonTime,2015-02-16T08:03:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    VIDEO_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/VideoFrame&temporalFilter=phenomenonTime,2015-02-16T08:03:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor
  }

  var dat_5 = {
    GPS_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T08:04:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    ORIENTATION_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/OrientationQuaternion&temporalFilter=phenomenonTime,2015-02-16T08:04:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor,
    VIDEO_URL : "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/VideoFrame&temporalFilter=phenomenonTime,2015-02-16T08:04:00Z/2015-02-16T08:09:00Z&replaySpeed="+replayFactor
  }
  data.push(dat_1);
  data.push(dat_2);
  data.push(dat_3);
  data.push(dat_4);
  data.push(dat_5);
  
  
  var dataSourceProvider = new OSH.DataSource.DataSourceProvider({
       bufferingTime:3*1000, // 3 seconds
       synchronizedTime: false, // does not sync the data
       replayFactor:replayFactor
  });
  
  // creates controller 
  var controller = new OSH.Controller();
  controller.addDataSourceProvider(dataSourceProvider);
  
  // creates a map view
  var oshMapView = new OSH.UI.LeafletView("leafletMap");

  // adds view to controller
  controller.addView(oshMapView);
  
  // iterates over data to create marker + video popups                
  for (var i = 0; i < data.length; i++) {
    //creates data sources
    var latLonAltDataSource = new OSH.DataSource.LatLonAltDataSource("gps-"+i,data[i].GPS_URL);
    var videoDataSource     = new OSH.DataSource.VideoMjpegDataSource("video-"+i,data[i].VIDEO_URL);
    
    // creates views      
    var oshVideoView = new OSH.UI.MJpegView("container-video-"+i,{
        css:"popup-video"
    });
    // associates video stream to video view
    oshVideoView.setDataViewId(videoDataSource.getId());
    
    // adds marker to map
    oshMapView.addDataMarker({
      // associates GPS data to marker
      latLonDataViewId:latLonAltDataSource.getId(),
      displayPath: true,
      popupDivId: oshVideoView.getDivId()
    });
    
    // adds data sources to provider
    dataSourceProvider.addDataSource(latLonAltDataSource);
    dataSourceProvider.addDataSource(videoDataSource);       
    
    // adds view to controller
    controller.addView(oshVideoView); 
  }
  
  // starts streaming
  dataSourceProvider.connectAll();
}
