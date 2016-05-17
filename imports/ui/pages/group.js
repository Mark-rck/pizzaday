
import './group.html' ;



  Template.registerHelper( 'isCreator', function(ctx){
   return ctx?ctx.owner === Meteor.userId():this.owner === Meteor.userId();
});

Template.group.rendered = function() {
  $(".datepicker").datepicker({
    startDate: "today",
    format: "dd/mm/yyyy",
    weekStart: 1,
    todayBtn: "linked",
    clearBtn: true,
    autoclose: true,
    todayHighlight: true
  });
};

 Template.group.helpers({
   
   participantsCount(){


   return  this.part.length ;
   },
 
  
  participants(){
   
  return People.find({ _id: { $in: this.part } });
  },

  username(){
    return this.username ;
  },

  possibleParticipants(){
  	return People.find( {_id: {$nin: this.part } }) ;
  },

 });

Template.group.events({

   'click .delete-btn': function() { 
    ;
    Meteor.call("deleteGroup", this._id );
  },
  'click .adduser': function(){
    Meteor.call("addUserGroup", Template.instance().data._id, this._id);
  },
  'click .removeuser': function(){
    Meteor.call("removeUserGroup", Template.instance().data._id, this._id);
  },

  'submit .add-menu-item': function(evt, template){
    evt.preventDefault();
    const name = template.find(".new-item-name").value;
    const price = template.find(".new-item-price").value;

    // edit existing item
    if ( Session.get("selectedMenuItemId") ){

     Meteor.call("editMenuItem", Template.instance().data._id, Session.get("selectedMenuItemId"),{name:name, price: price}) ;
       // or add a new one
    } else {

      Meteor.call("addMenuItem", this._id , {name:name, price: price} );
    } ;
      

      Session.set("selectedMenuItemId", undefined);
          template.find(".new-item-name").value = "";
          template.find(".new-item-price").value = "";
          template.find(".submitter").value = "Add";
  },

  'click .remove-item':function(){

  	Meteor.call('removeMenuItem' ,Template.instance().data._id , this) ;
  } ,

  'click .edit-item': function(evt, template){
    Session.set('selectedMenuItemId', this.id);
    template.find(".new-item-name").value = this.name;
    template.find(".new-item-price").value = this.price;
    template.find(".submitter").value = "Save edits";
  },

  'click .add-discount-coupon': function(){
     
     Meteor.call( 'addDiscount' , Template.instance().data._id , this.id ) ;
  },

   'click .add-free-coupon':function(){

   	Meteor.call( 'addFree' ,  Template.instance().data._id , this.id ) ;
   },

   'click .start-event-btn':function(evt){
       evt.preventDefault();

         //const evtDate = Template.instance().$(".datepicker").value;
       // console.log(evtDate) ;
 
       Meteor.call('addEvent', this._id , this.part ) ;
   },

})
