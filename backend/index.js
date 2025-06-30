import express from 'express';

//Middlewares
import ipWhitelistChecker from './middlewares/ipWhitelistChecker.js';
import cors from 'cors';

//Routes
import orders from './routes/orders.js';
import auth from './routes/auth.js';

const app = express();

app.use(cors());

app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(ipWhitelistChecker);
}
app.use('/api/v1/foodpanda', orders);
app.use('/api/v1/auth', auth);
app.get('/api/v1/foodpanda', (req, res) => {
    res.send("Hello from GenieX Foodpanda Plugin API")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
