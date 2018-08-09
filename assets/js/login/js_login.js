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
        console.log(error); 
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
            console.log(error)
        })
    }
