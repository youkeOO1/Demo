<template>
  <main class="todo-warp">
    <h2 class="title">todos</h2>
    <section class="set-todo-container">
      <div class="left-checket">
        <input type="checkbox" name="" id="toggle-all" v-model="allCompleted">
        <label for="toggle-all"></label>
      </div>
      <div class="setTodo">
        <input type="text" placeholder="What needs to be done ?" v-model="todoItemRef" @keydown.enter="addTodo">
      </div>
    </section>
    <section class="content-warp" v-show="todoListRef.length > 0">
      <ul>
        <li class="content-item " v-for="item in todoList" :key="item.id" :class="{completed : item.completed, editing: item === todoEditRef}">
          <div class="view">
            <input type="checkbox" name="" id="" class="toggle" v-model="item.completed">
            <label for="" @dblclick="editTodo(item)">{{ item.title }}</label>
            <button class="close" @click="delTodo(item)">X</button>
          </div>
          <input type="text" v-model="item.title" @keydown.esc="cancelTodo(item)" @keydown.enter="editTodoValue(item)" class="edit" >
        </li>
      </ul>
    </section>
    <section class="footer" v-show="todoListRef.length > 0">
      <div class="todo-num">
        {{ todoLength }} {{ todoLength > 1 ? 'items': 'item'}} left 
      </div>
      <ul class="todo-btn">
        <li><a href="#/All" :class="{'selected': todoTypeRef === 'All'}">ALL</a></li>
        <li><a href="#/Active" :class="{'selected': todoTypeRef === 'Active'}">Active</a></li>
        <li><a href="#/Completed" :class="{'selected': todoTypeRef === 'Completed'}">Completed</a></li>
      </ul>
      <button class="remove-completed" :class="{'show-remove': todoCompleted > 0}" @click="delCompleted"> Clear completed</button>
    </section>
  </main>
</template>
<script>
import todoControl from './components/todoControl';
import newTodo from './components/newTodo';
import modifyTodo from './components/modifyTodo';
import filterTodo from './components/filterTodo';
import deletedTodo from './components/deleteTodo';

export default {
  name: 'App',
  setup(){
    const { todoListRef } = todoControl()
    return {
      todoListRef,
      ...newTodo(todoListRef),
      ...modifyTodo(todoListRef),
      ...filterTodo(todoListRef),
      ...deletedTodo(todoListRef),
    }
  }
}
</script>

<style scoped src="./index.css">

</style>