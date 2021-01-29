<template>
    <div class="event event-wrapper">
        <div class="w100" v-show="!firstShow">
            <div class="ub w100 search-area" style="box-sizing: border-box;">
                <div class="ub event-content w100">
                    <div class="ub ub-ver ub-ac ub-f1">
                        <el-row type="flex" align="middle" class="w100" style="border-radius:0 0 5px 5px;">
                            <el-col :span="8" class="event-btn-col">
                                <el-form :model="get_params">
                                    <el-form-item label="资源名称：" label-width="90px">
                                        <el-input placeholder="请选择" clearable
                                                  v-model="get_params.name" @keyup.enter.native="searchCheck"
                                                  size="small"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8" class="event-btn-col">
                                <el-form :model="get_params">
                                    <el-form-item label="创建时间：" label-width="90px">
                                        <el-date-picker clearable size="small" value-format="yyyy-MM-dd HH:mm:ss"
                                                        v-model="sayTimes"
                                                        type="datetimerange" range-separator="至"
                                                        start-placeholder="开始日期" end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="ub">
                        <searchBtn title="搜 索" @click="searchCheck"/>
                    </div>
                </div>
            </div>
            <div class="attendance-list table-area">
                <div class="ub ub-pj w100">
                    <div class="list-tips">列表内容
                        <!--<div style="display: inline-block;font-size:16px;color:#01E9FF;cursor: pointer;margin-left: 20px;"
                             @click="$router.push('/home/cep_show?cache=1')">
                            <i style="margin-right: 6px;" class="fa fa-mail-reply" aria-hidden="true"></i>返 回
                        </div>-->
                    </div>
                    <div>
                        <addBtn icon="el-icon-plus" title="新增资源池" @click="addDialog = true"/>
                        <deleteBtn style="margin-left: 10px;" icon="el-icon-delete" title="刪 除" @click="handleDeleteAll"/>
                    </div>
                </div>
                <el-table ref="multipleTable" v-loading="loading" class='bigTable full-table' :data="tableData" border stripe
                          tooltip-effect="dark"
                          @selection-change="handleSelectionChange">
                    <el-table-column align="center" type="selection" width="50"></el-table-column>
                    <el-table-column align="center" type="index" width="50" :index="indexMethod" label="序号">
                    </el-table-column>
                    <el-table-column prop="poolName" label="资源池名称" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="describe" label="描述" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="资源池内容" align="center" width="90">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="showItem(scope.row)">{{ scope.row.sum }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建日期" width="160">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.row)">编 辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.row)">删 除</el-button>
                        </template>
                    </el-table-column>
                
                </el-table>
                <div class="pagination">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="get_params.page"
                                   :page-sizes="[10, 20, 30, 40,50]" :page-size="get_params.size"
                                   layout="total, sizes, prev, pager, next" prev-text="上一页"
                                   next-text="下一页" :total="total_num">
                    </el-pagination>
                </div>
            </div>
        </div>
        
        <div class="w100" v-show="firstShow">
            <div class="ub w100" style="box-sizing: border-box;">
                <div class="ub event-content w100">
                    <div class="ub ub-ver ub-ac ub-f1">
                        <el-row type="flex" align="middle" class="w100" style="border-radius:0 0 5px 5px;">
                            <el-col :span="8" class="event-btn-col">
                                <el-form :model="get_inner_params">
                                    <el-form-item label="资源名称：" label-width="90px">
                                        <el-input placeholder="请选择" clearable v-model="get_inner_params.name"
                                                  @keyup.enter.native="searchCheckItem"
                                                  size="small"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="12" class="event-btn-col">
                                <el-form :model="get_inner_params">
                                    <el-form-item label="创建时间：" label-width="90px">
                                        <el-date-picker style="width:350px;" clearable size="small"
                                                        value-format="yyyy-MM-dd HH:mm:ss" v-model="sayInnerTimes"
                                                        type="datetimerange" range-separator="至"
                                                        start-placeholder="开始日期" end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="7" class="ub ub-pe event-btn-col">
                                <div class="ub">
                                    <searchBtn title="搜 索" @click="searchCheckItem"/>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="attendance-list">
                <div class="ub ub-pj w100">
                    <div class="list-tips">列表内容<span
                        style="margin-left:12px;font-size:12px;color:#01E9FF">资源列表>>{{ inner_name }}下内容</span>
                        <div
                            style="display: inline-block;font-size:12px;color:#01E9FF;cursor: pointer;margin-left: 12px;"
                            @click="goBack"><i
                            style="margin-right: 6px;" class="fa fa-mail-reply" aria-hidden="true"></i>返回
                        </div>
                    </div>
                    <div>
                        <addBtn icon="el-icon-plus" title="新增资源" @click="addItemDialog = true"/>
                        <deleteBtn style="margin-left: 10px;" icon="el-icon-delete" title="刪 除"
                                  @click="handleDeleteAllItem"/>
                    </div>
                </div>
                <el-table ref="multipleTable" v-loading="loading_inner" class='bigTable' :data="tableInnerData" border
                          stripe
                          tooltip-effect="dark" @selection-change="handleItemChange">
                    <el-table-column align="center" type="selection" width="40"></el-table-column>
                    <el-table-column align="center" type="index" width="50" :index="indexInnerMethod" label="序号">
                    </el-table-column>
                    <el-table-column prop="content" label="资源内容">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建日期" width="180">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleInnerEdit(scope.row)">编 辑</el-button>
                            <el-button type="text" @click="handleDeleteItem(scope.row)">删 除</el-button>
                        </template>
                    </el-table-column>
                
                </el-table>
                <div class="pagination">
                    <el-pagination background @size-change="handleSizeInnerChange"
                                   @current-change="handleCurrentInnerChange"
                                   :current-page="get_inner_params.page" :page-sizes="[10, 20, 30, 40,50]"
                                   :page-size="get_inner_params.size" layout="total, sizes, prev, pager, next"
                                   prev-text="上一页" next-text="下一页" :total="total_inner_num">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--增加资源池-->
        <el-dialog title="添加资源池" :visible.sync="addDialog" width="700px" custom-class="attendance-dialog">
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="资源池名称：" prop="poolName" :label-width="formLabelWidth">
                    <el-input placeholder="请输入资源池名称" clearable v-model="addForm.poolName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="资源池描述：" prop="describe" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="3" placeholder="请输入描述" clearable v-model="addForm.describe"
                              size="small"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitForm('addForm')"/>
				<cancle-btn title="取 消" @click="addDialog = false"/>
			</span>
        </el-dialog>
        
        <!--list编辑资源池-->
        <el-dialog title="编辑资源池" :visible.sync="editDialog" width="700px" custom-class="attendance-dialog">
            <el-form :model="editForm" :rules="rules" ref="editForm">
                <el-form-item label="资源名称：" prop="poolName" :label-width="formLabelWidth">
                    <el-input placeholder="请输入资源名称" clearable v-model="editForm.poolName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="资源池描述：" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="3" placeholder="请输入描述" clearable v-model="editForm.describe"
                              size="small"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitFormEdit('editForm')"/>
				<cancle-btn title="取 消" @click="editDialog = false"/>
			</span>
        </el-dialog>
        
        <!--firstShow 新增资源-->
        <el-dialog title="新增资源" width="700px" :visible.sync="addItemDialog" custom-class="attendance-dialog">
            <el-form :model="addTempItem" ref="addTempItem">
                <el-form-item v-for="(item, index) in addTempItem.content"
                              :label="'资源内容-' + (index+1)+ ':'"
                              style="vertical-align: center"
                              :rules="{
                                required: true, message: '资源内容不能为空', trigger: 'blur'
                              }"
                              :key="item.key" :label-width="formLabelWidth"
                              :prop="'content.' + index + '.value'">
                    <el-input type="textarea" :rows="2" placeholder="请输入资源内容" clearable v-model="item.value"
                              size="small" style="width: 86%"></el-input>
                    <i @click.stop="addResource"
                       class="el-icon-plus"
                       v-if="addTempItem.content.length -1 === index"
                       style="cursor: pointer;font-size:14px;color:#1cd7fa;vertical-align: super;margin-left: 6px"></i>
                    <i @click.stop="deleteResource(item)"
                       v-if="index > 0"
                       class="el-icon-close"
                       style="cursor: pointer;font-size:14px;color:#1cd7fa;vertical-align: super;margin-left: 6px"></i>
                </el-form-item>
            
            </el-form>
            <div slot="footer" class="dialog-footer">
                <searchBtn title="确 定" @click="submitItem('addTempItem')"/>
                <cancle-btn title="取 消" @click="addItemDialog = false"/>
            </div>
        </el-dialog>
        
        <!--firstShow list 编辑资源-->
        <el-dialog title="编辑资源" width="700px" :visible.sync="editItemDialog" custom-class="attendance-dialog">
            <el-form class="w100" :model="editTempItem" :rules="rules" ref="editTempItem">
                <el-form-item label="资源内容：" :label-width="formLabelWidth" prop="content">
                    <el-input type="textarea" :rows="3" placeholder="请输入资源内容" clearable v-model="editTempItem.content"
                              size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <searchBtn title="确 定" @click="submitUpload('editTempItem')"/>
                <cancle-btn title="取 消" @click="editItemDialog = false"/>
            </div>
        </el-dialog>
        <!--删除资源-->
        <el-dialog title="删除资源" :visible.sync="deleteDialog" width="30%" custom-class="attendance-dialog">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="handleDeleteFun"/>
				<cancle-btn title="取 消" @click="deleteDialog = false"/>
			</span>
        </el-dialog>
        <el-dialog title="删除资源内容" :visible.sync="deleteItemDialog" width="30%" custom-class="attendance-dialog">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="handleDeleteItemFun"/>
				<cancle-btn title="取 消" @click="deleteItemDialog = false"/>
			</span>
        </el-dialog>
    </div>
