<template>
   <div :class="{'before-line': hasDownItem}" class="toogle-box">
       <div v-if="constraintList.length != 0" v-for="(item,index) in constraintList" :key="index" class="tree-line inner-box" :class="{'first': first}" style="padding-left: 40px;margin-top:10px ;min-height: 30px;line-height: 30px;color: antiquewhite;position: relative">
           <i @click.stop="toogleChild" :class="{'iconfont icon-zhedie': item.junctionType, 'is-show': true, 'fold-arrow': item.junctionType}" style="position: absolute;cursor: pointer"></i>
           <div style="position: relative">
               <el-row style="font-size: 0;" v-if="!item.junctionType">
                   <el-select v-model="item.constraintName"
                              placeholder="请选择"
                              size="mini"
                              style="width: 160px"
                              @change="clearAfterData(item)"
                              :popper-append-to-body="false"
                              popper-class="select-option innerSelect">
                       <el-option v-for="(_item,  index) in switch_options()" :value="_item.value" :label="_item.label" :key="index"></el-option>
                   </el-select>
                
                   <el-select v-model="item.operator"
                              placeholder="请选择"
                              v-if="item.constraintName !== 'historyIP'"
                              size="mini"
                              :popper-append-to-body="false"
                              popper-class="select-option innerSelect"
                              style="width: 120px;margin: 0 10px">
                       <el-option v-for="(item,index) in (['callDateTime','streamBegin','streamEnd'].includes(item.constraintName) ? callDate_options : common_options)" :key="index" :value="item.value" :label="item.label"></el-option>
                   </el-select>
                   <el-select v-model="item.operator"
                              placeholder="请选择"
                              :popper-append-to-body="false"
                              v-if="item.constraintName === 'historyIP'"
                              size="mini"
                              popper-class="select-option innerSelect"
                              style="width: 120px;margin: 0 10px">
                       <el-option value="==" label="等于"></el-option>
                   </el-select>
                
                   <el-select class="constant-select"
                              @change="item.value = ''"
                              :popper-append-to-body="false"
                              v-model="item.dataType" placeholder="请选择" size="mini" style="width: 74px;">
                       <el-option label="常量" value="0"></el-option>
                       <el-option label="变量" value="1"></el-option>
                   </el-select>
                   <el-select :popper-append-to-body="false" v-if="item.constraintName === 'alertstat' && item.dataType === '0'" v-model="item.value" placeholder="请选择" size="mini" style="width: 180px;">
                       <el-option label="成功" value="1"></el-option>
                       <el-option label="疑似成功" value="2"></el-option>
                       <el-option label="失败" value="3"></el-option>
                   </el-select>
                   
                   <el-select :popper-append-to-body="false" v-if="item.constraintName === 'labels' && item.dataType === '0'" v-model="item.value" placeholder="请选择" size="mini" style="width: 180px;">
                       <el-option :label="item.name" :value="item.name" v-for="(item, index) in subjectLabelList" :key="index"></el-option>
                   </el-select>

                   <el-select :popper-append-to-body="false" v-if="item.constraintName === 'isBoundary' && item.dataType === '0'" v-model="item.value" placeholder="请选择" size="mini" style="width: 180px;">
                       <el-option label="否" value="0"></el-option>
                       <el-option label="是" value="1"></el-option>
                   </el-select>
                   

                   <el-select v-if="item.constraintName === 'assetType' && item.dataType === '0'" v-model="item.value" placeholder="请选择" clearable size="mini" style="width: 180px;" popper-class="tree_dropdown" filterable>
                       <el-option v-for="(item, index) in assetTypeList" :key="index" :label="item" :value="item"></el-option>
                   </el-select>
                   <el-select v-if="item.constraintName === 'operationSystem' && item.dataType === '0'" v-model="item.value" placeholder="请选择" clearable size="mini" style="width: 180px;" popper-class="tree_dropdown" filterable>
                       <el-option v-for="(item, index) in operationSystemList" :key="index" :label="item" :value="item"></el-option>
                   </el-select>
                   <el-select v-if="item.constraintName === 'zoneName' && item.dataType === '0'" v-model="item.value" placeholder="请选择" clearable size="mini" style="width: 180px;" popper-class="tree_dropdown" filterable>
                       <el-option v-for="(item, index) in zoneNameList" :key="index" :label="item" :value="item"></el-option>
                   </el-select>
                    <!--情报-->
                   <el-select v-if="item.constraintName === 'menaceType' && item.dataType === '0'" v-model="item.value" placeholder="请选择" clearable size="mini" style="width: 180px;" popper-class="tree_dropdown" filterable>
                       <el-option label="IP" value='0'></el-option>
                       <el-option label="URL" value='1'></el-option>
                       <el-option label="域名" value='2'></el-option>
                       <el-option label="样本信息" value='3'></el-option>
                   </el-select>
                   <el-select v-if="item.constraintName === 'menaceSources' && item.dataType === '0'" v-model="item.value" placeholder="请选择" clearable size="mini" style="width: 180px;" popper-class="tree_dropdown" filterable>
                       <el-option label="Venuseye " value='0'></el-option>
                       <el-option label="内部情报" value='1'></el-option>
                       <el-option label="微步" value='2'></el-option>
                   </el-select>
                   <el-select v-if="item.constraintName === 'survival' && item.dataType === '0'" v-model="item.value" placeholder="请选择" clearable size="mini" style="width: 180px;" popper-class="tree_dropdown" filterable>
                       <el-option label="否 " value='0'></el-option>
                       <el-option label="是" value='1'></el-option>
                   </el-select>
                   <el-input-number v-if="item.constraintName === 'threatLevel' && item.dataType === '0'" v-model="item.value" :controls="false" :min="0" :max="10" size="mini"></el-input-number>
                   <el-input-number v-if="item.constraintName === 'credit' && item.dataType === '0'" v-model="item.value" :controls="false" :min="0" size="mini"></el-input-number>
                   <!--<el-select v-if="item.constraintName === 'attackType' && item.dataType === '0'" v-model="item.value" placeholder="请选择" clearable size="mini" style="width: 180px;" popper-class="tree_dropdown" filterable>
                       <el-option v-for="(item, index) in attackWays" :key="item.code" :label="item.name" :value="item.code"></el-option>
                   </el-select>-->
                   
                   <el-date-picker
                       v-model="item.value"
                       v-if="['callDateTime','streamBegin','streamEnd'].includes(item.constraintName)"
                       style="width: 180px;font-size: 12px"
                       class="handleTime"
                       popper-class="handleDrop"
                       type="datetime"
                       size="mini"
                       value-format="timestamp"
                       placeholder="选择日期时间">
                   </el-date-picker>
                   <el-input v-if="!(['callDateTime','streamBegin','streamEnd', 'alertstat', 'assetType', 'isBoundary', 'operationSystem', 'zoneName', 'menaceType', 'menaceSources', 'survival', 'threatLevel', 'credit', 'labels'].includes(item.constraintName)) || item.dataType === '1'" v-model="item.value" :disabled="item.operator === 'in' || item.operator === 'not in'" placeholder="请输入值" size="mini" clearable class="w300">
                   </el-input>
                   <el-dropdown class="constant-select" trigger="click" icon="el-icon-more" v-if="(item.operator === 'in' || item.operator === 'not in') || (item.dataType === '1' && item.operator !== 'in' && item.operator !== 'not in')">
                       <el-button size="mini" class="inner-btn">
                           <i class="el-icon-more" style="color: #fff"></i>
                       </el-button>
                       <el-dropdown-menu slot="dropdown" :append-to-body="false">
                           <el-dropdown-item data-type="1" v-if="item.operator === 'in' || item.operator === 'not in'" @click.native="moreFields($event,item)">资源池</el-dropdown-item>
                           <el-dropdown-item data-type="2" v-if="item.dataType === '1' && item.operator !== 'in' && item.operator !== 'not in'" @click.native="moreFields($event,item)">字段表</el-dropdown-item>
                       </el-dropdown-menu>
                   </el-dropdown>
    
                   <div v-if="item.fieldBindName" class="box-title" style="display: inline-block;vertical-align: top;margin-right: 0px!important;margin-top: 1px">
                       <span style="margin-right: 5px">变量名：</span><span style="color: #d4d116">{{item.fieldBindName}}</span>
                   </div>
                
                   <div class="operate-btn data-fields" style="display: inline-block">
                       <el-tooltip class="item"
                                   popper-class="atooltip"
                                   effect="dark" content="属性" placement="top">
                           <i class="iconfont icon-shuxing" @click="openField(item, index)"></i>
                       </el-tooltip>
                       
                       <el-dropdown trigger="click" v-if="factType != 'HistoryIPEvent'">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向下添加" placement="top">
                               <i class="iconfont icon-xiangxiatianjia" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                           
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="addFields_down($event, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="addFields_down($event, index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-dropdown trigger="click" v-if="factType != 'HistoryIPEvent'">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向上添加" placement="top">
                               <i class="iconfont icon-xiangshangtianjia" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                           
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="addFields_up($event, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="addFields_up($event, index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-tooltip class="item"
                                   popper-class="atooltip"
                                   effect="dark" content="删除" placement="top">
                           <i class="el-icon-close" @click="deleteFields(index)"></i>
                       </el-tooltip>
                       
                   </div>
               </el-row>
            
               <el-row  v-if="item.junctionType == '||'" style="position: relative;font-size: 0">
                   <el-dropdown trigger="click" class="fold-arrow-before">
                       <el-button type="primary" size="mini">
                           {{item.junctionType == '&&' ? 'AND' : 'OR'}}<i class="el-icon-arrow-down el-icon--right"></i>
                       </el-button>
                       <el-dropdown-menu slot="dropdown" :append-to-body="false" ref="mydropd">
                           <el-dropdown-item data-type="1" @click.native="selectChange($event, item)">AND</el-dropdown-item>
                           <el-dropdown-item data-type="2" @click.native="selectChange($event, item)">OR</el-dropdown-item>
                           <!--<el-dropdown-item data-type="3" @click.native="selectChange">NOT</el-dropdown-item>-->
                       </el-dropdown-menu>
                   </el-dropdown>
                
                   <div class="operate-btn" style="display: inline-block">
                       <el-dropdown trigger="click">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向下添加" placement="top">
                               <i class="iconfont icon-xiangxiatianjia" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                           
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="addFields_down($event, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="addFields_down($event, index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-dropdown trigger="click">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向上添加" placement="top">
                               <i class="iconfont icon-xiangshangtianjia" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                          
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="addFields_up($event, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="addFields_up($event, index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-dropdown trigger="click">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向内添加" placement="top">
                               <i class="el-icon-plus" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                           
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="innerFields($event,item, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="innerFields($event,item,index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-tooltip class="item"
                                   popper-class="atooltip"
                                   effect="dark" content="删除" placement="top">
                           <i class="el-icon-close" @click="deleteFields(index)"></i>
                       </el-tooltip>
                       
                   </div>
               </el-row>
               <el-row  v-if="item.junctionType == '&&'" style="position: relative;font-size: 0">
                   <el-dropdown trigger="click" class="fold-arrow-before">
                       <el-button type="primary" size="mini">
                           {{item.junctionType == '&&' ? 'AND' : 'OR'}}<i class="el-icon-arrow-down el-icon--right"></i>
                       </el-button>
                       <el-dropdown-menu slot="dropdown" :append-to-body="false" ref="mydropd2">
                           <el-dropdown-item data-type="1" @click.native="selectChange($event, item)">AND</el-dropdown-item>
                           <el-dropdown-item data-type="2" @click.native="selectChange($event, item)">OR</el-dropdown-item>
                           <!--<el-dropdown-item data-type="3" @click.native="selectChange">NOT</el-dropdown-item>-->
                       </el-dropdown-menu>
                   </el-dropdown>
        
                   <div class="operate-btn" style="display: inline-block">
                       <el-dropdown trigger="click">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向下添加" placement="top">
                               <i class="iconfont icon-xiangxiatianjia" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                           
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="addFields_down($event, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="addFields_down($event, index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-dropdown trigger="click">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向上添加" placement="top">
                               <i class="iconfont icon-xiangshangtianjia" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                           
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="addFields_up($event, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="addFields_up($event, index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-dropdown trigger="click">
                           <el-tooltip class="item"
                                       popper-class="atooltip"
                                       effect="dark" content="向内添加" placement="top">
                               <i class="el-icon-plus" style="font-size: 14px;color: #0af0f3;margin-right: 5px;cursor: pointer;"></i>
                           </el-tooltip>
                           
                           <el-dropdown-menu slot="dropdown" :append-to-body="false">
                               <el-dropdown-item data-type="1" @click.native="innerFields($event,item, index)">字段名</el-dropdown-item>
                               <el-dropdown-item data-type="2" @click.native="innerFields($event,item,index)">逻辑符</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                       <el-tooltip class="item"
                                   popper-class="atooltip"
                                   effect="dark" content="删除" placement="top">
                           <i class="el-icon-close" @click="deleteFields(index)"></i>
                       </el-tooltip>
                       
                   </div>
               </el-row>
           </div>
        
           <drools_tree_data style="position: relative" @upResource="upResource" @upFields="upFields" :variate_arr="variate_arr" :constraintList="item.constraintList" :factType="factType" :hasDownItem="constraintList[index+1] ? true : false" :assetTypeList="assetTypeList" :operationSystemList="operationSystemList" :zoneNameList="zoneNameList" :subjectLabelList="subjectLabelList"></drools_tree_data>
       </div>
       
       <div v-if="constraintList.length == 0 && first" style="padding-left: 40px;margin-top:10px;color: antiquewhite" class="tree-line-bottom">
           <el-row style="position: relative;">
               <i class="iconfont icon-zhedie fold-arrow-bottom"></i>
               <el-dropdown trigger="click">
                   <i class="el-icon-circle-plus-outline" style="font-size: 18px;line-height: 30px;color: #0af0f3;cursor: pointer"></i>
                   <el-dropdown-menu slot="dropdown" :append-to-body="false">
                       <el-dropdown-item v-if="factType != 'HistoryIPEvent'" data-type="1" @click.native="bottomAddData($event)">逻辑符</el-dropdown-item>
                       <el-dropdown-item data-type="2" @click.native="bottomAddData($event)">字段名</el-dropdown-item>
                   </el-dropdown-menu>
               </el-dropdown>
           </el-row>
       </div>
    
       <el-dialog title="属性"
                  width="700px"
                  :visible.sync="fieldDialog"
                  custom-class="attendance-dialog">
           <el-form ref="addRuleAtt_Form" label-width="80px">
               <el-form-item label="变量名：" style="margin-bottom: 10px" >
                   <el-input v-model="fieldBindName" placeholder="请输入" size="small" style="width: 300px" @blur="judgeFieldBindName(fieldBindName)"></el-input>
               </el-form-item>
        
           </el-form>
           <div slot="footer" class="dialog-footer">
               <searchBtn title="确 定" @click= handleFieldBindName />
               <cancleBtn title="取 消" @click='fieldDialog = false' />
           </div>
       </el-dialog>
   </div>
</template>

<script>
export default {
    name: "drools_tree_data",
    data () {
        return {
            test: '',
            currentSelect: 'AND',
            fieldDialog: false,
            fieldBindName: '',
            copyItem: '',
            attackWays: [{"code":0,"name":"Tor节点"},{"code":1,"name":"木马回连服务器"},{"code":2,"name":"木马下载服务器"},{"code":3,"name":"感染型病毒"},{"code":4,"name":"voip攻击"},{"code":5,"name":"Web漏洞攻击"},{"code":6,"name":"网络蠕虫"},{"code":7,"name":"Sinkhole重定向IP"},{"code":8,"name":"可疑文件"},{"code":9,"name":"记录数据"},{"code":10,"name":"色情"},{"code":11,"name":"赌博"},{"code":12,"name":"DGA域名"},{"code":13,"name":"全球地域IP"},{"code":14,"name":"中国移动IP"},{"code":15,"name":"VOIP节点"},{"code":16,"name":"IDC节点"},{"code":17,"name":"VPN节点"},{"code":18,"name":"C2节点"},{"code":19,"name":"僵尸网络"},{"code":20,"name":"proxy代理"},{"code":21,"name":"FastFlux节点"},{"code":22,"name":"扫描器节点"},{"code":23,"name":"恶意软件"},{"code":24,"name":"漏洞利用"},{"code":25,"name":"钓鱼网址"},{"code":26,"name":"广告"},{"code":27,"name":"APT攻击"},{"code":28,"name":"远控木马"},{"code":29,"name":"网银大盗"},{"code":30,"name":"僵尸主机"},{"code":31,"name":"僵尸网络C2"},{"code":32,"name":"爆破攻击"},{"code":33,"name":"挖矿"},{"code":34,"name":"DDOS攻击"},{"code":35,"name":"欺诈"},{"code":36,"name":"流氓软件"},{"code":37,"name":"IOT攻击C2"},{"code":38,"name":"IOT失陷主机"},{"code":39,"name":"宏病毒"},{"code":40,"name":"MAC恶意软件"},{"code":41,"name":"恶意脚本"},{"code":42,"name":"恶意SSL证书"},{"code":43,"name":"恶意网站"},{"code":44,"name":"勒索软件"},{"code":45,"name":"主机扫描"},{"code":46,"name":"SinkholeC2"},{"code":47,"name":"网络爬虫"},{"code":48,"name":"间谍软件"},{"code":49,"name":"窃密木马"}],
            common_options: [{
                label: '等于',
                value: '=='
            }, {
                label: '不等于',
                value: '!='
            }, {
                label: '大于',
                value: '>'
            }, {
                label: '小于',
                value: '<'
            }, {
                label: '大于或等于',
                value: '>='
            }, {
                label: '小于或等于',
                value: '<='
            }, {
                label: 'matches',
                value: 'matches',
            }, {
                label: 'not matches',
                value: 'not matches'
            }, {
                label: 'contains',
                value: 'contains'
            }, {
                label: 'not contains',
                value: 'not contains'
            }, {
                label: 'in',
                value: 'in'
            }, {
                label: 'not in',
                value: 'not in'
            }],
            
            AlarmEvent_options: [{
                label: '设备名', value: 'alarmName'
            }, {
                label: '设备类型', value: 'alarmType'
            }, {
                label: '源IP', value: 'srcIp'
            }, {
                label: '日志标签', value: 'labels'
            }, {
                label: '攻击状态', value: 'alertstat'
            }, {
                label: '源端口', value: 'srcPort'
            }, {
                label: '目的Ip', value: 'desIp'
            }, {
                label: '目的端口', value: 'desPort'
            }, {
                label: '告警名称', value: 'subject'
            }, {
                label: '操作', value: 'operation'
            }, {
                label: '结果', value: 'result'
            }, {
                label: '响应', value: 'response'
            }, {
                label: '事件分类', value: 'eventCategory'
            }, {
                label: '事件等级', value: 'eventLevel'
            }, {
                label: '网络协议', value: 'agreement'
            }, {
                label: '设备IP', value: 'hostIp'
            }, {
                label: '原始消息', value: 'messaggioOriginale'
            }, {
                label: '生效时间', value: 'time'
            }, {
                label: '操作时间', value: 'callDateTime'
            }],
            TrafficEvent_options: [{
                label: '协议名称', value: 'protocal'
            }, {
                label: '源IP', value: 'srcIp'
            }, {
                label: '源端口', value: 'srcPort'
            }, {
                label: '目的Ip', value: 'desIp'
            }, {
                label: '目的端口', value: 'desPort'
            }, {
                label: '协议内容', value: 'content'
            }, {
                label: 'IP版本', value: 'IPv'
            }, {
                label: '流起始时间', value: 'streamBegin'
            }, {
                label: '流结束时间', value: 'streamEnd'
            }, {
                label: '发出报文包数', value: 'sentPacketsNum'
            }, {
                label: '发出报文字节数', value: 'sentBytesNum'
            }, {
                label: '接收报文包数', value: 'acceptPacketsNum'
            }, {
                label: '接收报文字节数', value: 'acceptBytesNum'
            }, {
                label: 'NAT转换前源地址', value: 'srcIpNAT'
            }, {
                label: 'NAT转换前源端口', value: 'srcPortNAT'
            }, {
                label: 'NAT转换前目的地址', value: 'desIpNAT'
            }, {
                label: 'NAT转换前目的端口', value: 'desPortNAT'
            }, {
                label: '生效时间', value: 'time'
            }, {
                label: '操作时间', value: 'callDateTime'
            }],
            HostEvent_options:[{
                label: '主机名称', value: 'hostName'
            }, {
                label: '主机IP', value: 'hostIp'
            }, {
                label: '源IP', value: 'srcIp'
            }, {
                label: '源端口', value: 'srcPort'
            }, {
                label: '用户名称', value: 'userName'
            }, {
                label: '结果', value: 'result'
            }, {
                label: '目的IP', value: 'desIp'
            }, {
                label: '目的端口', value: 'desPort'
            }, {
                label: '响应', value: 'response'
            }, {
                label: '设备类型', value: 'hostType'
            }, {
                label: '事件等级', value: 'eventLevel'
            }, {
                label: '原始消息', value: 'messaggioOriginale'
            }, {
                label: '来源', value: 'source'
            }, {
                label: '事件id', value: 'eventId'
            }, {
                label: '任务类别', value: 'taskType'
            }, {
                label: '操作内容', value: 'command'
            }, {
                label: '生效时间', value: 'time'
            }, {
                label: '操作时间', value: 'callDateTime'
            }],
            AssetEvent_options: [{
                label: '资产ip', value: 'assetIp'
            }, {
                label: '资产端口', value: 'assetPort'
            }, {
                label: '资产名称', value: 'deviceName'
            }, {
                label: '设备类型', value: 'assetType'
            }, {
                label: '资产标识', value: 'uniqueCode'
            }, {
                label: '业务系统', value: 'operationSystem'
            }, {
                label: '域名', value: 'domainName'
            }, {
                label: '型号', value: 'modelInfo'
            }, {
                label: '系统', value: 'pcSystem'
            }, {
                label: '安全域', value: 'zoneName'
            }, {
                label: '是否边界资产', value: 'isBoundary'
            }, {
                label: '生效时间', value: 'time'
            }, {
                label: '操作时间', value: 'callDateTime'
            }],
            
            MenaceEvent_options: [
            /*{
                label: '威胁情报ip', value: 'menaceIp'
            }, */
            {
                label: '情报类型', value: 'menaceType'
            }, {
                label: '情报内容', value: 'menaceContent'
            }, {
                label: '情报来源', value: 'menaceSources'
            }, {
                label: '是否存活', value: 'survival'
            }, {
                label: '威胁程度', value: 'threatLevel'
            }, {
                label: '信誉度', value: 'credit'
            },
            /*{
                label: '攻击方式', value: 'attackType'
            }, */
                {
                label: '生效时间', value: 'time'
            }, {
                label: '操作时间', value: 'callDateTime'
            }],
            VulnerabilityEvent_options: [{
                label: '资产漏洞ip', value: 'vulnerabilityIp'
            }, {
                label: '漏洞类别', value: 'vulnerabilityType'
            }, {
                label: '漏洞编号', value: 'vulnerabilityNo'
            }, {
                label: '生效时间', value: 'time'
            }, {
                label: '操作时间', value: 'callDateTime'
            }],
            HistoryIPEvent_options: [{
                label: '历史IP', value: 'historyIP'
            }],
    
            callDate_options: [{
                label: '等于',
                value: '=='
            }, {
                label: '不等于',
                value: '!='
            }, {
                label: '大于',
                value: '>'
            }, {
                label: '小于',
                value: '<'
            }, {
                label: '大于或等于',
                value: '>='
            }, {
                label: '小于或等于',
                value: '<='
            }],
    
            IP_options: [
                {
                    label: '等于',
                    value: '=='
                }
            ],
        }
    },
    props: ['constraintList','factType', 'hasDownItem', 'first', 'variate_arr', 'assetTypeList', 'operationSystemList','zoneNameList', 'subjectLabelList'],
    created () {
        console.log(this.constraintList)
        console.log(this.factType)
    },
    mounted () {
    
    },
    methods: {
        toogleChild (e) {
            //console.log($(e.target).siblings('.toogle-box'))
            if ($(e.target).hasClass('is-show')) {
                $(e.target).toggleClass('is-show')
                $(e.target).siblings('.toogle-box').hide();
            } else {
                $(e.target).toggleClass('is-show')
                $(e.target).siblings('.toogle-box').show();
            }
        },
        switch_options () {
            if (this.factType) {
                return this[[this.factType]+'_options']
            } else {
                return [];
            }
        },
        judgeFieldBindName (name) {
            console.log(name)
            if (name !== '') {
                if (name[0] !== '$') {
                    this.fieldBindName = '';
                    this.$message.warning('变量名必须以$符开头');
                    return ;
                }
            }
        },
        moreFields (e, item) {
            console.log(e.target.dataset.type)
            let type = e.target.dataset.type;
            if (type == 1 ) {
                this.$emit('upResource', item)
            } else if (type == 2) {
                console.log(this.variate_arr);
                console.log(item.value)
                this.$emit('upFields', item)
                // if (this.variate_arr.length == 0 || !this.variate_arr.includes(item.value)) {
                //     this.$message.warning('规则中没有您输入的变量，请输入正确的变量名')
                // } else {
                //     this.$emit('upFields', item, this.factType)
                // }
            }
        },
        upResource  (val) {
            this.$emit('upResource',val)
        },
        upFields  (val) {
            this.$emit('upFields',val)
        },
        selectChange(e, item) {
            console.log(e.target.dataset.type)
            let type = e.target.dataset.type;
            console.log(item)
            if (type == 1 ) {
                item.junctionType = '&&'
            } else if (type == 2) {
                item.junctionType = '||'
            }
        },
        clearAfterData (item) {
            item.operator = '';
            item.value = '';
            item.dataType = '0';
            item.fieldBindName = '';
        },
        openField(item,index) {
            console.log(item)
            this.fieldBindName = item.fieldBindName;
            this.copyItem = item;
            this.fieldDialog = true;
        },
        handleFieldBindName () {
            if (this.copyItem) {
                this.copyItem.fieldBindName = this.fieldBindName;
            }
            console.log()
            this.fieldDialog = false;
        },
    
        addFields_down (e,index) {
            let dtype = e.target.dataset.type;
            if (dtype == 1 ) {
                this.constraintList.splice(index+1, 0 ,{
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '',
                    dataType: '0',
                    constraintList: [],
                })
            } else if (dtype == 2) {
                this.constraintList.splice(index+1, 0, {
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '&&',
                    dataType: '0',
                    constraintList: [],
                })
            }
        },
        addFields_up (e,index) {
            let dtype = e.target.dataset.type;
            if (dtype == 1 ) {
                this.constraintList.splice(index, 0 ,{
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '',
                    dataType: '0',
                    constraintList: [],
                })
            } else if (dtype == 2) {
                this.constraintList.splice(index, 0, {
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '&&',
                    dataType: '0',
                    constraintList: [],
                })
            }
        },
    
        deleteFields(index) {
            this.constraintList.splice(index, 1);
        },
        innerFields(e, item, index) {
            console.log(item)
            let dtype = e.target.dataset.type;
            if (dtype == 1 ) {
                item.constraintList.push({
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '',
                    dataType: '0',
                    constraintList: [],
                })
            } else if (dtype == 2) {
                item.constraintList.push({
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '&&',
                    dataType: '0',
                    constraintList: [],
                })
            }
        },
    
        bottomAddData(e, item) {
            let dtype = e.target.dataset.type;
            console.log(item)
            if (dtype == 1 ) {
                this.constraintList.push({
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '&&',
                    dataType: '0',
                    constraintList: [],
                })
            } else if (dtype == 2) {
                this.constraintList.push({
                    constraintName: '',
                    operator: '',
                    value: '',
                    fieldBindName: '',
                    junctionType: '',
                    dataType: '0',
                    constraintList: [],
                })
            }
        }
    }
}
</script>

<style scoped>
.inner-box {
    white-space: nowrap;
    position: relative;
}
.tree-line::before {
    content: "";
    height: 40px;
    width: 1px;
    position: absolute;
    left: -15px;
    top: -25px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}

.tree-line.first::before {
    content: "";
    height: 42px;
    width: 1px;
    position: absolute;
    left: -15px;
    top: -27px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}
.tree-line.first::after {
    content: "";
    width: 36px;
    height: 20px;
    position: absolute;
    left: -14px;
    top: 14px;
    border-width: 1px;
    border-top: 1px dashed #bfdbe6;
}
.tree-line::after {
    content: "";
    width: 36px;
    height: 20px;
    position: absolute;
    left: -14px;
    top: 14px;
    border-width: 1px;
    border-top: 1px dashed #bfdbe6;
}
.tree-line-bottom::before {
    content: "";
    height: 44px;
    width: 1px;
    position: absolute;
    left: -15px;
    top: -20px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}
.tree-line-bottom::after {
    content: "";
    width: 30px;
    height: 20px;
    position: absolute;
    left: -14px;
    top: 24px;
    border-width: 1px;
    border-top: 1px dashed #bfdbe6;
}
.fold-arrow {
    position: absolute;
    width: 14px;
    height: 14px;
    left: 19px;
    top: 0px;
    font-size: 14px;
    z-index: 9;
    color: #fff;
    text-shadow: 0 0 5px #00d2ff;
}
.fold-arrow.is-show {
    transform: rotate(90deg);
    transform-origin: center bottom;
}
.fold-arrow-bottom {
    position: absolute;
    width: 14px;
    height: 14px;
    left: -20px;
    top: 8px;
    font-size: 14px;
    z-index: 9;
    color: #fff;
    text-shadow: 0 0 8px #00d2ff;
}

.tree-line >>>.el-input-group__append, .tree-line>>>.el-input-group__prepend {
    background-color: transparent !important;
    border: 1px solid #1cd7fa;
    border-right: none;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
}
.tree-line >>>.el-input-group__append {
    padding: 0 8px;
}
.operate-btn {
    font-size: 0;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
}
.operate-btn i {
    font-size: 12px !important;
    color: #0af0f3;
    margin-right: 10px !important;
    cursor: pointer;
}
.data-fields.operate-btn i {
    margin-right: 10px !important;
}
.el-dropdown-menu {
    width: 60px !important;
    padding: 5px 0!important;
    box-sizing: border-box;
}
.el-dropdown-menu__item {
    text-align: center;
    padding: 0 !important;
}
.w300 {
    width: 260px;
}
.inner-btn {
    width: 20px;
    height: 28px;
    box-sizing: border-box;
    border-radius: 0;
    padding: 7px 0;
    background: transparent !important;
    border: 1px solid #1cd7fa;
    border-left: none;
    -webkit-box-shadow: inset 0px 0px 7px 0px #389bf7;
    box-shadow: inset 0px 0px 7px 0px #389bf7;
}
.inner-btn:hover {
    background: transparent !important;
    border: 1px solid #1cd7fa;
    border-left: none;
    -webkit-box-shadow: 0px 0px 7px 0px #389bf7 inset;
    box-shadow: 0px 0px 7px 0px #389bf7 inset;
}
.box-title {
    position: relative;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    border-radius: 0px;
    width: 160px;
    background-color: transparent;
    border: 1px solid #1cd7fa;
    -webkit-box-shadow: 0px 0px 7px 0px #389bf7 inset;
    box-shadow: 0px 0px 7px 0px #389bf7 inset;
    color: #fff;
    font-size: 12px;
    padding: 0 10px 0 15px;
    margin: 0 10px;
    overflow:hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/*超出部分显示省略号*/
    white-space:nowrap;/*规定段落中的文本不进行换行 */
}
/*表示逻辑符下面还有上一级的同级*/
.before-line::before {
    content: "";
    height: calc(100% + 10px);
    width: 1px;
    position: absolute;
    left: -55px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}
.tree-line >>> .constant-select .el-input__inner, .tree-line >>> .constant-select{
    background: rgba(0,198,255,.15) !important;
    border: #1cd7fa;
    border-radius: 0;
}
.tree-line >>> .constant-select .el-input__inner {
    border: 1px solid #1cd7fa;
    border-right: none;
}
/*.toogle-box >>>.atooltip{
    border: 1px solid #1cd7fa !important;
    padding: 8px 10px;
    background: #042136 !important;
    border: 1px solid #1cd7fa;
    -webkit-box-shadow: 0px 0px 7px #389bf7 inset;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
}*/
.toogle-box >>> .iconfont.icon-zhedie.fold-arrow {
    text-shadow: 0px 0px 8px #00d2ff;
}
.el-select-dropdown__item.selected {
    font-weight: normal;
}
.el-select-dropdown__item.selected span {
    color: #fff;
}
.tree_dropdown .el-select-dropdown__item.hover span{
    color: #fff;
}
.el-tree{
    background: rgba(0,0,0,0);
}
.tree_dropdown .el-select-dropdown__item.hover span{
    color: #fff;
}
</style>
<style>
    .custom-tree-node span:hover {
        color: #00E9FF !important;
    }
    .el-tree-node__content {
        background-color: rgba(0,0,0,0)!important;
    }
    /*li::-webkit-scrollbar {
        display: none!important;
    }*/
    .el-tree-node__content:hover,.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background: none !important;
    }
   
</style>
