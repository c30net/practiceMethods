//get elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
const submitBtn = document.getElementById("submitBtn");
let editedItemID = 0;
const url = 'https://6130d77b8066ca0017fdaac2.mockapi.io/items';


httpForm.addEventListener('submit', submitItem);



	//submit item(5)
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


	//show feedback(1)
	function showFeedback (text){
		 feedback.classList.add('showItem');
		 feedback.innerHTML = `<span>${text}</span>`;
		 setTimeout(function(){
			 feedback.classList.remove('showItem');
		 }, 3000)
	}



	//get items(2)
	function getItemsAPI(cb){
		
		const xhr = new XMLHttpRequest();
		
		xhr.open('GET', url, true);
		
		xhr.onload = function (){
			if(xhr.status === 200) {
				cb(xhr.responseText);
			}
		}
		
		xhr.onerror = function(){
			console.log('There is an error');
		}
		
		
		xhr.send();

	}

	//show items(3)
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





	//post items(4)
	function postItemAPI (img, itemName) {
		const avatar = `img/${img}.jpeg`;
		const name = itemName;

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
	
	
	//get icons(5)
	function getIcons(){
		 const editIcon = Array.from(document.querySelectorAll('.edit-icon'));
		 const deleteIcon = Array.from(document.querySelectorAll('.delete-icon'));
		deleteIcon.forEach(function(icon) {
			const itemID = icon.getAttribute('data-id');
			icon.addEventListener('click', function(event){
				event.preventDefault();
				deleteItemAPI(itemID);
			})
		})
		editIcon.forEach(function(icon) {
			const itemID = icon.getAttribute('data-id');
			icon.addEventListener('click', function(event){
				event.preventDefault();
				const parent = event.target.parentElement.parentElement.parentElement;
				const img = parent.querySelector('.itemImage').src;
				const name = parent.querySelector('.itemName').textContent;
				editItemUI(parent, img, name, itemID);
			})
		})

	}



	//delete user(6)
	function deleteItemAPI(id){
		 const deleteUrl = url+'/' +id;
		const xhr = new XMLHttpRequest();
		xhr.onload = function (){
			if(xhr.status === 200) {
				getItemsAPI(showItems);
			}
		}
		xhr.onerror = function(){
			console.log('There is an error');
		}
		xhr.open('DELETE', deleteUrl, true);
		xhr.send();

	}
	
	
	
	
	//edit user(7)
	function editItemUI(parent, itemImg, name, itemID){
		event.preventDefault();
		itemList.removeChild(parent);
		const imgIndex1 = itemImg.indexOf('g/');
		const imgIndex2 = itemImg.indexOf('.j');
		const img = itemImg.slice(imgIndex1+2, imgIndex2);
		itemInput.value = name.trim();
		imageInput.value = img;
		editedItemID = itemID;
		submitBtn.innerHTML = 'Edit Item';
		httpForm.removeEventListener('submit', submitItem);
		httpForm.addEventListener('submit', editItemAPI);
	}

	//function editItemAPI(8)
	function editItemAPI(){
		event.preventDefault();
		const id = editedItemID;
		
		const itemValue = itemInput.value;
		const imageValue = imageInput.value;
		
		if(itemValue.length === 0 || imageValue.length === 0){
			showFeedback('please inter valid values');
		} else {
			const img = `img/${imageValue}.jpeg`;
			const name = itemValue;
			const editUrl = url + '/' + id;
			
			const xhr = new XMLHttpRequest();
			
			xhr.open('PUT', editUrl, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onload = function (){
				reverseForm();
			}

			xhr.send(`avatar=${img}&name=${name}`);
		}
	}

	//reverse value for a fesh form(9)
	function reverseForm () {
		 itemInput.value = '';
		 imageInput.value = '';
		 submitBtn.innerHTML = 'Add Item';
		httpForm.removeEventListener('submit', editItemAPI);
		httpForm.addEventListener('submit', submitItem);
		getItemsAPI(showItems);
	}
















