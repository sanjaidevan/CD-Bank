import { DBConnection } from "./db/config.js";
import { app } from "./index.js";
import 'dotenv/config';
import { createTable } from "./db/createTable.js";


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server Started in http://localhost:${PORT}`);
    DBConnection();
    // createTable(); This will create the tables 
});