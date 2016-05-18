import {Template} from 'meteor/templating' ;

Template.addGroup.events({
 
  'click .adduser': function () {
    const tmpParticipants = Session.get('participants').slice();
    tmpParticipants.push(this._id);
    Session.set('participants', tmpParticipants);
  },
  
  'click .removeuser': function(){
    
    const tmpParticipants = Session.get('participants').slice();
    tmpParticipants.splice( tmpParticipants.indexOf(this._id ), 1) ;
    Session.set('participants', tmpParticipants) ;

  },
   }) ;