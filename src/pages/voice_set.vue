<template>
	<div class="event event-wrapper" style="padding-top:0!important;">
		<div class="attendance-list table-area" style="margin-top: 0;padding-bottom: 10px;">
			<div class="ub ub-pj w100">
				<div class="list-tips">列表内容</div>
				<div class="ub">
					<addBtn icon="el-icon-plus" title="添加提示音" @click="addDomainDialog = true" />
					<!--<angleBtn style="margin-left: 10px;" icon="el-icon-delete" title="刪 除" @click="deleteAll" />-->
				</div>
			</div>
			<el-table ref="multipleTable" v-loading="loading" class='bigTable full-table' :data="tableData" border stripe tooltip-effect="dark">
				
				<el-table-column align="center" type="index" width="50" label="序号">
				</el-table-column>
				<el-table-column prop="reportLevelCN" label="告警等级">
				</el-table-column>
				<el-table-column prop="soundNameCN" label="提示音">
				</el-table-column>
				<el-table-column align="center" label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" @click="handleListen(scope.row)">试听</el-button>
						<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button type="text" @click="delUserBtn(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--</div>
    </div>-->
		</div>
		<!--增加内容开始-->
		<el-dialog title="添加" :visible.sync="addDomainDialog" width="600px" custom-class="attendance-dialog">
			<el-form :model="voiceForm" :rules="rules" ref="voiceForm">
				<el-form-item style="margin-bottom: 22px;" label="告警等级：" prop="reportLevel" :label-width="formLabelWidth">
					<el-select style="width:80%;" size="small" clearable v-model="voiceForm.reportLevel" filterable placeholder="请选择">
						<el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 22px;" label="提示音：" prop="reportLevel" :label-width="formLabelWidth">
					<el-select style="width:80%;" size="small" clearable v-model="voiceForm.soundName" filterable placeholder="请选择">
						<el-option v-for="item in vioces" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 22px;" label="启用：" :label-width="formLabelWidth">
					<el-switch style="margin-left: 20px;" v-model="voiceForm.status" active-color="#13ce66"
  inactive-color="#ff4949"></el-switch>
				</el-form-item>
				
				
			</el-form>
			<span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitForm('voiceForm')" />
				<cancleBtn title="取 消" @click="addDomainDialog = false" />
			</span>
		</el-dialog>
		<!--编辑内容开始-->
		<el-dialog title="编辑" :visible.sync="editUserDialog" width="920px" custom-class="attendance-dialog">
			<el-form :model="voiceFormEdit" :rules="rules" ref="voiceFormEdit">
				<el-form-item style="margin-bottom: 22px;" label="告警等级：" prop="reportLevel" :label-width="formLabelWidth">
					<el-select style="width:80%;" size="small" clearable v-model="voiceFormEdit.reportLevel" filterable placeholder="请选择">
						<el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 22px;" label="提示音：" prop="reportLevel" :label-width="formLabelWidth">
					<el-select style="width:80%;" size="small" clearable v-model="voiceFormEdit.soundName" filterable placeholder="请选择">
						<el-option v-for="item in vioces" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 22px;" label="启用：" :label-width="formLabelWidth">
					<el-switch style="margin-left: 20px;" v-model="voiceFormEdit.status" active-color="#13ce66"
  inactive-color="#ff4949"></el-switch>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="submitFormEdit('voiceFormEdit')" />
				<cancleBtn title="取 消" @click="editUserDialog = false" />
			</span>
		</el-dialog>
		<!--删除-->
		<el-dialog title="删除" :visible.sync="userDeleteDialog" width="30%" custom-class="attendance-dialog">
			<span>确定删除吗？</span>
			<span slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="handleDelete" />
				<cancleBtn title="取 消" @click="userDeleteDialog = false" />
			</span>
		</el-dialog>
		<audio ref="alarm" preload="preload">
			<source :src="alarm" type="audio/wav">
		</audio>
		<audio ref="alarm2" preload="preload">
			<source :src="alarm2" type="audio/wav">
		</audio> 
		<audio ref="planeBells" preload="preload">
			<source :src="planeBells" type="audio/wav">
		</audio> 
		<audio ref="alarmBells" preload="preload">
			<source :src="alarmBells" type="audio/wav">
		</audio> 
		<audio ref="oh" preload="preload">
			<source :src="oh" type="audio/wav">
		</audio> 
		<audio ref="waterDrop" preload="preload">
			<source :src="waterDrop" type="audio/wav">
		</audio> 
		<audio ref="dripDrip" preload="preload">
			<source :src="dripDrip" type="audio/wav">
		</audio> 
		<audio ref="danger" preload="preload">
			<source :src="danger" type="audio/wav">
		</audio> 
		<audio ref="systemAlarm" preload="preload">
			<source :src="systemAlarm" type="audio/wav">
		</audio> 
		<audio ref="signal" preload="preload">
			<source :src="signal" type="audio/wav">
		</audio> 
		<audio ref="inDanger" preload="preload">
			<source :src="inDanger" type="audio/wav">
		</audio> 
		<audio ref="bells" preload="preload">
			<source :src="bells" type="audio/wav">
		</audio>
	</div>
</template>

