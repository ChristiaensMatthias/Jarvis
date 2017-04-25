let _ = require('underscore');
let GroceryListItem = require('../models/groceryList');
let listArray = [];

module.exports = function(app){
    app.route('/addToGroceryList').post(function(req, res){

        let listItem = req.body.groceryListItem;

        console.log("list item ready to be posted", listItem);

        GroceryListItem.find(function(err,existingListItem){
            console.log("existing list item", existingListItem);

            for(let i = 0; i < existingListItem.length; i++){
                listArray.push(existingListItem[i].product);
            }

            if (_.contains(listArray, listItem)) {
                res.status(200).json({message: listItem + ' is already added to your grocery list'})
            }else{
                let groceryListItem = new GroceryListItem();
                groceryListItem.product = listItem;
                groceryListItem.save(function(err, groceryListItem){
                    if (err)
                        res.send(err);

                    res.status(200).json({groceryListItem: groceryListItem.id, message: listItem + ' is added to your grocery list'})
                })
           }
        });
    });

    app.route('/getGroceryList').get(function(req, res){
        GroceryListItem.find(function(err, items) {
            if (err)
                res.send(err);

            res.json(items);
        });
    });

    app.route('/deleteGroceryList').delete(function(req, res){
        GroceryListItem.remove(function(err, items) {
            listArray = [];
            if (err)
                res.send(err);

            res.status(200).json({message: 'removed all items from your grocery list'});
        });
    });

    app.route('/deleteGroceryItem').delete(function(req, res){
        inputListItem = req.body.groceryListItem;
        console.log(inputListItem);

        GroceryListItem.findOneAndRemove({product : req.body.groceryListItem}, function (err,offer){
            let index = listArray.indexOf(inputListItem);
            listArray.splice(index, 1);

            res.status(200).json({message: 'removed ' +  inputListItem + ' from your grocery list'})
        });
    });
};