
import './addGroup.html' ;

import { Session } from 'meteor/session' ;
import { Mongo } from 'meteor/mongo' ;


Template.addGroup.onCreated( function(){
  
  Meteor.subscribe('people'); 
  
   Session.set('participants', [ Meteor.userId() ]) ;
  
} );
  


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
   
  'submit form': function(evt) {
    evt.preventDefault();
    const groupName = document.querySelector("#group-name").value;

    Meteor.call( 'groupInsert', Meteor.userId() , Session.get('logo') ,groupName, Session.get('participants')) ;
   },

   "change input[type='file']": (evt) => {
    const logo = evt.target.files[0];
    document.querySelector("#fn_output").value = logo.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      Session.set("logo", evt.target.result);
    };
    reader.readAsDataURL(logo);
  },

});


Template.addGroup.helpers({

	people(){

		return People.find( { _id : { $nin: Session.get('participants') } } ) ;
	},

	 participants(){
	  return People.find( { _id: { $in: Session.get('participants') } }) ; 
	},
})


