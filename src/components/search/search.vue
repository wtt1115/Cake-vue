<template>
    <div class="f-search">
        <header class="search-header">
            <ul class="header-ul">
                <li @click="toIndex">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </li>
                <li>
                    <i class="fa fa-search fdj" aria-hidden="true"></i>
                    <input type="text" class="header-input" placeholder="搜索商品" ref="searchBox"/>
                </li>
                <li @click="toList()">
                    <span>搜索</span>
                </li>
            </ul>
        </header>
        <main class="search-main">
            <h3 class="search-title">热门搜索</h3>
            <div class="search-img" >
                <img src="http://m.21cake.com/upload/images/7baa87117f830d64d22b1ef255b13eea.jpg" data-text="浅草" @click="imgToList($event)">
            </div>
            <ul class="search-content">
                <li v-for="(obj,idx) in defaultWord" :key="idx">
                    <span @click="getText($event)">{{obj}}</span>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
    import './search.scss';
    export default{
        data(){
            return {
                defaultWord:['浅草','百利甜情人','芒果奶油','榴莲','桂圆冰淇淋'],
                keyWord :''
            }
        },
        mounted(){
            // 输入框自动聚焦
            this.$refs.searchBox.focus();
        },
        methods:{
            // 封一个搜索关键字的函数
            toList(){
                let keyWord = this.$refs.searchBox.value;
                if(keyWord.length < 1){
                    return;
                }
                // 将关键字发送给列表页
                this.$router.push({name:'list',query:{keyWord}});
            },
            // 封一个退回路由的函数
            toIndex(){
                // this.$router.go(-1);
                this.$router.push('/');
            },
            // 封一个获取关键字的函数
            getText(e){
                let keyWord = e.target.innerText;
                if(keyWord){
                    // 将关键字发送给列表页
                    this.$router.push({name:'list',query:{keyWord}});
                }
            },
            // 封一个点击图片跳转到列表的函数
            imgToList(e){
                let keyWord = e.target.dataset.text;
                if(keyWord){
                    // 将关键字发送给列表页
                    this.$router.push({name:'list',query:{keyWord}});
                }
            }
        }

    }
</script>