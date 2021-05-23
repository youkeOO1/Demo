
function deleteTodo(todoListRef) {
    /**删除单个任务 */
    const delTodo = (todo) => {
        const index = todoListRef.value.indexOf(todo);
        if (index >= 0) {
            todoListRef.value.splice(index, 1);
        }
    }
    /**将已完成的任务删除 */
    const delCompleted = () => {
        todoListRef.value = todoListRef.value.filter((ele) => !ele.completed)
    }
    return {
        delTodo,
        delCompleted,
    }
}

export default deleteTodo;