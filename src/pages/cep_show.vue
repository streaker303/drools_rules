<template>
    <div class="container" id="container" v-loading.lock="loading" element-loading-text="规则处理中......">
        <div class="even-content">
            <div class="list-tips" style="display: block;padding-left: 8px">规则编辑
               <!-- <div v-if="!this.$route.query.disposal_id" style="display: inline-block;font-size:14px;color:#01E9FF;cursor: pointer;margin-left: 20px;"
                     @click="$router.go(-1)"><i
                    style="margin-right: 6px;" class="fa fa-mail-reply" aria-hidden="true"></i>返 回
                </div>-->
            </div>
            <div class="title-line">
                <span class="title-name">基础信息</span>
            </div>
            <div class="rulesForm tree">
                <el-form ref="rulesForm" :model="eventData" label-width="100px" label-position="rigth" style="margin-left: -14px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="规则名称：" prop="name" :rules="{required: true, message: '规则名称不能为空', trigger: 'blur'}" style="margin-bottom: 20px;width: 92%">
                                <el-input style="width: 100%" v-model="eventData.name" :disabled="isEdit && isExtend" placeholder="请输入规则名称" size="small"></el-input>
                                <!--<el-tooltip class="item"
                                            style="position: absolute;top:30%;right: -20px;"
                                            effect="dark" placement="right">
                                    <div slot="content">规则条件选择自定义状态时，<br/>以内部定义的名称为准</div>
                                    <i class="el-icon-question" style="color: #1cd7fa;"></i>
                                </el-tooltip>-->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="规则继承：" style="margin-bottom: 20px;width: 92%">
                                <el-input class="w500" v-model="eventData.extends" placeholder="请选择" clearable size="small" disabled>
                                    <el-button :disabled="this.activeName === 'second'" style="color: #1cd7fa;background-color: rgba(0,198,255,.15)" slot="append" icon="el-icon-search" @click.native="extendRulesDialog = true"></el-button>
                                </el-input>
                                <el-tooltip class="item"
                                            style="position: absolute;top:30%;right: -20px;"
                                            effect="dark" content="只展示已启用的规则" placement="right">
                                    <i class="el-icon-question" style="color: #1cd7fa;"></i>
                                </el-tooltip>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="规则描述：" style="margin-bottom: 20px;width: 92%">
                                <el-input class="w500" type="textarea" :rows="3" v-model="eventData.des" placeholder="请输入" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="规则分组：" style="margin-bottom: 20px;width: 92%">
                                <div class="select-box ruleName">
                                    <div style="cursor:pointer;" class="ub ub-ac select-title" @click.stop="onOff=!onOff">
                                        <div class="ub ub-f1 ub-ac" style="text-indent: 14px;line-height: 30px;"><span style="opacity: 0.7" v-if="!currentGroup">请选择</span>{{currentGroup}}</div>
                                        <div style="width:34px;height:34px;text-align: center;line-height: 34px;">
                                            <i style="color:#1cd7fa;" :class="{'el-icon-arrow-up':onOff,'el-icon-arrow-down':!onOff}"></i>
                                        </div>
                                    </div>
                                    <div v-show="onOff" class="select-mask">
                                        <el-tree show-checkbox ref="tree" node-key="id" :default-expand-all="true" :highlight-current="true" :data="treeData" :props='propsData' @node-click="handleNodeClick" :check-strictly="true" :expand-on-click-node="false" :indent='indent' @check-change="handleClick">
												<span class="custom-tree-node" slot-scope="{ node, data }">
												        <span style="font-size:14px;">{{ node.label }}</span></span>
                                        </el-tree>
                                    </div>
                                    <!--<div v-if="groupIsSelected" style="position:absolute;left:0;top:32px;line-height:20px;font-size:12px;color:#F56C6C;">请选择分组</div>-->
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="是否启用：" style="margin-bottom: 20px;width: 40%">
                        <div class="switch-wrapper" :class="{'yes':eventData.status,'no':!eventData.status}"  @click="changeStatus">
                            <div class="ub ub-ac ub-pj">
                                <div>是</div>
                                <div>否</div>
                            </div>
                            <div class="circle"></div>
                        </div>
                    </el-form-item>
                </el-form>
    
                <div class="title-line">
                    <span class="title-name">条件信息</span>
                    <!--<span @click="goResourcePool" style="cursor: pointer;float: right;color:#01E9FF;text-decoration: underline">资源池管理</span>-->
                </div>
                <div class="ub tab-wrapper">
                    <p style="width: 86px;font-size: 14px;color: #fff">规则条件：</p>
                    <div class="handleArea" style="min-height: 510px;margin-bottom: 10px;width: calc(100% - 86px)">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="模 型" name="first" style="overflow-x:auto;">
                                <div style="width: calc(100%)">
                                    <div class="handleTile" style="color: #fff;">
                                        <div style="margin-left: 30px;position: relative">
                                            <i @click.stop="toogleAll" :class="{'iconfont icon-zhedie': true, 'is-show': true, 'fold-arrow': true}" style="position: absolute;cursor: pointer;left: -22px"></i>
                                            <el-dropdown trigger="click" style="margin-bottom: 20px">
                                                <el-button type="primary" size="mini">
                                                    {{currentSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                                                </el-button>
                                                <el-dropdown-menu slot="dropdown" :append-to-body="false">
                                                    <el-dropdown-item data-type="1" @click.native="selectChange">AND</el-dropdown-item>
                                                    <!--<el-dropdown-item data-type="2" @click.native="selectChange">OR</el-dropdown-item>-->
                                                    <!--<el-dropdown-item data-type="3" @click.native="selectChange">NOT</el-dropdown-item>-->
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                            <div class="tree-line-vertical">
                                                <div v-for="(item, index) in eventData.sourceList" :key="index" class="bg-area">
                                                    <div class="one-type" v-if="item.type == 0">
                                                        <div class="tree-title ub ub-ac">
                                                            <i @click.stop="toogleChild" :class="{'iconfont icon-zhedie': true, 'is-show': true, 'fold-arrow': true}" style="position: absolute;cursor: pointer"></i>
                                                            <el-select v-model="item.factType"
                                                                       placeholder="请输入"
                                                                       size="mini"
                                                                       style="width: 160px"
                                                                       @change="eventChange(item)"
                                                                       :popper-append-to-body="false"
                                                                       popper-class="select-option innerSelect">
                                                                <el-option v-for="(_item,_index) in eventList" :value="_item.value" :label="_item.label" :key="_index"></el-option>
                                                            </el-select>
                                                            <div class="box-title" v-if="item.objBindName || slideWindow_sourceList[index].slideValue || after_sourceList[index].afterType">
                                                                <span v-if="item.objBindName">事件变量名：</span><span style="color: #d4d116">{{item.objBindName}}</span>
                                                                <span v-if="slideWindow_sourceList[index].slideValue" style="margin-left: 5px">滑动窗口：</span><span style="color: #d4d116">{{timeToStr(slideWindow_sourceList[index].slideValue)}}</span>
                                                                <span v-if="after_sourceList[index].afterValue" style="margin-left: 10px">时序变量名：</span><span style="color: #d4d116">{{after_sourceList[index].afterValue}}</span>
                                                                <span v-if="after_sourceList[index].afterType" style="margin-left: 5px">时间：</span><span style="color: #d4d116">{{timeToShow(after_sourceList[index].afterType)}}</span>
                                                            </div>
                                                            <div class="operate-btn" style="position: relative;margin-left: 10px">
                                
                                                                <el-tooltip class="item"
                                                                            popper-class="atooltip"
                                                                            effect="dark" content="属性" placement="top">
                                                                    <i class="iconfont icon-shuxing" @click="openEventAttributeDialog(item, index)"></i>
                                                                </el-tooltip>
                                
                                                                <el-dropdown trigger="click">
                                                                    <el-tooltip class="item"
                                                                                popper-class="atooltip"
                                                                                effect="dark" content="向下添加" placement="top">
                                                                        <i class="iconfont icon-xiangxiatianjia" style="font-size: 12px;color: #0af0f3;margin-right: 10px;cursor: pointer;"></i>
                                                                    </el-tooltip>
                                                                    <el-dropdown-menu slot="dropdown" :append-to-body="false">
                                                                        <el-dropdown-item data-type="1" @click.native="addEventData_down($event, index)">数据源</el-dropdown-item>
                                                                        <el-dropdown-item data-type="2" @click.native="addEventData_down($event, index)">累计</el-dropdown-item>
                                                                    </el-dropdown-menu>
                                                                </el-dropdown>
                                
                                                                <el-dropdown trigger="click">
                                                                    <el-tooltip class="item"
                                                                                popper-class="atooltip"
                                                                                effect="dark" content="向上添加" placement="top">
                                                                        <i class="iconfont icon-xiangshangtianjia" style="font-size: 12px;color: #0af0f3;margin-right: 10px;cursor: pointer;"></i>
                                                                    </el-tooltip>
                                                                    <el-dropdown-menu slot="dropdown" :append-to-body="false">
                                                                        <el-dropdown-item data-type="1" @click.native="addEventData_up($event, index)">数据源</el-dropdown-item>
                                                                        <el-dropdown-item data-type="2" @click.native="addEventData_up($event, index)">累计</el-dropdown-item>
                                                                    </el-dropdown-menu>
                                                                </el-dropdown>
                                
                                                                <el-tooltip class="item"
                                                                            popper-class="atooltip"
                                                                            effect="dark" content="删除" placement="top">
                                                                    <i class="el-icon-close" @click="deleteEventData(index)"></i>
                                                                </el-tooltip>
                                
                                                                <el-popover
                                                                    class="add-step-popover"
                                                                    ref="add-step-popover"
                                                                    popper-class="popover-select2"
                                                                    :popper-options="{
                                                                  boundariesElement: 'body',
                                                                  gpuAcceleration: true,
                                                                  positionFixed: true,
                                                                  preventOverflow: true
                                                                }"
                                                                    z-index="2"
                                                                    placement="top"
                                                                    title=""
                                                                    width="200"
                                                                    trigger="hover">
                                                                    <div class="inner-note">
                                                                        <el-input
                                                                            type="textarea"
                                                                            :rows="2"
                                                                            :disabled="noteFlag"
                                                                            size="mini"
                                                                            placeholder="请输入注释"
                                                                            v-model="item.note">
                                                                        </el-input>
                                                                        <p style="text-align: right; padding-right: 10px; border-top: 1px solid #074e70">
                                                                            <i style="font-size: 14px" v-if="noteFlag" class="iconfont icon-bianji" @click="noteFlag = !noteFlag"></i>
                                                                            <i style="font-size: 14px" v-if="!noteFlag" class="iconfont icon-baocun" @click="noteFlag = !noteFlag"></i>
                                                                        </p>
                                                                    </div>
                                    
                                                                    <i slot="reference" class="iconfont icon-zhushi"></i>
                                                                </el-popover>
                            
                                                            </div>
                                                        </div>
                                                        <drools_tree_data :constraintList="item.constraintList" :variate_arr="variate_arr" @upResource="upResource" @upFields="upFields" :factType="item.factType" :assetTypeList="assetTypeList" :operationSystemList="operationSystemList" :zoneNameList="zoneNameList" :subjectLabelList="subjectLabelList" first="true" style="margin-left: 52px; margin-top: 10px;position: relative;display: flex;flex-direction: column"></drools_tree_data>
                                                    </div>
                    
                                                    <div class="two-type" v-if="item.type == 1">
                                                        <div class="tree-title ub ub-ac">
                                                            <i @click.stop="toogleChild_count" :class="{'iconfont icon-zhedie': true, 'is-show': true, 'fold-arrow': true}" style="position: absolute;cursor: pointer;left: -22px"></i>
                                                            <div class="time-title">
                                                                <span>累积</span>
                                                            </div>
                                                            <div class="box-title" v-if="item.countMap.constraintList[0].fieldBindName || item.countMap.constraintList[0].operator || item.countMap.constraintList[0].value">
                                                                <span v-if="item.countMap.constraintList[0].fieldBindName">变量名：</span><span style="color: #d4d116">{{item.countMap.constraintList[0].fieldBindName}}</span>
                                                                <span v-if="item.countMap.constraintList[0].operator" style="margin-left: 5px">运算符：</span><span style="color: #d4d116">{{item.countMap.constraintList[0].operator}}</span>
                                                                <span v-if="item.countMap.constraintList[0].operator" style="margin-left: 5px">数量：</span><span v-if="item.countMap.constraintList[0].operator" style="color: #d4d116">{{item.countMap.constraintList[0].value}}</span>
                                                            </div>
                                                            <div class="operate-btn" style="margin-left: 10px">
                                                                <el-tooltip class="item"
                                                                            popper-class="atooltip"
                                                                            effect="dark" content="属性" placement="top">
                                                                    <i class="iconfont icon-shuxing" @click="openAccmulateDialog(item, index)"></i>
                                                                </el-tooltip>
                                
                                                                <el-dropdown trigger="click">
                                                                    <el-tooltip class="item"
                                                                                popper-class="atooltip"
                                                                                effect="dark" content="向下添加" placement="top">
                                                                        <i class="iconfont icon-xiangxiatianjia" style="font-size: 12px;color: #0af0f3;margin-right: 10px;cursor: pointer;"></i>
                                                                    </el-tooltip>
                                                                    <el-dropdown-menu slot="dropdown" :append-to-body="false">
                                                                        <el-dropdown-item data-type="1" @click.native="addEventData_down($event, index)">数据源</el-dropdown-item>
                                                                        <el-dropdown-item data-type="2" @click.native="addEventData_down($event, index)">累计</el-dropdown-item>
                                                                    </el-dropdown-menu>
                                                                </el-dropdown>
                                
                                                                <el-dropdown trigger="click">
                                                                    <el-tooltip class="item"
                                                                                popper-class="atooltip"
                                                                                effect="dark" content="向上添加" placement="top">
                                                                        <i class="iconfont icon-xiangshangtianjia" style="font-size: 12px;color: #0af0f3;margin-right: 10px;cursor: pointer;"></i>
                                                                    </el-tooltip>
                                                                    <el-dropdown-menu slot="dropdown" :append-to-body="false">
                                                                        <el-dropdown-item data-type="1" @click.native="addEventData_up($event, index)">数据源</el-dropdown-item>
                                                                        <el-dropdown-item data-type="2" @click.native="addEventData_up($event, index)">累计</el-dropdown-item>
                                                                    </el-dropdown-menu>
                                                                </el-dropdown>
                                
                                                                <el-tooltip class="item"
                                                                            popper-class="atooltip"
                                                                            effect="dark" content="删除" placement="top">
                                                                    <i class="el-icon-close" @click="deleteEventData(index)"></i>
                                                                </el-tooltip>
                                
                                                                <el-popover
                                                                    class="add-step-popover"
                                                                    ref="add-step-popover"
                                                                    popper-class="popover-select2"
                                                                    :popper-options="{
                                                                  boundariesElement: 'body',
                                                                  gpuAcceleration: true,
                                                                  positionFixed: true,
                                                                  preventOverflow: true
                                                                }"
                                                                    z-index="2"
                                                                    placement="top"
                                                                    title=""
                                                                    width="200"
                                                                    trigger="hover">
                                                                    <div class="inner-note">
                                                                        <el-input
                                                                            type="textarea"
                                                                            :rows="2"
                                                                            :disabled="noteFlag"
                                                                            size="mini"
                                                                            placeholder="请输入注释"
                                                                            v-model="item.countMap.note">
                                                                        </el-input>
                                                                        <p style="text-align: right; padding-right: 10px; border-top: 1px solid #074e70">
                                                                            <i style="font-size: 14px" v-if="noteFlag" class="iconfont icon-bianji" @click="noteFlag = !noteFlag"></i>
                                                                            <i style="font-size: 14px" v-if="!noteFlag" class="iconfont icon-baocun" @click="noteFlag = !noteFlag"></i>
                                                                        </p>
                                                                    </div>
                                                                    <i slot="reference" class="iconfont icon-zhushi"></i>
                                                                </el-popover>
                                                            </div>
                                                        </div>
                                                        <div class="one-module tree-line-count" style="padding-left: 40px;position: relative">
                                                            <i @click.stop="toogleChild_countInner" :class="{'iconfont icon-zhedie': true, 'is-show': true, 'fold-arrow-inner': true}" style="position: absolute;cursor: pointer"></i>
                                                            <div class="tree-title tree-title-accumulate ub ub-ac" style="margin-top: 20px">
                                                                <el-select v-model="item.factMap.factType"
                                                                           placeholder="请输入"
                                                                           size="mini"
                                                                           style="width: 160px;"
                                                                           :popper-append-to-body="false"
                                                                           @change="eventChange(item.factMap)"
                                                                           popper-class="select-option innerSelect">
                                                                    <el-option v-for="(_item,_index) in accumulateList" :value="_item.value" :label="_item.label" :key="_index"></el-option>
                                                                </el-select>
                                                                <div class="box-title" v-if="item.factMap.objBindName || slideWindow_sourceList[index].slideValue || after_sourceList[index].afterType">
                                                                    <span v-if="item.factMap.objBindName">事件变量名：</span><span style="color: #d4d116">{{item.factMap.objBindName}}</span>
                                                                    <span v-if="slideWindow_sourceList[index].slideValue" style="margin-left: 5px">滑动窗口：</span><span style="color: #d4d116">{{timeToStr(slideWindow_sourceList[index].slideValue)}}</span>
                                                                    <span v-if="after_sourceList[index].afterValue" style="margin-left: 10px">时序变量名：</span><span style="color: #d4d116">{{after_sourceList[index].afterValue}}</span>
                                                                    <span v-if="after_sourceList[index].afterType" style="margin-left: 5px">时间：</span><span style="color: #d4d116">{{timeToShow(after_sourceList[index].afterType)}}</span>
                                                                </div>
                                                                <div class="operate-btn" style="margin-left: 10px">
                                                                    <el-tooltip class="item"
                                                                                popper-class="atooltip"
                                                                                effect="dark" content="属性" placement="top">
                                                                        <i class="iconfont icon-shuxing" @click="openEventAttributeDialog(item.factMap, index)"></i>
                                                                    </el-tooltip>
                                    
                                                                    <el-popover
                                                                        class="add-step-popover"
                                                                        ref="add-step-popover"
                                                                        popper-class="popover-select2"
                                                                        :popper-options="{
                                                                  boundariesElement: 'body',
                                                                  gpuAcceleration: true,
                                                                  positionFixed: true,
                                                                  preventOverflow: true
                                                                }"
                                                                        z-index="2"
                                                                        placement="top"
                                                                        title=""
                                                                        width="200"
                                                                        trigger="hover">
                                                                        <div class="inner-note">
                                                                            <el-input
                                                                                type="textarea"
                                                                                :rows="2"
                                                                                :disabled="noteFlag"
                                                                                size="mini"
                                                                                placeholder="请输入注释"
                                                                                v-model="item.factMap.note">
                                                                            </el-input>
                                                                            <p style="text-align: right; padding-right: 10px; border-top: 1px solid #074e70">
                                                                                <i style="font-size: 14px" v-if="noteFlag" class="iconfont icon-bianji" @click="noteFlag = !noteFlag"></i>
                                                                                <i style="font-size: 14px" v-if="!noteFlag" class="iconfont icon-baocun" @click="noteFlag = !noteFlag"></i>
                                                                            </p>
                                                                        </div>
                                        
                                                                        <i slot="reference" class="iconfont icon-zhushi"></i>
                                                                    </el-popover>
                                                                </div>
                                                            </div>
                                                            <drools_tree_data @upResource="upResource" @upFields="upFields" :variate_arr="variate_arr" :constraintList="item.factMap.constraintList" :factType="item.factMap.factType" :assetTypeList="assetTypeList" :operationSystemList="operationSystemList" :zoneNameList="zoneNameList" :subjectLabelList="subjectLabelList" first="true" style="margin-left: 52px; margin-top: 10px;position: relative;display: flex;flex-direction: column"></drools_tree_data>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
            
                                            <div style="padding-left: 52px;height: 30px;margin-top: 20px;position: relative" class="tree-line-outer">
                                                <i class="iconfont icon-zhedie fold-arrow-bottom"></i>
                                                <el-dropdown trigger="click">
                                                    <i class="el-icon-circle-plus-outline" style="font-size: 18px;line-height: 30px;color: #0af0f3;cursor: pointer"></i>
                                                    <el-dropdown-menu slot="dropdown" :append-to-body="false">
                                                        <el-dropdown-item data-type="1" @click.native="addEventData">数据源</el-dropdown-item>
                                                        <el-dropdown-item data-type="2" @click.native="addEventData">累计</el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </div>
        
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            
                            <el-tab-pane label="自定义" name="second" style="padding: 0 !important;">
                                <div v-if="this.activeName == 'second'">
                                    <codemirror ref="myCodemirror" v-model="eventData.define" :options="cmOptions" class="my-codemirror"></codemirror>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                
                <el-dialog title="属性"
                           width="940px"
                           :visible.sync="eventAttributeDialog"
                           custom-class="attendance-dialog">
                    <el-form ref="addRuleAtt_Form" label-width="100px">
                        <el-form-item label="变量名：" style="margin-bottom: 10px" >
                            <el-input v-model.trim="boundName" placeholder="请输入" @blur="judgeBoundName(boundName)" size="small" style="width: 204px"></el-input>
                        </el-form-item>
                        <el-form-item label="滑动窗口：" style="margin-bottom: 10px">
                            <el-select v-model="slideType"
                                       placeholder="请选择"
                                       popper-class="select-option"
                                       style="width: 204px;"
                                       clearable
                                       size="small"
                                       @change="slideValue = ''">
                                <el-option
                                    v-for="(item, index) in slidingWindow"
                                    :key="index"
                                    :value="item.value"
                                    :label="item.label">
                                </el-option>
                            </el-select>
                            <el-time-picker
                                size="small"
                                v-model="slideValue"
                                v-if="this.slideType ==='time'"
                                :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                                style="width: 204px;"
                                value-format="H-m-s"
                                default-value="0"
                                placeholder="时/分/秒">
                            </el-time-picker>
                            <el-input v-model="slideValue"
                                      size="small"
                                      v-if="this.slideType === 'length'"
                                      placeholder="请输入"
                                      style="width: 204px;"></el-input>
                        </el-form-item>
                        <el-form-item label="AFTER：" style="margin-bottom: 10px;">
                            <template style="padding-top: 0">
                                <el-select v-model="timeSign"
                                           placeholder="请选择"
                                           size="small"
                                           clearable
                                           popper-class="select-option"
                                           @change="afterType = ''"
                                           style="width: 204px;">
                                    <el-option
                                        v-for="(item, index) in timeList"
                                        :key="index"
                                        :value="item.value"
                                        :label="item.label">
                                    </el-option>
                                </el-select>
                            </template>
                            <template>
                                <el-time-picker
                                    v-model="afterType"
                                    v-if="timeSign === 'fixed'"
                                    size="small"
                                    :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                                    style="width: 204px;"
                                    value-format="H-m-s"
                                    default-value="0"
                                    placeholder="固定时间">
                                </el-time-picker>
                                <el-time-picker
                                    is-range
                                    size="small"
                                    v-if="timeSign==='range'"
                                    v-model="afterType"
                                    range-separator=""
                                    class="afterTimer"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    value-format="H-m-s"
                                    default-value="0"
                                    placeholder="选择时间范围">
                                </el-time-picker>
                            </template>
                            <el-input v-model.trim="afterValue" size="small" @blur="judgeAfter(afterValue)" placeholder="变量名" style="width: 204px;"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <searchBtn title="确 定" @click="eventAttributeSuccess" />
                        <cancleBtn title="取 消" @click="eventAttributeDialog = false" />
                    </div>
                </el-dialog>
    
                <el-dialog title="累计属性"
                           width="700px"
                           :visible.sync="accmulateDialog"
                           custom-class="attendance-dialog">
                    <el-form ref="addRuleAtt_Form" label-width="80px">
                        <el-form-item label="变量名：" style="margin-bottom: 10px" >
                            <el-input v-model.trim="accmulateForm.fieldBindName" @blur="judgeFieldBindName(accmulateForm.fieldBindName)" placeholder="请输入" size="small" style="width: 204px"></el-input>
                        </el-form-item>
                        <el-form-item label="数值：" style="margin-bottom: 10px" >
                            <el-select v-model="accmulateForm.operator" placeholder="请选择"
                                       class="showKey"
                                       size="mini"
                                       clearable
                                       style="width: 204px;font-size: 12px"
                                       popper-class="select-option showThen">
                                <el-option
                                    v-for="item in common_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input-number v-model="accmulateForm.value" label="" :controls="false" style="width: 204px"></el-input-number>
                        </el-form-item>
                        
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <searchBtn title="确 定" @click="accmulateDialogSuccess()" />
                        <cancleBtn title="取 消" @click="accmulateDialog = false" />
                    </div>
                </el-dialog>
    
                <el-dialog title="资源池名称"
                           width="940px"
                           :visible.sync="resourceNameDialog"
                           custom-class="attendance-dialog pool-name">
                    <el-form ref="poolForm">
                        <el-form-item>
                            <el-input v-model="get_params_resource.name"
                                      @submit.native.prevent
                                      placeholder="请输入资源名称"
                                      style="width: 300px"
                                      size="small"
                                      clearable>
                                <el-button slot="append" style="color: #1cd7fa" icon="el-icon-search" @click="search_data_resource"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-table ref="multipleTable" v-loading="loading_resource" class='bigTable' :data="tableData_resource" border stripe tooltip-effect="dark">
                        <el-table-column align="center" type="index" width="50" :index="indexMethod_resource" label="序号">
                        </el-table-column>
                        <el-table-column prop="poolName" label="资源池名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80">
                            <template slot-scope="scope">
                                <el-button type="text" @click="addResourceName(scope.row)">选 择</el-button>
                            </template>
                        </el-table-column>
        
                    </el-table>
        
                    <div class="pagination">
                        <el-pagination background @size-change="handleSizeChange_resource" @current-change="handleCurrentChange_resource" :current-page="get_params_resource.page"
                                       :page-sizes="[10, 20, 30, 40,50]" :page-size="get_params_resource.size" layout="total, sizes, prev, pager, next" prev-text="上一页"
                                       next-text="下一页" :total="total_num_resource">
                        </el-pagination>
                    </div>
        
                    <div slot="footer" class="dialog-footer">
                        <cancleBtn title="取 消" @click="resourceNameDialog = false" />
                    </div>
                </el-dialog>
    
                <el-dialog title="规则继承"
                           width="940px"
                           :visible.sync="extendRulesDialog"
                           custom-class="attendance-dialog pool-name">
                    <el-form ref="poolForm">
                        <el-form-item>
                            <el-input v-model="get_params_extend.name"
                                      @submit.native.prevent
                                      placeholder="请输入规则名称"
                                      style="width: 300px"
                                      size="small"
                                      clearable>
                                <el-button slot="append" style="color: #1cd7fa" icon="el-icon-search" @click="search_data_extend"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    
                    <el-table ref="multipleTable" v-loading="loading_extend" class='bigTable' :data="tableData_extend" border stripe tooltip-effect="dark">
                        <el-table-column align="center" type="index" width="50" :index="indexMethod_extend" label="序号">
                        </el-table-column>
                        <el-table-column prop="name" label="规则名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80">
                            <template slot-scope="scope">
                                <el-button type="text" @click="addExtendRules(scope.row)">选 择</el-button>
                            </template>
                        </el-table-column>
        
                    </el-table>
        
                    <div class="pagination">
                        <el-pagination background @size-change="handleSizeChange_extend" @current-change="handleCurrentChange_extend" :current-page="get_params_extend.page"
                                       :page-sizes="[10, 20, 30, 40,50]" :page-size="get_params_extend.size" layout="total, sizes, prev, pager, next" prev-text="上一页"
                                       next-text="下一页" :total="total_num_extend">
                        </el-pagination>
                    </div>
        
                    <div slot="footer" class="dialog-footer">
                        <searchBtn title="清 空" @click= "clearExtend" />
                        <cancleBtn title="取 消" @click="extendRulesDialog = false" />
                    </div>
                </el-dialog>
    
                <el-dialog title="字段"
                           width="940px"
                           :visible.sync="fieldsDialog"
                           custom-class="attendance-dialog pool-name">
                    <el-form ref="fieldsForm" label-position="left">
                        <el-form-item label="变量：" label-width="60px">
                            <el-select size="mini" clearable v-model="fieldsType" @change="changeActive" filterable placeholder="请选择">
                                <el-option v-for="(item,index) in variate_arr_one" :key="index" :label="item.var" :value="item.var"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <!--<div class="ub fields-title">
                        <p v-if="this.fieldsType === 'AlarmEvent'" data-type="AlarmEvent" class="active">安全设备警告事件</p>
                        <p v-if="this.fieldsType === 'TrafficEvent'" data-type="TrafficEvent" class="active">网络流事件</p>
                        <p v-if="this.fieldsType === 'HostEvent'" data-type="HostEvent" class="active">主机日志事件</p>
                        <p v-if="this.fieldsType === 'HistoryIPEvent'" data-type="HistoryIPEvent" class="active">历史IP事件</p>
                        <p v-if="this.fieldsType === 'AssetEvent'" data-type="AssetEvent" class="active">资产事件</p>
                        <p v-if="this.fieldsType === 'MenaceEvent'" data-type="MenaceEvent" class="active">威胁情报IP</p>
                        <p v-if="this.fieldsType === 'VulnerabilityEvent'" data-type="VulnerabilityEvent" class="active">漏洞IP事件</p>
                    </div>-->
                    <el-table ref="multipleTable" class='bigTable innerTable' :data="tableData_fields" border stripe tooltip-effect="dark" style="height: 400px;overflow-y: auto">
                        <el-table-column align="center" type="index" width="50" label="序号">
                        </el-table-column>
                        <el-table-column prop="name" label="字段名称">
                            <template slot-scope="{row}">
                                <span>{{row.name}}（{{row.field}}）</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80">
                            <template slot-scope="scope">
                                <el-button type="text" @click="addFields(scope.row)">选 择</el-button>
                            </template>
                        </el-table-column>
        
                    </el-table>
        
                    <div slot="footer" class="dialog-footer">
                        <cancleBtn title="取 消" @click="fieldsDialog = false" />
                    </div>
                </el-dialog>
                
                <div class="title-line">
                    <span class="title-name">输出信息</span>
                </div>
                
                <div class="output-box">
                    <ul class="showcase_then">
                        <li v-for="(int, ind) in this.eventData.thenList"
                            :key="ind + 'c'">
                            <el-row type="flex" align="middle" justify="start">
                                <el-col :span="20">
                                        <el-row type="flex" align="middle">
                                            <p v-if="ind <= 14">
                                                <el-select v-model="int.key" placeholder="请选择"
                                                           class="showKey"
                                                           size="mini"
                                                           :disabled="true"
                                                           style="width: 184px;font-size: 12px"
                                                           popper-class="select-option showThen">
                                                    <el-option
                                                        v-for="item in thenKey"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </p>
                                            <p v-if="ind > 14">
                                                <el-input v-model="int.key"
                                                          placeholder="请输入"
                                                          :disabled="false"
                                                          width="160"
                                                          clearable
                                                          style="width: 184px;font-size: 12px"></el-input>
                                            </p>
                                            <p v-if="!['reportStatus','reportType','reportLevel','attackResult','timeQua', 'isBanned'].includes(int.key)">
                                                <el-input v-model="int.value" placeholder="请输入"
                                                          clearable
                                                          style="width: 184px;margin-left: 10px;font-size: 12px"></el-input>
                                            </p>
                                            <p v-if="int.key === 'reportType'">
                                                <el-select v-model="int.value" placeholder="请选择"
                                                           size="mini"
                                                           style="width: 184px;margin-left: 10px;font-size: 12px"
                                                           popper-class="select-option showThen">
                                                    <el-option
                                                        v-for="item in thenType"
                                                        :key="symbolKey(item.id)"
                                                        :label="item.name"
                                                        :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </p>
                                            <p v-if="int.key === 'isBanned'">
                                                <el-select v-model="int.value" placeholder="请选择"
                                                           size="mini"
                                                           style="width: 184px;margin-left: 10px;font-size: 12px"
                                                           popper-class="select-option showThen">
                                                    <el-option label="否" value="0"></el-option>
                                                    <el-option label="是" value="1"></el-option>
                                                </el-select>
                                            </p>
                                            <p v-if="int.key === 'timeQua'">
                                                <el-input type="number" v-model.trim="int.value" placeholder="请输入" clearable
                                                          style="width: 184px;margin-left: 10px;font-size: 12px"></el-input>
                                            </p>
                                            <p v-if="int.key === 'attackResult'">
                                                <el-select v-model="int.value" placeholder="请选择"
                                                           size="mini"
                                                           clearable
                                                           style="width: 184px;margin-left: 10px;font-size: 12px"
                                                           popper-class="select-option showThen">
                                                    <el-option
                                                        v-for="item in attackResultList"
                                                        :key="symbolKey(item.id)"
                                                        :label="item.name"
                                                        :value="item.name">
                                                    </el-option>
                                                </el-select>
                                            </p>
                                            <p v-if="int.key === 'reportStatus'">
                                                <el-select v-model="int.value" placeholder="请选择"
                                                           size="mini"
                                                           style="width: 184px;margin-left: 10px;font-size: 12px"
                                                           popper-class="select-option showThen">
                                                    <el-option
                                                        v-for="item in thenStatus"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </p>
                                            <p v-if="int.key === 'reportLevel'">
                                                <el-select v-model="int.value" placeholder="请选择"
                                                           size="mini"
                                                           style="width: 184px;margin-left: 10px;font-size: 12px"
                                                           popper-class="select-option showThen">
                                                    <el-option
                                                        v-for="item in thenLevel"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </p>
                                            <span>
                                                <span class="dottedLine" style="margin: 0 5px"></span>
                                            </span>
                                            <el-col style="width: 20px" v-if="ind >= 14">
                                                <i @click.stop="add_thenChild(ind)"
                                                   class="el-icon-plus"
                                                   style="cursor: pointer;font-size:14px;color:#1cd7fa"></i>
                                            </el-col>
                                            <el-col style="width: 20px;" v-if="ind > 14">
                                                <i @click.stop="del_thenChild(ind)"
                                                   class="el-icon-close"
                                                   style="cursor: pointer;font-size:16px;color:#1cd7fa"></i>
                                            </el-col>
                                        </el-row>
                                </el-col>
                            </el-row>
                        </li>
                    </ul>
                </div>
    
                <div class="title-line">
                    <span class="title-name">通知信息</span>
                </div>
                <div class="inform-box">
                    <el-form :model="eventData.noticeMap" ref="assetForm" label-width="86px" label-position="left">
                        <el-form-item label="通知方式:" prop="noticeType">
                            <el-checkbox-group v-model="eventData.noticeMap.noticeType">
                                <el-checkbox label="1">邮件</el-checkbox>
                                <el-checkbox label="2">短信</el-checkbox>
                                <el-checkbox label="3">蓝鲸</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="通知人员:" prop="noticeUser" v-if="eventData.noticeMap.noticeType.length">
                            <el-checkbox-group v-model="eventData.noticeMap.noticeUser">
                                <el-checkbox label="1">资产归属人</el-checkbox>
                                <el-checkbox label="2">归属人直接领导</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="其他人员:" prop="customUser" v-if="eventData.noticeMap.noticeType.length">
                            <el-select v-model="eventData.noticeMap.userIds" multiple placeholder="选择其他通知人" filterable clearable
                                       size="mini" style="width: 640px">
                                <el-option v-for="item in usersList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div v-if="!this.$route.query.id" class="right_btn">
                <cancleBtn v-if="!this.$route.query.disposal_id" class="releaseBtn" style="right: 120px !important;" title="取 消"
                           @click="$router.go(-1)" />
                <searchBtn class="releaseBtn" title="确 认"
                           @click="submitRule('rulesForm')" />
            </div>
        </div>
    </div>
