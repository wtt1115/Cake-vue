<template>
        <div>
            <h1>用户管理</h1>
            <vue-grid-manager></vue-grid-manager>
            
        </div>
        
</template>
<script type="text/javascript">
import '../../libs/biaoge/GridManager.css'
import '../../libs/biaoge/GridManager.js'
export default{
    
     
        // // mounted(){
        // //     var colData = [
        // //     {
        // //         key: 'name',
        // //         remind: 'the name',
        // //         width: '100px',
        // //         text: '名称',
        // //         sorting: ''
        // //     },{
        // //         key: 'info',
        // //         remind: 'the info',
        // //         text: '使用说明'
        // //     },{
        // //         key: 'url',
        // //         remind: 'the url',
        // //         text: 'url'
        // //     },{
        // //         key: 'createDate',
        // //         remind: 'the createDate',
        // //         width: '100px',
        // //         text: '创建时间',
        // //         sorting: 'DESC',
        // //         template: function(createDate, rowObject){
        // //             return new Date(createDate);
        // //         }
        // //     },{
        // //         key: 'lastDate',
        // //         remind: 'the lastDate',
        // //         width: '100px',
        // //         text: '最后修改时间',
        // //         sorting: '',
        // //         template: function(lastDate, rowObject){
        // //             return new Date(lastDate);
        // //         }
        // //     },{
        // //         key: 'action',
        // //         remind: 'the action',
        // //         width: '100px',
        // //         text: '操作',
        // //         template: function(action, rowObject){
        // //             return '<span class="plugin-action edit-action" learnLink-id="'+rowObject.id+'">编辑</span>'
        // //                     +'<span class="plugin-action del-action" learnLink-id="'+rowObject.id+'">删除</span>';
        // //         }
        // // }];
        // // var option = {
        // //     gridManagerName: "testVue",
        // //     height: "400px",
        // //     columnData: colData,
        // //     supportRemind: true,
        // //     isCombSorting:  true,
        // //     supportAjaxPage: true,
        // //     supportSorting: true,
        // //     ajax_url: "http://www.lovejavascript.com/learnLinkManager/getLearnLinkList",
        // //     ajax_type: "POST",
        // //     query: {pluginId: 1},
        // //     pageSize: 20
        // // };
        // //     var table = document.querySelector('table[grid-name="' + this.option.gridManagerName + '"]');
        // //     table.GM(this.option);
        // // } ,
        // data(){
        //     return{
        //         name: "testVue",
        //         option: option,
                
        //     }
        // },
        // components: {
        //         'vue-grid-manager': {
        //             template: '<table v-bind:grid-name="name"></table>',
        //             data: function () {
        //                 return {
        //                     name: option.gridManagerName
        //                 }
        //             }
        //         }
        //     },   
    }



</script>
