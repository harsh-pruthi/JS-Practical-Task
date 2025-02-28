const carContainer = document.getElementById('carCardsContainer');
const featuredViewAllBtn = document.getElementById('featuredViewAllBtn');
const featureViewText = document.getElementById('featureViewText');
const featureViewImg = document.getElementById('featureViewImg');
const usedCarsBtn = document.getElementById('used-cars');
const newCarsBtn = document.getElementById('new-cars');
const inStockBtn = document.getElementById('instock');
const featuredLBtn = document.getElementById('featuredLeft');
const featuredRBtn = document.getElementById('featuredRight');


let cars = [];
let viewAllCars = false;
let viewOption = 'all';
let start = 0;
let end = 4;


async function fetchCars() {
    try {
        const response = await fetch('json/cars.json');
        const data = await response.json();
        cars = data.cars;
        console.log(cars);
        renderCars(viewAllCars, viewOption);
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}

let carsList = [];

function renderCars(viewAll,viewOption){

    if(viewOption=='all'){
        if(viewAll){
            carsList = cars;
        }else{
            carsList = cars.slice(start,end);
        }
    }else if(viewOption=='usedCars'){
        carsList = cars.filter(car => car.condition === "Used Cars").slice(start,end);
        console.log(carsList);
    }else{
        carsList = cars.filter(car=>car.condition==="New Cars").slice(start,end);
        console.log(carsList);
    }


    const carCards = carsList.map(car => {
        return `
            <div class="card flex flex-col gap-2 rounded-lg border-1 border-[#E1E1E1] overflow-hidden">
                <img src="${car.image}" class="rounded-t-lg w-full object-cover" alt="${car.name}">
                <div class="text-content p-2 gap-2">
                    <p class="font-medium text-base sm:text-lg truncate">${car.name}</p>
                    <p class="font-regular text-xs sm:text-sm line-clamp-2">${car.tagline}</p>
                </div>
                <div class="fact-icons p-2 border-t-1 border-b-1 border-[#E1E1E1] flex gap-1 sm:gap-2 justify-around items-center">
                    <div class="icon-1 flex flex-col gap-1 sm:gap-2 items-center justify-center">
                        <img src="assets/featured-listing/icons/mil.svg" class="h-[20px] w-[30px] sm:h-[30px] sm:w-[40px]" alt="">
                        <p class="text-xs sm:text-m">${car.mileage}</p>
                    </div>
                    <div class="icon-1 flex flex-col gap-1 sm:gap-2 items-center justify-center">
                        <img src="assets/featured-listing/icons/fuel.svg" class="h-[20px] w-[30px] sm:h-[30px] sm:w-[40px]" alt="">
                        <p class="text-xs sm:text-m">${car.fuel}</p>
                    </div>
                    <div class="icon-1 flex flex-col gap-1 sm:gap-2 items-center justify-center">
                        <img src="assets/featured-listing/icons/gear.svg" class="h-[20px] w-[30px] sm:h-[30px] sm:w-[40px]" alt="">
                        <p class="text-xs sm:text-m">${car.gear}</p>
                    </div>
                </div>
                <div class="checkout p-2 flex flex-wrap sm:flex-nowrap justify-between sm:justify-around items-center">
                    <p class="text-base sm:text-lg font-bold">${car.price}</p>
                    <button class="flex gap-1 sm:gap-2 items-center justify-center p-1 sm:p-2">
                        <p class="text-sm sm:text-md text-[#405FF2]">View Details</p>
                        <img src="assets/featured-listing/icons/blue-arrow.svg" alt="blue-arrow">
                    </button>
                </div>
            </div>
        `;
    }).join('');
    carContainer.innerHTML = carCards;
}

function viewAll(){
    viewAllCars = !viewAllCars;
    viewOption='all';
    viewAllCars?featureViewText.innerText='View Less':featureViewText.innerText='View All';
    viewAllCars?featureViewImg.classList.add('rotate-90'):featureViewImg.classList.remove('rotate-90');
    renderCars(viewAllCars, viewOption);
    
}

function usedCars(){
    viewOption='usedCars';
    renderCars(viewAllCars, viewOption);
}

function newCars(){
    viewOption = 'new';
    renderCars(viewAllCars, viewOption);
}

function inStock(){
    viewOption = 'all';
    renderCars(viewAllCars, viewOption);
}

function rBtnTrigger() {
    // Only increment if there are more cars to show
    if (end < cars.length) {
        start += 4;
        end += 4;
        
        // Ensure we don't go beyond the array bounds
        if (end > cars.length) {
            end = cars.length;
            start = end - 4;
        }
    } else {
        // Reset to beginning when we reach the end
        start = 0;
        end = 4;
    }
    
    renderCars(viewAllCars, viewOption);
}

function lBtnTrigger() {
    if (start > 0) {
        start -= 4;
        end -= 4;
        
        if (start < 0) {
            start = 0;
            end = 4;
        }
    } else {
        end = cars.length;
        start = Math.max(0, end - 4);
    }
    
    renderCars(viewAllCars, viewOption);
}


featuredViewAllBtn.addEventListener('click',viewAll);
usedCarsBtn.addEventListener('click',usedCars);
newCarsBtn.addEventListener('click', newCars);
inStockBtn.addEventListener('click', inStock);
featuredRBtn.addEventListener('click', rBtnTrigger);
featuredLBtn.addEventListener('click', lBtnTrigger);


document.addEventListener('DOMContentLoaded', fetchCars);

