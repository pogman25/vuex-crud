<template lang="pug">
    transition-group(name="list" tag="ul")
        li(v-for="item in filter", :key="item.id" class="list-item")
            .current(v-if="updatedId !== item.id")
                h3(:class="{ done: item.done }", @click="event(item.id, item.done)") {{ item.text }}
                div(@click="upTodo(item.id, item.text)") Update
                div(@click="delTodo(item.id)") X
            .update(v-if="updatedId === item.id")
                input(v-model="updatedTodo", @keyup.enter="update(item.id, item.done)", @keyup.esc="esc")
                button(@click="update(item.id, item.done)") Update
</template>

<script type="text/babel">
    import { DEL_TODO, UPD_TODO, FILTER } from '../constants';

    export default {
        name: 'app',
        data () {
            return {
                updatedTodo: '',
                error: '',
                updatedId: ''
            }
        },

        computed: {
            filter: function () {
                if(this.$store.state.visible === 'done') {
                    return this.$store.getters.doneTodo
                }
                if(this.$store.state.visible === 'noDone') {
                    return this.$store.getters.noDoneTodo
                }
                if(this.$store.state.visible === 'all') {
                    return this.$store.getters.allTodo
                }
            }
        },
        methods: {
            event: function (id, done) {
                const payload = {
                    id,
                    done
                };
                this.$store.commit(FILTER, payload);
            },
            delTodo: function (id) {
                this.$store.commit(DEL_TODO, id);
            },
            upTodo: function (id, text) {
                this.updatedId = id;
                this.updatedTodo = text;
            },
            update: function (id, done) {
                const payload = {
                    id,
                    text: this.updatedTodo,
                    done
                };
                this.$store.commit(UPD_TODO, payload);
                this.updatedId = '';
                this.updatedTodo = '';
            },
            esc: function () {
                this.updatedId = '';
            }
        }
    }
</script>

<style lang="scss">
    ul {
        min-height: 300px;
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        margin-top: 0;
        overflow: hidden;
        box-shadow: 5px 5px 5px 5px #000;
    }

    li {
        .current, .update {
            width: 90%;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 10px;

            h3 {
                text-align: left;
                flex: 6 1 0;
                cursor: pointer;
            }

            div {
                flex: 1 1 0;
                margin: 0 20px;
                cursor: pointer;
            }
        }
        .update {
            margin: 10px auto;
            input {
                flex: 8 1 0;
            }
            button {
                flex: 2 1 0;
                height: 40px;
            }
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }
    .list-enter {
        opacity: 0;
        transform: translateX(-30px);
    }
    .list-leave-to {
        opacity: 0;
        transform-origin: 0 50%;
        transform: translateX(30px) rotateZ(90deg);
    }
</style>
