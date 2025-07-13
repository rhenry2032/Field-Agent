// Store all agents from the API
let agents = [];
let editAgentId = 0;


// Initialize our app
function displayList() {
    setCurrentView('List');
    getAgents()
        .then(data => {
            agents = data;
            renderList(data);
        });
}

// Fetch agents from API
function getAgents() {
    return fetch('http://localhost:8080/api/agent')
        .then(response => {
            return response.json();
        })
}

// Render agents in the table
function renderList(agents) {
    const tableBodyElement = document.getElementById('tableRow');

    // Map each agent to a HTML table row
    const agentHTML = agents.map(a => {
        return `
        <tr>
            <td>${a.firstName} ${a.middleName || ''} ${a.lastName}</td>
            <td>${a.dob}</td>
            <td>${a.heightInInches}</td>
            <td>
                <button class="btn btn-outline-warning" onclick="handleEditAgent(${a.agentId})">Edit</button>
                <button class="btn btn-outline-danger" onclick="handleDeleteAgent(${a.agentId})">Delete</button>
            </td>
        </tr>
        `
    });

    // Join all rows and set table innerHTML
    tableBodyElement.innerHTML = agentHTML.join('');
}


// CRUD functions

// Handle adding a new agent
function handleAddAgent() {
    setCurrentView('Form');
}