//箭头函数
const multiply = (a, b) => a * b;
const [first, second] = [1, 2, 3];

//utils.js
export function double(n) {
  return n * 2;
}
// main.js
import { double } from './utils.js';
console.log(double(2)); // 输出 4


//Animal
class Animal {
  speak() {
    console.log('Animal is speaking');
  }
}
class Dog extends Animal {
  bark() {
    console.log('Woof!');
  }
}
const dog = new Dog();
dog.bark(); 
//dog.speak(); 


