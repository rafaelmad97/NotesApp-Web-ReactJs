import { Fab } from "@mui/material";
import { Notes } from "@mui/icons-material";
import "./App.css";
import ToolbarComponent from "./Component/Toolbar";

import ListNotesConmponent from "./Component/ListNotes";
import { useContext, useState } from "react";
import CreateNoteDialog from "./Component/CreateNoteDialog";
import GlobalContext from "./Context/GlobalContext";

function App() {
  const [open, setopen] = useState(false);
  const globalcontext = useContext(GlobalContext);
  const handleOpenCreatenote = () => {
    setopen(true);
  };

  return (
    <div className="App">
      <CreateNoteDialog
        show={{
          open,
          setopen,
        }}
      />
      <ToolbarComponent />
      <header className="App-header">
        <ListNotesConmponent />
        <div className="Floating-action">
          <Fab
            variant="extended"
            color="secondary"
            onClick={handleOpenCreatenote}
            disabled={
              globalcontext.categorias.length === 0 ||
              globalcontext.userinfo.length === 0
            }
          >
            <Notes sx={{ mr: 1 }} />
            Agregar nota
          </Fab>
        </div>
      </header>
    </div>
  );
}

export default App;
