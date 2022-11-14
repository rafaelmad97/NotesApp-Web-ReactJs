import { AxiosResponse } from "axios";

export default interface Globalcontext {
  notes: Array<any>;
  categorias: Array<any>;
  userinfo: Array<any>;
  methods: {
    fetchListNotes: () => void;
    CreateNotes: (note: any) => Promise<AxiosResponse<any, any>>;
    EditNotes: (id: number, data: any) => Promise<AxiosResponse<any, any>>;
    DeleteNotes: (id: number) => Promise<AxiosResponse<any, any>>;
    fetchListCategorias: () => void;
    CreateCategoria: (categoria: any) => Promise<AxiosResponse<any, any>>;
    EditCategorias: (
      id: number,
      Categoria: any
    ) => Promise<AxiosResponse<any, any>>;
    DeleteCategorias: (id: number) => Promise<AxiosResponse<any, any>>;
    fetchListUserInfo: () => void;
    CreateUserInfo: (userinfo: any) => Promise<AxiosResponse<any, any>>;
    EditUserInfo: (
      id: number,
      userinfo: any
    ) => Promise<AxiosResponse<any, any>>;
    DeleteUserInfo: (id: number) => Promise<AxiosResponse<any, any>>;
  };
}

export interface notesdata {
  ID: number;
  Titulo: string;
  Nota: string;
  TIMESTAMP: string;
  Categoria_ID: number;
  UserInfo_ID: number;
}

export interface categoriadata {
  ID: number;
  Categoria: string;
  Color: string;
}

export interface userinfo {
  ID: number;
  Nombre: string;
  Apellidos: string;
  Email: string;
}
