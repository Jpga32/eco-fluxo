document.addEventListener('DOMContentLoaded', () => {
    // Autor: João Pedro H. Ganacim
    // Data: 20/10/2025
    // Projeto: EcoFluxo

    // 1. INICIALIZAÇÃO E GERAL


    // Atualiza o ano no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Lógica para Smooth Scroll (rolagem suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = 56;
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ----------------------------------------------------
    // 2. INICIALIZAÇÃO DO GRÁFICO (Chart.js)
    // ----------------------------------------------------

    const ctx = document.getElementById('composicaoLixoChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Matéria Orgânica (45%)', 'Plástico (15%)', 'Papel/Papelão (10%)', 'Vidro (2%)', 'Metal (3%)', 'Outros/Rejeito (25%)'],
                datasets: [{
                    label: 'Composição Média',
                    data: [45, 15, 10, 2, 3, 25],
                    backgroundColor: [
                        '#8B4513', '#DC3545', '#007BFF', '#28A745', '#FFC107', '#6C757D'
                    ],
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) label += context.parsed + '%';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // ----------------------------------------------------
    // 3. SEÇÃO 5 R's (Geração de Cards)
    // ----------------------------------------------------

    const rsData = [
        { r: "Repensar", icon: "fas fa-brain", description: "Mude seus hábitos de consumo e questione suas necessidades reais antes de comprar.", color: "#6F42C1" },
        { r: "Recusar", icon: "fas fa-ban", description: "Diga 'não' a produtos desnecessários, descartáveis e embalagens excessivas.", color: "#DC3545" },
        { r: "Reduzir", icon: "fas fa-minus-circle", description: "Compre menos, escolha produtos duráveis e minimize a geração de lixo diário.", color: "#17A2B8" },
        { r: "Reusar", icon: "fas fa-sync-alt", description: "Use objetos mais de uma vez. Doe, conserte ou encontre novas funções para o que seria descartado.", color: "#FFC107" },
        { r: "Reciclar", icon: "fas fa-recycle", description: "Separe corretamente o lixo reciclável e encaminhe-o para a coleta seletiva.", color: "#4CAF50" },
    ];

    // Autor: João Pedro H. Ganacim
    // Data: 20/10/2025
    // Projeto: EcoFluxo

    const rCardsContainer = document.getElementById('r-cards-container');
    function gerarCards5Rs() {
        if (!rCardsContainer) return;
        rCardsContainer.innerHTML = '';
        rsData.forEach(item => {
            const card = document.createElement('div');
            card.className = `col-12 col-md-6 col-lg-4 col-xl-2dot4 mb-4`;
            card.innerHTML = `
                <div class="card card-5r h-100 p-3 text-center"> 
                    <div class="card-body">
                        <i class="${item.icon} fa-3x mb-3" style="color: ${item.color} !important;"></i>
                        <h5 class="card-title fw-bold" style="color: ${item.color} !important;">${item.r}</h5>
                        <p class="card-text small text-muted">${item.description}</p>
                    </div>
                </div>
            `;
            rCardsContainer.appendChild(card);
        });
    }
    gerarCards5Rs();

    // ----------------------------------------------------
    // 4. SEÇÃO GUIA DE RECICLAGEM
    // ----------------------------------------------------

    const recyclingData = {
        "Papel": {
            cor: "var(--lixeira-azul)",
            pode: [
                "Jornais, revistas e panfletos",
                "Folhas de escritório, cadernos e envelopes",
                "Caixas de papelão e embalagens longa vida (limpas)",
                "Tubos de papel e papel pardo"
            ],
            naoPode: [
                "Papel carbono, etiquetas adesivas e fitas crepe",
                "Papéis sanitários, guardanapos sujos e papel toalha",
                "Papel celofane e parafinado",
                "Clipes, grampos (retire-os antes de reciclar)"
            ]
        },
        "Plástico": {
            cor: "var(--lixeira-vermelha)",
            pode: [
                "Garrafas PET de refrigerante e água",
                "Embalagens de produtos de limpeza e higiene",
                "Potes de alimentos (margarina, iogurte)",
                "Bacias, baldes e brinquedos plásticos",
                "Sacos e sacolas plásticas"
            ],
            naoPode: [
                "Plásticos termoendurecíveis (cabos de panela, interruptores)",
                "Esponjas de cozinha",
                "Adesivos plásticos",
                "Embalagens com resíduos orgânicos ou químicos (limpe-as antes!)"
            ]
        },
        "Vidro": {
            cor: "var(--lixeira-verde)",
            pode: [
                "Garrafas de bebidas",
                "Potes de conserva",
                "Frascos de perfume e cosméticos",
                "Copos e taças inteiros"
            ],
            naoPode: [
                "Espelhos, lâmpadas e louças",
                "Vidros planos ou temperados",
                "Ampolas de medicamentos",
                "Cristais e óculos"
            ]
        },
        "Metal": {
            cor: "var(--lixeira-amarela)",
            pode: [
                "Latas de alumínio e aço",
                "Ferragens, arames e pregos",
                "Panelas sem cabo e talheres"
            ],
            naoPode: [
                "Esponjas de aço",
                "Embalagens de aerossol ou tóxicas",
                "Latas de tinta ou produtos químicos"
            ]
        }
    };



    // Autor: João Pedro H. Ganacim
    // Data: 20/10/2025
    // Projeto: EcoFluxo

    const lixeiraButtons = document.querySelectorAll('.btn-lixeira');
    const resultadoDiv = document.getElementById('resultado-reciclagem');

    function renderRecyclingContent(material) {
        const data = recyclingData[material];
        if (!data) return;
        resultadoDiv.innerHTML = `
            <h4 class="text-center fw-bold mb-4" style="color: ${data.cor}">${material}</h4>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <h6 class="text-success fw-bold"><i class="fas fa-check-circle me-2"></i> PODE RECICLAR</h6>
                    <ul class="lista-pode-nao-pode text-muted">
                        ${data.pode.map(item => `<li><i class="fas fa-arrow-right me-2 small"></i>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="col-md-6 mb-3">
                    <h6 class="text-danger fw-bold"><i class="fas fa-times-circle me-2"></i> NÃO PODE RECICLAR</h6>
                    <ul class="lista-pode-nao-pode text-muted">
                        ${data.naoPode.map(item => `<li><i class="fas fa-arrow-right me-2 small"></i>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    lixeiraButtons.forEach(button => {
        button.addEventListener('click', function () {
            lixeiraButtons.forEach(btn => btn.classList.remove('active-lixeira'));
            this.classList.add('active-lixeira');
            const material = this.getAttribute('data-material');
            renderRecyclingContent(material);
        });
    });

    // ----------------------------------------------------
    // 5. SEÇÃO DESENVOLVEDORES
    // ----------------------------------------------------

    const integrantes = [
        {
            nome: "João Pedro H. Ganacim ",
            funcao: "Líder de Projeto e Frontend",
            fotoUrl: "../img/joao.png",
            linkedinUrl: "https://www.linkedin.com/in/joão-pedro-honorato-ganacim-60792b244"
        },
        {
            nome: "Marco Antônio Borges Salamoni",
            funcao: " Desenvolvedor python e Conteúdo",
            fotoUrl: "../img/marco.png",
            linkedinUrl: "https://www.linkedin.com/in/maria-oliveira-ficticio"
        },
        {
            nome: "Julia Assis ",
            funcao: "Frontend e desenvolvedora Back-End ",
            fotoUrl: "../img/julia.png",
            linkedinUrl: "https://www.linkedin.com/in/júlia-assis-66921423a"
        },
        {
            nome: "Gabriel Silva Braga",
            funcao: "Suporte e auxilio de informações tecnicas",
            fotoUrl: "../img/gabriel.png",
            linkedinUrl: "https://www.linkedin.com/in/carlos-pereira-ficticio"
        },
        {
            nome: "Brenno Rodrigues",
            funcao: "Suporte e Hospedagem",
            fotoUrl: "../img/brenno.png",
            linkedinUrl: "https://www.linkedin.com/in/carlos-pereira-ficticio"
        },

        {
            nome: "Derick Silva Freire ",
            funcao: "Ux/Ui e Pesquisa",
            fotoUrl: "../img/derick.png",
            linkedinUrl: "https://www.linkedin.com/in/carlos-pereira-ficticio"
        },
        {
            nome: "Danilo Oliveira",
            funcao: "Suporte e Hospedagem",
            fotoUrl: "https://placehold.co/120x120/FFC107/333333?text=CP",
            linkedinUrl: "https://www.linkedin.com/in/carlos-pereira-ficticio"
        },


    ];

    const desenvolvedoresContainer = document.getElementById('desenvolvedores-container');
    function gerarCardsDesenvolvedores() {
        if (!desenvolvedoresContainer) return;
        integrantes.forEach(membro => {
            const html = `
                <div class="col-12 col-md-4 col-lg-3 mb-4">
                    <div class="card card-desenvolvedor h-100 text-center">
                        <div class="card-body d-flex flex-column align-items-center">
                            <img src="${membro.fotoUrl}" alt="Foto de ${membro.nome}" class="perfil-foto">
                            <h5 class="card-title fw-bold mb-1">${membro.nome}</h5>
                            <p class="text-muted mb-3">${membro.funcao}</p>
                            <a href="${membro.linkedinUrl}" target="_blank" class="linkedin-link mt-auto">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            desenvolvedoresContainer.insertAdjacentHTML('beforeend', html);
        });
    }

    if (desenvolvedoresContainer) gerarCardsDesenvolvedores();

    console.log("Scripts do Projeto EcoFluxo Carregados.");
});
// Atualiza o ano automaticamente no rodapé
document.getElementById("current-year").textContent = new Date().getFullYear();

// ---------------------------
// FUNÇÃO: Botão "Ver Tabela de Preços (Simulada)"
// ---------------------------

// Cria o modal dinamicamente
const modalHTML = `
<div class="modal fade" id="modalTabelaPrecos" tabindex="-1" aria-labelledby="modalTabelaPrecosLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-success text-white">
        <h5 class="modal-title fw-bold" id="modalTabelaPrecosLabel">Tabela de Preços Simulada</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="modal-body">
        <p class="text-muted text-center">Valores aproximados de mercado (atualizados semanalmente em cooperativas).</p>
        <div class="table-responsive">
          <table class="table table-bordered align-middle text-center">
            <thead class="table-success">
              <tr>
                <th>Material</th>
                <th>Descrição</th>
                <th>Valor Médio (R$/kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i class="fas fa-bottle-water text-primary"></i> Plástico PET</td>
                <td>Garrafas e embalagens PET limpas</td>
                <td>R$ 2,00</td>
              </tr>
              <tr>
                <td><i class="fas fa-box-archive text-warning"></i> Metal (Alumínio)</td>
                <td>Latinhas de bebidas</td>
                <td>R$ 6,50</td>
              </tr>
              <tr>
                <td><i class="fas fa-newspaper text-info"></i> Papelão</td>
                <td>Caixas e papelão seco</td>
                <td>R$ 0,80</td>
              </tr>
              <tr>
                <td><i class="fas fa-wine-glass text-success"></i> Vidro</td>
                <td>Garrafas e potes limpos</td>
                <td>R$ 0,25</td>
              </tr>
              <tr>
                <td><i class="fas fa-microchip text-secondary"></i> Eletrônicos</td>
                <td>Cabos, placas e componentes</td>
                <td>R$ 3,20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="small text-muted text-center mt-3">*Valores meramente ilustrativos. Consulte sua cooperativa local para preços reais.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
`;

// Adiciona o modal ao corpo da página
document.body.insertAdjacentHTML("beforeend", modalHTML);

// Pega o botão e adiciona evento para abrir o modal
const btnTabela = document.getElementById("btn-tabela-precos");
if (btnTabela) {
    btnTabela.addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.getElementById("modalTabelaPrecos"));
        modal.show();
    });
}

const _signature = "João Pedro H. Ganacim 2025";

console.log("Código desenvolvido por João Pedro H. Ganacim");



