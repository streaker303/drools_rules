<template>
    <div class="event event-wrapper">
        <div class="ub w100">
            <div class="event-content" style="width:200px;padding: 20px 5px 10px;box-sizing: border-box;background-color: #021c31;position: fixed;left: 20px;top: 60px ;bottom: 20px;overflow: auto">
                <div class="tree" style="position: relative;">
                    <!-- <span style="position: absolute;width:10px;height:10px;background: red;top:50%;right:0;"></span> -->
                    <div class="ub ub-pj ub-ac w100" style="padding-left:10px;margin-bottom: 20px;box-sizing: border-box">
                        <div class="list-tips" style="margin-bottom: 0;font-size:12px;">分组列表</div>
                        <div class="tree-option" style="font-size:12px;color:#1cd7fa;padding-right:10px;">
                            <el-tooltip class="item" effect="dark" content="新增" placement="top-start">
                                <i class="iconfont icon-tianjiashu" style="font-size: 12px" @click="addRuleShow"></i>
                            </el-tooltip>
                            <el-tooltip class="item" v-if="currentNode.id!=''" effect="dark" content="编辑" placement="top-start">
                                <i class="iconfont icon-xiugaishu" style="font-size: 12px" @click="editRuleShow"></i>
                            </el-tooltip>
                            <el-tooltip class="item" v-if="currentNode.id!=''" effect="dark" content="删除" placement="top-start">
                                <i class="iconfont icon-shanchushu" style="font-size: 12px" @click="delRuleShow"></i>
                            </el-tooltip>
                        </div>
                    </div>
                    <div style="padding: 0 5px 10px 5px">
                        <el-input placeholder="请输入关键词搜索" clearable v-model="filterText" class="tree-input"
                                  size="mini">
                            <el-button slot="append" icon="el-icon-search"
                                       @click="searchCheck"></el-button>
                        </el-input>
                    </div>
                    <el-tree show-checkbox ref="tree" node-key="id" :filter-node-method="filterNode" :default-expand-all="true" :highlight-current="true" :data="treeData" :props='propsData' @node-click="handleNodeClick" :check-strictly="true" :expand-on-click-node="false" :indent='indent' @check-change="handleClick">
						<span class="custom-tree-node" slot-scope="{ node, data }">
						        <span style="font-size:12px;">{{ node.label }}</span>
						        <span style="color:#718492;font-size:12px;">
						         ({{ data.number }})
						        </span>
						      </span>
                    </el-tree>
                </div>
            </div>
            <div class="ub ub-f1 ub-ver" style="margin-left: 210px">
                <div class="ub w100 search-area" style="box-sizing: border-box;">
                    <div class="ub event-content attendance-list w100" style="margin-top: 0;padding: 20px;box-sizing: border-box">
                        <div class="ub ub-ver ub-ac ub-f1">
                            <el-row type="flex" align="middle" class="w100" style="border-radius:0 0 5px 5px;">
                                <el-col :span="12" class="event-btn-col">
                                    <el-form :model="get_params">
                                        <el-form-item label="规则名称：" label-width="90px">
                                            <el-input placeholder="请输入" clearable v-model.trim="get_params.name" @keyup.enter.native="searchCheck" :style="getStyle()" size="small"></el-input></el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="12" class="event-btn-col">
                                    <el-form :model="get_params">
                                        <el-form-item label="状态：" label-width="90px">
                                            <el-select size="small" clearable v-model="get_params.status" :style="getStyle()" filterable placeholder="请选择">
                                                <el-option label="已启用" value="1"></el-option>
                                                <el-option label="未启用" value="0"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <!--<el-col :span="8" class="event-btn-col">
                                    <el-form :model="get_params">
                                        <el-form-item label="创建时间：" label-width="90px">
                                            <el-date-picker style="width:350px;" clearable size="small" value-format="yyyy-MM-dd HH:mm:ss" v-model="sayTimes"
                                                            type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-form>
                                </el-col>-->
                            </el-row>
                            <el-row v-show="isOpen" type="flex" align="middle" class="w100" style="border-radius:0 0 5px 5px;margin-top: 10px;">
                                <el-col :span="12" class="event-btn-col">
                                    <el-form :model="get_params">
                                        <el-form-item label="创建人：" label-width="90px">
                                            <el-input placeholder="请输入" :style="getStyle()" clearable v-model.trim="get_params.createUserName" @keyup.enter.native="searchCheck" size="small"></el-input></el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :span="12" class="event-btn-col">
                                    <el-form :model="get_params">
                                        <el-form-item label="修改人：" label-width="90px">
                                            <el-input placeholder="请输入" :style="getStyle()" clearable v-model.trim="get_params.updateUserName" @keyup.enter.native="searchCheck" size="small"></el-input></el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                            <div v-show="isOpen" class="w100" style="position: relative;">
								<span @click="isOpen=false" style="color:#03e9ff;cursor: pointer;font-size:12px; position: absolute;right:-50px;top:-44px;z-index: 9;">收起<i
                                    style="margin-left: 3px;" class="el-icon-arrow-up"></i></span>
                            </div>
                        </div>
                        <div class="ub ub-ac" style="margin-right: 10px;width:70px;">
							<span v-show="!isOpen" @click="isOpen=true" style="color:#03e9ff;cursor: pointer;font-size:12px;">更多搜索<i style="margin-left: 3px;"
                                                                                                                                     class="el-icon-arrow-down"></i></span>
                        </div>
                        <div class="ub">
                            <searchBtn title="搜 索" @click="searchCheck" />
                        </div>
                    </div>
                </div>
                <div class="attendance-list table-area">
                    <div class="ub ub-pj w100">
                        <div class="list-tips">列表内容</div>
                        <div>
                            <!--<otherBtn title="reload" style="margin-left: 10px;" icon="el-icon-refresh" @click="reload" />-->
                            <addBtn style="margin:0 10px;" icon="el-icon-plus" title="新建规则" @click="handleAdd" />
                            <otherBtn style="margin-right: 10px" title="启用规则" icon="iconfont icon-kaiqi" @click="handleDeployAll(1)" />
                            <otherBtn title="停用规则" icon="iconfont icon-zanting" @click="handleDeployAll(0)" />
                            <deleteBtn style="margin-left: 10px;" icon="el-icon-delete" title="刪 除" @click="handleDeleteAll" />
                        </div>
                    </div>
                    <!--没加搜索,临时加最小高度-->
                    <el-table ref="multipleTable" v-loading="loading" class='bigTable full-table' :data="tableData" border stripe :row-key="(row)=>{ return row.id}"
                              tooltip-effect="dark" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" :reserve-selection="true" width="50" :selectable="checkSelect">
                        </el-table-column>
                       <!-- <el-table-column align="center" type="index" width="50" :index="indexMethod" label="序号">
                        </el-table-column>-->
                        <el-table-column prop="name" show-overflow-tooltip>
                            <template slot="header" slot-scope="scope">
                                规则名称
                                <el-tooltip class="item" effect="dark" content="被继承的规则不能修改状态和删除" placement="top-start">
                                    <span style="font-weight: 600;"><span class="el-icon-info" style="margin-left: 5px;color: #1cd7fa"></span></span>
                                </el-tooltip>
                            </template>
                            <template slot-scope="{row}">
                                <span>{{row.name}}</span>
                                <span v-if="row.isExtend === true" style="color: #01ff01">(已被其它规则继承)</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column prop="modelMap" label="规则属性" show-overflow-tooltip>
                        </el-table-column>-->
                        <el-table-column prop="typeName" label="规则分组" width="140" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="" label="最近7天告警趋势" width="200" align="center" style="padding: 0px !important;">
                            <template slot-scope="{row}">
                                <div style="width: 200px;height: 26px;margin: 0;padding: 0">
                                    <tableLine :data-x="row.dataX" :data-y="row.dataY"></tableLine>
                                </div>
                            </template>
                        </el-table-column>
                       <!-- <el-table-column prop="status" label="规则状态" width="80">
                            <template slot-scope="scope">
                                <div>
                                    <span v-if="scope.row.status == '1'" style="color: #01ff01">已启用</span>
                                    <span v-if="scope.row.status !== '' && scope.row.status == '0'" style="color:#fff;opacity:0.3">未启用</span>
                                </div>
                            </template>
                        </el-table-column>-->
                        <el-table-column prop="count" label="告警量" align="center" sortable width="90">
                        </el-table-column>
                        <el-table-column prop="createTime" label="是否启用" width="100" align="center">
                            <template slot-scope="{row}">
                                <div class="switch-wrapper" :class="{'yes':row.status,'no':!row.status}"  @click="deploymentEnvironment(row)">
                                    <div class="ub ub-ac ub-pj">
                                        <div style="margin-left: -1px">是</div>
                                        <div>否</div>
                                    </div>
                                    <div class="circle"></div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createUserName" label="创建人" width="80">
                        </el-table-column>
                        <el-table-column prop="updateUserName" label="修改人" width="80">
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleSee(scope.row)">编辑</el-button>
                                <el-button type="text" @click="handleCopySee(scope.row)">复制并新建</el-button>
                                <el-button type="text" :disabled="scope.row.isExtend" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <!--临时隐藏-->
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="get_params.page" :page-sizes="[10, 20, 30, 40,50]" :page-size="get_params.size"
                                       layout="total, sizes, prev, pager, next" prev-text="上一页" next-text="下一页" :total="total_num">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="告警详情" :visible.sync="detailDialog" width="920px" custom-class="attendance-dialog">
            <div style="width:70%;margin: 0 auto;">
                <div v-for="(item,index) in detailArr" :key="index" style="margin:12px 0;">
                    <span style="font-size:16px;color:red;padding-right:10px;">{{item._key}}&nbsp;&nbsp;:</span>
                    <span>{{item.value}}</span>
                </div>
            </div>
        </el-dialog>
        <!--环境部署-->
        <el-dialog title="规则状态"
                   width="620px"
                   :visible.sync="deployDialog"
                   custom-class="attendance-dialog">
            <el-row>
                <el-col :span="4">规则状态</el-col>
                <el-col :span="20">
                    <el-radio v-model="editDeploy.status" label="1" style="color: #fff">已启用</el-radio>
                    <el-radio v-model="editDeploy.status" label="0" style="color: #fff">未启用</el-radio>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <searchBtn title="确 定" @click='submitDeployForm'  />
                <cancleBtn title="取 消" @click='deployDialog = false'  />
            </div>
        </el-dialog>

        <!--统一部署-->
        <el-dialog title="规则状态"
                   width="620px"
                   :visible.sync="deployAllDialog"
                   custom-class="attendance-dialog">
            <el-row>
                <el-col :span="4">规则状态</el-col>
                <el-col :span="20">
                    <el-radio v-model="allDeploy.status" label="1" style="color: #fff">已启用</el-radio>
                    <el-radio v-model="allDeploy.status" label="0" style="color: #fff">未启用</el-radio>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <searchBtn title="确 定" @click='submitAllDeployForm'  />
                <cancleBtn title="取 消" @click='deployAllDialog = false'  />
            </div>
        </el-dialog>

        <!--删除-->
        <!--		<el-dialog title="删除选中规则" :visible.sync="deleteDialog" width="30%" custom-class="attendance-dialog">-->
        <!--			<span>确定删除吗？</span>-->
        <!--			<span slot="footer" class="dialog-footer">-->
        <!--				<searchBtn title="确 定" @click="deleteAllData" />-->
        <!--				<searchBtn title="取 消" @click="deleteDialog = false" />-->
        <!--			</span>-->
        <!--		</el-dialog>-->
        <el-dialog title="删除当前规则" :visible.sync="deleteItemDialog" width="30%" custom-class="attendance-dialog">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="deleteItemData" />
				<cancleBtn title="取 消" @click="deleteItemDialog = false" />
			</span>
        </el-dialog>

        <el-dialog title="删除选中规则" :visible.sync="deleteAllDialog" width="30%" custom-class="attendance-dialog">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="deleteAllData" />
				<cancleBtn title="取 消" @click="deleteAllDialog = false" />
			</span>
        </el-dialog>

        <el-dialog title="创建规则组" :visible.sync="addRuleGroupDialog" width="600px" custom-class="attendance-dialog">
            <el-form :model="addRuleGroupForm" :rules="rules" ref="addRuleGroupForm">
                <el-form-item label="规则组名称：" prop="name" label-width="120px">
                    <el-input style="width:90%;" placeholder="请输入" clearable v-model="addRuleGroupForm.name" size="small"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitGroupForm('addRuleGroupForm')" />
                <cancleBtn title="取 消" @click="addRuleGroupDialog = false" />
			</span>
        </el-dialog>
        <el-dialog title="编辑规则组" :visible.sync="editRuleGroupDialog" width="600px" custom-class="attendance-dialog">
            <el-form :model="editRuleGroupForm" :rules="rules" ref="editRuleGroupForm">
                <el-form-item label="规则组名称：" prop="name" label-width="120px">
                    <el-input style="width:90%;" placeholder="请输入" clearable v-model="editRuleGroupForm.name" size="small"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitGroupFormEdit('editRuleGroupForm')" />
                <cancleBtn title="取 消" @click="editRuleGroupDialog = false" />
			</span>
        </el-dialog>
        <el-dialog title="删除规则组" :visible.sync="delRuleGroupDialog" width="30%" custom-class="attendance-dialog">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="handleDeleteGroupFun" />
                 <cancleBtn title="取 消" @click="delRuleGroupDialog = false" />
			</span>
        </el-dialog>
    </div>