</template>


<script>
import drools_tree_data from "./drools/drools_tree_data.vue";
import codemirror from "./drools/codemirror";

import {
    buildDrools,
    get_one_rule,
    get_mail_users,
    selectResourcePool,
    get_fields,
    get_extendRules
} from "../server/attect.js";
import {
    get_alarm_type_rule,
    get_rule_attack_result,
    getAssetsSelect,
    getSubjectLabel
} from '../server/api.js'
import {get_rule_tree} from "../server/inspection";

export default {
    name: "drools_rule",
    components: {
        codemirror,
        drools_tree_data
    },
    data () {
        return {
            timeList: [
                {
                    label: '固定时间',
                    value: 'fixed'
                },
                {
                    label: '范围时间',
                    value: 'range'
                }
            ],
            
            /*资产下拉*/
            assetTypeList: [],
            operationSystemList: [],
            zoneNameList: [],
            
            /*日志标签*/
            subjectLabelList: [],
            activeName: 'first',
            currentSelect: 'AND',
            noteFlag: true,
            enObj: {}, // 中文映射成英文,对象名中文
            cnObj: {}, // 英文映射成中文，对象名英文
    
            resourceNameDialog: false,
            extendRulesDialog: false,
            fieldsDialog: false,
            resourceItem: '',
            fieldsItem: '',
            fieldsType: '',
            get_params_resource: {
                page: 1,
                size: 10,
                name: '',
            },
            get_params_extend: {
                page: 1,
                size: 10,
                name: '',
            },
            get_params_fields: {
                page: 1,
                size: 10,
                name: '',
            },
            total_num_resource: '',
            total_num_fields: '',
            total_num_extend: '',
            tableData_resource: [],
            tableData_extend: [],
            tableData_fields: [],
            tableData_fields_AlarmEvent: [],
            tableData_fields_TrafficEvent: [],
            tableData_fields_HostEvent: [],
            tableData_fields_HistoryIPEvent: [],
            tableData_fields_AssetEvent: [],
            tableData_fields_MenaceEvent: [],
            tableData_fields_VulnerabilityEvent: [],
            codeContent: '',
            cmOptions: '',
            rules: [],
            
            loading: false,
            loading_resource: false,
            loading_extend: false,
            groupIsSelected:false,
            onOffAssign:false,
            onOff:false,
            isClick:true,
            indent: 10,
            initId: null,
            depId:'',
            currentNodeId:'',
            currentGroup:'',
            treeData: [],
            propsData: {
                children: 'childTypeInfo',
                label: 'name'
            },
            typeList: [],
            usersList: [],
            typeEvenTitle: '', // 以选择类型
            selectActive: '', // 单选功能
            addFieldRestrictions: [],  // 添加字段限制列表
            oldTime: '',
            oneData: '',
            record_id: '',
            
            isExtend: false,
            isEdit: false,
            
            multiFieldConstraint: [{
                label: '...',
                value: ''
            },
                {
                    label: '所有(并且)',
                    value: '&&'
                },
                {
                    label: '任意(或)',
                    value: '||'
                }],
            
            // 滑动窗口
            slideType: '',
            slideValue: '',
            slidingWindow: [{
                label: '时间',
                value: 'time'
            }, {
                label: '数量',
                value: 'length'
            }],
            
            // 滑动窗口
            slideWindow_sourceList: [
                // {
                //   slideType: '',
                //   slideValue: ''
                // }
            ],
            
            // After
            afterType: '',
            afterValue: '',
            timeSign: '',
            
            after_sourceList: [
                // {
                //   timeSign:'',
                //   afterType: '',
                //   afterValue: ''
                // }
            ],
            
            
            constraintName: '', // 选中约束字段
            // fieldBinding: '',  // 绑定变量
            currentIndex: '',  // 当前任意所有 index
            boundName: '',
            record_boundName: '',
            junctionType: '', // 多字段约束
            
            
            // 修改事件属性
            eventAttributeDialog: false,
            eventList: [{
                    label: '安全设备警告事件',
                    value: 'AlarmEvent'
                },
                {
                    label: '网络流事件',
                    value: 'TrafficEvent'
                },
                {
                    label: '主机日志事件',
                    value: 'HostEvent'
                },
                {
                    label: '历史IP事件',
                    value: 'HistoryIPEvent'
                },
                {
                    label: '引用资产',
                    value: 'AssetEvent'
                },
                {
                    label: '引用情报',
                    value: 'MenaceEvent'
                },
                /*{
                    label: '漏洞IP事件',
                    value: 'VulnerabilityEvent'
                }*/
                ],
            accumulateList: [{
                label: '安全设备警告事件',
                value: 'AlarmEvent'
                },
                {
                    label: '网络流事件',
                    value: 'TrafficEvent'
                },
                {
                    label: '主机日志事件',
                    value: 'HostEvent'
                },
                {
                    label: '引用资产',
                    value: 'AssetEvent'
                },
                {
                    label: '引用情报',
                    value: 'MenaceEvent'
                },
                /*{
                    label: '漏洞IP事件',
                    value: 'VulnerabilityEvent'
                }*/
                ],
            
            // 累计属性
            accmulateDialog: false,
            
            accmulateForm: {
                fieldBindName: '',
                operator: '',
                value: ''
            },
            record_fieldBindName: '',
            
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
    
    
            // 新建事实类型
            addModelTypes_Dialog: false,
            selectModelType: '',
            
            // 修改 negeted
            negetedDialog: false,
            currentNegeted: false,
            
            // 新建渠道
            name: '',
    
            eventIndex: null,
            countIndex: null,
            
            // Then 下拉选项
            thenKey: [{
                label: '告警类别',
                value: 'reportType'
            }, {
                label: '告警名称',
                value: 'reportName'
            }, {
                label: '告警级别',
                value: 'reportLevel'
            }, {
                label: '告警状态',
                value: 'reportStatus'
            }, {
                label: '处置建议',
                value: 'advice'
            }, {
                label: '分析过程',
                value: 'analyzePro'
            }, {
                label: '发送流量',
                value: 'sendFlow'
            }, {
                label: '资产IP',
                value: 'assetIp'
            }, {
                label: '资产',
                value: 'asset'
            }, {
                label: '规则描述',
                value: 'reportDesc'
            }, {
                label: '总数',
                value: 'count'
            },{
                label: '攻击结果',
                value: 'attackResult'
            },{
                label: '归并时间',
                value: 'timeQua'
            },{
                label: 'condition-1',
                value: 'condition-1'
            },{
                label: '是否封禁',
                value: 'isBanned'
            },],
            
            mailKey: [
                {
                    label: '通知资产归属人',
                    value: 'mailAssets'
                },
                {
                    label: '通知资产归属人直属领导',
                    value: 'mailAssetsLead'
                },
                {
                    label: '通知其他人',
                    value: 'mailUser'
                },
            ],
            messageKey: [
                {
                    label: '通知资产归属人',
                    value: 'messageAssets'
                },
                {
                    label: '通知资产归属人直属领导',
                    value: 'messageAssetsLead'
                },
                {
                    label: '通知其他人',
                    value: 'messageUser'
                },
            ],
            reportForm:{
                name:'',
                type:'',
                mouldId:'',
                status:true,
            },
            
            showThen: [{
                label: '关联规则',
                value: '关联规则'
            }, {
                label: '发送邮件',
                value: 'mail'
            }, {
                label: '发送短信',
                value: 'message'
            }],
            
            thenType: [], // 告警类型
            
            attackResultList: [], //攻击结果
            
            thenStatus: [{
                label: '待确认',
                value: '0'
            }],
            
            thenLevel: [{
                label: '低',
                value: '0'
            }, {
                label: '中低',
                value: '1'
            }, {
                label: '中',
                value: '2'
            }, {
                label: '中高',
                value: '3'
            }, {
                label: '高',
                value: '4'
            }],
            
            eventData: {
                "id": "",
                "name": "",
                "extends": "",
                "typeId": "",
                "des": "",
                "status": 0,
                "mark": 1,
                "define": "",
                "sourceList": [
                ],
                "thenList": [
                    {
                        "key": "reportType",
                        "reportTypeName": "",
                        "value": ""
                    },
                    {
                        "key": "reportName",
                        "value": ""
                    },
                    {
                        "key": "reportLevel",
                        "value": ""
                    },
                    {
                        "key": "reportStatus",
                        "value": "0"
                    },
                    {
                        "key": "advice",
                        "value": ""
                    },
                    {
                        "key": "analyzePro",
                        "value": ""
                    },
                    {
                        "key": "sendFlow",
                        "value": ""
                    },
                    {
                        "key": "assetIp",
                        "value": ""
                    },
                    {
                        "key": "asset",
                        "value": ""
                    },
                    {
                        "key": "reportDesc",
                        "value": ""
                    },
                    {
                        "key": "count",
                        "value": ""
                    },
                    {
                        "key": "attackResult",
                        "value": ""
                    },
                    {
                        "key": "isBanned",
                        "value": "0"
                    },
                    {
                        "key": "timeQua",
                        "value": ""
                    },
                    {
                        "key": "condition-1",
                        "value": ""
                    }
                ],
                "noticeMap": {
                    "noticeType": [],
                    "noticeUser": [],
                    "userIds": []
                }
            }
        }
    },
    created () {
        // alert(this.$route.query.disposal_id)
        this.getAlarmType();
        this.getUsers();
        this.getAssetsList();
        this.getAlarmLabel();
        this.get_data_extend();
        this.get_rules_result();
        this.initTree();
        this.get_data_resource();
        //this.get_data_fields();
        this.query_data();
        /*递归处理数据需要时间，操作在上面字段接口返回之后*/
       /* setTimeout(() => {
            this.query_data();
        }, 500)*/
    },
    
    mounted () {
        window.addEventListener('click', (e) => {
            this.onOff = false;
        })
    },
    computed: {
        /*收集变量名*/
        variate_arr() {
            let arr = [];
            this.eventData.sourceList.forEach((item,index) => {
                if (item.type == 0 && item.objBindName) {
                    arr.push(item.objBindName);
                } else if (item.type == 1) {
                    if (item.factMap.objBindName) {
                        arr.push(item.factMap.objBindName);
                    } else if (item.countMap.constraintList[0].fieldBindName) {
                        arr.push(item.countMap.constraintList[0].fieldBindName)
                    }
                }
            })
            return arr;
        },
        /*只收集非累计变量名*/
        variate_arr_one() {
            let arr = [];
            this.eventData.sourceList.forEach((item,index) => {
                if (item.type == 0 && item.objBindName) {
                    arr.push({
                        name: item.factType,
                        var: item.objBindName
                    });
                }
            })
            return arr;
        },
    },
    watch: {
        'activeName': {
            handler (newVal, oldVal) {
                if (newVal) {
                   newVal === 'first' ? (this.eventData.mark = 1) : (this.eventData.mark = 2)&&(this.eventData.extends = '');
                }
            },
        },
        'eventAttributeDialog': {
            handler (newVal, oldVal) {
                if (!newVal) {
                    this.afterValue = '';
                    this.boundName = '';
                    this.afterType = '';
                    this.slideType = '';
                    this.slideValue = '';
                    this.timeSign = '';
                }
            },
        },
        'fieldsDialog': {
            handler (newVal, oldVal) {
                if (!newVal) {
                    this.fieldsType = '';
                    this.tableData_fields = [];
                }
            },
        }
    },
    methods: {
        toogleAll (e) {
            console.log($(e.target).siblings('.toogle-box'))
            if ($(e.target).hasClass('is-show')) {
                $(e.target).toggleClass('is-show')
                $(e.target).siblings('.tree-line-vertical').hide();
                $(e.target).siblings('.tree-line-outer').hide();
            } else {
                $(e.target).toggleClass('is-show')
                $(e.target).siblings('.tree-line-vertical').show();
                $(e.target).siblings('.tree-line-outer').show();
            }
        },
        toogleChild (e) {
            console.log($(e.target).parent().siblings('.toogle-box'))
            if ($(e.target).hasClass('is-show')) {
                $(e.target).toggleClass('is-show')
                $(e.target).parent().siblings('.toogle-box').hide();
            } else {
                $(e.target).toggleClass('is-show')
                $(e.target).parent().siblings('.toogle-box').show();
            }
        },
        toogleChild_count (e) {
            console.log($(e.target).parent().siblings('.tree-line-count'))
            if ($(e.target).hasClass('is-show')) {
                $(e.target).toggleClass('is-show')
                $(e.target).parent().siblings('.tree-line-count').hide();
            } else {
                $(e.target).toggleClass('is-show')
                $(e.target).parent().siblings('.tree-line-count').show();
            }
        },
        toogleChild_countInner (e) {
            console.log($(e.target).siblings('.toogle-box'))
            if ($(e.target).hasClass('is-show')) {
                $(e.target).toggleClass('is-show')
                $(e.target).siblings('.toogle-box').hide();
            } else {
                $(e.target).toggleClass('is-show')
                $(e.target).siblings('.toogle-box').show();
            }
        },
        changeActive () {
            if (this.fieldsType === '') {
                this.tableData_fields = [];
                return ;
            }
            let item = this.variate_arr_one.find(_it=> _it.var === this.fieldsType)
            console.log(item)
            let type = item.name;
            // let list = document.querySelectorAll('.fields-title p');
            // [...list].forEach(item=> {
            //     item.classList.remove('active')
            // })
            // e.target.classList.add('active')
            this.tableData_fields = this['tableData_fields_' + type];
            console.log()
        },
        changeStatus () {
            if (this.isExtend && this.isEdit) {
                this.$message.warning('该规则已被其它规则继承，不能修改状态');
                return ;
            } else {
                this.eventData.status=!this.eventData.status;
            }
            
        },
        judgeAfter (after) {
            console.log(after)
            if (after !== '') {
                if (after[0] !== '$') {
                    this.afterValue = '';
                    this.$message.warning('变量名必须以$符开头');
                    return ;
                }
                if (!this.variate_arr.includes(after)) {
                    this.afterValue = '';
                    this.$message.warning('输入的变量名不存在');
                }
            }
        },
        judgeBoundName (name) {
            console.log(name)
            if (name !== '') {
                if (name[0] !== '$') {
                    this.boundName = '';
                    this.$message.warning('变量名必须以$符开头');
                    return ;
                }
                /*校验前先和自己对比*/
                if (this.record_boundName === this.boundName) {
                    return ;
                }
                if (this.variate_arr.includes(name)) {
                    this.boundName = '';
                    this.$message.warning('事件变量名已存在');
                }
            }
        },
        judgeFieldBindName (name) {
            console.log(name)
            if (name !== '') {
                if (name[0] !== '$') {
                    this.accmulateForm.fieldBindName = '';
                    this.$message.warning('变量名必须以$符开头');
                    return ;
                }
                /*校验前先和自己对比*/
                if (this.record_fieldBindName === this.accmulateForm.fieldBindName) {
                    return ;
                }
                if (this.variate_arr.includes(name)) {
                    this.accmulateForm.fieldBindName = '';
                    this.$message.warning('变量名已存在');
                }
            }
        },
        goResourcePool () {
            this.$setsessionStorage('eventData', JSON.stringify(this.eventData));
            this.$router.push('/home/resource_list');
        },
        clearExtend () {
            this.eventData.extends = '';
            this.extendRulesDialog = false;
        },
        upResource  (val) {
            this.resourceNameDialog = true;
            this.resourceItem = val;
        },
        upFields  (val) {
            this.fieldsDialog = true;
            this.fieldsItem = val;
        },
        indexMethod_resource(index) {
            return (this.get_params_resource.page - 1) * this.get_params_resource.size + index + 1;
        },
        indexMethod_extend(index) {
            return (this.get_params_extend.page - 1) * this.get_params_extend.size + index + 1;
        },
    
        handleSizeChange_resource(val) {
            this.get_params_resource.size = val;
            this.get_data_resource();
        },
        handleSizeChange_extend(val) {
            this.get_params_extend.size = val;
            this.get_data_extend();
        },
        handleCurrentChange_resource(val) {
            this.get_params_resource.page = val;
            this.get_data_resource();
        },
        handleCurrentChange_extend(val) {
            this.get_params_extend.page = val;
            this.get_data_extend();
        },
        addResourceName (row) {
            console.log(row);
            this.resourceItem.value = `"$$:${row.poolName}"`;
            this.resourceNameDialog = false;
        },
        addExtendRules (row) {
            console.log(row);
            this.eventData.extends = row.name;
            this.extendRulesDialog = false;
        },
        addFields (row) {
            console.log(row);
            this.fieldsItem.value = this.fieldsType + '.' + row.name;
            this.fieldsDialog = false;
        },
        search_data_resource () {
            this.get_params_resource.page = 1;
            this.get_data_resource();
        },
        search_data_extend () {
            this.get_params_extend.page = 1;
            this.get_data_extend();
        },
        get_data_resource() {
            this.loading_resource = true;
            this.tableData_resource = [];
            let data = {
                name: this.get_params_resource.name,
                page: this.get_params_resource.page,
                size: this.get_params_resource.size,
            }
            console.log(data)
            selectResourcePool(data).then(res => {
                // console.log('getList', res);
                this.loading_resource = false;
                this.total_num_resource = res.data.count;
                let list = res.data.list;
                if (list.length > 0) {
                    list.forEach(item => {
                        let obj = {};
                        obj.id = item.id;
                        obj.poolName = item.poolName;
                        this.tableData_resource.push(obj);
                    })
                }
            }).catch(error => {
                this.loading_resource = false;
                console.log('error' + error);
            })
        },
    
        get_data_extend() {
            this.loading_extend = true;
            this.tableData_extend = [];
            let data = {
                queryData: {
                    page: this.get_params_extend.page,
                    pageSize: this.get_params_extend.size
                },
                paramsData: {
                    ruleName: this.get_params_extend.name,
                    ruleId: this.eventData.id
                }
            }
            get_extendRules(data).then(res => {
                console.log(res)
                this.loading_extend = false;
                this.total_num_extend = res.totalElements;
                let list = res.content;
                if (list.length > 0) {
                    list.forEach(item => {
                        let obj = {};
                        obj.name = item.name;
                        this.tableData_extend.push(obj);
                    })
                }
            }).catch(error => {
                this.loading_extend = false;
                console.log('error' + error);
            })
        },
    
        async get_data_fields() {
            // console.log("?????字段")
            this.tableData_fields = [];
            this.tableData_fields_AlarmEvent = [];
            this.tableData_fields_TrafficEvent = [];
            this.tableData_fields_HostEvent = [];
            this.tableData_fields_HistoryIPEvent = [];
            this.tableData_fields_AssetEvent = [];
            this.tableData_fields_MenaceEvent = [];
            this.tableData_fields_VulnerabilityEvent = [];
            let data = {}
            
            let list = this.$getsessionStorage('rule_fields');
            let err;
            if (!list.length) {
                [err, list] = await get_fields(data).then(res => {
                    return [null, res]
                }).catch(err => {
                    return [err, null];
                })
            }
            console.log(err)
            this.enObj = {};
            this.cnObj = {};
            if (list.length > 0) {
                list.forEach(item => {
                    this.enObj[item.name] = item.handle;
                    this.cnObj[item.handle] = item.name;
                    if (item.type === 'AlarmEvent') {
                        let obj = {};
                        obj.field = item.field;
                        obj.name = item.name;
                        obj.typeName = item.typeName;
                        obj.handle = item.handle;
                        obj.type = item.type;
                        obj.seq = item.seq;
                        this.tableData_fields_AlarmEvent.push(obj);
                    } else if (item.type === 'TrafficEvent') {
                        let obj = {};
                        obj.field = item.field;
                        obj.name = item.name;
                        obj.typeName = item.typeName;
                        obj.handle = item.handle;
                        obj.type = item.type;
                        obj.seq = item.seq;
                        this.tableData_fields_TrafficEvent.push(obj);
                    } else if (item.type === 'HostEvent') {
                        let obj = {};
                        obj.field = item.field;
                        obj.name = item.name;
                        obj.typeName = item.typeName;
                        obj.handle = item.handle;
                        obj.type = item.type;
                        obj.seq = item.seq;
                        this.tableData_fields_HostEvent.push(obj);
                    } else if (item.type === 'HistoryIPEvent') {
                        let obj = {};
                        obj.field = item.field;
                        obj.name = item.name;
                        obj.typeName = item.typeName;
                        obj.handle = item.handle;
                        obj.type = item.type;
                        obj.seq = item.seq;
                        this.tableData_fields_HistoryIPEvent.push(obj);
                    } else if (item.type === 'AssetEvent') {
                        let obj = {};
                        obj.field = item.field;
                        obj.name = item.name;
                        obj.typeName = item.typeName;
                        obj.handle = item.handle;
                        obj.type = item.type;
                        obj.seq = item.seq;
                        this.tableData_fields_AssetEvent.push(obj);
                    } else if (item.type === 'MenaceEvent') {
                        let obj = {};
                        obj.field = item.field;
                        obj.name = item.name;
                        obj.typeName = item.typeName;
                        obj.handle = item.handle;
                        obj.type = item.type;
                        obj.seq = item.seq;
                        this.tableData_fields_MenaceEvent.push(obj);
                    } else if (item.type === 'VulnerabilityEvent') {
                        let obj = {};
                        obj.field = item.field;
                        obj.name = item.name;
                        obj.typeName = item.typeName;
                        obj.handle = item.handle;
                        obj.type = item.type;
                        obj.seq = item.seq;
                        this.tableData_fields_VulnerabilityEvent.push(obj);
                    }
                })
                this.tableData_fields = [];
                console.log(this.enObj, '发送')
                console.log(this.cnObj, '接收')
            }
            this.init_data();
        },
    
        selectChange(e) {
            console.log(e.target.dataset.type)
            let dtype = e.target.dataset.type;
            if (dtype == 1 ) {
                this.currentSelect = 'AND'
            } else if (dtype == 2) {
                this.currentSelect = 'OR'
            } else if (dtype == 3) {
                this.currentSelect = 'NOT'
            }
        },
        eventChange (item) {
            item.constraintList = [];
        },
        addEventData(e) {
            console.log(e.target.dataset.type)
            let dtype = e.target.dataset.type;
            if (dtype == 1 ) {
                this.eventData.sourceList.push({
                    type: 0,
                    factType: 'AlarmEvent',
                    window: '',
                    after: '',
                    objBindName: '',
                    junctionType: '',
                    note: '',
                    constraintList: []
                })
                this.slideWindow_sourceList.push({slideType: '', slideValue: ''});
                this.after_sourceList.push({afterType: '', afterValue: '', timeSign: ''});
            } else if (dtype == 2) {
                this.eventData.sourceList.push({
                    type: 1,
                    countMap: {
                        factType: 'LinkedList',
                        note: '',
                        constraintList: [
                            {
                                constraintName: 'size',
                                operator: '',
                                value: '',
                                fieldBindName: '',
                                junctionType: '',
                                dataType: '0',
                                constraintList: [],
                            }
                        ]
                    },
                    factMap: {
                        factType: 'AlarmEvent',
                        window: '',
                        after: '',
                        objBindName: '',
                        junctionType: '',
                        note: '',
                        constraintList: []
                    }
                })
                this.slideWindow_sourceList.push({slideType: '', slideValue: ''});
                this.after_sourceList.push({afterType: '', afterValue: '', timeSign: ''});
            }
        },
        addEventData_down (e,index) {
            let dtype = e.target.dataset.type;
            if (dtype == 1 ) {
                this.eventData.sourceList.splice(index+1, 0 ,{
                    type: 0,
                    factType: 'AlarmEvent',
                    window: '',
                    after: '',
                    objBindName: '',
                    junctionType: '',
                    note: '',
                    constraintList: []
                })
                this.slideWindow_sourceList.splice(index+1, 0, {slideType: '', slideValue: ''});
                this.after_sourceList.splice(index+1, 0, {afterType: '', afterValue: '', timeSign: ''});
            } else if (dtype == 2) {
                this.eventData.sourceList.splice(index+1, 0, {
                    type: 1,
                    countMap: {
                        factType: 'LinkedList',
                        note: '',
                        constraintList: [
                            {
                                constraintName: 'size',
                                operator: '',
                                value: '',
                                fieldBindName: '',
                                junctionType: '',
                                dataType: '0',
                                constraintList: [],
                            }
                        ]
                    },
                    factMap: {
                        factType: 'AlarmEvent',
                        window: '',
                        after: '',
                        objBindName: '',
                        junctionType: '',
                        note: '',
                        constraintList: []
                    }
                })
                this.slideWindow_sourceList.splice(index+1, 0, {slideType: '', slideValue: ''});
                this.after_sourceList.splice(index+1, 0, {afterType: '', afterValue: '', timeSign: ''});
            }
        },
        addEventData_up (e,index) {
            let dtype = e.target.dataset.type;
            if (dtype == 1 ) {
                this.eventData.sourceList.splice(index, 0 ,{
                    type: 0,
                    factType: 'AlarmEvent',
                    window: '',
                    after: '',
                    objBindName: '',
                    junctionType: '',
                    note: '',
                    constraintList: []
                })
                this.slideWindow_sourceList.splice(index, 0, {slideType: '', slideValue: ''});
                this.after_sourceList.splice(index, 0, {afterType: '', afterValue: '', timeSign: ''});
            } else if (dtype == 2) {
                this.eventData.sourceList.splice(index, 0, {
                    type: 1,
                    countMap: {
                        type: 'LinkedList',
                        note: '',
                        constraintList: [
                            {
                                constraintName: 'size',
                                operator: '',
                                value: '',
                                fieldBindName: '',
                                junctionType: '',
                                dataType: '0',
                                constraintList: [],
                            }
                        ]
                    },
                    factMap: {
                        factType: 'AlarmEvent',
                        window: '',
                        after: '',
                        objBindName: '',
                        junctionType: '',
                        note: '',
                        constraintList: []
                    }
                })
                this.slideWindow_sourceList.splice(index, 0, {slideType: '', slideValue: ''});
                this.after_sourceList.splice(index, 0, {afterType: '', afterValue: '', timeSign: ''});
            }
        },
        deleteEventData (index) {
            this.eventData.sourceList.splice(index, 1);
            this.slideWindow_sourceList.splice(index, 1);
            this.after_sourceList.splice(index, 1);
        },
    
        openEventAttributeDialog (item, index) {
            this.eventIndex = index;
            this.boundName = this.record_boundName = item.objBindName;
            this.slideType = this.slideWindow_sourceList[index].slideType;
            this.slideValue = this.slideWindow_sourceList[index].slideValue;
            this.timeSign = this.after_sourceList[index].timeSign;
            this.afterType = this.after_sourceList[index].afterType;
            this.afterValue = this.after_sourceList[index].afterValue;
            this.eventAttributeDialog = true;
        },
        
        eventAttributeSuccess () {
            /*if (this.afterValue) {
                if (!this.variate_arr.includes(after)) {
                    this.afterValue = '';
                    this.$message.warning('输入的变量名不存在');
                    return ;
                }
            }*/
            if (this.slideType && !this.slideValue) {
                this.$message.warning('请填写滑动窗口对应值');
                return ;
            }
            if (this.timeSign && (!this.afterType || !this.afterValue)) {
                this.$message.warning('请填写AFTER的时间和变量名');
                return ;
            }
            
            console.log(this.eventIndex)
            console.log(this.eventData)
            /*判断属性，确定插入普通或累计事件中*/
            console.log(this.eventData.sourceList[this.eventIndex].factMap)
            if ('objBindName' in this.eventData.sourceList[this.eventIndex]) {
                this.eventData.sourceList[this.eventIndex].objBindName = this.boundName
            } else if (this.eventData.sourceList[this.eventIndex].factMap) {
                this.eventData.sourceList[this.eventIndex].factMap.objBindName = this.boundName;
            }
            console.log(this.eventData.sourceList[this.eventIndex].factMap)
            
            this.slideWindow_sourceList[this.eventIndex].slideType = this.slideType;
            this.slideWindow_sourceList[this.eventIndex].slideValue = this.slideValue ? this.slideValue : '';
           
            this.after_sourceList[this.eventIndex].timeSign = this.timeSign;
            this.after_sourceList[this.eventIndex].afterType = this.afterType ? this.afterType : '';
            this.after_sourceList[this.eventIndex].afterValue = this.afterValue;
            this.eventAttributeDialog = false;
        },
        openAccmulateDialog (item, index) {
            this.countIndex = index;
            this.accmulateForm.fieldBindName = this.record_fieldBindName = item.countMap.constraintList[0].fieldBindName;
            this.accmulateForm.operator = item.countMap.constraintList[0].operator;
            this.accmulateForm.value = item.countMap.constraintList[0].value;
            this.accmulateDialog = true;
        },
        accmulateDialogSuccess () {
            if (this.accmulateForm.operator && this.accmulateForm.value === '') {
                this.$message.warning('请填写完整的数值和关系运算符')
                return ;
            } else if (!this.accmulateForm.operator && this.accmulateForm.value != 0) {
                this.$message.warning('请填写完整的数值和关系运算符')
                return ;
            }
            this.eventData.sourceList[this.countIndex].countMap.constraintList[0].fieldBindName = this.accmulateForm.fieldBindName;
            this.eventData.sourceList[this.countIndex].countMap.constraintList[0].operator = this.accmulateForm.operator;
            this.eventData.sourceList[this.countIndex].countMap.constraintList[0].value = this.accmulateForm.value;
            
            this.accmulateDialog = false;
        },
        
        symbolKey (key) {
            return Symbol(key);
        },
        initTree(){
            let data = {
                queryData: {},
                paramsData: {}
            }
            get_rule_tree(data).then(res => {
                console.log('tree',res);
                let _data = [
                    ...res
                ]
                _data[0].disabled = true;
                this.isClick = false;
                this.treeData = _data;
                
            }).catch(error => {
                console.log('error' + error);
            })
        },
        
        handleClick(data,checked, node){
            if(checked){
                // this.groupIsSelected = false;
                this.currentNode = data;
                this.currentNodeId = data.id;
                this.currentGroup = data.name;
                this.$refs.tree.setCheckedNodes([data]);
                this.eventData.typeId = this.currentNodeId;
            }
        },
        handleNodeClick(node) {
            console.log(node)
        },
        
        get_rules_type () {
            let data = {
                queryData: {},
                paramsData: {}
            }
            get_rule_type(data).then(res => {
                console.log(res)
                this.typeList = res;
            }).catch(err => {
                console.log(err)
            })
        },
        get_rules_result () {
            let data = {
                queryData: {},
                paramsData: {}
            }
            get_rule_attack_result(data).then(res => {
                console.log(res)
                this.attackResultList = res;
            }).catch(err => {
                console.log(err)
            })
        },
        getUsers () {
            this.usersList = [];
            let data = {
                queryData: {},
                paramsData: {}
            }
            get_mail_users(data).then(res => {
                console.log(res);
                let list = res;
                if (list.length > 0) {
                    list.forEach(item => {
                        let obj = {};
                        obj.id = item.id;
                        obj.name = item.chinesename;
                        obj.mail = `${item.chinesename}(${item.mailbox})`;
                        obj.phone = `${item.chinesename}(${item.phone})`
                        // obj.is_sys = item.is_sys;
                        this.usersList.push(obj);
                    })
                }
            }).catch(error => {
                console.log('error' + error);
            })
        },
        getAssetsList () {
            this.zoneNameList = [];
            this.assetTypeList = [];
            this.operationSystemList = [];
            
            getAssetsSelect({}).then(res => {
                console.log(res)
                this.zoneNameList = res.aqy;
                this.assetTypeList = res.sblx;
                this.operationSystemList = res.ywxt;
            }).catch(error => {
                console.log('error' + error);
            })
        },
        getAlarmLabel () {
            this.subjectLabelList = [];
            getSubjectLabel({}).then(res => {
                console.log(res)
                this.subjectLabelList = res;
            }).catch(error => {
                console.log('error' + error);
            })
        },
        getAlarmType () {
            this.thenType = [];
            let data = {
                queryData: {},
                paramsData: {}
            }
            get_alarm_type_rule(data).then(res => {
                console.log(res);
                let list = res;
                if (list.length > 0) {
                    list.forEach(item => {
                        let obj = {};
                        obj.id = item.id;
                        obj.name = item.name;
                        // obj.is_sys = item.is_sys;
                        this.thenType.push(obj);
                    })
                }
                console.log(this.thenType)
            }).catch(error => {
                console.log('error' + error);
            })
        },
        query_data() {
            this.record_id = '';
            let disposal_id = this.$route.query.disposal_id;
            // 从处置任务跳转过来
            if (disposal_id) {
                this.record_id = disposal_id;
            }
            // 从告警或分析溯源跳转过来
            if (this.$route.query.id) {
                this.record_id = this.$route.query.id;
            }
            if (this.record_id) {
                let data = {id: this.record_id}
                get_one_rule(data).then(res => {
                    console.log(res);
                    this.oneData = res;
                    console.log(this.oneData)
                }).then(() => {
                    this.get_data_fields();
                }).catch(err => {
                    console.log(err + 'err')
                })
            } else {
                this.get_data_fields();
            }
        },
        init_data() {
            // 判断由哪里进入的详情页
            if (this.$route.params.modelMap || this.record_id) {
                let data = [];
                if (this.$route.params.modelMap) {
                    data = JSON.parse(this.$route.params.modelMap);
                    this.currentGroup = this.$route.params.typeName;
                    this.isEdit = this.$route.params.isEdit ? true : false;
                    this.isExtend = this.$route.params.isExtend;
                }
                if (this.record_id) {
                    console.log(this.oneData.modelMap)
                    data = JSON.parse(this.oneData.modelMap);
                    data.status = this.oneData.status;
                    data.typeId = this.oneData.typeId;
                    this.currentGroup = this.oneData.typeName;
                }
                
                this.getFormat_sourceList(data.sourceList);
                this.receiveEnToChinese(data.sourceList);
                this.splitWindow(data.sourceList, 'slideWindow_sourceList');
                this.splitAfter(data.sourceList, 'after_sourceList');
                
                
                this.eventData = data;
                if (this.eventData.noticeMap.userIds) {
                    this.eventData.noticeMap.userIds = this.eventData.noticeMap.userIds.split(',');
                } else {
                    this.eventData.noticeMap.userIds = [];
                }
                
                if (this.$route.params.modelMap) {
                    this.eventData.id = this.$route.params.id;
                    this.eventData.typeId = this.$route.params.typeId;
                }
                this.activeName = this.eventData.mark == 1 ? 'first' : 'second';
               
                this.$setsessionStorage('eventData', JSON.stringify(this.eventData));
                this.$setsessionStorage('data_typeName', JSON.stringify(this.currentGroup));
            } else {
                // 判断是否新建，不是新建可返回用缓存,资源池返回
               /* if (this.$getsessionStorage('eventData') && this.$route.query.cache) {
                    console.log(this.$getsessionStorage('eventData'))
                    this.eventData = JSON.parse(this.$getsessionStorage('eventData'))
                    this.activeName = this.eventData.mark == 1 ? 'first' : 'second';
                }*/
            }
        },
        submitRule (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.interval(this.sendModelData);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        interval (callback) {
            let _this = this;
            if (this.oldTime) {
                let newTime = new Date();
                let interval = newTime - this.oldTime;
                this.oldTime = newTime;
                console.log(interval)
                if (interval > 3000) {
                    callback && callback.call(_this);
                }
            } else {
                this.oldTime = new Date();
                callback && callback.call(_this);
            }
        },
        
        sendModelData () {
            // if(this.currentGroup ==''){
            //     this.groupIsSelected = true;
            //     return;
            // }
            this.eventData.name = this.eventData.name.trim();
            if (this.eventData.name === this.eventData.extends) {
                this.$message.warning('规则不能继承它本身');
                return ;
            }
            this.loading = true;
            document.getElementById('container').style.overflow = 'hidden';
            let data = JSON.parse(JSON.stringify(this.eventData));
            
            if (this.activeName === 'first') {
                data.define = ''
                data.mark = 1;
            } else {
                data.mark = 2;
                data.sourceList = [];
            }
            let itemType = this.thenType.find(it => {
                return it.id ==  data.thenList[0].value;
            })
            data.thenList[0].reportTypeName = itemType.name;
            //重组window、after
            data.sourceList.forEach((item, index) => {
                if (item.type == '0') {
                    // console.log(this.slideWindow_sfactpList, index)
                    if (this.slideWindow_sourceList[index] && this.slideWindow_sourceList[index].slideType && this.slideWindow_sourceList[index].slideValue.trim()) {
                        item.window = 'over window:' + this.slideWindow_sourceList[index].slideType + '(' + this.timeToStr(this.slideWindow_sourceList[index].slideValue) + ')';
                    } else {
                        item.window = '';
                    }
                    if (this.after_sourceList[index] && this.after_sourceList[index].afterType && this.after_sourceList[index].afterValue.trim()) {
                        if (this.after_sourceList[index].timeSign === 'range') {
                            item.after = '[' + this.timeToStr(this.after_sourceList[index].afterType[0]) + ',' + this.timeToStr(this.after_sourceList[index].afterType[1]) + ']' + ' ' + this.after_sourceList[index].afterValue;
                        } else if (this.after_sourceList[index].timeSign === 'fixed') {
                            item.after = '[' + this.timeToStr(this.after_sourceList[index].afterType) + ']' + ' ' + this.after_sourceList[index].afterValue;
                        }
                    } else {
                        item.after = '';
                    }
                } else if (item.type == '1') {
                    // console.log(this.slideWindow_sfactpList, index)
                    if (this.slideWindow_sourceList[index] && this.slideWindow_sourceList[index].slideType && this.slideWindow_sourceList[index].slideValue.trim()) {
                        item.factMap.window = 'over window:' + this.slideWindow_sourceList[index].slideType + '(' + this.timeToStr(this.slideWindow_sourceList[index].slideValue) + ')';
                    } else {
                        item.factMap.window = '';
                    }
                    if (this.after_sourceList[index] && this.after_sourceList[index].afterType && this.after_sourceList[index].afterValue.trim()) {
                        if (this.after_sourceList[index].timeSign === 'range') {
                            item.factMap.after = '[' + this.timeToStr(this.after_sourceList[index].afterType[0]) + ',' + this.timeToStr(this.after_sourceList[index].afterType[1]) + ']' + ' ' + this.after_sourceList[index].afterValue;
                        } else if (this.after_sourceList[index].timeSign === 'fixed') {
                            item.factMap.after = '[' + this.timeToStr(this.after_sourceList[index].afterType) + ']' + ' ' + this.after_sourceList[index].afterValue;
                        }
                    } else {
                        item.factMap.after = '';
                    }
                }
            })
            
            this.sendFormat_sourceList(data.sourceList);
            this.sendChineseToEn(data.sourceList);
            data.noticeMap.userIds = data.noticeMap.userIds.join(',');
            data.status = data.status ? 1 : 0;
            
            buildDrools(data).then(res => {
                if (document.getElementsByClassName('el-message').length === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                }
                this.loading = false;
                document.getElementById('container').style.overflow = 'auto';
                setTimeout(() => {
                    this.$router.push('/home/rule');
                }, 2000)
            }).catch(error => {
                this.loading = false;
                document.getElementById('container').style.overflow = 'auto';
                console.log(error + 'error')
            })
        },
        
        // 解析 function 字段
        splitCondition (val, type) {
            let regex = /\((.+?)\)/g;
            if (type === 'checked') {
                let start = val.indexOf('(');
                return val.substring(0, start)
            } else if (type === 'value') {
                let res = val.match(regex)
                if (res) {
                    res = res[0]
                    return res.substring(1, res.length - 1);
                } else {
                    return '';
                }
            } else {
                return '';
            }
        },
        
       
        add_thenChild (ind) {
            this.eventData.thenList.splice(ind+1, 0,
                {
                    key: '',
                    value: ''
                }
            )
        },
        
        del_thenChild (ind) {
            this.eventData.thenList.splice(ind, 1);
        },
        
        //  递归回显
        getFormatData (arr) {
            arr.forEach(tmp => {
                if (tmp.operator === 'in' || tmp.operator === 'not in') {
                    if (tmp.value.trim() !== '') {
                        let str = tmp.value.substring(1, tmp.value.length - 1);
                        // let reg = /^[0-9]*$/;
                        // if (str.match(reg)) {
                        //   console.log(tmp.value)
                        tmp.value = tmp.value.substring(1, tmp.value.length - 1);
                        // } else {
                        //   tmp.value = tmp.value.substring(2, tmp.value.length - 2);
                        // }
                    } else {
                        tmp.value = '';
                    }
                }
                if (tmp.constraintList && tmp.constraintList.length !== 0) {
                    this.getFormatData(tmp.constraintList);
                }
            })
        },
        
        //  递归回显第1个数组
        getFormat_sourceList (arr) {
            arr.forEach(item => {
                if (item.type == 0) {
                    this.getFormatData(item.constraintList)
                }
                if (item.type == 1) {
                    this.getFormatData(item.countMap.constraintList)
                    this.getFormatData(item.factMap.constraintList)
                }
            })
        },
        
        // 发送递归
        sendFormatData (arr) {
            arr.forEach(tmp => {
                if (tmp.operator === 'in' || tmp.operator === 'not in') {
                    if (tmp.value.trim()) {
                        let str = tmp.value.trim().split(',');
                        let newStr = str.map(item => {
                            let reg = /^[0-9]*$/;
                            if (item.match(reg)) {
                                return Number(item);
                            } else if (item[0] === '"' && item[item.length - 1] === '"') {
                                return item;
                            } else {
                                return "\"" + item + "\"";
                            }
                        })
                        tmp.value = '(' + newStr.join(',') + ')';
                        // console.log(newStr)
                    } else {
                        tmp.value = '';
                    }
                }
                if (tmp.constraintList && tmp.constraintList.length !== 0) {
                    this.sendFormatData(tmp.constraintList);
                }
            })
        },
        
        // 递归发送第1个数组
        sendFormat_sourceList (arr) {
            arr.forEach(item => {
                if (item.type == '0') {
                    this.sendFormatData(item.constraintList)
                } else if (item.type == '1') {
                    this.sendFormatData(item.factMap.constraintList)
                }
            })
        },

        //发送时递归遍历数据，将变量字段中文转英文
        sendChineseToEn (arr) {
            arr.forEach(item => {
                if (item.type == 0) {
                    this.cnToEn(item.constraintList);
                } else if (item.type == 1) {
                    this.cnToEn(item.factMap.constraintList);
                }
            })
        },
        
        cnToEn (arr) {
            arr.forEach(it => {
                if (it.dataType == 1) {
                    if (it.value.trim() && it.value.includes('.')) {
                        let num = it.value.lastIndexOf('.');
                        let str = it.value.slice(num+1).trim();
                        if (str in this.enObj) {
                            it.value = it.value.slice(0, num) + this.enObj[str];
                        }
                    }
                }
                if (it.constraintList && it.constraintList.length !== 0) {
                    this.cnToEn(it.constraintList);
                }
            })
        },
        
        //接收数据时递归遍历数据，将变量字段英文转中文
        receiveEnToChinese (arr) {
            arr.forEach(item => {
                if (item.type == 0) {
                    this.enToCn(item.constraintList);
                } else if (item.type == 1) {
                    this.enToCn(item.factMap.constraintList);
                }
            })
        },
        
        enToCn (arr) {
            arr.forEach(it => {
                if (it.dataType == 1) {
                    if (it.value.trim() && it.value.includes('.')) {
                        let num = it.value.lastIndexOf('.');
                        let str = it.value.slice(num).trim();
                        console.log(this.cnObj)
                        if (str in this.cnObj) {
                            it.value = it.value.slice(0, num + 1) + this.cnObj[str];
                        }
                    }
                }
                if (it.constraintList && it.constraintList.length !== 0) {
                    this.enToCn(it.constraintList);
                }
            })
        },
        
        // 解析滑动窗口字段
        splitWindow (arr, type) {
            arr.forEach(item => {
                if (item.type == 0) {
                    let obj = {};
                    if (item.window.includes('time')) {
                        obj.slideType = 'time';
                        let sta = item.window.indexOf('(');
                        let end = item.window.indexOf(')');
                        obj.slideValue = this.strToTime(item.window.substring(sta + 1, end));
                        this[type].push(obj);
                    } else if (item.window.includes('length')) {
                        obj.slideType = 'length';
                        let sta = item.window.indexOf('(');
                        let end = item.window.indexOf(')');
                        obj.slideValue = item.window.substring(sta + 1, end);
                        this[type].push(obj);
                    } else {
                        this[type].push({slideType: '', slideValue: ''})
                    }
                } else if (item.type == 1) {
                    let obj = {};
                    if (item.factMap.window.includes('time')) {
                        obj.slideType = 'time';
                        let sta = item.factMap.window.indexOf('(');
                        let end = item.factMap.window.indexOf(')');
                        obj.slideValue = this.strToTime(item.factMap.window.substring(sta + 1, end));
                        this[type].push(obj);
                    } else if (item.factMap.window.includes('length')) {
                        obj.slideType = 'length';
                        let sta = item.factMap.window.indexOf('(');
                        let end = item.factMap.window.indexOf(')');
                        obj.slideValue = item.factMap.window.substring(sta + 1, end);
                        this[type].push(obj);
                    } else {
                        this[type].push({slideType: '', slideValue: ''})
                    }
                }
            })
        },
        
        // 解析after字段
        splitAfter (arr, type, num) {
            arr.forEach(item => {
                if (item.type == 0 ) {
                    let obj = {};
                    if (item.after.includes(',')) {
                        let sta = item.after.indexOf('[');
                        let mid = item.after.indexOf(',');
                        let end = item.after.indexOf(']');
                        obj.afterType = [];
                        obj.timeSign = 'range';
                        obj.afterType.push(this.strToTime(item.after.substring(sta + 1, mid)));
                        obj.afterType.push(this.strToTime(item.after.substring(mid + 1, end)));
                        obj.afterValue = item.after.trim().split(' ')[1];
                    } else if (!item.after.includes(',') && item.after !== '') {
                        let sta = item.after.indexOf('[');
                        let end = item.after.indexOf(']');
                        obj.afterType = this.strToTime(item.after.substring(sta + 1, end));
                        obj.timeSign = 'fixed';
                        obj.afterValue = item.after.trim().split(' ')[1];
                    } else {
                        obj.afterType = '';
                        obj.afterValue = '';
                        obj.timeSign = '';
                    }
                    this[type].push(obj);
                } else if (item.type == 1) {
                    let obj = {};
                    if (item.factMap.after.includes(',')) {
                        let sta = item.factMap.after.indexOf('[');
                        let mid = item.factMap.after.indexOf(',');
                        let end = item.factMap.after.indexOf(']');
                        obj.afterType = [];
                        obj.timeSign = 'range';
                        obj.afterType.push(this.strToTime(item.factMap.after.substring(sta + 1, mid)));
                        obj.afterType.push(this.strToTime(item.factMap.after.substring(mid + 1, end)));
                        obj.afterValue = item.factMap.after.trim().split(' ')[1];
                    } else if (!item.factMap.after.includes(',') && item.factMap.after !== '') {
                        let sta = item.factMap.after.indexOf('[');
                        let end = item.factMap.after.indexOf(']');
                        obj.afterType = this.strToTime(item.factMap.after.substring(sta + 1, end));
                        obj.timeSign = 'fixed';
                        obj.afterValue = item.factMap.after.trim().split(' ')[1];
                    } else {
                        obj.afterType = '';
                        obj.afterValue = '';
                        obj.timeSign = '';
                    }
                    this[type].push(obj);
                }
            })
        },
        
        // 滑动窗口时间转换
        timeToStr (time, show) {
            // console.log(time)
            if (time.includes('-')) {
                time = time.replace('-', 'h');
                time = time.replace('-', 'm');
                time = time + 's';
                return time;
            } else {
                return time;
            }
        },
        
        timeToShow (time) {
            let copy_time = JSON.parse(JSON.stringify(time));
            if (typeof copy_time === 'string') {
                if (copy_time.includes('-')) {
                    copy_time = copy_time.replace('-', 'h');
                    copy_time = copy_time.replace('-', 'm');
                    copy_time = copy_time + 's';
                    return copy_time;
                }
            } else if (typeof copy_time === 'object') {
                copy_time[0] = copy_time[0].replace('-', 'h');
                copy_time[0] = copy_time[0].replace('-', 'm');
                if (copy_time[0][copy_time[0].length - 1] !== 's') {
                    copy_time[0] = copy_time[0] + 's';
                }
                copy_time[1] = copy_time[1].replace('-', 'h');
                copy_time[1] = copy_time[1].replace('-', 'm');
                if (copy_time[1][copy_time[1].length - 1] !== 's') {
                    copy_time[1] = copy_time[1] + 's';
                }
                return copy_time;
            }
        },
        
        strToTime (str) {
            str = str.replace('h', '-');
            str = str.replace('m', '-');
            str = str.replace('s', '');
            return str;
        },
        
    },
}


</script>

<style lang="scss" scoped>
.container {
    width: 100% !important;
    height: 100% !important;
    overflow-x:hidden!important;
    overflow-y:auto;
    //padding-top: 12px;
    box-sizing: border-box;
    min-width: 1100px;
}

.even-content {
    padding: 20px 20px 0px 40px !important;
    position: relative;
    border: 1px solid #4faffd;
    box-shadow: 0px 0px 14px #00b4ff inset;
    font-size: 14px;
    font-family: Microsoft YaHei;
    background-color: #111D2B;
    background-image: url("../../static/img/content_bg.png");
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: 180px;
    
}
.bg-area {
    margin-top: 0px !important;
    padding: 15px 0;
}
.bg-area:nth-child(odd){
    background-color: rgba(0, 192, 255, 0.2);
}
.bg-area:nth-child(even) {
    background: rgba(0, 240, 255, 0.2);
}
.even-content:before {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    width: 90px;
    height: 28px;
    background: url(../../static/img/dotBg.png) no-repeat;
}

.title-line {
    height: 30px;
    line-height: 30px;
    margin-bottom: 30px;
    margin-left: -20px;
    border-bottom: 1px solid rgba(28,215,250,0.2);
    
    .title-name {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        margin-left: 20px;
        display: inline-block;
        border-bottom: 1px solid #1cd7fa;
    }
}
.switch-wrapper{
    width:68px;
    height:30px;
    margin-top: 4px;
    position: relative;
    cursor: pointer;
}
.switch-wrapper>div:nth-child(1){
    width:68px;
    height:26px;
    background-color: #001a2c;
    box-shadow: inset 0px 0px 7px 0px #000000;
    border-radius: 14px;
    div{
        font-size: 14px;
        line-height: 26px;
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
    width: 26px;
    height: 26px;
    position: absolute;
    left:0;
    top:50%;
    margin-top: -14px;
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
        box-shadow: 0px 0px 10px 0px #9c5603;
        left: 0;
    }
    
    100% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 10px 0px #058fa9;
        left: 42px;
    }
}
@-weblit-keyframes moveone {
    0% {
        background-color: #fa941c;
        box-shadow: 0px 0px 10px 0px #9c5603;
        left: 0;
    }
    
    100% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 10px 0px #058fa9;
        left: 42px;
    }
}
@keyframes _moveone {
    0% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 10px 0px #058fa9;
        left: 42px;
    }
    
    100% {
        background-color: #fa941c;
        box-shadow: 0px 0px 10px 0px #9c5603;
        left: 0;;
    }
}
@-weblit-keyframes _moveone {
    0% {
        background-color: #1cd7fa;
        box-shadow: 0px 0px 10px 0px #058fa9;
        left: 42px;
    }
    
    100% {
        background-color: #fa941c;
        box-shadow: 0px 0px 10px 0px #9c5603;
        left: 0;;
    }
}

