export const getContent = () => {
  // В большом приложении с кучей разных запросов к апи
  // приоритетнее был бы axios, но тут хватит и возможностей js
  try {
    return fetch('https://poloniex.com/public?command=returnTicker').then(
      res => {
        if (res.status !== 200) {
          const error = `ошибка доставки, статус ${res.status}`;
          throw error;
        }
        return res.json();
      },
    );
  } catch (err) {
    console.log('Ошибка: ', err);
    return undefined;
  }
};
