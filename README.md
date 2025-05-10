# HVAC Job Tracker App

A minimal application to manage and track HVAC jobs.

## 🌐 Live Demo

👉 [HVAC Job Tracker App Live](https://job-tracker-j3u8.onrender.com/)

---

## Features

*   **Job Creation:** Users can create new jobs with a Job Title, Customer Name, and Description.
*   **Job Statuses:** Jobs progress through defined statuses: "Not Yet Started", "In Progress", and "Completed".
*   **Kanban Board:** A visual jobs board where:
    *   Columns represent job statuses.
    *   Cards represent individual jobs.
    *   Jobs are displayed in the column corresponding to their current status.
*   **Drag-and-Drop:** Users can easily update a job's status by dragging and dropping job cards between status columns on the Kanban board.
*   **Material Icons:** Used for enhanced visual cues on job cards.

## Tech Stack

### Backend

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js, used to build the API.
*   **In-Memory Data Store:** (Using a simple JavaScript array for demonstration purposes. Data resets on server restart.)
*   **UUID:** For generating unique job IDs.

### Frontend

*   **React:** JavaScript library for building user interfaces.
*   **React Router DOM:** For client-side routing (navigation between the main board and the create job page).
*   **`@hello-pangea/dnd`:** For implementing drag-and-drop functionality on the Kanban board.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **Material Icons:** For UI iconography.

### Project Structure

The project is organized into two main directories:

*   `frontend/`: Contains the React frontend React application.
*   `backend/`: Contains the Node.js/Express backend API.

## Prerequisites

*   Node.js (v14.x or later recommended, as ES Modules are used in the backend)
*   npm (Node Package Manager, typically comes with Node.js)

## Quickstart

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://github.com/Darshan-H-E/job-tracker.git
    cd job-tracker
    ```
2.  **Build the frontend**
    ```bash
    npm run build
    ```
3.  **Clone the repository (if applicable):**
    ```bash
    npm start
    ```
The app will typically start on `http://localhost:5000`.


