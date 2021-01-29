import app from '../../public.js'
export default {
	state: {
		
		data:[]
	},
mutations:{
		upThirdData(state, {data}){
			return state.data = data;
		}
	},
	actions: {
		getThird(store, {data}){
			store.commit('upThirdData', {data});
		}
	},
	getters:{
		r3(state){
			var r = [
					{selectGroup:state.data[0].left.isSelected === true ? state.data[0].left : state.data[0].right},
					{selectGroup:state.data[1].left.isSelected === true ? state.data[1].left : state.data[1].right},
					{selectGroup:state.data[2].left.isSelected === true ? state.data[2].left : state.data[2].right},
					{selectGroup:state.data[3].left.isSelected === true ? state.data[3].left : state.data[3].right}
				];
				
			//console.log(JSON.stringify(r));
			return r;
		}
	}
}