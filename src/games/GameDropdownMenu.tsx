import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

type GameDropdownMenuProps = {
  gameId: number;
  deleteGame: (gameId: number) => void;
};

export const GameDropdownMenu: (
  props: GameDropdownMenuProps
) => JSX.Element = ({ gameId, deleteGame }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <ArrowDropDownRoundedIcon fontSize="large" />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => navigate(`/games/${gameId}`)}>
          <ListItemIcon>
            <PlayArrowRoundedIcon />
          </ListItemIcon>
          <ListItemText>Play</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => deleteGame(gameId)}>
          <ListItemIcon>
            <DeleteRoundedIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