</template>

<script>
import {
    addResourcePool,
    addResource,
    editResourcePool,
    editResource,
    selectResourcePool,
    selectResource,
    deleteResourcePool,
    deleteResource
} from '../server/attect.js'

export default {
    name: 'inspection_check',
    data () {
        return {
            fileList: [],
            data_id: '',
            editItemDialog: false,
            file_num: 0,
            // upload_file_params: {
            //   state: '',
            // },
            addDialog: false,
            addForm: {
                // id: '',
                poolName: '',
                describe: ''
            },
            editForm: {
                id: '',
                poolName: '',
                describe: ''
            },
            addTempItem: {
                id: '',
                poolId: '',
                content: [
                    {
                        value: '',
                        key: '1'
                    }
                ],
                createTime: ''
            },
            editTempItem: {
                id: '',
                poolId: '',
                content: '',
                createTime: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }],
                poolName: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }],
                describe: [{
                    required: false,
                    message: '请输入描述',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '请输入内容',
                    trigger: 'blur'
                }],
            },
            firstShow: false,
            isOpen: false,
            inner_name: '',
            templateId: '',
            deleteItemDialog: false,
            deleteDialog: false,
            deleteId: '',
            deleteItemId: '',
            editDialog: false,
            formLabelWidth: "120px",
            loading: false,
            total_num: 0,
            multipleSelection: [],
            itemSelection: [],
            tableData: [],
            sayTimes: [],
            get_params: {
                page: 1,
                size: 10,
                name: '',
                // content: "",
                // desc: "",
                // template: "",
                // creater: '',
            },
            total_inner_num: 0,
            sayInnerTimes: [],
            get_inner_params: {
                page: 1,
                size: 10,
                name: "",
                // updater: "",
            },
            loading_inner: false,
            // tableInnerData: [],
            tableInnerData: [],
            addItemDialog: false,
        }
    },
    watch: {
        'addDialog': {
            handler (newVal, oldVal) {
                // console.log(newVal, oldVal,'---------------------')
                if (!newVal) {
                    this.$refs.addForm.resetFields();
                }
            },
        },
        'addItemDialog': {
            handler (newVal, oldVal) {
                if (!newVal) {
                    this.$refs.addTempItem.resetFields();
                    this.addTempItem.content = [
                        {
                            value: '',
                            key: '1'
                        }
                    ]
                }
            },
        },
    },
    mounted () {
        this.$nextTick(() => {
            this.get_data();
        })
    },
    methods: {
        indexMethod (index) {
            return (this.get_params.page - 1) * this.get_params.size + index + 1;
        },
        indexInnerMethod (index) {
            return (this.get_inner_params.page - 1) * this.get_inner_params.size + index + 1;
        },
        searchCheck () {
            // alert(123)
            this.get_params.page = 1;
            this.get_data();
        },
        searchCheckItem () {
            this.get_inner_params.page = 1;
            this.get_Item();
        },
        
        goBack () {
            this.firstShow = false;
            this.get_data();
        },
        
        get_data () {
            this.loading = true;
            this.tableData = [];
            let data = {
                name: this.get_params.name,
                beginDate: this.sayTimes && this.sayTimes.length > 0 ? this.sayTimes[0] : '',
                endDate: this.sayTimes && this.sayTimes.length > 0 ? this.sayTimes[1] : '',
                page: this.get_params.page,
                size: this.get_params.size,
            }
            console.log(data)
            selectResourcePool(data).then(res => {
                // console.log('getList', res);
                this.loading = false;
                this.total_num = res.data.count;
                let list = res.data.list;
                if (list.length > 0) {
                    list.forEach(item => {
                        let obj = {};
                        obj.id = item.id;
                        obj.poolName = item.poolName;
                        obj.describe = item.describe;
                        obj.createTime = item.createTime;
                        obj.sum = item.sum;
                        this.tableData.push(obj);
                    })
                }
            }).catch(error => {
                this.loading = false;
                console.log('error' + error);
            })
        },
        showItem (obj) {
            // console.log(obj);
            this.firstShow = true;
            this.inner_name = obj.poolName;
            this.templateId = obj.id;
            this.get_Item();
        },
        get_Item () {
            this.loading_inner = true;
            this.tableInnerData = [];
            let data = {
                poolId: this.templateId,
                name: this.get_inner_params.name,
                beginDate: this.sayInnerTimes && this.sayInnerTimes.length > 0 ? this.sayInnerTimes[0] : '',
                endDate: this.sayInnerTimes && this.sayInnerTimes.length > 0 ? this.sayInnerTimes[1] : '',
                page: this.get_inner_params.page,
                size: this.get_inner_params.size,
            }
            selectResource(data).then(res => {
                console.log(res)
                this.loading_inner = false;
                this.total_inner_num = res.data.count;
                let list = res.data.list;
                if (list.length > 0) {
                    list.forEach(item => {
                        let obj = {};
                        obj.id = item.id;
                        obj.poolId = item.poolId;
                        obj.content = item.content;
                        obj.createTime = item.createTime;
                        this.tableInnerData.push(obj);
                    })
                }
            }).catch(error => {
                this.loading_inner = false;
                console.log('error' + error);
            })
        },
        handleEdit (row) {
            this.editForm.id = row.id;
            this.editForm.poolName = row.poolName;
            this.editForm.describe = row.describe;
            this.editDialog = true;
        },
        handleInnerEdit (row) {
            // console.log('row', row);
            this.editTempItem.id = row.id;
            this.editTempItem.poolId = row.poolId;
            this.editTempItem.content = row.content;
            this.editTempItem.createTime = row.createTime;
            this.editItemDialog = true;
        },
        
        handleDeleteAll () {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请先选择资源池',
                    type: 'warning'
                });
                return;
            } else {
                let ids = [];
                this.multipleSelection.forEach(item => {
                    ids.push(item.id)
                })
                this.deleteId = ids;
                // console.log(this.deleteId)
            }
            this.deleteDialog = true;
        },
        handleDeleteAllItem () {
            if (this.itemSelection.length == 0) {
                this.$message({
                    message: '请先选择资源',
                    type: 'warning'
                });
                return;
            } else {
                let ids = [];
                this.itemSelection.forEach(item => {
                    ids.push(item.id)
                })
                this.deleteItemId = ids;
            }
            this.deleteItemDialog = true;
        },
        handleDeleteItem (row) {
            this.deleteItemId = [`${row.id}`];
            this.deleteItemDialog = true;
        },
        handleDelete (row) {
            this.deleteId = [`${row.id}`];
            this.deleteDialog = true;
        },
        handleDeleteFun () {
            let data = {
                ids: this.deleteId
            }
            deleteResourcePool(data).then(res => {
                this.deleteDialog = false;
                console.log('删除成功');
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.get_data();
                }, 1500)
            }).catch(error => {
                this.deleteDialog = false;
                console.log(error + 'error');
            });
        },
        handleDeleteItemFun () {
            let data = {
                ids: this.deleteItemId
            }
            deleteResource(data).then(res => {
                this.deleteItemDialog = false;
                console.log('删除成功');
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.get_Item();
                }, 1500)
            }).catch(error => {
                this.deleteItemDialog = false;
                console.log(error + 'error');
            });
        },
        handelAdd () {
            this.addDialog = true;
        },
        addResource () {
            this.addTempItem.content.push({
                value: '',
                key: Date.now()
            });
        },
        deleteResource (item) {
            var index = this.addTempItem.content.indexOf(item)
            if (index !== -1) {
                this.addTempItem.content.splice(index, 1)
            }
        },
        submitItem (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        poolId: this.templateId,
                        content: this.addTempItem.content.map(item => {
                            return item.value;
                        })
                    }
                    addResource(data).then(res => {
                        this.addItemDialog = false;
                        console.log('添加成功');
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        setTimeout(() => {
                            this.get_Item();
                        }, 1500)
                    }).catch(error => {
                        this.addItemDialog = false;
                        console.log(error + 'error');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        // id: this.addForm.id,
                        poolName: this.addForm.poolName,
                        describe: this.addForm.describe
                    }
                    addResourcePool(data).then(res => {
                        this.addDialog = false;
                        console.log('添加成功');
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        setTimeout(() => {
                            this.get_data();
                        }, 1500)
                    }).catch(error => {
                        this.addDialog = false;
                        console.log(error + 'error');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitFormEdit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        id: this.editForm.id,
                        poolName: this.editForm.poolName,
                        describe: this.editForm.describe
                    }
                    editResourcePool(data).then(res => {
                        this.editDialog = false;
                        console.log('编辑成功');
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        setTimeout(() => {
                            this.get_data();
                        }, 1500)
                    }).catch(error => {
                        this.editDialog = false;
                        console.log(error + 'error');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleSizeChange (val) {
            this.get_params.size = val;
            this.get_data();
        },
        handleCurrentChange (val) {
            this.get_params.page = val;
            this.get_data();
        },
        handleSizeInnerChange (val) {
            this.get_inner_params.size = val;
            this.get_Item();
        },
        handleCurrentInnerChange (val) {
            this.get_inner_params.page = val;
            this.get_Item();
        },
        handleSelectionChange (val) {
            console.log(val);
            this.multipleSelection = val;
        },
        handleItemChange (val) {
            this.itemSelection = val;
        },
        submitUpload (formName) {
            console.log()
            // this.$refs.upload.submit();
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        id: this.editTempItem.id,
                        poolId: this.editTempItem.poolId,
                        content: this.editTempItem.content,
                    }
                    editResource(data).then(res => {
                        this.editItemDialog = false;
                        console.log('编辑成功');
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        setTimeout(() => {
                            this.get_Item();
                        }, 1500)
                    }).catch(error => {
                        this.editItemDialog = false;
                        console.log(error + 'error');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // uploadSuccess(response, file, fileList) {
        //   this.file_num++;
        //   if (this.file_num === fileList.length) {
        //     this.$message({
        //       message: '上传成功！',
        //       type: 'success'
        //     })
        //     this.editItemDialog = false;
        //     this.fileList = [];
        //     this.file_num = 0;
        //     setTimeout(() => {
        //
        //     }, 1200)
        //   }
        //
        // },
    }
}
</script>

<style lang="scss" scoped>
.el-input.ips {
    display: block;
    width: 100%;
}

.el-link {
    cursor: pointer;
}

.drawer-pad {
    padding: 0 20px;
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

.event > > > .el-range-input {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
}

.event > > > .el-range-separator {
    color: #fff;
}

.event > > > .el-radio {
    margin: 0 150px 0 30px;
}

.event > > > .el-upload-list__item-name {
    color: #01E9FF;
    
    i {
        color: #01E9FF;
    }
}
</style>
