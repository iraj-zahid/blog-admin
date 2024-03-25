const express = require("express")
const cors = require("cors")

const app = express();
app.use(cors({origin: true, credentials: true}))

app.use(express.json())

const port = 5000;
const Router = require("./RootRouter")
const db = require("./Config/db")

app.listen(port, () => {
    console.log(`run ${port}`);
})
db.connection
    .once('open', () => console.log("MongoDB is connected"))
    .on('error', (err) => console.log(`Error in db ${err}`))

    
app.use("/api",Router)




