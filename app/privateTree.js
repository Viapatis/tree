define(['lodash','./templates'],function (_,{templateElement}) {

    function editSelectionElement(elem,status){
        const checkbox=elem.getElementsByClassName('elem-checkbox')[0];
        switch(status){
            case 'checked':
                checkbox.checked = true;
                break;
            case 'disabled':
                checkbox.checked = false;
                checkbox.disabled = true;
                break;
            case 'enabled':
                checkbox.disabled = false;
                checkbox.checked = false;
                break;
        }
    }
    function onChangeCheckbox(event) {
        const checkbox=event.target;
        changeSelectedElements(checkbox.parentElement.parentElement,checkbox.checked);
    }
    function changeSelectedElements(elem,checked){
        const treeElements=elem.getElementsByClassName('tree-elem');
        _.forEach(treeElements,(treeElement)=>{
            const checkboxStatus=checked ? 'disabled':'enabled';
            editSelectionElement(treeElement,checkboxStatus)
        });
    }
    function onChangeHide(event) {
        const checkbox=event.target;
        const subElems=checkbox.parentElement.parentElement.getElementsByClassName('sub-elems-list')[0];
        subElems.hidden=!subElems.hidden;
    }

    return {
        PrivateTree:class {
            static numArrToStr(arr) {
                return arr.map((id) => {
                    return "" + id;
                })
                    .join(',');
            }

            static strToNumArr(str) {
                const arr = str.split(',')
                    .filter((i) => {
                        return i !== "";
                    });
                return arr.map((id) => {
                    return +id;
                });
            }

            static getIdSelectedElement(treeElements) {
                const idList = [];
                treeElements.forEach((treeElement) => {
                    const treeElementCheckbox = treeElement.html.getElementsByClassName('elem-checkbox')[0];
                    if (treeElementCheckbox.checked) {
                        idList.push(treeElement.id);
                    }
                });
                return idList;
            }

            static changeSelectionChildren(elements, childrenId) {
                let allChildrenId = childrenId;
                if (allChildrenId.length !== 0) {
                    const children = elements.filter((element) => {
                        return allChildrenId.find((id) => id === element.id) !== undefined;
                    });
                    children.forEach((child) => {
                        editSelectionElement(child.html, "disabled");
                        const childId = this.changeSelectionChildren(elements, child.childrenId);
                        allChildrenId = allChildrenId.concat(childId);
                    });
                }
                return allChildrenId;
            }

            static selectElementsFromList(treeElements, idList) {
                let checkedList=idList;
                treeElements.forEach((treeElement, i, treeElements) => {
                    const {id, html, childrenId} = treeElement;
                    const checked = (checkedList.find((index) => id === index) !== undefined);
                    if (checked) {
                        editSelectionElement(html, "checked");
                        if (childrenId !== []) {
                            const allChildrenId = this.changeSelectionChildren(treeElements, childrenId);
                            checkedList = _.difference(checkedList, allChildrenId);
                        }
                    }
                });
            }

            static createTreeElements(dataArr) {
                return dataArr.map((item,key) => {
                    const {id, title, parent} = {...item};
                    const treeElementHtml = document.createElement('div');
                    treeElementHtml.className = "tree-elem";
                    treeElementHtml.innerHTML = _.template(templateElement)({
                        title: title,
                        key:key
                    });
                    const treeElement = {
                        id: id,
                        html: treeElementHtml,
                        parent: parent,
                        childrenId: []
                    };
                    treeElement.html.getElementsByClassName('elem-checkbox')[0].onchange = onChangeCheckbox;
                    treeElement.html.getElementsByClassName('hide-subtree')[0].onchange =onChangeHide;
                    return treeElement;
                });
            }

            static createTree(elements, parent) {
                const elementsWithParent = elements.filter((treeElement) => {
                    return (treeElement.parent === parent)
                });
                elementsWithParent.forEach((treeElement) => {
                    const {id, html} = treeElement;
                    const subElements = this.createTree(elements, id);
                    if (subElements.length !== 0) {
                        treeElement.childrenId = subElements
                            .map((subElement) => {
                                const li=document.createElement('li');
                                li.appendChild(subElement.html);
                                html.getElementsByClassName('sub-elems-list')[0].appendChild(li);
                                return subElement.id;
                            });
                    }
                });
                return elementsWithParent;
            }
        }
    };
});