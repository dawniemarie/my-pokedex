window.addEventListener('DOMContentLoaded', () => {
    fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
})

const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const mainScreen = document.querySelector('.main-screen');
const prevBtn = document.querySelector('.left-btn');
const nextBtn = document.querySelector('.right-btn');
const pokeListItems = document.querySelectorAll('.list-item');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeForm = document.getElementById("pokemon-form");

const pokeTypes = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock', 
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
];

let prevUrl = null;
let nextUrl = null;
let pokeCharacters = [];

const capFirstLetter = (str) => str[0].toUpperCase() + str.substr(1);

const resetMainScreen = () => {
    mainScreen.classList.remove('default');
    for (const type of pokeTypes) {
        mainScreen.classList.remove(type);
    }
};

// Asyncronous Request to Server (data for right side of dex screen)
const fetchPokeList = url => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const {previous, next} = data;
        const results = data['results'];
        prevUrl = previous;
        nextUrl = next;
    
        for (let i = 0; i < pokeListItems.length; i++) {
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];
    
            if (resultData) {
                const { name, url } = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length - 2];
                pokeListItem.textContent = id + '. ' + capFirstLetter(name);
              } else {
                pokeListItem.textContent = '';
            }
        }       
    });
        };

const getPokeData = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        resetMainScreen(); 

        const dataTypes = data['types'];
        console.log(data['types'])
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
        pokeId.textContent = '#' + data['id'];
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        });
    };

    const handleNextBtnClick = () => {
        if (nextUrl) {
            fetchPokeList(nextUrl)
        }
    }
    const handlePrevBtnClick = () => {
        if (prevUrl) {
            fetchPokeList (prevUrl)
        }
    }
    const handleListItemClick = (e) => {
        if (!e.target) return;
        
        const listItem = e.target;
        if (!listItem.textContent) return;

        const id = listItem.textContent.split('.')[0];
        getPokeData(id)
    };

    //Event Listeners
    prevBtn.addEventListener('click', handlePrevBtnClick);
    nextBtn.addEventListener('click', handleNextBtnClick);
    for (const pokeListItem of pokeListItems) {
        pokeListItem.addEventListener('click', handleListItemClick);
    }

    pokeForm.addEventListener("submit", (event) => {
        event.preventDefault()
        event.target[0].value
        fetch(`https://pokeapi.co/api/v2/pokemon/${event.target[0].value}`)
        .then(res => res.json())
        .then(data => {
            resetMainScreen(); 
            const dataTypes = data['types'];
            console.log(data['types'])
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
            pokeId.textContent = '#' + data['id'];
            pokeWeight.textContent = data['weight'];
            pokeHeight.textContent = data['height'];
            pokeFrontImage.src = data['sprites']['front_default'] || '';
        })
        pokeForm.reset()
    })
