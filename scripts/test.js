let viewButton = document.getElementById('view-car');
let carBanner = document.getElementById('car-banner');

function showCar(){
    carBanner.classList.remove('hidden');
}

viewButton.addEventListener('click',showCar());