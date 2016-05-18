import {Template} from 'meteor/templating' ;

Template.possibleParticipants.helpers({

	people:function(){

		return People.find( { _id : { $nin: Session.get('participants') } } ) ;
	},

}) ;