class Question1 {
    constructor(questionId, answer) {
        this.questionId = questionId;
        this.answer = answer;
    }
    checkAnswer(correctAnswer) {
        return this.answer === correctAnswer;
    }
}
class Student1 {
    constructor(studentId, answers = []) {
        this.studentId = studentId;
        this.answers = answers;
    }
    addAnswer(question) {
        this.answers.push(question);
    }
}
class Quiz1 {
    constructor(questionsArray = [], students = []) {
        this.questions = new Map();
        //TODO: add line to convert questionArray to Map questionsquestionsArray.forEach(question => this.questions.set(question.questionId, question.answer));
        this.students = students;
    }
    scoreStudent(studentId) {
        //TODO: compute student score based on answers
        let student = this.students.filter(student => student.studentId === studentId)[0];
        return student.answers.reduce((sum, currentQuestion) => {
            let questionId = currentQuestion.questionId; //find quesiton id
            let correctAnswer = this.questions.get(questionId); //get correctAnswer from Map
            let result = currentQuestion.checkAnswer(correctAnswer); //compare currentQuestion answer with correctAnswer
            if (result) {
                sum = sum + 1;
            }
            // if(currentQuestion.checkAnswer(this.questions.get(currentQuestion.questionId))){
            //
            sum = sum + 1;
            // }
            return sum;
        }, 0);
    }
    getAverageScore() {
        return this.students.reduce((average, currentStudent, index, array) => average + this.scoreStudent(currentStudent.studentId) / array.length, 0);
    }
}
const questionsArraywithCorrectAnswers = [new Question1(1, 'a'), new Question1(2, 'b'), new Question1(3, 'd')];
let student11 = new Student1(1001, [new Question1(1, 'b'), new Question1(2, 'b'), new Question1(3, 'b')]);
let student21 = new Student1(1002);
student21.addAnswer(new Question1(1, 'a'));
student21.addAnswer(new Question1(2, 'b')); student2.addAnswer(new Question1(3, 'd'));
const students1 = [student11, student21];
let quizObj = new Quiz1(questionsArraywithCorrectAnswers, students1);
console.log(quizObj.scoreStudent(1001));
console.log(quizObj.scoreStudent(1002));
console.log(quizObj.getAverageScore());