let student = {
    firstName : '',
    lastName : '',
    grades : [],
    inputNewGrade: function(newGrade) {
        this.grades.push(newGrade);
    },

    computeAverageGrade: function() {
        return this.grades.reduce((avg, value, _, {length}) => avg + value / length, 0);
    }
}

let std1 = Object.create(student);
std1.firstName = 'Temuujin';
std1.lastName = 'Tsogt';
std1.grades = [4, 4, 3, 3.5];
std1.inputNewGrade(3.9);

let std2 = Object.create(student);
std2.firstName = 'Undraa',
std2.lastName = 'Enebish',
std2.grades = [4,3.8,4,3.5];
std2.inputNewGrade(4);

let std3 = Object.create(student);
std3.firstName = 'Sachin';
std3.lastName = 'Tandan';
std3.grades = [3.8,3.9,4,3.8];
std3.inputNewGrade(3);

let students = [std1, std2, std3];

for(let i = 0; i < students.length; i++){
    console.log(`${students[i].firstName + " " + students[i].lastName}: has average grade of ${students[i].computeAverageGrade()}`);
}