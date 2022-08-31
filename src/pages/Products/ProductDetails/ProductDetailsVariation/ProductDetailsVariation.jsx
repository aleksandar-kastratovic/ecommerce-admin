import { Box } from "@mui/material";
import Form from "../../../../components/shared/Form/Form";
import ProductVariation from "./VariationList/ProductVariation";

const ProductDetailsVariation = ({ productId }) => {
  const variants = [1, 2, 3];
  return (
    <Box>
      <Form
        formFields={[]}
        initialData={{}}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
      <Box>
        <h4>Lista varijanti</h4>
        {variants.map((a, index) => {
          return <ProductVariation title="Boja:bela,Veličina:M" key={index} />;
        })}
      </Box>
    </Box>
  );
};

export default ProductDetailsVariation;
