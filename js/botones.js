/*
 Tecnológico Nacional de México
 Instituto Tecnológico de Pachuca
 Sistemas Programables
 Equipo 4:
  Hernández Islas Erick
  Herrera Pérez Roberto
  Salazar Reyes Ricardo Axel
 Docente: Ing. Miguel Ángel Acosta Jiménez
*/

const btnIzquierda = document.getElementById('btnIzquierda');
const btnDerecha = document.getElementById('btnDerecha');
const btnStop = document.getElementById('btnStop');

const flexRadioDefault1 = document.getElementById('flexRadioDefault1');
const flexRadioDefault2 = document.getElementById('flexRadioDefault2');

var modoValor = "Auto";

btnDerecha.addEventListener("click", function(){
    var peticionDerecha= $.ajax({url: "http://localhost/api/giroDerecha", dataType: 'text', async: false}).responseText;
    console.log(peticionDerecha);
});

btnIzquierda.addEventListener("click", function(){
    var peticionIzquierda= $.ajax({url: "http://localhost/api/giroIzquierda", dataType: 'text', async: false}).responseText;
    console.log(peticionIzquierda);
});

btnStop.addEventListener("click", function(){
    var peticionReset= $.ajax({url: "http://localhost/api/stop", dataType: 'text', async: false}).responseText;
    console.log(peticionReset);
});

flexRadioDefault1.addEventListener("change", function(){
    desactivar();
});
flexRadioDefault2.addEventListener("change", function(){
    activar();
});

function activar(){
    modoValor = "Manual";
    btnIzquierda.disabled = false;
    btnDerecha.disabled = false;
    btnStop.disabled = false;
}

function desactivar(){
    modoValor = "Auto";
    btnIzquierda.disabled = true;
    btnDerecha.disabled = true;
    btnStop.disabled = true;
}