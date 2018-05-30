<template>
    <div id="foot">
        <router-link to="/">
            <li ref="index"><i class="fa fa-home"></i><span>首页</span></li>
        </router-link>
        <router-link to="/classfiy">
        <li ref="classfiy"><i class="fa fa-bars"></i><span>分类</span></li>
        </router-link>
        <router-link to="/car">
        <li ref="car"><i class="fa fa-shopping-cart"></i><span>购物车</span><span class="carCount">{{this.$store.state.carListLen}}</span></li>
        </router-link>
        <router-link to="/community">
        <li ref="community"><i class="fa fa-envelope-o"></i><span>社区</span></li>
        </router-link>
        <router-link to="/users"> 
        <li ref="users"><i class="fa fa-user-o"></i><span>我</span></li>
        </router-link>
    </div>
</template>

<script>

    import './foot.scss'

    export default{
        mounted(){
            // console.log(this.$router.history.current.path)
                if(this.$router.history.current.path=='/'){
                    // console.log(this.$refs.index);
                    this.$refs.index.classList.add('active');

                }else if(this.$router.history.current.path=='/classfiy'){
                     this.$refs.classfiy.classList.add('active');
                }else if(this.$router.history.current.path=='/community'){
                     this.$refs.community.classList.add('active');
                }else if(this.$router.history.current.path=='/car'){
                     this.$refs.car.classList.add('active');
                }else if(this.$router.history.current.path=='/users'){
                     this.$refs.users.classList.add('active');
                }
        }
    }

</script>