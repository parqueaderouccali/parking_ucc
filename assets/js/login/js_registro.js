
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