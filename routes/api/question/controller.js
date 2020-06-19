const { Question } = require("../../../models/Question");

const getQuestions = async (req, res) => {
    let { difficulty } = req.query;

    if (difficulty && parseInt(difficulty)) {
        const questions = await Question.find({ difficulty });
        questions.forEach((q, i) => {
            q[i] = q.transform();
        });
        return res.status(200).json(questions);
    } else if (difficulty) {
        return res.status(400).json({ error: "difficulty is invalid" });
    } else {
        const questions = await Question.find();
        questions.forEach((q, i) => {
            q[i] = q.transform();
        });
        return res.status(200).json(questions);
    }
};

const createQuestion = async (req, res) => {
    const { text, options, correctAnswer, attachment } = req.body;
    const question = new Question({
        text,
        options,
        correctAnswer,
        attachment,
    });

    try {
        await question.save();
        return res.status(201).json(question);
    } catch (error) {
        return res.status(200).json(error);
    }
};

module.exports = { getQuestions, createQuestion };
