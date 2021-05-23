import { ref, watchEffect} from 'vue';
import * as storage from '../util/storage.js';

function todoControl() {
    /** 所有任务列表 */
    const todoListRef = ref(storage.getTodos());
    /**监听 todoListRef*/
    watchEffect(() => {
        storage.setTodo(todoListRef.value);
    })
    return {
        todoListRef,
    }
}
export default todoControl;