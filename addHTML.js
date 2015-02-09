function addHTML(tag) {
  var e = document.createElement(tag.split(/[#\.]gi/)[0]);
  e.appendTo = function(p) { return (typeof p === 'object' ? p : document.createElement(p)).appendChild(e) && e; };
  e.attr = function(k, v) { return typeof v === 'undefined' ? e.getAttribute(k) : e.setAttribute(k, v) || e; };
  e.html = function(h) { return h ? (e.innerHTML = h) && e : e.innerHTML; };
  e.css = function(k, v) { return typeof v === 'undefined' ? e.style[k] : (e.style[k] = v) + '1' && e; };
  e.on = function(ev, cb) { return e.addEventListener(ev, cb) || e; };
  e.addClass = function(c) { return (e.className = (e.className + ' ' + c).trim()) + '1' && e; };
  e.removeClass = function(c) { return (e.className = e.className.replace(c, '').trim()) + '1' && e; };
  e.remove = function() { e.parentNode.removeChild(e); };
  e.delay = function(d, cb) { setTimeout(function() { cb.call(e); }, d); return e; };
  return e;
}
