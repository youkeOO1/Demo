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
        // eslint-disable-next-line arrow-body-style
        formatter: (e) => {
          return `
          <div style="margin-bottom: 10px">${e.seriesName}</div>
          <div style="display:flex;">
            <div style="displaty:inline-block;">
              <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e.color};"></span>
              <span style="display:inline-block;">${e.data.name}</span>
            </div>
            <div style="displaty:inline-block; margin-left:10px; font-weight: bold;">${e.data.value}人</div>
          </div>
          `;
        },
      },
      textStyle: {
        color: '#fff',
        fontSize: '18',
      },
      legend: {
        // orient: 'vertical',
        type: 'scroll',
        left: 'center',
        bottom: '80px',
        // top: '30px',
        textStyle: {
          color: '#000',
        },
      },
      series: [
        {
          name: '成绩',
          type: 'pie',
          radius: '50%',
          center: ['50%', '40%'],
          data: [
            {
              value: 12,
              name: '95分以上',
            },
            {
              value: 3,
              name: '90-95分',
            },
            {
              value: 1,
              name: '85-90分',
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(255, 0, 0, 0.5)',
            },
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 1)',
            },
          },
          label: {
            textStyle: {
              color: 'rgba(255, 0, 0, 1)',
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
  margin: 0 auto;
  /* padding-top: 30px; */
  box-sizing: border-box;
}
</style>
