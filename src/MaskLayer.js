import React, { Component } from 'react'



const MaskLayer = (props) => {
  const styles = {
    modal: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
      margin: '0 auto'
    }
  }
  return (
    <div
      onClick={
        e => {
          if(e.target.className === 'MaskLayer'){
            props.onClose()
          }
        }
      }
      className='MaskLayer'
      style = {styles.modal}
    >
      <div style={styles.content}>{props.children}</div>
    </div>
  )
}

export default MaskLayer
