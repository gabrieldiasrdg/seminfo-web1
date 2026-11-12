const participantes = [];

const formulario = document.getElementById("form-inscricao");
const mensagem = document.getElementById("mensagem");
const tabela = document.getElementById("tabela-participantes");
const total = document.getElementById("total");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Capturando os dados pessoais
    const nome = document.getElementById("nome").value.trim();
    const idadeTexto = document.getElementById("idade").value;
    const idade = Number(idadeTexto);
    const curso = document.getElementById("curso").value;
    const matricula = document.getElementById("matricula").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();

    //Dados de modalidade e turno
    const modalidadeSelecionada = document.querySelector('input[name="modalidade"]:checked') //pega o input name com a modalidade selecionada apenas
    const modalidade = modalidadeSelecionada?.value || ""; //passa o valor do inputname, se não tiver, passa ""

    const turnoSelecionada = document.querySelector('input[name="turno"]:checked')
    const turno = turnoSelecionada?.value || "";

    //Minicurso
    const minicurso = document.getElementById("minicurso").value;

    //Atividades selecionadas (checkboxs)
    const caixasMarcadas = this.querySelectorAll('input[name = evento]:checked'); ////pega o input name com as atividades selecionadas, por isso ALL;
    const eventos = [];
    caixasMarcadas.forEach(function(caixa) {
        eventos.push(caixa.value);
    })

    // Validando os campos
    if (
        nome === "" ||
        !Number.isInteger(idade) ||
        idade < 1 ||
        idade > 120 ||
        curso === "" ||
        matricula === "" ||
        email === "" ||
        modalidade === "" ||
        minicurso === "" ||
        turno === ""
    ) {
        mensagem.innerText = "Preencha todos os campos corretamente.";
        return;
    }

    /*
    const matriculaExiste = participantes.some(function(participante){
        return participante.matricula === matricula;
    })
    const emailExiste = participantes.some(function(participante){
        return participante.email === email;
    });
    if (emailExiste || matriculaExiste){
        mensagem.innerText = "Este email ou matricula já está cadastrado! ";
        mensagem.style.color = 'red';
        return;
    }
    */

    const duplicado = participantes.some(function(p) {
        return p.matricula === matricula || p.email === email;
    })
    if(duplicado){
        mensagem.innerText = "Este email ou matricula já está cadastrado! ";
        mensagem.style.color = 'red';
        return;
    }

    // Criando o objeto
    const participante = {
        nome: nome,
        idade: idade,
        curso: curso,
        matricula: matricula,
        email: email,
        modalidade: modalidade,
        minicurso: minicurso,
        turno: turno,
        eventos: eventos
    };

    // Adicionando o objeto ao array
    participantes.push(participante);

    // Atualizando a tabela
    mostrarParticipantes();

    mensagem.innerText = "Participante cadastrado com sucesso!";

    formulario.reset();
});

function mostrarParticipantes() {
    tabela.innerHTML = "";

    participantes.forEach(function(participante) {
        const linha = document.createElement("tr");
        const dados = [
            participante.nome,
            participante.idade,
            participante.curso,
            participante.matricula,
            participante.email,
            participante.modalidade,
            participante.minicurso,
            participante.turno,
            participante.eventos.join(", ") || "Nenhuma"
        ];
        dados.forEach(function(dado){
            const coluna = document.createElement('td');
            coluna.innerText = dado;
            linha.appendChild(coluna);
        })
        
        tabela.appendChild(linha);
    });

    total.innerText = participantes.length;
}