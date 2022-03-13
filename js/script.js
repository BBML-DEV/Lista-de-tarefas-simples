const inputTarefa = document.querySelector("#tarefa");
const btnTarefa = document.querySelector("#btnTarefa");
const tarefas = document.querySelector("#listaTarefas");

function criaLi() {
    const li = document.createElement("li");
    return li;
}

function mostraTarefa(textoInput) {
   const li = criaLi();
   li.innerHTML = textoInput;
   tarefas.appendChild(li);
   limparTarefa();
   criaBotaoApagar(li);
   salvarTarefas();
}


function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll("li");
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto =  tarefaTexto.replace("deletar", " ").trim();
        listaDeTarefas.push(tarefaTexto);
    
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function limparTarefa() {
    inputTarefa.value = " ";
    inputTarefa.focus();
}

function criaBotaoApagar (li) {
    li.innerText += " ";
    const botaoApagar = document.createElement("button");
    botaoApagar.innerText = "deletar";
    botaoApagar.setAttribute("class", "apagar");
    botaoApagar.setAttribute("title", "apagar está tarefa");
    li.appendChild(botaoApagar);
}

btnTarefa.addEventListener("click", function () {
    if(!inputTarefa.value) return; 
    mostraTarefa(inputTarefa.value);
});

inputTarefa.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        if(!inputTarefa.value) return; 
        mostraTarefa(inputTarefa.value);
    }
});


document.addEventListener("click", function (e) {
    const el = e.target;
    if (el.classList.contains("apagar")) {
        el.parentElement.remove();
        salvarTarefas();
    }
});