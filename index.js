const express = require("express");
const app = express();
const port = 8000;



app.use("/", require("./routes"));


app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }

    console.log(`Server is running on the port : ${port}`);
});