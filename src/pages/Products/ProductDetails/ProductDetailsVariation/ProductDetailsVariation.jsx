import { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import { InputMultiSelect, InputSelect } from "../../../../components/shared/Form/FormInputs/FormInputs";
import Button from "../../../../components/shared/Button/Button";
import Buttons from "../../../../components/shared/Form/Buttons/Buttons";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import DeleteModal from "../../../../components/shared/Dialogs/DeleteDialog";


const ProductDetailsVariation = ({ parentId }) => {
  const [variants, setVariants] = useState([]);
  const [variantsData, setVariantsData] = useState([]);
  const [variationAttributes, setVariationAttributes] = useState([]); // svi sa disabled false
  const [variantsAttributesData, setVariantsAttributesData] = useState([]); // modifikovan niz za prikaz

  const [openDeleteDialog, setOpenDeleteDialog] = useState({ show: false });
  const [loading, setLoading] = useState(false);

  const [itemToBeDeleted, setItemToBeDeleted] = useState(null);

  const api = useAPI();
  const getVariants = () => {
    api.get(`admin/product-items/variants/main/product-attributes/${parentId}`)
      .then((response) => {
        let variants = response?.payload;

        let arrData = [];
        let modified = [];

        variants?.map((data, index) => {
          const { attr, values } = data;
          let valuesCheckedArr = [];
          let isVisible = false;
          let selectedAttr = null;

          let objForDisabledVariants = { ...attr, disabled: false };

          values.map((item, i) => {
            if (item.selected) {
              isVisible = true;
              valuesCheckedArr.push(item.id);
              selectedAttr = attr
              objForDisabledVariants.disabled = true;
            }
          });

          let indexOfSelectedValue = values.findIndex((item) => item.selected === true);

          const fullObj = {
            selectedAttr: selectedAttr,
            values: indexOfSelectedValue !== -1 ? values : [],
            isVisible: isVisible,
            checkedValues: valuesCheckedArr,
          }
          arrData.push(objForDisabledVariants);
          modified.push(fullObj);
        })

        setVariants(variants);

        let indexOfExistingSelectedAttr = modified.findIndex((item) => item.selectedAttr !== null);

        if (indexOfExistingSelectedAttr === -1) {
          modified[0].isVisible = true;
        }
        setVariantsData(modified);
        setVariantsAttributesData(arrData);
        // only attr attributes
        let variationAttributesTemp = [];
        variants.forEach((item, i) => {
          const { attr, values } = item;
          variationAttributesTemp.push({ ...attr, disabled: false });
        });
        setVariationAttributes(variationAttributesTemp);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const onChnageHandler = (res, index) => {
    const { target } = res;
    const { value } = target;

    let indexOfVariant = variants.findIndex((item) => item.attr.id === value);
    let variatnObj = indexOfVariant !== -1 ? variants[indexOfVariant] : null;

    let modifiedArr = variantsData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          values: variatnObj ? [...variatnObj.values] : [],
          selectedAttr: variatnObj ? variatnObj.attr : null,
          checkedValues: [],
        };
      } else {
        return item;
      }
    });

    const tempArrVariationAttribute = [...variationAttributes];
    modifiedArr.forEach((it, i) => {
      const { selectedAttr } = it;
      if (selectedAttr) {
        let index = tempArrVariationAttribute.findIndex((item) => item.id === selectedAttr.id);
        tempArrVariationAttribute[index] = {
          ...tempArrVariationAttribute[index],
          disabled: true
        }
      }
    });
    setVariantsData(modifiedArr);
    setVariantsAttributesData(tempArrVariationAttribute);
  };

  const onChangeSelectionMultiple = (res, index) => {
    const { target } = res;
    const { value } = target;
    let arr = variantsData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          checkedValues: [...value],
          isValid: true
        }
      } else {
        return item;
      }
    });
    setVariantsData([...arr]);
  }
  const onButtonClick = () => {
    // getting count of selected attributes that exists
    let count = 0;
    variantsData.forEach((item) => {
      const { selectedAttr } = item;
      if (selectedAttr) {
        count++;
      }
    });

    if (count !== variantsData.length) {
      let arr = [...variantsData];
      // reranged arr for showing selected attr ( !== null ) first
      let rereangedArr = [];
      // arr for showing selected attr ( === null ) last
      let selectedAttrNullArr = [];
      let index = arr.findIndex((item) => item.selectedAttr === null);
      arr[index].isVisible = true;

      arr.forEach((item, i) => {
        const { selectedAttr } = item;
        if (selectedAttr) {
          rereangedArr.push(item);
        } else {
          selectedAttrNullArr.push(item);
        }
      });

      // full arr that will be shown [!== null first, === null last]
      rereangedArr = [...rereangedArr, ...selectedAttrNullArr];
      setVariantsData([...rereangedArr]);
    }

  }

  const onSaveClick = (array, fromDialog) => {

    let indexValidationArr = [];
    let arr = [...variantsData];
    arr.forEach((item, i) => {
      const { selectedAttr, checkedValues } = item;
      if (selectedAttr !== null && checkedValues.length === 0 || selectedAttr === null && checkedValues.length === 0 && item.isVisible === true) {
        indexValidationArr.push(-1);
      } else {
        indexValidationArr.push(i);
      }
    });

    if (indexValidationArr.includes(-1) && !fromDialog) {
      indexValidationArr.forEach((item, i) => {
        if (item === -1) {
          arr[i].isValid = false;
        } else {
          arr[i].isValid = true;
        }
      });
      setVariantsData([...arr]);
    } else {
      setLoading(true);
      let allCheckedValues = [];
      (array ? array : variantsData).forEach((item) => {
        const { checkedValues } = item;
        allCheckedValues = [...allCheckedValues, ...checkedValues];
      });

      let saveArrData = [];
      variants.map((item, i) => {
        const { attr, values } = item;
        let tempArr = [];
        values.forEach((it) => {
          if (allCheckedValues.includes(it.id)) {
            tempArr.push({
              id_product_parent: Number(parentId),
              id_attribute: attr.id,
              slug_attribute: attr.slug,
              name_attribute: attr.name,
              id_attribute_value: it.id,
              slug_attribute_value: it.slug,
              name_attribute_value: it.name
            });
          }
        })
        saveArrData = [...saveArrData, ...tempArr];
      });

      const req = { data: [...saveArrData], values: { id_parent: Number(parentId) } };
      api.post("admin/product-items/variants/main/save", req)
        .then((response) => {
          setLoading(false);
          toast.success(`Uspešno`);
        })
        .catch((error) => {
          setLoading(false);
          console.warn(error);
        });
    }
  }

  const handleDeleteModalAction = (item) => {
    if (item) {
      let arr = [...variantsData];
      let index = arr.findIndex((it) => it.selectedAttr.id === item.selectedAttr.id);
      let obj = arr[index];
      const { selectedAttr } = obj;

      let tempArrVariationAttribute = [...variantsAttributesData];
      let indexVariant = variantsAttributesData.findIndex((it) => it.id === selectedAttr.id);
      tempArrVariationAttribute[indexVariant].disabled = false;

      obj = {
        ...obj,
        isVisible: false,
        selectedAttr: null,
        checkedValues: [],
        isValid: true,
        values: []
      }

      arr[index] = obj;

      setVariantsData([...arr]);
      setVariantsAttributesData([...tempArrVariationAttribute]);

      setItemToBeDeleted(null);
      setOpenDeleteDialog({ show: false });
      onSaveClick(arr, true);
    }
  }

  useEffect(() => {
    getVariants();
  }, []);


  return (
    <Box>
      {
        variantsData?.map((item, i) => {
          const { selectedAttr, values, isVisible, checkedValues, isValid } = item;
          if (isVisible) {
            let isErrorExists = isValid != undefined && isValid === false ? true : false;
            return (
              <Box key={i.toString()} sx={{ display: "flex", alignItems: "center" }}>
                <InputSelect error={isErrorExists ? 'Izaberite vrednosti' : null} value={selectedAttr?.id} label="Atribut" options={variantsAttributesData} onChange={(res) => { onChnageHandler(res, i); }} styleFormControl={{ marginRight: "1rem", width: "20%" }} />
                <InputMultiSelect error={isErrorExists ? 'Izaberite vrednosti' : null} value={checkedValues} label="Vrednost" options={values} onChange={(res) => { onChangeSelectionMultiple(res, i) }} />
                <IconButton
                  sx={{ marginTop: "1.2rem" }}
                  onClick={() => {
                    setItemToBeDeleted(item);
                    setOpenDeleteDialog({ show: true });
                  }}>
                  <Icon>delete</Icon>
                </IconButton>
              </Box>
            )
          }
        })
      }

      <Buttons>
        <Button onClick={onButtonClick} icon="add" label="Dodaj" sx={{ marginRight: "auto" }} />
        <Button onClick={() => { onSaveClick(null, false) }} label={loading ? <CircularProgress size={"1.5rem"} /> : "Sačuvaj"} disabled={loading} />
      </Buttons>

      <DeleteModal
        description="Da li ste sigurni da želite da obrišete ovu varijaciju?"
        title=""
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        nameOfButton="Obriši"
        deafultDeleteIcon={false}
        handleConfirm={() => { handleDeleteModalAction(itemToBeDeleted) }}
      />
    </Box>
  );
};

export default ProductDetailsVariation;
