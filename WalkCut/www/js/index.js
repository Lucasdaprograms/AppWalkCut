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
        document.getElementById('btnRegisterUser').addEventListener('click', this.dbRegisterUser);
		document.getElementById('btnRegisterBar').addEventListener('click', this.dbRegisterBar);
        document.getElementById('btnLogin').addEventListener('click', this.dbMakeLogin);
		document.getElementById('btnLoginBar').addEventListener('click', this.dbMakeLoginBar);
		document.getElementById('BtnAgendar').addEventListener('click', this.Agendamento);
    },
	
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
			var vEndereco= document.getElementById('registerEndereco').value;
			var vHorario= document.getElementById('registerHorario').value;
			var vSenha = document.getElementById('registerSenhabar').value;
			var vSSenha = document.getElementById('registerConfirmarSenhabar').value;
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
						endereco: vEndereco,
						horario: vHorario,
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
							alert('Cadastrado feito com sucesso');
							document.getElementById('registerNomebar').value = "";
							document.getElementById('registerEmailbar').value = "";
							document.getElementById('registerTelefonebar').value = "";
							document.getElementById('registerEndereco').value = "";
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
                if(json){
					console.log(json);
						var tr="";
						for(var i = 0; i < json.length; i++){
							tr += '<div data-role="collapsible" data-corners="false" class="ui-corner-none" data-collapsed="false">'
							tr +=	'<h2 class="ui-collapsible-heading"><a class="ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-up-d" href="#" data-corners="false" data-shadow="false" data-iconshadow="true" data-icon="plus" data-iconpos="left" data-theme="d">'
							tr +=		'<span class="ui-btn-text">' + json[i].nome +'</span>'
							tr +=	'</a></h2>'
							tr +=	'<div class="ui-body ui-body-d ui-textalign-left">'
							tr +=		'<!-- profile fields -->'		   
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Email</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>'+ json[i].email 
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Telefone</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>'+ json[i].telefone
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<center><div class="left-table" >Endereco</div></center>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].endereco
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Funcionamento</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].horario 
							tr +=		'<a href="#Agendar" data-position-to="window" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-mail" data-transition="pop">AGENDAR CORTE</a>'
							tr +=		'</div>'
							tr +=	'</div>'
							document.getElementById('MOSTRAR').innerHTML = tr;           
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
							tr +=			'><div class="left-table">Endereço</div>'
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