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
        
        document.getElementById('btnRegisterUser').addEventListener('click', this.dbRegisterUser);
		document.getElementById('btnRegisterBar').addEventListener('click', this.dbRegisterBar);
        document.getElementById('btnLogin').addEventListener('click', this.dbMakeLogin);
		document.getElementById('btnLoginBar').addEventListener('click', this.dbMakeLoginBar);
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
					    alert('cadastrado com sucesso');
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
                        $.mobile.changePage("#CLIENTELOG");
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
							alert('cadastrado com sucesso');
							document.getElementById('registerNomebar').value = "";
							document.getElementById('registerEmailbar').value = "";
							document.getElementById('registerTelefonebar').value = "";
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

  
};
app.initialize();