import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesList from "../components/CategoriesList";
import CategoryDetails from "../components/CategoryDetails";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { categoryListService, getCategoryService, removeCategoryService, saveCategoryImageService, saveCategoryService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const CategoriesPage = () => {

    const initTab = [
        {
            eventKey: 0,
            title: "Lista Korisnika",
            order: 1
        }
        // {
        //     eventKey: -1,
        //     title: "Specifikacija",
        //     order: 2
        // }
    ];

    const { catId } = useParams();

    const [activeTab, setActiveTab] = useState(initTab[0].eventKey);
    const [tabsList, setTabsList] = useState(initTab);

    const { isLoading, sendRequest: categoryListRequest } = useHttp();

    const [categoryList, setCategoryList] = useState([]);

    const [categoryDetailsData, setCategoryDetailsData] = useState({});

    const [categoryNew, setCategoryNew] = useState(false);

    const getCategories = async () => {
        const data = await categoryListService(categoryListRequest);
        setCategoryList(data);
    };

    useEffect(() => {

        getCategories();

    }, [categoryListRequest]);


    const saveCategorieParentService = async (saveData) => {
        const data = await saveCategoryService(saveData, categoryListRequest);
        if (data && data.category_list) {
            setCategoryList(data.category_list);
        }
    }

    const saveCategoryDetailsService = async (saveData) => {
        const data = await saveCategoryService({   
            id: saveData.id,
            name: saveData.name,
            parent_id: saveData.parent_id,
            seo_word: saveData.seo_word,
            seo_description: saveData.seo_description
        }, categoryListRequest);
        if (data) {
            setCategoryList(data.category_list);
            if (saveData.image || saveData.image === null || saveData.icon || saveData.icon === null) {
                let dataForSave;
                if (saveData.image instanceof FormData) {
                    dataForSave = saveData.image;
                    if (saveData.icon instanceof FormData) {
                        dataForSave.append("icon", saveData.icon.get('icon'));
                    } else if (saveData.icon) {
                        dataForSave.append("icon", saveData.icon);
                    } else if (saveData.icon === null) {
                        dataForSave.append("icon", '');
                    }
                } else if (saveData.icon instanceof FormData) {
                    dataForSave = saveData.icon;
                    if (saveData.image) {
                        dataForSave.append("image", saveData.image);
                    } else if (saveData.image === null) {
                        dataForSave.append("image", '');
                    }
                } else {
                    dataForSave = new FormData();
                    if (saveData.image) {
                        dataForSave.append("image", saveData.image);
                    } else if (saveData.image === null) {
                        dataForSave.append("image", '');
                    }
                    if (saveData.icon) {
                        dataForSave.append("icon", saveData.icon);
                    } else if (saveData.icon === null) {
                        dataForSave.append("icon", '');
                    }
                }
                dataForSave.append("category_id", data.category_id);
                saveCategoryImageDetailsService(dataForSave, categoryListRequest);
            } else {
                getCategory({id: data.category_id});
            }
        }
    }

    const saveCategoryImageDetailsService = async (saveData) => {
        const data = await saveCategoryImageService(saveData, categoryListRequest);
        if (data) {
            setCategoryDetailsData(data);
        }
    }

    const getCategory = async (categoryId) => {
        const data = await getCategoryService(categoryId, categoryListRequest);
        setCategoryDetailsData(data);
    }

    useEffect(() => {
        if (+catId > 0) {
            getCategory({id: +catId});
        }
    }, []);

    const addCategory = () => {
        setCategoryNew(!categoryNew)
    }

    const removeCategory = async (roleId) => {
        const removeRoleResponse = (data) => {
            setCategoryList(data);
        };

        const data = await removeCategoryService({id: roleId}, categoryListRequest);

        removeRoleResponse(data);
    };

    return (
        <>
            <div className="row row-m0">    
                <CategoriesList
                    saveCategoryParent={ (data) => { saveCategorieParentService(data) }}
                    categoryListData={categoryList}
                    categorySelected={ (categoryId) => { getCategory(categoryId) }}
                    addNewCategory={ () => { addCategory() }}
                />
                <section id="category-page" className="card col-xl-7">
                    <div className="tabs-container">
                        <Tabs
                            tabsData={tabsList}
                            activeTabKey={activeTab}
                            onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey) }}
                        />
                    </div>
                    <CategoryDetails
                        categoryListData={categoryList}
                        saveCategory={ (data) => { saveCategoryDetailsService(data) }}
                        categoryData={categoryDetailsData}
                        addCategory={categoryNew}
                        removeCategory={(id) => { removeCategory(id); }}
                    />
                </section>
            </div>
            {isLoading && (
                <Loader />
            )}
        </>
    );
}

export default CategoriesPage;