.addRuleBtn.el-button--primary {
    background-color: rgba(0,0,0,0);
    border-color: rgba(0,0,0,0);
    background-image: url(.././assets/img/XZWJ.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 9px 15px;
}

.list-tips {
    margin-bottom: 50px;
    margin-left: -22px;
}

.releaseBtn {
    position: absolute;
    top: 15px;
    right: 20px;
}


.ruleAttr.w300 {
    width: 300px;
    height: 34px;
}

.el-form>>>.el-input__inner {
    height: 30px;
}

.container>>>.el-input__inner,.inner-note>>>.el-input__inner, .container>>>.el-textarea__inner,.inner-note>>>.el-textarea__inner{
    background-color: transparent !important;
    border: 1px solid #1cd7fa;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
}

.handleArea {
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(28, 215, 250, 0.2);
}

#tab-first {
    width: 60px;
    height: 34px;
}

.showcase>>> .line-put .el-input__inner,.showcase_then >>>.el-input__inner {
    height: 26px;
}

.container>>>.el-input__inner:hover {
    border-color: #C0C4CC;
}

.showcase .el-input {
    width: 160px;
}

.bottom_3 .el-input,.bottom_4 .el-input,{
    width: 100px;
}

.bottom_3 .el-input >>> .el-input__inner, .bottom_4 .el-input >>> .el-input__inner,{
    height: 20px;
    line-height: 20px;
}

