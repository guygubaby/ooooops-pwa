import {fabric} from 'fabric'
import {debounce} from 'lodash'
import dayjs from 'dayjs'

const imageUrl = 'https://i.loli.net/2019/11/04/qzljxGEtiyVIOLH.png'


const canvas  = new fabric.StaticCanvas('canvas')
// const canvas  = new fabric.Canvas('canvas')


const init = () => {
  new fabric.Image.fromURL(imageUrl,fabricimg=>{
    const {width,height} = fabricimg
    canvas.setDimensions({
      width,
      height
    })
    canvas.setBackgroundImage(fabricimg,canvas.renderAll.bind(canvas))
    drawText()
  })
}

const drawText = (words='changed text') => {
  const text = new fabric.Text(words,{
    left:10,
    top:30,
    fill:'black'
  })
  canvas.add(text)

  const updateText = ()=>{
    text.set('text',dayjs().format('MM-DD HH:mm:ss'))
    canvas.renderAll()
    requestAnimationFrame(updateText)
  }
  requestAnimationFrame(updateText)
}


const resizeListner = debounce(function(){
  const [originWidth,originHeight,rato] = [478,375,375/478]
  const {clientWidth:width} = document.documentElement
  let truelyWidth = width/3
  let zoom = truelyWidth/originWidth
  if(truelyWidth>478){
    zoom = 1
    truelyWidth = originWidth
  }
  canvas.setWidth(truelyWidth)
  canvas.setHeight(truelyWidth*rato)
  canvas.setZoom(zoom)
},200)


window.addEventListener('resize',resizeListner)

init()
