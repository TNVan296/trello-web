import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// menu item Workspace
function Workspaces() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  // nếu có giá trị thì anchorEl thì
  // mặc định open = false
  const open = Boolean(anchorEl)
  // console.log(open)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        id="basic-button-workspaces"
        aria-controls={open ? 'basic-menu-workspaces' : undefined}
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
        Workspaces
      </Button>
      <Menu
        id="basic-menu-workspaces"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-workspaces'
        }}>
        <MenuItem onClick={handleClose}>Current Workspace</MenuItem>
        <MenuItem onClick={handleClose}>Your Workspace</MenuItem>
      </Menu>
    </Box>
  )
}

export default Workspaces