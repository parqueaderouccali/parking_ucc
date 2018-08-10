var getUser = function () {

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            // $(location).attr('href','../mod_placas/form-placas.html');           
            // $('.correo').html(user.email)
        }else{
            // $(location).attr('href','../index.html');
        }
    })
}

var login = function () {

    var email = $('#txt_email').val();
    var password = $('#txt_password').val(); 

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (data){                                  
        $(location).attr('href','../mod_placas/form-placas.html');            
    })
    .catch(function (error) {        
        alertify.error(traductor(error.message));
    })
}

var recordarPassword = function () {

    var auth = firebase.auth();
    var email = $('#email-recuperacion').val();

    auth.sendPasswordResetEmail(email)
        .then(function(){
            $('#exampleModalCenter').modal('hide');
            alertify.success("El correo de confirmación fue enviado con éxito");
        },function(error){            
            alertify.error(traductor(error.message));
        })
    }

var traductor = function (texto){
    
    var texto_traducido;

    if(texto === "The email address is badly formatted."){
        texto_traducido = "La dirección de correo electrónico no es válida";
    }else if(texto === "The password is invalid or the user does not have a password."){
        texto_traducido = "La contraseña no es válida.";
    }else if(texto === "There is no user record corresponding to this identifier. The user may have been deleted."){
        texto_traducido = "El Usuario no es existe.";
    }

    return texto_traducido;
}