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
      tooltip: {
        trigger: 'item',
        formatter: (e) => {
          console.log(e);
          return `
          <div style="display:flex;">
            <div style="displaty:inline-block;">
              <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e.color};"></span>
              <span style="display:inline-block;">${e.name}</span>
            </div>
            <div style="displaty:inline-block; margin-left:10px; font-weight: bold;">${e.data.value}分</div>
          </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: ['第一组', '第二组', '第三组', '第四组'],
        axisLabel: {
          textStyle: {
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            {
              value: 98,
              itemStyle: {
                color: '#748EDE',
              },
            },
            {
              value: 100,
              itemStyle: {
                color: '#9ECF8E',
              },
            },
            {
              value: 95,
              itemStyle: {
                color: '#F6DC7D',
              },
            },
            {
              value: 93,
              itemStyle: {
                color: '#F6868A',
              },
            },
          ],
          type: 'bar',
        },
      ],
    });
    myChart.on('click', (e) => {
      console.log(e.name, '123');
      if (e.name === '第二组') {
        // this.$FileSaver.saveAs('http://localhost:8080/第二组作业.xlsx', '第二组作业.xlsx');
        // eslint-disable-next-line no-restricted-globals
        window.open(`http://${location.hostname}:${location.port || this.$prot}/%E7%AC%AC%E4%BA%8C%E7%BB%84%E4%BD%9C%E4%B8%9A.html`, '_blank');
      }
    });
  },
};
</script>

<style scoped>
#echarts-bar{
  width: 500px;
  height: 500px;
  padding-top: 3px;
  margin: 0 auto;
}
.legend{
  width: 500px;
  height: 15px;
  padding-top: 50px;
  margin: 0 auto 0;
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
.legend  p {
  cursor: pointer;
  z-index: 999;
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
