myApp.onPageInit('prospecto', function (page) {
	
	if (page.query.nuevo == 'true') {
		$('#btnGuardarProspecto').show();
		$('#btnModificarProspecto').hide();
		$('.liEstado').hide();
		$('#lblTitle').html('Nuevo Prospecto');
	} else {
	    
		$('#btnModificarProspecto').show();
		$('.liEstado').show();
		$('.liObservacionAdmin').show();
		$('#btnGuardarProspecto').hide();
		$('#lblTitle').html('Prospecto');
		$('#txtIdProspecto').val(page.query.id_prospecto);
		$('#txtNombreEmpresa').val(page.query.nombre_empresa);
		$('#txtNombreContacto').val(page.query.nombre_contacto);
		$('#txtCargoContacto').val(page.query.cargo_contacto);
		$('#txtTelefonoPros').val(page.query.telefono);
		$('#txtOportunidad').val(page.query.oportunidad);
		$('#txtFecha').val(page.query.fecha_cita);
		$('#txtHora').val(page.query.hora_cita);
		$('#txtObservacion').val('Observacion Prospecto: '+page.query.observacionProspecto);
		$('#txtObservacionAdmin').val('Observacion App Referido: '+page.query.observacionTrazabilidad);
		$('#txtEstado').val("Estado Actual: "+page.query.nombre_estado);
		if($('#txtFecha').val() !=='' || $('#txtHora').val() !== ''){
		    $('#chkAgendarCita').prop('checked', true);
		    $('.liFecha').show();
		    $('.liHora').show();
		}else{
		    $('#chkAgendarCita').prop('checked', false);
		}
		//console.log(page.query.observacion);
	}

	$('#btnGuardarProspecto').on('click', function() {
	    console.log('ingresa');
		$.post('https://www.estrategicacomunicaciones.com/mobile/php/register.prospect.php', {
			'nombre_empresa' : $('#txtNombreEmpresa').val(),
			'nombre_contacto' : $('#txtNombreContacto').val(),
			'cargo_contacto' : $('#txtCargoContacto').val(),
			'telefono' : $('#txtTelefonoPros').val(),
			'oportunidad' : $('#txtOportunidad').val(),
			'fecha_cita' : $('#txtFecha').val(), 
			'hora_cita' : $('#txtHora').val(),
			
			'id_usuario' : getCookie('id_usuario'),
			'observacion' : $('#txtObservacion').val()
		}, function(response) {
			if (response.state == 'true') {
				myApp.alert(response.message ,'Referidos');
				myApp.showTab('#view-3');
				cargarProspectos(getCookie('id_usuario'));
				view3.router.back();
			} else {
				myApp.alert('El registro no fue exitoso' ,'Referidos');
			}
		}, 'json');
	});
	
	$('#btnModificarProspecto').on('click', function() {
		$.post('https://www.estrategicacomunicaciones.com/mobile/php/edit.prospect.php', {
			'id_prospecto' : $('#txtIdProspecto').val(),
			'nombre_empresa' : $('#txtNombreEmpresa').val(),
			'nombre_contacto' : $('#txtNombreContacto').val(),
			'cargo_contacto' : $('#txtCargoContacto').val(),
			'telefono' : $('#txtTelefonoPros').val(),
			'oportunidad' : $('#txtOportunidad').val(),
			'fecha_cita' : $('#txtFecha').val(), 
			'hora_cita' : $('#txtHora').val(), 
			'id_usuario' : getCookie('id_usuario')
		}, function(response) {
			if (response.state == 'true') {
				myApp.alert(response.message ,'Referidos');
				myApp.showTab('#view-3');
				cargarProspectos(getCookie('id_usuario'));
				view3.router.back();
			} else {
				myApp.alert('El registro no fue exitoso' ,'Referidos');
			}
		}, 'json');
	});
	
	
	$('#chkAgendarCita').on('change', function() {
	    if($('#chkAgendarCita').prop('checked')){
	        $('.liFecha').show();
	        $('.liHora').show();
	    }else{
	        $('.liFecha').hide();
	        $('.liHora').hide();
	        $('#txtFecha').val('');
	        $('#txtHora').val('');
	    }
    });
  
});