//Objects with calibers as properties and prices per round of ammo as values. They are passed to the calculate functions

const pistol = {".22 LR": 0.1, ".357 Mag": 1, "9 mm": 0.38, "38 Spl": 0.5, ".45 ACP": 0.5};
const pistolSpecialty = {"": "", ".380": 0.4, "10 mm": 0.6, "40 S&W": 0.35, ".357 Sig": 1.5};

const rifle = {".223": 0.5, "5.56 NATO": 0.7, "6.5 Creedmoor": 1.4, "7.62 x 39": 0.4, "50 cal": 5};
const rifleSpecialty = {"": "", ".300 Win": 3, ".300 BLK": 0.9, ".308 Win": 0.85, "30-06": 1.4, "30-30": 1.4};

const shotgun = {"10 ga": 2, "12 ga": 0.42, "16 ga": 0.8, "20 ga": 0.6, "28 ga": 0.9};
const shotgunSpecialty = {"": "", "4 ga": 3, "410 ga": 0.65};


//User input text box

var getAmount = document.getElementById("dollarAmount");


//Main title on the page (Rounds of Ammo)

var title = document.getElementById("calcTitle");


//Span elements of the last output box (Specialty)

var getRound_spec = document.getElementById("round_spec");
var spec = document.getElementById("spec");
var getCaliber_spec = document.getElementById("caliber_spec");

var dropDown = document.getElementsByTagName("select");


//Weapon type selection buttons

var getPistol = document.getElementById("pistol");
var getRifle = document.getElementById("rifle");
var getShotgun = document.getElementById("shotgun");
var getSpecialty = document.querySelector("select"); 


//Default values on page load 

getAmount.value = 0; 
selectPistol(); 
calculate(pistol); 
populateDropDown(pistolSpecialty); 


//Weapon type global variable passed to the calculate function to do the calculation by weapon type. The variable is assigned 
//value in the selectPistol, selectRifle and selectShotgun functions, which are set as click events to the weapon type buttons

var weaponSelected = pistol;


//Performs calculation on input in the text box

getAmount.addEventListener("input", () => {calculate(weaponSelected);}); 


//Decreases the font size of the output numbers based on the length of user input, which prevents the output getting out of the 
//element area if the user enters an extremely large number. 

getAmount.addEventListener("input", responsiveDigits);
getAmount.addEventListener("input", calculateSpecialty);
getAmount.addEventListener("input", validation);

//Removes nonnumerical values from the user input

function validation(){
    var userInput = getAmount.value; 
    var lastCharacter = userInput.substring(userInput.length - 1);
    
    if(isNaN(lastCharacter)) getAmount.value = userInput.replace(lastCharacter, "");     
}

//Functions that handle the stylisation of the weapon buttons when selected and clear the specialty dropdown

function selectPistol(){
    getPistol.classList.remove("weaponButtons");
    getPistol.classList.add("buttonSelected");

    getRifle.classList.remove("buttonSelected");
    getRifle.classList.add("weaponButtons");

    getShotgun.classList.remove("buttonSelected");
    getShotgun.classList.add("weaponButtons");

    title.innerHTML = "Rounds of Ammo for $ - Pistol";

    weaponSelected = pistol;
    calculate(pistol);
    clear();
}
function selectRifle(){
    this.classList.remove("weaponButtons");
    this.classList.add("buttonSelected");

    getPistol.classList.remove("buttonSelected");
    getPistol.classList.add("weaponButtons");

    getShotgun.classList.remove("buttonSelected");
    getShotgun.classList.add("weaponButtons");

    title.innerHTML = "Rounds of Ammo for $ - Rifle";

    weaponSelected = rifle;
    calculate(rifle);
    clear();
}
function selectShotgun(){
    this.classList.remove("weaponButtons");
    this.classList.add("buttonSelected");

    getPistol.classList.remove("buttonSelected");
    getPistol.classList.add("weaponButtons");

    getRifle.classList.remove("buttonSelected");
    getRifle.classList.add("weaponButtons");

    title.innerHTML = "Rounds of Ammo - Shotgun";

    weaponSelected = shotgun;
    calculate(shotgun); 
    clear();
}

//Click events on the weapon type buttons 

getPistol.addEventListener("click", selectPistol);
getRifle.addEventListener("click", selectRifle);
getShotgun.addEventListener("click", selectShotgun); 


//Performs the calculateion of the amount of ammo for the amount currently entered into the text box when 
//clicked on a weapon type button

