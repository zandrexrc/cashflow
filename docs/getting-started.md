# Getting started
- [Requirements](#requirements)
- [Installation guide](#installation-guide)
- [Uninstallation guide](#uninstallation-guide)


## Requirements
- [NodeJS](https://nodejs.org/en/)


## Installation guide
1. Download or clone this GitHub repo.

2. On your local copy of the repo, navigate to *src/server/database* and rename 
*cashflow-empty.db* to *cashflow.db*.

2. Go back to the root directory of the app and install the dependencies: 
```bash
npm install
```

3. Build the app:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

5. The app is now available on http://localhost:8080/.   
*_8080 is the default port._ 
_To change this, open **src/server/index.js** and edit the **port** variable._


## Uninstallation guide
1. Just delete the root folder of the app :)
