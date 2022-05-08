const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000

const app = express();

// middleware
app.use(cors());
app.use(express.json()); 


const uri = `mongodb+srv://${process.env.INVENTORY_USER}:${process.env.INVENTORY_PASS}@cluster0.hlqu3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const itemCollection = client.db('inventory').collection('item');
       
        app.get('/item', async(req, res) =>{
          const query = {};
          const cursor = itemCollection.find(query);
          const items = await cursor.toArray();
          res.send(items);
        })

        app.get('/item/:_id', async(req, res) =>{
            const id = req.params._id;
            const query = {_id: ObjectId(id)};
            const item = await itemCollection.findOne(query);
            res.send(item);
        })
    }
    finally{

    }
}

run().catch(console.dir);

// inventory
// L095dFU3Rq8Riio4

app.get('/', (req, res) =>{
    res.send('Running server')
})
app.listen(port, ()=>{
    console.log('Listening to port', port)
})