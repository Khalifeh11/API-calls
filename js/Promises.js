// fetch("https://dog.ceo/api/breeds/image/random")
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data)
//         img.src= data.message;
//     })

// The api for getting the gender is: https://api.genderize.io?name=caline
// The api for getting the age is: https://api.agify.io/?name=joe
// The api for getting the nationality: https://api.nationalize.io/?name=mohamad
// The api for getting the dog images: https://dog.ceo/api/breeds/image/random


const img = document.querySelector('img');
async function getRandomImg ()  {
    try{
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        img.src= data.message;
        return data
    }catch(error){
        console.log("ERROR: ", error)
        throw "ERROR"
    }
    
}
getRandomImg();


const nameInput = document.getElementById('name-input');
const gender = document.querySelector(".gender");
const age = document.querySelector(".age");
const nationality = document.querySelector(".nationality");



document.querySelector('.name-form').addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault()
    addGender();
    addAge();
    addNationality();
    return nameInput.value;    
});

async function addGender() {
    try{
    const response = await fetch(`https://api.genderize.io?name=${nameInput.value}`);
    const data = await response.json();
    let uppercaseGender = data.gender.toUpperCase();
    console.log(data.gender)
    if (!data.gender){
        gender.textContent = "Is that a real name?";
    }else{
        gender.textContent = "Gender: " + `${uppercaseGender}` 
    }
    return data
    }catch(error){
        console.log("ERROR: ", error)
        throw "ERROR"
    }
    
}



async function addAge() {
    try{
        const response = await fetch(`https://api.agify.io/?name=${nameInput.value}`);
        const data = await response.json();
        if (!data.age){
            age.textContent = "No age found";
        }else{
            age.textContent = "Age: " + `${data.age}`
        }
        return data
    }
    catch(error){
        console.log("ERROR: ", error)
        throw "ERROR2"
    }
   
}



const flagDiv = document.querySelector(".flag-div")
async function addNationality() {
    try{
        const response = await fetch(`https://api.nationalize.io/?name=${nameInput.value}`);
        const data = await response.json();
        while(flagDiv.firstChild){
            flagDiv.removeChild(flagDiv.firstChild)
        }
        for (let i = 0; i < data.country.length; i++){
            let country_id = data.country[i]["country_id"];
            let lowerCaseId = country_id.toLowerCase();
            const flagIcon = new Image(60,60);
            flagIcon.classList.add("flag-icon")
            flagIcon.src = `./images/flags/${lowerCaseId}.svg`
            flagDiv.appendChild(flagIcon);
        }
        if (!flagDiv.firstChild){
            flagDiv.textContent = "Citizen of the world"
        }
        return data
    }catch(error){
        console.log("ERROR: ", error)
        throw "ERROR"
    }
   
}











