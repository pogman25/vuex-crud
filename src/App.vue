<template lang="pug">
  #app
    h2 CRUD Forms
    .addTodo
        input(type="text" placeholder="enter New Todo" v-model="newTodo", @keyup.enter="addTodo")
        button(@click="addTodo") Add Todo
        span(v-if="error") {{error}}
    transition-group(name="list" tag="ul")
      li(v-for="item in filter", :key="item.id" class="list-item")
        .current(v-if="updatedId !== item.id")
          h3(:class="{ done: item.done }", @click="event(item.id, item.done)") {{ item.text }}
          div(@click="upTodo(item.id, item.text)") Update
          div(@click="delTodo(item.id)") X
        .update(v-if="updatedId === item.id")
          input(v-model="updatedTodo", @keyup.enter="update(item.id, item.done)", @keyup.esc="esc")
          button(@click="update(item.id, item.done)") Update
    .filter
      p(@click="showAll", :class="{active: shown==='all'}") show all
      p(@click="showDone", :class="{active: shown==='done'}") done
      p(@click="showNoDone", :class="{active: shown==='noDone'}") no done
</template>

<script type="text/babel">
import uuidV1 from 'uuid';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
import { FILTER, ADD_TODO, DEL_TODO, UPD_TODO } from './constants'

export default {
  name: 'app',
  data () {
    return {
      newTodo: '',
      updatedTodo: '',
      error: '',
      shown: 'all',
      updatedId: ''
    }
  },
    computed: {
      filter: function () {
          if(this.shown === 'done') {
              return this.$store.getters.doneTodo
          }
          if(this.shown === 'noDone') {
              return this.$store.getters.noDoneTodo
          }
          if(this.shown === 'all') {
              return this.$store.getters.allTodo
          }
      }
    },
    methods: {
      showAll: function () {
          this.shown = 'all'
      },
      showDone: function () {
          this.shown = 'done'
      },
      showNoDone: function () {
          this.shown = 'noDone'
      },
      event: function (id, done) {
          const payload = {
              id,
              done
          };
          this.$store.commit(FILTER, payload);
      },
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

h1, h2 {
  font-weight: normal;
}

p {
    text-transform: capitalize;
    transition: all 0.5s;
    cursor: pointer;
}

p.active {
    font-size: 1.1em;
    font-weight: 700;
    transform: translateY(-10px);
}

.filter {
  display: inline-flex;
  width: 250px;
  justify-content: space-around;
}

.done {
  text-decoration: line-through;
}

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

a {
  color: #42b983;
}
</style>
