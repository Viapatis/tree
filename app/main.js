define(['./tree'],function ({Tree}) {
    const data=JSON.stringify([
            {"id": 2, "title": "level 1 [0]", "parent": 1},
            {"id": 3, "title": "level 1 [1]", "parent": 1},
            {"id": 5, "title": "level 3 [0.0.0]", "parent": 4},
            {"id": 4, "title": "level 2 [0.0]", "parent": 2},
            {"id": 1, "title": "root", "parent": null}
        ]);
    const root=document.getElementsByClassName('root')[0];
    const tree= new Tree(root);
    const tree1=new Tree(root);
    tree.data=data;
    tree1.data=data;
    tree.renderTree();
    tree1.renderTree();
    tree.idCheckedList="1,2,3";
    tree.idCheckedList="3";
    const idList=tree.idCheckedList;
    console.log(idList);
});
