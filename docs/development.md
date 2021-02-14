# Development guide

The app is mainly divided into two parts: frontend and backend.
- The frontend is built using React and Redux
- The backend is an Express web server that is connected to an SQLite database. 
All related files and modules are in the _src/server_ directory.
   

**Before we start, it might be helpful to add the _cashflow.db_ file to _.gitignore_ as the file can get quite big.**   


## Running the app in the dev environment
This will start both the React app and the Express server in development mode:
```bash
npm run start:dev
```

## Running only the Express server
Isolating the web server can be useful when developing the API:
```bash
npm run start:server
```

## Building the React app
```bash
npm run build
```