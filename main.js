// let obj = {
//     name:'sunny',
//     age:21,
// }

// const x= function(hometown, state) {
//     console.log(`my name is ${this.name} and my age is ${this.age} and i'm from ${hometown} , ${state}`)
// }

// x.call(obj,"lucknow","uttar pradesh");
// // function sayHello(){
// //     console.log(`my name is ${this.name}`);
// // }


// // sayHello.call(obj);

// let obj2 = {
//     name:"shivam",
//     age:23
// }


// x.call(obj2,"varanasi","uttar pradesh");




// bind method in javascript

const person = {
    name: 'Alice',
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.greet();

const greet = person.greet; // We take the method out of the object
greet(); // Without bind: "Hello, my name is undefined" (because `this` is not `person`)

// const boundGreet = person.greet.bind(person); // We bind `this` to `person`
// boundGreet(); // With bind: "Hello, my name is Alice" (because `this` is `person`)
