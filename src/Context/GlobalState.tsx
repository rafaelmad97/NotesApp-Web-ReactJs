import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { useCallback, useState } from "react";
import GlobalContext from "./GlobalContext";
import { defaultNoteData } from "../Lib/defaultValues";

const GlobalState = (props: any) => {
  const [ListNotes, setListNotes] = useState<any[]>([]);
  const [ListCategorias, setListCategorias] = useState<any[]>([]);
  const [ListUserInfo, setListUserInfo] = useState<any[]>([]);

  const formNote = useForm({ defaultValues: defaultNoteData });

  const fetchListNotes = useCallback(async () => {
    await axios(`${process.env.REACT_APP_APIURL}/api/notes`).then((res) =>
      setListNotes(res.data)
    );
  }, []);

  const CreateNotes = useCallback(async (note: any) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/notes`, {
      method: "POST",
      data: note,
    });
  }, []);

  const EditNotes = useCallback(async (id: number, note: any) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/notes/${id}`, {
      method: "PUT",
      data: note,
    });
  }, []);

  const DeleteNotes = useCallback(async (id: number) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/notes/${id}`, {
      method: "DELETE",
    });
  }, []);

  const fetchListCategorias = useCallback(async () => {
    await axios(`${process.env.REACT_APP_APIURL}/api/categorias`).then((res) =>
      setListCategorias(res.data)
    );
  }, []);

  const CreateCategoria = useCallback(async (categoria: any) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/categorias`, {
      method: "POST",
      data: categoria,
    });
  }, []);

  const EditCategorias = useCallback(async (id: number, categoria: any) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/categorias/${id}`, {
      method: "PUT",
      data: categoria,
    });
  }, []);

  const DeleteCategorias = useCallback(async (id: number) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/categorias/${id}`, {
      method: "DELETE",
    });
  }, []);

  const fetchListUserInfo = useCallback(async () => {
    await axios(`${process.env.REACT_APP_APIURL}/api/usersinfo`).then((res) =>
      setListUserInfo(res.data)
    );
  }, []);
  const CreateUserInfo = useCallback(async (userinfo: any) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/usersinfo`, {
      method: "POST",
      data: userinfo,
    });
  }, []);

  const EditUserInfo = useCallback(async (id: number, userinfo: any) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/usersinfo/${id}`, {
      method: "PUT",
      data: userinfo,
    });
  }, []);

  const DeleteUserInfo = useCallback(async (id: number) => {
    return await axios(`${process.env.REACT_APP_APIURL}/api/usersinfo/${id}`, {
      method: "DELETE",
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        notes: ListNotes,
        categorias: ListCategorias,
        userinfo: ListUserInfo,
        methods: {
          fetchListNotes,
          CreateNotes,
          EditNotes,
          DeleteNotes,
          fetchListCategorias,
          CreateCategoria,
          EditCategorias,
          DeleteCategorias,
          fetchListUserInfo,
          CreateUserInfo,
          EditUserInfo,
          DeleteUserInfo,
        },
      }}
    >
      <FormProvider {...formNote}>{props.children}</FormProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalState;
