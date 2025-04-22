// Selecionar elementos traduzidos para português
const formularioGasto = document.getElementById('formulario-gasto');
const tabelaGastos = document.getElementById('tabela-gastos').querySelector('tbody');
const totalGasto = document.getElementById('total-gasto');

let gastos = [];

// Adicionei uma classe CSS para valores altos
const estilo = document.createElement('style');
estilo.textContent = `
  .valor-alto {
    color: red;
    font-weight: bold;
  }
`;
document.head.appendChild(estilo);

// Adicionar evento de submissão ao formulário
formularioGasto.addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const categoria = document.getElementById('categoria').value;

    if (descricao && !isNaN(valor) && categoria) {
        const novoGasto = { descricao, valor, categoria };
        gastos.push(novoGasto);
        atualizarTabela();
        atualizarTotal();
        formularioGasto.reset();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

// Atualizar a tabela de gastos
function atualizarTabela() {
    tabelaGastos.innerHTML = '';
    gastos.forEach((gasto, index) => {
        const linha = document.createElement('tr');

        const valorClasse = gasto.valor > 100 ? 'valor-alto' : '';

        linha.innerHTML = `
            <td>${gasto.descricao}</td>
            <td class="${valorClasse}">R$ ${gasto.valor.toFixed(2).replace('.', ',')}</td>
            <td>${gasto.categoria}</td>
            <td>
                <button onclick="editarGasto(${index})">Editar</button>
                <button onclick="removerGasto(${index})">Remover</button>
            </td>
        `;

        tabelaGastos.appendChild(linha);
    });
}

// Atualizar o total de gastos
function atualizarTotal() {
    const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0);
    totalGasto.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remover um gasto da lista
function removerGasto(index) {
    gastos.splice(index, 1);
    atualizarTabela();
    atualizarTotal();
}

// Adicionar funcionalidade de edição de gastos
function editarGasto(index) {
    const gasto = gastos[index];
    document.getElementById('descricao').value = gasto.descricao;
    document.getElementById('valor').value = gasto.valor;
    document.getElementById('categoria').value = gasto.categoria;

    // Remover o gasto da lista temporariamente para edição
    removerGasto(index);
}