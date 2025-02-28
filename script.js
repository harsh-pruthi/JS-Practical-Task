const teamContainer = document.getElementById('teamContainer');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const viewBtnText = document.getElementById('viewBtnText');

let allTeamMembers = [];
let isViewingAll = false;
const count = 4;

async function fetchTeamData() {
    try {
        const response = await fetch('team-data.json');
        const data = await response.json();
        allTeamMembers = data.teamSection.members;
        displayTeamMembers();
    } catch (error) {
        console.error('Error loading team data:', error);
    }
}

function displayTeamMembers() {
    const membersToShow = isViewingAll ? allTeamMembers : allTeamMembers.slice(0, count);
    
    const teamHTML = membersToShow.map(member => `
        <div class="mem-1 flex flex-col gap-4">
            <img src="${member.image}" alt="${member.name}">
            <div class="text">
                <p class="text-xl font-medium">${member.name}</p>
                <p class="text-m">${member.role}</p>
            </div>
        </div>
    `).join('');

    teamContainer.innerHTML = teamHTML;
}

function toggleView() {
    isViewingAll = !isViewingAll;
    viewBtnText.textContent = isViewingAll ? 'View Less' : 'View All';
    displayTeamMembers();
}

viewToggleBtn.addEventListener('click', toggleView);

document.addEventListener('DOMContentLoaded', fetchTeamData);
