<template>
	<view class="container">
		<scroll-view :scroll-with-animation="true" :scroll-into-view="`message-${messageId}`" :scroll-y="true"
			class="chat-box">
			<view class="chat-message" :id="`message-${index}`" :key="index" v-for="(item, index) in messages">
				<view class="username">
					用户_{{
						item.content && 
						item.content.content && 
						item.content.content && 
						item.content.content.msgStr ? item.content.content.msgStr.senderId : ''
					}}:
				</view>
				<view class="text">
					{{
						item.content && 
						item.content.content && 
						item.content.content && 
						item.content.content.msgStr ? item.content.content.msgStr.msgContent : ''
					}}
				</view>
			</view>
		</scroll-view>
		<view class="chat-input">
			<input placeholder="请输入发送内容" class="chat-input--input" v-model="inputValue" />
			<button @click="sendMessage" class="chat-input--button" type="primary" size="mini">发送</button>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js';

	export default {
		data() {
			return {
				messages: [],
				inputValue: '',
				messageId: 0
			}
		},
		watch: {
			messages(newVal) {
				this.messageId = newVal.length - 1;
			}
		},
		methods: {
			/**
			 * 发送消息
			 */
			sendMessage() {
				const im = getApp().globalData.im;
				const cuid = im.userManage.getUid() + '';
				const message = {
					content: JSON.stringify({
						content: {
							action: 'pubChatText',
							msgStr: {
								senderId: cuid,
								senderName: '',
								msgContent: this.inputValue
							}
						}
					}),
					gid: this.imGroupId
				};
				im.sysManage.sendGroupMessage(message);
				this.inputValue = '';
			},
			/**
			 * 加入聊天室
			 */
			joinChatRoom() {
				const im = getApp().globalData.im;
				return request({
					url: '/v1/mock/group',
					method: 'post',
					data: {
						group_id: this.groupId
					}
				}).then(response => {
					this.imGroupId = response.data.im_group_id;
					im.chatroomManage.join(this.imGroupId);
				})
			},
			/**
			 * 设置 IM 监听
			 */
			setEventListeners() {
				const im = getApp().globalData.im;
				im.on({
					onGroupMessage: this.onGroupMessage
				});
			},
			/**
			 * 监听消息
			 * @param {Object} message
			 */
			onGroupMessage(message) {
				console.log('message', message)
				const content = JSON.parse(message.content || '{}');
				this.messages.push({
					...message,
					content
				})
			},
		},
		onLoad(options) {
			this.groupId = options.groupId;
			this.joinChatRoom().finally(() => {
				const im = getApp().globalData.im;
				if (this.imGroupId) {
					im.sysManage.requireHistoryMessage(this.imGroupId, 0, 20);
				}
				this.setEventListeners();
			});
		},
		onUnload() {
			const im = getApp().globalData.im;
			im.off({
				onGroupMessage: this.onGroupMessage
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #e5e5e5;

		.chat {
			&-box {
				width: 100%;
				height: calc(100vh - 60rpx);
			}

			&-message {
				display: flex;
				width: fit-content;
				background-color: #44426a;
				padding: 10rpx;
				color: #fff;
				margin: 20rpx;

				.username {}

				.text {
					padding-left: 20rpx;
				}
			}

			&-input {
				display: flex;
				position: fixed;
				width: 100%;
				bottom: 0;

				&--input {
					background-color: #fff;
					flex: 1;
					height: 60rpx;
					padding: 0 20rpx;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
