(function(doc) {
  var namespace = 'addHTML';

  function addHTML(tag) {
    // create or use DOM element
    var elem;
    switch (typeof tag) {
      case 'string':
        elem = doc.createElement(tag.split(/[#\.]gi/)[0]);
        break;
      case 'object':
        elem = tag;
        break;
      default:
        elem = {
          style: {}
        };
    }

    // used to append element to a target
    // example: addHTML('div').appendTo('body')
    elem.appendTo = function(parent) {
      if (elem.nodeType) {
        addHTML.select(parent).appendChild(elem);
      }
      return elem;
    };
    // used to write or read attributes
    // example: div = addHTML('div').attr('id', 'myId') ; alert(div.attr('id'))
    elem.attr = function(k, v) {
      return typeof v === 'undefined' ? elem.getAttribute(k) : void(elem.setAttribute(k, v)) || elem;
    };
    // used to write or read innerHTML
    // example: div = addHTML('div').html('I am almost <b>strong</b>', 'myId') ; alert(div.attr('id'))
    elem.html = function(html) {
      return html ? void(elem.innerHTML = html) || elem : elem.innerHTML;
    };
    // use to change css
    // usePrefixes is to apply browser experimental prefixes before the key
    elem.css = function(key, value, usePrefixes) {
      if (typeof value === 'undefined') {
        return elem.style[key];
      }
      if (usePrefixes) {
        ['-webkit-', '-mozilla-', '-o-', '-ms-'].forEach(function(c) {
          elem.style[c + key] = value;
        });
      }
      elem.style[key] = value;
      return elem;
    };
    // listen to an event
    elem.on = function(ev, cb) {
      return elem.addEventListener(ev, cb) || elem;
    };
    // stop listening to an event
    elem.off = function(ev, cb) {
      return elem.removeEventListener(ev, cb) || elem;
    };
    elem.addClass = function(c) {
      return void(elem.className = (elem.className + ' ' + c).trim()) || elem;
    };
    elem.removeClass = function(c) {
      return void(elem.className = elem.className.replace(c, '').trim()) || elem;
    };
    // remove itself from it's parent
    elem.remove = function() {
      elem.parentNode.removeChild(elem);
    };
    elem.delay = function(delay, cb) {
      setTimeout(function() {
        cb.call(elem);
      }, delay);
      return elem;
    };
    elem.do = function(cb) {
      cb.call(elem);
      return elem;
    };
    elem.select = function(select) {
      return addHTML.select(select, elem);
    };
    elem.selectAll = function(select) {
      return addHTML.selectAll(select, elem);
    };
    elem.parent = function() {
      return addHTML(elem.parentNode);
    };
    elem.each = window.forEach;
    return elem;
  }
  addHTML.select = function(selector, parent) {
    parent = parent || doc;
    if (typeof selector === 'object') {
      return addHTML(selector);
    }
    var get;
    switch (selector[0]) {
      case '':
        get = selector;
        break;
      case '#':
        get = parent.getElementById(selector.substr(1));
        break;
      case '.':
        get = parent.getElementsByClass(selector.substr(1))[0];
        break;
      default:
        get = parent.getElementsByTagName(selector)[0];
    }
    return addHTML(get);
  };
  addHTML.selectAll = function(selector, parent) {
    parent = parent || doc;
    if (typeof selector === 'object') {
      return [addHTML(selector)];
    }
    switch (selector[0]) {
      case '':
        return [addHTML(selector)];
      case '#':
        return [addHTML(parent.getElementById(selector.substr(1)))];
      case '.':
        return addHTML(parent.getElementsByClass(selector.substr(1)));
      default:
        return addHTML(parent.getElementsByTagName(selector));
    }
  };
  window[namespace] = addHTML;
})(document);
