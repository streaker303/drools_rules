<template>
    <div class="container even-content event event-wrapper" style="padding-top:0!important;">
        <div class="tabs attendance-list table-area" style="margin-top: 0px;padding-bottom: 10px;">
            <el-tabs v-model="activeName" style="margin-top: 30px">
                <!--安全警告事件-->
                <el-tab-pane label="安全设备警告事件" name="first">
                    <el-form :model="alarmForm.alarmEvent" ref="alarmForm" :rules="alarm_rules" label-width="100px"
                             label-position="left">
                        <el-form-item label="设备名称：" prop="alarmName">
                            <el-input class="w700 device_name"
                                      v-model="alarmForm.alarmEvent.alarmName"
                                      placeholder="请输入设备名称"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="设备类型：" prop="alarmType">
                            <el-input class="w400 device_type"
                                      v-model="alarmForm.alarmEvent.alarmType"
                                      placeholder="请输入设备类型"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="设备IP：" prop="hostIp">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.hostIp"
                                      placeholder="请输入设备IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="日志标签：" prop="labels">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.labels"
                                      placeholder="请输入日志标签"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="攻击状态：" prop="alertstat">
                            <el-select class="w400" v-model="alarmForm.alarmEvent.alertstat" placeholder="请选择">
                                <el-option label="成功" value="1"></el-option>
                                <el-option label="疑似成功" value="2"></el-option>
                                <el-option label="失败" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="源IP：" prop="srcIp">
                            <el-input class="w400 origin_ip"
                                      v-model="alarmForm.alarmEvent.srcIp" placeholder="请输入源IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="源端口：" prop="srcPort">
                            <el-input class="w400 origin_port"
                                      v-model.num="alarmForm.alarmEvent.srcPort" placeholder="请输入源端口"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="目的IP：" prop="desIp">
                            <el-input class="w400 target_ip"
                                      v-model="alarmForm.alarmEvent.desIp"
                                      placeholder="请输入目的IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="操作：" prop="operation">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.operation"
                                      placeholder="请输入操作"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="结果：" prop="result">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.result"
                                      placeholder="请输入结果"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="响应：" prop="response">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.response"
                                      placeholder="请输入响应"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="事件分类：" prop="eventCategory">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.eventCategory"
                                      placeholder="请输入事件分类"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="事件等级：" prop="eventLevel">
                            <el-select class="w400" v-model="alarmForm.alarmEvent.eventLevel" placeholder="请选择">
                                <el-option label="低" value="0"></el-option>
                                <el-option label="中低" value="1"></el-option>
                                <el-option label="中" value="2"></el-option>
                                <el-option label="中高" value="3"></el-option>
                                <el-option label="高" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="网络协议：" prop="agreement">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.agreement"
                                      placeholder="请输入网络协议"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="原始消息：" prop="messaggioOriginale">
                            <el-input class="w400"
                                      v-model="alarmForm.alarmEvent.messaggioOriginale"
                                      placeholder="请输入原始消息"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="目的端口：" prop="desPort">
                            <el-input class="w400 target_port"
                                      v-model.num="alarmForm.alarmEvent.desPort"
                                      placeholder="请输入目的端口"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="告警时间：" prop="callDateTime">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="alarmForm.alarmEvent.callDateTime"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择告警时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="持续时间：" prop="callDuration">
                            <el-input class="w400 target_port"
                                      v-model="alarmForm.alarmEvent.callDuration"
                                      placeholder="请输入持续时间"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="告警名称：" prop="subject">
                            <el-input class="w700 warning_content"
                                      v-model="alarmForm.alarmEvent.subject"
                                      type="textarea"
                                      placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form :model="alarmForm" class="sum">
                            <el-form-item label="发送次数：" prop="" style="margin-left: 18px">
                                <el-input class="w180 send_num"
                                          v-model.num="alarmForm.sum"
                                          placeholder="请输入次数"
                                          clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-tab-pane>
                <!--网络流事件-->
                <el-tab-pane label="网络流事件" name="second">
                    <el-form :model="trafficForm.trafficEvent" ref="trafficForm" :rules="traffic_rules"
                             label-width="160px" label-position="left">
                        <el-form-item label="源IP：" prop="srcIp">
                            <el-input class="w400 origin_ip"
                                      v-model="trafficForm.trafficEvent.srcIp" placeholder="请输入源IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="源端口：" prop="srcPort">
                            <el-input class="w400 origin_port"
                                      v-model.num="trafficForm.trafficEvent.srcPort" placeholder="请输入源端口"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="目的IP：" prop="desIp">
                            <el-input class="w400 target_ip"
                                      v-model="trafficForm.trafficEvent.desIp"
                                      placeholder="请输入目的IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="目的端口：" prop="desPort">
                            <el-input class="w400 target_port"
                                      v-model.num="trafficForm.trafficEvent.desPort"
                                      placeholder="请输入目的端口"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="IP版本：" prop="IPv">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.IPv"
                                      placeholder="请输入IP版本"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="流起始时间：" prop="streamBegin">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="trafficForm.trafficEvent.streamBegin"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择流起始时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="流结束时间：" prop="streamEnd">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="trafficForm.trafficEvent.streamEnd"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择流结束时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="发出报文包数：" prop="sentPacketsNum">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.sentPacketsNum"
                                      placeholder="请输入发出报文包数"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="发出报文字节数：" prop="sentBytesNum">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.sentBytesNum"
                                      placeholder="请输入发出报文字节数"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="接收报文包数：" prop="acceptPacketsNum">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.acceptPacketsNum"
                                      placeholder="请输入接收报文包数"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="接收报文字节数：" prop="acceptBytesNum">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.acceptBytesNum"
                                      placeholder="请输入接收报文字节数"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="NAT转换前源地址：" prop="srcIpNAT">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.srcIpNAT"
                                      placeholder="请输入NAT转换前源地址"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="NAT转换前源端口：" prop="srcPortNAT">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.srcPortNAT"
                                      placeholder="请输入NAT转换前源端口"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="NAT转换前目的地址：" prop="desIpNAT">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.desIpNAT"
                                      placeholder="请输入NAT转换前目的地址"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="NAT转换前目的端口：" prop="desPortNAT">
                            <el-input class="w400"
                                      v-model="trafficForm.trafficEvent.desPortNAT"
                                      placeholder="请输入NAT转换前目的端口"
                                      clearable></el-input>
                        </el-form-item>
                        
                        <el-form-item label="协议名称：" prop="protocal">
                            <el-input class="w400 target_port"
                                      v-model="trafficForm.trafficEvent.protocal"
                                      placeholder="请输入协议名称"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="协议内容：" prop="content">
                            <el-input class="w700 warning_content"
                                      v-model="trafficForm.trafficEvent.content"
                                      type="textarea"
                                      placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="操作时间：" prop="callDateTime">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="trafficForm.trafficEvent.callDateTime"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择操作时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="持续时间：" prop="callDuration">
                            <el-input class="w400 target_port"
                                      v-model="trafficForm.trafficEvent.callDuration"
                                      placeholder="请输入持续时间"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form :model="trafficForm" class="sum">
                            <el-form-item label="发送次数：" prop="sum" style="margin-left: 78px">
                                <el-input class="w180 send_num"
                                          v-model.num="trafficForm.sum"
                                          placeholder="请输入次数"
                                          clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-tab-pane>
                <!--主机日志事件-->
                <el-tab-pane label="主机日志事件" name="third">
                    <el-form :model="hostForm.hostEvent" ref="hostForm" :rules="host_rules" label-width="100px"
                             label-position="left">
                        <el-form-item label="主机名称：" prop="hostName">
                            <el-input class="w400 device_name"
                                      v-model="hostForm.hostEvent.hostName"
                                      placeholder="请输入主机名称"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="主机IP：" prop="hostIp">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.hostIp"
                                      placeholder="请输入主机IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="源IP：" prop="srcIp">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.srcIp"
                                      placeholder="请输入源IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="源端口：" prop="srcPort">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.srcPort"
                                      placeholder="请输入源端口"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="用户名称：" prop="userName">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.userName"
                                      placeholder="请输入用户名称"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="结果：" prop="result">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.result"
                                      placeholder="请输入结果"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="目的IP：" prop="desIp">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.desIp"
                                      placeholder="请输入目的IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="目的端口：" prop="desPort">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.desPort"
                                      placeholder="请输入目的端口"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="响应：" prop="response">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.response"
                                      placeholder="请输入响应"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="设备类型：" prop="hostType">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.hostType"
                                      placeholder="请输入设备类型"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="事件等级：" prop="eventLevel">
                            <el-select class="w400" v-model="hostForm.hostEvent.eventLevel" placeholder="请选择">
                                <el-option label="低" value="0"></el-option>
                                <el-option label="中低" value="1"></el-option>
                                <el-option label="中" value="2"></el-option>
                                <el-option label="中高" value="3"></el-option>
                                <el-option label="高" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="原始消息：" prop="messaggioOriginale">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.messaggioOriginale"
                                      placeholder="请输入原始消息"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="来源：" prop="source">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.source"
                                      placeholder="请输入来源"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="事件id：" prop="eventId">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.eventId"
                                      placeholder="请输入事件id"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="任务类别：" prop="taskType">
                            <el-input class="w400"
                                      v-model="hostForm.hostEvent.taskType"
                                      placeholder="请输入任务类别"
                                      clearable></el-input>
                        </el-form-item>
                        
                        <el-form-item label="操作内容：" prop="command">
                            <el-input class="w700 warning_content"
                                      v-model="hostForm.hostEvent.command"
                                      type="textarea"
                                      placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="操作时间：" prop="callDateTime">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="hostForm.hostEvent.callDateTime"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择操作时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="持续时间：" prop="callDuration">
                            <el-input class="w400 target_port"
                                      v-model="hostForm.hostEvent.callDuration"
                                      placeholder="请输入持续时间"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form :model="hostForm" class="sum">
                            <el-form-item label="发送次数：" prop="sum" style="margin-left: 18px">
                                <el-input class="w180 send_num"
                                          v-model.num="hostForm.sum"
                                          placeholder="请输入次数"
                                          clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-tab-pane>
                <!--资产IP-->
                <!--<el-tab-pane label="资产" name="four">
                    <el-form :model="assetForm.assetEvent" ref="assetForm" :rules="asset_rules" label-width="100px"
                             label-position="left">
                        <el-form-item label="资产IP：" prop="assetIp">
                            <el-input class="w400"
                                      v-model="assetForm.assetEvent.assetIp"
                                      placeholder="请输入资产IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="业务系统：" prop="operationSystem">
                            <el-input class="w400"
                                      v-model="assetForm.assetEvent.operationSystem"
                                      placeholder="请输入业务系统"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="操作时间：" prop="callDateTime">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="assetForm.assetEvent.callDateTime"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择操作时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="持续时间：" prop="callDuration">
                            <el-input class="w400"
                                      v-model="assetForm.assetEvent.callDuration"
                                      placeholder="请输入持续时间"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form :model="assetForm" :rules="host_one" class="sum">
                            <el-form-item label="发送次数：" prop="sum" style="margin-left: 8px">
                                <el-input class="w180 send_num"
                                          v-model.num="assetForm.sum"
                                          placeholder="请输入次数"
                                          clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-tab-pane>-->
                <!--威胁情报IP-->
               <!-- <el-tab-pane label="威胁情报IP" name="five">
                    <el-form :model="threatIntelligenceFrom.menaceEvent" ref="threatIntelligenceFrom"
                             :rules="threatIntelligence_rules" label-width="120px" label-position="left">
                        <el-form-item label="威胁情报IP：" prop="menaceIp" style="margin-left: -30px">
                            <el-input class="w400 device_ip"
                                      v-model="threatIntelligenceFrom.menaceEvent.menaceIp"
                                      placeholder="请输入威胁情报IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="操作时间：" prop="callDateTime" style="margin-left: -30px">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="threatIntelligenceFrom.menaceEvent.callDateTime"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择操作时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="持续时间：" prop="callDuration" style="margin-left: -30px;">
                            <el-input class="w400 target_port"
                                      v-model="threatIntelligenceFrom.menaceEvent.callDuration"
                                      placeholder="请输入持续时间"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form :model="threatIntelligenceFrom" :rules="host_one" class="sum">
                            <el-form-item label="发送次数：" prop="sum" style="margin-left: -2px">
                                <el-input class="w180 send_num"
                                          v-model.num="threatIntelligenceFrom.sum"
                                          placeholder="请输入次数"
                                          clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-tab-pane>-->
                <!--漏洞IP-->
                <!--<el-tab-pane label="漏洞IP" name="six">
                    <el-form :model="holeForm.vulnerabilityEvent" ref="holeForm" :rules="hole_rules" label-width="120px"
                             label-position="left">
                        <el-form-item label="资产漏洞IP：" prop="vulnerabilityIp" style="margin-left: -30px">
                            <el-input class="w400 device_name"
                                      v-model="holeForm.vulnerabilityEvent.vulnerabilityIp"
                                      placeholder="请输入资产漏洞IP"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="漏洞类别：" prop="vulnerabilityType" style="margin-left: -30px">
                            <el-input class="w400 device_ip"
                                      v-model="holeForm.vulnerabilityEvent.vulnerabilityType"
                                      placeholder="请输入漏洞类别"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="漏洞编号：" prop="vulnerabilityNo" style="margin-left: -30px">
                            <el-input class="w400 device_ip"
                                      v-model="holeForm.vulnerabilityEvent.vulnerabilityNo"
                                      placeholder="请输入漏洞编号"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="操作时间：" prop="callDateTime" style="margin-left: -30px">
                            <el-date-picker
                                class="w400 warning_time"
                                v-model="holeForm.vulnerabilityEvent.callDateTime"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="请选择操作时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="持续时间：" prop="callDuration" style="margin-left: -30px">
                            <el-input class="w400 target_port"
                                      v-model="holeForm.vulnerabilityEvent.callDuration"
                                      placeholder="请输入持续时间"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form :model="holeForm" :rules="host_one" class="sum">
                            <el-form-item label="发送次数：" prop="sum" style="margin-left: -2px">
                                <el-input class="w180 send_num"
                                          v-model.num="holeForm.sum"
                                          placeholder="请输入次数"
                                          clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-tab-pane>-->
            </el-tabs>
        </div>
        <div class="right_btn">
            <searchBtn class="releaseBtn" title="发 布"
                       style="z-index: 99"
                       @click=releaseForm />
        </div>
    </div>
