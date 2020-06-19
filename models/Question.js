const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        option: {
            type: Array,
            required: true,
        },
        correctAnswer: {
            type: Number,
            required: true,
        },
        attachment: {
            type: Array,
        },
        difficulty: Number,
    },
    { timestamps: true }
);

QuestionSchema.method("transform", function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
});

const Question = new mongoose.model("Question", QuestionSchema);

module.exports = { Question, QuestionSchema };
