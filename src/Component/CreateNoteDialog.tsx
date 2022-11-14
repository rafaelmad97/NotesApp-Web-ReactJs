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
  Select,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import GlobalContext from "../Context/GlobalContext";
import { defaultNoteData } from "../Lib/defaultValues";

interface CreateNoteDialogProps {
  show: {
    open: boolean;
    setopen: Dispatch<SetStateAction<boolean>>;
  };
}

const CreateNoteDialog: React.FC<CreateNoteDialogProps> = (props) => {
  const formNote = useFormContext();
  const globalContext = useContext(GlobalContext);

  const handleClose = () => {
    formNote.reset(defaultNoteData);
    props.show.setopen(false);
  };

  const onSubmit = (data: any) => {
    const note = { ...data };
    note.TIMESTAMP = new Date().toISOString();
    console.log(note);
    globalContext.methods.CreateNotes(note).finally(() => {
      globalContext.methods.fetchListNotes();
      handleClose();
    });
  };

  return (
    <Dialog open={props.show.open} fullWidth>
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
                    {globalContext.categorias.map((values: any) => {
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
                    {globalContext.userinfo.map((user: any) => {
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
    </Dialog>
  );
};

export default CreateNoteDialog;
