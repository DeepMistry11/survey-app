import express from 'express';
import prisma from "../db/prisma";

const router = express.Router();

router.get('/questions', async (req, res) => {
    try{
        const questions = await prisma.question.findMany();
        res.json(questions);
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.post('/responses', async (req, res) => {
    const data = req.body;
    try {
        for(const key in data){
            if (key.startsWith('question-')){
                const questionId = parseInt(key.split("-")[1]);
                await prisma.response.create({
                    data: {
                        questionId,
                        response: data[key]
                    },
                });
            }
        }
        res.status(201).json({success: true});
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Failed to save responses'});
    }
})

router.get("/responses", async (req,res) => {
    try{
        const all = await prisma.response.findMany({
            include: {question: true},
            orderBy: {createdAt: 'desc'}
        });
        res.json(all);
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to save responses'});
    }
});

export default router;