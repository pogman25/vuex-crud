<template lang="pug">
    .addTodo
        input(type="text" placeholder="enter New Todo" v-model="newTodo", @keyup.enter="addTodo")
        button(@click="addTodo") Add Todo
        span(v-if="error") {{error}}
</template>

<script type="text/babel">
    import uuidV1 from 'uuid';
    import { ADD_TODO } from '../constants';

    export default {
        name: 'app',
        data () {
            return {
                newTodo: '',
                error: ''
            }
        },
        methods: {
            addTodo: function () {
                if(this.newTodo) {
                    const payload = {
                        id: uuidV1(),
                        text: this.newTodo
                    };
                    this.$store.commit(ADD_TODO, payload);
                    this.newTodo = '';
                    this.error = '';
                } else {
                    this.error = 'fill form';
                }
            }
        }
    }
</script>

<style lang="scss">
    .addTodo {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 20px;

        span {
            width: 100%;
            color: #db7176;
            letter-spacing: 2px;
            margin-top: 10px;
            text-transform: uppercase;
        }
    }
</style>
