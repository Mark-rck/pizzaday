import {Template} from 'meteor/templating' ;

Template.addGroup.events({

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