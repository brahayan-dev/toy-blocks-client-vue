export const mutations = {
	checkNodeStatusStart(state, { url }) {
		let list = state.nodes.list;
		const index = state.nodes.list.findIndex((t) => t.url === url);
		if (index >= 0) {
			list = [
				...state.nodes.list.slice(0, index),
				{
					...state.nodes.list[index],
					loading: true
				},
				...state.nodes.list.slice(index + 1)
			];
		}
		state.nodes.list = list; 
	},
	checkNodeStatusSuccess(state, { el: { url }, name }) {
		let list = state.nodes.list;
		const index = state.nodes.list.findIndex((t) => t.url === url);
		if (index >= 0) {
			list = [
				...state.nodes.list.slice(0, index),
				{
					...state.nodes.list[index],
					name: name,
					online: true,
					loading: false
				},
				...state.nodes.list.slice(index + 1)
			];
		}

		state.nodes.list = list; 
	},
	checkNodeStatusFailure(state, { url }) {
		let list = state.nodes.list;
		const index = state.nodes.list.findIndex((t) => t.url === url);
		if (index >= 0) {
			list = [
				...state.nodes.list.slice(0, index),
				{
					...state.nodes.list[index],
					online: false,
					loading: false
				},
				...state.nodes.list.slice(index + 1)
			];
		}

		state.nodes.list = list; 
	},
	checkNodeBlocksStart(state, { url }) {
		const blocks = state.nodes.blocks.map((item) => {
			if (item.url === url) {
				return { ...item, loading: true };
			}

			return item;
		});

		state.nodes.blocks = blocks;
	},
	checkNodeBlocksSuccess(state, payload) {
		const blocks = state.nodes.blocks.map((item) => {
			if (item.url === payload.el.url) {
				return { ...item, loading: false, hasError: false, data: payload.data };
			}

			return item;
		});

		state.nodes.blocks = blocks;
	},
	checkNodeBlocksFailure(state, { url }) {
		const blocks = state.nodes.blocks.map((item) => {
			if (item.url === url) {
				return { ...item, hasError: true, loading: false };
			}

			return item;
		});

		state.nodes.blocks = blocks;
	}
};
