<template>
    <div class="hole">
        <div class="head">
          <ul class="box1">
            <li> 
              <router-link to="/account"> 
                <i class="fa fa-angle-left " ></i>
              </router-link>
            </li>
            <li>我的信息</li>
            <li></li>
          </ul>
        </div>
        <div class="box2">
            <ul class="box4">
                <li>
                <label class="label">账号</label>
                    <input type="text"v-show="showl"/><i>{{username}}</i>
                </li>
                <li> <label class="label">生日</label>
                    <input type="text" /></li>
                <li> <label class="label">性别</label>
                    <input type="text" /></li>
                <li> <label class="label">昵称</label>
                    <input type="text" /></li>
                
            </ul>
        </div>
        <div class="bao">
        <input type="button"  value="保存"  class="cun" @click="baocun"/>
    </div>

      
    </div>
</template>
    <script>
    import './xinxi.scss'
    import http from '../../../../utils/httpclient.js'
        export default{
            data(){
                return {
                     username:'',
                     show:true,
                     showl:false
                }
            },
            mounted(){
            let username = window.localStorage.getItem('username');
            http.post('getStatus',{}).then((res) =>{
                if(res.status && username){
                    console.log(res)
                     this.username = username;
                    this.shoe = true;
                } 
            })

          },
              methods:{
                baocun(){
                    
                }
              }

        }
    </script>