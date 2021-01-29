<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
	import '../../static/ueditor/ueditor.config.js'
  import '../../static/ueditor/ueditor.all.js'
  import '../../static/ueditor/lang/zh-cn/zh-cn.js'
  import '../../static/ueditor/jquery-2.2.3.min.js'
 export default {
    name: 'UE',
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    data () {
      return {
        editor: null
      }
    },
     destroyed() {
     	if(this.editor===null){
     		return;
     	}
      this.editor.destroy();
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", () =>{
		  UE.dom.domUtils.setStyles(this.editor.body, {
		  'color': '#fff','font-family' : "'Microsoft Yahei','Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif", 'font-size' : '14px'
		  });
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      getUEContentTxt() { // 获取纯文本内容方法
        return this.editor.getContentTxt()
      },
			setUEContent(val) { // 获取内容方法
				console.log(val);
			  return this.editor.setContent(val)
			},
			creatEditor() { // 获取内容方法
			  UE.getEditor(this.id, this.config);
			},
    },
   
  }
</script>