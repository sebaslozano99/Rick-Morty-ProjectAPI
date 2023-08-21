const body = document.querySelector("body");
const modeBtn = document.querySelector(".mode"); //mode btn
const gridContainer = document.querySelector(".grid");
const beforeBtn = document.getElementById("beforeBtn");
const afterBtn = document.getElementById("afterBtn");
const searchInput = document.querySelector("#searchInput");
let json = [];


modeBtn.addEventListener("click", () =>{
    if(body.classList.contains("active")){
        body.classList.remove("active");
    }
    else{
        body.classList.add("active");
    }
})





let pageCounter = 1;
getCharacters(pageCounter);
async function getCharacters(counter){ 
    try{
        // const URL_API = `https://rickandmortyapi.com/api/character/?page=${counter}`;

        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${counter}`);
        json = await response.json();
        json = json.results;
        console.log(json);
        displayCharacters(json);
    }
    catch(error){
        console.log(error);
    }
}

function displayCharacters(array){
    let html = "";

    array.forEach(character => {
        let htmlSegment = `<div class="mini-container">
                                <h3 class="charactersName">${character.name}</h3>

                                <div class="separator">
                                    <img class="charactersImage" src="${character.image}" alt="rick">

                                    <p>
                                        Status: ${character.status} <br>
                                        Species: ${character.species}<br>
                                        gender: ${character.gender}
                                    </p>
                                </div>
                            </div>`;

        html += htmlSegment;
    })

    gridContainer.innerHTML = html;
}

searchInput.addEventListener("input", (e) => {
    let userInputed = e.target.value;
    userInputed = userInputed.toLowerCase();
    console.log(userInputed);

    let filteredCharacters = json.filter(element => { //in a new variable which is an array, we push each character in the api that includes any of the userInput 
        return element.name.toLowerCase().includes(userInputed)
        
    });

    displayCharacters(filteredCharacters); //We display on the Grid container the filteredCharacters
    console.log(filteredCharacters);
})





afterBtn.addEventListener("click", () => { //The URL has the api that changes the list
    pageCounter += 1; //by default the API's page is on 1 -- by each click to the after btn, it increases it
    console.log(pageCounter);
    getCharacters(pageCounter); //we get the characters from the next page
    gridContainer.scrollIntoView(); //automated scroll to the beginning of the gridContainer
})

beforeBtn.addEventListener("click", () => {
    if(pageCounter > 0){
        pageCounter -= 1;
        console.log(pageCounter);
        getCharacters(pageCounter);
        gridContainer.scrollIntoView();
    }
    
})
