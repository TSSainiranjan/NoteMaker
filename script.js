let threads = [];

function loadThreadsFromLocalStorage() {
    const storedThreads = localStorage.getItem("threads");
    if (storedThreads) {
        threads = JSON.parse(storedThreads);
    }
}

function saveThreadsToLocalStorage() {
    localStorage.setItem("threads", JSON.stringify(threads));
}

function deleteThread(threadId) {
    // Find the index of the thread in the 'threads' array by its ID
    const threadIndex = threads.findIndex(thread => thread.id === threadId);

    if (threadIndex !== -1) {
        // Remove the thread from the 'threads' array
        threads.splice(threadIndex, 1);
        // Save the updated 'threads' array to Local Storage
        saveThreadsToLocalStorage();
        // Refresh the displayed threads
        displayThreads();
    }
}

function createThreadElement(thread) {
    const threadElement = document.createElement("div");
    threadElement.classList.add("thread");
    threadElement.innerHTML = `
        <h2>${thread.title}</h2>
        <p>${thread.content}</p>
        <button onclick="deleteThread(${thread.id})">Delete Note</button>
    `;
    return threadElement;
}




function displayThreads() {
    const threadsContainer = document.getElementById("threads-container");
    threadsContainer.innerHTML = "";

    threads.forEach(thread => {
        const threadElement = createThreadElement(thread);
        threadsContainer.appendChild(threadElement);
    });
}

function createNewThread(event) {
    event.preventDefault();

    const titleInput = document.getElementById("thread-title");
    const contentInput = document.getElementById("thread-content");

    const newThread = {
        id: threads.length + 1,
        title: titleInput.value,
        content: contentInput.value
    };

    threads.push(newThread);
    saveThreadsToLocalStorage();

    displayThreads();

    titleInput.value = "";
    contentInput.value = "";
}

function createThreadElement(thread) {
    const threadElement = document.createElement("div");
    threadElement.classList.add("thread");
    threadElement.innerHTML = `
        <h2>${thread.title}</h2>
        <p>${thread.content}</p>
        <button onclick="editThread(${thread.id})">Edit Note</button>
        <form id="edit-form-${thread.id}" style="display: none;">
            <input type="text" value="${thread.title}" required>
            <textarea required>${thread.content}</textarea>
            <button type="button" onclick="saveEdit(${thread.id})">Save</button>
            <button type="button" onclick="cancelEdit(${thread.id})">Cancel</button>
            <button type="button" onclick="deleteThread(${thread.id})">Delete Note</button>
        </form>
    `;
    return threadElement;
}


function editThread(threadId) {
    const editForm = document.getElementById(`edit-form-${threadId}`);
    editForm.style.display = "block";
}

function cancelEdit(threadId) {
    const editForm = document.getElementById(`edit-form-${threadId}`);
    editForm.style.display = "none";
}

function saveEdit(threadId) {
    const editForm = document.getElementById(`edit-form-${threadId}`);
    const titleInput = editForm.querySelector("input");
    const contentInput = editForm.querySelector("textarea");

    const threadIndex = threads.findIndex(thread => thread.id === threadId);

    if (threadIndex !== -1) {
        // Update the thread in the 'threads' array
        threads[threadIndex].title = titleInput.value;
        threads[threadIndex].content = contentInput.value;
        // Save the updated 'threads' array to Local Storage
        saveThreadsToLocalStorage();
        // Refresh the displayed threads
        displayThreads();
    }

    editForm.style.display = "none";
}


const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("change", toggleTheme);

function toggleTheme() {
    if (themeToggle.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

document.getElementById("new-thread-form").addEventListener("submit", createNewThread);

function displayThreads() {
    const threadsContainer = document.getElementById("threads-container");
    threadsContainer.innerHTML = "";

    threads.forEach(thread => {
        const threadElement = createThreadElement(thread);
        threadsContainer.appendChild(threadElement);
    });
}

// Load threads from Local Storage on page load
loadThreadsFromLocalStorage();
// Display initial threads on page load
displayThreads();
