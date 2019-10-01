const itemPrefix = 'item';
const itemConfig = {
  tag: 'div',
  props: {
    className: 'col-sm-6 col-md-4 col-lg-3 mb-3'
  },
  children: [{
    tag: 'div',
    props: {
      id: '',
      className: `${itemPrefix} card`
    },
    children: [{
        tag: 'div',
        props: {
          className: itemPrefix + '-actions btn-group align-self-end mt-2 mr-2'
        },
        children: [{
            tag: 'button',
            props: {
              className: 'item-action item-action-edit btn btn-outline-warning',
              'data-toggle': 'modal',
              'data-target': '#modal-edit',
              'data-action': 'edit',
              'aria-label': 'Изменить товар'
            },
            children: [{
              tag: 'span',
              props: {
                className: 'far fa-edit'
              }
            }]
          },
          {
            tag: 'button',
            props: {
              className: 'item-action item-action-remove btn btn-outline-danger',
              'data-toggle': 'modal',
              'data-target': '#modal-remove',
              'data-action': 'remove',
              'aria-label': 'Удалить товар'
            },
            children: [{
              tag: 'span',
              props: {
                className: 'far fa-trash-alt'
              }
            }]
          }
        ]
      },
      {
        tag: 'img',
        props: {
          className: itemPrefix + '-img card-img-top'
        }
      },
      {
        tag: 'div',
        props: {
          className: 'card-body'
        },
        children: [{
            tag: 'h2',
            props: {
              className: 'card-title h6'
            },
          children: [{
            tag: 'a',
            props: {
              href: '',
              target: '_blank',
              className: itemPrefix + '-title ' + itemPrefix + '-link'
            }
            }]
          },
          {
            tag: 'div',
            props: {
              className: itemPrefix + '-price h5'
            }
          },
          {
            tag: 'p',
            props: {
              className: itemPrefix + '-description card-text small'
            }
          }
        ]
      }
    ]
  }]
};

function createElement({
  tag,
  props,
  children
}) {
  const element = document.createElement(tag);

  for (let prop in props) {
    if (prop.indexOf('-') !== -1) {
      element.setAttribute(prop, props[prop]);
    } else {
      element[prop] = props[prop];
    }
  }

  if (children) {
    children.forEach(child => {
      element.appendChild(createElement(child));
    });
  }

  return element;
}

function fillElement(item, data) {
  for (let prop in data) {
    const field = item.querySelector(`.${itemPrefix}-${prop}`);
    if (prop == 'id') {
      item.querySelector(`.${itemPrefix}`).id = data[prop];
    } else if (prop == 'link') {
      field.href = data[prop];
    } else if (prop == 'img') {
      field.src = data[prop];
      field.alt = data[`title`];
    } else {
      field.textContent = data[prop];
    }
  }

  return item;
}

function randomNum(numLenght = 1) {
  const maxNumCounter = 0;
  let maxNum = 10;

  if (numLenght > 1) {
    maxNum += '';
    for (let i = 2; i <= numLenght; i += 1) {
      maxNum += maxNumCounter;
    }
  }

  return pad(Math.floor(Math.random() * maxNum));
}

function pad(str, max) {
  str += '';
  return str.length < max ? pad('0' + str, max) : str;
}

function saveData(data) {
  const dataStr = JSON.stringify(data);

  localStorage.setItem('wishItem', dataStr);
}

function loadData() {
  const dataStr = localStorage.getItem('wishItem'),
    data = JSON.parse(dataStr);

  return data;
}

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, callback) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  emit(type, data) {
    if (this.events[type]) {
      this.events[type].forEach(callback => callback(data));
    }
  }
}

export {
  itemPrefix,
  itemConfig,
  createElement,
  fillElement,
  randomNum,
  pad,
  saveData,
  loadData,
  EventEmitter
};