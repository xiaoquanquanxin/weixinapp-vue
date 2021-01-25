<template>
    <div class="container">

        <button @click="getPujiSearchCase">获取客诉订单列表接口</button>
        <button @click="getWorkOrder">客诉详情</button>
        <button @click="taskHistory">客诉处理状态历史接口</button>
        <button @click="evaluationItems">评价项</button>
<!--        <button @click="newEvaluationItems">新评价项</button>-->
        <button @click="newWorkOrder">同步客诉单</button>
        <button @click="submitScore">提交评价(返回 400)</button>
        <button @click="viewReviews">查看评价</button>
<!--        <button @click="newViewReviews">新查看评价</button>-->
        <button @click="progressTracking">工单进度跟踪接口</button>
        <button @click="newPujiSearchCase">客诉订单二期列表接口（手机号要求esa加密）</button>
    </div>
</template>

<script>
  import $ from "jquery";
  import {createHeader, ipUri} from "../../main";
  import {encrypt} from './aes'

  export default {
    name: "PaymentList",
    data() {
      return {
        custId: "",  // 客户id
        roomName: "",
        roomId: "", //   房间id
        id: "", //   客诉id
      }
    },

    created() {
      document.title = "欠缴账单列表"
      //  获取房间列表
      this.getRoomList();

    },
    methods: {
      getRoomList() {
        $.ajax({
          type: "POST",
          url: `${ipUri["/bpi"]}/getPmdRooms.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {
            wxUserID: "5"
          },
          success: (result) => {

            this.custId = result.data[0].cmdsId
            this.roomId = result.data[0].roomId
            this.roomName = result.data[0].roomName
          }
        })
      },

      // 客诉订单列表接口
      getPujiSearchCase() {

        let time = Date.now()
        console.log(window.md5("7AYzorn2RSbhED2K" + "_" + time + "_" + "JSWdDBcDY62tL3hrVWTl5EylNnh2FHrY").toUpperCase())
        let data = {
          customerName: this.custId,           // 客户主数据id
          contactNumber: '15712852037',     // 通常手机号
          appealNature: 1,      // 诉求性质: 1.报事报修,2:咨询建议
          pageNo: 1,
          pageSize: 10
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: {
            appkey: "7AYzorn2RSbhED2K",
            t: time,
            sign: window.md5("7AYzorn2RSbhED2K" + "_" + time + "_" + "JSWdDBcDY62tL3hrVWTl5EylNnh2FHrY").toUpperCase()
          },
          url: `${ipUri["/wpi"]}/pujiSearchCase`,
          // url: `/wpi/pujiSearchCase`,
          data: data,
          success: (res) => {
            console.log(res)
            this.id = res.data.datas[0].id
          }
        })
      },
      // 客诉详情接口
      getWorkOrder() {
        let time = Date.now()
        let data = {
          id: this.id,
          workId: "",  // 工单id (不必填)
          reportResponsibility: "",  // 1：物业   2：地产 (不必填)

        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: {
            appkey: "7AYzorn2RSbhED2K",
            t: time,
            sign: window.md5("7AYzorn2RSbhED2K" + "_" + time + "_" + "JSWdDBcDY62tL3hrVWTl5EylNnh2FHrY").toUpperCase()
          },
          // url: `/wpi/getWorkOrder`,
          url: `${ipUri["/wpi"]}/getWorkOrder`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      //	客诉单同步接口(报事报修和咨询建议)
      newWorkOrder() {
        //   写死内容取 userinfo 接口返回数据  ※※※※※※※※※※※※※※※※※※
        let data = {
          custId: this.custId,           // 客户主数据id
          appealNature: 1,               // 诉求性质: 1.报事报修,2:咨询建议
          contactNumber: 1254545454,              // 通常手机号
          problemDescription: '啊打发打发是否',                // 客诉描述详情
          contactAddress: '发发打发的',                // 联系地址
          petitioner: 'fdaffds',                // 客诉报事/报修人 (不必填)
          pkRoom: this.roomId,                // 房间ID，同项目主数据
          roomName: this.roomName,                // 房间名称，同项目主数据
          appointmentTime: '',                // 预约时间 （不必填）
          imageCollection: '',                // 图片附件	以“，”逗号分隔，url格式 （不必填）
          recordCollection: '',                // 语音文件	以“，”逗号分隔，url格式 （不必填） 应该不需要这个参数 暂时先写上
          receptionistTime: '2021-1-22',                // 接待时间
          pkHachiId: "ffff",                // 创建人	客诉创建人
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "POST",
          headers: createHeader(),
          // url: `/wpi/newWorkOrder`,
          url: `${ipUri["/wpi"]}/newWorkOrder`,
          data,
          success: (res) => {
            console.log(res)
            this.id = res.data.id
          }
        })
      },
      //  客诉处理状态历史接口
      taskHistory() {
        let time = Date.now()
        let data = {
          id: this.id,
          workId: "",  // 工单id (不必填)
          reportResponsibility: "",  // 1：物业   2：地产 (不必填)

        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: {
            appkey: "7AYzorn2RSbhED2K",
            t: time,
            sign: window.md5("7AYzorn2RSbhED2K" + "_" + time + "_" + "JSWdDBcDY62tL3hrVWTl5EylNnh2FHrY").toUpperCase()
          },
          // url: `/wpi/taskHistory`,
          url: `${ipUri["/wpi"]}/taskHistory`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      //	评价项
      evaluationItems() {
        let data = {
          reportResponsibility: 2,  // 1：物业   2：地产
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: createHeader(),
          // url: `/wpi/evaluationItems`,
          url: `${ipUri["/wpi"]}/evaluationItems`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      //  提交评价
      submitScore() {
        // 评价参数  userId:提交id id:客诉id;    describe:回访描述   evaluateInfo:评价信息；fieldvalue：字段值;  fieldtype:字段类型；fieldname：字段名称
        const data = {
          evaluateParams: {
            "userId": "yongdi",
            "id": this.id,
            "describe": "aaaabb",
            "evaluateInfo": [{"fieldvalue": "1", "fieldname": "wywx10", "fieldtype": "1"}, {
              "fieldvalue": "1",
              "fieldname": "wywx20",
              "fieldtype": "1"
            }, {"fieldvalue": "1", "fieldname": "wywx30", "fieldtype": "1"}, {
              "fieldvalue": "5",
              "fieldname": "wywx40",
              "fieldtype": "2"
            }]
          }
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "POST",
          headers: createHeader(),
          // url: `/wpi/submitScore`,
          url: `${ipUri["/wpi"]}/submitScore`,
          data: JSON.stringify(data),
          success: (res) => {
            console.log(res)
          }
        })
      },
      //  	查看评价
      viewReviews() {
        let data = {
          reportResponsibility: 2,  // 1：物业   2：地产
          id: this.id  // 客诉id
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: createHeader(),
          // url: `/wpi/viewReviews`,
          url: `${ipUri["/wpi"]}/viewReviews`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      // 	工单进度跟踪接口
      progressTracking() {
        let data = {
          id: this.id  // 客诉id
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: createHeader(),
          // url: `/wpi/progressTracking`,
          url: `${ipUri["/wpi"]}/progressTracking`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      //	客诉订单二期列表接口
      newPujiSearchCase() {
        // var key = "HaChiSmart++++++";
        // var iv = "tdrdadq59tbss5n7";

        // aes 加密
        let pazzword = encrypt('15712852037');
        console.log(pazzword)
        let data = {
          custId: this.custId,  // 客户主数据id
          contactNumber: pazzword,  // 联系号码
          appealNature: 1,  // 诉求性质: 1.报事报修,2:咨询建议
          pageNo: 1,  // 诉求性质: 1.报事报修,2:咨询建议
          pageSize: 10,  // 诉求性质: 1.报事报修,2:咨询建议
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: createHeader(),
          // url: `/wpi/newPujiSearchCase`,
          url: `${ipUri["/wpi"]}/newPujiSearchCase`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      //	评价项 (新)
      newEvaluationItems() {
        let data = {
          reportResponsibility: 2,  // 1：物业   2：地产
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: createHeader(),
          // url: `/wpi/newEvaluationItems`,
          url: `${ipUri["/wpi"]}/newEvaluationItems`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      //  	查看评价（新）
      newViewReviews() {
        let data = {
          reportResponsibility: 2,  // 1：物业   2：地产
          id: this.id  // 客诉id
        }
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "get",
          headers: createHeader(),
          // url: `/wpi/newViewReviews`,
          url: `${ipUri["/wpi"]}/newViewReviews`,
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },

    }
  }
</script>

<style scoped lang="less">
    @import '~@/assets/css/common.less';

    .container {
        height: 100%;
        font-size: 0.16rem;
    }

    .banner {
        height: 1.29rem;
        background-image: url("~@/assets/images/banner.png");
        background-size: cover;
        flex: none;
        text-align: center;

        p {
            margin: 0;
            padding-top: 0.19rem;
            font-size: 0.26rem;
            /*font-weight: bold;*/
            color: #FFFFFF;
            line-height: 0.37rem;
            /*text-align: center;*/
        }

        span {
            font-size: 0.12rem;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 0.17rem;
            opacity: 0.75;
        }

        div {
            width: 92%;
            height: 0.3rem;
            color: #ffffff;
            margin: 0 auto;
            text-align: left;
            padding: 0.06rem 0.1rem;
            padding-right: 0.35rem;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.14);
            background-image: url("~@/assets/images/right.png");
            background-size: 0.07rem 0.11rem;
            background-repeat: no-repeat;
            background-position: center right 0.1rem;
            font-size: 0.13rem;

            margin-top: 0.08rem;
            opacity: 0.75;
        }
    }

    button {
        height: 40px;
        margin-bottom: 20px;
    }
</style>