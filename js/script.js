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

const ctx = document.getElementById('myChart');

window.onload = ()=>{
    drawChart();
    var peticionResetValores= $.ajax({url: "http://localhost/api/resetValores", dataType: 'text', async: false}).responseText;
    console.log(peticionResetValores);
    desactivar();
    //resetValores
};
var dataHistograma = []
var dataTemp = []

var frio = 0;
var medio = 0;
var calor = 0;

function drawChart(){
    var data = {
        data: {
            datasets: [{
                type: 'bar',
                label: 'Temperatura Actual',
                data: [],
                backgroundColor: 'rgba(255,0,0,.5)'
            }, {
                type: 'line',
                label: 'Histograma',
                tension: .3,
                fill: false,
                data: [],
                borderColor : 'rgba(255,0,100,1)',
                backgroundColor: 'rgba(255,0,100,.5)'
            }],
            labels: ['Actual', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15','16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
        },
        options: {
            scales: {
              y: {
                beginAtZero: true,
                max : 100
              }
            }
          }
    };

    var myChart = new Chart(ctx, data);

    setInterval(function(){
        var JSON= $.ajax({url: "http://localhost/api/getInfo", dataType: 'json', async: false}).responseText;
        var Resp=jQuery.parseJSON(JSON);
        var modo = document.getElementById('modo');


        if(Resp.temperatura >= 0 && Resp.temperatura <=30){
            if(frio === 0 && modoValor === "Auto"){
                frio+=1;
                medio = 0;
                calor = 0;
                var peticionDerecha= $.ajax({url: "http://localhost/api/giroDerechaAuto", dataType: 'text', async: false}).responseText;
                console.log(peticionDerecha);
            }
            if(modoValor === 'Manual' && (calor != 0 || medio != 0 || frio != 0)){
                calor = 0;
                medio = 0;
                frio = 0;
                var peticionDerecha= $.ajax({url: "http://localhost/api/stopAuto", dataType: 'text', async: false}).responseText;
                console.log(peticionDerecha);
            }
            data.data.datasets[0].backgroundColor = 'rgba(0,0,255,.5)';
        }
        if(Resp.temperatura > 30 && Resp.temperatura <70){
            if(medio === 0 && modoValor === "Auto"){
                medio+=1;
                frio = 0;
                calor = 0;
                var peticionDerecha= $.ajax({url: "http://localhost/api/stopAuto", dataType: 'text', async: false}).responseText;
                console.log(peticionDerecha);
            }
            if(modoValor === 'Manual' && (calor != 0 || medio != 0 || frio != 0)){
                calor = 0;
                medio = 0;
                frio = 0;
                var peticionDerecha= $.ajax({url: "http://localhost/api/stopAuto", dataType: 'text', async: false}).responseText;
                console.log(peticionDerecha);
            }
            data.data.datasets[0].backgroundColor = 'rgba(0,255,0,.5)';
        }
        if(Resp.temperatura >= 70){
            if(calor === 0 && modoValor === "Auto"){
                calor+=1;
                medio = 0;
                frio = 0;
                var peticionDerecha= $.ajax({url: "http://localhost/api/giroIzquierdaAuto", dataType: 'text', async: false}).responseText;
                console.log(peticionDerecha);
            }
            if(modoValor === 'Manual' && (calor != 0 || medio != 0 || frio != 0)){
                calor = 0;
                medio = 0;
                frio = 0;
                var peticionDerecha= $.ajax({url: "http://localhost/api/stopAuto", dataType: 'text', async: false}).responseText;
                console.log(peticionDerecha);
            }
            data.data.datasets[0].backgroundColor = 'rgba(255,0,0,.5)';
        }


        data.data.datasets[0].data[0] = (Resp.temperatura);
        data.data.datasets[1].data.unshift(Resp.temperatura);

        console.log(data.data.datasets[1].data[0]);
        //console.log(modo.value);
        myChart.update();
    }, 1000);
}