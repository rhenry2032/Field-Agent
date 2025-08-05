# Field Agent 🕵️‍♀️  
A single-page CRUD application for managing field agents, built using HTML, Bootstrap, and vanilla JavaScript.

## 📌 Project Overview  
Field Agent is a frontend web application that allows users to create, read, update, and delete agent records through a clean, responsive UI. It communicates with a backend REST API to perform all data operations. The application supports form validation, error handling, and dynamic view rendering without the use of any frontend frameworks.

## 🛠️ Tech Stack  
- **Languages:** JavaScript, HTML  
- **Styling:** Bootstrap 4 (via CDN)  
- **API Communication:** Fetch API (RESTful endpoints)  
- **Tools:** Git, GitHub  

## ✅ Features  
- Display all agents on page load using the Fetch API (`GET`)  
- Add new agents through a validated form (`POST`)  
- Edit existing agents by pre-populating form fields (`PUT`)  
- Delete agents with confirmation prompt (`DELETE`)  
- Form-level validation and dynamic error display  
- Simple state management for toggling between views  
- Responsive design using Bootstrap’s grid system  

## 👨‍💻 My Role  
- Developed the full frontend using semantic HTML, Bootstrap, and modular JavaScript  
- Implemented all CRUD operations against a Spring Boot REST API  
- Built reusable DOM rendering functions and state-based view switching  
- Handled validation feedback and UI-level error handling without any external libraries  

## 📂 Project Structure  
<pre>
  project-root/
├── client/
│   ├── .vscode/
│   │   └── settings.json
│   ├── index.html
│   ├── main.js
│   └── README.md
│
└── server/
    ├── pom.xml
    ├── field-agent.iml
    ├── sql/
    │   ├── field-agent-schema-prod.sql
    │   └── field-agent-schema-test.sql
    ├── http/
    │   ├── agency-agent.http
    │   ├── agency.http
    │   ├── agent.http
    │   ├── alias.http
    │   ├── location.http
    │   └── security-clearance.http
    └── src/
        └── main/
            └── java/
                └── learn/
                    └── field_agent/
                        ├── App.java
                        ├── controllers/
                        │   ├── AgencyAgentController.java
                        │   ├── AgencyController.java
                        │   ├── AgentController.java
                        │   ├── AliasController.java
                        │   ├── LocationController.java
                        │   ├── SecurityClearanceController.java
                        │   ├── ErrorResponse.java
                        │   └── GlobalExceptionHandler.java
                        ├── data/
                        │   ├── *JdbcTemplateRepository.java
                        │   ├── *Repository.java
                        │   └── mappers/
                        │       └── *Mapper.java
                        └── domain/
                            ├── AgencyService.java
                            ├── AgentService.java
                            ├── AliasService.java
                            └── LocationService.java
</pre>

## 🚀 Getting Started  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/rhenry2032/Field-Agent.git

2. Open index.html in a browser
(No build tools required — pure HTML/JS project)

3. Ensure the backend is running
Backend must be accessible at http://localhost:8080/api/agent and related endpoints

## 📄 License
This project is for educational use only.