</template>

<script>
import {releaseRuleForm} from "../server/api";

export default {
    name: "simulation_data",
    data () {
        /*1-999*/
        const validateAcquaintance = (rule, value, callback) => {
            if (value <= 0 || value > 999) {
                callback(new Error('输入次数在 1 至 999 之间'))
            } else {
                callback()
            }
        }
        return {
            activeName: 'first',
            // 日期选择器
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now();
                },
            },
            
            alarmForm: {
                type: 'AlarmEvent',
                sum: '',
                alarmEvent: {
                    alarmName: '',
                    alarmType: '',
                    srcIp: '',
                    srcPort: '',
                    desIp: '',
                    desPort: '',
                    subject: '',
                    callDateTime: '',
                    callDuration: '',
                    operation: '',
                    result: '',
                    response: '',
                    eventCategory: '',
                    eventLevel: '',
                    agreement: '',
                    hostIp: '',
                    messaggioOriginale: '',
                    labels: '',
                    alertstat: ''
                }
            },
            /*不需要传的字段*/
            alarm_unusedForm: {
                device_ip: '',
            },
            /*alarm 校验规则*/
            alarm_one: {
                sum: [
                    {
                        required: true,
                        message: '请输入发送次数，不能为空',
                        trigger: 'blur'
                    },
                    {
                        validator: validateAcquaintance, // 自定义验证
                        message: '输入次数在 1 至 999 之间',
                        trigger: 'blur'
                    }
                ]
            },
            alarm_rules: {
                alarmName: {
                    required: true,
                    message: '请输入设备名称，不能为空',
                    trigger: 'blur'
                },
                alarmType: {
                    required: true,
                    message: '请输入设备类型，不能为空',
                    trigger: 'blur'
                },
                srcIp: {
                    required: true,
                    message: '请输入源IP，不能为空',
                    trigger: 'blur'
                },
                srcPort: {
                    required: true,
                    message: '请输入源端口，不能为空',
                    trigger: 'blur'
                },
                desIp: {
                    required: true,
                    message: '请输入目的IP，不能为空',
                    trigger: 'blur'
                },
                desPort: {
                    required: true,
                    message: '请输入目的端口，不能为空',
                    trigger: 'blur'
                },
                subject: {
                    required: true,
                    message: '请输入告警名称，不能为空',
                    trigger: 'blur'
                },
                callDateTime: {
                    required: true,
                    message: '请输入告警时间，不能为空',
                    trigger: 'blur'
                },
                callDuration: {
                    required: true,
                    message: '请输入持续时间，不能为空',
                    trigger: 'blur'
                },
                eventLevel: {
                    required: true,
                    message: '请选择事件等级',
                    trigger: 'blur'
                },
            },
            
            trafficForm: {
                type: 'TrafficEvent',
                sum: '',
                trafficEvent: {
                    protocal: '',
                    srcIp: '',
                    srcPort: '',
                    desIp: '',
                    desPort: '',
                    content: '',
                    callDateTime: '',
                    callDuration: '',
                    IPv: '',
                    streamBegin: '',
                    streamEnd: '',
                    sentPacketsNum: '',
                    sentBytesNum: '',
                    acceptPacketsNum: '',
                    acceptBytesNum: '',
                    srcIpNAT: '',
                    srcPortNAT: '',
                    desIpNAT: '',
                    desPortNAT: '',
                }
            },
            /*traffic 校验规则*/
            traffic_one: {
                sum: [
                    {
                        required: true,
                        message: '请输入发送次数，不能为空',
                        trigger: 'blur'
                    },
                    {
                        validator: validateAcquaintance, // 自定义验证
                        message: '输入次数在 1 至 999 之间',
                        trigger: 'blur'
                    }
                ]
            },
            traffic_rules: {
                protocal: {
                    required: true,
                    message: '请输入协议名称，不能为空',
                    trigger: 'blur'
                },
                content: {
                    required: true,
                    message: '请输入协议内容，不能为空',
                    trigger: 'blur'
                },
                srcIp: {
                    required: true,
                    message: '请输入源IP，不能为空',
                    trigger: 'blur'
                },
                srcPort: {
                    required: true,
                    message: '请输入源端口，不能为空',
                    trigger: 'blur'
                },
                desIp: {
                    required: true,
                    message: '请输入目的IP，不能为空',
                    trigger: 'blur'
                },
                desPort: {
                    required: true,
                    message: '请输入目的端口，不能为空',
                    trigger: 'blur'
                },
                callDateTime: {
                    required: true,
                    message: '请输入操作时间，不能为空',
                    trigger: 'blur'
                },
                callDuration: {
                    required: true,
                    message: '请输入持续时间，不能为空',
                    trigger: 'blur'
                },
            },
            
            hostForm: {
                type: 'HostEvent',
                sum: '',
                hostEvent: {
                    hostName: '',
                    hostIp: '',
                    command: '',
                    callDateTime: '',
                    callDuration: '',
                    srcIp: '',
                    srcPort: '',
                    userName: '',
                    result: '',
                    desIp: '',
                    desPort: '',
                    response: '',
                    hostType: '',
                    eventLevel: '',
                    messaggioOriginale: '',
                    source: '',
                    eventId: '',
                    tasktype: '',
                }
            },
            /*host 校验规则*/
            host_one: {
                sum: [
                    {
                        required: true,
                        message: '请输入发送次数，不能为空',
                        trigger: 'blur'
                    },
                    {
                        validator: validateAcquaintance, // 自定义验证
                        message: '输入次数在 1 至 999 之间',
                        trigger: 'blur'
                    }
                ]
            },
            host_rules: {
                hostName: {
                    required: true,
                    message: '请输入主机名称，不能为空',
                    trigger: 'blur'
                },
                hostIp: {
                    required: true,
                    message: '请输入主机IP，不能为空',
                    trigger: 'blur'
                },
                command: {
                    required: true,
                    message: '请输入操作内容，不能为空',
                    trigger: 'blur'
                },
                callDateTime: {
                    required: true,
                    message: '请输入操作时间，不能为空',
                    trigger: 'blur'
                },
                callDuration: {
                    required: true,
                    message: '请输入持续时间，不能为空',
                    trigger: 'blur'
                },
                eventLevel: {
                    required: true,
                    message: '请选择事件等级',
                    trigger: 'blur'
                },
            },
            
            assetForm: {
                type: 'AssetEvent',
                sum: '',
                assetEvent: {
                    assetIp: '',
                    operationSystem: '',
                    callDateTime: '',
                    callDuration: ''
                }
            },
            /*资产 校验规则*/
            asset_rules: {
                assetIp: {
                    required: true,
                    message: '请输入资产IP，不能为空',
                    trigger: 'blur'
                },
                operationSystem: {
                    required: true,
                    message: '请输入业务系统，不能为空',
                    trigger: 'blur'
                },
                callDateTime: {
                    required: true,
                    message: '请输入操作时间，不能为空',
                    trigger: 'blur'
                },
                callDuration: {
                    required: true,
                    message: '请输入持续时间，不能为空',
                    trigger: 'blur'
                }
            },
            
            threatIntelligenceFrom: {
                type: 'MenaceEvent',
                sum: '',
                menaceEvent: {
                    menaceIp: '',
                    callDateTime: '',
                    callDuration: ''
                }
            },
            /*威胁情报 校验规则*/
            threatIntelligence_rules: {
                menaceIp: {
                    required: true,
                    message: '请输入威胁情报IP，不能为空',
                    trigger: 'blur'
                },
                callDateTime: {
                    required: true,
                    message: '请输入操作时间，不能为空',
                    trigger: 'blur'
                },
                callDuration: {
                    required: true,
                    message: '请输入持续时间，不能为空',
                    trigger: 'blur'
                },
            },
            
            holeForm: {
                type: 'VulnerabilityEvent',
                sum: '',
                vulnerabilityEvent: {
                    vulnerabilityIp: '',
                    vulnerabilityType: '',
                    vulnerabilityNo: '',
                    callDateTime: '',
                    callDuration: ''
                }
            },
            /*漏洞 校验规则*/
            hole_rules: {
                vulnerabilityIp: {
                    required: true,
                    message: '请输入资产漏洞IP，不能为空',
                    trigger: 'blur'
                },
                vulnerabilityType: {
                    required: true,
                    message: '请输入漏洞类别，不能为空',
                    trigger: 'blur'
                },
                vulnerabilityNo: {
                    required: true,
                    message: '请输入漏洞编号，不能为空',
                    trigger: 'blur'
                },
                callDateTime: {
                    required: true,
                    message: '请输入操作时间，不能为空',
                    trigger: 'blur'
                },
                callDuration: {
                    required: true,
                    message: '请输入持续时间，不能为空',
                    trigger: 'blur'
                },
            },
        }
    },
    
    methods: {
        releaseForm () {
            console.log(this.alarmForm.alarmEvent.callDateTime)
            let formVal, strVal;
            switch (this.activeName) {
                case 'first':
                    formVal = JSON.parse(JSON.stringify(this.alarmForm));
                    // formVal.alarmEvent.callDateTime = Math.round(this.alarmForm.alarmEvent.callDateTime/1000);
                    formVal.alarmEvent.callDateTime = this.alarmForm.alarmEvent.callDateTime;
                    formVal.alarmEvent.callDuration = Number(this.alarmForm.alarmEvent.callDuration);
                    formVal.alarmEvent.desPort = Number(this.alarmForm.alarmEvent.desPort);
                    formVal.alarmEvent.srcPort = Number(this.alarmForm.alarmEvent.srcPort);
                    formVal.sum = Number(this.alarmForm.sum)
                    strVal = 'alarmForm';
                    // console.log(formVal)
                    break;
                case 'second':
                    formVal = JSON.parse(JSON.stringify(this.trafficForm));
                    // formVal.trafficEvent.callDateTime = Math.round(this.trafficForm.trafficEvent.callDateTime/1000);
                    formVal.trafficEvent.callDateTime = this.trafficForm.trafficEvent.callDateTime;
                    formVal.trafficEvent.callDuration = Number(this.trafficForm.trafficEvent.callDuration);
                    formVal.trafficEvent.desPort = Number(this.trafficForm.trafficEvent.desPort);
                    formVal.trafficEvent.srcPort = Number(this.trafficForm.trafficEvent.srcPort);
                    formVal.trafficEvent.srcPortNAT = Number(this.trafficForm.trafficEvent.srcPortNAT);
                    formVal.trafficEvent.desPortNAT = Number(this.trafficForm.trafficEvent.desPortNAT);
                    formVal.trafficEvent.sentBytesNum = Number(this.trafficForm.trafficEvent.sentBytesNum);
                    formVal.trafficEvent.sentPacketsNum = Number(this.trafficForm.trafficEvent.sentPacketsNum);
                    formVal.trafficEvent.acceptPacketsNum = Number(this.trafficForm.trafficEvent.acceptPacketsNum);
                    formVal.trafficEvent.acceptBytesNum = Number(this.trafficForm.trafficEvent.acceptBytesNum);
                    formVal.sum = Number(this.trafficForm.sum)
                    strVal = 'trafficForm';
                    // console.log(formVal)
                    break;
                case 'third':
                    formVal = JSON.parse(JSON.stringify(this.hostForm));
                    // formVal.hostEvent.callDateTime = Math.round(this.hostForm.hostEvent.callDateTime/1000);
                    formVal.hostEvent.callDateTime = this.hostForm.hostEvent.callDateTime;
                    formVal.hostEvent.callDuration = Number(this.hostForm.hostEvent.callDuration);
                    formVal.hostEvent.srcPort = Number(this.hostForm.hostEvent.srcPort);
                    formVal.hostEvent.desPort = Number(this.hostForm.hostEvent.desPort);
                    formVal.sum = Number(this.hostForm.sum);
                    strVal = 'hostForm';
                    // console.log(formVal)
                    break;
                case 'four':
                    formVal = JSON.parse(JSON.stringify(this.assetForm));
                    formVal.assetEvent.callDateTime = this.assetForm.assetEvent.callDateTime;
                    formVal.assetEvent.callDuration = Number(this.assetForm.assetEvent.callDuration);
                    formVal.sum = Number(this.assetForm.sum);
                    strVal = 'assetForm';
                    break;
                case 'five':
                    formVal = JSON.parse(JSON.stringify(this.threatIntelligenceFrom));
                    formVal.menaceEvent.callDateTime = this.threatIntelligenceFrom.menaceEvent.callDateTime;
                    formVal.menaceEvent.callDuration = Number(this.threatIntelligenceFrom.menaceEvent.callDuration);
                    formVal.sum = Number(this.threatIntelligenceFrom.sum);
                    strVal = 'threatIntelligenceFrom';
                    break;
                case 'six':
                    formVal = JSON.parse(JSON.stringify(this.holeForm));
                    formVal.vulnerabilityEvent.callDateTime = this.holeForm.vulnerabilityEvent.callDateTime;
                    formVal.vulnerabilityEvent.callDuration = Number(this.holeForm.vulnerabilityEvent.callDuration);
                    formVal.sum = Number(this.holeForm.sum);
                    strVal = 'holeForm';
                    break;
            }
            
            this.$refs[strVal].validate((valid) => {
                if (valid) {
                    // if (strVal === 'alarmForm') {
                    //   this.alarm_unusedForm.device_ip = '';
                    // }
                    this.$refs[strVal].resetFields();
                    releaseRuleForm(formVal).then(res => {
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        })
                    }).catch(error => {
                        console.log('error' + error)
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
                this.alarmForm.sum = '';
                this.trafficForm.sum = '';
                this.hostForm.sum = '';
                this.assetForm.sum = '';
                this.threatIntelligenceFrom.sum = '';
                this.holeForm.sum = '';
            });
        },
        
        handleClick () {
        },
    }
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}
.releaseBtn {
    position: absolute;
    top: 32px;
    right: 20px;
}

