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


// HTTP Methods

// Create a new agent
function doPost(agent) {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(agent)
    }

    // Make POST request
    fetch('http://localhost:8080/api/agent', init)
        .then(response => {
            if (response.status === 201 || response.status === 400){        // 201 = created successfully, 400 = validation error
                return response.json();
            } else {
                return Promise.reject(`Unexpected Status Code: ${response.status}`);
            }
        })
        .then(data => {
            if (data.agentId) {             // Success, refresh the list and reset the form
                displayList();
                resetState();
            } else {
                renderError(data);          // Validation error - display them
            }
        })
        .catch(console.log);                // Log any expections
}

// Update an existing agent
function doPut(agent) {
    // Set ID on our global agent object
    agent.id = editAgentId;

    const init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(agent)
    };

    // Make API PUT request
    fetch(`http://localhost:8080/api/agent/${agent.agentId}`, init)
        .then(response => {
            if (response.status === 204) {          // 204 = No Content (Success)
                return agent;
            } else if (response.status === 400) {   // 400 = validation error
                return response.json();
            } else {                                // Unexpected error
                return Promise.reject(`Unexpected status code: ${response.status}`);
            }
        })
        .then(data => {
            if (data.id) {                          // Success
                displayList();
                resetState();
            } else {                                // Validation errors, show them
                renderError(data);
            }
        })
}

// CRUD functions

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();     // prevents page reload

    // Get form values
    const agent = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        dob: document.getElementById('dob').value,
        heightInInches: parseInt(document.getElementById('heightInInches').value)
    };

    if (editAgentId > 0) {
        agent.agentId = editAgentId;
        doPut(agent);
    } else {
        doPost(agent);
    }
}

// Handle adding a new agent
function handleAddAgent() {
    setCurrentView('Form');
}

// Handle delete agent
function handleDeleteAgent(agentId) {
    // Find agent with matching ID
    const agent = agents.find(a => a.agentId === agentId);

    // Confirm deletion
    if (confirm(`Delete Agent ${agent.firstName} ${agent.lastName}?`)) {
        const init = {
            method: 'DELETE'
        };

        // Make DELETE API request
        fetch(`http://localhost:8080/api/agent/${agentId}`, init)
            .then(response => {
                if (response.status === 204) {          // Success, refresh the list
                    displayList();                  
                } else {
                    return Promise.reject(`Unexpected Status Code ${response.status}`);     // Unexpected error
                }
            })
            .catch(console.log);
    }
}

// Handle editing agents
function handleEditAgent(agentId) {
    const agent = agents.find(a => a.agentId === agentId);

    // Populate the form with agent properties
    document.getElementById('firstName').value = agent.firstName;
    document.getElementById('middleName').value = agent.middleName;
    document.getElementById('lastName').value = agent.lastName;
    document.getElementById('dob').value = agent.dob;
    document.getElementById('heightInInches').value = agent.heightInInches;

    // Change form text
    document.getElementById('formHeading').innerHTML = 'Update Agent';
    document.getElementById('formSubmitButton').innerHTML = 'Update Agent';

    // Set ID for the agent being updated
    editAgentId = agentId;

    // Switch to form view
    setCurrentView('Form');
}