window.dom = {
  create(string) {
    const container = document.createElement('template');

    container.innerHTML = string.trim();

    return container.content.firstChild;
  },

  after(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
  },

  before(node, newNode) {
    node.parentNode.insertBefore(newNode, node);
  },

  append(parent, newNode) {
    parent.appendChild(newNode);
  },

  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },

  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  empty(node) {
    const { childNodes } = node;
    const arr = [];

    Array.from(childNodes).map(c => {
      dom.remove(c);
      arr.push(c);
    });

    return arr;
  },

  attr(node, attribute, value) {

    if(arguments.length === 3) {
      node.setAttribute(attribute, value);
    }else if(arguments.length === 2) {
      return node.getAttribute(attribute);
    };
  },

  text(node, string) {
    if(arguments.length === 2) {
      if('innerText' in node) {
        node.innerText = string;
      }else {
        node.textContent = string;
      };
    }else if(arguments.length === 1) {
      if('innerText' in node) {
        return node.innerText;
      }else {
        return node.textContent;
      };
    };
  },

  html(node, string) {
    if(arguments.length === 2) {
      node.innerHTML = string.trim();
    }else if(arguments.length === 1) {
      return node.innerHTML;
    };
  },

  style(node, name, value) {
    if(arguments.length === 3) {
      node.style[name] = value;
    }else if(arguments.length === 2) {
      if(typeof name === 'string') {
        return node.style[name];
      }else if(name instanceof Object) {
        const obj = name;
        Object.keys(obj).map(key => node.style[key] = obj[key]);
      };
    };
  },

  class: {
    add(node) {
      if(arguments.length > 1) {
        const classNames = Array.from(arguments).slice(1);

        classNames.map(a => node.classList.add(a));
      }
    },

    remove(node) {
      if(arguments.length > 1) {
        const classNames = Array.from(arguments).slice(1);

        classNames.map(a => node.classList.remove(a));
      }
    },

    has(node, className) {
      return node.classList.contains(className);
    }
  },

  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },

  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  parent(node) {
    return node.parentNode;
  },

  children(node) {
    return node.children;
  },

  siblings(node) {
    return Array.from(node.parentNode.children).filter(c => c !== node);
  },

  next(node) {
    let x = node.nextSibling;

    while(x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },

  previous(node) {
    let x = node.previousSibling;

    while(x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  each(nodeList, fn) {
    Array.from(nodeList).map(n => fn.call(null, n));
  },

  index(node) {
    return Array.from(node.parentNode.children).findIndex(c => c === node);
  }
};
