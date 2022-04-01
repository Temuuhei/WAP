//1.
let arr =[2,21,23,1,2,3,4];
function sum (){
    let result = arr.filter(s => s > 20).reduce((x,y) => x + y, 0);
    return result;
};
console.log(arr);
console.log(sum(arr));

//2.
let strArray = ['Temka','Undraa','Burmaa','Tomorjin','Hulan','Bilguun'];
let answer2 = function getNewArray(strArray) {
    let res1 = strArray.filter(a => a.length >= 5).filter(e => e.includes('a'));
    return res1;
 }

 console.log(strArray);
 console.log(answer2(strArray));