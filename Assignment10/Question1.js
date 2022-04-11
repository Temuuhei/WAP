Array.prototype.even = function () {
    let evenArr = [];
    for(let i = 0; i < this.length; i++) {
        if(this[i] % 2 === 0){
            evenArr.push(this[i]);
        }
    }
    return evenArr;
}

Array.prototype.odd = function() {
    let oddArr = [];
    for(let i = 0; i < this.length; i++) {
        if(this[i] % 2 === 1){
            oddArr.push(this[i]);
        }
    }
    return oddArr;
}
console.log([1,2,3,4,5,6,7,8].even());
console.log([1,2,3,4,5,6,7,8].odd());
