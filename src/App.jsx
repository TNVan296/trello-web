import './App.css'
import Button from '@mui/material/Button'
import AccessAlarm from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
// import useMediaQuery from '@mui/material/useMediaQuery'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

// CSR
function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon /> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon /> Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsBrightnessIcon /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function ModToggle() {
  const { mode, setMode } = useColorScheme()

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  // console.log('Dark Mode: ', prefersDarkMode)
  // console.log('Light Mode: ', prefersLightMode)

  return (
    <Button
      onClick={ () => {
        setMode( mode === 'light' ? 'dark' : 'light')
        // localStorage.setItem('trello-web-dark-light-mode')
        // localStorage.getItem('trello-web-dark-light-mode')
      }}
    >
      {mode === 'light' ? 'Turn Dark' : 'Turn Light'}
    </Button>
  )
}

function App() {

  return (
    <>
      <ModeSelect />
      <hr />
      <ModToggle />
      <hr />

      <Typography variant='body2' color='text.secondary'>This is a test of Typography</Typography>
      <Button variant="contained">Hello world</Button>

      <br />
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <AccessAlarm />
      <ThreeDRotation />
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
