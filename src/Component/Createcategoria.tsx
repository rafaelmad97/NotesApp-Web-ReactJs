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
import { defaultCategoriaData } from "../Lib/defaultValues";

interface CreateCategoriaProps {
  show: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  EditMode: boolean;
}

const Createcategoriacomponent: React.FC<CreateCategoriaProps> = (props) => {
  const formCategoria = useFormContext();
  const globalContext = useContext(GlobalContext);

  const handleClose = () => {
    formCategoria.reset(defaultCategoriaData);
    props.show.setOpen(false);
  };

  const onSubmitCreate = (data: any) => {
    const categoria = { ...data };
    globalContext.methods
      .CreateCategoria(categoria)
      .then()
      .finally(() => {
        globalContext.methods.fetchListCategorias();
        handleClose();
      });
  };

  const onSubmitEdit = (data: any) => {
    const categoria = { ...data };
    globalContext.methods
      .EditCategorias(categoria.ID, categoria)
      .then()
      .finally(() => {
        globalContext.methods.fetchListCategorias();
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
                control={formCategoria.control}
                name="Categoria"
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Categoria"
                    {...field}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Controller
                control={formCategoria.control}
                name="Color"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select label="Color" variant="outlined" {...field}>
                      <MenuItem value={"blanco"}>Blanco</MenuItem>
                      <MenuItem value={"azul"}>Azul</MenuItem>
                      <MenuItem value={"Verde"}>Verde</MenuItem>
                      <MenuItem value={"Morado"}>Morado</MenuItem>
                      <MenuItem value={"rojo"}>Rojo</MenuItem>
                    </Select>
                  </FormControl>
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
            onSubmit={formCategoria.handleSubmit(
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

export default Createcategoriacomponent;
