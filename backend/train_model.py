import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

df = pd.read_csv("titanic.csv")
df = df.copy()

df.drop(columns=["Cabin"], inplace=True)
df.loc[:, "Age"] = df["Age"].fillna(df["Age"].median())
df.loc[:, "Embarked"] = df["Embarked"].fillna(df["Embarked"].mode()[0])

features = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]
df = df[features + ["Survived"]].copy()

df.loc[:, "Sex"] = df["Sex"].map({"female": 1, "male": 0})
df = pd.get_dummies(df, columns=["Embarked"], drop_first=True)

X = df.drop("Survived", axis=1)
y = df["Survived"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

joblib.dump(model, "model/titanic_model.pkl")
print("Model trained and saved successfully!")
