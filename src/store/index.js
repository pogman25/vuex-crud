import { FILTER, ADD_TODO, DEL_TODO, UPD_TODO } from '../constants';
import { loadState, saveState } from './localStorage'

export default {
    state: {
        todos: loadState() || [
                                { id: 1, text: 'some text', done: true },
                                { id: 2, text: 'todos', done: false }
                              ]
    },

    getters: {
        allTodo: state => {
            return state.todos
        },
        doneTodo: state => {
            return state.todos.filter( i => i.done)
        },
        noDoneTodo: state => {
            return state.todos.filter( i => !i.done)
        }
    },

    mutations: {
        [FILTER] (state, payload) {
            state.todos.find( i => i.id === payload.id).done = !payload.done;
            saveState(state.todos);
        },
        [ADD_TODO] (state, payload) {
            state.todos = [
                ...state.todos,
                {
                    id : payload.id,
                    text: payload.text,
                    done: false
                }];
            saveState(state.todos);
        },
        [DEL_TODO] (state, id) {
            const index = state.todos.findIndex( i => i.id === id);
            state.todos = [
                ...state.todos.slice(0, index),
                ...state.todos.slice(index+1)
            ];
            saveState(state.todos);
        },
        [UPD_TODO] (state, payload) {
            const index = state.todos.findIndex( i => i.id === payload.id);
            state.todos = [
                ...state.todos.slice(0, index),
                    payload,
                ...state.todos.slice(index+1)
            ];
            saveState(state.todos);
        }
    }
}