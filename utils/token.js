/**
 * 解析 roomToken
 * @param roomToken
 * @returns {any|{}|{}}
 */
export function parseRoomToken(roomToken) {
  if (roomToken) {
    const splitRoomToken = roomToken.split(':');
    const lastString = splitRoomToken[splitRoomToken.length - 1] || '';
    const decodedString = atob(lastString);
    return JSON.parse(decodedString) || {};
  }
  return {};
}