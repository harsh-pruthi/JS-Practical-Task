const videoTrigger = document.getElementById('videoTrigger');
const videoPopup = document.getElementById('videoPopup');
const closeVideo = document.getElementById('closeVideo');
const videoContainer = document.getElementById('videoContainer');
const videoId = 'dEFZw9KMpAA';

videoTrigger.addEventListener('click', () => {
    videoPopup.classList.remove('hidden');
    videoContainer.innerHTML = `<iframe class="h-full w-full" src="https://www.youtube.com/embed/dEFZw9KMpAA?si=f6RU5xuzh3ocXdM6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
});

const closeVideoPopup = () => {
    videoPopup.classList.add('hidden');
};

closeVideo.addEventListener('click', closeVideoPopup);

videoPopup.addEventListener('click', (e) => {
    if (e.target === videoPopup) {
        closeVideoPopup();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !videoPopup.classList.contains('hidden')) {
        closeVideoPopup();
    }
});


function scrollToContact() {
    document.getElementById('contactMapDetails').scrollIntoView({
        behavior: 'smooth'
    });
}