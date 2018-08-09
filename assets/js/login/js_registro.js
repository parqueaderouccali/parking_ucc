var createuser = function () {

    var nombre = $('#txt_primer_nombre').val();
    var apellido = $('#txt_primer_apellido').val(); 
    var email = $('#txt_email_cuenta').val();
    var password = $('#txt_contraseña_cuenta').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {                                    
            alertify.success("Usuario " + nombre.toUpperCase() + ' ' + apellido.toUpperCase() + " Registrado");            
            guardarUsuariofirebase(nombre,apellido,email); 
            limpiarCampos();
            sendEmail();      
        })
        .catch(function (error) {
            console.log(error)
        })
    getUser();
    return false;
}

var sendEmail = function () {

    var user = firebase.auth().currentUser;

    user.sendEmailVerification()
        .then(function () {
            alertify.success("El correo de confirmación fue enviado con éxito");
        }, function (error) {
            console.log(error)
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


