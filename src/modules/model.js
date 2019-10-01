import {
  EventEmitter
} from '../utils';

class Model extends EventEmitter {
  constructor(state = []) {
    super();

    this.state = state;
  }

  addItem(item) {
    this.state.push(item);

    this.emit('update', this.state);
    return item;
  }

  getItem(id) {
    return this.state.find(item => item.id == id);
  }

  updateItem(data) {
    const item = this.getItem(data.id);

    for (let prop in data) {
      item[prop] = data[prop];
    }

    this.emit('update', this.state);
    return item;
  }

  removeItem(id) {
    const itemIndex = this.state.indexOf(this.getItem(id));

    if (itemIndex > -1) {
      this.state.splice(this.state.indexOf(this.getItem(id)), 1);
    }

    this.emit('update', this.state);
    return id;
  }
}

export default Model;