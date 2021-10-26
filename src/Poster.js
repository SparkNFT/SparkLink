import React, { useRef, useEffect } from 'react';
import bgImg from './imgs/poster.png'
import loading from './imgs/imgloading.png'
import QRCode from 'qrcode';




const Poster = (props) => {
  
  let {str,share, coverImg, coverHeight, coverWidth} = props;
  //coverImg = document.getElementById('cover')
  
  const splited = str.split(' ')
  let price = splited[0]
  let currency = splited[1]
  const imgRef = useRef(null)
  useEffect(() => {
    function draw(ctx,dataUrl){  
      
      let qrcode = new Image()
      qrcode.onload=function(){
        ctx.drawImage(qrcode, 307,331,73,73)
        coverImg.crossOrigin = 'anonymous'
        ctx.drawImage(coverImg, ...getImgPos(coverHeight, coverWidth))
        
      }
      qrcode.src = dataUrl

      let bg = new Image()

      bg.onload=function(){
        ctx.drawImage(bg, 0, 0,424,600)
      }
      bg.src = bgImg

      
      
      
      ctx.font = "18px serif";
      ctx.fillText(price, 122, 384)
      ctx.font = '12px serif'
      ctx.fillText(currency,210,382)
      
      ctx.strokeRect(30,50,364,260)
    }
    function getPixelRatio (context) {
      const backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    };
    function getImgPos(h,w) {
      console.log(h,w)
      const ratio = h/w
      const standardRatio = 260 /364
      if(ratio - standardRatio < 0.01 && ratio - standardRatio > -0.01){
        return [30,50,364,260]
      }else if(ratio > standardRatio){
        const preWidth = 260 * w/h
        const preX = 212 - (preWidth / 2)
        return [preX,50,preWidth,260]
      }else {
        const preHeight = 364 * ratio
        const preY = 180 - (preHeight / 2)
        return [30,preY,364,preHeight]
      }
    }

    QRCode.toDataURL(share,{ errorCorrectionLevel: 'H', quality:1, margin: 0 }).then((data) => {
      
      const canvas = document.createElement('canvas')
      canvas.width=424
      canvas.height=600
      const ctx = canvas.getContext('2d')
      const ratio = getPixelRatio(ctx);
      canvas.style.width = canvas.width + 'px';
      canvas.style.height = canvas.height + 'px';
      canvas.width = canvas.width * ratio;
      canvas.height = canvas.height * ratio;
      ctx.globalCompositeOperation = 'destination-over'
      draw(ctx,data)
      
      setTimeout(()=>{
        const dataURL = canvas.toDataURL('image/jpeg',1.0);
        const img = imgRef.current
        img.src=dataURL
      },700)
    })
})

  return (
    <img alt='poster' width='424' height='600' ref={imgRef}  src={loading} />
  )

}

export default Poster
