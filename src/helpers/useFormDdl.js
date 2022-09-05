import useAPI from "../api/api";

const useFormDdl = () => {
  return async (formFields = [], path = "", exclude = []) => {
    const api = useAPI();
    let arr = [];
    let options = [];
    for (const field of formFields) {
      if (field.input_type === "select" && !exclude.includes(field.prop_name)) {
        await api
          .get(`${path}/${field.prop_name}`)
          .then((response) => {
            options = response?.payload;
          })
          .catch((error) => {
            console.warn(error);
          });
        arr.push({ ...field, options: options });
      } else {
        arr.push(field);
      }
    }

    return arr;
  };
};

export default useFormDdl;
