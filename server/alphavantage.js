const request = require('request');

const getStock = stockCode => new Promise((resolve, reject) => {
  request.get('https://www.alphavantage.co/query', {
    json: true,
    qs: {
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol: stockCode,
      apikey: process.env.ALPHAVANTAGE_API_KEY
    }
  }, (error, response, body) => {
    if (error) return reject();
    if (body['Error Message']) return reject();
    resolve(body);
  });
});

module.exports = {
  getStock
};