.addRuleBtn {
    margin-bottom: 20px;
}
.container>>>.el-tabs ,.container>>>.el-tabs .el-tab-pane {
    height: calc(100% - 20px);
}
/*使下拉不被隐藏*/
.container>>>.el-tabs .el-tabs__content #pane-first{
    height: calc(100%);
    padding-bottom: 200px;
}

.container>>>.el-tabs__item:hover {
    color: #1cd7fa;
}
.container>>> .el-tabs__item {
    color: #fff;
}
.showcase>>>.el-select {
    width: 120px;
}

.el-select-dropdown__item {
    padding-left: 14px;
    /*font-size: 12px;*/
    color: #fff;
}

.showThen .el-select-dropdown__item {
    font-size: 12px;
}


.el-input.is-disabled .el-input__inner {
    background-color: transparent !important;
    border: 1px solid #1cd7fa !important;
    color: #fff !important;
}

.el-select-dropdown__item:hover, .el-select-dropdown__item.hover{
    background-color: #043254;
}

.el-select-dropdown__item.selected {
    color: green;
}

.container>>>.el-radio__inner::after {
    /*display: none;*/
    background-color: red;
}

.el-tabs>>>.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(28, 215, 250, 0.2);
    z-index: 1;
}
.el-tabs >>> .el-tabs__item.is-active {
    border: none !important;
    box-shadow: none !important;
}
.container >>>.el-tabs__header {
    margin-bottom: 1px !important;
}

