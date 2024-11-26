from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np


app=Flask(__name__)
# instantiate object

#loading the different saved model for different disease
diabetes_predict=pickle.load(open('stroke.pkl', 'rb'))
heart_predict=pickle.load(open('heart.pkl', 'rb'))
parkinsons_predict=pickle.load(open('lung.pkl', 'rb'))

@app.route('/') # instancing one page (homepage)
def home():
    return render_template("home.html")
# ^^ open home.html, then see that it extends layout.
# render home page.

@app.route('/stroke/') # instancing child page
def diabetes():
    return render_template("stroke.html")


@app.route('/lung/') # instancing child page
def parkinsons():
    return render_template("lung.html") 

@app.route('/heartdisease/') # instancing child page
def heartdisease():
    return render_template("heartdisease.html")


@app.route('/predictstroke/',methods=['POST']) 
def predictdiabetes():      #function to predict diabetes
    int_features=[x for x in request.form.values()]
    processed_feature_diabetes=[np.array(int_features,dtype=float)]
    prediction=diabetes_predict.predict(processed_feature_diabetes)
    if prediction[0]==1:
        display_text="This person has Diabetes"
    else:
        display_text="This person doesn't have Diabetes"
    return render_template('diabetes.html',output_text="Result: {}".format(display_text))

@app.route('/predictlungcancer/',methods=['POST']) 
def predictparkinsons():      #function to predict parkinsons disease
    int_features=[x for x in request.form.values()]
    processed_feature_parkinsons=[np.array(int_features,dtype=float)]
    prediction=parkinsons_predict.predict(processed_feature_parkinsons)
    if prediction[0]==1:
        display_text="This person has Parkinson's"
    else:
        display_text="This person doesn't have Parkinson's"
    return render_template('parkinsons.html',output_text="Result: {}".format(display_text))

@app.route('/predictheartdisease/',methods=['POST']) 
def predictheartdisease():      #function to predict heart disease
    int_features=[x for x in request.form.values()]
    processed_feature_heart=[np.array(int_features,dtype=float)]
    prediction=heart_predict.predict(processed_feature_heart)
    if prediction[0]==1: 
        display_text="This person has Heart Disease"
    else:
        display_text="This person doesn't have Heart Disease"
    return render_template('heartdisease.html',output_text="Result: {}".format(display_text))


if __name__=="__main__":
    app.run(debug=True)