getPistol.addEventListener("click", () => {calculate(pistol);});
getRifle.addEventListener("click", () => {calculate(rifle);});
getShotgun.addEventListener("click", () => {calculate(shotgun);}); 


//Populates the drop down menu based on the selected weapon type

getPistol.addEventListener("click", () => {populateDropDown(pistolSpecialty);});
getRifle.addEventListener("click", () => {populateDropDown(rifleSpecialty);});
getShotgun.addEventListener("click", () => {populateDropDown(shotgunSpecialty);});

//Calculates the amount for specialty calibers for each weapon type

dropDown[0].addEventListener("change", () => {calculateSpecialty();});

//Sets the drop down menu to index -1 and changes the border color of the text box from red to black when focused
//getAmount.addEventListener("click", clear);


//Calculates the number of ammo rounds for the weapon type passed as the parameter and sets the title according to 
//the selected weapon type

function calculate(weapon){
    
    var weaponType = "";

    if(weapon == pistol){
        weaponType = "Pistol";
   }else if(weapon == rifle){
        weaponType = "Rifle";
   }else if(weapon == shotgun){
        weaponType = "Shotgun"; 
   }

    var amount = parseInt(getAmount.value.trim());

    var getRounds = document.getElementsByClassName("rounds");
    var getCalibers = document.getElementsByClassName("caliber");
    var getRoundsOf = document.getElementsByClassName("rounds_of");
        

    const rounds = [];
    for(var i = 0; i < Object.keys(weapon).length; i++){
        rounds.push(Math.round(amount / Object.values(weapon)[i]));
    }
    for(var i = 0; i < Object.keys(weapon).length; i++){
        if(!isNaN(amount)){
            getCalibers[i].innerHTML = Object.keys(weapon)[i];
            getRounds[i].innerHTML = rounds[i];
            getRoundsOf[i].innerHTML = "rounds of";            
            title.innerHTML = "Rounds of Ammo - " + weaponType;
            getAmount.style.border = "solid black 2px"; 
        }else{
            clear();
            getRounds[i].innerHTML = "0";
            getAmount.style.border = "solid red 2px";
            title.innerHTML = "Please enter a dollar amount";
        }
    }
}

//Calculates the number of rounds for dollar amount for special calibers. Assigned to the select element as an onchange event. 

function calculateSpecialty(){
        
    var amount = parseInt(getAmount.value);
    if(dropDown.value != ""){
        if(!isNaN(amount)){
            switch(weaponSelected){
                case pistol:
                    getRound_spec.innerHTML = Math.round(amount / pistolSpecialty[dropDown[0].value]);
                    break;
                case rifle:
                    getRound_spec.innerHTML = Math.round(amount / rifleSpecialty[dropDown[0].value]);
                    break;
                case shotgun:
                    getRound_spec.innerHTML = Math.round(amount / shotgunSpecialty[dropDown[0].value]);
                    break;
            }
            
            spec.innerHTML = "rounds of"; 
            getCaliber_spec.innerHTML = dropDown[0].value;
            
        }
    }
    if(getRound_spec.innerHTML == "Infinity") getRound_spec.innerHTML = "0"; 
        
}

//Populates the dropdown menu based on the selected weapon type

function populateDropDown(sp){
    
    dropDown[0].options.length = 0;

    for(var i = 0; i < Object.keys(sp).length; i++){
        var option = document.createElement("option");
        var specialty = Object.keys(sp)[i];

        option.textContent = specialty;
        option.value = specialty;
        dropDown[0].appendChild(option); 
    }
}

//Clears the Specialty output field when clicked on a weapon type button and on page load.

clear(); 

function clear(){
    getRound_spec.innerHTML = "";
    spec.innerHTML = "Specialty";
    getCaliber_spec.innerHTML = "";

    getAmount.style.border = "solid black 2px";
}
 
//Adjusts the font size of the output numbers to prevent the number from breaking out of the parent element if 
//the user enters a very large number

function responsiveDigits(){
    let getRnds = document.getElementsByClassName("rounds");
    for(var j = 0; j < getRnds.length; j++){
        if(getAmount.value.length > 7){
            getRnds[j].style.fontSize = "200%";
        }else{
            getRnds[j].style.fontSize = "350%";
        }

        if(getAmount.value.length > 11){
            getRnds[j].style.fontSize = "150%";
        }
    }
}

