<template>
  <div class="pd-10">
    <div class="content">
      <h2 class="text-center">武汉新型肺炎风险人员跟踪</h2>
      <div class="text">
        如果您来自疫区，您曾到过武汉，或接触过从武汉回来的人员，尽量不去接触别人，持续观察自己的健康状况14天！请自觉居家观察14天！这是一种觉悟，一种责任，也关乎您和您家人的健康！谢谢您！
      </div>
    </div>
    <div class="text-center mg-10t count">平台已经有<span class="number">{{number}}</span>人填写报告</div>
    <van-button  type="info" block class="mg-25t" round @click="toWrite('1')">我正在武汉</van-button>
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
    margin-top: 20px;
  }
  .content{
    padding: 10px;
    background-image: linear-gradient(-180deg, #326CD7 0%, #103863 100%);
    box-shadow: 0 2px 12px 0 rgba(45,84,135,0.39);
    border-radius: 8px;
    color: #fff;
    .text{
      font-size: 1rem;
      padding: 10px;
      line-height: 2rem;
    }
  }
  .number{
    color: red;
    margin: 0 5px;
  }
  .mg-25t{
    margin-top: 25px;
  }
  .count{
    /*font-weight: bold;*/
  }

</style>
