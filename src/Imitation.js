import { withBindComponentPure, useBindComponentPure } from 'imitation-imm'

import ImitationGlobal from './Imitation.Global'
import ImitationPageCanvas from './Imitation.Page.Canvas'
import ImitationPageLibrary from './Imitation.Page.Library'

if (window.innerWidth >= 1200) {
  ImitationGlobal.state.store.navigation.mode = 0
  ImitationPageCanvas.state.store.navigation.open = true
  ImitationPageLibrary.state.store.navigation.open = true
}

if (window.innerWidth < 1200) {
  ImitationGlobal.state.store.navigation.mode = 1
  ImitationPageCanvas.state.store.navigation.open = false
  ImitationPageLibrary.state.store.navigation.open = false
}

export { ImitationGlobal, ImitationPageCanvas, ImitationPageLibrary }
export { withBindComponentPure, useBindComponentPure }