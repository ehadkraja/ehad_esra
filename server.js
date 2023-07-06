const express = require('express');
const PORT = 3000;
const HOST = '0.0.0.0';// App
const app = express();
const bodyParser = require('body-parser');



const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
// // add the following line near the indexRouter
// var personsRouter = require('./routes/persons');
//
// // add the following line near app.use indexRouter
// app.use('/persons', personsRouter);
app.use('/api/v1/', indexRouter);
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/admin', adminRouter);


app.listen(PORT, HOST, (error) => {
        if (!error)
            console.log("Server is Successfully Running, and App is listening on port " + PORT)
        else
            console.log("Error occurred, server can't start", error);
    }
);


