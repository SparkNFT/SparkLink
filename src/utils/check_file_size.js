/**
 * @summary 判断某文件大小是否小于checkSize
 * @param {blob} file 目标文件
 * @param {int} checkSize  字节数
 * @returns {boolean} isUnderCheckSize   true if file size is under checkSize; otherwise false
 * @note: 100m = 104857600B
 */

const checkFileSize  = (file, checkSize) => {
	return file.size <= checkSize;
}
export default checkFileSize