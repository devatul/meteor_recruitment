import { Meteor } from 'meteor/meteor';
import Config  from '../collections/config';
import {config_ENV} from './../config/index.jsx'
import _ from 'lodash';

Meteor.methods({
  "fetchSettings": function(){
    return Config.find({}).fetch();
  },
  "saveSettings": function(details){
    const settings = Config.find({ "emailId" : details.emailId }).fetch() || [];
    if(settings.length == 0){
      details._id = Config.insert(details);
      return details;
    }else{
      Config.update({"_id": settings[0]._id},{$set:details});
    }
  },
  "checkMailServer": function (detail) {
    let date = new Date();
	  let todaysDate = moment(date).format("YYYY-MM-DD");
    let BASE_URL = config_ENV.IMAP_API_BASE_URL;
	  let PARAMS = "";
		PARAMS = "email="+detail.emailId+
        "&pass="+detail.password+
        "&date="+todaysDate+
        "&host="+detail.server+
        "&port="+detail.port+
        "&encryp="+detail.encrypt+
        "&email_id="+detail.status_last_fetch_details.last_email_id_fetch;
	  const API_URL = BASE_URL + PARAMS
    let result = HTTP.call("GET", API_URL );
    let json = JSON.parse( result.content );
    if( typeof json.data == "undefined"){
      Config.update({"_id": detail._id},{$set:{"status": -1}});
      return(-1);
    }
    else if( typeof json.data != 'undefined' && json.data.length > 0 ){
      Config.update({"_id": detail._id},{$set:{"status": 1}});
      return 1;
    }
    return 0;
  },
  "sendEmailSettings":function(details){
    const settings = Config.find({}).fetch();
    let flag=true;
    let id='';
    _.map(settings,(setting)=>{
    if(typeof setting.smtp != 'undefined' && setting.smtp.emailId == details.emailId){
      flag=false;
      id=Config.update({"_id": setting._id},{$set:{"smtp":details}});
    }
    })
    if(flag){
      id=Config.insert({"smtp":details});
    }
    return id;
  }
});
