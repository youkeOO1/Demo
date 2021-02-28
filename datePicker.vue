<template>
    <div class="date-picker" v-show-panel>
        <div class="picker-input">
            <span class="icon">
                <i class="iconfont  icon-date"></i>
            </span>
            <input type="text" :value="chooseDate">
        </div>
        <div class="picker-panel" v-if="showPanel">
            <!-- 三角 -->
            <div class="picker-arrow">
                
            </div>
            <!-- 日历显示 -->
            <div class="picker-body">
                <div class="picker-header">
                    <span class="picker-btn iconfont icon-prev-year" @click="onChnageYear('prev')"></span>
                    <span class="picker-btn iconfont icon-prev-month" @click="onChnageMonth('prev')"></span>
                    <span class="picker-date">{{showDate.year}}-{{ showDate.month+1}}</span>
                    <span class="picker-btn iconfont icon-next-month" @click="onChnageMonth('netxt')"></span>
                    <span class="picker-btn iconfont icon-next-year" @click="onChnageYear('next')"></span>
                </div>
                <div class="picker-content">
                    <div class="picker-weeks">
                        <div v-for="week in weeks" :key="week">{{ week}}</div>
                    </div>
                    <div class="picker-days">
                        <div  
                        v-for="date in showDays" 
                        :key="date.getTime()"
                        :class="{
                            'other-month':!isCur(date).otherMonth,
                            'is-today':isCur(date).isToday,
                            'is-select':isCur(date).isSelect,
                        }"
                        @click="onChooseDate(date)"
                        >
                        {{ date.getDate()}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        date:{
            type:Date,
            default: ()=> new Date()
        }
    },
    directives:{
        /**
         * 日历的显示与隐藏
         */
        'show-panel':{
            bind(el,binding,vnode){
                const vm = vnode.context;
                document.onclick=(e)=>{
                    let dom = e.target;
                    let isChildren = el.contains(dom)
                    if(isChildren && !vm.showPanel){
                        vm.showPanel = true;
                    }else if(!isChildren && vm.showPanel){
                        vm.showPanel= false;
                    }
                }
            }
        }
    },
    data(){
        return {
            weeks:['一','二','三','四','五','六','日'],
            showPanel:false,
            showDate:{
                year:'',
                month:'',
                day:''
            },

        }
    },
    computed:{
        /**
         * 输入框显示的日期
         * @returns "year-month-day"
         */
        chooseDate(){
            const {year,month,day} = this.getYearMonthDay(this.date)
            return `${year}-${month+1}-${day}`
        },
        /**
         * 日历上需要显示的日
         * @returns Array
         */
        showDays(){
            const {year,month} = this.showDate;
            let date = new Date(year,month,1);
            let week = date.getDay() -1 ;
            let startDate = date - week * 86400000;
            const arr = []
            for(let i = 0 ; i < 42 ; i++){
                arr.push(new Date(startDate + i * 86400000))
            }
            return arr;
        }
    },
    methods:{
        /**
         * 获取年月日
         * @returns Object {year,month,day}
         */
        getYearMonthDay(date){
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            return {
                year,
                month,
                day
            }
        },
        /**
         * 获取日历上显示的日期
         */
        getShowDate(date){
            const { year, month , day } = this.getYearMonthDay(date);
            this.showDate = {
                year,
                month,
                day
            }
        },
        /**
         * 日历上每一日的样式
         * @param {Date} date 事件对象
         * @returns Object {otherMonth:boolean,
         * isToday:boolean,
         * isSelect:boolean}
         */
        isCur(date){
            let chooseDate = new Date(this.chooseDate);
            // 获取输入框中的日期
            const {year:chooseYear,month:chooseMonth,day:chooseDay} = this.getYearMonthDay(chooseDate);
            // 日历上显示的日期
            const {year:showYear,month:showMonth} = this.showDate;
            // 今天的日期
            const {year:nowYear,month:nowMonth,day:nowDay} = this.getYearMonthDay(new Date());
            // 绑定到每个元素的上的日期
            const {year:elementYear,month:elementMonth,day:elementDay} = this.getYearMonthDay(date);
            return {
                otherMonth : showYear === elementYear && showMonth === elementMonth,
                isToday : nowYear === elementYear && nowMonth === elementMonth && nowDay === elementDay,
                isSelect : chooseYear === elementYear && chooseMonth === elementMonth && chooseDay === elementDay,
            }
        },
        /**
         * 单击某一日 重新渲染日历
         */
        onChooseDate(date){
            this.$emit('choose-date',date)
            this.showPanel = false;
            this.getShowDate(date)
        },
        /**
         * 年数的增减
         */
        onChnageYear(type){
            let num = type === 'prev' ? -1 : 1;
            this.showDate.year += num;
        },
        /**
         * 月数的增减
         */
        onChnageMonth(type){
            let num = type === 'prev' ? -1 : 1;
            let {year:nowYear,month:nowMonth,day:nowDay} = this.showDate;
            const nowDate = new Date(nowYear,nowMonth,nowDay)
            nowDate.setMonth(nowMonth + num);
            const {year:newYear,month:newMonth} = this.getYearMonthDay(nowDate)
            this.showDate.year = newYear;
            this.showDate.month = newMonth;
        }

    },
    created(){
        this.getShowDate(this.date)
    }
}
</script>
<style scoped>
    @import "./assets/font.css";

    .date-picker{
        display: inline-block;
        margin: 10px;
    }

    .date-picker .picker-input{
        position: relative;
    }

    .date-picker .icon{
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .date-picker .icon .icon-date{
        font-size: 20px;
    }

    .date-picker input{
        height: 40px;
        line-height: 40px;
        padding: 0 40px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #fff;
        outline: none;
        cursor: pointer;
        
    }

    .date-picker .picker-panel{
        margin-top: 5px;
        width: 322px;
        height: 329px;
        border: 1px solid #e4e7ed;
        border-radius: 5px;
        box-shadow: 0 2px 13px 2px rgba(0 0 0 /10%);
        background-color: #fff;
        position: absolute;
        cursor: pointer;
    }

    .date-picker .picker-arrow{
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #e4e7ed;
        position: absolute;
        left: 30px;
        top: -13px;
    }

    .date-picker .picker-arrow::after{
        content: "";
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #fff;
        position: absolute;
        left: -6px;
        top: -5px;
        
    }

    .date-picker .picker-header{
        display: flex;
        padding-top: 15px;
        padding-bottom: 10px;
        user-select: none;
        /* outline: none; */
        justify-content: center;
        align-content: center;
        
    }

    .date-picker .picker-btn{
        margin: 5px 5px 0;
        color: #303133;
        font-size: 12px;
        cursor: pointer;
    }

    .date-picker .picker-date{
        /* font-size: 12px; */
        margin: 0 30px;
    }

    .date-picker .picker-content{
        padding:  0 10px 10px;
        color: #606266;
        user-select: none;
    }

    .date-picker .picker-weeks{
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
    }
    .date-picker .picker-days{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .date-picker .picker-days div{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 4px 6px;
        cursor: pointer;
        font-size: 12px;
    }
    
    .date-picker .picker-days .other-month{
        color: #c0c4cc;
    }

    .date-picker .picker-days .is-today{
        color: #409eff;
        font-weight: 700;
    }

    .date-picker .picker-days .is-select{
        border-radius: 50%;
        background: #409eff;
        color: #fff;
    }
</style>