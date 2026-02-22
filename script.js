let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count')
let rejectedCount = document.getElementById('rejected-count');

let allFilterBtn = document.getElementById('all-filter-btn');
let interviewsFilterBtn = document.getElementById('interviews-filter-btn');
let rejectedFilterBtn = document.getElementById('rejected-filter-btn');
let mainContainer = document.querySelector('main');
const allCardSection = document.getElementById('allCards');


const filterSection = document.getElementById('filtered-section');
const tabJobsCount = document.getElementById('tab-jobs-count');
let totalJobsCount = document.getElementById('total-jobs-count');

function updateTabJobsCount() {
    let count = 8;

    if (currentStatus === 'all-filter-btn') {
        count = allCardSection.children.length;
    } else if (currentStatus === 'interviews-filter-btn') {
        count = interviewList.length;
    } else if (currentStatus === 'rejected-filter-btn') {
        count = rejectedList.length;
    }

    tabJobsCount.innerText = count;
}

updateTabJobsCount()

function calculateCount() {
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
    totalJobsCount.innerText = allCardSection.children.length
}

calculateCount()


function toggleStyle(id) {
    // all button colors are set 
    allFilterBtn.classList.add('bg-white', 'text-gray-500');
    interviewsFilterBtn.classList.add('bg-white', 'text-gray-500');
    rejectedFilterBtn.classList.add('bg-white', 'text-gray-500');

    // if any button has blue then remove
    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewsFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

    const selected = document.getElementById(id)

    currentStatus = id
    console.log(currentStatus);

    // adding blue bg for current button
    selected.classList.remove('bg-white', 'text-gray-500');
    selected.classList.add('bg-blue-500', 'text-white');

    if (id == 'interviews-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected()
    }

    const tabCountWrapper = document.getElementById('tab-count-wrapper');
    if (id === 'all-filter-btn') {
        tabCountWrapper.classList.add('hidden');
    } else {
        tabCountWrapper.classList.remove('hidden');
    }

    updateTabJobsCount();
}



mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        // const hasParentNode = event.target.parentNode.parentNode;
        const hasParentNode = event.target.closest('.flex.justify-between.bg-white');

        const jobName = hasParentNode.querySelector('.job-name').innerText
        const jobType = hasParentNode.querySelector('.job-type').innerText
        const remoteFullTime = hasParentNode.querySelector('.remote-full-time').innerText
        const status = hasParentNode.querySelector('.status').innerText
        const notes = hasParentNode.querySelector('.notes').innerText

        hasParentNode.querySelector('.status').innerText = 'Interview';



        const cardInfo = {
            jobName,
            jobType,
            remoteFullTime,
            status: 'Interview',
            notes
        }

        const jobExist = interviewList.find(item => item.jobName == cardInfo.jobName)

        if (!jobExist) {
            interviewList.push(cardInfo)
            console.log('Added:', cardInfo);
            console.log('Current interviewList:', interviewList);
        }

        rejectedList = rejectedList.filter(item => item.jobName != cardInfo.jobName)

        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
        }

        calculateCount()
        updateTabJobsCount()

    } else if (event.target.classList.contains('rejected-btn')) {
        // const hasParentNode = event.target.parentNode.parentNode;
        const hasParentNode = event.target.closest('.flex.justify-between.bg-white');

        const jobName = hasParentNode.querySelector('.job-name').innerText
        const jobType = hasParentNode.querySelector('.job-type').innerText
        const remoteFullTime = hasParentNode.querySelector('.remote-full-time').innerText
        const status = hasParentNode.querySelector('.status').innerText
        const notes = hasParentNode.querySelector('.notes').innerText

        hasParentNode.querySelector('.status').innerText = 'Rejected';



        const cardInfo = {
            jobName,
            jobType,
            remoteFullTime,
            status: 'Rejected',
            notes
        }
        const jobExist = rejectedList.find(item => item.jobName == cardInfo.jobName)

        if (!jobExist) {
            rejectedList.push(cardInfo)
            console.log('Added:', cardInfo);
            console.log('Current rejectedList:', rejectedList);
        }

        interviewList = interviewList.filter(item => item.jobName != cardInfo.jobName)

        if (currentStatus == "interviews-filter-btn") {
            renderInterview();
        }
        calculateCount()
        updateTabJobsCount()
    } else if (event.target.closest('.fa-trash')) {
        const cardDiv = event.target.closest('.flex.justify-between.bg-white');
        const jobName = cardDiv.querySelector('.job-name').innerText;

        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        cardDiv.remove();

        if (currentStatus === 'interviews-filter-btn') {
            renderInterview();
        } else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }

        calculateCount();
        updateTabJobsCount();
    }
})


function renderInterview() {
    filterSection.innerHTML = ''

    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'flex justify-between bg-white w-full rounded-md p-5 my-5'
        div.innerHTML = `
            <div class="">
                <h2 class="job-name text-lg font-bold">${interview.jobName}</h2>
                <p class="job-type text-gray-500">${interview.jobType}</p>
                <p class="remote-full-time text-gray-500 py-3">${interview.remoteFullTime}</p>
                <button class="status btn py-2 px-6 font-bold bg-blue-100 rounded-md text-blue-500 mt-5">${interview.status}</button>
                <p class="notes text-gray-500 py-7">${interview.notes}</p>
                <div class="flex space-x-2">
                    <button class="interview-btn btn py-2 px-4 outline-1 rounded-md text-green-500 cursor-pointer"
                        >INTERVIEW</button>
                    <button class="rejected-btn btn py-2 px-4 outline-1 rounded-md text-red-500 cursor-pointer">REJECTED</button>
                </div>
            </div>
            <div class="p-3 block text-gray-400 cursor-pointer">
                <i class="fa-solid fa-trash"></i>
            </div>
        `
        filterSection.appendChild(div);
    }

}


function renderRejected() {
    filterSection.innerHTML = ''

    for (let rejected of rejectedList) {

        let div = document.createElement('div');
        div.className = 'flex justify-between bg-white w-full rounded-md p-5 my-5'
        div.innerHTML = `

        <div class="">
                <h2 class="job-name text-lg font-bold">${rejected.jobName}</h2>
                <p class="job-type text-gray-500">${rejected.jobType}</p>
                <p class="remote-full-time text-gray-500 py-3">${rejected.remoteFullTime}</p>
                <button class="status btn py-2 px-6 font-bold bg-blue-100 rounded-md text-blue-500 mt-5">${rejected.status}</button>
                <p class="notes text-gray-500 py-7">${rejected.notes}</p>
                <div class="flex space-x-2">
                    <button class="interview-btn btn py-2 px-4 outline-1 rounded-md text-green-500 cursor-pointer"
                        >INTERVIEW</button>
                    <button class="rejected-btn btn py-2 px-4 outline-1 rounded-md text-red-500 cursor-pointer">REJECTED</button>
                </div>
            </div>
            <div class="p-3 block text-gray-400 cursor-pointer">
                <i class="fa-solid fa-trash"></i>
            </div>
        `
        filterSection.appendChild(div);
    }
}

toggleStyle('all-filter-btn');