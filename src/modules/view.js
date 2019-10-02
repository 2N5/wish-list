import $ from 'jquery';
import {
  itemPrefix,
  itemConfig,
  createElement,
  fillElement,
  EventEmitter
} from '../utils';

class View extends EventEmitter {
  constructor() {
    super();

    this.forms = document.querySelectorAll('.form');
    this.formCreate = document.getElementById('form-create');
    this.formEdit = document.getElementById('form-edit');
    this.formRemove = document.getElementById('form-remove');

    this.modalCreate = document.getElementById('modal-create');
    this.modalEdit = document.getElementById('modal-edit');
    this.modalRemove = document.getElementById('modal-remove');

    this.listTitle = document.getElementById('list-title');
    this.list = document.getElementById('list');
    this.itemPrefix = itemPrefix;
    this.itemConfig = itemConfig;

    for (let i = 0; i < this.forms.length; i += 1) {
      const form = this.forms[i];
      form.addEventListener('submit', this.submitForm.bind(this));
    }
  }

  init(itemsData) {
    itemsData.forEach(data => {
      this.addItem(this.createItem(data));
    });

    this.checkTitle();
  }

  checkTitle() {
    this.listTitle.textContent = this.list.children.length ? "В вашем списке желаний:" : "Список желаний пуст.";
  }

  submitForm(e) {
    e.preventDefault();

    const form = e.target,
      formId = form.getAttribute('id'),
      action = formId.slice(formId.indexOf('-') + 1),
      data = {};

    Array.from(new FormData(form)).forEach(field => {
      data[field[0]] = field[1];
    });

    this.emit('submit', [data, action]);
    form.reset();
    this.checkTitle();
    $('.modal').modal('hide');
  }

  updateForm(e) {
    const action = this.getAttribute('data-action'),
      form = document.getElementById(`form-${action}`),
      fields = form.querySelectorAll('[name]'),
      item = this.parentElement.parentElement;

    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i],
        fieldName = field.getAttribute('name');

      if (field.getAttribute('name') == 'id') {
        field.value = item.id;
      } else if (field.getAttribute('name') == 'img') {
        field.value = item.querySelector(`.${itemPrefix}-${fieldName}`).src;
      } else if (field.getAttribute('name') == 'link') {
        field.value = item.querySelector(`.${itemPrefix}-${fieldName}`).href;
      } else {
        field.value = item.querySelector(`.${itemPrefix}-${fieldName}`).textContent;
      }

      if (action == 'remove') {
        if (field.getAttribute('name') == 'id') {
          continue;
        } else if (field.getAttribute('name') == 'img') {
          field.src = item.querySelector(`.${itemPrefix}-${fieldName}`).src;
        } else {
          field.textContent = item.querySelector(`.${itemPrefix}-${fieldName}`).textContent;
        }
      }
    }
  }

  createItem(data) {
    const item = fillElement(createElement(this.itemConfig), data),
      itemActions = item.querySelectorAll(`.${this.itemPrefix}-action`);

    for (let i = 0; i < itemActions.length; i += 1) {
      const itemAction = itemActions[i];

      itemAction.addEventListener('click', this.updateForm);
    }

    return item;
  }

  addItem(item) {
    this.list.appendChild(item);
  }

  getItem(id) {
    return document.getElementById(id).parentElement;
  }

  updateItem(data) {
    fillElement(this.getItem(data.id), data);
  }

  removeItem(id) {
    this.list.removeChild(this.getItem(id));
  }
}

export default View;