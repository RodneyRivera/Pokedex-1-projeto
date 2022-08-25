const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // Extrair os dados em json
   
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';


    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites'] ['versions'] ['generation-v'] ['black-white'] ['animated'] ['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

    //Quando digitar um nome errado ele aparece um erro no console log, para correção fazer



//const fucnasda = () => {}

form.addEventListener('submit', (event) => {

    event.preventDefault();


    //console.log('Enviando formulario...')
    //console.log(input.value)
    // Se você digitar Pikachu com a primeira letra Maiuscula ele não encontra, pois o nome está errado
    //então usar o toLowerCase ele automaticamente faz a buscar com as letras minusculas

    //renderPokemon(input.value.toLowerCase()); o Correto é usar a função onde pesquisa o pokemon  fetchPokemon
    //no final vimos que ter o toLowerCase la no fetch causou um erro, então voltamos aqui para o render

    renderPokemon(input.value.toLowerCase())


    //podemos usar o input.value na função que renderiza a tela
    //input.value = '';

});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
}
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);