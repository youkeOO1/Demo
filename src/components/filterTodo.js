import { ref, onMounted, onUnmounted, computed } from 'vue';
import { filter } from '../util/storage';

/**有效hash值 */
const todoTypeList = ['All', 'Active', 'Completed'];

function filterTodo(todoListRef) {
    /**显示学生的类型 */
    const todoTypeRef = ref('All');
    /**获取hash并判断hash是否有效 */
    const onHashChange = () => {
        const hash = location.hash.replace(/#\//g, '');
        
        if (todoTypeList.includes(hash)) {
            todoTypeRef.value = hash;
        }
    };
    /**
     * 生命周期钩子
     * 监听hash值是否改变
     */
    onMounted(() => {
        window.addEventListener('hashchange', onHashChange);
    });
    /**
     * 生命周期钩子
     * 取消监听hash值是否改变
     */
    onUnmounted( () => {
        window.removeEventListener('hashchange', onHashChange);
    });
    /**
     * 根据类型筛选任务 */
    const todoList = computed(() => {
        return filter(todoListRef.value, todoTypeRef.value);
    });
    /** 获取当前任务的长度 */
    const todoLength = computed( () => {
        return filter(todoListRef.value , 'Active').length;
    })
    /** 获取已完成任务的长度 */
    const todoCompleted = computed( () => {
        return filter( todoListRef.value , 'Completed').length;
    })
    return {
        todoTypeRef,
        todoList,
        todoLength,
        todoCompleted,
    }
};

export default filterTodo;