"use client";
import {
  Container,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  ListItemIcon,
  //   ListItemIcon,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AccountCircleOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import { useApp } from "@/context/AppContext";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  useEffect(() => {
    const path = pathname;
    if (path.includes("/admin")) {
      setActiveRoute("admin");
    } else if (path.includes("/")) {
      setActiveRoute("user");
    }
  }, [pathname]);
  const t = useTranslations("HomePage");
  const activeLocale = useLocale();
  const { isOpen } = useApp();
  return (
    
    <Container
    component="div"
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          width: isOpen ? "250px" : 80,
          backgroundColor: "#fff",
          borderRight: "1px solid #e0e0e0",
          padding: 0,
          transition: "all 0.2s ease-out",
          overflowY: "auto",
          "@media (min-width: 600px)": {
            padding: "0px",
          },
        },
        (theme) => ({
          ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.secondary.main,
            borderRight: "1px solid #1c2126",
          }),
        }),
      ]}
    >
      <List
        component="nav"
        sx={[
          {
            width: isOpen ? "250px" : 80,
            "& .MuiListItemButton-root": {
              borderRadius: "10px",
              height: "40px",
            },
            "& .MuiListItemButton-root:hover": {
              backgroundColor: "primary.200",
              "& .MuiListItemText-root": {
                color: "primary.500",
              },
            },
            "& .MuiListItemButton-root.Mui-selected": {
              backgroundColor: "primary.500",
              "& .MuiListItemText-root": {
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: "primary.500",
                "& .MuiListItemText-root": {
                  color: "#fff",
                },
              },
            },
            padding: 0,
            marginTop: 2,
          },
          (theme) => ({
            ...theme.applyStyles("dark", {
              "& .MuiListItemButton-root": {
                color: "#fff",
                "&:hover": {
                  backgroundColor: "primary.200",
                },
                "&.Mui-selected": {
                  backgroundColor: "primary.500",
                  "&:hover": {
                    backgroundColor: "primary.500",
                  },
                },
              },
            }),
          }),
        ]}
      >
        <ListItem>
          <ListItemButton
            selected={activeRoute === "user"}
            onClick={() => router.push(`/${activeLocale}`)}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AccountCircleOutlined
                sx={{
                  fontSize: 20,
                  color: "primary.main",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    color: "primary.500",
                  },
                  ".MuiListItemButton-root.Mui-selected &": {
                    color: "#fff",
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={t("sidebar.user")}
              sx={{
                "&.MuiListItemText-root": {
                  fontWeight: 500,
                },
                display: isOpen ? "block" : "none",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={activeRoute === "admin"}
            onClick={() => router.push(`/${activeLocale}/admin`)}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AdminPanelSettingsOutlined
                sx={{
                  fontSize: 20,
                  color: "primary.main",
                  "&:hover": {
                    color: "primary.500",
                  },
                  ".MuiListItemButton-root.Mui-selected &": {
                    color: "#fff",
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={t("sidebar.admin")}
              sx={{
                display: isOpen ? "block" : "none",
                
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
};

export default SideBar;
