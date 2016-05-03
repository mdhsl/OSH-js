OSH.UI = {
	version: 'dev'
};

window.OSH.UI = OSH.UI;

OSH.UI.Dialog = function(options) {
  // creates HTML element
  var uniqueId = new Date().getTime();
  
  this.div = document.createElement("div");
  this.div.setAttribute("class","pop-over");
  this.div.setAttribute("id",uniqueId);
  this.div.setAttribute("draggable","true");

  // creates close button
  var closeButton = document.createElement("a");
  closeButton.setAttribute("class","pop-close");
  closeButton.innerHTML = "x";
  closeButton.onclick = this.close.bind(this);
  
  this.div.appendChild(closeButton);
  
  // creates title
  var title = "Title";
  var h3 = document.createElement("h3");
  h3.innerHTML = title;
  
  if(options.title) {
    h3.innerHTML = options.title;
  } 
  
  this.div.appendChild(h3);
  
  // creates div content
  this.divContent = document.createElement("div");
  this.divContent.setAttribute("class","pop-content");
  
  // adds div content to div
  this.div.appendChild(this.divContent);
  
  // adds style
  this.div.style.display = "block";
  
  // adds div to body
  document.body.appendChild(this.div);
  
  // adds listener
  this.div.addEventListener('dragstart',this.drag_start.bind(this),false); 
  document.addEventListener('dragover',this.drag_over.bind(this),false); 
  document.addEventListener('drop',this.drop.bind(this),false); 
};

OSH.UI.Dialog.prototype.appendContent = function(div) {
  this.divContent.style.width = div.style.width+"px";
  this.divContent.style.height = div.style.height+"px";
  this.divContent.appendChild(div);
};

OSH.UI.Dialog.prototype.setContentSize = function(width,height) {
  this.divContent.style.width = width;
  this.divContent.style.height = height;
};

OSH.UI.Dialog.prototype.onClose = function (callback) {
  this.onClose = callback;
};

OSH.UI.Dialog.prototype.close = function() {
  document.body.removeChild(this.div);
  if(this.onClose) {
    this.onClose();
  }
};

OSH.UI.Dialog.prototype.drag_start = function(event) {
    event.stopPropagation();
    // Grab all computed styles of the dragged object
    var style = window.getComputedStyle(event.target, null);
    // dataTransfer sets data that is being dragged. In this case, the current X and Y values (ex. "1257,104")
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.setData("text-"+this.div.id,
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
     
};

OSH.UI.Dialog.prototype.drag_over = function(event) { 
    event.stopPropagation();
    event.preventDefault(); 
    return false; 
};
 
OSH.UI.Dialog.prototype.drop = function(event) {
    event.stopPropagation();
    // Set array of x and y values from the transfer data
    var offset = event.dataTransfer.getData("text-"+this.div.id).split(',');
    this.div.style.left = ((event.clientX + parseInt(offset[0],10)) * 100) / window.innerWidth + "%";
    this.div.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
};
