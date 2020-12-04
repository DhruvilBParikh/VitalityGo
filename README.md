# How to run VitalityGo Mobile Application

## Dependencies
- Android Studio for emulator
- XCode for emulator
- node
- react 16.8+ (**npm install --save react@^16.8. 0**)
- ngrok (**npm install ngrok**)

## Backend
To run the backend in local machine on port 3000
```sh
$ cd backend
$ npm install
$ node app
```

## Frontend

### Connect Frontend to local machine's backend
```sh
$ ngrok http 3000
```
Copy http:number.ngrok.io from ***forwarding: http:number.ngrok.io -> http://localhost:3000*** 
Locate ***frontend > constants > config.js*** and paste the copied link to basepath's value.

### To run the frontend on emulator:
Navigate to root folder, then follow the instructions below
```sh
$ cd frontend
$ npm install
$ npm start
```

- Open Android Studio
- Click on ***configure*** and select ***AVD Manager***
- Start android device with preferred version
- Press ***'A'*** in the frontend console
