$('.view').removeClass('active');
myApp.showTab('#view-5');

if (getCookie('id_usuario') !== '') {
	$.post('https://www.referidos.estrategicacomunicaciones.com/php/consult.user.php', {
			'id_usuario' : getCookie('id_usuario')
		}, function(response) {
			if (response.state == 'true') {					
				$('#txtNombre').val(response.result[0].nombres);
				$('#txtApellido').val(response.result[0].apellidos);
				$('#txtIdentificacion').val(response.result[0].identificacion);
				$('#txtEmail').val(response.result[0].correo);
				$('#txtTelefono').val(response.result[0].telefono);
				$('#cmbGenero').val(response.result[0].genero);
				$('#txtPassword').val(response.result[0].password);
				$('#txtPassword2').val(response.result[0].password);
				setCookie('id_usuario', response.result[0].id_usuario);
				$('.divLogin').hide();
				$('.divRegister, #tb3').show();
				cargarProspectos(getCookie('id_usuario'));
			}
		}, 'json');
} else {
	$('.divLogin').show();
	$('.divRegister, #tb3').hide();
}

var swiper1 = new myApp.swiper('.swiper-1', {
	pagination:'.swiper-pagination-1',
	spaceBetween: 0,
	speed: 600
});

$('#tb4').on('click',function(){
	window.setTimeout (function() {
		swiper1.update();	
	}, 0);
});

$('#btnIngresar').on('click', function () {
    
	if ($('#txtUsuario').val() != '' && $('#txtContrasena').val() != '') {
	    
		$.post('https://www.estrategicacomunicaciones.com/mobile/php/consult.user.php', {
			'correo' : $('#txtUsuario').val(),
			'contrasena' : $('#txtContrasena').val()
		}, function(response) {
		    console.log('res');
			if (response.state == 'true') {					
				$('#txtNombre').val(response.result[0].nombres);
				$('#txtApellido').val(response.result[0].apellidos);
				$('#txtIdentificacion').val(response.result[0].identificacion);
				$('#txtEmail').val(response.result[0].correo);
				$('#txtTelefono').val(response.result[0].telefono);
				$('#cmbGenero').val(response.result[0].genero);	
				$('#txtPassword').val(response.result[0].password);	
				$('#txtPassword2').val(response.result[0].password);	
				setCookie('id_usuario', response.result[0].id_usuario);
				$('.divLogin').hide();
				$('.divRegister, #tb3').show();
				cargarProspectos(getCookie('id_usuario'));
			} else {
				myApp.alert(response.message, 'Referidos');
			}
		}, 'json');
		
	} else {
		myApp.alert('Ingrese su usuario y contrase');
	}
});
		