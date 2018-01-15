const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  }
});

const sanitizeStock = stock => stock.code;

module.exports = {
  Stock: mongoose.model('Stock', StockSchema),
  StockSchema,
  sanitizeStock
};
