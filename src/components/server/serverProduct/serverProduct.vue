<template>
        <div>
            <vue-grid-manager></vue-grid-manager>
            <div class="w-tuichu">
              <p>全屏可按ESC键退出</p>
            </div>
        </div>
        
</template>
<script type="text/javascript">
import '../../libs/biaoge/GridManager.css'
import '../../libs/biaoge/GridManager.js'
// 请求数据渲染表头以及下面的表体
 var colData = [
        {
            key: 'name',
            remind: 'the name',
            text: '产品名称',
        },{
            key: 'en_name',
            remind: 'the en_name',
            text: '产品描述'
        },{
            key: 'price',
            remind: 'the price',
            text: '产品价格'
        },{
            key: 'img_url',
            remind: 'the img_url',
            text: '产品图片'
        },{
            key: 'spec',
            remind: 'the spec',
            text: '规格'
        },{
            key: 'action',
            remind: 'the action',
            width: '90px',
            text: '操作',
            template: function(action, rowObject){
                return '<input type="button" class="plugin-action edit-action edit" learnLink-id="'+rowObject.id+'" value="编辑">'
                        +'<input type="button" class="plugin-action del-action del" learnLink-id="'+rowObject.id+'" value="删除">';
            }
        }];

    var option = {
        gridManagerName: "testVue",
        height: "680px",
        columnData: colData,
        supportRemind: true,//切换列
        isCombSorting:  true,
        supportAjaxPage: true,
        supportSorting: true,
        ajax_url: "http://10.3.133.73:88/getProduct",
        ajax_type: "POST",
        query: {pluginId: 1},
        pageSize: 20
    };
   
  
        // if(document.getElementsByTagName('td').innerHTML == undefined){
        //     document.getElementsByTagName('td').innerHTML='';
        // }
    
export default{

    mounted(){

            var table = document.querySelector('table[grid-name="' + this.option.gridManagerName + '"]');
            table.GM(this.option);
            
            // console.log(document.getElementsByTagName('td'))
            var ww = document.querySelectorAll('td');
            console.log(ww.length)
            for(var i=0;i<ww.length;i++){
                console.log(ww[i].innerText);
            }
           
      
    },
    data(){
        return{
            name: "testVue",
            option: option
        }  
    },
    components: {
            'vue-grid-manager': {
                template: '<table v-bind:grid-name="name"></table>',
                data: function () {
                    return {
                        name: option.gridManagerName
                    }
                }
            }
    }

}



</script>
