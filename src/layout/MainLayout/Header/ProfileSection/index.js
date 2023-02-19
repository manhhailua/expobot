import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { signOut } from "firebase/auth";
import { auth } from "utils/firebase";
import AccountSettingsDialog from "./AccountSettingsDialog";

const ProfileSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleCloseModal = (event) => {
    setOpenDialog(false);
  };

  const handleSaveModal = (event) => {
    handleCloseModal(event);
  };

  const handleListItemClick = (event, index, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClickAccountSettings = (event) => {
    setOpenDialog(true);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          "&[aria-controls=\"menu-list-grow\"], &:hover": {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light
            }
          },
          "& .MuiChip-label": {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={user?.firebaseProfile?.photoURL}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer"
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Hello,</Typography>
                        <Typography variant="h4">{user?.firebaseProfile?.displayName}</Typography>
                      </Stack>
                      <Typography variant="subtitle2">
                        {user?.firebaseProfile?.email}
                      </Typography>
                    </Stack>
                  </Box>
                  <Divider />
                  <PerfectScrollbar style={{ height: "100%", maxHeight: "calc(100vh - 250px)", overflowX: "hidden" }}>
                    <Box sx={{ p: 2 }}>
                      {/*<UpgradePlanCard />*/}
                      {/*<Divider />*/}
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%"
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5
                          }
                        }}
                      >
                        <ListItemButton
                          sx={{ borderRadius: `${customization?.borderRadius}px` }}
                          selected={selectedIndex === 0}
                          onClick={handleClickAccountSettings}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization?.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      <AccountSettingsDialog
        open={openDialog}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
      />
    </>
  );
};

export default ProfileSection;
