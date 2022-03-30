const express = require("express");
const bodyParser = require("body-parser");

 
// File system

const app = express();
const port = 8080;

app.use(express.static("./"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.sendFile("./index.html", { root: __dirname});
});


app.post("/url", (req, res) => {
    getText(req.body.url);
    lang_code = req.body.lang;
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


 
async function getText(url) {
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
    // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

    // Performs text detection on the gcs file
    const [result] = await client.textDetection(url);
    console.log(url);
    const detections = result.textAnnotations;
    console.log('Text:');
    console.log(detections[0].description);
    //detections.forEach(text => console.log(text));

}