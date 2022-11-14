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
} from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import GlobalContext from "../Context/GlobalContext";
import { categoriadata } from "../Lib/Types";
import Createcategoriacomponent from "./Createcategoria";

interface AdminCategoriasProps {
  show: {
    open: boolean;
    setopen: Dispatch<SetStateAction<boolean>>;
  };
}

const AdminCategoriasComponent: React.FC<AdminCategoriasProps> = (props) => {
  const [openedit, setopenedit] = useState(false);
  const globalContext = useContext(GlobalContext);
  const formCategoria = useFormContext<categoriadata>();
  const handleClose = () => {
    props.show.setopen(false);
  };

  const handleEditCategoria = (categoria: any) => {
    formCategoria.reset(categoria);
    setopenedit(true);
  };

  const handleDeleteCategoria = (id: number) => {
    globalContext.methods.DeleteCategorias(id).finally(() => {
      globalContext.methods.fetchListCategorias();
    });
  };

  return (
    <>
      <Dialog open={props.show.open} fullWidth>
        <DialogTitle>Administrar Categorias</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" sx={{ padding: 1 }}>
            <Grid container direction="column">
              {globalContext.categorias.map((values, index) => {
                return (
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      alignContent="flex-start"
                    >
                      <Grid item xs={8} md={8} xl={8}>
                        {values.Categoria}
                      </Grid>
                      <Grid item xs={2} md={2} xl={2}>
                        <IconButton
                          onClick={() => handleEditCategoria(values)}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} md={2} xl={2}>
                        <IconButton
                          onClick={() => handleDeleteCategoria(values.ID)}
                          size="small"
                          disabled={
                            globalContext.notes.find(
                              (notes) => notes.Categoria_ID === values.ID
                            ) === undefined
                              ? false
                              : true
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {index < globalContext.categorias.length - 1 ? (
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
      <Createcategoriacomponent
        show={{ open: openedit, setOpen: setopenedit }}
        EditMode={true}
      />
    </>
  );
};

export default AdminCategoriasComponent;
