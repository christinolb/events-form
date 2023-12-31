import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

//solves response bug
export const config = {
  api: {
    externalResolver: true,
  },
}

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });



export default async function GetTitles(req: NextApiRequest, res: NextApiResponse) { 
    const { isPast } = req.body

    getTitles().catch(console.dir);

    //function which takes in and send data from client to db
    async function getTitles(){
        try {
          //connect to DB
          await client.connect();
      
          //select db
          const myDB = client.db("web_content_test");

          //select cluster
          const myColl = myDB.collection("events");
          
          //query and running function
          const query = { past: isPast }; 
          const result = await myColl.find(query).toArray({ });

          // send titles to availableDocQuery
          return res.status(200).json({response: result})

        } catch (error) {
            res.status(500).json({msg: "Error getting titles."})
      
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
      }
      

}