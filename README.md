# Orinoco #

This is the back end server for Project 5 of the Junior Web Developer path.

### Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Installation ###

Clone this repo. From within the backend folder, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

### Information ###

This website is configured to work with the local servor.
However, there is also an online server that can be used.
To do so, you have to change 3 lines of code in the frontend folder.
In the frontend/js folder, in index.js, line 13:
    replace "http://localhost:3000/api/teddies" by "https://ocs-orinoco.herokuapp.com/api/teddies".
In the frontend/js folder, in products.js, line 18:
    replace "http://localhost:3000/api/teddies/" by "https://ocs-orinoco.herokuapp.com/api/teddies/".
In the frontend/js folder, in cart.js, line 314:
    replace "http://localhost:3000/api/teddies/order" by "https://ocs-orinoco.herokuapp.com/api/teddies/order".
The website will now use the online server instead of the local one.
