import "../styling_files/navbar.scss";
import {FaEnvelope, FaUser} from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, IconButton, Box
} from "@chakra-ui/react";

const navbar= ({ menuactive, setmenuactive }) => {
    return (
      //   <div className={"navbar " + (menuactive && "active")} id="navbar">
      //     {/* style={{color: "white"}} */}
      //     <div className="nav-items">
      <Box width='100%' height='70px' position='absolute' top='0' display='flex' alignItems='center' justifyContent='flex-end' paddingRight='2rem'>
        <Menu justifyContent='flex-end' height='fit-content'>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon="{<HamburgerIcon />}"
            variant="outline"
          />
          <MenuList>
            <MenuItem command="⌘T">New Tab</MenuItem>
            <MenuItem command="⌘N">New Window</MenuItem>
            <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
            <MenuItem command="⌘O">Open File...</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      //   <div className="burger" onClick={() => setmenuactive(!menuactive)}>
      // <span id="line1"></span>
      // <span id="line2"></span>
      // <span id="line3"></span>
      //   </div>
      //     </div>
      //   </div>
    );
}

export default navbar;
