
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/mainLayout.js';
import '../../ui/layouts/parties/navBar.js';

import '../../ui/layouts/homeLayout.js';
import '../../ui/layouts/parties/header.js';

import '../../ui/pages/addGroup.js' ;

import '../../ui/pages/groups.js' ;
import '../../ui/pages/events.js' ;


 Accounts.onLogin( function(){
   FlowRouter.go('addGroup');
 });
 

 Accounts.onLogout( function(){
    FlowRouter.go('home');
   });



 FlowRouter.triggers.enter([ function(context,redirect){
     
     if ( !Meteor.userId() ) {
      FlowRouter.go('home');
     }

 }]);


FlowRouter.route('/', {
  name: "home",
  action(){

   if ( Meteor.userId() ){

    FlowRouter.go('/addGroup')

     }

    BlazeLayout.render( 'homeLayout') ;
} } );

FlowRouter.route('/home-page', {
  name: "home-page",
  action(){
    BlazeLayout.render( 'mainLayout', {
    	main: 'homePage'
    });
} } );

FlowRouter.route('/people', {
  name: "people",
  action(){
    BlazeLayout.render( 'mainLayout', {
      main: 'people'
    });
} } );

FlowRouter.route('/addGroup', {
  name: "addGroup",
  action(){
    BlazeLayout.render( 'mainLayout', {
      main: 'addGroup'
    });
  } } );

FlowRouter.route('/group', {
  name: "group",
  action(){
    BlazeLayout.render( 'mainLayout', {
      main: 'groups'
    });
      } } );

  FlowRouter.route('/events', {
  name: "group",
  action(){
    BlazeLayout.render( 'mainLayout', {
      main: 'events'
    });
    } } );

