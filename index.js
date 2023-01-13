const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


//middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASSWORD}@cluster0.ltux5vg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const users = client.db('Craft-Connect').collection('users');

        app.get('/', (req, res) => {
            req.send('Craft connect server is running..')
        })

        app.post('/users', async(req ,res) => {
            const user = req.body;
            const result = await users.insertOne(user);
            res.send(result);
        })

    }
    finally{}
}
run().catch(error => console.log(error))


app.listen(port, (req, res) => {
    console.log('Craft connect server is running..')
})