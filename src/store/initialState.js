const apiUrls = [
	'https://thawing-springs-53971.herokuapp.com',
	'https://secret-lowlands-62331.herokuapp.com',
	'https://calm-anchorage-82141.herokuapp.com',
	'http://localhost:3002'
];

export default () => ({
	nodes: {
		list: apiUrls.map((url, index) => {
			return { url, online: false, name: `Name ${index + 1}`, loading: false };
		}),
		blocks: apiUrls.map((url, index) => {
			return { url, data: [], name: `Name ${index + 1}`, loading: false, hasError: false };
		})
	}
});
