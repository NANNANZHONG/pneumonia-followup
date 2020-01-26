<template>
<div>
  <div class="content body-box-shadow">
    <van-steps :active="active">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <van-field  v-model="text" input-align="right" label="姓名" />
    <van-cell v-if="fromType=='3'" title="与您的关系" :value="relationName" is-link @click="show3=true"/>
    <van-cell v-if="fromType!=='1'"  title="离开武汉日期" :value="date" is-link @click="show2=true"/>
    <van-cell title="目前所在地址" :value="areas" is-link @click="show=true"/>
    <van-field v-if="fromType=='3'"  v-model="patientMobile" input-align="right" type="tel" label="他的手机号" />
  </div>
  <div class="button-wrap">
    <van-button size="large" @click="submit" type="info" round >{{fromType!=='3' ? '下一步' : '提交'}}</van-button>
  </div>
  <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '60%' }"
  >
    <van-area :area-list="areaList" value="area" :columns-placeholder="['请选择', '请选择', '请选择']" @confirm="onConfirm" @cancel="show=false"/>
  </van-popup>
  <van-popup
          v-model="show2"
          position="bottom"
          :style="{ height: '60%' }"
  >
    <van-datetime-picker
            v-model="currentDate"
            type="date"
            @confirm="dateConfirm"
            @cancel="show2=false"
    />
  </van-popup>
  <van-popup
          v-model="show3"
          position="bottom"
          :style="{ height: '50%' }"
  >
    <van-picker :columns="columns"  @change="onRelationConfirm" />
  </van-popup>
</div>
</template>
<script>
  import { Field, Button, Area ,Popup ,Cell,DatetimePicker,Picker,Step, Steps } from 'vant'
  import area from '@/util/area'
  export default {
    name: 'record',
    data () {
      return {
        id: this.$route.params.id,
        active: 2,
        text: '',
        patientMobile: '',
        areaCode: '',
        areas: '',
        name: '',
        currentDate: new Date(),
        date: '',
        relationName: '',
        areaList:area,
        show:false,
        show2:false,
        show3:false,
        columns:['邻居','亲戚','朋友','其他']
      }
    },
    methods: {
      submit () {
        let data = {}
        this.$axios.post('/user/login', data).then(res => {
          if (res.success) {
            this.$router.push('/record')
          } else {
            alert('失败')
          }
        })
      },
      onConfirm(val){
        console.warn(val)
        this.areas = val[0].name + ' '+ val[1].name  + ' '+ val[2].name
        this.show = false

      },
      dateConfirm(val){
        console.warn(val)
        this.show2 = false
        this.date= this.formatDate(val)
        console.warn(this.formatDate(val))
      },
      onRelationConfirm(picker, value){
        console.warn(value)
        this.show3 = false
        this.relationName = value
      },
      formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      }
    },
    components: {
      [Field.name]: Field,
      [Button.name]: Button,
      [Area.name]: Area,
      [Popup.name]: Popup,
      [Cell.name]: Cell,
      [DatetimePicker.name]: DatetimePicker,
      [Steps.name]: Steps,
      [Step.name]: Step,
      [Picker.name]: Picker
  }
  }
</script>
<style lang="scss" scoped>
  .content{
    height: 100%;
    margin: 25px 15px;
    box-sizing: border-box;
  }
  .button-wrap{
    height: auto;
    margin: 25px 15px;
  }


</style>
