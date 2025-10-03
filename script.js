const imgElemento = document.getElementById('imagem-bichinho');
const btnCao = document.getElementById('btn-gerar-cao');
const btnGato = document.getElementById('btn-gerar-gato');

// 2. FUNÇÃO PRINCIPAL: Lógica de Requisição da API
/**
 * Busca uma imagem aleatória de cão ou gato da respectiva API.
 * @param {string} tipo - 'cao' ou 'gato'
 */
async function buscarImagem(tipo) {
    let urlAPI = '';
    
    // DEFININDO A URL DA API com base no tipo
    if (tipo === 'cao') {
        // Endpoint da Dog API para uma imagem aleatória
        urlAPI = 'https://dog.ceo/api/breeds/image/random';
    } else if (tipo === 'gato') {
        // Endpoint da Cat API para uma imagem aleatória
        urlAPI = 'https://api.thecatapi.com/v1/images/search';

    } else {
        console.error("Tipo de animal inválido.");
        return; // Sai da função se o tipo for inválido
    }

    // FAZENDO A REQUISIÇÃO E MANIPULANDO A RESPOSTA
    try {
        // Requisição GET para a API
        const resposta = await fetch(urlAPI);
        
        // Convertendo a resposta em formato JSON
        const dados = await resposta.json();
        
        let urlImagem = '';

        // EXTRAINDO O URL DA IMAGEM
        if (tipo === 'cao') {
            // A Dog API retorna um objeto onde a URL está em 'message'
            urlImagem = dados.message;
        } else if (tipo === 'gato') {
            // A Cat API retorna um array, e a URL está no primeiro item [0].url
            urlImagem = dados[0].url;
        }

        // ATUALIZANDO O HTML
        // Setamos o atributo 'src' da tag <img> para o URL que veio da API
        imgElemento.src = urlImagem;
        imgElemento.alt = `Imagem de ${tipo} gerada aleatoriamente!`;

    } catch (erro) {
        // Tratamento de erro caso a requisição falhe (ex: sem internet, API fora do ar)
        console.error(`Ocorreu um erro ao buscar a imagem de ${tipo}:`, erro);
        imgElemento.src = 'dogerro.png';
        imgElemento.alt = "Erro ao carregar a imagem. Tente novamente.";
    }
}

// 3. LISTENERS DE EVENTOS
// Quando o botão de Cão é clicado, chama a função buscarImagem com 'cao'
btnCao.addEventListener('click', () => {
    buscarImagem('cao');
});

// Quando o botão de Gato é clicado, chama a função buscarImagem com 'gato'
btnGato.addEventListener('click', () => {
    buscarImagem('gato');
});