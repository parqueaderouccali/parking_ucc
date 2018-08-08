var getUser = function () {

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            // $(location).attr('href','../mod_placas/form-placas.html');           
            // $('.correo').html(user.email)
            // $('#login').hide();
            // $('#login').hide();
        }else{
            // $(location).attr('href','../index.html');
            $('#login_user').show();
            $('#registro_user').hide();
        }
    })
}

//getUser();

var login = function () {

    var email = $('#txt_email').val();
    var password = $('#txt_password').val(); 

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (data){                                  
        $(location).attr('href','../mod_placas/form-placas.html');            
    })
    .catch(function (error) {
        console.log(error); 
    })
}