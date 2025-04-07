import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  Fade,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ColorModeContext } from '../../theme/ThemeContext';

const Layout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleCloseProfileMenu();
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleOpenProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuAnchor(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { text: 'Home', path: '/', icon: <HomeIcon />, auth: false },
    { text: 'Favorites', path: '/favorites', icon: <FavoriteIcon />, auth: true },
    { text: 'Add Recipe', path: '/new-recipe', icon: <AddIcon />, auth: true },
  ];

  const filteredNavItems = navItems.filter(item => !item.auth || isAuthenticated);

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
        <Avatar 
          sx={{ 
            width: 64, 
            height: 64, 
            mb: 1,
            bgcolor: theme.palette.primary.main 
          }}
        >
          {isAuthenticated && user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
        </Avatar>
        <Typography variant="h6">
          <Box component="span" sx={{ color: '#ff6b6b' }}>Recipe</Box>
          <Box component="span" sx={{ color: '#4ecdc4' }}> Platform</Box>
        </Typography>
      </Box>
      <Divider />
      <List>
        {filteredNavItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            sx={{
              bgcolor: isActive(item.path) ? `${theme.palette.primary.main}20` : 'transparent',
              '&:hover': {
                bgcolor: isActive(item.path) 
                  ? `${theme.palette.primary.main}30` 
                  : `${theme.palette.primary.main}10`,
              },
              borderRight: isActive(item.path) ? `4px solid ${theme.palette.primary.main}` : 'none',
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? theme.palette.primary.main : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/signup">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={1}
        sx={{ 
          backdropFilter: 'blur(8px)',
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography 
              variant="h6" 
              component={Link} 
              to="/"
              sx={{ 
                textDecoration: 'none', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  opacity: 0.85,
                }
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  bgcolor: '#ff6b6b', 
                  color: 'white',
                  px: 1, 
                  py: 0.5, 
                  borderRadius: 1,
                  mr: 1,
                  display: 'inline-block',
                  transform: 'rotate(-3deg)',
                }}
              >
                Recipe
              </Box>
              <Box component="span" sx={{ color: '#4ecdc4' }}>
                Platform
              </Box>
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', ml: 2 }}>
                {filteredNavItems.map((item) => (
                  <Button 
                    key={item.text}
                    component={Link} 
                    to={item.path}
                    sx={{
                      mx: 0.5,
                      color: 'text.primary',
                      borderBottom: isActive(item.path) ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                      borderRadius: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        opacity: 0.8,
                        borderBottom: `3px solid ${theme.palette.primary.light}`,
                      },
                      textTransform: 'none',
                      fontWeight: isActive(item.path) ? 700 : 400,
                    }}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Toggle dark mode">
              <IconButton 
                onClick={colorMode.toggleColorMode}
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'rotate(30deg)',
                  }
                }}
              >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            
            {isAuthenticated && (
              <Tooltip title="Notifications">
                <IconButton>
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {!isMobile && (
              <>
                {isAuthenticated ? (
                  <>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleOpenProfileMenu}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={Boolean(profileMenuAnchor) ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(profileMenuAnchor) ? 'true' : undefined}
                      >
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: theme.palette.primary.main,
                            border: '2px solid',
                            borderColor: 'background.paper',
                          }}
                        >
                          {user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={profileMenuAnchor}
                      id="account-menu"
                      open={Boolean(profileMenuAnchor)}
                      onClose={handleCloseProfileMenu}
                      onClick={handleCloseProfileMenu}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem component={Link} to="/profile">
                        <Avatar /> Profile
                      </MenuItem>
                      <MenuItem component={Link} to="/my-recipes">
                        <ListItemIcon>
                          <MenuIcon fontSize="small" />
                        </ListItemIcon>
                        My Recipes
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box>
                    <Button 
                      color="primary" 
                      component={Link} 
                      to="/login"
                      sx={{ 
                        mx: 0.5,
                        textTransform: 'none',
                      }}
                      startIcon={<LoginIcon />}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      component={Link} 
                      to="/signup"
                      sx={{ 
                        ml: 0.5,
                        textTransform: 'none',
                        px: 2,
                        boxShadow: 2,
                        '&:hover': {
                          boxShadow: 4,
                        }
                      }}
                      startIcon={<PersonAddIcon />}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          p: 3, 
          flexGrow: 1,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to bottom, rgba(20, 20, 20, 0.8), rgba(10, 10, 10, 0.9))'
            : 'linear-gradient(to bottom, rgba(250, 250, 250, 0.8), rgba(245, 245, 245, 0.9))',
        }}
      >
        <Fade in={true} timeout={500}>
          <Container maxWidth="lg">
            {children}
          </Container>
        </Fade>
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          mt: 'auto',
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(10, 10, 10, 0.9)' 
            : 'rgba(250, 250, 250, 0.9)',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} 
              <Box component="span" sx={{ color: '#ff6b6b' }}> Recipe</Box>
              <Box component="span" sx={{ color: '#4ecdc4' }}> Platform</Box>. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button size="small" color="inherit">Privacy</Button>
              <Button size="small" color="inherit">Terms</Button>
              <Button size="small" color="inherit">Contact</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;