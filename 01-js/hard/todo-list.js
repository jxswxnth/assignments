/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todoList = [];
  }
  add(todo) {
    this.todoList.push(todo);
  }
  remove(indexOfTodo) {
    this.todoList.splice(indexOfTodo, 1);
  }
  update(index, updatedTodo) {
    if (index < this.todoList.length) this.todoList.splice(index, 1, updatedTodo);
  }
  getAll() {
    return this.todoList;
  }
  get(indexOfTodo) {
    if (indexOfTodo < this.todoList.length) return this.todoList[indexOfTodo];
    else return null;
  }
  clear() {
    this.todoList = [];
  }
}

todoList = new Todo();

todoList.add('Task 1');
todoList.add('Task 2');
todoList.add('Task 3');

// expect(todoList.get(0)).toBe('Task 1');
console.log(todoList.get(0));
// expect(todoList.get(2)).toBe('Task 3');
console.log(todoList.get(2));
// expect(todoList.get(3)).toBeNull();
console.log(todoList.get(3));


module.exports = Todo;
