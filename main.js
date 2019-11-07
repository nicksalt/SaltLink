$(document).ready(function(){
    // Initialize Firebase
      var config = {
        apiKey: "AIzaSyA84gvZIjCMUYgTqPs00ku65gOEUQeRgBk",
        authDomain: "salt-link.firebaseapp.com",
        databaseURL: "https://salt-link.firebaseio.com",
        projectId: "salt-link",
        storageBucket: "salt-link.appspot.com",
        messagingSenderId: "121925177839"
      };
      firebase.initializeApp(config);
    var database = firebase.database();
    database.ref().child("link").once('value').then(function(snapshot) {
            var url = snapshot.val();
            $("#button").attr("href", url);
            $("#url").attr("placeholder", url);
            $("#url").attr("disabled", false);

    });
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    $("#update").click(function(){
        var url = $('#url').val();
        if (url.match(regex)){
            database.ref().set({
                link : url
            });
            $("#button").attr("href", url);
            $("#url").val("");
            $("#url").attr("placeholder", url);
        } else {
            $("#url").val("");
            $("#url").attr("placeholder", "Invalid URL");
        }

        
    });
});