</template>

<script>
import {
    get_rule_tree,
    add_rule_group,
    delete_rule_group,
} from '../server/inspection.js'
import {
    getDrools,
    modify_deployData,
    modify_deployAllData,
    delete_singleData,
    reloadData,
    get_fields
} from "../server/attect.js";
import tableLine from './charts/tableLine.vue'
export default {
    name: "new_rules_type",
    components: {
        tableLine
    },
    data() {
        return {
            isClick:true,
            isFirst:true,
            indent: 10,
            initId: null,
            depId:'',
            config_id: '',
            treeData: [
               /* {
                    id: 1,
                    name: '一级 2',
                    childGroupInfo: [
                        {
                            id: 3,
                            name: '二级 2-1',
                            childGroupInfo: [{
                                id: 4,
                                name: '三级 3-1-1'
                            }, {
                                id: 5,
                                name: '三级 3-1-2',
                            }]
                        }, {
                            id: 2,
                            name: '二级 2-2',
                            childGroupInfo: [{
                                id: 6,
                                name: '三级 3-2-1'
                            }, {
                                id: 7,
                                name: '三级 3-2-2',
                            }]
                        }]
                }*/
            ],
            propsData: {
                children: 'childTypeInfo',
                label: 'name'
            },

            currentNode:{
                id:'',
            },
            states:[
                {
                    value:1,
                    label:'已启用'
                },{
                    value:2,
                    label:'已暂停'
                },
            ],
            addRuleForm:{
                rule_name:'',
            },
            addRuleDialog:false,
            //导入数据
            importDialog:false,
            importForm:{
                name:'',
                state:'1',
            },
            //编辑数据
            editRuleForm: {
                id:'',
                rule_name: '',
            },
            currentId: '',
            editRuleDialog: false,

            //自动处置数据
            autoDialog:false,
            task_types:[
                {
                    value:1,
                    label:'高级'
                },{
                    value:2,
                    label:'中级'
                },{
                    value:3,
                    label:'低级'
                },
            ],
            prioritys:[
                {
                    value:1,
                    label:'高级'
                },{
                    value:2,
                    label:'中级'
                },{
                    value:3,
                    label:'低级'
                },
            ],
            assign_groups:[
                {
                    value:1,
                    label:'高级'
                },{
                    value:2,
                    label:'中级'
                },{
                    value:3,
                    label:'低级'
                },
            ],
            autoFrom:{
                handle_way:false,
                checkList:['1'],
                task_name:'',
                task_type:'',
                priority:'',
                assign_group:'',
                advise:'',
            },
            addRuleGroupDialog:false,
            addRuleGroupForm:{
                name:'',
            },
            editRuleGroupDialog:false,
            editRuleGroupForm:{
                name:'',
            },
            delRuleGroupDialog:false,
            userId:'',
            files_list:[],
            //downloadDialog:false,
            files:[],
            fileList: [],
            uploadDialog: false,
            file_num: 0,
            flag: null,
            record_row: {},

            rules: {
                rule_name: [{
                    required: true,
                    message: '请输入规则名称',
                    trigger: 'blur'
                }, ],
                name: [{
                    required: true,
                    message: '请输入规则组名称',
                    trigger: 'blur'
                }, ],
            },
            currentNodeId:'',

            testData: [],
            isOpen: false,
            detailArr: [],
            detailDialog: false,
            deployDialog: false,
            deployAllDialog: false,
            deleteDialog: false,
            deleteItemId: '',
            deleteItemDialog: false,
            deleteAllDialog: false,
            formLabelWidth: "100px",
            loading: false,
            total_num: 0,
            multipleSelection: [],
            tableData: [
                // {
                //   id: '1',
                //   modelMap:'你的钱为你的确为',
                //   drl:'eqweqweqwioeq',
                //   createTime: '2019-12-02 15:20:30',
                //   status: '0'
                // }
            ],
            allDeploy: {
                status: ''
            },
            editDeploy: {
                id: '',
                status: ''
            },
            sayTimes: [],
            get_params: {
                page: 1,
                size: 20,
                sourceIP: "",
                sourcePort: "",
                purposeIP: "",
                purposePort: "",
                respBody: "",
                beginDate: "",
                endDate: "",
                typeId: "",
                name: "",
                status: '',
                createUserName: '',
                updateUserName: ''
            },
            typeList: [],
            filterText: '',
        }
    },
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val);
        },
        'addRuleDialog':{
            handler(newVal, oldVal) {
                if (!newVal) {
                    this.$refs.addRuleForm.resetFields();
                }
            },
        },
        'addRuleGroupDialog':{
            handler(newVal, oldVal) {
                if (!newVal) {
                    this.$refs.addRuleGroupForm.resetFields();
                }
            },
        },
    },
    mounted() {

        this.$nextTick(() => {
            let userInfo = this.$getsessionStorage('userInfo');
            this.userId = userInfo.id;
            this.initTree();
            this.get_data_fields();
        })
    },
    methods: {
        getStyle() {
            console.log(window.screen.width)
            let ws = window.screen.width;
            if (ws >= 1680) {
                return {
                    width: '300px'
                };
            } else if (ws < 1680 ) {
                return {
                    width: '200px'
                };
            }

        },
        get_data_fields() {
            let data = {}
            get_fields(data).then(res => {
                console.log(res)
                this.$setsessionStorage('rule_fields', res)
            }).catch(error => {
                console.log('error' + error);
            })
        },
        checkSelect (row,index) {
            let isChecked = true;
            if (row.isExtend === false) { // 判断里面是否存在某个参数
                isChecked = true
            } else {
                isChecked = false
            }
            return isChecked
        },
        initTree(){
            let data = {
                queryData: {},
                paramsData: {}
            }
            get_rule_tree(data).then(res => {
                console.log('tree',res);
                if(this.isFirst){
                    this.depId = res[0].id;
                    this.initId = res[0].id;
                    this.get_data();
                }
                this.isFirst = false;
                this.isClick = false;
                this.treeData = res;

            }).then(() => {
                this.$refs.tree.setCheckedKeys([this.currentNodeId]);
                this.$refs.tree.setCurrentKey(this.depId);
                this.isClick = true;
            }).catch(error => {
                console.log('error' + error);
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        initParams(){
            this.get_params = {
                page: 1,
                size: 20,
                name: "",
                status: "",
            };
            this.total_num = 0;
        },
        handleClick(data,checked, node){
            if(checked){
                this.currentNode = data;
                if(this.isClick){
                    this.currentNodeId = data.id;
                }
                this.$refs.tree.setCheckedNodes([data]);
            }
        },

        handleNodeClick(node) {
            this.currentNode = node;
            if(this.isClick){
                this.currentNodeId = node.id;
            }
            this.$refs.tree.setCheckedNodes([node]);

            console.log(node)
            this.depId = node.id;
            this.initParams();
            this.get_data();
        },
        indexMethod(index) {
            return (this.get_params.page - 1) * this.get_params.size + index + 1;
        },

        searchCheck() {
            this.get_params.page = 1;
            this.get_data();
        },
        handleEdit(row) {
            this.editRuleForm.rule_name = row.name;
            this.editRuleDialog = true;
        },
        handleDelete(row) {
            this.deleteItemId = row.id;
            this.deleteItemDialog = true;
        },
        handleDeleteFun() {
            let data = {
                ids: this.deleteId
            }
            delete_module(data).then(res => {
                this.deleteItemDialog = false;
                console.log('删除成功');
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.get_data();
                }, 1500)
            }).catch(error => {
                console.log(error + 'error');
            });
        },

        handleDeleteGroupFun() {
            let data = {
                id: this.currentNode.id
            }
            delete_rule_group(data).then(res => {
                this.delRuleGroupDialog = false;
                console.log('删除成功');
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.initTree();
                    this.get_data();
                }, 1500)
            }).catch(error => {
                console.log(error + 'error');
            });
        },
        delRuleShow(){
            if(this.depId===this.currentNode.id){
                this.$message({
                    message: '当前组目前处于显示状态不能删除！',
                    type: 'warning'
                })
                return
            }
            let selects = this.$refs.tree.getCheckedKeys();
            console.log(selects)
            if(selects.length===0){
                this.$message({
                    message: '请勾选要删除的规则组',
                    type: 'warning'
                })
                return
            }
            this.delRuleGroupDialog=true;
        },
        addRuleShow(){
            let selects = this.$refs.tree.getCheckedKeys();
            console.log(selects)
            if(selects.length===0){
                this.$message({
                    message: '请勾选新增所在规则组',
                    type: 'warning'
                })
                return
            }
            this.addRuleGroupDialog=true;
        },
        editRuleShow(){
            let selects = this.$refs.tree.getCheckedKeys();
            console.log(selects)
            if(selects.length===0){
                this.$message({
                    message: '请勾选编辑所在规则组',
                    type: 'warning'
                })
                return
            }
            this.editRuleGroupForm.name = this.currentNode.name;
            this.editRuleGroupDialog=true;
        },
        submitGroupFormEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editGroupFun();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitGroupForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addGroupFun();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        editGroupFun() {
            let data = {
                queryData: {},
                paramsData: {
                    name:this.editRuleGroupForm.name,
                    id: this.currentNode.id,
                }
            }
            add_rule_group(data).then(res => {
                this.editRuleGroupDialog = false;
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.initTree();
                }, 1500)
            }).catch(error => {
                console.log(error + 'error');
            });
        },
        addGroupFun() {
            let data = {
                queryData: {},
                paramsData: {
                    name:this.addRuleGroupForm.name,
                    parentId: this.currentNode.id,
                }
            }
            add_rule_group(data).then(res => {
                this.addRuleGroupDialog = false;
                console.log('添加成功');
                this.$message({
                    message: '添加成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.initTree();
                }, 1500)
            }).catch(error => {
                console.log(error + 'error');
            });
        },

        handleSizeChange(val) {
            this.get_params.size = val;
            this.get_data();
        },
        handleCurrentChange(val) {
            this.get_params.page = val;
            this.get_data();
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        uploadSuccess(response, file, fileList) {
            this.files = [];
            this.file_num++;
            if (this.file_num === fileList.length) {
                console.log('fileList',fileList)
                console.log('this.fileList',this.fileList)
                if(fileList.length>0){
                    fileList.forEach(item=>{
                        let obj = {};
                        obj.fileName = item.name.split('.')[0];
                        obj.filePath = item.response.data.successFile;
                        this.files.push(obj);
                    })
                }
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                })

            }
        },

        get_rules_type () {
            let data = {
                queryData: {},
                paramsData: {
                    name: this.get_params.name
                }
            }
            get_rule_type(data).then(res => {
                console.log(res)
                this.typeList = res;
            }).catch(err => {
                console.log(err)
            })
        },

        searchAssets () {
            this.get_params.page = 1;
            this.get_data();
        },

        get_data () {
            let uid = this.config_id = new Date().getTime();
            this.loading = true;
            this.tableData = [];
            let data = {
                queryData: {
                    page: this.get_params.page,
                    pageSize: this.get_params.size
                },
                paramsData: {
                    typeId: this.depId,
                    ruleName: this.get_params.name,
                    status: this.get_params.status,
                    createUserName: this.get_params.createUserName,
                    updateUserName: this.get_params.updateUserName
                }
            }
            getDrools(data).then(res => {
                if(this.config_id != uid) {
                    return;
                }
                console.log(res, '列表');
                this.loading = false;
                this.testData = res;
                this.total_num = res.totalElements;
                let list = res.content;
                if (list.length > 0) {
                    list.forEach((item, index) => {
                        // console.log(index)
                        let obj = {};
                        obj.id = item.id;
                        obj.drl = item.drl;
                        obj.modelMap = item.modelMap;
                        item.modelMap && (obj.name = JSON.parse(item.modelMap).name);
                        obj.createTime = item.createTime;
                        obj.status = item.status;
                        obj.count = item.count;
                        obj.typeName = item.typeName || '--';
                        obj.typeId = item.typeId;
                        obj.isExtend = item.isExtend;
                        obj.createUserName = item.createUserName || '--';
                        obj.updateUserName = item.updateUserName || '--';

                        obj.dataY = item.alarm7Num ? item.alarm7Num : [0,0,0,0,0,0,0];
                        obj.dataX = ['1', '2', '3', '4', '5', '6', '7']

                        this.tableData.push(obj);
                        // console.log(obj.drl)
                    })
                }
            }).catch(error => {
                this.loading = false;
                console.log('error' + error);
            })
        },

        handleSee (row) {
            // console.log(row)
            let data = JSON.parse(JSON.stringify(row));
            data.isEdit = true;
            data.modelMap = JSON.parse(data.modelMap)
            data.modelMap.status = data.status; //以json外面的status为准
            data.modelMap = JSON.stringify(data.modelMap)
            this.$router.push({name: 'cep_show', params: data})
        },

        handleCopySee (row) {
            // console.log(row)
            let data = JSON.parse(JSON.stringify(row));
            data.modelMap = JSON.parse(data.modelMap)
            data.modelMap.id = data.id = '';
            data.modelMap.status = data.status; //以json外面的status为准
            data.modelMap.name = data.modelMap.name + '-copy';
            data.modelMap = JSON.stringify(data.modelMap)
            console.log(data)
            this.$router.push({name: 'cep_show', params: data})
        },

        deploymentEnvironment (val) {
            if (val.isExtend === true) {
                this.$message.warning('该规则已被其它规则继承，不能修改状态');
                return ;
            }
            this.flag = setTimeout(() => {
                this.record_row = {};
            }, 1000)
            if (val.id === this.record_row.id) {
                return ;
            }
            this.record_row = val;
            this.editDeploy.id = val.id;
            console.log(val.status)
            this.editDeploy.status = val.status = (val.status == 1 ? 0 : 1);
            this.submitDeployForm();
        },

        submitDeployForm (row) {
            let obj = {};
            obj.ids = [this.editDeploy.id];
            obj.status = this.editDeploy.status;
            modify_deployData(obj).then(res => {
                if (document.getElementsByClassName('el-message').length === 0) {
                    this.$message({
                        message: '状态修改成功',
                        type: 'success'
                    })
                }
            }).catch(error => {
                console.log(error + 'error')
            });
        },

        submitAllDeployForm (val) {
            let obj = {};
            console.log(this.multipleSelection)
            obj.ids = this.multipleSelection.map(item => {return item.id});
            obj.status = val;
            modify_deployAllData(obj).then(res => {
                if (document.getElementsByClassName('el-message').length === 0) {
                    this.$message({
                        message: '状态修改成功',
                        type: 'success'
                    })
                }
                this.$refs.multipleTable.clearSelection();
                setTimeout(() => {
                    this.get_data();
                }, 1000)
            }).catch(error => {
                console.log(error + 'error')
            });
            this.deployAllDialog = false;
        },

        deleteItemData () {
            let obj = {
                ids: [this.deleteItemId]
            };
            delete_singleData(obj).then(res => {
                this.deleteItemDialog = false;
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.initTree();
                    this.get_data();
                }, 1000)
            }).catch(error => {
                this.deleteItemDialog = false;
                console.log(error + 'error')
            });
        },

        deleteAllData () {
            let ids = [];
            this.multipleSelection.forEach(item => {
                console.log(item)
                ids.push(item.id)
            })
            let obj = {
                ids: ids
            }
            delete_singleData(obj).then(res => {
                this.deleteAllDialog = false;
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.initTree();
                    this.get_data();
                }, 1000)
            }).catch(error => {
                this.deleteAllDialog = false;
                console.log(error + 'error')
            });
        },

        handleAdd () {
            this.$router.push('/home/cep_show?add=1')
        },

        handleDeleteAll () {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    message: '请勾选删除的行',
                    type: "warning"
                })
            } else {
                this.deleteAllDialog = true;
            }
        },

        handleDeployAll (val) {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    message: '请勾选规则行',
                    type: "warning"
                })
            } else {
                this.submitAllDeployForm(val)
            }
        },

        reload () {
            reloadData().then(res => {
                this.$message({
                    message: 'reload 成功',
                    type: "success"
                })
            }).catch(error => {
                console.log('error' + error)
            })
        },

    },
    beforeDestroy () {
        if (this.flag) {
            clearTimeout(this.flag);
            this.flag = null;
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination {
    padding: 30px 0 20px;
    text-align: right;
}

.el-input.ips {
    display: block;
    width: 100%;
}

.drawer-pad {
    padding: 0 20px;
}

.el-form-item {
    margin: 0;
}

.domain-add {
    line-height: 1;
    position: relative;
    padding: 0 20px;
    color: #1cd7fa;

    .el-button {
        position: absolute;
        right: 20px;
        top: 0;
        padding: 0;
        color: #1cd7fa;
    }
}

.domain-list {
    background: rgba(0, 0, 0, .3);
    margin: 3px 0 20px;
    padding: 20px 0 1px;

    .list-tit {
        width: 100px;
        text-align: right;
    }

    .ub {
        margin-bottom: 20px;
    }

    .list-btn {
        padding-left: 20px;

        .el-button {
            color: #F56C6C;
        }
    }
}

.event>>>.el-range-input {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
}

.event>>>.el-range-separator {
    color: #fff;
}

// .event>>>.el-radio {
// 	margin: 0 150px 0 30px;
// }

.event>>>.el-upload-list__item-name {
    color: #01E9FF;

    i {
        color: #01E9FF;
    }
}
.attendance-dialog .el-form-item {
    margin-bottom: 30px;
}
.upload-demo>>>.el-button--primary{
    background-color: rgba(0,0,0,0);
    border-color: rgba(0,0,0,0);
    background-image: url(../assets/img/XZWJ.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.el-tree{
    background: rgba(0,0,0,0);
}
.tree>>>.el-tree--highlight-current .el-tree-node>.el-tree-node__content {
    .custom-tree-node{
        span:nth-child(1){
            color:#bfdce4!important;
        }
        span:nth-child(2){
            color:#86939e!important;
        }

    }
}
.tree>>>.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: rgba(0,0,0,0)!important;
    .custom-tree-node{
        span{
            color:#1cd7fa!important;
        }
    }
}
.tree>>>.el-tree--highlight-current .el-tree-node>.el-tree-node__content:hover{
    background-color: rgba(0,0,0,0)!important;
    .custom-tree-node{
        span{
            color:#1cd7fa!important;
        }
    }
}
.tree>>>.el-checkbox__input.is-disabled .el-checkbox__inner{
    background-color: #1cd7fa;
    border-color: #1cd7fa;
}
.tree>>>.el-checkbox__input .el-checkbox__inner,.auto>>>.el-checkbox__input .el-checkbox__inner{
    border-color: #1cd7fa!important;
}
.tree>>>.el-checkbox__input.is-focus .el-checkbox__inner,.auto>>>.el-checkbox__input.is-focus .el-checkbox__inner{
    border-color: #1cd7fa!important;
}
.tree>>>.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner,.auto>>>.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: rgba(0,0,0,0)!important;
    border-color: #1cd7fa;
}
.tree-option i{
    margin: 0 3px;
    cursor: pointer;
}
.tree>>>.el-checkbox__inner::after,.auto>>>.el-checkbox__inner::after{
    border-color:#1cd7fa;
}
.tree>>>.el-tree-node__content {
    background-color: rgba(0,0,0,0)!important;
}
.auto>>>.el-checkbox__input.is-checked+.el-checkbox__label{
    color:#1cd7fa;
}
.switch-wrapper{
    width:56px;
    height:20px;
    position: relative;
    cursor: pointer;
    margin-left: 10px;
}
.switch-wrapper>div:nth-child(1){
    width:56px;
    height:20px;
    background-color: #001a2c;
    box-shadow: inset 0px 0px 7px 0px #000000;
    border-radius: 14px;
    div{
        font-size: 12px;
        line-height: 20px;
        padding:0 8px;
    }
    >div:nth-child(1){
        color: #00d7ff;
        opacity: 0.6;
    }
    >div:nth-child(2){
        color: #ffaa47;
        opacity: 0.6;
    }
}
.switch-wrapper>div:nth-child(2){
    width: 20px;
    height: 20px;
    position: absolute;
    left:0;
    top:50%;
    margin-top: -10px;
    border-radius:100%;
}
.switch-wrapper.yes>div:nth-child(2){
    animation: moveone 0s linear forwards;
}
.switch-wrapper.no>div:nth-child(2){
    animation: _moveone 0s linear forwards;
}
@keyframes moveone {
    0% {
        background-color: #fa941c;
        box-shadow: 0px 0px 6px 0px #9c5603;
        left: 0;
    }

    100% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 6px 0px #058fa9;
        left: 36px;
    }
}
@-weblit-keyframes moveone {
    0% {
        background-color: #fa941c;
        box-shadow: 0px 0px 6px 0px #9c5603;
        left: 0;
    }

    100% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 6px 0px #058fa9;
        left: 36px;
    }
}
@keyframes _moveone {
    0% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 6px 0px #058fa9;
        left: 36px;
    }

    100% {
        background-color: #fa941c;
        box-shadow: 0px 0px 6px 0px #9c5603;
        left: 0;;
    }
}
@-weblit-keyframes _moveone {
    0% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 6px 0px #058fa9;
        left: 36px;
    }

    100% {
        background-color: #fa941c;
        box-shadow: 0px 0px 6px 0px #9c5603;
        left: 0;
    }
}
.event >>> .bigTable.el-table td {
    min-height: 34px !important;
    padding: 4px 0 !important;
}
</style>
