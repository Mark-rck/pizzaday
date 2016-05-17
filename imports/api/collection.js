/*import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Groups = new Mongo.Collection('groups');

 /*Groups.deny({
  insert: function(){
    // Deny inserts on the client by default.
    return true;
  },
  update: function(){
    // Deny updates on the client by default.
    return true;
  },
  remove: function(){
    // Deny removes on the client by default.
    return true;
  }
});*/

/*var GroupSchema = new SimpleSchema({
  'name': {
    type: String,
    defaultValue: "",
    label: 'Group Name'
  },
  'owner':{
  	type:String,
  	defaultValue: "",
  	label:'Group creator'
  },
   
  'part':{
    type:[String] ,
    defaultValue:'',
    label:'Group participants'
    },

  'menuItems':{
  	type:[menuItem],
  	defaultValue:'',
  	label:'Menu Items',
  	optional:true 
  },

});

var menuItem = new SimpleSchema({
	'id':{
		type:String,
		defaultValue:'',
	},

	'item':{
		type: String,
		defaultValue:'',
		label:'name of menu item',
	},

	'price':{
		type:Number,
		defaultValue:0,
		min:1,
	},

	'cupons':{
		type:Number,
		defaultValue:0,
		min:0,
	},

	'free':{

		type:Number,
		defaultValue:0,
		min:0,
	},
})

Groups.attachSchema( GroupSchema );

export const groupInsert = new ValidatedMethod({
  name: 'groupIn',
  validate: new SimpleSchema({
    name: { type: String },
    owner:{type: String},
    part:{type:[String]},
    menuItems:{type:[Object]} ,
  
  }).validator(),
  run( group) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to add a new movie!');
    }
  console.log(group);
    Groups.insert(group);
  } ,

    }) ;

export const deleteGroup = new ValidatedMethod({

	name: 'deletedGroup',

	validate: new SimpleSchema({
		_id: {type:String}
	}).validator(),
	run(groupId){
        
        Groups.remove({_id:groupId});
	}
}) ;

export const addmenuItem = new ValidatedMethod({

	name: 'addMenuItems',

	validate: new SimpleSchema({
	id:{
		type:String,
	},

	item:{
		type: String,
	},

	price:{
		type:String,
	},

	cupons:{
		type:Number,
	},

	free:{
		type:Number,
	},



	}).validator(),
	run(menu , groupId){
		console.log(groupId);
        
        Groups.update( {_id :groupId}, {$addToSet: {menuItems: menu} } ) ;
	}

}) ;
*/
      