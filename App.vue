<script>
	import * as QNIM from 'im/qnuniapp-im.umd.js';

	export default {
		globalData: {
			im: {},
			SDK_VERSION: QNIM.version
		},
		onLaunch: function() {
			this.initSDK();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			/**
			 * 初始化 IM SDK
			 */
			initSDK() {
				const im = QNIM.init({
					appid: 'cigzypnhoyno'
				});
				if (im) {
					this.globalData.im = im;
					this.addEventListenersOfIM();
				}
			},
			/**
			 * 设置 IM 事件监听
			 */
			addEventListenersOfIM() {
				const im = this.getIM();
				im.on({
					loginSuccess: this.loginSuccess,
					loginerror: this.loginFail
				});
			},
			/**
			 * 登录成功
			 */
			loginSuccess() {
				console.log('loginSuccess');
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1];
				if (currentPage.route === 'pages/login/login') {
					uni.navigateTo({
						url: '/pages/home/home',
					});
				}
			},

			/**
			 * 登录失败提示
			 * @param {*} error
			 */
			loginFail(error) {
				console.log('登录失败');
				uni.showModal({
					title: '登录失败提示',
					content: error
				});
			},
			/**
			 * 获取 IM 对象
			 */
			getIM() {
				return this.globalData.im;
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
