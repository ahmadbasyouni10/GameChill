# GameChill
Game Chill is a full-stack web application developed with TypeScript, Next.js, Express, Docker, FFmpeg, Firebase Auth, and Google Cloud services. It features a robust back-end video processing system utilizing Cloud Pub/Sub and Cloud Run for asynchronous video transcoding. Integrated with Firebase Auth and Cloud Storage, Game Chill ensures secure authentication and seamless video uploading for users

![image](https://github.com/user-attachments/assets/5861549e-98ea-4ea3-9215-cea7b368ca4a)


## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmadbasyouni10/GameChill
   cd GameChill
   
    ```

2. Install Dependencies for Video Processing Service:
  ```bash
   npm install express
   npm install --save-dev typescript ts-node
   npm install --save-dev @types/node @types/express
   npm install fluent-ffmpeg
   npm install --save-dev @types/fluent-ffmpeg
   npm install @google-cloud/storage

  ```

3. Setup Google Cloud and Upload Docker Image:
* Create a Firebase Project:
  https://console.firebase.google.com/
  ```bash
   gcloud auth login
   gcloud config set project <PROJECT_ID>
   gcloud services enable artifactregistry.googleapis.com

  ```

## Learn More

To learn more about APIs and technologies used in this projct, take a look at the following resources:

- [Google Cloud](https://console.cloud.google.com/) - getting started with Google Cloud
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
