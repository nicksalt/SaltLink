var database, tab;
$(document).ready(function () {

    tab = "hockey";

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
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
    database = firebase.database();
    updateLink();


    $(".tab").click(function (e) {
        $("div").removeClass("selected");
        $(this).addClass("selected");
        tab = $(this).attr('id');
        updateLink();
    });
    $("#update").click(function () {

        console.log("test");
        var url = $('#url').val();
        if (url === null || url.match(/^ *$/) !== null) {
            $("#url").attr("placeholder", "Please enter URL");
        } else if (url.match(regex)) {
            console.log(url);
            database.ref().child(tab).set({
                link: url,
                description: $("#description").val()
            });

            updateLink();
        } else {
            $("#url").attr("placeholder", "Invalid URL");
        }

        $("#url").val("");


    });

});

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

function updateLink() {
    database.ref().child(tab).once('value').then(function (snapshot) {
        var url = (snapshot.val() && snapshot.val().link) || 'http://nicksalt.me';

        console.log("test");
        var description = (snapshot.val() && snapshot.val().description) || '';
        $("#go-to").attr("href", addhttp(url));
        $("#url").attr("placeholder", url);
        $("#url").attr("disabled", false);
        $("#description").attr("placeholder", description);

    });
}