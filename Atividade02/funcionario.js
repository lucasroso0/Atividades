class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this._nome = nome;
        this._idade = Number(idade);
        this._cargo = cargo;
        this._salario = Number(salario);
    }

    get nome() { return this._nome; }
    set nome(nome) { this._nome = nome; }

    get idade() { return this._idade; }
    set idade(idade) { this._idade = Number(idade); }

    get cargo() { return this._cargo; }
    set cargo(cargo) { this._cargo = cargo; }

    get salario() { return this._salario; }
    set salario(salario) { this._salario = Number(salario); }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: R$ ${this.salario.toFixed(2)}`;
    }
}

// Recuperando os funcionários do localStorage
const funcionarios = JSON.parse(localStorage.getItem("funcionarios"))?.map(f => new Funcionario(f._nome, f._idade, f._cargo, f._salario)) || [];

const salvarFuncionariosNoStorage = () => {
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
};

const atualizarListaFuncionarios = () => {
    const tabela = document.getElementById("lista-funcionarios");
    tabela.innerHTML = "";

    funcionarios.forEach((funcionario, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.idade}</td>
            <td>${funcionario.cargo}</td>
            <td>R$ ${funcionario.salario.toFixed(2)}</td>
            <td>
                <button onclick="editarFuncionario(${index})">Editar</button>
                <button onclick="excluirFuncionario(${index})">Excluir</button>
            </td>
        `;

        tabela.appendChild(tr);
    });
};
// Carregar funcionários ao iniciar a página
document.addEventListener("DOMContentLoaded", atualizarListaFuncionarios);

document.getElementById("formulario").addEventListener("submit", event => {
    event.preventDefault();
    
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value;
    const cargo = document.getElementById("cargo").value.trim();
    const salario = document.getElementById("salario").value;
    const indiceEdicao = document.getElementById("indiceEdicao").value;

    if (!nome || !idade || !cargo || !salario) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (indiceEdicao !== "") {
        // Editando funcionário existente
        funcionarios[indiceEdicao] = new Funcionario(nome, idade, cargo, salario);
        document.getElementById("indiceEdicao").value = "";
    } else {
        // Adicionando novo funcionário
        funcionarios.push(new Funcionario(nome, idade, cargo, salario));
    }

    salvarFuncionariosNoStorage();
    atualizarListaFuncionarios();
    alert("Funcionário salvo com sucesso!");
    event.target.reset();
});

const excluirFuncionario = index => {
    if (confirm("Tem certeza que deseja excluir este funcionário?")) {
        funcionarios.splice(index, 1);
        salvarFuncionariosNoStorage();
        atualizarListaFuncionarios();
    }
};

const editarFuncionario = index => {
    const funcionario = funcionarios[index];
    document.getElementById("nome").value = funcionario.nome;
    document.getElementById("idade").value = funcionario.idade;
    document.getElementById("cargo").value = funcionario.cargo;
    document.getElementById("salario").value = funcionario.salario;
    document.getElementById("indiceEdicao").value = index;
};

// Relatórios
document.getElementById("listarSalarioAlto").addEventListener("click", () => {
    const lista = funcionarios.filter(f => f.salario > 5000).map(f => f.toString()).join("\n") || "Nenhum funcionário encontrado.";
    alert(lista);
});

document.getElementById("mediaSalarial").addEventListener("click", () => {
    const media = funcionarios.reduce((acc, f) => acc + f.salario, 0) / funcionarios.length || 0;
    alert(`Média Salarial: R$ ${media.toFixed(2)}`);
});

document.getElementById("cargosUnicos").addEventListener("click", () => {
    const cargos = [...new Set(funcionarios.map(f => f.cargo))].join(", ") || "Nenhum cargo encontrado.";
    alert(`Cargos únicos: ${cargos}`);
});

document.getElementById("nomesMaiusculo").addEventListener("click", () => {
    const nomes = funcionarios.map(f => f.nome.toUpperCase()).join(", ") || "Nenhum funcionário encontrado.";
    alert(`Nomes em maiúsculo: ${nomes}`);
});
