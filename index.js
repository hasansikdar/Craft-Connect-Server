const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT  || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


//middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS }@cluster0.ltux5vg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const users = client.db('Craft-Connect').collection('users');
        const usersPost = client.db('Craft-Connect').collection('usersPost');
        app.get('/', (req, res) => {
            res.send('Craft connect server is running..')
        })
        app.post('/usersPost', async(req, res) => {
            const usersData = req.body;
            const result = await usersPost.insertOne(usersData);
            res.send(result);
        })
        app.get('/usersPost', async(req, res) => {
            const query = {};
            const result = await usersPost.find(query).toArray();
            res.send(result);
        })

        // user created post
        app.post('/users', async(req ,res) => {
            const user = req.body;
            const result = await users.insertOne(user);
            res.send(result);
        })
        // all users get
        app.get('/users', async(req, res) => {
            const result = await users.find({}).toArray();
            res.send(result);
        })


    }
    finally{}
}
run().catch(error => console.log(error))


app.listen(port, (req, res) => {
    console.log('Craft connect server is running..')
})