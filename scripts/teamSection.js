const teamContainer = document.getElementById('teamContainer');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const viewBtnText = document.getElementById('viewBtnText');
const viewTeamBtn = document.getElementById('team-arrow');

let allTeamMembers = [];
let isViewingAll = false;
const count = 4;

async function fetchTeamData() {
    try {
        const response = await fetch('json/team-data.json');
        const data = await response.json();
        allTeamMembers = data.members;
        displayTeamMembers();
    } catch (error) {
        console.error('Error loading team data:', error);
    }
}

function displayTeamMembers() {
    const membersToShow = isViewingAll ? allTeamMembers : allTeamMembers.slice(0, count);
    
    const teamHTML = membersToShow.map(member => `
        <div class="mem-1 flex flex-col gap-3 sm:gap-4">
            <img src="${member.image}" class="w-full object-cover rounded-lg" alt="${member.name}">
            <div class="text">
                <p class="text-lg sm:text-xl font-medium">${member.name}</p>
                <p class="text-sm sm:text-m">${member.role}</p>
            </div>
        </div>
    `).join('');

    teamContainer.innerHTML = teamHTML;
}

function toggleView() {
    isViewingAll = !isViewingAll;
    viewBtnText.textContent = isViewingAll ? 'View Less' : 'View All';
    isViewingAll?viewTeamBtn.classList.add('rotate-90'):viewTeamBtn.classList.remove('rotate-90');
    displayTeamMembers();
}

viewToggleBtn.addEventListener('click', toggleView);

document.addEventListener('DOMContentLoaded', fetchTeamData);
