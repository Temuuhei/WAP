/**
 * =========================================================================================
 * Add a new method named sort() without parameters in built - in constructor function Array.
 * It'll sort all elements in the array in ascending order.
 */

function Student1(firstName, lastName, grades) {
    this.firstName = firstName,
        this.lastName = lastName,
        this.grades = grades,
        this.inputNewGrade = function (newGrade) {
            this.grades.push(newGrade);
        },

        this.computeAverageGrade = function () {
            return this.grades.reduce((avg, value, _, { length }) => avg + value / length, 0);
        }
};

Student1.prototype.sort = function () {
    return this.grades.sort((a, b) => a - b)
};

let std7 = new Student1('Temuujin', 'Tsogt', [4, 4, 3, 3.5]);
std7.inputNewGrade(3.9);

let std8 = new Student1('Undraa', 'Enebish', [4, 3.8, 4, 3.5]);
std8.inputNewGrade(4);

let std9 = new Student1('Sachin', 'Tandan', [3.8, 3.9, 4, 3.8]);
std9.inputNewGrade(3);

let students2 = [std7, std8, std9];

for (let i = 0; i < students2.length; i++) {
    console.log(`${students2[i].firstName + " " + students2[i].lastName}: has sorted grade of ${students2[i].sort()}`);
}