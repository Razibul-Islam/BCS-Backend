// bcs-pioneer-main-site-db
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://bcs-pioneer-main-site-db:bcs-pioneer-main-site-db@cluster0.aemhrq9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const PDFCollection = client.db("test").collection("PDF");
const VideoRutinCollection = client.db("test").collection("VideoRutin");



async function run() {
    

    try{

        // study video section 
        app.post('/add-video-rutine' , async (req, res)=>{
            const data = req.body;
            const result = await VideoRutinCollection.insertOne(data);
            res.send(result);
        });

        app.get('/get-video-rutin', async (req, res)=>{
            const query = {};
            const result = await VideoRutinCollection.find(query).toArray();
            res.send(result);
        });

    }finally{

    }
}


run();


app.listen(port, () => {
    console.log("Running your server");
});