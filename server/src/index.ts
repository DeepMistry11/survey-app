import express from 'express';
import cors from 'cors';
import surveyRoutes from './routes/survey';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/survey', surveyRoutes);

app.get('/', (req, res) => {
    res.send("Survey API running");
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listeing at http://localhost:${PORT}`);
})