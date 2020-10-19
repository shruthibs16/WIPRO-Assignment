const express = require('express');
const port = 5000;
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());

var data= {};
function changeData(obj){
    if(typeof obj.value == 'string' ){
    if(obj.value.indexOf('{')!=-1){
    let splitData =obj.value.split('{');
    let nestedData = splitData[1].split('}');
    obj.value= splitData[0] + data.referenceData[nestedData[0]] + nestedData[1];
    }
    }else{
        obj.value.map(changeData);
    }     
}

server.post('/change',(req,res) => {
    data = req.body;
    console.log("data.........", data);
    data.payload.value.map(changeData);
    res.status(200).send({TransformedData:data});
})

server.listen(port, (err) => {
    if (err) console.log('Error in starting ther server ', err);
    else console.log(`Server is listening on the port: ${port}`);
})