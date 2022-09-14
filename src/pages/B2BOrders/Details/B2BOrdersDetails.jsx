import { useNavigate } from "react-router-dom";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import OrderDetails from "../../../components/OrderDetails";

const B2BOrdersDetails = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper
            title={"Porudžbina"}
            back={() => {
                navigate(-1);
            }}
        >
            <OrderDetails orderData={{}} saveOrderStatus={() => {}} />
        </PageWrapper>
    );
};

export default B2BOrdersDetails;
