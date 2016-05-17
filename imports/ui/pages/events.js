
import './events.html' ;
import './event.js' ;


Template.events.onCreated(function(){

 Meteor.subscribe('events');
 Meteor.subscribe('groups') ;
 Meteor.subscribe('people') ;
} );

Template.events.helpers({

	events:function(){
		const id = Meteor.userId();
    return Events.find( {part:{$in:[id]}}) ;
	},
});

