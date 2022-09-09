//CARDHOLDER NAME
let nameCard = document.querySelector(".card__details-name");
let nameInput = document.querySelector("#cardholder");
let nameErrorDiv = document.querySelector(".form__cardholder--error");

// CARD NUMBER 
let numberCard = document.querySelector(".card__number");
let numberInput = document.querySelector("#cardNumber");
let numberErrorDiv = document.querySelector(".form__inputnumber--error");

// MM
let monthCard = document.querySelector(".card__month");
let monthInput = document.querySelector("#cardMonth");
let monthErrorDiv = document.querySelector(".form__input-mm--error");

//yy
let yearCard = document.querySelector(".card__year");
let yearInput = document.querySelector("#cardYear");
let yearErrorDiv = document.querySelector(".form__input-yy--error");

//cvc
let cvcCard = document.querySelector(".card-back__cvc");
let cvcInput = document.querySelector("#cardCvc");
let cvcErrorDiv = document.querySelector(".form__input-cvc--error");






// INGRESO DINAMICO DEL NOMBRE
nameInput.addEventListener("input" , ()=>{
    if(nameInput.value ==""){
        nameCard.innerText = "JANE APPLESEED"
    }else{
        nameCard.innerText = nameInput.value;
    }
});

// INGRESO DINAMICO DEL Numero
numberInput.addEventListener('input' , event=>{
    let inputValue = event.target.value

    numberCard.innerText = numberInput.value;

    let regExp = /[A-z]/g;
    if(regExp.test(numberInput.value)){
        showError(numberInput, numberErrorDiv, "formato incorrecto, solo números");
    }else{
        numberInput.value = inputValue.replace( /\s/g,  "").replace(/([0-9]{4})/g, "$1 " ).trim();
        hideError( numberInput, numberErrorDiv);
    }
    if (numberInput.value == ""){
        numberCard.innerText = "0000 0000 0000 0000"
    }
});

// ingreso dinamico mm
monthInput.addEventListener("input", ()=>{
    monthCard.innerText = monthInput.value;
    validateletters(monthInput, monthErrorDiv);
});

// ingreso dinamico del yy
yearInput.addEventListener("input", ()=>{
    yearCard.innerText = yearInput.value;
    validateletters(yearInput, yearErrorDiv);
});

//ingreso dinamico del cvc
cvcInput.addEventListener("input", ()=>{
    cvcCard.innerText = cvcInput.value;
    validateletters(cvcInput, cvcErrorDiv);
});




// boton confirmar
let confirmBtn = document.querySelector(".form__submit");

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Secciones Formulario y thanks
let formSection = document.querySelector(".form");
let thanksSection = document.querySelector(".gracias-section");

confirmBtn.addEventListener("click", event=>{
    event.preventDefault();

    //validas nombre
     if (veryfyIsFilled(nameInput, nameErrorDiv)){
        nameValidation = true;
     }else{
        nameValidation = false;
     }

    // validar numero
    if(veryfyIsFilled(numberInput, numberErrorDiv) == true){
        if (numberInput.value.length == 19){
            showError(numberInput, numberErrorDiv, "", false);
            numberValidation = true;
        }else{
            showError(numberInput, numberErrorDiv, "Numero incorrecto");
            numberValidation = false;
        }
    };

    //validar mes
    if (veryfyIsFilled(monthInput, monthErrorDiv)){
            if(parseInt(monthInput.value)>0 && parseInt(monthInput.value)<=12){
            showError(monthInput, monthErrorDiv, "", false);
            monthValidation = true;
    }else{
            showError(monthInput, monthErrorDiv, "mes incorrecto");
             monthValidation = false;
    }
    };

    //validar año
    if (veryfyIsFilled(yearInput, yearErrorDiv)){
        if(parseInt(yearInput.value)> 22 && parseInt(yearInput.value)<=27){
            showError(yearInput, yearErrorDiv, "", false);
            yearValidation = true;
        }else{
            showError(yearInput, yearErrorDiv, "año incorrecto");
            yearValidation = false;
        }
    };

    //validar cvc
    if(veryfyIsFilled(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length == 3){
            showError(cvcInput, cvcErrorDiv, "", false);
            cvcValidation = true;
        }else{
            showError(cvcInput, cvcErrorDiv, "cvc inconrrecto");
            cvcValidation = false;
        }
    }
    if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true){
        formSection.style.display = "none";
        thanksSection.style.display = "block";
    }
});


function showError(divInput, divError, msgError,  show = true){
   if(show){
    divError.innerText = msgError;
    divInput.style.borderColor = "#FF0000";
}else{
    divError.innerText = msgError;
    divInput.style.borderColor = "hsl(270, 3%, 87%)";
}
}
function hideError(divInput, divError){
    divError.innerText = "";
    divInput.style.borderColor = "hsl(270, 3%, 87%)";
}

function veryfyIsFilled(divInput, divError){
    if(divInput.value.length> 0){
        showError(divInput, divError, "", false);
        return true;
    }else{
        showError(divInput, divError, "no puede estar en blanco");
        return false;
    }
}

function validateletters(input, divError){
    // validando que no haya una letra
    let regExp = /[A-z]/g;
    if(regExp.test(input.value)){
        showError(input, divError, "formato incorrecto, solo números");
    }else{
        showError(input, divError, "", false);
    }

}