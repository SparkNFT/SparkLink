import React, { useRef, useEffect } from 'react';
import bgImg from './imgs/poster.png'
import QRCode from 'qrcode';

const Poster = (props) => {
  
  let {str,share} = props
  const splited = str.split(' ')
  let price = splited[0]
  let currency = splited[1]
  const imgRef = useRef(null)
  useEffect(() => {
    function draw(ctx,dataUrl){  
      
      let qrcode = new Image()
      qrcode.onload=function(){
        ctx.drawImage(qrcode, 340,441,100,100)
      }
      qrcode.src = dataUrl

      let bg = new Image()

      bg.onload=function(){
        ctx.drawImage(bg, 0, 0,480,800)
      }
      bg.src = bgImg

      ctx.font = "14px serif";
      ctx.fillText(price, 150, 512)
      ctx.fillText(currency,240,512)
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
    QRCode.toDataURL(share).then((data) => {
      
      const canvas = document.createElement('canvas')
      canvas.width=480
      canvas.height=800
      const ctx = canvas.getContext('2d')
      var ratio = getPixelRatio(ctx);
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
      },1000)
    })
},[currency, share, price])

  return (
    <div>
      <img ref={imgRef}  src='' />
    </div>
  )

}

export default Poster