.container>>>.el-tabs__active-bar {
    background: #1cd7fa;
}

.container>>>.el-tabs__item.is-active {
    color: #1cd7fa;
    height: 34px;
    line-height: 34px;
}
.container>>>.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 30px;
}
.handleTile {
    margin-bottom: 20px;
    margin-top: 24px;
}

div.addRule {
    padding: 20px 30px;
    margin: 0 20px;
    background: #052136;
    border: 1px solid #1cd7fa;
}

/*下方展示区*/
.showcase,.showcase_then {
    color:#fff;
    width: 96%;
    min-height: 200px;
    margin: 5px 0 0 86px;
    box-sizing: border-box;
    padding: 10px 0;
    border-radius: 4px;
    font-size: 12px;
}

.showcase>li {
    padding-left: 20px;
}

.selectActive {
    color: #00b4ff;
}

.conditionName {
    /*border-bottom: 1px solid transparent;*/
    text-decoration: underline transparent;
}

.conditionName:hover {
    text-decoration: underline #fff;
    /*border-color: #FFF;*/
    cursor: pointer;
}

.container>>>.el-select,.container>>>.el-input.is-focus{
    border-color: #409EFF;
    background-color: transparent;
    color: #fff;
}

.showcase>li,.showcase_then>li {
    position: relative;
    line-height: 34px;
    display: inline-block;
    width: 50%;
    margin-bottom: 10px;
    /*margin-top: 0;*/
}

