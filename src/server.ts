import express from 'express';
import router from './routes/routes';

const app = express();

app.use(express.json());

app.use('/api/v1', router);

app.listen(3002, ()=> {
    console.log('express running on http://localhost:30002');
})

