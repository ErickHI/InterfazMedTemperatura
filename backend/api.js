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
const express = require ('express');
const app = express();

const fs = require('fs');
const path = require('path');
const pathJSON = path.join(__dirname, "valor.json");
//
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/motordb',{
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

const Motor = require('../models/motor');
//
const {SerialPort} = require('serialport');
const {ReadlineParser}= require('@serialport/parser-readline');
const port = new SerialPort({ path: 'COM12', baudRate: 9600 });

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

app.use(express.json());

app.get('/', (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("Node JS APi");
});

app.get('/api/getInfo', async (req,res)=>{
    const data = await fs.readFileSync(pathJSON, "utf-8");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data);
    var prueba = JSON.parse(data);
    /* console.log(prueba.motor); */
    //
    const temperatura = prueba.temperatura;
    const newMotor = new Motor({temperatura});
    await newMotor.save();
    /* res.send('received'); */
});

app.get('/api/giroDerecha', async (req,res)=>{
    //
    const data = await fs.readFileSync(pathJSON, "utf-8");
    //
    res.setHeader('Access-Control-Allow-Origin', '*');
    port.write("D");
    res.send("Giro Exitoso");
//
    var prueba = JSON.parse(data);
    const temperatura = prueba.temperatura;
    const modo = "Manual";
    const accion = "Derecha";
    const newMotor = new Motor({temperatura, modo, accion});
    await newMotor.save();
    console.log(newMotor);
    console.log(prueba.temperatura);
});

app.get('/api/giroIzquierda', async (req,res)=>{
    //
    const data = await fs.readFileSync(pathJSON, "utf-8");
    //
    res.setHeader('Access-Control-Allow-Origin', '*');
    port.write("I");
    res.send("Giro Exitoso");
    //
    var prueba = JSON.parse(data);
    const temperatura = prueba.temperatura;
    const modo = "Manual";
    const accion = "Izquierda";
    const newMotor = new Motor({temperatura, modo, accion});
    await newMotor.save();
    console.log(newMotor);
    console.log(prueba.temperatura);
});

app.get('/api/stop', async (req,res)=>{
    //
    const data = await fs.readFileSync(pathJSON, "utf-8");
    //
    res.setHeader('Access-Control-Allow-Origin', '*');
    port.write("N");
    res.send("Stop Exitoso");
    //
    var prueba = JSON.parse(data);
    const temperatura = prueba.temperatura;
    const modo = "Manual";
    const accion = "Stop";
    const newMotor = new Motor({temperatura, modo, accion});
    await newMotor.save();
    console.log(newMotor);
    console.log(prueba.temperatura);
});

//-------------------AUTO------------------------------------------------
app.get('/api/giroDerechaAuto', async (req,res)=>{
    //
    const data = await fs.readFileSync(pathJSON, "utf-8");
    //
    res.setHeader('Access-Control-Allow-Origin', '*');
    port.write("D");
    res.send("Giro Exitoso");
//
    var prueba = JSON.parse(data);
    const temperatura = prueba.temperatura;
    const modo = "Auto";
    const accion = "Derecha";
    const newMotor = new Motor({temperatura, modo, accion});
    await newMotor.save();
    console.log(newMotor);
    console.log(prueba.temperatura);
});

app.get('/api/giroIzquierdaAuto', async (req,res)=>{
    //
    const data = await fs.readFileSync(pathJSON, "utf-8");
    //
    res.setHeader('Access-Control-Allow-Origin', '*');
    port.write("I");
    res.send("Giro Exitoso");
    //
    var prueba = JSON.parse(data);
    const temperatura = prueba.temperatura;
    const modo = "Auto";
    const accion = "Izquierda";
    const newMotor = new Motor({temperatura, modo, accion});
    await newMotor.save();
    console.log(newMotor);
    console.log(prueba.temperatura);
});

app.get('/api/stopAuto', async (req,res)=>{
    //
    const data = await fs.readFileSync(pathJSON, "utf-8");
    //
    res.setHeader('Access-Control-Allow-Origin', '*');
    port.write("N");
    res.send("Stop Exitoso");
    //
    var prueba = JSON.parse(data);
    const temperatura = prueba.temperatura;
    const modo = "Auto";
    const accion = "Stop";
    const newMotor = new Motor({temperatura, modo, accion});
    await newMotor.save();
    console.log(newMotor);
    console.log(prueba.temperatura);
});
//-----------------------------------------------------------------------

app.get('/api/resetValores', async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    crearArchivo(0);
    res.send("Valores Recargados");
});

function crearArchivo(data){
    fs.writeFileSync("backend/valor.json",
    "{\"temperatura\":" + data + "}",
    (error)=>{
        if(error){
            throw error;
        }
    });
}

const puerto = process.env.port || 80;
app.listen(puerto, ()=> console.log(`Escuchando en el puerto ${puerto}`));

parser.on('data', crearArchivo);