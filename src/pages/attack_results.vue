<template>
    <div class="event event-wrapper">
        <div class="ub w100 search-area" style="box-sizing: border-box;">
            <div class="ub ub-ac event-content w100">
                <div class="ub ub-ver ub-ac ub-f1">
                    <el-row type="flex" align="middle" class="w100" style="border-radius:0 0 5px 5px;">
                        <el-col :span="12" class="event-btn-col">
                            <el-form :model="get_params">
                                <el-form-item label="攻击结果：" label-width="90px">
                                    <el-input placeholder="请输入" clearable v-model.trim="get_params.name" size="small"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="12" class="ub ub-pe event-btn-col">
                            <searchBtn title="搜 索" @click="searchAssets" />
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="attendance-list table-area" style="padding-bottom: 10px">
            <div class="ub ub-pj w100">
                <div class="list-tips">列表内容</div>
                <div class="ub">
                    <addBtn icon="el-icon-plus" title="添加结果" @click="addDialog = true" />
                </div>
            </div>
            <el-table ref="multipleTable" v-loading="loading" class='bigTable full-table' :data="tableData" border stripe tooltip-effect="dark"
                      @selection-change="handleSelectionChange">
                <el-table-column align="center" type="index" width="50" :index="indexMethod" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="攻击结果">
                </el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.row)">编 辑</el-button>
                        <el-button type="text" @click="delUserBtn(scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--<div class="pagination">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="get_params.page"
                               :page-sizes="[10, 20, 30, 40,50]" :page-size="get_params.size" layout="total, sizes, prev, pager, next" prev-text="上一页"
                               next-text="下一页" :total="total_num">
                </el-pagination>
            </div>-->
        </div>
        <!--增加内容开始-->
        <el-dialog title="添加攻击结果" :visible.sync="addDialog" width="790px" custom-class="attendance-dialog">
            <el-form :model="alarmTypeForm" :rules="rules" ref="alarmTypeForm" :inline="true" class="unit">
                <el-form-item label="攻击结果名称：" prop="name" :label-width="formLabelWidth">
                    <el-input size="small" style="width: 300px" v-model.trim="alarmTypeForm.name" placeholder="请输入" autocomplete="off" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitForm('alarmTypeForm')" />
				<cancleBtn title="取 消" @click="addDialog = false" />
			</span>
        </el-dialog>
        <!--编辑内容开始-->
        <el-dialog title="编辑攻击结果" :visible.sync="editDialog" width="790px" custom-class="attendance-dialog">
            <el-form :model="alarmTypeFormEdit" :rules="rules" ref="alarmTypeFormEdit" :inline="true" class="unit">
                <el-form-item label="攻击结果名称：" prop="name" :label-width="formLabelWidth">
                    <el-input size="small" style="width: 300px" v-model.trim="alarmTypeFormEdit.name" placeholder="请输入" autocomplete="off" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitFormEdit('alarmTypeFormEdit')" />
				<cancleBtn title="取 消" @click="editDialog = false" />
			</span>
        </el-dialog>
        <!--删除-->
        <el-dialog title="删除攻击结果" :visible.sync="userDeleteDialog" width="30%" custom-class="attendance-dialog">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="handleDelete" />
				<cancleBtn title="取 消" @click="userDeleteDialog = false" />
			</span>
        </el-dialog>
    </div>
</template>

<script>
import {
    get_attack_results,
    save_attack_results,
    delete_attack_results,
} from '../server/api.js'
export default {
    name: 'attack_results',
    data() {
        return {
            userDeleteAllDialog: false,
            formLabelWidth: "140px",
            loading: false,
            total_num: 0,
            tableData: [],
            multipleSelection: [],
            get_params: {
                page: 1,
                size: 10,
                name: "",
            },
            res: '',
            userDeleteDialog: false,
            delIds: '',
            addDialog: false,
            editDialog: false,
            alarmTypeForm: {
                name: '',
            },
            alarmTypeFormEdit: {
                id: '',
                name: '',
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入攻击结果名称',
                    trigger: 'blur'
                }],
            },
        }
    },
    watch: {
        'addDialog': {
            handler(newVal, oldVal) {
                if (!newVal) {
                    this.$refs.alarmTypeForm.resetFields();
                }
            },
        },
        'editDialog': {
            handler(newVal, oldVal) {
                if (!newVal) {
                    this.$refs.alarmTypeFormEdit.resetFields();
                }
            },
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.get_data();
        })
    },
    methods: {
        deleteAll() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请先选择告警类型',
                    type: 'warning'
                });
                return;
            }
            this.userDeleteAllDialog = true;
        },
        indexMethod(index) {
            return (this.get_params.page - 1) * this.get_params.size + index + 1;
        },

        searchAssets() {
            this.get_params.page = 1;
            this.get_data();
        },
        get_data() {
            this.loading = true;
            this.tableData = [];
            let data = {
                queryData: {},
                paramsData: {
                    name: this.get_params.name
                }
            }
            get_attack_results(data).then(res => {
                console.log(res);
                this.loading = false;
                // this.total_num = res.sum;
                let list = res;
                if (list.length > 0) {
                    list.forEach(item => {
                        let obj = {};
                        obj.id = item.id;
                        obj.name = item.name;
                        obj.is_sys = item.is_sys;
                        this.tableData.push(obj);
                    })
                }
            }).catch(error => {
                this.loading = false;
                console.log('error' + error);
            })
        },
        addUser() {
            this.addDialog = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addAssets();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addAssets() {
            let data = {
                queryData: {},
                paramsData: {
                    name: this.alarmTypeForm.name,
                }
            }
            save_attack_results(data).then(res => {
                console.log(res);
                this.addDialog = false;
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                setTimeout(() => {
                    this.get_data();
                }, 1500);
            }).catch(error => {
                this.addDialog = false;
                console.log('error' + error);
            });
        },
        editDevice() {
            let data = {
                queryData: {},
                paramsData: {
                    id: this.alarmTypeFormEdit.id,
                    name: this.alarmTypeFormEdit.name
                }
            }
            save_attack_results(data).then(res => {
                console.log(res);
                this.editDialog = false;
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                setTimeout(() => {
                    this.get_data();
                }, 1500);
            }).catch(error => {
                this.editDialog = false;
                console.log('error' + error);
            });
        },
        submitFormEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editDevice(false);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        delUserBtn(row) {
            this.delIds = row.id;
            this.userDeleteDialog = true;
        },
        handleDelete() {
            let data = {
                queryData: {},
                paramsData: {
                    id: this.delIds
                }
            }
            delete_attack_results(data).then(res => {
                this.userDeleteDialog = false;
                console.log('删除成功');
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                setTimeout(() => {
                    this.get_data();
                }, 1500)
            }).catch(error => {
                this.userDeleteDialog = false;
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
        handleEdit(row) {
            console.log('row', row);
            this.alarmTypeFormEdit = {
                id: row.id,
                name: row.name
            };
            this.editDialog = true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
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
</style>
