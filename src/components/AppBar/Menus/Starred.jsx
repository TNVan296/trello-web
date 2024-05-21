import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// menu item Workspace
function Starred() {
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
          id="basic-button-starred"
          aria-controls={open ? 'basic-menu-starred' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Starred
        </Button>
        <Menu
          id="basic-menu-starred"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button-starred'
          }}>
          <MenuItem onClick={handleClose}>Star important boards to access them quickly and easily.</MenuItem>
        </Menu>
      </Box>
    </div>
  )
}

export default Starred