/*.showcase_then>li:after, .showcase>li:after {
    display: block;
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    width: 1px;
    height: 100%;
    top: 0;
    right: 70px;
}*/

.el-icon-circle-plus-outline.inner {
    position: absolute;
    right: 40px;
    top:50%;
    transform: translateY(-50%);
    z-index: 10;
}

.el-icon-circle-close {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
}


.container>>>.el-date-editor .el-range-input {
    background: transparent;
    color: #fff;
}

.container>>>.afterTimer.el-range-editor.el-input__inner {
    padding: 2px 10px;
    height: 30px;
    line-height: 30px;
}

.container>>>.el-date-editor .el-range-separator {
    width: 3px;
    height: 1px;
    background: #fff;
}
.showcase_then >>> .el-tag.el-tag--info {
    background-color: rgba(0,0,0,0)!important;
    border-color: #00E9FF!important;
    color: #fff!important;
}

.showcase_then >>> .el-tag.el-tag--info .el-tag__close {
    color: #00e9ff;
}

.showcase_then >>> .el-select .el-tag__close.el-icon-close {
    background-color: transparent;
}
// 处理input type = number的上下箭头
.showcase_then >>> input::-webkit-outer-spin-button,
.showcase_then >>> input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.showcase_then >>> input[type="number"]{
    -moz-appearance: textfield;
}

