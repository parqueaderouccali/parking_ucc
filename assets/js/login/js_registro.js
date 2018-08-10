var createuser = function () {

    var nombre = $('#txt_primer_nombre').val();
    var apellido = $('#txt_primer_apellido').val(); 
    var email = $('#txt_email_cuenta').val();
    var password = $('#txt_contraseña_cuenta').val();
    var password_2 = $('#txt_confirmacion_contraseña_cuenta').val();

    if(nombre === ""){        
        alertify.error(("Ingrese su Nombre"));
    }else if(apellido === ""){
        alertify.error(("Ingrese su Apellido"));
    }else if(password === ""){        
        alertify.error(("Ingrese la contraseña"));
    }else if(password_2 === ""){        
        alertify.error(("Ingrese la confirmación de la contraseña"));
    }else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {                                    
            alertify.success("Usuario " + nombre.toUpperCase() + ' ' + apellido.toUpperCase() + " Registrado");            
            guardarUsuariofirebase(nombre,apellido,email); 
            limpiarCampos();
            sendEmail();      
        })
        .catch(function (error) {
            alertify.error(traductor(error.message));
        })
    getUser();
    return false;
    }


}

var sendEmail = function () {

    var user = firebase.auth().currentUser;

    user.sendEmailVerification()
        .then(function () {
            alertify.success("El correo de confirmación fue enviado con éxito");
        }, function (error) {
            alertify.error(error.message);
        })

}

var getUser = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log(user)
    })
}

var guardarUsuariofirebase = function (name, surnames, email) {
    var db = firebase.database().ref('usuarios/');
    var user = firebase.auth().currentUser;
        
        var usuarios = {
            uid: user.uid,
            nombre: name,
            apellido: surnames,
            correo: email        
        }

        db.push().set(usuarios);
}

var limpiarCampos = function () {

    $('#txt_primer_nombre').val('');
    $('#txt_primer_apellido').val('');
    $('#txt_email_cuenta').val('');
    $('#txt_contraseña_cuenta').val('');
    $('#txt_confirmacion_contraseña_cuenta').val('');
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


