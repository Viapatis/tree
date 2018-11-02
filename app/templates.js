define(function () {
    return{
        templateElement:
            `<div class = "elem-body">
                <input type="checkbox" class="hide-subtree" id="hide<%=key%>"/>
                <label for="hide<%=key%>">
                    <span class="hide-subtree-label" ></span>
                </label>
                <input type="checkbox" class="elem-checkbox" id="check<%=key%>"/>
                <label for="check<%=key%>">
                    <span class = "spanbox"><%=title%></span>
                </label>
             </div>
             <ul class = "sub-elems-list"></ul>`
    }
});
