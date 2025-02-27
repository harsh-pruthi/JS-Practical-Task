const emailInput = document.getElementById('emailInput');
const signUpButton = document.getElementById('signUpButton');
const popup = document.getElementById('subscriptionPopup');
const closePopupButton = document.getElementById('closePopup');
const popupMessage = document.getElementById('popupMessage');
const warningMessage = document.getElementById('warningMessage');



function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
}

function hidePopup() {
    popup.classList.add('hidden');
    emailInput.value = '';
    warningMessage.textContent = '';
}

function showWarning(message) {
    warningMessage.textContent = message;
}

signUpButton.addEventListener('click', () => {
    const email = emailInput.value.trim();
    
    if (!email) {
        showWarning('Please enter an email address');
        return;
    }

    if (!isValidEmail(email)) {
        showWarning('Please enter a valid email address');
        return;
    }

    warningMessage.textContent = '';
    
    showPopup(`${email} is successfully subscribed to the mailing list.`);
});

closePopupButton.addEventListener('click', hidePopup);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hidePopup();
    }
});

emailInput.addEventListener('input', () => {
    warningMessage.textContent = '';
});