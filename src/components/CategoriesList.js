import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import { remappingCategoriesName } from "../helpers/functions";

const CategoriesList = ({ categoryListData, saveCategoryParent, categorySelected, addNewCategory }) => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        let remappedData = remappingCategoriesName(categoryListData);
        const listOpenedItems = getExpendedIds(categoryList, "expanded");
        if (listOpenedItems.length > 0) {
            remappedData = setExpendedForIds(remappedData, listOpenedItems, "id");
        }
        setCategoryList(JSON.parse(JSON.stringify(remappedData)));
    }, [categoryListData]);

    const setExpendedForIds = (tree, value, key = "id", reverse = false) => {
        let returnData = tree;

        for (const elem in tree) {
            let stack = [tree[elem]];
            while (stack.length) {
                const node = stack[reverse ? "pop" : "shift"]();
                if (value.includes(node[key])) {
                    node.expanded = true;
                }
                node.children && stack.push(...node.children);
            }
        }
        return returnData;
    };

    const getExpendedIds = (tree, reverse = false) => {
        let returnData = [];

        for (const elem in tree) {
            let stack = [tree[elem]];
            while (stack.length) {
                const node = stack[reverse ? "pop" : "shift"]();
                if (node.expanded) {
                    returnData = [...returnData, node.id];
                }
                node.children && stack.push(...node.children);
            }
        }
        return returnData;
    };

    const checkDragDropActionDown = (childCategoryId, parentCategoryId, down) => {
        const data = {
            id: childCategoryId,
            parent_id: parentCategoryId,
            down: down,
        };

        saveCategoryParent(data);
    };

    const checkDragDropActionUp = (childCategoryId, parentCategoryId, up) => {
        const data = {
            id: childCategoryId,
            parent_id: parentCategoryId,
            up: up,
        };

        saveCategoryParent(data);
    };

    const onCategoryClick = (id) => {
        categorySelected({ id: id });
    };

    const onCategoryChange = (changeData) => {
        if (changeData.nextParentNode === null) {
            checkUpDownCategory(changeData.treeData, changeData);
        } else {
            if (changeData.node.parent_id === changeData.nextParentNode.id) {
                checkUpDownCategory(changeData.nextParentNode.children, changeData);
            } else {
                for (const [index, item] of changeData.nextParentNode.children.entries()) {
                    if (item.id === changeData.node.id) {
                        const upNumber = changeData.nextParentNode.children.length - (index + 1);
                        checkDragDropActionUp(changeData.node.id, changeData.nextParentNode?.id ?? null, upNumber);
                        break;
                    }
                }
            }
        }
    };

    const checkUpDownCategory = (dataForLoop, changeData) => {
        let up = -1;
        let down = -1;
        for (const [index, item] of dataForLoop.entries()) {
            if (changeData.node._rgt < item._rgt) {
                if (0 > down) {
                    down = index;
                }
            }
            if (changeData.node._rgt < item._rgt) {
                if (up > -1) {
                    up = index - 1 - up;
                    checkDragDropActionUp(changeData.node.id, changeData.nextParentNode?.id ?? null, up);
                    break;
                }
            } else if (index === dataForLoop.length - 1) {
                if (up > -1) {
                    up = index - up;
                    checkDragDropActionUp(changeData.node.id, changeData.nextParentNode?.id ?? null, up);
                    break;
                }
            }
            if (item.id === changeData.node.id) {
                if (changeData.node.parent_id !== null && changeData.nextParentNode === null) {
                    const upNumber = dataForLoop.length - index - 1;
                    checkDragDropActionUp(changeData.node.id, changeData.nextParentNode?.id ?? null, upNumber);
                    break;
                } else if (changeData.nextTreeIndex < changeData.prevTreeIndex) {
                    up = index;
                } else {
                    down = -(down - index);
                    checkDragDropActionDown(changeData.node.id, changeData.nextParentNode?.id ?? null, down);
                    break;
                }
            }
        }
    };

    return (
        <div className="col-xl-5 col-pr-2">
            <div id="category-page" className="card">
                <h4>Pregled kategorija</h4>
                <button className="btn-control save-btn add-category" onClick={() => addNewCategory()}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    Nova kategorija
                </button>
                <div className="filters-box-holder">
                    {/* <div
                        onDrop={(event) => onDropTodo(event)}
                        onDragOver={(event) => onDragOverTodo(event)}
                    >
                        <CategoryTreeDropdowns data={categoryList}/>
                    </div> */}
                    <SortableTree
                        isVirtualized={false}
                        treeData={categoryList}
                        onChange={(data) => {
                            setCategoryList(data);
                        }}
                        onMoveNode={(moveData) => onCategoryChange(moveData)}
                        generateNodeProps={({ node }) => ({
                            buttons: [
                                <button className="tree-button" onClick={() => onCategoryClick(node.id)}>
                                    {node.title}
                                </button>,
                            ],
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoriesList;
