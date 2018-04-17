
/***
 * author: Tushar Bochare
 * Email: mytusshar@gmail.com
 */

// buttons 
var buttonSubmit;
const SERVER_ADDRESS = "http://localhost:8081/frequentWords";

const NUMBER_WITHIN_LIMIT = 1;
const NUBMER_OUTOF_LIMIT = 0;

window.onload = function() {
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

    if(inputNumber == "") {
        errorNumber.innerHTML = "Enter Number!";
        errorNumber.style.display = "block";
    } else if(isNaN(inputNumber)) {
        errorNumber.innerHTML = "Enter Valid Number!";
        errorNumber.style.display = "block";
    } else if(inputNumber <= 0) {
        errorNumber.innerHTML = "Enter Number Grater than 0!";
        errorNumber.style.display = "block";
    }  
    else {
        errorNumber.style.display = "none";
        return SERVER_ADDRESS + "?" + "number=" + inputNumber;
    }
    return;
}

function serverInteraction(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        showResult(data);

    })
    .catch((err) => console.log(err))
}

function showResult(data) {
    data = data.output;
    var resultString = document.getElementById("result-string");
    var resultTable = document.getElementById("result-table");
    var resultBlock = document.getElementById("result-block");

    resultBlock.style.display = "block";

    if(data.status == NUBMER_OUTOF_LIMIT) {
        resultString.innerHTML = data.name + ".<br>" + "Total Unique Words = " + data.total;
        resultString.style.display = "block";
        resultTable.style.display = "none";
    } else {
        deleteRows(resultTable);
        var length = data.number;
        for(var i=0; i<length; i++) {
            var row = resultTable.insertRow(resultTable.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = data[i].name;
            cell2.innerHTML = data[i].total;
        }
        resultString.style.display = "none";
        resultTable.style.display = "table";
    }
}

function deleteRows(table) {
    var rowCount = table.rows.length;

    for (var x=rowCount-1; x>0; x--) {
        table.deleteRow(x);
    }
}