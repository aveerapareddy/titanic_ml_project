from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)

# Allowed frontend origins
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://titanic-ml-project-9ca5q1l2l-aveerapareddys-projects.vercel.app"
]

CORS(app, resources={r"/predict": {"origins": ALLOWED_ORIGINS}}, supports_credentials=True)

model = joblib.load("model/titanic_model.pkl")

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()

    data = request.get_json()
    features = np.array([[
        data.get("Pclass", 0),
        data.get("Sex", 0),
        data.get("Age", 0),
        data.get("SibSp", 0),
        data.get("Parch", 0),
        data.get("Fare", 0),
        data.get("Embarked_Q", 0),
        data.get("Embarked_S", 0)
    ]])

    probability = model.predict_proba(features)[0][1]
    prediction = "Survived" if probability > 0.5 else "Did Not Survive"

    response = jsonify({"prediction": prediction, "probability": round(probability * 100, 2)})
    return _corsify_actual_response(response)

def _corsify_actual_response(response):
    """Set dynamic CORS headers based on request origin"""
    origin = request.headers.get("Origin")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "OPTIONS, POST, GET"
    return response

def _build_cors_preflight_response():
    """Handle CORS preflight OPTIONS requests"""
    response = jsonify({"message": "CORS preflight OK"})
    return _corsify_actual_response(response)

if __name__ == "__main__":
    app.run(debug=True)
