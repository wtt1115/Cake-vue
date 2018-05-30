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

 var colData = [
    {
        key: 'username',
        remind: 'the username',
        text: '手机号码'
    },{
        key: 'password',
        remind: 'the password',
        text: '密码'
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
        supportRemind: true,
        isCombSorting:  true,
        supportAjaxPage: true,
        supportSorting: true,
        ajax_url: "http://10.3.133.73:88/getuser",
        ajax_type: "GET",
        query: {pluginId: 1},
        pageSize: 20
    };
   
export default{

    mounted(){

            var table = document.querySelector('table[grid-name="' + this.option.gridManagerName + '"]');
            table.GM(this.option);
            
      
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
