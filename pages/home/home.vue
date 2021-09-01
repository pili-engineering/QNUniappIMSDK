<template>
	<view class="container">
		<view class="block-card">
			<input class="block-input" v-model="roomToken" placeholder="请输入roomToken" />
			<button type="primary" class="block-button" @click="joinChatroom">点击进入房间</button>
			<button type="primary" class="block-button" @click="generateRoomToken">点击随机生成 roomToken</button>
		</view>
	</view>
</template>

<script>
	import roomTokensJson from '../../config/roomTokens.json';
	import { parseRoomToken } from '../../utils/token.js'
	
	export default {
		data() {
			return {
				roomToken: ''
			}
		},
		methods: {
			/**
			 * 进入聊天室
			 */
			joinChatroom() {
				const { roomName } = parseRoomToken(this.roomToken);
				uni.navigateTo({
					url: `/pages/chatroom/chatroom?groupId=${roomName}`
				})
			},
			/**
			 * 随机生成 roomToken
			 */
			generateRoomToken() {
				const { result: roomTokens } = roomTokensJson;
				const index = Math.floor(Math.random() * roomTokens.length);
				const roomToken = roomTokens[index];
				this.roomToken = roomToken;
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
</style>
