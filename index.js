#!/usr/bin/env node
const _ = require('lodash')
const fs = require('fs')
const Server = require('./src/server')

if(fs.existsSync('.env')) {
  console.log('Loading env file')
  require('dotenv').config()
}

if(_.isEmpty(process.env.MS_APP_ID)) {
  console.log("'Missing required environment variable: APP_ID")
  process.exit(1)
}
if(_.isEmpty(process.env.MS_APP_PASSWORD)) {
  console.log("'Missing required environment variable: APP_Password")
  process.exit(1)
}

const appId = process.env.MS_APP_ID
const appPassword = process.env.MS_APP_PASSWORD
const port = process.env.PORT || 3000

const server = new Server({appId, appPassword, port})

server.run(error => {
  if (error != null) {
    console.error(error.stack)
    return process.exit(1)
  }

  const {address,port} = server.address();
  return console.log(`Bot listening on port: ${port}`);
});
