var app = {
	ip: '127.0.0.1',
    db: null,
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
	    this.loginTable();
        app.atMostrar();
		app.vAgenda();
		//app.initMap();
		app.getBaber();
        document.getElementById('btnRegisterUser').addEventListener('click', this.dbRegisterUser);
		document.getElementById('btnRegisterBar').addEventListener('click', this.dbRegisterBar);
        document.getElementById('btnLogin').addEventListener('click', this.dbMakeLogin);
		document.getElementById('btnLoginBar').addEventListener('click', this.dbMakeLoginBar);
		document.getElementById('BtnAgendar').addEventListener('click', this.Agendamento);
    },
	//---------------------------------------- MAPA -----------------------------------------------------
	/*initMap: function(){
		var div = document.getElementById('uniqueMap');
		var map = null;
        var lat = 51.49575692748839;
        var lon = -0.14600197187496633;
		map = new google.maps.Map(div, {
			center: {lat: lat, lng: lon},
			zoom: 15
		});
		
		 infoWindowContentIpgg  = '<div id="content">'+
								'<div id="siteNotice">'+
								'</div>'+
								'<h1 id="firstHeading" class="firstHeading">IPGG - Instituto Paulista de Geriatria e Gerontologia</h1>'+
								'<div id="bodyContent">'+
								'<table>'+
								'<tr>'+
								'<td> Pra&ccedil;a Padre Aleixo Monteiro Mafra, 34 - S&atilde;o Miguel Paulista"</td>'+
								'</tr>'+
								'</table>'+
								'<p>www.ipgg.saude.sp.gov.br</p>'+
								'</div>'+
								'</div>';
		 var infowindow = new google.maps.InfoWindow({
            content: infoWindowContentIpgg
        });
		
		var input = document.getElementById('searchbox');
		var markers = [];
		var search = new google.maps.places.SearchBox(input);
		document.getElementById('btnSearch').addEventListener('click', function(){
			var places = search.getPlaces();
			search.setBounds(map.getBounds());
			
			console.log(places);
			places.forEach(function(place) {		
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode( { 'address' : place.formatted_address }, function( results, status ) {
					if( status == google.maps.GeocoderStatus.OK ) {
						//lon = results[0].geometry.location.lng();
						//console.log(lon);
						console.log(results[0].geometry.location.lat());
						console.log(results[0].geometry.location.lng());
						map.panTo( results[0].geometry.location );
						var marker = new google.maps.Marker( {
							map     : map,
							position: results[0].geometry.location
						} );
						marker.addListener('click', function() {
						infowindow.open(map, marker);
													});
					} else {
						alert( 'Geocode was not successful for the following reason: ' + status );
					}
				});
				markers.push(new google.maps.Marker({
				  map: map,
				  position: place.geometry.location
				}));
				map.panTo(place.geometry.location);
				//var location{lat: varLat, lng: varLong};
				place = null;
			});
			places = [];
		});
	},*/
	// ------------------- PEGAR LAT LON BARBEIRO ---------------------//
	getBaber: function(){
		var div = document.getElementById('mapbar');
		var map = null;
        var lat = 51.49575692748839;
        var lon = -0.14600197187496633;
		latbar = "";
		lonbar = "";
		map = new google.maps.Map(div, {
			center: {lat: lat, lng: lon},
			zoom: 15
		});
		var input = document.getElementById('searchbar');
		var markers = [];
		var search = new google.maps.places.SearchBox(input);
		document.getElementById('btnSearchbar').addEventListener('click', function(){
			var places = search.getPlaces();
			search.setBounds(map.getBounds());
			
			console.log(places);
			places.forEach(function(place) {		
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode( { 'address' : place.formatted_address }, function( results, status ) {
					if( status == google.maps.GeocoderStatus.OK ) {
						lonbar = results[0].geometry.location.lng();
						latbar = results[0].geometry.location.lat();
						//console.log(lonbar);
						//console.log(results[0].geometry.location.lat());
						//console.log(results[0].geometry.location.lng());
						map.panTo( results[0].geometry.location );
						var marker = new google.maps.Marker( {
							map     : map,
							position: results[0].geometry.location
						} );
					} else {
						alert( 'Geocode was not successful for the following reason: ' + status );
					}
				});
				markers.push(new google.maps.Marker({
				  map: map,
				  position: place.geometry.location
				}));
				map.panTo(place.geometry.location);
				//var location{lat: varLat, lng: varLong};
				place = null;
			});
			places = [];
		});
	},

	// ------------------- LOGADO ---------------------//
	goToPageRegister: function(){
        $.mobile.changePage("#pageRegister");
	},

    loginTable: function(){
	    app.db = window.openDatabase('loginMagicTable', 1.0, 'nope', 10000000);
	    app.db.transaction(function(tx) {
            tx.executeSql("DROP TABLE IF EXISTS logado");
            tx.executeSql("CREATE TABLE IF NOT EXISTS logado (pk_id INTEGER, nome VARCHAR(50), telefone VARCHAR(20), email VARCHAR(50), senha VARCHAR(50))");
        });
    },

    dbMakeLogin: function(){
        var vNome;
        var vEmail = document.getElementById('loginEmail').value;
        var vTelefone;
        var vSenha = document.getElementById('loginSenha').value;
        $.ajax({
            type: "POST",
            url: "http://localhost/index.php",
            data: {
                acao: 'login',
                email: vEmail,
                senha: vSenha
            },
            dataType: "json",
            success: function (json) {
                if(json.result == true){
                    console.log(json.err);
                    app.db.transaction(function (tx) {
						tx.executeSql("Delete from logado where pk_id=pk_id");
                        var sql = "INSERT INTO logado (pk_id, nome, email, telefone, senha) VALUES ('"+json.pk_id+"', '"+json.nome+"', '"+json.email+"', '"+json.telefone+"', '"+json.senha+"')";
                        console.log("##cliente::Logado>"+sql);
                        tx.executeSql(sql);
                        $.mobile.changePage("#CLIENTELOG");
						var ssql = "select * from logado where email = '"+ json.email +"'";
						tx.executeSql(ssql, [], function (tx, result) {
							console.log(result);
							document.getElementById('divAppendNome').append(result.rows[0].nome);
							document.getElementById('divAppendEmail').append(result.rows[0].email);
							document.getElementById('divAppendTel').append(result.rows[0].telefone);
						});
                    });
                }
                else if(json.result == false && json.alert == true){
                    alert(json.err);
                }
            },
            error: function(){
                console.log("##cliente::error");
            }
        });		
    },
	dbRegisterUser: function(){
		var vNome = document.getElementById('registerNome').value;
		var vEmail = document.getElementById('registerEmail').value;
		var vTelefone= document.getElementById('registerTelefone').value;
		var vSenha = document.getElementById('registerSenha').value;
		var vSSenha = document.getElementById('registerConfirmarSenha').value;
		if(vNome==""){
            alert('O campo nome deve estar preenchido');
        }
        else if(vEmail==""){
            alert('O campo email deve estar preenchido');
        }
        else if(vEmail.search('@')<1){
            alert('O campo email deve conter um email valido');
        }
        else if(vTelefone==""){
		    alert('O campo telefone deve estar preenchido');
        }
        else if(vTelefone.length<9){
		    alert('O campo telefone deve conter um telefone válido');
        }
        else if(vSenha==""){
            alert('O campo senha deve estar preenchido');
        }
        else if(vSSenha==""){
            alert('O campo confirmar senha deve estar preenchido');
        }
        else if(vSenha!=vSSenha){
		    alert('As senhas não se correspondem');
        }
		else{
			$.ajax({
				type: "POST",
				url: "http://localhost/index.php",
				data: {
					acao: 'registrarUsuario',
					nome: vNome,
					email: vEmail,
					telefone: vTelefone,
					senha: vSenha
				},
				dataType: "json", 
				success: function (json) {
					if(json.result == true){
						console.log(json.err);
					}
					else{
						console.log(json.err);
					}
					if(json.alert == true){
					    alert(json.err);
                    }
                    else if(json.result == true){
					    alert('Cadastrado com sucesso');
                        document.getElementById('registerNome').value = "";
                        document.getElementById('registerEmail').value = "";
                        document.getElementById('registerTelefone').value = "";
                        document.getElementById('registerSenha').value = "";
                        document.getElementById('registerConfirmarSenha').value = "";
					    $.mobile.changePage('#LOGIN');
                    }
				},
				error: function(){
					console.log("##error");
				}
			});
		}
	},
