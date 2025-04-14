class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = Number(idade);
        this.curso = curso;
        this.notaFinal = Number(notaFinal);
    }

    isAprovado = () => this.notaFinal >= 7;

    toString = () => 
        `Nome: ${this.nome} | Idade: ${this.idade} | Curso: ${this.curso} | Nota Final: ${this.notaFinal} | ${this.isAprovado() ? "Aprovado" : "Reprovado"}`;
}

const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

const salvarAlunosNoStorage = () => {
    localStorage.setItem("alunos", JSON.stringify(alunos));
};

const atualizarListaAlunos = () => {
    const lista = document.getElementById("lista-alunos");
    lista.innerHTML = "";
    alunos.forEach((aluno, index) => {
        const div = document.createElement("div");
        div.textContent = new Aluno(aluno.nome, aluno.idade, aluno.curso, aluno.notaFinal).toString();
        
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => {
            alunos.splice(index, 1);
            salvarAlunosNoStorage();
            atualizarListaAlunos();
            console.log("Aluno excluído!");
        };

        div.appendChild(btnExcluir);
        lista.appendChild(div);
    });
};

document.getElementById("formulario").addEventListener("submit", event => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = document.getElementById("notaFinal").value;

    const aluno = new Aluno(nome, idade, curso, notaFinal);
    alunos.push(aluno);
    salvarAlunosNoStorage();
    atualizarListaAlunos();
    alert("Aluno cadastrado com sucesso!");
    event.target.reset();
});

document.getElementById("listarAprovados").addEventListener("click", () => {
    const aprovados = alunos.filter(aluno => aluno.notaFinal >= 7);
    alert(aprovados.map(aluno => aluno.nome).join(", ") || "Nenhum aluno aprovado.");
});

document.getElementById("mediaNotas").addEventListener("click", () => {
    const media = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0) / alunos.length || 0;
    alert(`Média das Notas: ${media.toFixed(2)}`);
});

document.getElementById("mediaIdades").addEventListener("click", () => {
    const media = alunos.reduce((acc, aluno) => acc + aluno.idade, 0) / alunos.length || 0;
    alert(`Média das Idades: ${media.toFixed(2)}`);
});

document.getElementById("ordenarNomes").addEventListener("click", () => {
    alunos.sort((a, b) => a.nome.localeCompare(b.nome));
    salvarAlunosNoStorage();
    atualizarListaAlunos();
    alert("Alunos ordenados alfabeticamente.");
});

document.getElementById("quantidadePorCurso").addEventListener("click", () => {
    const quantidade = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});

    let resultado = "Quantidade de alunos por curso:\n";
    for (const curso in quantidade) {
        resultado += `${curso}: ${quantidade[curso]}\n`;
    }

    alert(resultado);
});

document.addEventListener("DOMContentLoaded", atualizarListaAlunos);
