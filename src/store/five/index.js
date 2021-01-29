
export default {
	state: {
		
		data:[]
	},
mutations:{
		upFiveData(state, {data}){
			return state.data = data;
		}
	},
	actions: {
		getFive(store, {data}){
			store.commit('upFiveData', {data});
		}
	},
	getters:{
		r5(state){
			var r = [
					{selectGroup:state.data[0].left.isSelected === true ? state.data[0].left : state.data[0].right}
				];
				
				
				
			//console.log(JSON.stringify(r));
			return r;
		}
	}
}