<script>
	import {
		add_voice,
		get_voice,
		edit_voice,
		delete_voice,
		get_voice_level,
	} from '../server/api.js'
	export default {
		name: 'voice_set',
		data() {
			return {
				levels:[],
				vioces:[
					{
						label:'警报',
						value:'alarm',
					},{
						label:'警报2',
						value:'alarm2',
					},{
						label:'飞机上广播的钟声',
						value:'planeBells',
					},{
						label:'警铃',
						value:'alarmBells',
					},{
						label:'哦哦提示',
						value:'oh',
					},{
						label:'水滴',
						value:'waterDrop',
					},{
						label:'水滴滴答',
						value:'dripDrip',
					},{
						label:'危险信号',
						value:'danger',
					},{
						label:'系统告警',
						value:'systemAlarm',
					},{
						label:'信号',
						value:'signal',
					},{
						label:'遇到险情',
						value:'inDanger',
					},{
						label:'钟声',
						value:'bells',
					}
				],
				alarm:require("./audio/警报.wav"),
				alarm2:require("./audio/警报2.wav"),
				planeBells:require("./audio/飞机上广播的钟声.wav"),
				alarmBells:require("./audio/警铃.wav"),
				oh:require("./audio/哦哦提示.wav"),
				waterDrop:require("./audio/水滴.wav"),
				dripDrip:require("./audio/水滴滴答.wav"),
				danger:require("./audio/危险信号.wav"),
				systemAlarm:require("./audio/系统告警.wav"),
				signal:require("./audio/信号.wav"),
				inDanger:require("./audio/遇到险情.wav"),
				bells:require("./audio/钟声.wav"),
				userDeleteAllDialog: false,
				formLabelWidth: "100px",
				loading: false,
				tableData: [],
				userDeleteDialog: false,
				delIds: '',
				addDomainDialog: false,
				editUserDialog: false,
				voiceForm: {
					reportLevel:[],
					soundName:'',
					status:true,
				},
				voiceFormEdit: {
					id: '',
					reportLevel:[],
					soundName:'',
					status:true,
				},
				rules: {
					reportLevel: [{
						required: true,
						message: '请选择告警等级',
						trigger: 'change'
					}],
					soundName: [{
						required: true,
						message: '请选择告警提示音',
						trigger: 'change'
					}],
				},
			}
		},
		watch: {
			'addDomainDialog': {
				handler(newVal, oldVal) {
					if (!newVal) {
						this.$refs.voiceForm.resetFields();
					}
				},
			},
			'editUserDialog': {
				handler(newVal, oldVal) {
					if (!newVal) {
						this.$refs.voiceFormEdit.resetFields();
					}
				},
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.get_data();
				this.get_voice_level();
			})
		},
		methods: {
			handleListen(row){
				this.playFun(row.soundName);
			},
			playFun(music){
				this.$refs[music].play();
			},
			get_voice_level(){
				this.levels = [];
				let data = {
					queryData: {},
					paramsData: {}
				}
				get_voice_level(data).then(res => {
					console.log('33333333333333333',res)
					if(res.length>0){
						res.forEach(item=>{
							let obj = {};
							obj.label = item.name;
							obj.value = item.value;
							this.levels.push(obj);
						})
						
					}
				}).catch(error => {
					console.log('error', error)
				})
				
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
					paramsData: {}
				}
				get_voice(data).then(res => {
					console.log('提示音列表',res);
					this.loading = false;
					if (res.length > 0) {
						res.forEach(item => {
							let obj = {};
							obj.id = item.id;
							obj.reportLevel = item.reportLevel;
							obj.soundName = item.soundName;
							obj.soundNameCN = this.vioces.filter(_item=>_item.value === item.soundName)[0].label;
							obj.reportLevelCN = item.reportLevelCN;
							obj.status = item.status;
							obj.statusCN = item.statusCN;
							obj.createTime = item.createTime;
							this.tableData.push(obj);
						})
					}
				}).catch(error => {
					this.loading = false;
					console.log('error' + error);
				})
			},
			addUser() {
				this.addDomainDialog = true;
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
						reportLevel:this.voiceForm.reportLevel,
						soundName:this.voiceForm.soundName,
						status:this.voiceForm.status ? 1 : 0,
					}
				}
				add_voice(data).then(res => {
					console.log(res);
					this.addDomainDialog = false;
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					setTimeout(() => {
						this.get_data();
					}, 1500);
				}).catch(error => {
					this.addDomainDialog = false;
					console.log('error' + error);
				});
			},
			editvoice() {
				let data = {
					queryData: {},
					paramsData: {
						id: this.voiceFormEdit.id,
						reportLevel:this.voiceFormEdit.reportLevel,
						soundName:this.voiceFormEdit.soundName,
						status:this.voiceFormEdit.status ? 1 : 0,
					}
				}
				edit_voice(data).then(res => {
					console.log(res);
					this.editUserDialog = false;
					this.$message({
						message: '修改成功',
						type: 'success'
					});
					setTimeout(() => {
						this.get_data();
					}, 1500);
				}).catch(error => {
					this.editUserDialog = false;
					console.log('error' + error);
				});
			},
			submitFormEdit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.editvoice();
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
				delete_voice(data).then(res => {
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
			handleEdit(row) {
				console.log('row', row);
				this.voiceFormEdit = {
					id: row.id,
					reportLevel:row.reportLevel,
					soundName:row.soundName,
					status:row.status == 1 ? true : false,
				};
				this.editUserDialog = true;
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
    .event >>>.attendance-list.table-area {
        min-height: 829px;
    }
</style>
