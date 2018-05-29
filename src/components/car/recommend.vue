<template>
    <div class="recommend-c">
        <h2>• 推荐商品 •</h2>
        <ul>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span @click="addCar"><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
            <li>
                <img src="http://cs.21cake.com/public/images/2c/6c/6d/3942d4bcfd0d09f48714a9f5b5997290.jpg?1511400718#h">
                <p>方形蜡烛</p>
                <p><span>￥5.00</span><span><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
        </ul>
    </div>
</template>
<script>
import './recommend.scss'
    export default {
        props:['carlist'],
        methods:{
            addCar(){
                console.log(this.carlist);
                
            }
        }
    }
</script>

