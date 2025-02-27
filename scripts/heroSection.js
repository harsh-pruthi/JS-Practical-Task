const viewInventoryBtn = document.getElementById('viewInventoryBtn');
const contactUsBtn = document.getElementById('contactUsBtn');

viewInventoryBtn.addEventListener('click', function() {
    document.getElementById('featuredListing').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

contactUsBtn.addEventListener('click', function() {
    document.getElementById('contactMapDetails').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

document.getElementById("menuToggle").addEventListener("click", function() {
    document.getElementById("navMenu").classList.toggle("hidden");
});


function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email) && password) {
        document.getElementById('signInMessage').innerText = 'Sign In Successful!';
        setTimeout(() => {
            document.getElementById('subscriptionPopup').style.display = 'none';
        }, 1000);
    } else {
        document.getElementById('signInMessage').innerText = 'Invalid email or password.';
    }
}