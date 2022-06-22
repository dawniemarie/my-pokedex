const BASE_URL = 'https://pokeapi.co/'
window.addEventListener('DOMContentLoaded', () => {

})

const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');

console.log(pokeId);

fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        mainScreen.classList.remove('default');
        pokeName.textContent = data['name'];
        pokeId.textContent = data['id'];
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

        const dataTypes = data['types'];
        pokeTypeOne.textContent = dataTypes[0]['type']['name'];
        // console.log(dataTypes);
    });