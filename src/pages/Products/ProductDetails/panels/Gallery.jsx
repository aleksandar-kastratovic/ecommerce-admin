import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputMultipleImages from "../../../../components/shared/InputMultipleImages/InputMultipleImages";
import GallerySkeleton from "../../../../components/shared/Loading/GallerySkeleton";
import AuthContext from "../../../../store/auth-contex";

const Gallery = ({ productId }) => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [data, setData] = useState([]);
  const apiPath = "admin/product-items/gallery";
  const apiPathCrop = "admin/product-items/gallery/image-crop";
  const [loading, setLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);

  const handleData = () => {
    // setLoading(true);
    api.list(`${apiPath}/${productId}`)
      .then((response) => {
        setData(response?.payload?.items);
        // setLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        // setLoading(false);
      });
  };

  const handleInformationImage = () => {
    api.get(`admin/product-items/gallery/upload-options`)
      .then((response) => {
        setImageInfo(response.payload);
      })
      .catch((error) => console.warn(error));
  };


  const handleSubmit = (data, options = {}) => {
    setLoading(true);
    const allowedFormats = imageInfo ? imageInfo.allow_format.map(format => format?.mime_type.toLowerCase()) : [];
    const allowSize = imageInfo ? Number(imageInfo.allow_size) : 0;
    const fileExtension = data?.type.toLowerCase();
    const fileSizeInB = Number(data.size);

    if (allowedFormats.length > 0 && !allowedFormats.includes(fileExtension)) {
      toast.error(`Nedozvoljeni format slike. Dozvoljeni formati su: ${allowedFormats.join(", ")}`);
      setLoading(false);
      return;
    }

    if (fileSizeInB > allowSize) {
      console.log("ruza")
      toast.error(`Veličina slike je prevelika. Maksimalna dozvoljena veličina je ${allowSize / (1024 * 1024)} MB.`);
      setLoading(false);
      return;
    }

    let req = { id: data.new ? null : data.id, id_product: productId, file_base64: data.src, order: data.position ?? 0, title: null, subtitle: null, short_description: null, description: null, path: data.file };
    let postApi = options?.crop ? apiPathCrop : apiPath;
    api.post(`${postApi}`, req)
      .then((response) => {
        toast.success("Uspešno");
        handleData();
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
        setLoading(false);
      })


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
    // setLoading(true);
    api.put(`${apiPath}/order`, { id: id, order: destination })
      .then((response) => {
        toast.success("Uspešno");
        // setLoading(false);
        handleData();
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
        // setLoading(false);
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
    handleInformationImage();
  }, []);

  return (
    <>
      {loading ? (
        <GallerySkeleton />
      ) : (
        <InputMultipleImages
          list={list}
          name="Galerija"
          onChangeHandler={() => { }}
          uploadHandler={handleSubmit}
          deleteHandler={handleDelete}
          handleReorder={handleReorder}
          description={`Veličina fajla ne sme biti veća od ${imageInfo ? (imageInfo.allow_size / (1024 * 1024)).toFixed(2) : ""}MB. Dozvoljeni formati fajla: ${imageInfo ? imageInfo.allow_format.map((format) => format.name).join(", ") : ""}`}
        />
      )}
    </>
  );
};

export default Gallery;
