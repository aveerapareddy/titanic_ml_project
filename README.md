# 🚢 Titanic AI Survival Predictor

A machine learning-powered web app that predicts whether a Titanic passenger would have survived based on their details. Built with Flask for the backend and React with Tailwind CSS for the frontend.

![image](https://github.com/user-attachments/assets/7c7498d0-626d-4c13-bf8b-b27de97f392a)


## Features
- **Machine Learning Model:** Logistic Regression trained on Titanic dataset.
- **Survival Probability Score:** Displays survival chance in percentage.
- **Modern UI:** Fully responsive React app styled with Tailwind CSS.
- **Live API:** Hosted on Render, frontend on Vercel.

## Tech Stack
- **Backend:** Flask, Scikit-Learn, Joblib, Gunicorn
- **Frontend:** React, Tailwind CSS, Axios, Framer Motion
- **Deployment:** Render (API), Vercel (UI)

## Live Demo
- **Frontend (UI):** [Front End](https://titanic-ml-project-9ca5q1l2l-aveerapareddys-projects.vercel.app/)
- **API Endpoint:** [Backend](https://titanic-ml-project-1.onrender.com))

## Getting Started
### **1️⃣ Backend (Flask API)**
```bash
cd backend
pip install -r requirements.txt
python train_model.py  # Train and save the model
python app.py  # Run API
```
API runs at `http://127.0.0.1:5000/predict`.

### **2️⃣ Frontend (React UI)**
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## API Usage
### **POST /predict**
#### **Request:**
```json
{
  "Pclass": 3,
  "Sex": 0,
  "Age": 22,
  "SibSp": 1,
  "Parch": 0,
  "Fare": 7.25,
  "Embarked_Q": 0,
  "Embarked_S": 1
}
```
#### **Response:**
```json
{
  "prediction": "Did Not Survive",
  "probability": 35.42
}
```

## Deployment Instructions
- **Backend:** Deploy to Render using `render.yaml`.
- **Frontend:** Deploy to Vercel using `vercel.json`.
- **Ensure API URL is correctly set in frontend.**

## Contributing
Pull requests are welcome. Please follow best practices and ensure any contributions maintain project integrity.

## License


