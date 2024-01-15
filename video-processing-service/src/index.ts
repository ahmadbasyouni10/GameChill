import express from "express";
import ffmpeg from 'fluent-ffmpeg'; //fmpeg library to be used in TS code

//creating instance of express and m
const app = express()
//middleware for server to deal with JSON when post request
app.use(express.json())

//HTTP post method process videos locally 
app.post("/process-video", (req, res) => {
    //request will have the video path we want to process
    const inputPath = req.body.inputPath;
    const outputPath = req.body.outputPath;

    //Error handling if inputpath or output path not defined
    if (!inputPath) {
        res.status(400).send("Bad Request. Missing Input File Path")
    }

    else if (!outputPath) {
        res.status(400).send("Bad Request. Missing Output File")
    }

    //Convert Video using ffmpeg, provide options of resolution
    ffmpeg(inputPath)
        .outputOptions('-vf', 'scale=1280:720') //720P
        //anynomous function when processing is finished (success status code)
        .on("end", ()=>{
            res.status(200).send("Video Processing Successful.")
        })
        
        //Error handling (Internal Server error code)
        .on("error", (err) => {
            console.log(`An error has occured: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        })
        //save the processed video
        .save(outputPath);
});

//When deployed we will use PORT provided, if not then 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(
        `Video processing service listening at http://localhost:${port}`);
});

