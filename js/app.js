//get elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
//const items = document.querySelector(".items");
const submitBtn = document.getElementById("submitBtn");
let editedItemID = 0;
const url = 'https://6130d77b8066ca0017fdaac2.mockapi.io/items';


submitBtn.addEventListener('click', submitItem);
//submit item
 function submitItem(event){
     event.preventDefault();
     const itemValue = itemInput.value;
     const imageValue = imageInput.value;
     if(itemValue.length === 0 || imageValue.length === 0){
         showFeedback('please inter valid values');
     } else {
        postItemAPI(itemValue, imageValue);
         itemInput.value = '';
         imageInput.value = '';
     }
 }





//load items

document.addEventListener('DOMContentLoaded', function (){
    //fire a function of get items API
    getItemsAPI(showItems);
    //callback function
})

//show feedback

function showFeedback (text){
     feedback.classList.remove('feedback');
     feedback.innerHTML = `<span>${text}</span>`;
     setTimeout(function(){
         feedback.classList.add('feedback');
     }, 3000)

}



//get items

function getItemsAPI(cb){
    const xhr = new XMLHttpRequest();
    xhr.onload = function (){
        if(xhr.status === 200) {
            cb(xhr.responseText);
        }
    }
    xhr.onerror = function(){
        console.log('There is an error');
    }
    xhr.open('GET', url, true);
    xhr.send();

}

//show items

function showItems(data){
    let info = '';
    const items = JSON.parse(data);
    items.forEach( item => {
        info += `<!-- single item -->

                    <li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
                        <img src="${item.avatar}" id='itemImage' class='itemImage img-thumbnail' alt="">
                        <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
                        <div class="icons">

                            <a href='#' class="itemIcon mx-2 edit-icon" data-id='${item.id}'>
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href='#' class="itemIcon mx-2 delete-icon" data-id='${item.id}'>
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </li>
                    <!-- end of single item -->`;
    })
       itemList.innerHTML = info;
        //get icons
        getIcons();
}

//post items

function postItemAPI (item, image) {
    const avatar = `img/${image}.jpeg`;
    const name = item;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function (){
        getItemsAPI(showItems);
    }
    xhr.onerror = function(){
        console.log('There is an error');
    }

    xhr.send(`avatar=${avatar}&name=${name}`);
}

function getIcons(){
     const editIcon = Array.from(document.querySelectorAll('.edit-icon'));
     const deleteIcon = Array.from(document.querySelectorAll('.delete-icon'));
    deleteIcon.forEach(function(icon) {
        const iconID = icon.getAttribute('data-id');
        icon.addEventListener('click', function(event){
            event.preventDefault();
            console.log(iconID);
            deleteItemAPI(iconID);
        })
    })
    editIcon.forEach(function(icon) {
        const iconID = icon.getAttribute('data-id');
        icon.addEventListener('click', function(event){
            event.preventDefault();
            const parent = event.target.parentElement.parentElement.parentElement;
            const img = parent.querySelector('.itemImage').src;
            const name = parent.querySelector('.itemName').textContent;
            console.log(img, name, iconID);
            editItem(parent, img, name, iconID);
        })
    })

}

function editItemAPI(id){

}

function deleteItemAPI(id){
     const deleteUrl = url+'/' +id;
    const xhr = new XMLHttpRequest();
    xhr.onload = function (){
        if(xhr.status === 200) {
            console.log(xhr.responseText);
            getItemsAPI(showItems);
        }
    }
    xhr.onerror = function(){
        console.log('There is an error');
    }
    xhr.open('DELETE', deleteUrl, true);
    xhr.send();

}

function editItem(parent, itemImg, name, iconID){
    event.preventDefault();
    itemList.removeChild(parent);

}