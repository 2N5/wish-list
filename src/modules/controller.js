import {
  randomNum
} from '../utils';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('submit', this.receivingForm.bind(this));
    view.init(model.state);
  }

  receivingForm([data, action]) {
    delete data.action;

    switch (action) {
      case 'create':
        data.id = randomNum(4);
        this.view.addItem(this.view.createItem(this.model.addItem(data)));
        break;
      case 'edit':
        this.view.updateItem(this.model.updateItem(data));
        break;
      case 'remove':
        this.view.removeItem(this.model.removeItem(data.id));
        break;
    }
  }
}

export default Controller;