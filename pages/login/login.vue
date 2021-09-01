<template>
	<view class="container">
		<view class="block-card">
			<input class="block-input" v-model="username" placeholder="请输入用户名" />
			<input class="block-input" v-model="password" placeholder="请输入用户密码" />
			<button class="block-button" @click="login" type="primary">登录</button>
			<button class="block-button" @click="register" type="primary">注册</button>
			<view class="text-center">SDK_VERSION: {{SDK_VERSION}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				SDK_VERSION: getApp().globalData.SDK_VERSION
			}
		},
		methods: {
			/**
			 * 登录
			 */
			login() {
				const im = getApp().globalData.im;
				im.login({
					name: this.username,
					password: this.password
				});
			},
			/**
			 * 注册
			 */
			register() {
				console.log("注册", this.username, this.password);
				const im = getApp().globalData.im;
				im.rosterManage.asyncRegester({
						username: this.username,
						password: this.password
					})
					.then(response => {
						uni.showModal({
							title: '注册成功提示',
							content: '注册成功~'
						});
						console.log('im.rosterManage.asyncRegester', response);
					})
					.catch(error => {
						uni.showModal({
							title: '注册失败提示',
							content: JSON.stringify(error)
						});
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin fixedCenterCenter {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.block {
		margin: 20rpx;

		&-card {
			width: 80%;
			@include fixedCenterCenter;
		}

		&-input {
			width: calc(100% - 30rpx);
			display: block;
			margin: 20rpx 0;
			border: 1rpx solid #d9d9d9;
			padding: 20rpx 10rpx;
			font-size: 24rpx;
			line-height: 24rpx;
		}

		&-button {
			display: block;
			height: 60rpx;
			font-size: 20rpx;
			margin: 20rpx 0;
			width: 100%;
		}
	}
	
	.text-center {
		text-align: center;
	}
</style>
