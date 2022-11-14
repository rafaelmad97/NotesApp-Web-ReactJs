import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import { useFormContext, Controller } from "react-hook-form";
import GlobalContext from "../Context/GlobalContext";

interface ShowNoteProps {
  show: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  color: string;
}

const ShowNoteComponent: React.FC<ShowNoteProps> = (props) => {
  const formNote = useFormContext();
  const globalContext = useContext(GlobalContext);

  const handleClose = () => {
    props.show.setOpen(false);
  };

  const onSubmit = (data: any) => {
    const note = { ...data };
    const id = note.ID;
    globalContext.methods.EditNotes(id, note).finally(() => {
      globalContext.methods.fetchListNotes();
      formNote.reset();
      handleClose();
    });
  };

  return (
    <Dialog open={props.show.open} fullWidth>
      <Paper sx={{ backgroundColor: props.color }}>
        <DialogTitle>
          <Controller
            control={formNote.control}
            name="Titulo"
            render={({ field }) => (
              <TextField variant="filled" label="Titulo" {...field} fullWidth />
            )}
          />
        </DialogTitle>
        <Divider />
        <br />
        <DialogContent>
          <Controller
            control={formNote.control}
            name="Nota"
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Nota"
                multiline
                rows={6}
                {...field}
                fullWidth
              />
            )}
          />
        </DialogContent>
        <br />
        <Divider />
        <DialogContent>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={12} md={6} xl={6}>
              <Controller
                control={formNote.control}
                name="Categoria_ID"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Categoria
                    </InputLabel>
                    <Select label="Categoria" variant="filled" {...field}>
                      {globalContext.categorias.map((values) => {
                        return (
                          <MenuItem value={values.ID}>
                            {values.Categoria}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <Controller
                control={formNote.control}
                name="UserInfo_ID"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Propiedad
                    </InputLabel>
                    <Select label="Propiedad" variant="filled" {...field}>
                      {globalContext.userinfo.map((user) => {
                        return (
                          <MenuItem value={user.ID}>
                            {`${user.Nombre} ${user.Apellidos}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <br />
        <Divider />
        <DialogActions>
          <Button variant="text" color="inherit" onClick={handleClose}>
            Cancelar
          </Button>
          <form onSubmit={formNote.handleSubmit(onSubmit)}>
            <Button variant="text" color="inherit" type="submit">
              Guardar
            </Button>
          </form>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default ShowNoteComponent;
