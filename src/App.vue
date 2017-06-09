<template lang="pug">
  #app
    h2 CRUD Forms
    vue-add-todo
    vue-todo-list
    vue-filter
</template>

<script type="text/babel">
import VueFilter from './components/filter.vue';
import VueAddTodo from './components/addTodo.vue';
import VueTodoList from './components/todoList.vue';

export default {
  name: 'app',
  data () {
    return {

    }
  },
    components: {
      VueFilter,
      VueAddTodo,
      VueTodoList
    }
}
</script>

<style lang="scss">
    :root {
        background-color: #2c3e50;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #fff;
        margin: 60px auto 0;
        width: 50%;

        input {
            font-size: 1em;
            padding: 10px 5px;
            border: 1px solid #ddd;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            outline: none;
        }

        button {
            font-size: 1em;
            font-weight: 300;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            outline: none;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #ddd;
            color: lighten(#2c3e50, 20%);

            &:hover {
                background-color: #ddd;
            }
        }
    }

    h1, h2 {
        font-weight: normal;
    }

    p {
        text-transform: capitalize;
        transition: all 0.5s;
        cursor: pointer;
    }

    .done {
        text-decoration: line-through;
    }

    a {
        color: #42b983;
    }
</style>
