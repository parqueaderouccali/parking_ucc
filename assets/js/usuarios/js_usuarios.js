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

var db = firebase.database().ref('usuarios/');

db.on('value', function (snapshot){

    var usuarios = snapshot.val();
    $("#tbody").empty();

    var row = "";
    var numero = 0;

    for(usuario in usuarios){
       row += '<tr id="' + usuarios[usuario].uid +'">' +
                    '<td class="contador">' + (numero + 1) + '</td>' +
                    '<td class="nombres">' + usuarios[usuario].nombre + '</td>' +
                    '<td class="apellidos">' + usuarios[usuario].apellido + '</td>' +
                    '<td class="correos">' + usuarios[usuario].correo + '</td>' +   
                    '<td> <button type="button" class="btnEdit btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter">Editar </td>' + 
                    '<td> <button type="button" class="btnDelete btn btn-warning">Eliminar </td>' +                    
              '</tr>';
    }

    $("tbody").append(row);
    row = "";
    numero = 0;

    $('.btnEdit').click(function(){        
        var usuarioID = $(this).closest('tr').attr('id');
        
        $("#nombre_usuario").val($('#' + usuarioID).find(".nombres").text());
        $("#apellido_usuario").val($('#' + usuarioID).find(".apellidos").text());
        $("#correo_usuario").val($('#' + usuarioID).find(".correos").text());     

        $(".cambioEstado").text("Editar").removeClass("btn-primary").addClass("btn-danger");
    })


},function(error){
    console.log(error);
})