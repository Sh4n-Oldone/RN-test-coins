import { action, makeObservable, observable } from 'mobx';

class StockData {
  stock = [];

  constructor() {
    makeObservable(this, {
      stock: observable,
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
}

export const stockStore = new StockData();
