import React, { Component } from 'react'



const MaskLayer = (props) => {
  const styles = {
    modal: {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  }
  return (
    <div
      onClick={
        e => {
          console.log('click')
          if(e.target.className === 'MaskLayer'){
            props.onClose()
          }
        }
      }
      className='MaskLayer'
      style = {styles.modal}
    >
      {props.children}
    </div>
  )
}

export default MaskLayer
