<template>
  <div>
    <div class="legend">
      <p>
        <span class="bar bar-blue"></span>
        <span class="text">90分</span>
      </p>
      <p>
        <span class="bar bar-green"></span>
        <span class="text">100分</span>
      </p>
      <p>
        <span class="bar bar-yellow"></span>
        <span class="text">95分</span>
      </p>
      <p>
        <span class="bar bar-red"></span>
        <span class="text">93分</span>
      </p>
    </div>
    <div id="echarts-bar"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const myChart = this.$echarts.init(document.getElementById('echarts-bar'));
    myChart.setOption({
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['第一组', '第二组', '第三组', '第四组'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            {
              value: 20,
              itemStyle: {
                color: '#748EDE',
              },
            },
            {
              value: 34,
              itemStyle: {
                color: '#9ECF8E',
              },
            },
            {
              value: 28,
              itemStyle: {
                color: '#F6DC7D',
              },
            },
            {
              value: 24,
              itemStyle: {
                color: '#F6868A',
              },
            },
          ],
          type: 'bar',
        },
      ],
    });
  },
};
</script>

<style scoped>
#echarts-bar{
  width: 500px;
  height: 500px;
  margin: 3px auto;
}
.legend{
  width: 500px;
  height: 15px;
  margin: 50px auto 0;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  border: 1px solid transparent;
}
.legend .bar{
  display: inline-block;
  width: 25px;
  height: 15px;
  vertical-align: middle;
  border-radius: 5px;
  margin: 0 3px;
}
.legend .bar-blue{
  background: #748EDE;
}
.legend .bar-green{
  background: #9ECF8E;
}
.legend .bar-yellow{
  background: #F6DC7D;
}
.legend .bar-red{
  background: #F6868A;
}
.legend .text{
  vertical-align: middle;
}
</style>
