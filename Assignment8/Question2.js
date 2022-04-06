// Redoing the question 1 using Construction Function
function Student(firstName, lastName, grades) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.grades  = grades,
    this.inputNewGrade =  function(newGrade) {
        this.grades.push(newGrade);
    },

    this.computeAverageGrade = function() {
        return this.grades.reduce((avg, value, _, {length}) => avg + value / length, 0);
    }
};

let std4 = new Student('Temuujin', 'Tsogt', [4, 4, 3, 3.5]);
std4.inputNewGrade(3.9);

let std5 = new Student('Undraa', 'Enebish', [4,3.8,4,3.5]);
std5.inputNewGrade(4);

let std6 = new Student('Sachin', 'Tandan', [3.8,3.9,4,3.8]);
std6.inputNewGrade(3);

let students1 = [std4, std5, std6];

for(let i = 0; i < students1.length; i++){
    console.log(`${students1[i].firstName + " " + students1[i].lastName}: has average grade of ${students1[i].computeAverageGrade()}`);
}