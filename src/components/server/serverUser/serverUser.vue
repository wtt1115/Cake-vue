<template>
        <div>
            <!-- 搜索 -->
            <div class="w-sousuo">
                <input type="text" class="w-input"/>
                <input type="button" value="搜索" class="w-search"/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>昵称</th>
                        <th>密码</th>
                        <th>性别</th>
                        <th>生日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(obj,idx) in dataset">
                        <td>{{obj.username}}</td>
                        <td>{{obj.nickname}}</td>
                        <td>{{obj.password}}</td>
                        <td>{{obj.gender}}</td>
                        <td>{{obj.birthday}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="w-tuichu">
              <p>全屏可按ESC键退出</p>
            </div>
        </div>
        
</template>
<script type="text/javascript">
import '../../css/server.css'
import http from '../../../utils/httpclient.js'
    export default{
        data(){
            return {
                dataset:[]
            }
        },
         mounted(){
            http.get("getuser",{}).then(res=>{
                console.log(res)
                this.dataset = res.data.data;
            })
        }
    }
</script>