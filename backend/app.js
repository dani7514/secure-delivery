require('./config/db_connect');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { logErrors, errorHandler } = require('./middleware/errorMiddleware');

const router = require('./routes/authRoutes');
const foodRouter = require('./routes/foodRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

const port = process.env.PORT || 3000;


// Use the morgan middleware to log HTTP requests
app.use(morgan('combined'));
app.use(logErrors);
app.use(errorHandler);

app.use('/api-docs', swaggerRoutes);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({
        credentials: true,
        origin: true
    }
));

app.use(router);
app.use(foodRouter);
app.use(orderRouter);
app.use(paymentRouter);

app.listen(port,()=>{
    console.log(`listening on ${port}`)
})