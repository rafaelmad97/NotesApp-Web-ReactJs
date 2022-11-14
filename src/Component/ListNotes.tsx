import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useEffect } from "react";
import GlobalContext from "../Context/GlobalContext";
import CardComponent from "./Card";

interface ListNotesProps {}

const ListNotesConmponent: React.FC<ListNotesProps> = () => {
  const Globalstate = useContext(GlobalContext);
  useEffect(() => {
    Globalstate.methods.fetchListCategorias();
    Globalstate.methods.fetchListUserInfo();
    Globalstate.methods.fetchListNotes();
  }, [
    Globalstate.methods.fetchListNotes,
    Globalstate.methods.fetchListCategorias,
    Globalstate.methods.fetchListUserInfo,
  ]);
  return (
    <Container sx={{ minHeight: "100vh", padding: 2 }}>
      <Grid container direction="row" spacing={1}>
        {Globalstate.notes.length === 0 ? (
          <Grid item> no hay notas intenta agregar una</Grid>
        ) : (
          <>
            {Globalstate.notes.map((value, index) => {
              return (
                <Grid item xs={12} sm={6} md={3} xl={3} key={index}>
                  <CardComponent value={value} key={value.ID} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ListNotesConmponent;
