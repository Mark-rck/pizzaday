
import './groups.html';
import './group.html' ;
import './group.js' ;

Template.groups.onCreated(function(){

	Meteor.subscribe('groups') ;

	Meteor.subscribe('people') ;
} )

Template.groups.helpers({

	groups(){

      const id = Meteor.userId();
		return Groups.find({ part:{$in: [id] } }) ;

	},

})