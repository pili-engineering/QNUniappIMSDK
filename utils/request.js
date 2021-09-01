const baseURL = 'https://im-test.qiniuapi.com'

export default function request(options) {
	const {
		url,
		method,
		loading = true,
		...rest
	} = options;
	return uni.request({
		url: baseURL + url,
		method: method.toUpperCase(),
		...rest
	}).then(response => {
		console.log('request response', response);
		if (response[1] && response[1].statusCode === 200) {
			return response[1].data;
		} else {
			return Promise.reject(response);
		}
	})
}
