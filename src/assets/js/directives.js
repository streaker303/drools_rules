import Vuex from '../../store/index.js'

const value = {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el) {
		let innerHTML = el.innerHTML;
		if(el.dataset.placeholder != innerHTML) {
			el.style.color = '#333333';
		} else {
			el.style.color = '#999999';
		}
	},
	componentUpdated: function(el) {
		// 聚焦元素
		let innerHTML = el.innerHTML;
		if(el.dataset.placeholder != innerHTML) {
			el.style.color = '#333333';
		} else {
			el.style.color = '#999999';
		}
	},
}

const drag = {
	bind: function(el) {
		let odiv = el; //获取当前元素
		odiv.onmousedown = (e) => {
			//算出鼠标相对元素的位置
			let disX = e.clientX - odiv.offsetLeft;
			let disY = e.clientY - odiv.offsetTop;

			document.onmousemove = (e) => {
				//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
				let left = e.clientX - disX;
				let top = e.clientY - disY;

				//绑定元素位置到positionX和positionY上面
				odiv.positionX = top;
				odiv.positionY = left;

				//移动当前元素
				odiv.style.left = left + 'px';
				odiv.style.top = top + 'px';
			};
			document.onmouseup = (e) => {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	}
}
const dialogDrag = {
	bind:function(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'
 
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
 
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
 
      // 获取到的值带px 正则匹配替换
      let styL, styT
 
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
 
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
 
        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`
 
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }
 
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}

export default {
	value,
	drag,
	dialogDrag
}