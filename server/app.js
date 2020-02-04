const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const axios = require('axios');

const app = express();
const port = 8080;
const appID = "devportal-demo-20180625";
const appCode = "9v2BkviRwi9Ot26kp2IysQ";

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/weather', async (req, res) => {
    const { zipCode } = req.query;
    axios.get(`https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&zipcode=${zipCode}&oneobservation=true&app_id=${appID}&app_code=${appCode}`)
        .then(resp => {
            // console.log(resp.data);
            res.send(resp.data);
        }).catch(err => {
            console.log("Error: " + err.message);
        });
});
// app.get('/vikas', ()=> {})
app.get('/weather/multiple_city', async (req, res) => {
    const { zipCodeList = [10025, 23060] } = req.query;
    let apiPromiseList = zipCodeList.map((zipCode) => {
        return axios.get(`https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&zipcode=${zipCode}&oneobservation=true&app_id=${appID}&app_code=${appCode}`)
    });
    // console.log("apiPromiseList:===", apiPromiseList)
    axios.all(apiPromiseList)
        .then((apiResponseList) => {
            // console.log(apiResponseList);
            res.send(apiResponseList);
        })
});

app.listen(port, () => console.log(`listening on port ${port}!`));