//----------------------------------------------------------------------------------- CADASTRAR BARBEIRO ------------------------------------------------------------------------	
	 dbMakeLoginBar: function(){
        var vNome;
        var vEmail = document.getElementById('loginEmailbar').value;
        var vTelefone;
        var vSenha = document.getElementById('loginSenhabar').value;
        $.ajax({
            type: "POST",
            url: "http://localhost/index.php",
            data: {
                acao: 'loginbar',
                email: vEmail,
                senha: vSenha
            },
            dataType: "json",
            success: function (json) {
                if(json.result == true){
                    console.log(json.err);
                    app.db.transaction(function (tx) {
						tx.executeSql("Delete from logado where pk_id=pk_id");
                        var sql = "INSERT INTO logado (pk_id, nome, email, telefone, senha) VALUES ('"+json.pk_id+"', '"+json.nome+"', '"+json.email+"', '"+json.telefone+"', '"+json.senha+"')";
                        console.log("##cliente::Logado>"+sql);
                        tx.executeSql(sql);
                        $.mobile.changePage("#BARBEIROLOG");
						var ssql = "select * from logado where email = '"+ json.email +"'";
						tx.executeSql(ssql, [], function (tx, result) {
							console.log(result);
							document.getElementById('divAppendNomebar').append(result.rows[0].nome);
							document.getElementById('divAppendEmailbar').append(result.rows[0].email);
							document.getElementById('divAppendTelbar').append(result.rows[0].telefone);
						});
                    });
                }
                else if(json.result == false && json.alert == true){
                    alert(json.err);
                }
            },
            error: function(){
                console.log("##cliente::error");
            }
        });		
    },  
	
	dbRegisterBar: function(){
			var vNome = document.getElementById('registerNomebar').value;
			var vEmail = document.getElementById('registerEmailbar').value;
			var vTelefone= document.getElementById('registerTelefonebar').value;
			var vHorario= document.getElementById('registerHorario').value;
			var vSenha = document.getElementById('registerSenhabar').value;
			var vSSenha = document.getElementById('registerConfirmarSenhabar').value;
			var vLon = lonbar;
			var vLat = latbar;
			console.log(vLon);
			console.log(vLat);
			if(vNome==""){
				alert('O campo nome deve estar preenchido');
			}
			else if(vEmail==""){
				alert('O campo email deve estar preenchido');
			}
			else if(vEmail.search('@')<1){
				alert('O campo email deve conter um email valido');
			}
			else if(vTelefone==""){
				alert('O campo telefone deve estar preenchido');
			}
			else if(vTelefone.length<9){
				alert('O campo telefone deve conter um telefone válido');
			}
			else if(vSenha==""){
				alert('O campo senha deve estar preenchido');
			}
			else if(vSSenha==""){
				alert('O campo confirmar senha deve estar preenchido');
			}
			else if(vSenha!=vSSenha){
				alert('As senhas não se correspondem');
			}
			
			else{
				$.ajax({
					type: "POST",
					url: "http://localhost/index.php",
					data: {
						acao: 'registrarBarbeiro',
						nome: vNome,
						email: vEmail,
						telefone: vTelefone,
						horario: vHorario,
						senha: vSenha,
						latitude: vLat,
						longitude: vLon
					},
					dataType: "json", 
					success: function (json) {
						if(json.result == true){
							console.log(json.err);
						}
						else{
							console.log(json.err);
						}
						if(json.alert == true){
							alert(json.err);
						}
						else if(json.result == true){
							alert('Cadastrado feito com sucesso');
							document.getElementById('registerNomebar').value = "";
							document.getElementById('registerEmailbar').value = "";
							document.getElementById('registerTelefonebar').value = "";
							document.getElementById('registerHorario').value = "";
							document.getElementById('registerSenhabar').value = "";
							document.getElementById('registerConfirmarSenhabar').value = "";
							$.mobile.changePage('#LOGIN');
						}
					},
					error: function(){
						console.log("##error");
					}
				});
			}
		},
