//判断当前设备是否为移动设备
var isMobile;
let userAgent = navigator.userAgent.toLowerCase();
if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(userAgent)) {
	isMobile = true;
} else {
	isMobile = false;
}
export default isMobile;
