import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import Createcategoriacomponent from "./Createcategoria";
import { FormProvider, useForm } from "react-hook-form";
import { defaultCategoriaData, defaultUserinfo } from "../Lib/defaultValues";
import AdminCategoriasComponent from "./AdminCategorias";
import AdminuserinfoComponent from "./AdminuserInfo";
import CreateUserInfocomponent from "./CreateUserInfo";
import GlobalContext from "../Context/GlobalContext";
import GlobalState from "../Context/GlobalState";

interface ToolbarProps {}

const ToolbarComponent: React.FC<ToolbarProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [opencreateCategoria, setopencreateCategoria] = useState(false);
  const [opencreateUserInfo, setopencreateUserInfo] = useState(false);
  const [openAdminCategoria, setopenAdminCategoria] = useState(false);
  const [openAdminUserInfo, setopenAdminUserInfo] = useState(false);
  const globalContext = useContext(GlobalContext);

  const formCategoria = useForm({
    defaultValues: defaultCategoriaData,
  });
  const formUserInfo = useForm({
    defaultValues: defaultUserinfo,
  });
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateCategoria = () => {
    setopencreateCategoria(true);
    handleClose();
  };
  const handleCreateUserinfo = () => {
    setopencreateUserInfo(true);
    handleClose();
  };
  const handleopenadminCategoria = () => {
    setopenAdminCategoria(true);
    handleClose();
  };
  const handleopenadminUserInfo = () => {
    setopenAdminUserInfo(true);
    handleClose();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notas
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Settings />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleCreateCategoria}>
                Agregar Categoria
              </MenuItem>
              <MenuItem onClick={handleCreateUserinfo}>
                Agregar Propietario
              </MenuItem>
              <MenuItem
                onClick={handleopenadminCategoria}
                disabled={globalContext.categorias.length === 0 ? true : false}
              >
                Administrar Categorias
              </MenuItem>
              <MenuItem
                onClick={handleopenadminUserInfo}
                disabled={globalContext.userinfo.length === 0 ? true : false}
              >
                Administrar Propietarios
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <FormProvider {...formCategoria}>
        <Createcategoriacomponent
          show={{
            open: opencreateCategoria,
            setOpen: setopencreateCategoria,
          }}
          EditMode={false}
        />
        <AdminCategoriasComponent
          show={{ open: openAdminCategoria, setopen: setopenAdminCategoria }}
        />
      </FormProvider>
      <FormProvider {...formUserInfo}>
        <CreateUserInfocomponent
          EditMode={false}
          show={{ open: opencreateUserInfo, setOpen: setopencreateUserInfo }}
        />
        <AdminuserinfoComponent
          show={{ open: openAdminUserInfo, setopen: setopenAdminUserInfo }}
        />
      </FormProvider>
    </Box>
  );
};

export default ToolbarComponent;
