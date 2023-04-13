import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CategoriesList from "../components/CategoriesList";
import CategoryDetails from "../components/CategoryDetails";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { categoriesSynchroListService, categoryListService, getCategoryService, removeCategoryService, saveCategoryImageService, saveCategoryService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const CategoriesPage = () => {
    const initTab = [
        {
            eventKey: 0,
            title: "Detalji kategorije",
            order: 1,
        },
    ];

    const { catId } = useParams();

    const [activeTab, setActiveTab] = useState(initTab[0].eventKey);
    const [tabsList, setTabsList] = useState(initTab);

    const { isLoading, sendRequest: categoryListRequest } = useHttp();

    const [categoryList, setCategoryList] = useState([]);
    const [categorySynchroList, setCategorySynchroList] = useState([]);

    const [categoryDetailsData, setCategoryDetailsData] = useState({});

    const [categoryNew, setCategoryNew] = useState(false);
    const [categoryListLoaded, setCategoryListLoaded] = useState(false);
    const [categorySynchroListLoaded, setCategorySynchroListLoaded] = useState(false);

    const getCategories = async () => {
        const data = await categoryListService(categoryListRequest);
        if (data) {
            setCategoryList(data);
            setCategoryListLoaded(true);
        }
    };

    useEffect(() => {
        getCategories();
    }, [categoryListRequest]);

    const saveCategorieParentService = async (saveData) => {
        const data = await saveCategoryService(saveData, categoryListRequest);
        if (data && data.category_list) {
            setCategoryList(data.category_list);
        }
    };

    const saveCategoryDetailsService = async (saveData) => {
        const data = await saveCategoryService(
            {
                id: saveData.id,
                is_active: saveData.is_active,
                name: saveData.name,
                parent_id: saveData.parent_id,
                category_import_ids: saveData.category_import_ids,
                seo_word: saveData.seo_word,
                seo_description: saveData.seo_description,
            },
            categoryListRequest
        );
        if (data) {
            setCategoryList(data.category_list);
            if (saveData.image || saveData.image === null || saveData.icon || saveData.icon === null) {
                let dataForSave;
                if (saveData.image instanceof FormData) {
                    dataForSave = saveData.image;
                    if (saveData.icon instanceof FormData) {
                        dataForSave.append("icon", saveData.icon.get("icon"));
                    } else if (saveData.icon) {
                        dataForSave.append("icon", saveData.icon);
                    } else if (saveData.icon === null) {
                        dataForSave.append("icon", "");
                    }
                } else if (saveData.icon instanceof FormData) {
                    dataForSave = saveData.icon;
                    if (saveData.image) {
                        dataForSave.append("image", saveData.image);
                    } else if (saveData.image === null) {
                        dataForSave.append("image", "");
                    }
                } else {
                    dataForSave = new FormData();
                    if (saveData.image) {
                        dataForSave.append("image", saveData.image);
                    } else if (saveData.image === null) {
                        dataForSave.append("image", "");
                    }
                    if (saveData.icon) {
                        dataForSave.append("icon", saveData.icon);
                    } else if (saveData.icon === null) {
                        dataForSave.append("icon", "");
                    }
                }
                dataForSave.append("category_id", data.category_id);
                saveCategoryImageDetailsService(dataForSave, categoryListRequest);
            } else {
                getCategory({ id: data.category_id });
            }
        }
    };

    const saveCategoryImageDetailsService = async (saveData) => {
        const data = await saveCategoryImageService(saveData, categoryListRequest);
        if (data) {
            setCategoryDetailsData(data);
        }
    };

    const getCategory = async (categoryId) => {
        const data = await getCategoryService(categoryId, categoryListRequest);
        if (data) {
            setCategoryDetailsData(data);
        }
    };

    useEffect(() => {
        if (+catId > 0 && categoryListLoaded && categorySynchroListLoaded) {
            getCategory({ id: +catId });
        }
    }, [categoryListLoaded, categorySynchroListLoaded]);

    useEffect(() => {
        const getSynchroCategories = async () => {
            const data = await categoriesSynchroListService(categoryListRequest);
            if (data) {
                setCategorySynchroList(data);
                setCategorySynchroListLoaded(true);
            }
        };

        getSynchroCategories();
    }, [categoryListRequest]);

    const addCategory = () => {
        setCategoryNew(!categoryNew);
    };

    const removeCategory = async (roleId) => {
        const removeRoleResponse = (data) => {
            setCategoryList(data);
        };

        const data = await removeCategoryService({ id: roleId }, categoryListRequest);

        removeRoleResponse(data);
    };

    return (
        <>
            <div className="row row-m0">
                <CategoriesList
                    saveCategoryParent={(data) => {
                        saveCategorieParentService(data);
                    }}
                    categoryListData={categoryList}
                    categorySelected={(categoryId) => {
                        addCategory();
                        getCategory(categoryId);
                    }}
                    addNewCategory={() => {
                        addCategory();
                    }}
                />
                <section id="category-page" className="card col-xl-7">
                    <div className="tabs-container">
                        <Tabs
                            tabsData={tabsList}
                            activeTabKey={activeTab}
                            onTabChange={(activeTabKey) => {
                                setActiveTab(activeTabKey);
                            }}
                        />
                    </div>
                    <CategoryDetails
                        categoryListData={categoryList}
                        categorySynchroListData={categorySynchroList}
                        saveCategory={(data) => {
                            saveCategoryDetailsService(data);
                        }}
                        categoryData={categoryDetailsData}
                        addCategory={categoryNew}
                        removeCategory={(id) => {
                            removeCategory(id);
                        }}
                    />
                </section>
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default CategoriesPage;
