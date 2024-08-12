/**
This file starts the server for development/production environment. 
*/

let { app } = require("./index");

app.listen(3000, () => console.log("Server is running on port 3000"));
