"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser, SignInButton } from "@clerk/nextjs";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
  ];

  const drawer = (
    <Box className="bg-black h-full text-white w-64">
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => setMobileOpen(false)}
          >
            <Link href={item.href} className="w-full">
              <ListItemText   primary={item.label} />
            </Link>
          </ListItem>
        ))}

        <ListItem button onClick={() => setMobileOpen(false)}>
          {isSignedIn ? (
            <Link href="/" className="w-full">
              <ListItemText primary={`Hey, ${user?.firstName || "User"}`} />
            </Link>
          ) : (
            <SignInButton mode="modal">
              <ListItemText primary="Login" className="cursor-pointer" />
            </SignInButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      className="bg-black! text-white! shadow-md border-b border-white"
    >
      <Toolbar className="flex justify-between items-center w-full">
        {/* Logo */}
        <Typography variant="h6" className="font-bold text-xl">
          <Link href="/">ECom Express</Link>
        </Typography>

        {/* Desktop Menu */}
        <div className="hidden md:flex ml-auto items-center space-x-6">
          {navItems.map((item) => (
            <Button
              key={item.label}
              color="inherit"
              className="capitalize hover:text-gray-300"
            >
              <Link href={item.href} className="normal-case">{item.label}</Link>
            </Button>
          ))}

          {/* User / Login Button */}
          {isSignedIn ? (
            <Button color="inherit" className="normal-case! hover:text-gray-300">
              <Link href="/">{`Hey, ${user?.firstName || "User"}`}</Link>
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button
                color="inherit"
                className="normal-case hover:text-gray-300"
              >
                Login
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{ paper: "!bg-black !text-white w-64" }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
