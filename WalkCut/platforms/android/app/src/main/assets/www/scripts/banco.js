window.addEventListener('load', carregado);

var db = window.openDatabase("dbWalkCut", "1.0", "dbWalkCut", 1000000);
 
function carregado(){
	
	 document.getElementById('btnCadastrarcli').addEventListener('click', salvar);
	 
	 db.transaction(function(tx) {
	// tx.executeSql('DROP TABLE IF EXISTS usuario');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (nome,senha,email,data_nascimento,cpf,sexo,endereco,bairro,cidade,estado,telefone)');
	 });
}

function salvar(){
	db.transaction(function(tx) {
	var inserttbcliente = 'INSERT INTO usuario (nome,senha,email,data_nascimento,cpf,sexo,endereco,bairro,cidade,estado,telefone) VALUES ("' + document.getElementById('nome').value + '","' + document.getElementById('senha').value + '","' + document.getElementById('email').value +
							'","' + document.getElementById('data_nascimento').value + '","' + document.getElementById('cpf').value + '","' + document.getElementById('cmbSexo').value + '","' + document.getElementById('endereco').value + '","' + document.getElementById('bairro').value + 
							'","' + document.getElementById('cidade').value + '","' + document.getElementById('estado').value + '","' + document.getElementById('telefone').value +'")';
tx.executeSql(inserttbcliente);




/* var NovoConsumidor = new Usuario()

    NovoConsumidor.nome = $('#NomeUsuario').val();
    NovoConsumidor.senha = $('#SenhaUsuario').val();
    NovoConsumidor.email = $('#EmailUsuario').val();
    NovoConsumidor.data_nascimento = $('#NascimentoUsuario').val();
    NovoConsumidor.cpf = $('#CpfUsuario').val();
    NovoConsumidor.sexo = $('#SexoUsuario').val();
    NovoConsumidor.endereco = $('#EnderecoUsuario').val();
    NovoConsumidor.bairro = $('#BairroUsuario').val();
    NovoConsumidor.cidade = $('#CidadeUsuario').val();
    NovoConsumidor.estado = $('#EstadoUsuario').val();
    NovoConsumidor.telefone = $('#TelefoneUsuario').val();
	

  if (validarCadastro(NovoConsumidor) === true) {
        salvar(NovoConsumidor);
        showToast("Validado");
    }
	*/
})};

