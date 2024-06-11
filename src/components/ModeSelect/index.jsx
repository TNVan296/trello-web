import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }}>
      <InputLabel id="label-select-dark-light-mode"
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
          '&.Mui-focused': {
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
          }
        }}>
          Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
            }
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
            }
          }
        }}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', fontWeight: 'bold', alignItems: 'center', gap: 1, color: 'secondary.900' }}>
            <LightModeIcon /> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', fontWeight: 'bold', alignItems: 'center', gap: 1, color: 'secondary.900' }}>
            <DarkModeOutlinedIcon /> Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', fontWeight: 'bold', alignItems: 'center', gap: 1, color: 'secondary.900' }}>
            <SettingsBrightnessIcon /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect