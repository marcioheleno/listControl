/**
 * Created by marcioheleno on 29/06/16.
 */
'use strict';

var list = [
  {"desc":"rice", "amount":"1", "value":"5.40"},
  {"desc":"beer", "amount":"12", "value":"1.99"},
  {"desc":"meat", "amount":"1", "value":"15.00"}
];

function getTotal(list) {
  var total = 0;
  for(var key in list) {
    total += list[key].value * list[key].amount;
    //todo depuração
    console.log(list[key].desc);
  }
  document.getElementById("totalValue").innerHTML = formatValue(total);
}

// todo adiciona a lista
function setList(list) {
  var table = "<thead>" +
    "<tr>" +
    "<td>Description</td>" +
    "<td>Amount</td>" +
    "<td>Value</td>" +
    "<td>Action</td>" +
    "</tr>" +
    "</thead>" +
    "<tbody>";
  for (var key in list) {
    table += "<tr>" +
      "<td>"+ formatDesc(list[key].desc) +"</td>" +
      "<td>"+ formatAmount(list[key].amount) +"</td>" +
      "<td>"+ formatValue(list[key].value) +"</td>" +
      "<td>"  +
      "<button class='btn btn-info' onclick='setUpdate("+ key +");'>Edit</button> " +
      "<button class='btn btn-danger' onclick='deleteData("+ key +");'>Delete</button>" +
      "</td>" +
      "</tr>"
  }
  table += "</tbody>";
  document.getElementById("listTable").innerHTML = table;
  getTotal(list);
  saveListStorage(list);
}

// formatando a descrição
function formatDesc(desc) {
  var stringDesc = desc.toLowerCase(); // => transformara tudo em minusculo
  stringDesc = stringDesc.charAt(0).toUpperCase() + stringDesc.slice(1);
  //todo =>charArt === pega o primeiro caracter da string
  //todo =>toUpperCasa === Transforma em letra maiuscula
  //todo =>slice(1) === pega o array apartir do idice 1
  return stringDesc;
}

// Formatando a entrada de dados || quantidade
function formatAmount(amount) {
  return parseInt(amount)
}

// formatando o valor
function formatValue(value) {
  var stringValue = parseFloat(value).toFixed(2) + "";
  stringValue = stringValue.replace(".", ",");
  stringValue = "$ " + stringValue;
  return stringValue;

}

function addData() {
  if (!validation()) {
    return;
  }
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  list.unshift({"desc":desc, "amount":amount, "value":value});

  setList(list);
}

function setUpdate(id) {
  var obj = list[id];
  document.getElementById("desc").value = obj.desc;
  document.getElementById("amount").value = obj.amount;
  document.getElementById("value").value = obj.value;
  document.getElementById("btnUpdate").style.display = "inline-block";
  document.getElementById("btnAdd").style.display = "none";

  document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+ id +'">';
}


function resetForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("value").value = "";
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "inline-block";

  document.getElementById("inputIDUpdate").innerHTML = "";
  document.getElementById("errors").style.display ="none";
}

function updateData() {
  if (!validation()) {
    return;
  }
  var id = document.getElementById("idUpdate").value;
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  list[id] = {"desc":desc, "amount":amount, "value":value};
  resetForm();
  setList(list);

}

// Deletando os registros
function deleteData(id) {
  if (confirm("Delete this item?")) {
    if(id === list.length - 1) {
      list.pop();
    }else if (id === 0) {
      list.shift();
    } else {
      var arrAuxIni = list.slice(0, id);
      var arrAuxEnd = list.slice(id + 1);
      list = arrAuxIni.concat(arrAuxEnd);
    }
    setList(list);
  }
}

function validation() {
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;
  var errors = "";
  document.getElementById("errors").style.display ="none";

  //todo teste de validação
  if (desc === ""){
    errors += "<p>Fill out description</p>";
  }
  if (amount === "") {
    errors += "<p>Fill out a quantity</p>";
  } else if (amount != parseInt(amount)) {
    errors += "<p>Fill out a valid amount</p>";
  }

  if (value === "") {
    errors += "<p>Fill out a value</p>";
  } else if (value != parseFloat(value)) {
    errors += "<p>Fill out a valid value</p>";
  }

  if(errors != "") {
    document.getElementById("errors").style.display ="block";
    document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
    document.getElementById("errors").style.color = "white";
    document.getElementById("errors").style.padding = "10px";
    document.getElementById("errors").style.margin = "10px";
    document.getElementById("errors").style.borderRadius = "13px";
    document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
    return 0;
  } else {
    return 1;
  }

}

// todo deleteList
function deleteList() {
  if (confirm("Delete this list?")) {
    list = [];
    setList(list);
  }
}


// todo salvando no localStorage
function saveListStorage(list) {
  var jsonStr = JSON.stringify(list);
  localStorage.setItem("list", jsonStr);
}

// todo iniciando o programa
function initListStorage() {
  var testList = localStorage.getItem("list");
  if (testList) {
    list = JSON.parse(testList);
  }
  setList(list);
}

// todo iniciando
initListStorage();

//todo ativando||chamando as funções
//setList(list);

//depurado
console.log(getTotal(list));

