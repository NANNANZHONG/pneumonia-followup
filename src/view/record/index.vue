<template>
<div>
  <div class="header">
    <div @click="selectDay">第1天</div>
    <div>第1天</div>
    <div>第1天</div>
    <div>第1天</div>
    <div>第1天</div>
    <div>第1天</div>
    <div>第1天</div>
    <div>第1天</div>
    <div>第1天</div>
  </div>
  <div class="content body-box-shadow">
    <van-cell title="日期" input-align="right"  :value="pneumoniaDate" />
    <van-cell title="目前所在地址" :value="areas" is-link @click="show=true"/>
    <van-cell title="您是否伴随以下症状（多选）"  />
    <div class="bg-white pd-10b">
      <van-row>
        <van-col span="8" v-for="item in dictionary" :key="item.code" class="pd-5">
          <van-button type="info" :plain="!item.active" hairline block round  size="small" @click="toggleActive(item)">{{item.name}}</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
  <div class="button-wrap">
    <van-button size="large" @click="submit" type="info" round >提交</van-button>
  </div>
  <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '60%' }"
  >
    <van-area :area-list="areaList" value="" :columns-placeholder="['请选择', '请选择', '请选择']" @confirm="onConfirm" @cancel="show=false"/>
  </van-popup>
</div>
</template>
<script>
  import { Field, Button, Area ,Popup ,Cell,Col, Row,Grid, GridItem } from 'vant'
  import area from '@/util/area'
  import Vue from 'vue'
  export default {
    name: 'record',
    data () {
      return {
        id: this.$route.params.id,
        dateList:[],
        dictionary:[],
        areaList:area,
        areas:'',
        pneumoniaDate:'',
        symptomCode:[],
        symptomName:[],
        show:false
      }
    },
    beforeCreate () {
      this.$axios.get(`/pneumonia/dictionary/listDictionaryByType?type=2`).then(res => {
        this.dictionary = res.data
        console.warn(res)
      })
      this.$axios.get(`/pneumonia/details/get-patientId?patientId=`+this.id).then(res => {
        console.warn(res)
        // this.dictionary = res.data
      })
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
      toggleActive(item){
        if(item.active){
          Vue.set(item,'active',false);
        }else{
          Vue.set(item,'active',true);
        }
        for(let i = 0; i < this.dictionary.length; i++){
          if(this.dictionary[i].active && this.dictionary[i].name ==='都没有' && item.name !== '都没有'){
            this.dictionary[i].active = false;
          }
          if(this.dictionary[i].active && this.dictionary[i].name !=='都没有' && item.name === '都没有'){
            this.dictionary[i].active = false;
          }
        }
      },
      selectDay() {
        /*        if(item.active){

        }*/
      }
    },
    computed: {
      symptomCode () {
        const symptomCode =[];
        for(let i = 0; i < this.dictionary.length; i++){
          this.dictionary[i].active && symptomCode.push()
        }
        return symptomCode
      },
      symptomName (){

      }
    },
    components: {
      [Field.name]: Field,
      [Button.name]: Button,
      [Area.name]: Area,
      [Popup.name]: Popup,
      [Cell.name]: Cell,
      [GridItem.name]: GridItem,
      [Col.name]: Col,
      [Row.name]: Row,
      [Grid.name]: Grid
  }
  }
</script>
<style lang="scss" scoped>
  .header{
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling:touch;
    div{
      padding:20px 0 0;
      width: 80px;
      text-align: center;
      color: #666;
      &:after{
        content: '●';
        display:block;

      }
    }
  }
  .content{
    height: 100%;
    margin-top: 5px;
    box-sizing: border-box;
    .pd-5{
      padding: 5px 10px;
    }
  }
  .button-wrap{
    height: auto;
    margin: 25px 15px;
  }
  .pd-10b{
    padding-bottom: 10px;
  }

  .primary{
    color: #3995FF ;
  }
  .danger{
    color: #F58723    ;
  }
  .error{
    color: #FF4444    ;
  }
</style>
