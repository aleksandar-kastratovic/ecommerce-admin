import React, { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography';
import ListPageModalWrapper from './ListPageModalWrapper'
import useAPI from '../../../api/api';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '../Button/Button';

const ModalCheckboxList = ({ anchor, openModal, setOpenModal, sx, variant, apiPathFormModal, initialData, titleModalCheckboxList }) => {
  const { id } = openModal;
  const api = useAPI();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  // const handleData = async () => {
  //   setIsLoading(true);
  //   await api
  //     .get(`${apiPathFormModal}/${id}`)
  //     .then((response) => {
  //       setData(response?.payload);
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //     });
  //   setIsLoading(false);
  // };

  const saveData = async (data) => {

    api.post(`${apiPathFormModal}`, { ...data, ...initialData })
      .then((response) => {
        setData(response?.payload);
        toast.success(`Uspešno`);
        setOpenModal({ ...openModal, show: false });
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      });
  };

  // useEffect(() => {
  //   if (openModal.show) {
  //     handleData();
  //   }
  // }, [openModal.show]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  return (
    <ListPageModalWrapper anchor={anchor} open={openModal.show ?? false} onClose={() => setOpenModal({ ...openModal, show: false })} sx={sx} variant={variant} onCloseButtonClick={() => setOpenModal({ ...openModal, show: false })}>
      <Typography variant="h5" gutterBottom>
        {titleModalCheckboxList}
      </Typography>
      <div>
        {[
          'categories',
          'inventories',
          'prices',
          'seo',
          'crossselles',
          'upsells',
          'related',
          'attributes',
          'variantsAttributes',
          'gallery',
          'docs',
        ].map((option) => (
          <FormControlLabel
            key={option}
            control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} name={option} />}
            label={option}
          />
        ))}

      </div>
      <div>
        <Button label="Otkaži" onClick={() => setOpenModal({ ...openModal, show: false })} sx={{ marginRight: "1rem" }} />
        <Button label="Dupliraj" variant="contained" onClick={() => saveData(data)} />
      </div>
    </ListPageModalWrapper>
  )
}

export default ModalCheckboxList