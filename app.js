// import express from "express";
// import  Router  from "./router.js";
// import connection from "./connection.js";

// const app = express()
// const port=3001

// app.use(express.static('frontEnd'))
// app.use(express.json())
// app.use('/api',Router)

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve('frontEnd/pages/index.html'));  // Adjust this path to point to your 'index.html' correctly
// });


// connection().then(()=>{
//     app.listen(port,()=>{
//         console.log(`server started at http://localhost:3001`);
        
//     })
// })
// .catch((error)=>{
//     console.log(error);
    
// })

import express from "express";
import Router from "./router.js";
import connection from "./connection.js";
import path from 'path';

const app = express();
const port = 3001;

app.use(express.static('frontEnd'));  
app.use(express.json());
app.use('/api', Router);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('frontEnd/pages/index.html'));  
});

// Connect to the database and start the server
connection().then(() => {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
}).catch((error) => {
    console.log(error);
});
