//get elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
const items = document.querySelector(".items");
const submtiBtn = document.getElementById("submitBtn");
let editedItemID = 0;
const url = 'https://6130d77b8066ca0017fdaac2.mockapi.io/items';

//load items

document.addEventListener('DOMContentLoaded', function (){
    //fir a function of get items API
    getItemsAPI(showItems);
    //callback function
})

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
    console.log(items);
    items.forEach( item => {
        console.log(item);
        info += `<!-- single item -->

                    <li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
                        <img src="${item.avatar}" id='itemImage' class='itemImage img-thumbnail' alt="">
                        <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
                        <div class="icons">

                            <a href='#' class="itemIcon mx-2 edit-icon" data-id='${item.id}'>
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href='#' class="itemIcon mx-2 delete-icon" data-id=''>
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </li>
                    <!-- end of single item -->`;
    })
       itemList.innerHTML = info;
}