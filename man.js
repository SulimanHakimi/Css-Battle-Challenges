
let button = document.querySelector(".button");
let input = document.querySelector(".input");
let languages = document.querySelector(".languages");
let countryesArr;
try {
  countryesArr = JSON.parse(localStorage.country) || [];
} catch (error) {
  console.error(error);
  countryesArr = [];
}

function addCountry() {
  const countryName = input.value; // Replace with the name of the country you want to look up

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((country) => {
      let newCountry = {
        officialName: country[0].name.official,
        capital: country[0].capital[0],
        flag: country[0].flags.png,
        currency: Object.keys(country[0].currencies)[0],
        languages: country[0].languages,
        population: country[0].population,
        continent: country[0].region,
      };
      countryesArr.push(newCountry);
      localStorage.setItem("country", JSON.stringify(countryesArr));
      clearInput();
      readData();
    })
    .catch((error) => console.error(error));
  localStorage.clear();
}

//clear input
function clearInput() {
  input.value = "";
  input.focus();
}

//read
function readData() {
  let card = "";
  for (let i = 0; countryesArr.length; i++) {
    card += `
    
        <div class="card">
            <h2>${countryesArr[i].officialName}</h2>
            <div class="flag">
              <img src="${countryesArr[i].flag}">
            </div>
            <p><strong>Capital:</strong> ${countryesArr[i].capital}</p>
            <p><strong>Currency:</strong> ${countryesArr[i].currency}</p>
            <p><strong>Languages:</strong> ${Object.keys(
              countryesArr[i].languages
            )
              .map(
                (key, index) =>
                  `${index + 1}: ${countryesArr[i].languages[key]}`
              )
              .join(", ")}</p>
            <p><strong>Population:</strong> ${countryesArr[i].population}</p>
            <p><strong>Continent:</strong> ${countryesArr[i].continent}</p>
    
            <div class="threeDots">
                <ul class="ul none">
                    <li onclick=deleteItem(${i})>delete</li>
                    <li>details</li>
                </ul>
                 <button class="optionButton" onclick=showMenu(event)>:</button> 
            </div>
        </div>
    
        `;
    let content = document.querySelector(".content");
    content.innerHTML = card;
  }
}
//delete item
function deleteItem(i) {
  countryesArr.splice(i, 1);
  localStorage.country = JSON.stringify(countryesArr);
  readData();
}

//show menu
function showMenu(event) {
    let ul = event.target.previousElementSibling;
    
    if (ul.classList.contains("none")) {
        ul.classList.remove("none");
        ul.classList.add("block");
    } else {
        ul.classList.remove("block");
        ul.classList.add("none");
    }
}
