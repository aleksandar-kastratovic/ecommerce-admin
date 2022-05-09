import deepRenameKeys from "deep-rename-keys";

export const addTabName = (tabsList, tabData) => {
    let data;
    for (const elem in tabsList) {
        if (tabsList[elem] !== undefined) {
            if (tabsList[elem].eventKey === tabData.id) {
                data = tabsList;
                if (tabData.full_name) {
                    data[elem].title = tabData.full_name;
                } else if (tabData.name) {
                    data[elem].title = tabData.name;
                } else if (tabData.attribute_name) {
                    data[elem].title = tabData.attribute_name;
                } else if (tabData.company_name) {
                    data[elem].title = tabData.company_name;
                }
                data[elem].order = tabsList[tabsList.length -1].order + 1;
            };
        };
    };
    return data;
};

export const remappingCategories = (data) => {
  const tree = deepRenameKeys(data, (key) => {
    if (key === "name") return "label";
    if (key === "id") return "value";

    return key;
  });

  return tree;
};

export const remappingCategoriesName = (data) => {
    const tree = deepRenameKeys(data, (key) => {
        if (key === "name") return "title";
  
        return key;
    });
  
    return tree;
};

export const imageForId = (gallery, id) => {
    let url = null;

    for (const item of gallery) {
        if (item.id === id) {
            url = item.image_url;
            break 
        }
    }
    return url;
}

