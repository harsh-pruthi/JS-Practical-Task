let searchCarsTrigger = document.getElementById('search-cars-trigger');
let searchCarsArrow = document.getElementById('search-cars-arrow');
let searchContainer = document.getElementById('search-container');

const searchInput = searchContainer.querySelector('input');
const searchButton = searchContainer.querySelector('button');
const searchResultsDiv = document.getElementById('search-results');

let visible = false;

function showSearchContainer(){
    visible=!visible;
    visible?searchContainer.classList.remove('hidden'):searchContainer.classList.add('hidden');
    visible?searchCarsArrow.classList.add('rotate-90'):searchCarsArrow.classList.remove('rotate-90');
}

searchCarsTrigger.addEventListener('click', function() {
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
        searchInput.focus();
    } else {
        searchResultsDiv.style.display = 'none';
    }
});

let carsData = [];
async function loadCarData() {
    try {
        const response = await fetch('json/cars.json');
        const data = await response.json();
        carsData = data.cars;
    } catch (error) {
        console.error('Error loading car data:', error);
    }
}
loadCarData(); 

function filterCars(searchTerm) {
    if (!searchTerm) return [];
    return carsData.filter(car => car.name.toLowerCase().includes(searchTerm));
}

function renderCarCard(car) {
    return `
        <div class="card flex flex-col gap-2 rounded-lg border-1 border-[#E1E1E1] bg-white mb-4">
            <div class="relative">
                <img src="${car.image}" class="rounded-t-lg w-full" alt="${car.name}">
            </div>
            <div class="text-content p-2 gap-2">
                <p class="font-medium text-lg text-black">${car.name}</p>
                <p class="font-regular text-sm text-gray-600">${car.tagline}</p>
            </div>
            <div class="fact-icons p-2 border-t-1 border-b-1 border-[#E1E1E1] flex gap-2 justify-around items-center">
                <div class="icon-1 flex flex-col gap-2 items-center justify-center">
                    <img src="assets/featured-listing/icons/mil.svg" class="h-[30px] w-[40px]" alt="">
                    <p class="text-m text-gray-700">${car.mileage}</p>
                </div>
                <div class="icon-1 flex flex-col gap-2 items-center justify-center">
                    <img src="assets/featured-listing/icons/fuel.svg" class="h-[30px] w-[40px]" alt="">
                    <p class="text-m text-gray-700">${car.fuel}</p>
                </div>
                <div class="icon-1 flex flex-col gap-2 items-center justify-center">
                    <img src="assets/featured-listing/icons/gear.svg" class="h-[30px] w-[40px]" alt="">
                    <p class="text-m text-gray-700">${car.gear}</p>
                </div>
            </div>
            <div class="checkout p-2 flex gap-2 items-center justify-around">
                <p class="text-lg font-bold text-black">${car.price}</p>
                <button class="flex gap-2 items-center justify-center p-2">
                    <p class="text-md text-[#405FF2]">View Details</p>
                    <img src="assets/featured-listing/icons/blue-arrow.svg" alt="blue-arrow">
                </button>
            </div>
        </div>
    `;
}

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResultsDiv.innerHTML = `
            <div class="flex gap-5 justify-between items-center mb-4">
                <p class="text-black">No cars found</p>
                <button class="close-search-results text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
    } else {
        let resultsHTML = `
            <div class="flex justify-between items-center mb-4">
                <button class="close-search-results cursor-pointer text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        `;
        
        results.forEach(car => {
            resultsHTML += renderCarCard(car);
        });
        
        resultsHTML += '</div>';
        searchResultsDiv.innerHTML = resultsHTML;
    }
    
    const closeButton = searchResultsDiv.querySelector('.close-search-results');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            searchResultsDiv.style.display = 'none';
        });
    }
    
    searchResultsDiv.style.display = 'block';
}

searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
        const results = filterCars(searchTerm);
        displaySearchResults(results);

});




searchCarsTrigger.addEventListener('click',showSearchContainer);



let autoBtn = document.getElementById('auto-btn');
let suvbtn = document.getElementById('suv-btn');
let elecBtn = document.getElementById('elec-btn');
let newStockBtn = document.getElementById('newStock-btn');
let petrolBtn = document.getElementById('petrol-btn');
let dieselBtn = document.getElementById('diesel-btn');



function renderAuto(){
    const autoCars = carsData.filter(car => car.gear === 'Automatic');
    displaySearchResults(autoCars);
}

function renderSuv(){
    const autoCars = carsData.filter(car => car.featuredModel === 'SUV');
    displaySearchResults(autoCars);
}

function renderElectric(){
    const autoCars = carsData.filter(car => car.fuel === 'Electric');
    displaySearchResults(autoCars);
}

function renderNewStock(){
    const autoCars = carsData.filter(car => car.stockCondition === 'NewInStock');
    displaySearchResults(autoCars);
}

function renderPetrol(){
    const autoCars = carsData.filter(car => car.fuel === 'Petrol');
    displaySearchResults(autoCars);
}

function renderDiesel(){
    const autoCars = carsData.filter(car => car.fuel === 'Diesel');
    displaySearchResults(autoCars);
}


autoBtn.addEventListener('click', renderAuto);
suvbtn.addEventListener('click', renderSuv);
elecBtn.addEventListener('click', renderElectric);
petrolBtn.addEventListener('click', renderPetrol);
dieselBtn.addEventListener('click', renderDiesel);
newStockBtn.addEventListener('click', renderNewStock);