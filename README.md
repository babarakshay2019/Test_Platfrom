## Test Taking Platform
This project is a web-based platform that allows users to take tests, view questions, and submit answers. The platform consists of two main components:

- Backend: A Python-based backend using Django and Django Rest Framework (DRF).
- Frontend: A React.js-based frontend that interacts with the backend to fetch test data and handle user interactions.

 ## Features
- Users can start, view, and submit tests.
- The platform supports multiple types of questions, including MCQ, True/False, and Fill-in-the-Blank.
- Detailed explanations are provided for each question after the test is completed.
- The user interface is responsive and designed for ease of use.
## Technologies Used
# Backend
- Django: A high-level Python web framework for backend development.
- Django Rest Framework (DRF): A powerful toolkit for building Web APIs.
- SQLite/PostgreSQL: Database for storing test data and user information.
- Docker: Containerization for creating an isolated environment to run the application.
# Frontend
- React.js: A JavaScript library for building the user interface.
- Material UI: A popular React UI framework for fast design.
- React Router: For navigation between different pages of the platform.
- Axios: For making HTTP requests to the backend.

``` bash
git clone https://github.com/babarakshay2019/Test_Platfrom.git
cd Test_Platfrom
```
## for Backend and Frontend
```bash
docker compose up --build
```
## Type on browser 
```bash
http://localhost:3000/
```
