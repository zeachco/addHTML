(function(){
  var ns = 'addHTML';
  function ah(t) {
    var e = typeof t === 'object' ? t : document.createElement(t.split(/[#\.]gi/)[0]);
    e.appendTo = function(p) { return ah.select(p).appendChild(e) && e; };
    e.attr = function(k, v) { return typeof v === 'undefined' ? e.getAttribute(k) : e.setAttribute(k, v) || e; };
    e.html = function(h) { return h ? (e.innerHTML = h) && e : e.innerHTML; };
    e.css = function(k, v) { return typeof v === 'undefined' ? e.style[k] : (e.style[k] = v) + '1' && e; };
    e.on = function(ev, cb) { return e.addEventListener(ev, cb) || e; };
    e.addClass = function(c) { return (e.className = (e.className + ' ' + c).trim()) + '1' && e; };
    e.removeClass = function(c) { return (e.className = e.className.replace(c, '').trim()) + '1' && e; };
    e.remove = function() { e.parentNode.removeChild(e); };
    e.delay = function(d, cb) { setTimeout(function() { cb.call(e); }, d); return e; };
    e.select = function(d){ return ah.select(d, e); };
    e.parent = function(){ return ah(e.parentNode); };
    return e;
  }
  ah.select = function(d, p){
    p = p || document;
    if(typeof d === 'object'){ return ah(d); }
    switch(d[0]){
      case '': return ah(d);
      case '#': return ah(p.getElementById(d.substr(1)));
      case '.': return ah(p.getElementsByClass(d.substr(1))[0]);
      default: return ah(p.getElementsByTagName(d)[0]);
    }
  };
  window[ns] = ah;
})();
