const brandsContainer = document.getElementById('brands-container');
const brandsToggleBtn = document.getElementById('brandsToggle');
const brandsBtnText = document.getElementById('brands-btn-txt');
const arrowBtn = document.getElementById('arrow-b');

let allBrands = [];
let isViewAll = false;
const viewCount = 6;

async function fetchData(){
    try{
        const response = await fetch('json/brands.json');
        const data = await response.json();
        allBrands = data.brands;
        displayBrands();
    }
    catch(error){
        console.log("Error in importing brands data json");
    }
}


function displayBrands(){

    const brandsArray = isViewAll?allBrands:allBrands.slice(0, viewCount);

    const brandsHTML = brandsArray.map(brand => `
        <div class="brand-card flex flex-col justify-center items-center gap-2 sm:gap-4 p-3 sm:p-4 border-2 border-[#E9E9E9] rounded-lg">
            <img src="${brand.image}" class="max-w-full h-auto" alt="brand-1">
            <p class="text-sm sm:text-l font-semibold text-center truncate">${brand.name}</p>
        </div> 
    `).join('');
    
    brandsContainer.innerHTML = brandsHTML;
}

function toggleBrands(){
    isViewAll = !isViewAll;
    brandsBtnText.textContent = isViewAll?'View Less':'Show all brands';
    isViewAll?arrowBtn.classList.add('rotate-90'):arrowBtn.classList.remove('rotate-90');
    displayBrands();
}

brandsToggleBtn.addEventListener('click', toggleBrands);

document.addEventListener('DOMContentLoaded', fetchData);
