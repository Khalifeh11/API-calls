

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
    console.log(data)
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
        throw "Gender ERROR"
    }
    
}



async function addAge() {
    try{
        const response = await fetch(`https://api.agify.io/?name=${nameInput.value}`);
        const data = await response.json();
        console.log(data)
        if (!data.age){
            age.textContent = "No age found";
        }else{
            age.textContent = "Age: " + `${data.age}`
        }
        return data
    }
    catch(error){
        console.log("ERROR: ", error)
        throw "Age ERROR"
    }
   
}

const countryName = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );


const flagDiv = document.querySelector(".flag-div")
async function addNationality() {
    try{
        const response = await fetch(`https://api.nationalize.io/?name=${nameInput.value}`);
        const data = await response.json();
        console.log(data)
        while(flagDiv.firstChild){
            flagDiv.removeChild(flagDiv.firstChild)
        }
        for (let i = 0; i < data.country.length; i++){
            let country_id = data.country[i]["country_id"];
            let caption = document.createElement("FIGCAPTION");
            let flagName = document.createTextNode(countryName.of(country_id));
            caption.appendChild(flagName)
            let lowerCaseId = country_id.toLowerCase();
            const flagIcon = new Image(60,60);
            flagIcon.classList.add("flag-icon");
            flagIcon.src = `./images/flags/${lowerCaseId}.svg`;
            flagDiv.appendChild(flagIcon);
            flagDiv.appendChild(caption);

        }
        if (!flagDiv.firstChild){
            flagDiv.textContent = "Citizen of the world"
        }
        return data
    }catch(error){
        console.log("ERROR: ", error)
        throw "Nationality ERROR"
    }
   
}











