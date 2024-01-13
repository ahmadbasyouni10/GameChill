import express from "express";

//creating instance of express
const app = express()
const port = 3000;

//route for HTTP method (get), endpoint has req and res
app.get("/", (req, res) => {
    res.send("Server running!");
});

app.listen(port, ()=> {
    console.log(
        `Video processing service listening at http://localhost:${port}`);
});

