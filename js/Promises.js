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
        throw "ERROR2"
    }
    
}
getRandomImg();


var nameInput = document.getElementById('name');
var gender = document.querySelector(".gender");
var age = document.querySelector(".age");
var nationality = document.querySelector(".nationality");


document.querySelector('.name-form').addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault()
    getAge();
    getNationality();
    getGender();
    return nameInput.value;    
});

async function getGender() {
    const response = await fetch(`https://api.genderize.io?name=${nameInput.value}`);
    const data = await response.json();
    gender.textContent = "gender " + `${data.gender}` 
    return data
}



async function getAge() {
    const response = await fetch(`https://api.agify.io/?name=${nameInput.value}`);
    const data = await response.json();
    age.textContent = "age " + `${data.age}`
    return data
}


async function getNationality() {
    const response = await fetch(`https://api.nationalize.io/?name=${nameInput.value}`);
    const data = await response.json();
    // data.forEach(element => {
    //     console.log(data.country[element]["country_id"])
    // });
    console.log(data.country);
    for (let i = 0; i < data.country.length; i++){
        const textNode = document.createTextNode(`${ " " + data.country[i]["country_id"] + " "}`);
        nationality.appendChild(textNode);
    }
    return data
}







