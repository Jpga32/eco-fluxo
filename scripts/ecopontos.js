document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // Lógica de ECOPONTOS e MAPA (Leaflet)
    // ----------------------------------------------------

    const ecopontos = {
        norte: [
            { nome: "Ecoponto Santana – Rua Voluntários da Pátria, 3000", lat: -23.485, lng: -46.625 },
            { nome: "Ecoponto Tucuruvi – Av. Mazzei, 1500", lat: -23.477, lng: -46.603 },
            { nome: "Ecoponto Casa Verde – Rua Zanzibar, 45", lat: -23.510, lng: -46.657 }
        ],
        sul: [
            { nome: "Ecoponto Jabaquara – Rua dos Comerciários, 500", lat: -23.654, lng: -46.642 },
            { nome: "Ecoponto Campo Limpo – Av. Carlos Caldeira Filho, 3400", lat: -23.634, lng: -46.756 },
            { nome: "Ecoponto Capão Redondo – Rua Américo Brasiliense, 789", lat: -23.653, lng: -46.765 }
        ],
        leste: [
            { nome: "Ecoponto Itaquera – Av. Jacu-Pêssego, 900", lat: -23.529, lng: -46.474 },
            { nome: "Ecoponto São Mateus – Rua Juatuba, 125", lat: -23.589, lng: -46.491 },
            { nome: "Ecoponto Tatuapé – Rua Serra de Bragança, 400", lat: -23.544, lng: -46.563 }
        ],
        oeste: [
            { nome: "Ecoponto Lapa – Rua Guaicurus, 150", lat: -23.524, lng: -46.688 },
            { nome: "Ecoponto Pompéia – Rua Caraíbas, 500", lat: -23.532, lng: -46.682 },
            { nome: "Ecoponto Butantã – Av. Eliseu de Almeida, 2500", lat: -23.590, lng: -46.719 }
        ],
        centro: [
            { nome: "Ecoponto Sé – Rua Brigadeiro Tobias, 120", lat: -23.546, lng: -46.633 },
            { nome: "Ecoponto Consolação – Rua da Consolação, 800", lat: -23.555, lng: -46.657 },
            { nome: "Ecoponto Liberdade – Rua Galvão Bueno, 350", lat: -23.559, lng: -46.635 }
        ]
    };

    const mapaContainer = document.getElementById("mapaEcopontos");
    const zonaSelect = document.getElementById("zonaSelect");
    const listaContainer = document.getElementById("listaEcopontos");

    // Inicializa o mapa SOMENTE se os elementos existirem (só na index.html)
    if (mapaContainer && typeof L !== 'undefined') {
        const mapa = L.map("mapaEcopontos").setView([-23.55, -46.63], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        }).addTo(mapa);

        let marcadores = [];

        if (zonaSelect) {
            zonaSelect.addEventListener("change", function () {
                const zona = this.value;
                const locais = ecopontos[zona];

                if (!locais) return;

                // Atualiza lista
                listaContainer.innerHTML = `
                    <h5 class="text-success fw-bold mb-3 text-center">Ecopontos da ${zona.charAt(0).toUpperCase() + zona.slice(1)}</h5>
                    <ul class="list-group list-group-flush text-start">
                        ${locais.map(local => `<li class="list-group-item">${local.nome}</li>`).join("")}
                    </ul>
                `;

                // Remove marcadores antigos
                marcadores.forEach(m => mapa.removeLayer(m));
                marcadores = [];

                // Adiciona novos marcadores
                locais.forEach(local => {
                    const marker = L.marker([local.lat, local.lng]).addTo(mapa).bindPopup(`<b>${local.nome}</b>`);
                    marcadores.push(marker);
                });

                // Centraliza no grupo de marcadores
                const grupo = L.featureGroup(marcadores);
                mapa.fitBounds(grupo.getBounds(), { padding: [30, 30] });
            });
        }
    }

    // console.log("Scripts de Ecopontos Carregados.");
});