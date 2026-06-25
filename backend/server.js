import { DBConnection } from "./config/dbConnect.js";
import { app } from "./index.js";
import 'dotenv/config';
import { createTable } from "./config/create.table.js";


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server Started in http://localhost:${PORT}`);
    DBConnection();
    // createTable();
});