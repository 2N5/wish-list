import './libs.js';
import Model from './modules/model';
import View from './modules/view';
import Controller from './modules/controller';
import {
  saveData,
  loadData
} from './utils';

const modelState = loadData(),
  model = new Model(modelState || undefined),
  view = new View(),
  controller = new Controller(model, view);

model.on('update', state => saveData(state));