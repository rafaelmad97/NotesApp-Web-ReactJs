import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useContext, useState } from "react";
import GlobalContext from "../Context/GlobalContext";
import { color } from "../Lib/defaultValues";
import { useFormContext } from "react-hook-form";
import ShowNoteComponent from "./ShowNote";

interface CardProps {
  value: any;
}

const CardComponent: React.FC<CardProps> = (props) => {
  const [open, setOpen] = useState(false);
  const formNote = useFormContext();
  const GlobalState = useContext(GlobalContext);
  const categoria = GlobalState.categorias.find(
    (categorias) => categorias.ID === props.value.Categoria_ID
  );
  const date = new Date(props.value.TIMESTAMP);
  const Color = Object.entries(color).find((color) =>
    color[0].toUpperCase().match(categoria.Color.toUpperCase())
  )?.[1];

  const handleView = () => {
    formNote.reset(props.value);
    setOpen(true);
  };

  const handleDeleteNote = () => {
    GlobalState.methods
      .DeleteNotes(props.value.ID)
      .finally(() => GlobalState.methods.fetchListNotes());
  };
  return (
    <>
      <Card
        sx={{
          backgroundColor: Color !== undefined ? Color : "#FFF",
        }}
      >
        <CardContent>
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justifyContent="space-between"
            alignContent="center"
          >
            <Grid item>
              <Typography variant="h6">{props.value.Titulo}</Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={handleDeleteNote}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
        </CardContent>
        <CardActionArea onClick={handleView}>
          <CardContent>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="body2" textAlign="justify">
                  <pre style={{ fontFamily: "inherit" }}>
                    {props.value.Nota}
                  </pre>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <br></br>
          <Divider />
          <Typography variant="overline">
            {`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}
          </Typography>
        </CardActionArea>
      </Card>
      <ShowNoteComponent
        show={{
          open,
          setOpen,
        }}
        color={Color !== undefined ? Color : "#FFF"}
      />
    </>
  );
};

export default CardComponent;
