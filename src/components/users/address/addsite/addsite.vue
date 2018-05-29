<template>
        <div id="site">
            <div class="Stop">
                <ul class="StopUl">
                    <li><i class="fa fa-bars"></i></li>
                    <li><img src="http://static.21cake.com/themes/wap/img/logo.png" /></li>
                    <li><i class="fa fa-shopping-cart"></i></li>
                </ul>
            </div>
            <div class="Smain">
                <ul class="Msite">
                    <li><label for="username">姓名 : </label><input type="text"  placeholder="收货人姓名"></li>
                    <li><label for="username">手机 : </label><input type="text"  placeholder="收货人手机号"></li>
                    <li><label for="username">城市 : </label><input type="text"  placeholder="收货人姓名"></li>
                    <li><label for="username">地址 : </label><input type="text"  placeholder="收货地址"></li>
                    <li><label for="username"></label><input type="text"  placeholder="楼牌/门牌号，如A座101室"></li>
                </ul>
            </div>
            <div class="Sfoot">
                <button>添加</button>
            </div>
        </div>
        
</template>
<script>
    
    import '../address.scss'

    export default{
        components: {
        }
       
    }
    
</script>