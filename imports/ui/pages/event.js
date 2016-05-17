
import './event.html' ;
import { Meteor } from 'meteor/meteor' ;


Template.event.helpers({
  // current user id
  self: function() {
    return Meteor.userId();
  },
  // group name to display in the header
  grName: function(){

    const group = Groups.findOne({ _id:this.groupId}) ;

    if ( group && group.name ){
       return group.name ;
    }
  },

  possibleStatuses: function(){
    const statuses = {
      "ordered": ["delivering"],
      "delivering": ["delivered"]
    };
    return statuses[this.status];
  },

  isNotDelivered: function(){
    console.log('okk');
    return this.status !== "delivered" && this.status !== "ordering";
  },

  participants: function(){
    return People.find({_id: {$in: Events.findOne(this._id).participants}});
  },
 
  orderedParticipants: function(){
    return People.find({_id: {$in: Events.findOne(this._id).orderedParticipants}});
  },
 
    isPending: function(id){

    return !Template.instance().data.orderingParticipants.includes(id) && !Template.instance().data.orderedParticipants.includes(id)
      && Template.instance().data.ownerId !== Meteor.userId();
  },
  // check if user is currently choosing what to order
  isOrdering: function(id){
    return Template.instance().data.orderingParticipants.includes(id);
  },
  // check if user is the event creator. needed for star as the creator's icon
   checkCreator(){
    return Meteor.userId() == Template.instance().data.ownerId;
  },
  // check if user had already submitted his order
  hasOrdered: function(id){
    return Template.instance().data.orderedParticipants.includes(id);
  },
  // check if the event is ordered
  eventOrdered: function(){
    return this.status !== "ordering";
  },
  // check if event is finished
  eventDone: function(){
    console.log(this.status) ;
    return this.status === "delivering";
  },
  // current overall cart
  orderedItems: function(){
    const ordered = [];
    const cart =  Events.findOne(this._id).cart;
    for (let menuItemId in cart){
      console.log(menuItemId);
      if(cart.hasOwnProperty(menuItemId)){
        for (let i=0, len = this.menuItems.length;i<len;i++){
          if(this.menuItems[i].id === menuItemId){
            ordered.push({name:this.menuItems[i].name, quantity: cart[menuItemId]});
          }
        }
      }
    }
    return ordered;
  },
  // user cheque helper
  userTotal: function() {
    
    data = Template.instance().data ;

    if (data&&data._id){
    return Session.get( data._id+ "userTotal");
   };

  },
  errorMsg: function(){
    return Session.get(this._id + "_errorMsg");
  },

  username: function(id){

  const user = People.findOne(id) ;

    if (user && user.username)
    return user.username ;
  },


});

Template.event.events({
  // if user confirms participation we set him as ordering one
  "click .confirm": function(){
    Meteor.call("setUserAsOrdering", this._id, Meteor.userId());
  },
  // if users refuses participation we remove him from the event participants and redirect him to main page
  "click .refuse": function() {
    Meteor.call("removeUserFromEvent", this._id, Meteor.userId());
  },

  "submit .user-order": function(evt, template){
    evt.preventDefault();
    const errId = this._id + "_errorMsg";
    Session.set(errId, "");

    const formData = template.fetchForm(template.find(".user-order"));
    const userCart = formData.cart;
    const userTotal = formData.total;
    Meteor.call("submitUserOrder", this._id, Meteor.userId(), userCart, userTotal, function(err){
      if (err){
        Session.set(errId, err.reason);
      }
    });
  },
  // keep track of user's cheque
  "change .user-order": function(evt, template){
    Session.set(this._id + "userTotal", template.fetchForm(template.find(".user-order")).total);
  },
  "click .delete-evt": function(){
    Meteor.call("deleteEvent", this._id);
  },
  "submit .update-status": function(evt, template){
    evt.preventDefault();
    const newStatus = template.find(".status-select").value;
    Meteor.call("updateEventStatus", this._id, newStatus);
  }
});

Template.event.created = function(){
  // order form parser
  this.fetchForm = function(form){
    const userCart = {};
    // userTotal holds total amount of money user owes to event creator
    let userTotal = 0;

    let discount = 0
    // fetch form data
    $(form).find("input[type='checkbox']:checked").each(function(){
      const itemId = this.dataset.item;
      let itemsCount = parseInt($(this).closest(".row").find(".item-count").val());
      const itemPrice = parseFloat($(this).closest(".row").find(".item-price").text());
      const cupons = parseInt($(this).closest(".row").find(".item-cupons").text());
      const free  = parseInt($(this).closest(".row").find(".item-free").text());
      // track ids not names
      const itemsCountReal = itemsCount ;
      
      if(free>0){

            if (free<=itemsCount){
            itemsCount -= free ; 
          }else{
            
            itemsCount = 0 ;
          };
      };

    if(cupons > 0 ){

        if ( cupons <= itemsCount ){
            
           discount =  itemPrice*0.2 ;
           discount*=cupons ;
           userTotal -=discount ;
         }else{
               
               discount =  itemPrice*0.2 ;
               discount*=itemsCount ;
               userTotal-=discount ;
         } ;
    } ;

      
      userCart[itemId] = itemsCountReal;
      userTotal += itemPrice * itemsCount;
    });
    return {
      cart: userCart,
      total: userTotal
    };
  };
};

Template.event.rendered = function(){
  Session.set(this.data._id+"userTotal", 0);
};

Template.event.destroyed = function(){
  Session.set(this.data._id + "_errorMsg", "");
  Session.set(this.data._id+"userTotal", 0);
};
