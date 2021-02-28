<template>
    <section id="app">
        <date-picker :date='date' @choose-date="chooseDate"></date-picker>
    </section>
</template>
<script>
import datePicker from './datePicker'
export default {
    components:{
        'date-picker':datePicker
    },
    data(){
        return {
            date:new Date()
        }
    },
    methods:{
        chooseDate(date){
            this.date = date;
        }
    }
}
</script>
<style scoped>

</style>