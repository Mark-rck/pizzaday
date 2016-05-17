

Meteor.publish("people", function(){
  return People.find({}, {fields:{username: 1, "services.google.name": 1}});
});


Meteor.publish("events", function(){
  return Events.find( {} );
});

Meteor.publish("groups", function(){

   return Groups.find({}) ;
});


