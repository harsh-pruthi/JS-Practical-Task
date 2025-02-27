const scrollToTopBtn = document.getElementById("scrollToTop");

scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});