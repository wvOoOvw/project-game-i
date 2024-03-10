import React from 'react'

import Imitation from 'imitation-imm'

import { hash } from './utils.common'

import Paint from './View.Config.Paint'

import mockSource from './mock.source'
import mockCanvas from './mock.canvas.js'

const ImitationInstance = new Imitation()

ImitationInstance.state = { update: {}, store: {}, function: {}, memo: {} }

ImitationInstance.state.store = { canvas: {}, paint: {}, setting: {}, view: {} }

ImitationInstance.state.update.now = performance.now()

ImitationInstance.state.update.canvas = performance.now()

ImitationInstance.state.store.load = false

ImitationInstance.state.store.rect = undefined

ImitationInstance.state.store.drag = true

ImitationInstance.state.store.source = undefined

ImitationInstance.state.store.canvas.information = undefined

ImitationInstance.state.store.canvas.control = undefined

ImitationInstance.state.store.canvas.canvasRef = undefined

ImitationInstance.state.store.canvas.contextRef = undefined

ImitationInstance.state.store.paint.information = undefined

ImitationInstance.state.store.paint.control = undefined

ImitationInstance.state.store.paint.setting = undefined

ImitationInstance.state.store.setting.open = false

ImitationInstance.state.store.view.translateX = 0

ImitationInstance.state.store.view.translateY = 0

ImitationInstance.state.store.view.scale = 1

ImitationInstance.state.store.view.scaleLayer = false

ImitationInstance.state.store.view.scaleLayerAll = false

ImitationInstance.state.store.view.translateLayer = false

ImitationInstance.state.store.view.translateLayerAll = false

ImitationInstance.state.function.update = () => {
  ImitationInstance.state.update.now = performance.now()
  ImitationInstance.dispatch()
}

ImitationInstance.state.function.onLoad = () => {
  ImitationInstance.state.store.load = true
  ImitationInstance.state.store.rect = undefined
  ImitationInstance.state.store.drag = true
  ImitationInstance.state.store.source = JSON.parse(JSON.stringify(mockSource[0]))
  ImitationInstance.state.store.canvas.information = localStorage.getItem('canvas') ? JSON.parse(localStorage.getItem('canvas')) : mockCanvas()
  ImitationInstance.state.store.canvas.control = ImitationInstance.state.store.canvas.information[0]._hash
  ImitationInstance.state.store.paint.information = Paint
  ImitationInstance.state.store.paint.control = ImitationInstance.state.store.paint.information[0]._hash
  ImitationInstance.state.store.paint.setting = JSON.parse(JSON.stringify(ImitationInstance.state.store.paint.information[0].settingDefault))
  ImitationInstance.state.store.setting.open = true

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onUnload = () => {
  ImitationInstance.state.store.load = false
  ImitationInstance.state.store.rect = undefined

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onClear = () => {
  localStorage.removeItem('canvas')
  ImitationInstance.state.function.onLoad()
}

ImitationInstance.state.function.onSave = () => {
  const r = []

  ImitationInstance.state.store.canvas.forEach(i => {
    const canvas = i

    const imageData = canvasFind.context.getImageData(0, 0, canvasFind.canvas.width, canvasFind.canvas.height)

    const pixelData = imageData.data

    var pixelArray = []

    pixelData.forEach((i, index) => {
      const arrayIndex = Math.floor(index / 4)

      const x = arrayIndex % canvasFind.canvas.width
      const y = Math.floor(arrayIndex / canvasFind.canvas.width)

      if (pixelArray[arrayIndex] === undefined) pixelArray[arrayIndex] = { x, y, color: [] }

      if (pixelArray[arrayIndex] !== undefined) pixelArray[arrayIndex].color.push(i)

      if (pixelArray[arrayIndex].color[3]) pixelArray[arrayIndex].color[3] = pixelArray[arrayIndex].color[3] / 255

      pixelArray[arrayIndex].w = 1
      pixelArray[arrayIndex].h = 1
    })

    pixelArray = pixelArray.filter(i => i.color[0] !== 0 || i.color[1] !== 0 || i.color[2] !== 0 || i.color[3] !== 0)

    r.push({ ...i, pixel: pixelArray })
  })

  // localStorage.setItem('canvas', JSON.stringify(r))

  navigator.clipboard.writeText(JSON.stringify(pixelArray))
}

ImitationInstance.state.function.onCreateLayer = (content) => {
  const i = { _hash: hash(), translateX: 0, translateY: 0, scale: 0.5, pixel: [], ...content }

  ImitationInstance.state.store.canvas.push(i)

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onRemoveLayer = (_hash) => {
  if (ImitationInstance.state.store.canvas.length === 1) return

  ImitationInstance.state.store.canvas = ImitationInstance.state.store.canvas.filter(i => i._hash !== _hash)

  if (ImitationInstance.state.store.control.hash === _hash) ImitationInstance.state.store.control.hash = ImitationInstance.state.store.canvas[0]._hash

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onSwitchLayer = (content) => {
  if (ImitationInstance.state.store.control.hash === content.hash) return

  ImitationInstance.state.store.control._hash = hash()
  ImitationInstance.state.store.control.hash = content.hash

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onTranslateFix = () => {
  const max = [0, 0, 0, 0]

  ImitationInstance.state.store.canvas.forEach(i => {
    max[0] = Math.max(max[0], i.width / 2 - i.translateX)
    max[1] = Math.max(max[1], i.width / 2 + i.translateX)
    max[2] = Math.max(max[2], i.height / 2 - i.translateY)
    max[3] = Math.max(max[3], i.height / 2 + i.translateY)
  })

  ImitationInstance.state.store.canvas.forEach(i => {
    i.translateX = i.translateX + (max[0] - max[1]) / 2
    i.translateY = i.translateY + (max[2] - max[3]) / 2
  })

  ImitationInstance.state.function.update()
}

ImitationInstance.state.function.onSwitchPaint = (_hash) => {
  const find = ImitationInstance.state.store.paint.information.find(i => i._hash === _hash)
  ImitationInstance.state.store.paint.control = find._hash
  ImitationInstance.state.store.paint.setting = JSON.parse(JSON.stringify(find.settingDefault))
  ImitationInstance.state.function.update()
}

ImitationInstance.state.memo.canvasFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.canvas.information.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.canvas.information])

ImitationInstance.state.memo.canvasFindIndex = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.canvas.information.findIndex(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.canvas.information])

ImitationInstance.state.memo.paintFind = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.information.find(i => i._hash === _hash)
}, [...dep, _hash, ImitationInstance.state.store.paint.information])

ImitationInstance.state.memo.paintActionFindRun = (_hash, dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.information.find(i => i._hash === _hash).paintAction()
}, [...dep, _hash, ImitationInstance.state.store.paint.information])

ImitationInstance.state.memo.paintOriginFindMap = (dep = []) => React.useMemo(() => {
  return ImitationInstance.state.store.paint.information.reduce((t, i) => ({ ...t, [i._hash]: i.paintOrigin }), {})
}, [...dep, ImitationInstance.state.store.paint.information])

export default ImitationInstance