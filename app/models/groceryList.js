let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let GroceryListSchema   = new Schema({
    product: String
});

module.exports = mongoose.model('Grocery', GroceryListSchema);