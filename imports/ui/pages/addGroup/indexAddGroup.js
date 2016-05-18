
import './template/addGroup/addGroup.html' ;
import './template/addGroup/groupName.html' ;
import './template/participants/possibleParticipants.html' ;
import './template/participants/activeParticipants.html' ;
import './template/error/error.html' ;
import './template/addGroup/groupChoose.html' ;

import './helpers/participants/activeParticipants.js';
import './helpers/participants/possibleParticipants.js';

import './events/participants/participants.js' ;

import './events/addGroup/addGroup.js' ;
import './events/addGroup/addLogo.js' ;

import { Session } from 'meteor/session' ;
import { Mongo } from 'meteor/mongo' ;


Template.addGroup.onCreated( function(){
  
  Meteor.subscribe('people'); 
  
   Session.set('participants', [ Meteor.userId() ]) ;
  console.log(Session.get('participants')) ;
} );
  



