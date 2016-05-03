#cat common/jhashtable.js osh/osh-core.js osh/osh-sync-buffer.js osh/osh-utils.js osh/osh-controller.js osh/osh-timestampparser.js osh/osh-video.js  osh/ui/osh-dialog.js > dist/osh-all.js && cat css/* > dist/osh-all.css
#!/bin/bash
rm dist/*.js 

uglifyjs \
	src/common/jhashtable.js \
  src/osh/osh-core.js \
  src/osh/osh-sync-buffer.js \
  src/osh/osh-utils.js \
  src/osh/osh-controller.js \
  src/osh/osh-timestampparser.js \
  src/osh/osh-video.js \
  src/osh/ui/osh-dialog.js \
-o dist/osh-all.min.js
