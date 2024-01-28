import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Message from './View.Global.Message'
import Loading from './View.Global.Loading'
import NavigationDrawer from './View.Navigation.Drawer'
import Page from './View.Page'

import Imitation from './utils.imitation'

function App() {
  return <ThemeProvider theme={createTheme(Imitation.state.theme)}>
    <Loading />
    <Message />
    <NavigationDrawer />
    <Page />
  </ThemeProvider>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state.theme)])