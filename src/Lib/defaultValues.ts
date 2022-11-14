import { colors } from "@mui/material";
import Axios from "axios";
import Globalcontext, { categoriadata, notesdata, userinfo } from "./Types";

const defaultGlobalContext: Globalcontext = {
  notes: Array<any>([]),
  categorias: Array<any>([]),
  userinfo: Array<any>([]),
  methods: {
    fetchListNotes: () => {},
    CreateNotes: (note: any) => {
      return Axios("/");
    },
    EditNotes: (id: number, note: any) => {
      return Axios("/");
    },
    DeleteNotes: (id: number) => {
      return Axios("/");
    },
    fetchListCategorias: () => {},
    CreateCategoria: (categoria: any) => {
      return Axios("/");
    },
    EditCategorias: (id: number, categoria: any) => {
      return Axios("/");
    },
    DeleteCategorias: (id: number) => {
      return Axios("/");
    },
    fetchListUserInfo: () => {},
    CreateUserInfo: (userinfo: any) => {
      return Axios("/");
    },
    EditUserInfo: (id: number, userinfo: any) => {
      return Axios("/");
    },
    DeleteUserInfo: (id: number) => {
      return Axios("/");
    },
  },
};

export const color = {
  Azul: colors.blue[200],
  Gris: colors.grey[200],
  Verde: colors.green[200],
  Morado: colors.purple[200],
  Rojo: colors.red[200],
  Blanco: "#fff",
};

export const defaultNoteData: notesdata = {
  ID: 0,
  Titulo: "",
  Nota: "",
  TIMESTAMP: "",
  Categoria_ID: 0,
  UserInfo_ID: 0,
};

export const defaultCategoriaData: categoriadata = {
  ID: 0,
  Categoria: "",
  Color: "blanco",
};

export const defaultUserinfo: userinfo = {
  ID: 0,
  Nombre: "",
  Apellidos: "",
  Email: "",
};

export default defaultGlobalContext;
