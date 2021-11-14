import React, { useRef } from 'react';
import zhBg from '../imgs/poster_zh.png'
import enBg from '../imgs/poster_en.png'
import loading from '../imgs/imgloading.png';
import matic from '../imgs/matic.png';
import error from '../imgs/error.png';
import list from '../imgs/assets/info.json';
import QRCode from 'qrcode';
import Button from '@material-ui/core/Button'
import i18next from 'i18next'


const tp = require('tp-js-sdk')
const bgPos = [0, 0, 4689, 7363]
const qrPos = [3590, 6350, 710, 710]


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
	cvs.width = 4689;
	cvs.height = 7363;
	const ctx = cvs.getContext('2d');
	//const ratio = getPixelRatio(ctx);

	return [cvs, ctx]
}

const getImgPos = (h, w) => {
	console.log(h, w);
	const ratio = h / w;
	const standardRatio = 2930 / 4289;
	if (ratio - standardRatio < 0.01 && ratio - standardRatio > -0.01) {
		return [200, 1200, 4289, 2930]
	} else if (ratio > standardRatio) {
		const preWidth = (2930 * w) / h;
		const preX = 2344.5 - preWidth / 2;
		return [preX, 1200, preWidth, 2930]
	} else {
		const preHeight = 4289 * ratio;
		const preY = 1200+1465 - preHeight / 2;
		return [200, preY, 4289, preHeight]

	}
}

/* const getTxtPos = n => {
	console.log(n)
	if(n.length <=16){
		return [n,2344.5-100 * n.length / 2,4500]
	}else{
		n=n.substr(0,16)
		return [n,2344.5 - 1000,4500]
	}
} */


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
	const { str, addr, share, coverImg, env, name } = props;
	console.log(name.length)
	let tokenUrl = 'https://raw.githubusercontent.com/TP-Lab/tokens/master/bsc/' + addr + '/logo.png'
	if(addr === '0x0000000000000000000000000000000000000000'){
		tokenUrl = matic
	} else if(list.indexOf(addr) !== -1){
		tokenUrl = require(`../imgs/assets/${addr}/logo.png`).default
		console.log(matic);
	}
	let bgImg
	const lng = i18next.language
	if( lng === 'zh'){
		bgImg = zhBg	
	}else {
		bgImg = enBg
	}
	
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
			circleImg(ctx,res[3],3600,5800,150)
			
			ctx.fillStyle = '#0043a5'
			ctx.font = 'bold 260px Mada-Bold';
			ctx.fillText(str, 450, 6050);

			//const txtPos = getTxtPos('测试测试测试测试测试')
			ctx.fillStyle = 'black'
			ctx.font = 'bold 200px Mada-Bold';
			ctx.textAlign = 'center'
			ctx.fillText(name.substr(0,10),2344.5,4500)
			/* 
			ctx.font = '100px Mada-Bold';
			ctx.fillText(currency, 210, 382);
			*/
			ctx.strokeStyle='#ffffff'
			ctx.lineWidth = 2;
			ctx.strokeRect(200, 1200, 4289, 2930);
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
	//			ctx.strokeRect(200, 1200, 4289, 2930);
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
	

	const save = () => {
		const url = imgRef.current.src
		console.log(url)
		const a = document.createElement('a')
		const e = new MouseEvent('click')
		a.download = 'poster.png'
		a.href = url
		a.dispatchEvent(e)
		if(env === 'TokenPocket'){
			tp.saveImage(url)
		}
	}

	return (
		<div>
			<img alt="poster" width="469" height="736" ref={imgRef} src={loading} />
			<div style={{display: 'flex', width: '100%',marginTop: 50}}>
				<Button variant="contained"
					style={{
						width: 100,
						height: 40,
						margin: '0 auto',
						backgroundColor: '#FF7744',
						color:'#FFFFFF',
						borderColor: '#FF774A',
						borderWidth: 2,
						borderStyle:'solid',
						borderRadius: '100vw'
					}}
					onClick={save} >
					Save
				</Button>
			</div>
		</div>
	);
};

export default Poster;