import express from "express";
import { deleteProcessedVideo, deleteUnprocessedVideo, downloadUnprocessedVideo, processVideo, setUpDirectories, uploadProcessedVideo } from "./gcs-storage";

//Ensures local directories for unprocessed and processed videos exist
setUpDirectories()


//creating instance of express
const app = express()
//middleware for server to deal with JSON when post request
app.use(express.json())


//Async anynomous function to process a video from GCS to 720p
app.post("/process-video", async (req, res) => {
    //FileName to be processed locally and sent back to GCS from Cloud PUB/SUB message
    //message received everytime bucket unprocessed receives a video
    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf8')
        data = JSON.parse(message)

        if (!data.name) {
            throw new Error("Invalid message received") 
        }
    }
    catch(error) {
    console.error(error)
    return res.status(400).send("Bad Request: Missing name of file")
    }
    
    const inputFileName = data.name
    const outputFileName = `processed-${inputFileName}`

    await downloadUnprocessedVideo(inputFileName)

    try {
        await processVideo(inputFileName, outputFileName)
    } catch (err) {
        //delete videos locally unprocessed. Also, processed incase file was made before error
        await Promise.all([
            deleteUnprocessedVideo(inputFileName),
            deleteProcessedVideo(outputFileName)])
        console.log(err)
        return res.status(500).send("Internal Server Error, Video processing Failed");
    }

    await uploadProcessedVideo(outputFileName);

    await Promise.all([
        deleteUnprocessedVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ])

    return res.status(200).send("Processing finished successfuly")

})


//When deployed we will use PORT provided, if not then 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(
        `Video processing service listening at http://localhost:${port}`);
});
