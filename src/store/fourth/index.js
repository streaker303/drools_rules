
export default {
	state: {
		
		data:[]
	},
mutations:{
		upFourthData(state, {data}){
			return state.data = data;
		}
	},
	actions: {
		getFourth(store, {data}){
			store.commit('upFourthData', {data});
		}
	},
	getters:{
		r4(state){
			var r = [
					{selectGroup:state.data[0].left.isSelected === true ? state.data[0].left : state.data[0].right},
					{selectGroup:state.data[1].left.isSelected === true ? state.data[1].left : state.data[1].right}
				];
				
				
			//console.log(JSON.stringify(r));
			return r;
		}
	}
}