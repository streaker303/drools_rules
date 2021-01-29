webpackJsonp([4],{SpCH:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("JA8L"),l={name:"alarm_type_config",data:function(){return{userDeleteAllDialog:!1,formLabelWidth:"140px",loading:!1,total_num:0,tableData:[],multipleSelection:[],get_params:{page:1,size:10,name:""},res:"",userDeleteDialog:!1,delIds:"",addDialog:!1,editDialog:!1,alarmTypeForm:{name:""},alarmTypeFormEdit:{id:"",name:""},rules:{name:[{required:!0,message:"请输入告警类型名称",trigger:"blur"}]}}},watch:{addDialog:{handler:function(t,e){t||this.$refs.alarmTypeForm.resetFields()}},editDialog:{handler:function(t,e){t||this.$refs.alarmTypeFormEdit.resetFields()}}},mounted:function(){var t=this;this.$nextTick(function(){t.get_data()})},methods:{deleteAll:function(){0!=this.multipleSelection.length?this.userDeleteAllDialog=!0:this.$message({message:"请先选择告警类型",type:"warning"})},indexMethod:function(t){return(this.get_params.page-1)*this.get_params.size+t+1},searchAssets:function(){this.get_params.page=1,this.get_data()},get_data:function(){var t=this;this.loading=!0,this.tableData=[];var e={queryData:{},paramsData:{name:this.get_params.name}};Object(i.h)(e).then(function(e){t.loading=!1;var a=e;a.length>0&&a.forEach(function(e){var a={};a.id=e.id,a.name=e.name,a.is_sys=e.is_sys,t.tableData.push(a)})}).catch(function(e){t.loading=!1})},addUser:function(){this.addDialog=!0},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;e.addAssets()})},addAssets:function(){var t=this,e={queryData:{},paramsData:{name:this.alarmTypeForm.name}};Object(i.o)(e).then(function(e){t.addDialog=!1,t.$message({message:"添加成功",type:"success"}),setTimeout(function(){t.get_data()},1500)}).catch(function(e){t.addDialog=!1})},editDevice:function(){var t=this,e={queryData:{},paramsData:{id:this.alarmTypeFormEdit.id,name:this.alarmTypeFormEdit.name}};Object(i.o)(e).then(function(e){t.editDialog=!1,t.$message({message:"修改成功",type:"success"}),setTimeout(function(){t.get_data()},1500)}).catch(function(e){t.editDialog=!1})},submitFormEdit:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;e.editDevice(!1)})},delUserBtn:function(t){this.delIds=t.id,this.userDeleteDialog=!0},handleDelete:function(){var t=this,e={queryData:{},paramsData:{id:this.delIds}};Object(i.b)(e).then(function(e){t.userDeleteDialog=!1,t.$message({message:"删除成功",type:"success"}),setTimeout(function(){t.get_data()},1500)}).catch(function(e){t.userDeleteDialog=!1})},handleSizeChange:function(t){this.get_params.size=t,this.get_data()},handleCurrentChange:function(t){this.get_params.page=t,this.get_data()},handleEdit:function(t){this.alarmTypeFormEdit={id:t.id,name:t.name},this.editDialog=!0},handleSelectionChange:function(t){this.multipleSelection=t}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"event event-wrapper"},[a("div",{staticClass:"ub w100 search-area",staticStyle:{"box-sizing":"border-box"}},[a("div",{staticClass:"ub ub-ac event-content w100"},[a("div",{staticClass:"ub ub-ver ub-ac ub-f1"},[a("el-row",{staticClass:"w100",staticStyle:{"border-radius":"0 0 5px 5px"},attrs:{type:"flex",align:"middle"}},[a("el-col",{staticClass:"event-btn-col",attrs:{span:12}},[a("el-form",{attrs:{model:t.get_params}},[a("el-form-item",{attrs:{label:"告警类型：","label-width":"90px"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:"",size:"small"},model:{value:t.get_params.name,callback:function(e){t.$set(t.get_params,"name","string"==typeof e?e.trim():e)},expression:"get_params.name"}})],1)],1)],1),t._v(" "),a("el-col",{staticClass:"ub ub-pe event-btn-col",attrs:{span:12}},[a("searchBtn",{attrs:{title:"搜 索"},on:{click:t.searchAssets}})],1)],1)],1)])]),t._v(" "),a("div",{staticClass:"attendance-list table-area",staticStyle:{"padding-bottom":"10px"}},[a("div",{staticClass:"ub ub-pj w100"},[a("div",{staticClass:"list-tips"},[t._v("列表内容")]),t._v(" "),a("div",{staticClass:"ub"},[a("addBtn",{attrs:{icon:"el-icon-plus",title:"添加类型"},on:{click:function(e){t.addDialog=!0}}})],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticClass:"bigTable full-table",attrs:{data:t.tableData,border:"",stripe:"","tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{align:"center",type:"index",width:"50",index:t.indexMethod,label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"告警类型名称"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.is_sys?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.handleEdit(e.row)}}},[t._v("编 辑")]):t._e(),t._v(" "),0===e.row.is_sys?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.delUserBtn(e.row)}}},[t._v("删 除")]):t._e(),t._v(" "),1===e.row.is_sys?a("el-button",{staticStyle:{color:"rgba(255, 255, 255, .5)"},attrs:{type:"text"}},[t._v("内置类型")]):t._e()]}}])})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"添加告警类型",visible:t.addDialog,width:"790px","custom-class":"attendance-dialog"},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{ref:"alarmTypeForm",staticClass:"unit",attrs:{model:t.alarmTypeForm,rules:t.rules,inline:!0}},[a("el-form-item",{attrs:{label:"告警类型名称：",prop:"name","label-width":t.formLabelWidth}},[a("el-input",{staticStyle:{width:"300px"},attrs:{size:"small",placeholder:"请输入",autocomplete:"off",clearable:""},model:{value:t.alarmTypeForm.name,callback:function(e){t.$set(t.alarmTypeForm,"name",e)},expression:"alarmTypeForm.name"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("searchBtn",{attrs:{title:"确 定"},on:{click:function(e){return t.submitForm("alarmTypeForm")}}}),t._v(" "),a("cancleBtn",{attrs:{title:"取 消"},on:{click:function(e){t.addDialog=!1}}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"编辑告警类型",visible:t.editDialog,width:"790px","custom-class":"attendance-dialog"},on:{"update:visible":function(e){t.editDialog=e}}},[a("el-form",{ref:"alarmTypeFormEdit",staticClass:"unit",attrs:{model:t.alarmTypeFormEdit,rules:t.rules,inline:!0}},[a("el-form-item",{attrs:{label:"告警类型名称：",prop:"name","label-width":t.formLabelWidth}},[a("el-input",{staticStyle:{width:"300px"},attrs:{size:"small",placeholder:"请输入",autocomplete:"off",clearable:""},model:{value:t.alarmTypeFormEdit.name,callback:function(e){t.$set(t.alarmTypeFormEdit,"name",e)},expression:"alarmTypeFormEdit.name"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("searchBtn",{attrs:{title:"确 定"},on:{click:function(e){return t.submitFormEdit("alarmTypeFormEdit")}}}),t._v(" "),a("cancleBtn",{attrs:{title:"取 消"},on:{click:function(e){t.editDialog=!1}}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"删除告警类型",visible:t.userDeleteDialog,width:"30%","custom-class":"attendance-dialog"},on:{"update:visible":function(e){t.userDeleteDialog=e}}},[a("span",[t._v("确定删除吗？")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("searchBtn",{attrs:{title:"确 定"},on:{click:t.handleDelete}}),t._v(" "),a("cancleBtn",{attrs:{title:"取 消"},on:{click:function(e){t.userDeleteDialog=!1}}})],1)])],1)},staticRenderFns:[]};var n=a("C7Lr")(l,s,!1,function(t){a("dh4J")},"data-v-5defa054",null);e.default=n.exports},dh4J:function(t,e){}});