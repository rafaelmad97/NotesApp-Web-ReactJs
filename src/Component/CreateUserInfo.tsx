import {
  Dialog,
  Paper,
  DialogTitle,
  TextField,
  Divider,
  DialogContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
import { useFormContext, Controller } from "react-hook-form";
import { defaultUserinfo } from "../Lib/defaultValues";

interface CreateUserInfoProps {
  show: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  EditMode: boolean;
}

const CreateUserInfocomponent: React.FC<CreateUserInfoProps> = (props) => {
  const formUserinfo = useFormContext();
  const globalContext = useContext(GlobalContext);

  const handleClose = () => {
    formUserinfo.reset(defaultUserinfo);
    props.show.setOpen(false);
  };

  const onSubmitCreate = (data: any) => {
    const userinfo = { ...data };
    globalContext.methods.CreateUserInfo(userinfo).finally(() => {
      globalContext.methods.fetchListUserInfo();
      handleClose();
    });
  };
  const onSubmitEdit = (data: any) => {
    const userinfo = { ...data };
    globalContext.methods.EditUserInfo(userinfo.ID, userinfo).finally(() => {
      globalContext.methods.fetchListUserInfo();
      handleClose();
    });
  };

  return (
    <Dialog open={props.show.open} fullWidth>
      <Paper>
        <DialogTitle>
          {props.EditMode ? "Editar" : "Agregar"} Categoria
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} md={12} xl={12}>
              <Controller
                control={formUserinfo.control}
                name="Nombre"
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Nombres"
                    {...field}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
              <Controller
                control={formUserinfo.control}
                name="Apellidos"
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Apellidos"
                    {...field}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Controller
                control={formUserinfo.control}
                name="Email"
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Email"
                    {...field}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="inherit" onClick={handleClose}>
            Cancelar
          </Button>
          <form
            onSubmit={formUserinfo.handleSubmit(
              props.EditMode ? onSubmitEdit : onSubmitCreate
            )}
          >
            <Button variant="text" color="inherit" type="submit">
              {props.EditMode ? "Editar" : "Guardar"}
            </Button>
          </form>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default CreateUserInfocomponent;
