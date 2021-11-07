import React, { useRef } from 'react';
import bgImg from '../imgs/poster.png';
import loading from '../imgs/imgloading.png';
import matic from '../imgs/matic.png';
import error from '../imgs/error.png';
import list from '../imgs/assets/info.json';
import QRCode from 'qrcode';

const bgPos = [0, 0, 424, 600]
const qrPos = [307, 331, 73, 73]


const loadImage = url => {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => resolve(img);
		img.onerror = () => {
			const temp = new Image();
			temp.onload = () => resolve(temp);
			temp.src = error
		};
		img.src = url;
	});
};

const initCanvas = () => {
	const cvs = document.createElement('canvas');
	cvs.width = 424;
	cvs.height = 600;
	const ctx = cvs.getContext('2d');
	//const ratio = getPixelRatio(ctx);
	cvs.style.width = cvs.width + 'px';
	cvs.style.height = cvs.height + 'px';

	return [cvs, ctx]
}

const getImgPos = (h, w) => {
	console.log(h, w);
	const ratio = h / w;
	const standardRatio = 260 / 364;
	if (ratio - standardRatio < 0.01 && ratio - standardRatio > -0.01) {
		return [30, 50, 364, 260]
	} else if (ratio > standardRatio) {
		const preWidth = (260 * w) / h;
		const preX = 212 - preWidth / 2;
		return [preX, 50, preWidth, 260]
	} else {
		const preHeight = 364 * ratio;
		const preY = 180 - preHeight / 2;
		return [30, preY, 364, preHeight]

	}
}


const circleImg = (ctx,img,x,y,r) => {
	ctx.save();
	var d =2 * r;
	var cx = x + r;
	var cy = y + r;
	ctx.arc(cx, cy, r, 0, 2 * Math.PI);
	ctx.clip();
	ctx.drawImage(img, x, y, d, d);
	ctx.restore();
}



const Poster = (props) => {
	
	const [canvas, ctx] = initCanvas()
	const { str, addr, share, coverImg } = props;
	let tokenUrl = 'https://raw.githubusercontent.com/TP-Lab/tokens/master/bsc/' + addr + '/logo.png'
	if(addr === '0x0000000000000000000000000000000000000000'){
		tokenUrl = matic
	} else if(list.indexOf(addr) !== -1){
		
		tokenUrl = require(`../imgs/assets/${addr}/logo.png`).default
		console.log(matic);
	}

	const splited = str.split(' ');
	let price = splited[0];
	let currency = splited[1];
	const imgRef = useRef(null);
	QRCode.toDataURL(share, {
		errorCorrectionLevel: 'H',
		quality: 1,
		margin: 0
	}).then((data) => {
		const qrcode = loadImage(data)
		const bg = loadImage(bgImg)
		const cover = loadImage(coverImg)
		const token = loadImage(tokenUrl)
		Promise.all([bg, qrcode, cover, token]).then(res => {
			ctx.drawImage(res[0],...bgPos)
			ctx.drawImage(res[1],...qrPos)
			//计算封面图片位置
			const coverPos = getImgPos(res[2].height, res[2].width)
			console.log(res[2]);
			ctx.drawImage(res[2],...coverPos)
			circleImg(ctx,res[3],182,365,13)
			
			ctx.font = '18px Mada-Bold';
			ctx.fillText(price, 122, 384);
			ctx.font = '12px Mada-Bold';
			ctx.fillText(currency, 210, 382);
			ctx.strokeRect(30, 50, 364, 260);
			setTimeout(()=>{
				const dataURL = canvas.toDataURL('image/jpeg',1.0)
				
				const target = imgRef.current
				target.src = dataURL
			},700)
		})
	})



	//	useEffect(() => {
	//		function draw(ctx, dataUrl) {
	//			/* let qrcode = new Image();
	//			qrcode.onload = function () {
	//				ctx.drawImage(qrcode, 307, 331, 73, 73);
	//				coverImg.crossOrigin = 'anonymous';
	//				ctx.drawImage(coverImg, ...getImgPos(coverHeight, coverWidth));
	//			};
	//			qrcode.src = dataUrl; */
	//			//depict(ctx, {uri: dataUrl, x:307, y:331, sw: 73, sh:73})
	//			//depict(ctx, {uri: coverImg,})
	//			ctx.font = '18px serif';
	//			ctx.fillText(price, 122, 384);
	//			ctx.font = '12px serif';
	//			ctx.fillText(currency, 210, 382);
	//
	//			ctx.strokeRect(30, 50, 364, 260);
	//		}
	//
	//		QRCode.toDataURL(share, {
	//			errorCorrectionLevel: 'H',
	//			quality: 1,
	//			margin: 0
	//		}).then((data) => {
	//			
	//			draw(ctx, data);
	//
	//			setTimeout(() => {
	//				const dataURL = canvas.toDataURL('image/jpeg', 1.0);
	//				const img = imgRef.current;
	//				img.src = dataURL;
	//			}, 700);
	//		});
	//	});

	return (
		<img alt="poster" width="424" height="600" ref={imgRef} src={loading} />
	);
};

export default Poster;