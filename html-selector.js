function addHTML(tag) {
  var el = document.createElement(tag.split(/[#\.]gi/)[0]);
  el.appendTo = function(p) {    return (typeof p === 'object' ? p : document.createElement(p)).appendChild(this) && this;  };
  el.attr = function(k, v) {    return this.setAttribute(k, v) && this;  };
  el.html = function(h) {    return h ? (this.innerHTML = h) && this : this.innerHTML;  };
  el.css = function(k, v) {    return v === undefined ? this.style[k] : this.style[k] = v && this;  };
  el.on = function(e, cb) {    return this.addEventListener(e, cb) && this;  };
  el.addClass = function(c) {    return (this.className = (this.className + ' ' + c).trim()) && this;  };
  el.removeClass = function(c) {    return (this.className = this.className.replace(c, '').trim()) && this;  };
  el.remove = function() {    this.parentNode.removeChild(this);  };
  return el;
}
