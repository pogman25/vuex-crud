<template lang="pug">
    .filter
        p(@click="showAll", :class="{active: shown ==='all'}") show all
        p(@click="showDone", :class="{active: shown ==='done'}") done
        p(@click="showNoDone", :class="{active: shown ==='noDone'}") no done
</template>

<script type="text/babel">
    import { VISIBLE } from '../constants';

    export default {
        name: 'filter',
        data () {
            return {

            }
        },
        computed: {
            shown: function () {
                return this.$store.state.visible
            }
        },
        methods: {
            showAll: function () {
                this.$store.commit(VISIBLE, 'all');
            },
            showDone: function () {
                this.$store.commit(VISIBLE, 'done');
            },
            showNoDone: function () {
                this.$store.commit(VISIBLE, 'noDone');
            },
        }
    }
</script>

<style lang="scss">
    .filter {
        display: inline-flex;
        width: 250px;
        justify-content: space-around;
    }

    p.active {
        font-size: 1.1em;
        font-weight: 700;
        transform: translateY(-10px);
    }
</style>
