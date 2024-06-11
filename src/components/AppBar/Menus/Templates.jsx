import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// menu item Workspace
function Templates() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Box>
        <Button
          id="basic-button-templates"
          aria-controls={open ? 'basic-menu-templates' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
            '&:hover': {
              bgcolor: '#808e9b',
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
              borderRadius: 1.5
            }
          }}
        >
          Templates
        </Button>
        <Menu
          id="basic-menu-templates"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button-templates'
          }}>
          <MenuItem onClick={handleClose}>1-on-1 Meeting Agenda</MenuItem>
          <MenuItem onClick={handleClose}>Agile Board Template | Trello</MenuItem>
          <MenuItem onClick={handleClose}>Company Overview</MenuItem>
        </Menu>
      </Box>
    </div>
  )
}

export default Templates