//----------------------------------------------------------------------------------- MOSTRAR BARBEIRO ------------------------------------------------------------------------	
	atMostrar: function(){$.ajax({
            type: "GET",
            url: "http://localhost/index.php",
            data: {
                acao: 'usuarios',
            },
            dataType: "json",
            success: function (json) {
				
								var div = document.getElementById('uniqueMap');
								var map = null;
								var lat = 51.49575692748839;
								var lon = -0.14600197187496633;
								map = new google.maps.Map(div, {
									center: {lat: lat, lng: lon},
									zoom: 15
								});
								var input = document.getElementById('searchbox');
								var markers = [];
								var marker = [];
								var search = new google.maps.places.SearchBox(input);
								document.getElementById('btnSearch').addEventListener('click', function(){
									var places = search.getPlaces();
									search.setBounds(map.getBounds());
									console.log(places);
									places.forEach(function(place) {		
										var geocoder = new google.maps.Geocoder();
										geocoder.geocode( { 'address' : place.formatted_address }, function( results, status ) {
											if( status == google.maps.GeocoderStatus.OK ) {
												//lon = results[0].geometry.location.lng();
												//console.log(lon);
												console.log(results[0].geometry.location.lat());
												console.log(results[0].geometry.location.lng());
												map.panTo( results[0].geometry.location );
											} else {
												alert( 'Geocode was not successful for the following reason: ' + status );
											}
										});
										markers.push(new google.maps.Marker({
										  map: map,
										  position: place.geometry.location
										}));
										 marker.event.addEventListener('click', function() {
											infowindow.open(map, marker);
										  });
										map.panTo(place.geometry.location);
										//var location{lat: varLat, lng: varLong};
										place = null;
									});
									places = [];
								});
							},
                if(json){
					console.log(json);
						var tr="";
						for(var i = 0; i < json.length; i++){
							 marker = new google.maps.Marker( {
													map     : map,
													position: {lat:json[i].latitude, lng:json[i].longitude},
													title: json[i].nome
												} );
										     infowindow = new google.maps.InfoWindow({
											 content: infoWindowContentIpgg
																});
											 infoWindowContentIpgg  = '<div id="content">'+
																		'<div id="siteNotice">'+
																		'</div>'+
																		'<h1 id="firstHeading" class="firstHeading">IPGG - Instituto Paulista de Geriatria e Gerontologia</h1>'+
																		'<div id="bodyContent">'+
																		'<table>'+
																		'<tr>'+
																		'<td> Pra&ccedil;a Padre Aleixo Monteiro Mafra, 34 - S&atilde;o Miguel Paulista"</td>'+
																		'</tr>'+
																		'</table>'+
																		'<p>www.ipgg.saude.sp.gov.br</p>'+
																		'</div>'+
																		'</div>';
											
						}
						
                }
            }) 
	 },
//----------------------------------------------------------------------------------- REGISTRAR AGENDAMENTO ------------------------------------------------------------------------		 
	Agendamento: function(){
			var vNome = document.getElementById('AgndNome').value;
			var vTelefone= document.getElementById('AgndTelefone').value;
			var vData= document.getElementById('AgndData').value;
			var vEndereco= document.getElementById('AgndEndereco').value;
			var vLocal = document.getElementById('AgndLocal').value;
			
			if(vNome==""){
				alert('O campo nome deve estar preenchido');
			}
			else if(vTelefone==""){
				alert('O campo telefone deve estar preenchido');
			}
			else if(vTelefone.length<9){
				alert('O campo telefone deve conter um telefone válido');
			} else{
				$.ajax({
					type: "POST",
					url: "http://localhost/index.php",
					data: {
						acao:'agendamento',
						nome: vNome,
						telefone: vTelefone,
						data: vData,
						endereco: vEndereco,
						local: vLocal
					},
					dataType: "json", 
					success: function (json) {
						if(json.result == true){
							console.log(json.err);
						}
						else{
							console.log(json.err);
						}
						if(json.alert == true){
							alert(json.err);
						}
						else if(json.result == true){
							alert('Agendamento feito com sucesso');
							document.getElementById('AgndNome').value = "";
							document.getElementById('AgndTelefone').value = "";
							document.getElementById('AgndData').value = "";
							document.getElementById('AgndEndereco').value = "";
							
						}
					},
					error: function(){
						console.log("##error");
					}
				});
			}
		},
//----------------------------------------------------------------------------------- VER AGENDAMENTOS ------------------------------------------------------------------------
	vAgenda: function(){$.ajax({
            type: "GET",
            url: "http://localhost/index.php",
            data: {
                acao: 'veragendamentos',
            },
            dataType: "json",
            success: function (json) {
                if(json){
					console.log(json);
						var tr="";
						for(var i = 0; i < json.length; i++){
							tr += '<div data-role="collapsible" data-corners="false" class="ui-corner-none" data-collapsed="false">'
							tr +=	'<h2 class="ui-collapsible-heading"><a class="ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-up-d" href="#" data-corners="false" data-shadow="false" data-iconshadow="true" data-icon="plus" data-iconpos="left" data-theme="d">'
							tr +=		'<span class="ui-btn-text">'+ json[i].nome +'</span>'
							tr +=	'</a></h2>'
							tr +=	'<div class="ui-body ui-body-d ui-textalign-left">'
							tr +=		'<!-- profile fields -->'		  
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Telefone</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>'+ json[i].telefone
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Data</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].data
							tr +=		'<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'><div class="left-table">Endereco</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].endereco
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Local</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].local 
							tr +=		'</div>'
							tr +=	'</div>'
						 document.getElementById('MOSTRARAGEND').innerHTML = tr;           
						}
                }
                else{
					console.log(json);
                }
            },
            error: function(){
                console.log("##cliente::error");
            }
        })
	 }	
}
app.initialize();