let searchCarsTrigger = document.getElementById('search-cars-trigger');
let searchCarsArrow = document.getElementById('search-cars-arrow');
let searchContainer = document.getElementById('search-container');

let visible = false;

function showSearchContainer(){
    visible=!visible;

    visible?searchContainer.classList.remove('hidden'):searchContainer.classList.add('hidden');
    visible?searchCarsArrow.classList.add('rotate-90'):searchCarsArrow.classList.remove('rotate-90');
}



searchCarsTrigger.addEventListener('click',showSearchContainer);