


Meteor.methods({

// Groups methods
	groupInsert:function( creator ,logo , groupName, part){
          
           var menuItem = { id: uuid.tiny() , name:'Pizza',  price:5 , cupons: 0 , free:0} ;
          Groups.insert( { owner: creator , logo, name: groupName , part ,  menuItem: [ menuItem ] } ) ;
          },

         
	
   
   deleteGroup: function(group){
    
    Groups.remove({_id:group}) ;
   },
    
    addMenuItem:function(group, menuItem){
      menu = { id: uuid.tiny() , name: menuItem.name,  price: menuItem.price , cupons: 0 , free:0} ;
      Groups.update( group, {$addToSet: {menuItem: menu} } ) ;
   },
   

   addUserGroup:function(group,user){
     Groups.update( group, { $addToSet: {part: user}});
   },

   removeUserGroup:function(group, user){
   	Groups.update( group, {$pull: {part: user} } ) ;
   },

   removeMenuItem:function(groupId, menu){

   	Groups.update( { _id : groupId }, {$pull:{'menuItem': menu} } ) ;
   },

   editMenuItem:function(group, menuId, menuItem){
    
    Groups.update( {_id:group, "menuItem.id": menuId },
      {$set:{
        "menuItem.$.name":menuItem.name,
        "menuItem.$.price":menuItem.price
      } } ) ;
   },

   addDiscount:function(groupId ,menuId){
     Groups.update({_id: groupId, 'menuItem.id': menuId }, {$inc:{'menuItem.$.cupons': 1}});
   },

   addFree:function( groupId, menuId){
   	   Groups.update({_id: groupId, 'menuItem.id': menuId }, {$inc:{'menuItem.$.free': 1}});
   } ,

   //Events Methods

   addEvent:function( group , part ){
      
    Events.insert({
      ownerName:Meteor.user().username,
     ownerId:Meteor.userId(),
      groupId:group ,
      part:part ,
    	menuItems :Groups.findOne(group).menuItem , 
      status:'ordering', 
      orderingParticipants :[Meteor.userId()] ,
      orderedParticipants:[] , 
      total:0 ,
       cart:{} ,
       cheque:{} ,
       orders:{} }) ;

   },

   submitUserOrder:function( eventId, userId, userCart, userTotal ){

    const cartQuery = {};
    const userOrder = [];
    const orderKey = "orders."+userId;
    for (let item in userCart){
      if(userCart.hasOwnProperty(item)){
        cartQuery["cart."+item] = userCart[item];
        userOrder.push({id: item, quantity: userCart[item]});
      }
    }
    const order = {};
    order[orderKey] = userOrder;
    cartQuery.total = userTotal;
    cartQuery["cheque."+userId] = userTotal;
    Events.update(eventId, {
      $addToSet: {orderedParticipants:userId},
      $pull:{orderingParticipants:userId},
      $inc:cartQuery,
      $set: order
    });

    const evt = Events.findOne(eventId) ;
    // if it was the last - change status of event 
    if (evt.part.length === evt.orderedParticipants.length){
      Events.update(eventId ,{$set:{status:'ordered'}}) ;
      Meteor
    }
  },

  updateEventStatus:function(eventId, status){
     
      Events.update(eventId, {$set:{status: status} } );
      

  },

  setUserAsOrdering:function( eventId , userId){

    Events.update(eventId, { $addToSet: {orderingParticipants:userId} } );
   },


  removeUserFromEvent:function( eventId , userId){
  
    Events.update(eventId, { $pull: {part:userId} } );
   },

   deleteEvent:function(eventId){
    Events.remove({_id:eventId }) ;
   },
 }) ;