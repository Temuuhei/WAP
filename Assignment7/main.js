// 1.
function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if(password == "rockstar") ok();
    else fail();
}

let user = {
    name : 'John',
    loginOk() {
        alert(`${this.name} logged in`);
    },
    loginFail() {
        alert(`${this.name} failed to log in`);
    },
};
// askPassword(user.loginOk, user.loginFail);   
//Passed the context user inside "bind" for passed method references
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
// askPassword(()=>user.loginOk.call(user), ()=>user.loginFail.call(user));
// askPassword(()=>user.loginOk.apply(user), ()=>user.loginFail.apply(user));

// Reason why it didn't work? with the below code is:
// (old)    askPassword(user.loginOk, user.loginFail);
// is because the "this" statement called both in "loginOk" and "loginFail"
// uses this reference which will return error when being passed as a reference
// and called in a different execution environment. Therefore, we need to 
// pass in the "user" object so the methods will this statement will be 
// found in the new environment as well.

// 2.
let group = {
    title : "Our group",
    students : ['Temka', 'Burmaa', 'Undraa'],

    showList : function() {
        this.students.forEach(function(student){
            console.log(this.title + " : " + student);
        }.bind(this))
    }
};

group.showList();

/**
 * =========================== Below is for self study ==========================
 * Options 1: Using only Lambda Expression
 * 
 * change the below code
 * this.students.forEach(function(student) {
 *           console.log(this.title + ": " + student);
 *       });
 * with lambda expression which the "this" will be refering to the outer
 * method's(showList: function()), outer lexical environment      
 */

let group1 = {
    title : "Our Group",
    students : ["John", "Pete", "Alice"],

    showList: function() {
        this.students.forEach(student => console.log(this.title + " : " + student));
    },
    //  Using "self pattern"
    showList1 : function(){
        self = this;
        this.students.forEach(function(student) {
            console.log(self.title + " : " + student);
        })
    },
    showList2 : function() {
        self = this;
        let f = student => student => console.log(self.title + " : " + student);
        this.students.forEach(f.call(this));
    },
    // Optional 3 With "bind" and lambda expression
    showList3 : function() {
        let f = student => console.log(this.title + " : " + student);
        this.students.forEach(f.bind(this));
    },
    // Optional 4 With "call" and lambda expression
    showList4 : function() {
        let f = student => student => console.log(this.title + " : " + student);
        this.students.forEach(f.call(this));
    },
    // Optional 5 With "apply" and lambda expression
    showList5 : function() {
        let f = student => student => console.log(this.title + " : " + student);
        this.students.forEach(f.apply(this));
    }
};

group1.showList();
group1.showList1();
group1.showList2();
group1.showList3();
group1.showList4();
group1.showList5();
