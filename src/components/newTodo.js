import {ref} from 'vue';
import { randomId } from '../util/storage';

function newTodo( todoListRef ){
    const todoItemRef = ref('');
    const addTodo = () => {
        if (!todoItemRef.value) return;
        todoListRef.value.push({
            id: randomId(),
            title: todoItemRef.value,   
            completed: false,
        })
        todoItemRef.value = '';

    }
    return {
        todoItemRef,
        addTodo,
    }
}

export default newTodo;