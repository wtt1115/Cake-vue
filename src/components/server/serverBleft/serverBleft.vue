<template>
        <div class="serverBleft">
            <ul>
                <li v-for="obj in menus" :key="obj.path">
                    <router-link :to="obj.path">
                        {{obj.text}}
                    </router-link>
                </li>
            </ul>
       
            
        </div>
        
</template>
<script>
   import './serverBleft.scss' 




    export default{
        data(){
            return{
                menus:[
                    {path:'/serverBackground/serverUser',text:'用户管理'},
                    {path:'/serverBackground/serverProduct',text:'商品管理'},
                ]
            }
        }
    }
    
</script>