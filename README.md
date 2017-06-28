# ema-prototype

> A prototype by Mark Neuburger

## Setup

This project is built and tested with Node.js v6.11.0. If you use nvm, you can switch with `nvm use`.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# start backend server on port 3000
node server/index.js
```

## Notes

Upon starting the server with the above command, a new SQLite database will be generated in server/ and filled with test data. After using the app, you will add data to the test set. An easy way to revert the database back to just test data is to kill the server, delete the ema-proto.db file, and restart the server.