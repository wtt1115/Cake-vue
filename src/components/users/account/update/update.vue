<template>
    <div class="hole">
        <div class="head">
          <ul class="box1">
            <li> 
              <router-link to="/account"> 
                <i class="fa fa-angle-left " ></i>
              </router-link>
            </li>
            <li>修改密码</li>
            <li></li>
          </ul>
        </div>
        <div class="box2">
            <ul class="box5">
                <li> 
                    <label class="label">旧密码</label>
                        <input type="password" placeholder="输入旧密码" v-model="data.password" /> 
                </li>
                <li> 
                    <label class="label">新密码</label>
                        <input type="password" placeholder="输入新密码" v-model="data.newpassword"/>
                     
                </li>
                <li> 
                    <label class="label">再次输入</label>
                        <input type="password" placeholder="再次输入新密码" v-model="pwd"/>
                </li>
                <!-- <li> 
                       <span  v-text="errot" v-show="show" calss="fa fa-info-circle"></span>
                </li> -->
            </ul>
            <div class="t1">
                <p>修改成功</p>
            </div>
            <div class="t2">
                <p>输入相同密码</p>
            </div>
        </div>
        <div class="bao">
            <h4>密码由8-20位英文字母，数字或符号组成</h4>
            <input type="button"  value="确认"  class="cun" @click="queren "/>
        </div>
    </div>
</template>
    <script>
    import $ from 'jquery'
    import './update.scss'
    import http from '../../../../utils/httpclient.js'
    import router from '../../../../router/router.js'
        export default{
            data(){
                return {
                    data:{ 
                        username:'',
                       password:'',
                       newpassword:''
                    },
                    pwd:'',
                    show:true,
                    showl:false,
                    errot:''
                }
            },
            methods:{ 
                queren(){
                   let username = window.localStorage.getItem('username');
                   console.log(username)
                    let userdata = {
                        username:username,
                        password:this.data.password,
                        newpassword:this.data.newpassword,
                        type:'password'
                    }
                    console.log(userdata)
                    http.post('update',userdata).then((res) =>{ 
                        console.log(res)
                        if(res.status){

                            if(this.pwd == userdata.newpassword){

                                $(".t1").show().delay(2000).hide(0);
                                    setTimeout(function(){
                                        router.push({name:'users'})
                                    },1000)
                            }else{
                                 $(".t2").show().delay(3000).hide(0);
                                 return;
                            }
                        }
                    }) 
                }
            }

        }
    </script>