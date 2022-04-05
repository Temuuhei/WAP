// 1.
function makeArmy() {
    let shooters = [];
    let i =0;
    while(i < 2) {
        let shooter = function(){
            alert(i);
        };// closure function i is free
        shooters.push(shooter);
        i++;
    }
    return shooters;
}
console.log(makeArmy());
console.log(this);
let army = makeArmy();
// console.log(army);
army[0]( );
// 2.
function printNumbers(from, to){
    for(let i = from; i <= to; i++) {
        setTimeout(x => console.log(x), (i+1) * 1000, i);
    }
}
printNumbers(1,10);


function printNumbers2(from , to){
    var id = setInterval(function(){
      if(from <= to){
          console.log(from);
          from++;
      }else{
          clearInterval(id);
      }
    }, 1000);
}

printNumbers2(11,15);

// 3.
let i = 0;
setTimeout(() => alert(i), 100);
for(let j = 0; j < 100000000; j++){// tested it with also 2 x 100000000 and 5 x 100000000
    i++;
}

// When will the scheduled function run? 
// ==> My Answer: "After the loop"

// What will the alert going to show? 
// ==> My Answer: 100000000