
var getUser = function () {

    firebase.auth().onAuthStateChanged(function(user){
        if(user){                   
            $('.correo').html(user.email)
        }else{
            $(location).attr('href','../index.html');
        }
    })
}

getUser();

var logout = function () {

    firebase.auth().signOut()
    .then(function(){
        console.log('Sesión Finalizada')
        $(location).attr('href','../index.html');
    },function(error){
        console.log(error);
    })

}