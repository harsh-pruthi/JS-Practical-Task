const inventoryButton = document.getElementById('viewInventoryBtn');
const contactButton = document.getElementById('contactUsBtn');

inventoryButton.addEventListener('click', function() {
    document.getElementById('featuredListing').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

contactButton.addEventListener('click', function() {
    document.getElementById('contactMapDetails').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// document.getElementById("menuToggle").addEventListener("click", function() {
//     document.getElementById("navMenu").classList.toggle("hidden");
// });

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburgerBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
});


const harshContainer = document.getElementById('search-main-results');


let carDataList = [];
async function fetchCarData() {
    try {
        const response = await fetch('json/cars.json');
        const data = await response.json();
        carDataList = data.cars;
        console.log(carDataList);
    } catch (error) {
        console.error('Error loading car data:', error);
    }
}

fetchCarData(); 


function createCarCard(car) {
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

function showSearchResults(results) {
    if (results.length === 0) {
        harshContainer.innerHTML = `
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
            resultsHTML += createCarCard(car);
        });
        
        resultsHTML += '</div>';
        harshContainer.innerHTML = resultsHTML;
    }
    
    const closeButton = harshContainer.querySelector('.close-search-results');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            harshContainer.style.display = 'none';
        });
    }
    
    harshContainer.style.display = 'block';
}



let sedanButton = document.getElementById('sedanBtn');
let mainSuvButton = document.getElementById('suvBtnM');
let hatchbackButton = document.getElementById('hatchBtn');
let coupeButton = document.getElementById('coupe');
let hybridCarButton = document.getElementById('hybrid');


function handleSedan(){
    console.log("Hello")
    const automaticCars = carDataList.filter(car => car.featuredModel === 'Sedan');
    showSearchResults(automaticCars);
}

function handleSuvCars(){
    const suvCars = carDataList.filter(car => car.featuredModel === 'SUV');
    showSearchResults(suvCars);
}

function handleHatchBack(){
    const electricCars = carDataList.filter(car => car.featuredModel === 'Hatchback');
    showSearchResults(electricCars);
}

function handleNewStockCars(){
    const newStockCars = carDataList.filter(car => car.stockCondition === 'NewInStock');
    showSearchResults(newStockCars);
}

function handleCoupe(){
    const petrolCars = carDataList.filter(car => car.fuel === 'coupe');
    showSearchResults(petrolCars);
}

function handleHybrid(){
    const dieselCars = carDataList.filter(car => car.fuel === 'Hybrid');
    showSearchResults(dieselCars);
}

document.getElementById('menuToggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
  
  function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else {
      dropdown.classList.add('hidden');
    }
  }

sedanButton.addEventListener('click', handleSedan);
mainSuvButton.addEventListener('click', handleSuvCars);
hatchbackButton.addEventListener('click', handleHatchBack);
coupeButton.addEventListener('click', handleCoupe);
hybridCarButton.addEventListener('click', handleHybrid);

const signInButtons = document.querySelectorAll('.text-white, .text-black');
const signInModal = document.getElementById('signInModal');
const closeSignInModal = document.getElementById('closeSignInModal');
const signInForm = document.getElementById('signInForm');
const emailIn = document.getElementById('email');
const emailError = document.getElementById('emailError');
const signInSuccess = document.getElementById('signInSuccess');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

signInButtons.forEach(button => {
    if (button.textContent.trim() === "Sign In") {
        button.addEventListener('click', function() {
            signInModal.classList.remove('hidden');
        });
    }
});

closeSignInModal.addEventListener('click', function() {
    signInModal.classList.add('hidden');
    resetForm();
});

signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!emailRegex.test(emailIn.value)) {
        emailError.classList.remove('hidden');
        return;
    }
    
    emailError.classList.add('hidden');
    
    signInSuccess.classList.remove('hidden');
    
    setTimeout(function() {
        signInModal.classList.add('hidden');
        resetForm();
    }, 1000);
});

emailIn.addEventListener('input', function() {
    emailError.classList.add('hidden');
});

function resetForm() {
    signInForm.reset();
    emailError.classList.add('hidden');
    signInSuccess.classList.add('hidden');
}