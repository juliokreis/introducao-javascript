var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){ //escuta um evento adicionado
    event.preventDefault();// evita o comportamento padrão do formulário dentro da função anônima
    
    //Extrai informações do paciente do form.
    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteForm(form);
    
    //Cria a "Tr" e "Td" do paciente.
    var pacienteTr = montaTr(paciente);

    if (!validaPaciente(paciente)) {
        alert("Paciente inválido!");
        return;
    }
            
    //Adiciona paciente na tabela.    
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr); 
    form.reset();
});

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
    if (validaPeso(paciente.peso)) {
        return true;
    }else{
        return false;
    }
}