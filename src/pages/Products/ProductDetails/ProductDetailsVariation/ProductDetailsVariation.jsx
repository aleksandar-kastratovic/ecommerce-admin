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
import Typography from "@mui/material/Typography";
import DeleteModal from "../../../../components/shared/Dialogs/DeleteDialog";
import ProductVariation from "./VariationList/ProductVariation";
import { Link } from "react-router-dom";



const ProductDetailsVariation = ({ parentId }) => {
  const [variants, setVariants] = useState([]);
  const [variantsData, setVariantsData] = useState([]);
  const [variationAttributes, setVariationAttributes] = useState([]); // svi sa disabled false
  const [variantsAttributesData, setVariantsAttributesData] = useState([]); // modifikovan niz za prikaz

  const [listVariants, setListVariants] = useState([]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState({ show: false });
  const [loading, setLoading] = useState(false);

  const [itemToBeDeleted, setItemToBeDeleted] = useState(null);

  const api = useAPI();

  const getVariants = () => {
    api.get(`admin/product-items/variants/main/product-attributes/${parentId}`)
      .then((response) => {
        console.log("get varinats", response?.payload)
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

  const getListVariants = () => {
    api.get(`admin/product-items/variants/main/product/${parentId}`)
      .then((response) => {
        console.log("get list varinats", response);
        setListVariants(response?.payload);
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
          getListVariants();
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
    getListVariants();
  }, []);

  console.log("variantsData", variationAttributes);

  return (
    <>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Atributi i njihove vrednosti
        </Typography>
        {variantsData?.length === 0 ? (
          <Typography sx={{ marginTop: "1rem" }}>Nema dostupnih atributa i vrednosti za varijacije. Vrednosti možete uneti u sekciji <Link to="/product-items-variants-attributes/group-attribute" style={{ color: "#28a86e", textDecoration: "underline" }}>Atributi za varijacije.</Link> </Typography>

        ) : (
          <>
            {variantsData?.map((item, i) => {
              const { selectedAttr, values, isVisible, checkedValues, isValid } = item;
              if (isVisible) {
                let isErrorExists = isValid != undefined && isValid === false ? true : false;
                return (
                  <Box key={i.toString()} sx={{ display: "flex", alignItems: "center" }}>
                    <InputSelect
                      error={isErrorExists ? 'Izaberite vrednosti' : null}
                      value={selectedAttr?.id}
                      label="Atribut"
                      options={variantsAttributesData}
                      onChange={(res) => { onChnageHandler(res, i); }}
                      styleFormControl={{ marginRight: "1rem", width: "20%", "& label": { fontSize: "0.875rem" } }}
                    />
                    <InputMultiSelect
                      error={isErrorExists ? 'Izaberite vrednosti' : null}
                      value={checkedValues}
                      label="Vrednosti"
                      options={values}
                      onChange={(res) => { onChangeSelectionMultiple(res, i) }}
                      styleMultiSelect={{ "& label": { fontSize: "0.875rem" } }}
                    />
                    <IconButton
                      sx={{ marginTop: "1.2rem" }}
                      onClick={() => {
                        setItemToBeDeleted(item);
                        setOpenDeleteDialog({ show: true });
                      }}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </Box>
                );
              }
            })}

            <Buttons>
              <Button onClick={onButtonClick} icon="add" label="Dodaj" sx={{ marginRight: "auto" }} />
              <Button onClick={() => { onSaveClick(null, false) }} label={loading ? <CircularProgress size={"1.5rem"} /> : "Sačuvaj"} disabled={loading} variant="contained" />
            </Buttons>
          </>

        )}

        <DeleteModal
          description="Da li ste sigurni da želite da obrišete ovu varijaciju?"
          title=""
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          nameOfButton="Obriši"
          deafultDeleteIcon={false}
          handleConfirm={() => { handleDeleteModalAction(itemToBeDeleted) }}
        />
      </Box >

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", margin: "1rem 0" }}>
          Lista varijanti
        </Typography>
        {listVariants.length > 0 ? (
          listVariants.map((variant) => {
            console.log(listVariants, "variantsAttr")
            return <ProductVariation title={variant.attributes_text} key={variant.id} productParentId={parentId} productId={variant.id} status={variant.status === "on"} />;
          })
        ) : (
          <p>Trenutno ne postoje varijante za prikaz.</p>
        )}
      </Box>
    </>

  );
};

export default ProductDetailsVariation;
