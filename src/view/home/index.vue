<template>
  <div class="pd-10">
    <h2 class="text-center">武汉新型肺炎风险人员跟踪</h2>
    <div class="content body-box-shadow">
      如果您来自疫区，您曾到过武汉，或接触过从武汉回来的人员，尽量不去接触别人，持续观察自己的健康状况14天！请自觉居家观察14天！这是一种觉悟，一种责任，也关乎您和您家人的健康！谢谢您！
    </div>
    <div class="text-center mg-10t count">平台已经有【<span class="number">{{number}}</span>】人填写报告</div>
    <van-button  type="info" block class="mg-10t" round @click="toWrite('1')">我正在武汉</van-button>
    <van-button  type="info" block class="mg-10t" round @click="toWrite('2')">我去过武汉</van-button>
    <van-button  type="info" block class="mg-10t" round @click="toWrite('3')">上报身边的武汉人</van-button>
  </div>
</template>
<script>
import { Panel, Button } from 'vant'
export default {
  name: 'home',
  data () {
    return {
      number: 0
    }
  },
  methods: {
    toWrite (type) {
      this.$router.push('/report/'+type)
    }
  },
  components: {
    [Panel.name]: Panel,
    [Button.name]: Button,
  }
}
</script>
<style lang="scss" scoped>
  .mg-10t{
    margin-top: 10px;
  }
  .content{
    font-size: 1.2rem;
    line-height: 2rem;
    text-indent:2em;
    padding: 5px;
  }
  .number{
    color: red;
    font-size: 1.2em;
  }
  .count{
    font-weight: bold;
  }
</style>
