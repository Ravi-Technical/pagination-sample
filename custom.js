 
    const url = 'https://dummyjson.com/products';
	
	var itemsPerPage = 8;
	
	var currentPage = 1;
	
	var data = [] || null;
	
	var pagination = document.querySelector('.pagination');
	
	var row = document.querySelector('.row');
	
	var prevBtn = document.querySelector('#prev-btn'); 

	var nextBtn = document.querySelector('#next-btn');


	
	async function fetchData(){
		 const response = await fetch(url);
		 data = await response.json();
		 renderPage();
		 renderPagination();
	}
	
	// Render page
	function renderPage(){
		row.innerHTML = "";
		 let start = (currentPage-1) * itemsPerPage;
		 let end = start+itemsPerPage;
		 let modifiedProduct = data.products.slice(start, end);
		 let column = "";
		 modifiedProduct.forEach((item)=>{
			column = `
		   <div class="col-lg-3">
				<div class="inner-wrap">
					<img src="${item.thumbnail}" alt="${item.title}">
					  <h5>${item.title}</h5>
					  <p> $ ${item.price}</p>
					<button class="btn btn-primary">Add to card</button>
				</div>
			</div>
		 `;
          row.innerHTML += column;		 
		 });	
         updatePaginationControl();		 
	}
	
	// Update pagination Control
	function updatePaginationControl(){
		let totalCount = Math.ceil(data.products.length/itemsPerPage);
		prevBtn.classList?.toggle('disabled', currentPage===1);
		nextBtn.classList?.toggle('disabled', currentPage===totalCount);
	}
	
	// Control pagination
   function	renderPagination(){
	  	let perPageNumber = Math.ceil(data.products.length/itemsPerPage);
		for(let i=1; i<=perPageNumber; i++){
			let li = document.createElement('li');
			li.innerText = i;
			li.className = "page-item";
			if(i==1){
			   li.classList.add('active');
			}
			li.addEventListener('click', (e)=>{
				Array.from(pagination.querySelectorAll('.page-item')).forEach((item)=>{
					item.classList.remove("active");
				});
				e.target.classList.add("active");
				currentPage = i;
				renderPage();
			});
			
			pagination.appendChild(li);
		}
		pagination.prepend(prevBtn);
		pagination.append(nextBtn);
	}
	
	// Next Previous Button Handlers
	prevBtn.addEventListener('click', (e)=>{
	    Array.from(pagination.querySelectorAll('.page-item')).forEach((item)=>{
			  let modifyItem = parseInt(item.innerText);
			  item.classList.remove("active");
			  if(modifyItem == currentPage-1){
				  item.classList.add("active");
			  }
			});
			currentPage--;
			renderPage();
	});

	nextBtn.addEventListener('click', (e)=>{
	  let totalPage = Math.ceil(data.products.length/itemsPerPage);
	  if(currentPage < totalPage){
		  Array.from(pagination.querySelectorAll('.page-item')).forEach((item)=>{
			  let modifyItem = parseInt(item.innerText);
			  item.classList.remove("active");
			  if(modifyItem == currentPage+1){
				  item.classList.add("active");
			  }
			   
		  });		  
		currentPage++;
		renderPage();
	  }
	  
	});
	

	
	// Initialize app
	fetchData();
	
	