// inicio da função construtora
class GerarTarefas {
  // parâmetros
  constructor(tarefa, todasTarefas, botaoAdicionar) {
    this.tarefa = document.querySelector(tarefa);
    this.todasTarefas = document.querySelector(todasTarefas);
    this.botaoAdicionar = document.querySelector(botaoAdicionar);

    // referencia ao this na função de callback
    this.adicionarTarefa = this.adicionarTarefa.bind(this);
  }

  // função que seleciona e checka o INPUT CHECKBOX
  gerarCheckbox() {
    this.checkbox = document.querySelectorAll('input[type="checkbox"');
    this.checkbox.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.target.nextElementSibling.classList.toggle("concluido");
        e.target.classList.toggle("checado");
      });
    });
  }

  // função que seleciona e deleta as tarefas
  gerarDelete() {
    this.botaoDeletar = document.querySelectorAll(".botao-deletar");
    this.botaoDeletar.forEach((item) => {
      item.addEventListener("click", (e) => {
        item.parentElement.parentElement.parentElement.classList.add(
          "removido"
        );
        setTimeout(() => {
          item.parentElement.parentElement.parentElement.remove();
        }, 480);
      });
    });
  }

  // função que adiciona as tarefas ao HTML
  adicionarTarefa() {
    if (this.tarefa.value !== "")
      this.todasTarefas.innerHTML +=
        '<div class="tarefas"><div class="lista__item estilo_padrao"><input type="checkbox"></input><p class="texto-tarefa">' +
        this.tarefa.value +
        '</p><div> <button class="botao-deletar bgImgConfig"></button></div></div></div>';
    this.tarefa.value = "";
    this.gerarCheckbox();
    this.gerarDelete();
  }

  // Função que salva as tarefas no localStorage
  salvarTarefa() {
    setInterval(() => {
      localStorage.setItem("tarefas", this.todasTarefas.innerHTML);
    }, 200);
    if (localStorage.tarefas) {
      this.todasTarefas.innerHTML = localStorage.tarefas;
    }
  }

  // função que adiciona os eventos de click
  addEventos() {
    this.botaoAdicionar.addEventListener("click", this.adicionarTarefa);
    this.tarefa.addEventListener("change", this.adicionarTarefa);
  }

  // função que inicia as funções
  iniciarScript() {
    this.salvarTarefa();
    this.addEventos();
    this.gerarDelete();
    this.gerarCheckbox();
    return this;
  }
}

const gerarTarefas = new GerarTarefas(
  ".campo__tarefa",
  ".todas-tarefas",
  ".botao__adicionar"
);
gerarTarefas.iniciarScript();
