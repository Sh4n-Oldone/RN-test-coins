import {action, makeObservable, observable} from 'mobx';

class StockData {
  stock = [];
  needToLoad = false;

  constructor() {
    makeObservable(this, {
      stock: observable,
      needToLoad: observable,
      loadStock: action,
      clearStock: action,
    });
  }

  loadStock(stockData) {
    this.stock = stockData;
  }

  clearStock() {
    this.stock = [];
  }

  stopLoadingData() {
    this.needToLoad = false;
  }

  startLoadingData() {
    this.needToLoad = true;
  }
}

export const stockStore = new StockData();
