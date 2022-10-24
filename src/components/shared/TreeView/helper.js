export const deepRemove = (data, id) => {
    return data
        .filter(({ id }) => id !== id)
        .map((e) => {
            return { ...e, children: deepRemove(e.children || [], id) };
        });
};

export const handleExpandedElements = (treeData) => {
    let expandedElements = treeData.map((element) => {
        return {
            ...element,
            expanded: element.expanded === true ? true : false,
            children: element?.children
                ? element?.children.map((subElement) => {
                      return {
                          ...subElement,
                          expanded: subElement.expanded === true ? true : false,
                      };
                  })
                : null,
        };
    });

    sessionStorage.setItem("treeItems", JSON.stringify(expandedElements));
};
