import {Template} from 'meteor/templating' ;

Template.activeParticipants.helpers({

	 participants:function(){
	  return People.find( { _id: { $in: Session.get('participants') } }) ; 
	},
})