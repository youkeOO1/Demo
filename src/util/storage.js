const WEB_KEY = 'todo'
function randomId() {
    return Date.now() + Math.random().toString(16).substring(2,6)
}
/**
 * 写入
 */
function setTodo(value) {
    localStorage.setItem(WEB_KEY,JSON.stringify(value));
}
/**
 * 获取
 * @returns 
 */
function getTodos() {
    const result = localStorage.getItem(WEB_KEY);
    if(result) return JSON.parse(result)
    else return []
}

/**
 * 查找
 */
function filter (todoList, type = 'All') {
    if (!todoList) return ;
    /**所有任务 */
    if (type === 'All') return todoList
    /**当前任务 */
    if (type === 'Active') return todoList.filter(it => !it.completed);
    /**已完成任务 */
    if (type === 'Completed') return todoList.filter(it => it.completed)
}

export  {
    setTodo,
    getTodos,
    randomId,
    filter,
}