
var getUser = function () {

    firebase.auth().onAuthStateChanged(function(user){
        if(user){                   
            $('.correo').html(user.email)
        }else{
            // $(location).attr('href','../index.html');
        }
    })
}

getUser();