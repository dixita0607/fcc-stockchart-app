const router = require('express').Router();
const {Stock, sanitizeStock} = require('../../models/stock');
const alphavantage = require('../../alphavantage');

router.get('/', (req, res) => {
  Stock.find()
    .then(stocks => {
      if (stocks) {
        const sanitizedStocks = stocks.map(sanitizeStock);
        Promise.all(sanitizedStocks.map(alphavantage.getStock))
          .then(stockData => res.status(200).json(stockData))
          .catch(error => res.status(500).end());
      } else res.status(404).end();
    })
    .catch(error => res.json(error));
});

router.post('/', (req, res) => {
  if (req.body.stockCode) {
    alphavantage.getStock(req.body.stockCode)
      .then(body => {
        Stock.findOne({code: req.body.stockCode})
          .then(stock => {
            if (stock) res.status(400).end();
            else Stock.create({code: req.body.stockCode})
              .then(stock => {
                req.io.sockets.emit('added', body);
                res.status(200).end();
              })
              .catch(error => res.status(500).end());
          })
          .catch(error => res.status(500).end());
      })
      .catch(error => res.status(500).end());
  } else res.status(400).end();
});

router.delete('/:stockCode', (req, res) => {
  if (req.params.stockCode) {
    Stock.findOne({code: req.params.stockCode})
      .then(stock => {
        Stock.remove({code: req.params.stockCode})
          .then(() => {
            req.io.sockets.emit('deleted', req.params.stockCode);
            res.status(200).end();
          })
          .catch(error => res.status(500).end());
      })
      .catch(error => res.status(500).end());
  }
});

module.exports = router;