.tabs > > > .el-tabs__header.is-top {
    margin-bottom: 20px;
}

.tabs > > > .el-tabs__item {
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 15px;
    opacity: 0.6;
}

.tabs > > > .el-tabs__item.is-active {
    color: #00E9FF;
}

.tabs > > > .el-tabs__item:hover {
    color: #00E9FF;
}

.tabs > > > .el-tabs__active-bar {
    background-color: #00E9FF;
}

.tabs > > > .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: rgba(228, 231, 237, 1);
    opacity: 0.2;
}

.tabs > > > .el-tabs__item.is-top {
    padding-left: 20px !important;
    height: 34px;
    line-height: 34px;
}

.el-form.el-form--label-left {
    margin-left: 30px;
}

.el-form > > > .el-form-item__label {
    text-align: right;
    margin-right: 13px;
}

/*校验*/
.tabs > > > .el-form-item__error {
    left: 13px;
}

.tabs > > > .sum .el-form-item__error {
    left: 104px;
}

.el-form > > > .el-input__inner, .el-form > > > .el-textarea__inner {
    background-color: transparent;
    height: 100%;
    border: 1px solid #1cd7fa;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
}

.el-form-item {
    /*box-sizing: border-box;*/
    margin-bottom: 15px;
}

.w400 {
    width: 400px !important;
    height: 34px;
}

.w700 {
    width: 700px;
    height: 34px;
}

.w180 {
    width: 180px;
    height: 34px;
}

.w700.warning_content {
    height: 78px;
}

/*icon 图标*/
.el-form-item > > > .el-icon-time:before {
    content: "\E78E";
    color: #00E9FF;
    position: relative;
    right: -366px;
}

.el-input--prefix > > > .el-input__inner {
    padding-left: 15px;
}

.el-select > > > .el-input__inner {
    height: 34px !important;
}

</style>
