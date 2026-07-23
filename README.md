# Avanya CRM

A web-based CRM application to manage leads, sales agents, and sales reports for small to medium-sized teams.  
Users can create and track leads, assign them to agents, update lead status, and monitor performance through dashboards and visual reports.

---

## Demo Link

[Live Demo](https://avanya-frontend.vercel.app/)

---

## Quick Start

```
git clone https://github.com/sourjyendu-barik/avanya-frontend.git
cd <your-repo>
npm install
npm run dev      # or `npm start` / `yarn dev`
```

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB
- React-select

## Demo Video

Watch a walkthrough of all major features of this app:
[Explanation Video Link](https://drive.google.com/file/d/1ZXWM8OHIaxB-tECrRf7T1BRYJPkdFPCY/view)

## Features

**Dashboard**

- View quick stats for leads such as Proposal Sent, New, and Contacted.
- Navigate between Leads, Sales, Agents, Reports, and Settings using the sidebar.

**Lead Management**

- Add new leads with fields like lead name, source, agent, status, priority, time to close, and tags.
- View a lead list with filters for sales agent, lead status, tags, source, sort order, and priority.

**Lead Details**

- See complete lead information on a dedicated details page.
- Edit lead details in a modal and add internal comments for collaboration.

**Sales Agents**

- Manage sales agents with their names and email addresses.
- Add new agents to assign and track leads more effectively.

**Sales / Leads by Agent**

- View leads grouped by sales agent with status, source, and priority.
- Filter and sort leads to focus on high-priority opportunities.

**Reports**

- Analyze total leads data using visual charts.

**Settings**

- Manage both lead list and sales agent list in a single settings view.
- Remove leads or agents using action controls.

## API Reference

### **POST /addSalesAgent**<br>

Create a new sales agent.<br>
Sample Body:<br>
`{ name, email }`

### **GET /getAllSalesAgents**<br>

Get list of all sales agents.<br>
Sample Response:<br>
`[{ _id, name, email }, ...]`

### **DELETE /deletesalesAgent/:salesAgent_id**<br>

Delete a sales agent by ID.<br>
Sample Response:<br>
`{ message: "deleted data successfully" }`

---

### **POST /addNewLead**<br>

Create a new lead.<br>
Sample Body:<br>
`{ name, salesAgent, source, status, priority, timeToClose, tags }`

### **GET /getAllLeads**<br>

Get all leads with optional filters.<br>
Query Params:<br>
`salesAgent, status, tags, source, sortByAsc, priority`<br>
Sample Response:<br>
`[{ _id, name, salesAgent, source, status, priority, timeToClose, tags, ... }, ...]`

### **GET /getLeadData/:lead_id**<br>

Get details for a single lead by ID.<br>
Sample Response:<br>
`{ _id, name, salesAgent, source, status, priority, timeToClose, tags, comments, ... }`

### **POST /updateLeadData/:lead_id**<br>

Update an existing lead by ID.<br>
Sample Body:<br>
`{ name, salesAgent, source, status, priority, timeToClose, tags }`

### **DELETE /deleteLead/:lead_id**<br>

Delete a lead by ID (also removes its comments).<br>
Sample Response:<br>
`{ message: "deleted data successfully" }`

---

### **GET /leads/:id/comments**<br>

Get all comments for a specific lead.<br>
Sample Response:<br>
`[{ _id, text, author, lead, createdAt }, ...]`

### **POST /addComments**<br>

Add a new comment to a lead.<br>
Sample Body:<br>
`{ text, author, lead }`

---

### **GET /report/last-week**<br>

Get leads closed in the last 7 days, with agent info.<br>
Sample Response:<br>
`[{ _id, name, updatedAt, salesAgent }, ...]`

### **GET /report/pipeline**<br>

Get count of leads that are not closed (pipeline).<br>
Sample Response:<br>
`{ totalLeadsInpieline: 4 }`

### **GET /report/closed-by-agent/:id**<br>

Get all closed leads for a specific sales agent.<br>
Sample Response:<br>
`[{ _id, name, updatedAt, salesAgent }, ...]`

## Contact

For bugs or feature request please reach out to sourjyendubarik7798@gmail.com
