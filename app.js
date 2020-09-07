require('dotenv').config();

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require("./api/index")
const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('./uploads'))
app.use("/api/v1/", routes);
const port = process.env.PORT || 3000;
app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on port : ", port)
});