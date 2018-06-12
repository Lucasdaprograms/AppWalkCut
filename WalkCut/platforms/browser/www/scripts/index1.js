function funcao1()
	{
		var x;
		var r=confirm("Deseja mesmo cancelar seu cadastro?");
		if (r==true)
		  {
		   window.location.href = "#LOGIN";
		  }
		else
		  {
		  x="Você pressionou Cancelar!";
		  }
		document.getElementById("demo").innerHTML=x;
	};
function sair()
	{
		var x;
		var r=confirm("Deseja mesmo sair?");
		if (r==true)
		  {
		   window.location.href = "#LOGIN";
		  }
		else
		  {
		  x="Você pressionou Cancelar!";
		  }
		document.getElementById("demo").innerHTML=x;
	};
	

		