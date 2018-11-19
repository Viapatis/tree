define(['./privateTree'],function ({PrivateTree}) {
    let count=0;
    return {
        Tree:class {
            constructor(elem){
                this.elem= elem;
                this.count=++count;
            }

            set data(inputData){
                const dataArr=JSON.parse(inputData);
                this.treeElements=PrivateTree.createTreeElements(dataArr,this.count);
                this.treeRoot=document.createElement('div');
                this.treeRoot.className='tree-root';
                PrivateTree.createTree(this.treeElements,null).forEach( (treeElement)=>{
                    this.treeRoot.appendChild(treeElement.html);
                    });
            }

            set idCheckedList(idList){
                const checkedList=PrivateTree.strToNumArr(idList);
                PrivateTree.selectElementsFromList(this.treeElements,checkedList);
            }

            get idCheckedList(){
                const checkedList=PrivateTree.getIdSelectedElement(this.treeElements);
                return PrivateTree.numArrToStr(checkedList);
            }

            renderTree(){
                const link=document.createElement('link');
                link.rel="stylesheet";
                link.href="./style/tree.css";
                document.head.appendChild(link);
                this.elem.appendChild(this.treeRoot);
            }
        }

    };
});

