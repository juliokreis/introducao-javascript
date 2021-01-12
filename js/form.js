var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){ //escuta um evento adicionado
    event.preventDefault();// evita o comportamento padrão do formulário dentro da função anônima
    
    //Extrai informações do paciente do form.
    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteForm(form);
    
    //Cria a "Tr" e "Td" do paciente.
    var pacienteTr = montaTr(paciente);
    console.log(erros);
    var erros = validaPaciente(paciente);
    
    if (erros.length > 0) {
        exibeMensagemDeErro(erros);

        return;
    }
            
    //Adiciona paciente na tabela.    
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr); 
    form.reset();
    
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});

function exibeMensagemDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteForm(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    };

    return paciente;
}

function montaTr(paciente) { //Monta a "Tr"
    var pacienteTr = document.createElement("tr"); //Cria a "Tr"
    pacienteTr.classList.add("paciente"); //Monta a classe

    //Adiciona as características de cada "Td"
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {

    var erros = [];
    
    if (!validaPeso(paciente.peso)){
        erros.push("Peso inválido!");
    } 

    if (!validaAltura(paciente.altura)){
        erros.push(" Altura inválida!");
    }

    if (paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco!");
    } 
    
    if (paciente.peso.length == 0) {
        erros.push("Peso não pode ser em branco!");
    }
    
    if (paciente.altura.length == 0) {
        erros.push("Altura não pode ser em branco!");
    }
    
    if (paciente.gordura.length == 0) {
        erros.push("Gordura não pode ser em branco!");
    }

    return erros;
}