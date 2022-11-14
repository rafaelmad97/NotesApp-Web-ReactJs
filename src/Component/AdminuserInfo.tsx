import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import GlobalContext from "../Context/GlobalContext";
import CreateUserInfocomponent from "./CreateUserInfo";

interface AdminuserinfoProps {
  show: {
    open: boolean;
    setopen: Dispatch<SetStateAction<boolean>>;
  };
}

const AdminuserinfoComponent: React.FC<AdminuserinfoProps> = (props) => {
  const [openedit, setopenedit] = useState(Boolean);
  const userinfoForm = useFormContext();
  const globalContext = useContext(GlobalContext);

  const handleClose = () => {
    props.show.setopen(false);
  };

  const handleEditUserInfo = (userinfo: any) => {
    userinfoForm.reset(userinfo);
    setopenedit(true);
  };

  const handleDeleteUserInfo = (id: number) => {
    globalContext.methods
      .DeleteUserInfo(id)
      .finally(() => globalContext.methods.fetchListUserInfo());
  };

  return (
    <>
      <Dialog open={props.show.open} fullWidth>
        <DialogTitle>Administrar Propietarios</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" sx={{ padding: 1 }}>
            <Grid container direction="column">
              {globalContext.userinfo.map((values, index) => {
                return (
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Grid item xs={8} sm={8} md={8} xl={8}>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="subtitle2">
                              Nombres: {values.Nombre}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2">
                              Apellidos: {values.Apellidos}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2">
                              Email: {values.Email}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} xl={2}>
                        <IconButton
                          onClick={() => handleEditUserInfo(values)}
                          size="medium"
                        >
                          <Edit />
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} xl={2}>
                        <IconButton
                          onClick={() => handleDeleteUserInfo(values.ID)}
                          size="medium"
                          disabled={
                            globalContext.notes.find(
                              (notes) => notes.UserInfo_ID === values.ID
                            ) === undefined
                              ? false
                              : true
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {index < globalContext.userinfo.length - 1 ? (
                      <Divider />
                    ) : (
                      <></>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <CreateUserInfocomponent
        show={{ open: openedit, setOpen: setopenedit }}
        EditMode={true}
      />
    </>
  );
};

export default AdminuserinfoComponent;
