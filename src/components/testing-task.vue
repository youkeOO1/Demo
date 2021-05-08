<template>
  <div id="echarts-pie"></div>
</template>

<script>

export default {
  mounted() {
    const myChart = this.$echarts.init(document.getElementById('echarts-pie'));
    myChart.setOption({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '成绩',
          type: 'pie',
          radius: '50%',
          data: [
            {
              value: 70,
              name: '95分以上',
            },
            {
              value: 20,
              name: '90-95分',
            },
            {
              value: 10,
              name: '85-90分',
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
#echarts-pie{
  width: 500px;
  height: 500px;
  margin: 50px auto;
}
</style>
