const forms = document.getElementById("forms");
const text = document.getElementById("text");
const submit = document.getElementById("submit");
const material = document.getElementById("material");
const btns = document.getElementById("btn");
const clearBtn = document.getElementById("clearBtn");
const liTags = document.querySelectorAll("li");

const save = [];

window.addEventListener("DOMContentLoaded",function(){
    const getItems = localStorage.getItem('items');
    const parseObj =getItems? JSON.parse(getItems):[]; 
      
    // function test(){
    //     return getItems ? JSON.parse(getItems):[];
    // }

    parseObj.forEach(elm=>{
        save.push(elm)
        const loadElm = document.createElement('li');
        loadElm.innerHTML = `
        <span class="dummy">${elm.character}</span>
        <div>
            <i class="fa-solid fa-check"></i> 
            <i class="fa-solid fa-xmark"></i> 
        </div>
            `
            material.appendChild(loadElm);
        })
        

    //delete Btn 
    const getDeleteBtnLoaded = document.querySelectorAll(".fa-xmark");
    getDeleteBtnLoaded.forEach(elm=>{
        elm.addEventListener("click",function(e){
            let element = e.target.parentElement.parentElement;
            element.remove();
        })
    })

    const attr = document.createAttribute("state");
    attr.value = "active";

    let newLi;
    let newSpan;
    let editBtn;
    let deleteBtn;
    let btnContainer;
    submit.addEventListener("click",(e)=>{
        e.preventDefault();
        if(text.value == ''){
           ;//なにもしない
        }else{
            if(save.length>=0&&save.length<5){
                newLi = document.createElement('li');
                newSpan = document.createElement('span');
                editBtn = document.createElement('i');
                deleteBtn = document.createElement('i')
                btnContainer = document.createElement("div");
                editBtn.classList.add("fa-solid","fa-check");
                deleteBtn.classList.add("fa-solid","fa-xmark")
                btnContainer.classList.add("btn");
                newSpan.textContent=text.value
                newLi.setAttributeNode(attr.cloneNode());

                material.appendChild(newLi);
                newLi.appendChild(newSpan);
                newLi.appendChild(btnContainer);
                btnContainer.appendChild(editBtn);
                btnContainer.appendChild(deleteBtn);
                const value = newSpan.textContent;
                const obj = {character:value,id:attr.value};
                save.push(obj);//テキストだけを切り取って配列にいれた
                const convertObj = JSON.stringify(save);
                console.log(convertObj)
                localStorage.setItem('items',convertObj)

                //delete Btn 
                const getDeleteBtn = document.querySelectorAll(".fa-xmark");
                getDeleteBtn.forEach(elm=>{
                    elm.addEventListener("click",function(e){
                        let element = e.target.parentElement.parentElemen;
                        element.setAttribute("state","delete");
                        setDeltetItems(element)
                        let setToDeleteItems;
                        // setToDeleteItems= save.filter(itm=>{
                        //     if(itm.id!=delete){
                        //         return itm 
                        //     }
                        // })
                        //const obj = {character:value,id:};のidは変えられるか？
                        console.log(save)
                        element.remove();
                    })
                })
            }
        }
        text.value = '';
    })
    // Clear Items Btn 
    clearBtn.addEventListener("click",function(){
        localStorage.clear();
        material.innerHTML='';
    })

    //make new storage
//     function setDeltetItems(elm){
//         const test = elm.getAttribute("state")   
//     }
// })
