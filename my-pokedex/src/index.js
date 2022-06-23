const BASE_URL = 'https://pokeapi.co/'
window.addEventListener('DOMContentLoaded', () => {

})
// DOM selection
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');

// console.log(pokeId);
const pokeTypes = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock', 
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
];

// Functions
const resetMainScreen = () => {
    mainScreen.classList.remove('default');
    for (const type of pokeTypes) {
        // console.log(type)
        mainScreen.classList.remove(type);
    }
}
const capFirstLetter = (str) => str[0].toUpperCase() + str.substr(1);


fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        resetMainScreen();
        // console.log(dataTypes);
        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = capFirstLetter(dataFirstType['type']['name']);
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('default');
            pokeTypeTwo.textContent = capFirstLetter(dataSecondType['type']['name']);
        } else {
            pokeTypeTwo.classList.add('default');
            pokeTypeTwo.textContent = '';
        }
        mainScreen.classList.add(dataFirstType['type']['name']);
        pokeName.textContent = capFirstLetter(data['name']);
        pokeId.textContent = "No." + data['id'];
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];
        pokeFrontImage.src = data['sprites']['front_default'] || '';

    });
