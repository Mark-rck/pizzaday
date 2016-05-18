
Template.addGroup.events({

  'submit form': function(evt) {
    evt.preventDefault();
    const groupName = document.querySelector("#group-name").value;

    Meteor.call( 'groupInsert', Meteor.userId() , Session.get('logo') ,groupName, Session.get('participants')) ;
   },

   "change input[type='file']": (evt) => {
    const logo = evt.target.files[0];
    document.querySelector("#fn_output").value = logo.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      Session.set("logo", evt.target.result);
    };
    reader.readAsDataURL(logo);
  },

});