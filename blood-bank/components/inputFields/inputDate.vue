<template>
    <input v-if="isEdit" type="date" v-model="date" @change="updateValue">
    <div v-else @click="isEdit = true">yout Date {{date}}</div>
</template>

<script>
export default{
    name:'input-date',
    props:['date'],
    data(){
        return{
            isEdit:false,
            // date:''
        }
    },
    methods:{
        updateValue(){
           this.$emit('input', this.date);
            this.isEdit = false;
        }
    }
}
</script>
