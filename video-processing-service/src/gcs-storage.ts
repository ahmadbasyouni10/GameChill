import { Storage } from '@google-cloud/storage'; //GCS
import fs from 'fs' //File System Library
import ffmpeg from 'fluent-ffmpeg'; //fmpeg library to be used in TS code

//Creates instance of GCS storage library
const storage = new Storage();

//1: Bucket for users to upload videos, then service process
//2: Bucket for processed video to be uploaded in here 
const unprocessedBucketName = "gamechill-unprocessed";
const processedBucketName = "gamechill-processed";

//Where unprocessed and processed videos will go locally
//Need to clean these after processing a video
const localUnprocessedPath = "./unprocessed-videos";
const localProcessedPath = "./processed-videos";


//Creates the local directories for unprocessed and processed videos in docker container locally
export function setUpDirectories() {
    ensureDirectoryExistence(localUnprocessedPath)
    ensureDirectoryExistence(localProcessedPath)
}



/**
 * @param unprocessedVideoName - The name of unprocessed video from local path/folder {@link localUnprocessedPath}
 * @param processedVideoName - The name of the file that will be sent to {@link localProcessedPath}
 * @returns When process is done Promise resolved
 */

//function to process the video
//JS Promise at run time to return value or error
//void so no return
export function processVideo(unprocessedVideoName: string, processedVideoName: string) {
    return new Promise<void> ((resolve, reject)=> {
        ffmpeg(`${localUnprocessedPath}/${unprocessedVideoName}`)
        .outputOptions('-vf', 'scale=1280:720') //720P
        //anynomous function when processing is finished (success status code)
        .on("end", ()=>{
            console.log("Video Processing Successful.")
            resolve();
        })
        
        //Error handling (Internal Server error code)
        .on("error", (err) => {
            console.log(`An error has occured: ${err.message}`);
            reject(err)
        })
        //save the processed video
        .save(`${localProcessedPath}/${processedVideoName}`);

    })}



/**
 * @param fileName - The name of the file to download from the 
 * {@link unprocessedBucketName} bucket into the {@link localUnprocessedPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 */

//async func has promise return, we use await to wait for the downloading to finish
//after download finishes, promise resolved, then we log to console
//video from GCS -> local
export async function downloadUnprocessedVideo(fileName: string) {
    await storage.bucket(unprocessedBucketName)
        .file(fileName)
        .download({ destination: `${localUnprocessedPath}/${fileName}`})

    console.log(
        `gs://${unprocessedBucketName}/${fileName} downloaded to ${localUnprocessedPath}/${fileName}.`
    )
}



/**
 * @param fileName - The name of the file to upload from the 
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}.
 * @returns A promise that resolves when the file has been uploaded.
 */
export async function uploadProcessedVideo(fileName: string) {
    const destinationBucket = storage.bucket(processedBucketName)

    await destinationBucket.upload(`${localProcessedPath}/${fileName}`, {
        destination: fileName
    })
    console.log(
        `${localProcessedPath}/${fileName} has been uploaded to gs://${processedBucketName}/${fileName}.`)

    await destinationBucket.file(fileName).makePublic();
}



/**
 * @param filePath - The path of file to be deleted locally (Save storage locally)
 * @returns A promise that resolves when the file has been deleted
 */

//Function will not be exported and in this file will be called
//Used in deleting unprocessed and processed functions (2 seperate functions)
function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject)=>{
        if(fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`An error has occured deleting file at this path: ${err}`)
                    reject(err)
                } else {
                    console.log(`File Deleted at ${filePath}`)
                    resolve()
                }
            })
        }
        else {
            console.log(`File not found at ${filePath}, skipped delete`)
            resolve()
        }
    })
}

export function deleteUnprocessedVideo(fileName: string) {
    return deleteFile(`${localUnprocessedPath}/${fileName}`)
}

export function deleteProcessedVideo (fileName: string) {
    return deleteFile(`${localProcessedPath}/${fileName}`)
}


/**
 * 
 * @param {string} dirPath - this is directory path to check
 */
//Function that is called to ensure local directories exist for unprocessed and processed videos
function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
        console.log(`Directory created at ${dirPath}`)
    }
}