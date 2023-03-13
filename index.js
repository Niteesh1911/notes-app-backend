require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const client = require("./configs/DB");



const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/",(req, res)=> {
    res.status(200).send("server is up and running!!");
});

app.use("/auth",authRoutes);
app.use("/note",noteRoutes);    

client.connect((err) =>{
    if(err){
        console.log(err);
    }
    console.log("connected to database");

});


app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});

