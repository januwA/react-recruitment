import { observable, action, computed } from "mobx";
import axios from "axios";

const l = console.log;
class Store {
  @observable
  isL = false
}

export default new Store();
