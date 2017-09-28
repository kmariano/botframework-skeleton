const {ChatConnector, UniversalBot} = require('botbuilder');
const _  = require('lodash');
const debug = require('debug')('rap-sage-bot:router')
const config             =require('./config');

class Router {
  constructor({ appId, appPassword}) {
    this.appId = appId;
    this.appPassword = appPassword;
    this.route = this.route.bind(this);
  }

  route(app) {
    const connector = new ChatConnector({
      appId: this.appId,
      appPassword: this.appPassword
    })

    const bot = new UniversalBot(connector, [
      (session, args, next) =>{
        session.send("Hello I am your bot and I\'m alive")
        session.endDialog()
      }
    ])
    app.post('/api/messages', connector.listen())


  }
}
module.exports = Router
