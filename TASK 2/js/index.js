
// List of supervisors
const supervisors = [
    { id: 1, name: "Dr. Smith", researchDomain: "AI", availableSlots: 2, contactInfo: "smith@university.com", bookmarked: false },
    { id: 2, name: "Prof. Johnson", researchDomain: "Web", availableSlots: 0, contactInfo: "johnson@university.com", bookmarked: false },
    { id: 3, name: "Dr. Lee", researchDomain: "Mobile", availableSlots: 3, contactInfo: "lee@university.com", bookmarked: false },
    { id: 4, name: "Prof. Brown", researchDomain: "Data", availableSlots: 1, contactInfo: "brown@university.com", bookmarked: false },
    { id: 5, name: "Dr. Davis", researchDomain: "AI", availableSlots: 0, contactInfo: "davis@university.com", bookmarked: false },
    { id: 6, name: "Prof. Wilson", researchDomain: "Web", availableSlots: 2, contactInfo: "wilson@university.com", bookmarked: false },
    { id: 7, name: "Dr. Taylor", researchDomain: "Mobile", availableSlots: 1, contactInfo: "taylor@university.com", bookmarked: false },
    { id: 8, name: "Prof. Anderson", researchDomain: "Data", availableSlots: 0, contactInfo: "anderson@university.com", bookmarked: false },
    { id: 9, name: "Dr. Martinez", researchDomain: "AI", availableSlots: 3, contactInfo: "martinez@university.com", bookmarked: false },
    { id: 10, name: "Prof. Garcia", researchDomain: "Web", availableSlots: 1, contactInfo: "garcia@university.com", bookmarked: false }
];

// Get HTML elements
const supervisorList = document.getElementById('supervisorList');
const domainFilter = document.getElementById('domainFilter');
const filterBtn = document.getElementById('filterBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
const itemsPerPage = 6;

// Show supervisors on the page
function showSupervisors(supervisorArray, page) {
    supervisorList.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentSupervisors = supervisorArray.slice(start, end);

    currentSupervisors.forEach(supervisor => {
        const div = document.createElement('div');
        div.className = 'bg-white p-4 rounded-lg border border-green-200';
        div.innerHTML = `
            <h3 class="text-lg font-bold text-green-700">${supervisor.name}</h3>
            <p class="text-gray-700">Area: ${supervisor.researchDomain}</p>
            <p class="text-gray-700">Slots: ${supervisor.availableSlots}</p>
            <p class="text-gray-700">Email: ${supervisor.contactInfo}</p>
            <button class="bookmark-btn mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" data-id="${supervisor.id}">
                ${supervisor.bookmarked ? 'Unbookmark' : 'Bookmark'}
            </button>
        `;
        supervisorList.appendChild(div);
    });

    prevBtn.style.display = page === 1 ? 'none' : 'inline';
    nextBtn.style.display = (page * itemsPerPage) >= supervisorArray.length ? 'none' : 'inline';
}

// Filter supervisors
function filterSupervisors() {
    const domain = domainFilter.value;
    let filtered = supervisors;

    if (domain) {
        filtered = filtered.filter(supervisor => supervisor.researchDomain === domain);
    }
    filtered = filtered.filter(supervisor => supervisor.availableSlots > 0);

    currentPage = 1;
    showSupervisors(filtered, currentPage);
}

// Bookmark a supervisor
function toggleBookmark(id) {
    const supervisor = supervisors.find(s => s.id === id);
    supervisor.bookmarked = !supervisor.bookmarked;
    filterSupervisors();
}

// Button clicks
filterBtn.addEventListener('click', filterSupervisors);

supervisorList.addEventListener('click', (e) => {
    if (e.target.classList.contains('bookmark-btn')) {
        const id = Number(e.target.getAttribute('data-id'));
        toggleBookmark(id);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterSupervisors();
    }
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    filterSupervisors();
});

// Start by showing all supervisors
showSupervisors(supervisors, currentPage);
