import { ref, computed} from 'vue';
import { filter} from '../util/storage';

function modifyTodo(todoListRef) {
    /**当前被修改的任务 */
    const todoEditRef = ref('');
    /**当前任务的title值 */
    let originTitle = '';
    /**
     * 显示内容修改框
     * @param {*} todo 
     */
    const editTodo = (todo) => {
        todoEditRef.value = todo;
        originTitle = todo.title;
        
    };
    /**
     * 修改内容
     * @param {*} todo 
     */
    const editTodoValue = (todo) => {
        todoEditRef.value = null;
        const title = todo.title.trim();
        if (title) {
            todo.title = title;
        } else {
            const index = todoListRef.value.indexOf(todo);
            if (index >= 0) {
                todoListRef.value.splice(index, 1 )
            }
        }
    };
    /**
     * 取消修改
     */
    const cancelTodo = (todo) => {
        todo.title = originTitle;
        todoEditRef.value = null;
    }

    /** 是否全选 */
    const allCompleted = computed({
        /**当前任务为零时，说明此时全选啦 */
        get() {
            return filter(todoListRef.value, 'Active').length === 0;
        },
        /**
         * 触发checked事件来全选任务
         * @param {*} checked 
         */
        set(checked){
            todoListRef.value.forEach(ele => {
                ele.completed = checked;
            });
        }
    })
    return {
        todoEditRef,
        editTodo,
        editTodoValue,
        cancelTodo,
        allCompleted,
    }
}
export default modifyTodo;