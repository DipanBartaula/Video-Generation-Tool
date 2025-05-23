import dotenv from 'dotenv';
import app from "./app.js";
import connectDB from "./db/db.js";


dotenv.config({
    path: '.env'
})








connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server running at port ', process.env.PORT);
    })
}).catch((error) => {
    console.log("Error while connecting to DB", error);
})