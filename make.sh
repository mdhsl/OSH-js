#!/bin/bash
rm dist/*.js 

closure-compiler \

  src/common/jhashtable.js \
  src/common/prototype.min.js \
  src/osh/osh-template.js \
  src/osh/osh-utils.js \
  src/osh/osh-Buffer.js \
  src/osh/osh-Controller.js \
  src/osh/datasource/osh-DataSourceConnector.js \
  src/osh/datasource/osh-DataSourceConnector-Websocket.js \
  src/osh/datasource/osh-DataSource.js \
  src/osh/datasource/osh-DataSource-mjpegvideo.js \
  src/osh/datasource/osh-DataSource-OrientationQuaternionDataSource.js \
  src/osh/datasource/osh-DataSource-LatLonAlt.js \
  src/osh/datasource/osh-DataSourceProvider.js \
  src/osh/ui/osh-UI-View.js \
  src/osh/ui/osh-UI-MJpegView.js \
  src/osh/ui/osh-UI-LeafletView.js 
