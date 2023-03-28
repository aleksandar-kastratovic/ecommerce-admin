import React, { useEffect, useState } from 'react';
import {
  InputInput,
  InputNumber,
} from '../../../../../components/shared/Form/FormInputs/FormInputs';
import style from './InputValue.module.scss';
import { Icon, IconButton, Tooltip } from '@mui/material';
import useAPI from '../../../../../api/api';
import SelectionModal from '../SelectionModal/SelectionModal';
import Loading from '../../../../../components/shared/Loading/Loading';

const InputValue = ({
  fillFromApi,
  queryString,
  selectedValues,
  usePropName,
  setOpenDialog,
  openDialog,
  name,
  component,
  inputType,
  onChange
}) => {
  const api = useAPI();
  const [opt, setOpt] = useState([]);
  const [options, setOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOpt, setIsLoadingOpt] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let path = usePropName
      ? `${fillFromApi}/${name}?${queryString}&input_type=${inputType}&component=${component}`
      : `${fillFromApi}?${queryString}`;
    const fillDdl = async () => {
      setIsLoading(true);
      await api
        .post(path, options)
        .then((response) => {
          if (isMounted) {
            setOpt(response?.payload);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          setIsLoading(false);
        });
    };

    if (fillFromApi) {
      fillDdl();
    }

    return () => {
      isMounted = false;
    };
  }, [fillFromApi]);

  useEffect(() => {
    let isMounted = true;
    let path = usePropName
      ? `${fillFromApi}/${name}?${queryString}&input_type=${inputType}&component=${component}`
      : `${fillFromApi}?${queryString}`;
    const fillDdl = async () => {
      setIsLoadingOpt(true);
      await api
        .post(path, options)
        .then((response) => {
          if (isMounted) {
            setOpt(response?.payload);
          }
          setIsLoadingOpt(false);
        })
        .catch((error) => {
          console.warn(error);
          setIsLoadingOpt(false);
        });
    };

    if (fillFromApi) {
      fillDdl();
    }

    return () => {
      isMounted = false;
    };
  }, [options]);


  const InputComponent = () => {
    switch (inputType) {
      case 'text':
        return <InputInput autoFocus={true} value={selectedValues ?? ""} onChange={(e) => onChange(e.target.value)} />;
      case 'number':
        return <InputNumber autoFocus={true} value={selectedValues ?? ""} onChange={(e) => onChange(e.target.value)} />;
      default:
        return (
          <InputInput
            value={
              Array.isArray(selectedValues)
                ? selectedValues.map((item) => item.name)
                : selectedValues ?? ""
            }
            onChange={() => { }}
            disabled={true}
          />
        );
    }
  };

  return !isLoading ? (
    <div className={style.valueIcon}>
      {InputComponent()}

      {inputType !== 'text' && inputType !== 'number' && (
        <>
          <Tooltip
            title={
              'Ukoliko želite da vidite vrednosti, kliknite ovde.'
            }
            placement="top"
            arrow
          >
            <IconButton
              className={style.showValues}
              onClick={() => {
                setOpenDialog({ show: true });
              }}
            >
              <Icon>list</Icon>
            </IconButton>
          </Tooltip>

          <SelectionModal
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            selectedValues={selectedValues}
            component={component}
            fillFromApi={fillFromApi}
            opt={opt}
            options={options}
            setOptions={setOptions}
            onChange={onChange}
            inputType={inputType}
            isLoadingOpt={isLoadingOpt}
          />
        </>
      )}
    </div>
  ) : (
    <Loading size="1rem" />
  );
};

export default InputValue;
