
/***
 * author: Tushar Bochare
 * Email: mytusshar@gmail.com
 */

// buttons 
var buttonSubmit;
const SERVER_ADDRESS = "http://localhost:8081/frequentWords";

function hideOrShowBlock(buttonType) {
    var regBlock = document.getElementById("register-block");
    var loginBlock = document.getElementById("login-block");

    if(loginBlock.style.display !== "block" && buttonType == LOGIN) {
        loginBlock.style.display = "block";
        regBlock.style.display = "none";
    } 
    else if(regBlock.style.display !== "block" && buttonType == REGISTER) {
        regBlock.style.display = "block";
        loginBlock.style.display = "none";
    }
}


window.onload = function() {
    /******* facebook buttons *******/
    buttonSubmit = document.getElementById("button-submit");
    buttonSubmit.addEventListener("click", submitFunction);
}

function submitFunction() {
    var url = getFormData();

    if(url) {
        console.log(url);
        serverInteraction(url);
    }
    
}

function getFormData() {
    var inputNumber = document.getElementById("input-number").value.trim();
    var errorNumber = document.getElementById("error-input");

    var data = {isValid: false};

    if(inputNumber == "") {
        errorNumber.innerHTML = "Enter Number!";
        errorNumber.style.display = "block";
    } else if(isNaN(inputNumber)) {
        errorNumber.innerHTML = "Enter Valid Number!";
        errorNumber.style.display = "block";
    } else {
        errorNumber.style.display = "none";
        return SERVER_ADDRESS + "?" + "number=" + inputNumber;
    }
    return;
}

function serverInteraction(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log("server response: ", data);
    })
    .catch((err) => console.log(err))
}