// 规则组
.select-box{
    width:100%;
    height:30px;
    position: relative;
}
.select-title{
    width:100%;
    height:100%;
    background: transparent;
    border: 1px solid #1cd7fa;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
    border-radius:0px;
    box-sizing: border-box;
}
.select-mask{
    width:100%;
    min-height:100px;
    max-height:300px;
    position: absolute;
    left:0;
    top:36px;
    z-index: 999;
    overflow-y: auto;
    border: 1px solid #1a5c92;
    box-shadow: 0px 0px 2px #389bf7 inset;
    color: #fff;
    border-radius:2px;
    background-color: rgb(4,33,54);
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
    background-color: transparent;
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

.inform-box {
    margin-bottom: 80px;
    
    >>> .el-form-item {
        margin-bottom: 10px;
    
        .el-checkbox__label {
            color: #fff;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #0af0f3;
        }
    }
    
}

.el-select > > > .el-tag {
    background-color: transparent;
    border-color: #1bd7fa;
    color: #1bd7fa;
}
.el-select >>>.el-tag__close.el-icon-close {
    background-color: transparent;
}
.el-select >>>.el-tag.el-tag--info .el-tag__close {
    color: #00e9ff;
}
.el-select >>>.el-select__tags {
    flex-wrap: inherit !important;
    overflow-x: auto !important;
}
.tab-wrapper>>>.el-button--primary {
    //font-size: 14px!important;
    padding: 7px 7px;
    width: 60px !important;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
    background-image: url(../assets/img/and_or.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.el-dropdown-menu.el-popper {
    width: 60px !important;
    .el-dropdown-menu__item {
        padding: 0!important;
        text-align: center;
        line-height: 30px;
    }
}
.my-codemirror {
    width:100%;padding:0;
    text-align:left;
    font-size: 14px;
}
.fold-arrow {
    position: absolute;
    width: 14px;
    height: 14px;
    left: -23px;
    top: 7px;
    font-size: 14px;
    z-index: 9;
    color: #fff;
    text-shadow: 0 0 5px #00d2ff;
}
.fold-arrow.is-show {
    transform: rotate(90deg);
    transform-origin: center center;
}
.fold-arrow-inner {
    position: absolute;
    width: 14px;
    height: 14px;
    left: 70px;
    top: 7px;
    font-size: 14px;
    z-index: 9;
    color: #fff;
    text-shadow: 0 0 5px #00d2ff;
}
.fold-arrow-inner.is-show {
    transform: rotate(90deg);
    transform-origin: center center;
}
.fold-arrow-bottom {
    position: absolute;
    text-shadow: 0px 0px 8px #00d2ff;
    width: 14px;
    height: 14px;
    left: 32px;
    top: 8px;
    font-size: 14px;
    z-index: 9;
    color: #fff;
}
.tree-title {
    /*margin-top: 20px;*/
    margin-left: 53px;
    white-space: nowrap;
}
/*.tree-title::before {
    content: "";
    height: calc(100% - 80px);
    width: 1px;
    position: absolute;
    left: 15px;
    top: 30px;
    border-width: 1px;
    border-left: 1px dashed #52627C;
}*/
.tree-title-accumulate::after {
    display: none !important;
}
.tree-title::after {
    content: "";
    width: 40px;
    height: 20px;
    position: absolute;
    left: -68px;
    top: 14px;
    border-width: 1px;
    border-top: 1px dashed #bfdbe6;
}

.box-title, .time-title {
    position: relative;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    border-radius: 0px;
    background-color: transparent;
    border: 1px solid #1cd7fa;
    -webkit-box-shadow: 0px 0px 7px #389bf7 inset;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
    font-size: 12px;
    padding: 0 10px 0 15px;
    overflow:hidden;
    margin-left: 10px;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.box-title {
    max-width: 612px !important;
    min-width: 200px !important;
}
.time-title {
    width: 160px !important;
    margin: 0 !important;
}
.time-title::before {
    content: "";
    height: 30px;
    width: 1px;
    position: absolute;
    left: -16px;
    top: 24px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}
.operate-btn {
    height: 30px;
    line-height: 30px;
    font-size: 0;
}
.operate-btn i,.inner-note i {
    font-size: 12px !important;
    color: #0af0f3;
    margin-right: 10px;
    cursor: pointer;
}
.tree-line-outer::before {
    content: "";
    height: 13px;
    width: 1px;
    position: absolute;
    left: -15px;
    top: 2px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}
.tree-line-vertical {
    position: relative;
}
.tree-line-vertical::before {
    content: "";
    height: calc(100% + 40px);
    width: 1px;
    position: absolute;
    left: -15px;
    top: -20px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}
.tree-line-outer::after {
    content: "";
    width: 40px;
    height: 20px;
    position: absolute;
    left: -14px;
    top: 14px;
    border-width: 1px;
    border-top: 1px dashed #bfdbe6;
}
.tree-line-count::before {
    content: "";
    height: 40px;
    width: 1px;
    position: absolute;
    left: 38px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed #bfdbe6;
}
.tree-line-count::after {
    content: "";
    width: 40px;
    height: 20px;
    position: absolute;
    left: 38px;
    top: 14px;
    border-width: 1px;
    border-top: 1px dashed #bfdbe6;
}
.container >>> .el-input__inner {
    border-radius: 0 !important;
}
.fields-title {
    height: 40px;
    margin-bottom: 10px;
    line-height: 50px;
    border-bottom: 1px solid rgba(28,215,250,.2);
    p {
        position: relative;
        font-size: 16px;
        margin-right: 15px;
        color: #fff;
        opacity: .5;
    }
    p.active {
        color: #1cd7fa;
        opacity: 1;
    }
    p.active::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        bottom: -1px;
        left: 0;
        background: #1cd7fa;
        opacity: 1;
        z-index: 9;
    }
    p:hover {
        cursor: pointer;
        color: #1cd7fa;
        opacity: 1;
    }
}
.container >>> .el-select-dropdown__list {
    max-height: 260px !important;
}
.container >>> .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: rgb(28, 215, 250);
    cursor: not-allowed;
    background-image: none;
    background-color: transparent;
    border-color: transparent;
}
.rulesForm >>>.el-input-group__append, .rulesForm >>>.el-input-group__prepend {
    background: transparent !important;
    border: 1px solid #1cd7fa;
    border-radius: 0;
    border-left: none;
    -webkit-box-shadow: 0px 0px 7px #389bf7 inset;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
}
.showcase_then >>> .showKey .el-input__suffix {
    display: none;
}
.container >>> .iconfont.icon-zhedie.fold-arrow {
    text-shadow: 0px 0px 8px #00d2ff;
}
.rulesForm >>> .el-textarea__inner {
    border-radius: 0 !important;
}
</style>
<style lang="scss">
.select-option {
    width: 100px;
    background:#0D4874 !important;
    border: none;
}
.el-input.is-disabled .el-input__inner {
    background-color: transparent !important;
    border: 1px solid #1cd7fa !important;
    color: #fff !important;
}
.cm-s-cobalt .CodeMirror-gutters {
    border-right: 1px solid rgba(28,215,250,0.2) !important;
}
.el-popover.popover-select{
    min-width: 80px;
    background: rgb(4, 33, 54)!important;
    border: 1px solid #1a5c92;
    padding:10px 0;
    top: 568px !important;

    .popover-list>div{
        height:30px;
        text-align: center;
        line-height: 30px;
        font-size:15px;
        color:#fff;
        cursor: pointer;
    }
    .popover-list>div:nth-child(2n){
        background-color: rgb(4, 33, 54);
    }
    .popover-list>div:hover{
        color:#01f7f6;
    }
}
.el-popover.popover-select2{
    position: absolute;
    background: rgb(4, 33, 54)!important;
    border: 1px solid #1cd7fa;
    padding:0 !important;
    -webkit-box-shadow: 0px 0px 7px #389bf7 inset;
    box-shadow: 0px 0px 7px #389bf7 inset;
}
.el-popper[x-placement^=bottom].popover-select .popper__arrow{
    border-bottom-color: #EBEEF5;
}
.el-popper[x-placement^=bottom].popover-select .popper__arrow::after{
    /*background: #043254;*/
    border-bottom-color: rgb(4,33,54);
}
.inner-note .el-textarea__inner {
    border: none !important;
    box-shadow: none !important;
    padding: 5px 10px !important;
}
.el-select-dropdown__list .el-select-dropdown__item, .el-select-dropdown__list .el-select-dropdown__item:hover{
    background: rgb(4,33,54) !important;
}
.clearfix:after{
    content: '.';
    position: relative;
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
.bigTable.innerTable.el-table::before {
    background: transparent;
}
/*.atooltip{
    border: 1px solid #1cd7fa !important;
    padding: 8px 10px;
    background: #042136 !important;
    border: 1px solid #1cd7fa;
    -webkit-box-shadow: 0px 0px 7px #389bf7 inset;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
}*/
</style>
