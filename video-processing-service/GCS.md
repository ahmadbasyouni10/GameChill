Google Cloud Service Documentation:

-When a video is uploaded into unprocessed bucket, we have notification which is sent to the topic of pub sub, the message of the topic using the url of cloud run, along with endpoint /process-video from post request is going to push to the cloud run service, which contains the docker image.

-Google Artifact Registry contains docker image which we build it and push it
-Deploy docker image to Google Cloud Run Service
-Pub/Sub Topic->Subscription push to the GC Run Service to process videos
-Buckets created and one with notification to the pub sub topic -> message -> service

-Directories are created more than once due to auto scaling of cloud run, restarts itself (locally meaning docker container)


gcs-storage.ts Notes:

-Recursive call of creating directory at local path, to avoid errors
-This allows for directory of unprocessed and processed videos to be created with their parent directories in one call
