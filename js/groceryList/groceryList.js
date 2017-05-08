let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let groceryItem = document.getElementById("groceryItem");
let groceryUl = document.getElementById("groceryList");
let span = document.getElementsByClassName("close")[0];

function getGroceries(){
    let url = SERVICE_URI.GETGROCERYLIST;
    $.ajax({
        url: url,
        method: 'GET',
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(result){
            console.log(result);
            console.log(result[0]);
            if(result.length == 0){
                console.log("no items in your grocery list");
            }else{
                for(let i = 0; i < result.length; i++){
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(result[i].product));
                    groceryUl.appendChild(li);
                }
            }
        }
    })
}

function addGroceryItem() {
    console.log(groceryItem.value);
    let query = "groceryListItem="+groceryItem.value;
    console.log("query value ",query);
    let url = SERVICE_URI.ADDGROCERYLIST;
    $.ajax({
        url: url,
        method: 'POST',
        data: query,
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(result){
            console.log(result.message);
            reply = result.message;
            _speak(result.message);
        }
    })
}

function clearGroceryList(){
    let url = SERVICE_URI.DELETEGROCERYLIST;
    $.ajax({
        url: url,
        method: 'DELETE',
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(result){
            console.log(result.message);
            reply = result.message;
            _speak(result.message);
            groceryUl.remove();
        }
    })
}

function removeGroceryItem(){
    let url = SERVICE_URI.DELETEGROCERYITEM;
    let query = "groceryListItem="+groceryItem.value;
    $.ajax({
        url: url,
        method: 'DELETE',
        data: query,
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(result){
            console.log(result.message);
            reply = result.message;
            _speak(result.message);
        }
    })
}

let groceryCommands = {
    'add *groceryItem': function(groceryItem){
        addGroceryItem({"groceryListItem": groceryItem});
    },

    'delete *groceryItem': function(groceryItem){
        removeGroceryItem({"groceryListItem": groceryItem});
    },

    'clear grocery list': function(){
        clearGroceryList();
    },

    'show grocery list': function(){
        getGroceries();
    }
};

console.log("----- grocery Commands -----");
annyang.addCommands(groceryCommands);

btn.onclick = function() {
    modal.style.display = "block";
    $("#groceryList").empty();
    getGroceries();
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};