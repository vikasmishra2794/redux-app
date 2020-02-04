const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');

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
    console.log("Inside of fun", zipCode);
    https.get(`https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&zipcode=${zipCode}&oneobservation=true&app_id=${appID}&app_code=${appCode}`, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
