import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import ProductsList from "../components/ProductsList";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { getProductService, removeProductService, saveProductImagesService, saveProductService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const ProductsPage = () => {

  const { prodId } = useParams();

  let navigate = useNavigate();

  let initTab = [
    {
      eventKey: 0,
      title: "Lista Proizvoda",
      order: 1,
    },
    {
      eventKey: -1,
      title: "Proizvod",
      order: 2,
    },
  ];

  const { isLoading, sendRequest: productRequest } = useHttp();

  const [productDetailsData, setProductDetailsData] = useState({});
  const [productNew, setProductNew] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [tabsList, setTabsList] = useState(initTab);
  const [activeTab, setActiveTab] = useState(initTab[0].eventKey);
  const [activePage, setActivePage] = useState(1);

  const getProduct = async (productId) => {
    const data = await getProductService(productId, productRequest);
    navigate(`/products/` + productId.id);
    setActiveTab(tabsList[1].eventKey);
    setProductDetailsData(data);
  }

  useEffect(() => {
    if (selectedProduct && selectedProduct > 0) {
      getProduct({id: selectedProduct});
    }
  }, [selectedProduct])

  useEffect(() => {
    if (prodId && +prodId > 0) {
      setSelectedProduct(+prodId);
    }
  }, [prodId])

  const saveProductDetailsService = async (saveData) => {
    const data = await saveProductService({   
      id: saveData.id,
      name: saveData.name,
      additional_name: saveData.additional_name,
      code: saveData.code,
      unit: saveData.unit,
      is_promoted: saveData.is_promoted,
      is_view: saveData.is_view,
      description: saveData.description,
      category_ids: saveData.category_ids,
      options: saveData.options,
      variants: saveData.variants,
      price: saveData.price,
      purchase_price: saveData.purchase_price,
      sku: saveData.sku,
      barcode: saveData.barcode,
      locations: saveData.locations
    }, productRequest);
    if (data) {
      addProduct();
      if (saveData.images) {
        saveData.images.append("product_id", data.id);
        for (let item of saveData.removeImgIds) {
          saveData.images.append("remove_ids[]", item);
        }
        if (saveData.main_image === null) {
          saveData.images.append("main_image", '');
        } else if (saveData.main_image) {
          saveData.images.append("main_image", saveData.main_image.file, saveData.main_image.name);
        }
        saveProductImageDetailsService(saveData.images);
      } else {
        setProductDetailsData(data);
      }
    }
  }

  const saveProductImageDetailsService = async (saveData) => {
    const data = await saveProductImagesService(saveData, productRequest);
    if (data) {
      setProductDetailsData(data);
    }
  }

  const removeProductDetailsService = async (saveData) => {
    const data = await removeProductService(saveData, productRequest);
    if (data) {
      setActiveTab(initTab[0].eventKey);
      setProductDetailsData({});
      setSelectedProduct(null);
      navigate(`/products`);
    }
  }

  const addProduct = () => {
    setProductNew(!productNew);
    setActiveTab(initTab[1].eventKey);
    setProductDetailsData({});
    navigate(`/products`);
  }

  const checkActiveTab = (activeTabKey) => {
    if (activeTabKey === tabsList[0].eventKey) {
      navigate(`/products`);
      setProductDetailsData({});
      setSelectedProduct(null);
    } else if (selectedProduct && selectedProduct > 0) {
      navigate(`/products/` + selectedProduct);
    }
  }

  return (
    <>
      <section id="roles-page" className="card">
        <div className="tabs-container">
          <Tabs
            tabsData = {tabsList}
            activeTabKey = {activeTab}
            onTabChange = { (activeTabKey) => { setActiveTab(activeTabKey); checkActiveTab(activeTabKey); }}
          />
          <button type="button" className="btn-control button-add" onClick={() => {addProduct()}}>Novi proizvod</button>
        </div>
        { activeTab === tabsList[0].eventKey && (
          <ProductsList
            productSelected={ (productId) => { setSelectedProduct(productId) }}
            activePage={activePage}
            changeActivePage={(e) => setActivePage(e)}
          />
        )}
        { activeTab === tabsList[1].eventKey && (
          <ProductDetails
            saveProduct = { (data) => { saveProductDetailsService(data) }}
            productData = {productDetailsData}
            addProduct = {productNew}
            removeProduct = { (data) => { removeProductDetailsService(data) }}
          />
        )}
      </section>
      {(isLoading) && (
        <Loader />
      )}
    </>
  );
};

export default ProductsPage;
