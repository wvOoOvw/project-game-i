import { ImitationGlobal } from './Imitation'
import { rgba } from './utils.common'

const themeColor = (type, reverse = false) => {
  if (type === 'background') {
    return reverse ? ImitationGlobal.state.store.theme.palette.primary.main : ImitationGlobal.state.store.theme.palette.background.main
  }
  if (type === 'primary') {
    return reverse ? ImitationGlobal.state.store.theme.palette.background.main : ImitationGlobal.state.store.theme.palette.primary.main
  }
}

const TooltipSX = (reverse) => {
  return {
    PopperProps: {
      sx: {
        '& .MuiTooltip-tooltip':
          { background: themeColor('background', reverse), color: themeColor('primary', reverse) }
      }
    }
  }
}

const TextFieldSX = (reverse) => {
  return {
    sx: {
      '& input, & .MuiInputBase-multiline': { fontSize: '14px', padding: '12px' },
      // '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      // '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      // '& fieldset': { top: 0 },
      // '& fieldset legend': { display: 'none' },
      '& input': {
        color: themeColor('primary', reverse)
      },
      '& fieldset': {
        borderColor: rgba(themeColor('primary', reverse), 0.7),
      },
      '& .MuiInputBase-root:hover fieldset': {
        borderColor: themeColor('primary', reverse),
      }
    }
  }
}

const AutocompleteSX = (reverse) => {
  return {
    sx: {
      '& input': { fontSize: '14px' },
      '& .MuiOutlinedInput-root': { padding: '4.5px', paddingLeft: '8px' },
      '& label': { fontSize: '14px', lineHeight: 1, padding: 0, background: 'white' },
      '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      '& fieldset': { top: 0 },
      '& fieldset legend': { display: 'none' }
    },
    componentsProps: {
      popper: {
        sx: {
          '& .MuiAutocomplete-option': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
        }
      },
      paper: {
        sx: {
          '& .MuiAutocomplete-noOptions': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace', padding: '12px' }
        }
      }
    }
  }
}

const SelectSX = (reverse) => {
  return {
    sx: {
      '& .MuiSelect-select': { fontSize: '14px', padding: '10.5px 12px' },
      // '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
      // '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', marginTop: '2px', background: 'white' },
      // '& fieldset': { top: 0 },
      // '& fieldset legend': { display: 'none' },
      '& input, & .MuiSelect-select': {
        color: themeColor('primary', reverse)
      },
      '& fieldset': {
        borderColor: rgba(themeColor('primary', reverse), 0.7),
      },
      '& .MuiInputBase-root:hover fieldset': {
        borderColor: themeColor('primary', reverse),
      },
      '& svg': {
        fill: themeColor('primary', reverse)
      }
    },
    MenuProps: {
      sx: {
        '& .MuiMenuItem-root': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
      }
    }
  }
}

const DrawerSX = (reverse) => {
  return {
    sx: {
      '& .MuiDrawer-paper': {
        background: themeColor('background', reverse),
        boxShadow: `0px 8px 10px -5px ${rgba(themeColor('primary', reverse), 0.2)}, 0px 16px 24px 2px ${rgba(themeColor('primary', reverse), 0.14)}, 0px 6px 30px 5px ${rgba(themeColor('primary', reverse), 0.12)}`,
        color: themeColor('primary', reverse),
      },
    }
  }
}

const DialogSX = (reverse) => {
  return {
    sx: {
      '& .MuiDialog-root': {
        background: themeColor('background', reverse),
        boxShadow: `0px 11px 15px -7px ${rgba(themeColor('primary', reverse), 0.2)}, 0px 24px 38px 3px ${rgba(themeColor('primary', reverse), 0.14)}, 0px 9px 46px 8px ${rgba(themeColor('primary', reverse), 0.12)}`,
        color: themeColor('primary', reverse),
      },
      '& .MuiDialogContent-dividers': {
        borderColor: themeColor('primary', reverse),
      },
      '& .MuiDialogTitle-root': {
        fontSize: '16px'
      },
      '& .MuiDialogContent-root': {
        fontSize: '14px'
      }
    }
  }
}

const TabsSX = (reverse) => {
  return {
    sx: {
      '&.MuiTabs-root': {
        minHeight: 0,
      },
      '& .MuiTab-root': {
        minHeight: 0,
        fontSize: '14px',
        padding: '12px',
        color: rgba(themeColor('primary', reverse), 0.5),
      },
    }
  }
}

const DividerSX = (reverse) => {
  return {
    sx: {
      '&.MuiDivider-root': {
        borderColor: themeColor('primary', reverse)
      },
    }
  }
}

const SwitchSX = (reverse) => {
  return {
    sx: {
      '&.MuiSwitch-root .MuiSwitch-track': {
        backgroundColor: themeColor('primary', reverse),
        opacity: 0.2,
      },

      '&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
        backgroundColor: themeColor('primary', reverse),
        opacity: 0.5,
      },

      '&.MuiSwitch-root .MuiSwitch-thumb': {
        color: themeColor('primary', reverse),
      }
    }
  }
}

const AccordionSX = (reverse) => {
  return {
    sx: {
      '&.MuiAccordion-root': {
        background: themeColor('background', reverse),
        color: themeColor('primary', reverse),
        boxShadow: `0px 2px 1px -1px ${rgba(themeColor('primary', reverse), 0.2)}, 0px 1px 1px 0px ${rgba(themeColor('primary', reverse), 0.14)}, 0px 1px 3px 0px ${rgba(themeColor('primary', reverse), 0.12)}`,
        borderRadius: '4px',
        margin: '0px'
      }
    }
  }
}

const PaperSX = (reverse) => {
  return {
    sx: {
      '&.MuiPaper-root': {
        background: themeColor('background', reverse),
        boxShadow: `0px 2px 1px -1px ${rgba(themeColor('primary', reverse), 0.2)}, 0px 1px 1px 0px ${rgba(themeColor('primary', reverse), 0.14)}, 0px 1px 3px 0px ${rgba(themeColor('primary', reverse), 0.12)}`,
      }
    }
  }
}

export { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX, DrawerSX, DialogSX, TabsSX, DividerSX, SwitchSX, AccordionSX, PaperSX }