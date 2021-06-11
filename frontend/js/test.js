sessionStorage.setItem( "total", 120 );

var total = sessionStorage.getItem( "total" );
console.log( sessionStorage ); // '120', a string

var total = parseInt( sessionStorage.getItem( "total" ) );
var quantity = 2;
var updatedTotal = total * quantity;
sessionStorage.setItem( "total", updatedTotal ); // '240', a string

console.log( sessionStorage );

var cart = {
    id: getTeddyData._id,
    item: "Name",
    price: 29.00,
    color: "Tan",
    qty: 2
};

var jsonStr = JSON.stringify( cart );
sessionStorage.setItem( "cart", jsonStr );

var cartValue = sessionStorage.getItem( "cart" );
var cartObj = JSON.parse( cartValue );
// original object

console.log(sessionStorage);
console.log(cartObj);