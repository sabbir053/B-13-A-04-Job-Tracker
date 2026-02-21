let interviewList = [];
let rejectedList = [];
let currentStatus = 'all'

let allFilterBtn = document.getElementById('all-filter-btn');
let interviewsFilterBtn = document.getElementById('interviews-filter-btn');
let rejectedFilterBtn = document.getElementById('rejected-filter-btn');
let mainContainer = document.querySelector('main');
const allCardSection = document.getElementById('allCards');


const filterSection = document.getElementById('filtered-section')


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


    // filtering while clicking the filter button (All, Interview, Rejected)
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
}



mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const hasParentNode = event.target.parentNode.parentNode;

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

        // removing the plant from struggling list
        rejectedList = rejectedList.filter(item => item.jobName != cardInfo.jobName)

        // after remove rerender the html
        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
        }

        // calculateCount()

    } else if (event.target.classList.contains('rejected-btn')) {
        const hasParentNode = event.target.parentNode.parentNode;

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

        // removing the plant from thriving list
        interviewList = interviewList.filter(item => item.jobName != cardInfo.jobName)

        // after remove rerender the html
        if (currentStatus == "interviews-filter-btn") {
            renderInterview();
        }
        // calculateCount()

    }
})


function renderInterview() {
    filterSection.innerHTML = ''

    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
            <div class="flex justify-between bg-white w-full rounded-md p-5">
                <div class="">
                    <h2 class="job-name text-lg font-bold">${interview.jobName}</h2>
                    <p class="job-type text-gray-500">${interview.jobType}</p>
                    <p class="remote-full-time text-gray-500 py-3">${interview.remoteFullTime}</p>
                    <button class="status btn py-2 px-6 font-bold bg-blue-100 rounded-md text-blue-500 mt-5">${interview.status}</button>
                    <p class="notes text-gray-500 py-7">${interview.notes}</p>
                    <div class="flex space-x-2">
                        <button class="interview-btn btn py-2 px-4 outline-1 rounded-md text-green-500 cursor-pointer"
                            id="interview-btn">INTERVIEW</button>
                        <button class="rejected-btn btn py-2 px-4 outline-1 rounded-md text-red-500 cursor-pointer">REJECTED</button>
                    </div>
                </div>
                <div class="p-3 block text-gray-400 cursor-pointer">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `
        filterSection.appendChild(div);
    }

}


function renderRejected() {
    filterSection.innerHTML = ''

    for (let rejected of rejectedList) {
        console.log(rejected);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
            <div class="flex justify-between bg-white w-full rounded-md p-5">
                <div class="">
                    <h2 class="job-name text-lg font-bold">${rejected.jobName}</h2>
                    <p class="job-type text-gray-500">${rejected.jobType}</p>
                    <p class="remote-full-time text-gray-500 py-3">${rejected.remoteFullTime}</p>
                    <button class="status btn py-2 px-6 font-bold bg-blue-100 rounded-md text-blue-500 mt-5">${rejected.status}</button>
                    <p class="notes text-gray-500 py-7">${rejected.notes}</p>
                    <div class="flex space-x-2">
                        <button class="interview-btn btn py-2 px-4 outline-1 rounded-md text-green-500 cursor-pointer"
                            id="interview-btn">INTERVIEW</button>
                        <button class="rejected-btn btn py-2 px-4 outline-1 rounded-md text-red-500 cursor-pointer">REJECTED</button>
                    </div>
                </div>
                <div class="p-3 block text-gray-400 cursor-pointer">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `
        filterSection.appendChild(div);
    }
}