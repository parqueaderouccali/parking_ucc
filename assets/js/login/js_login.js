
var createuser = function () {

    var email = $('#txt_email_cuenta').val();
    var password = $('#txt_contraseña_cuenta').val();  
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data){   
            sendEmail();                               
            $(location).attr('href','../index.html');            
        })
        .catch(function (error){
            console.log(error)
        })
                
    return false;
}

var sendEmail = function () {

    var user = firebase.auth().currentUser;

    user.sendEmailVerification()
    .then(function () {
        console.log('El correo se envio')
    },function (error) {
        console.log(error)
    })

}


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

var ingreso_login = function () {
    $('#login_user').show();
    $('#registro_user').hide();
}

var ingreso_registro = function () {
    $('#login_user').hide();
    $('#registro_user').show();
}