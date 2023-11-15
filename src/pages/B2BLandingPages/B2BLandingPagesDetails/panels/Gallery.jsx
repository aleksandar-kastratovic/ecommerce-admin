import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputMultipleImages from "../../../../components/shared/InputMultipleImages/InputMultipleImages";
import GallerySkeleton from "../../../../components/shared/Loading/GallerySkeleton";
import AuthContext from "../../../../store/auth-contex";

const Gallery = ({ pageId }) => {

  const [data, setData] = useState([]);
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const apiPath = "admin/landing-pages-b2b/gallery";
  const [loading, setLoading] = useState(false);

  const handleData = () => {
    setLoading(true);
    api.list(`${apiPath}/${pageId}`)
      .then((response) => {
        setData(response?.payload?.items);
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error)
        setLoading(false);
      });
  };

  const handleSubmit = (data) => {
    setLoading(true);
    let req = {
      // id: data.id,
      id_landing_page: pageId,
      file_base64: data.src,
      order: data.position ?? 0,
      title: null,
      subtitle: null,
      short_description: null,
      description: null,
      path: data.file ?? null,
    };

    api.post(`${apiPath}`, req)
      .then((response) => {
        toast.success("Uspešno");
        handleData();
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    api.delete(`${apiPath}/${id}`)
      .then((response) => {
        toast.success("Uspešno");
        handleData();
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
        setLoading(false);
      });
  };

  const handleReorder = (id, destination) => {
    setLoading(true);
    api.put(`${apiPath}/order`, { id: id, order: destination })
      .then((response) => {
        toast.success("Uspešno");
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
        setLoading(false);
      });
  };

  let list = (data ?? [])
    .filter((item) => item.file_base64 != null)
    .map((item) => {
      let base64 = item.file_base64;
      const type = base64.split(";")[0].split(":")[1];
      let y = base64[base64.length - 2] === "=" ? 2 : 1;
      const size = base64.length * (3 / 4) - y;
      return { id: item.id, name: item.file_filename, position: item.order, alt: item.file_filename, size: size, type: type, src: base64, path: item.file };
    });

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      {loading ? <GallerySkeleton /> : <InputMultipleImages list={list} name="Galerija" onChangeHandler={() => { }} uploadHandler={handleSubmit} deleteHandler={handleDelete} handleReorder={handleReorder} />}

    </>
  )
};

export default Gallery;
