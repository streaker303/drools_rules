import app from '../../public.js'
export default {
	state: {
		
		data:[]
	},
mutations:{
		upSecondData(state, {data}){
			return state.data = data;
		}
	},
	actions: {
		getSecond(store, {data}){
			store.commit('upSecondData', {data});
		}
	},
	getters:{
		r2(state){
			var r = [
					{selectGroup:state.data[0].left.isSelected === true ? state.data[0].left : state.data[0].right},
					{selectGroup:state.data[1].left.isSelected === true ? state.data[1].left : state.data[1].right},
					{selectGroup:state.data[2].left.isSelected === true ? state.data[2].left : state.data[2].right},
					{selectGroup:state.data[3].left.isSelected === true ? state.data[3].left : state.data[3].right},
					{selectGroup:state.data[4].left.isSelected === true ? state.data[4].left : state.data[4].right},
					{selectGroup:state.data[5].left.isSelected === true ? state.data[5].left : state.data[5].right},
					{selectGroup:state.data[6].left.isSelected === true ? state.data[6].left : state.data[6].right},
					{selectGroup:state.data[7].left.isSelected === true ? state.data[7].left : state.data[7].right}
				];
				
				return r;
				
			//console.log(JSON.stringify(r));
			
		}
	}
}