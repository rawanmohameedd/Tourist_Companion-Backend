# -*- coding: utf-8 -*-
"""
Created on Sat Apr 20 15:36:27 2024

@author: Dell
"""

from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

print("Before loading pickle files")

loaded_big_model = pickle.load(open('big_model.pkl', 'rb'))

print("After loading big_model.pkl")

loaded_model_1 = pickle.load(open('model1.pkl', 'rb'))
loaded_model_2 = pickle.load(open('model2.pkl', 'rb'))
loaded_model_3 = pickle.load(open('model3.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    readings = request.get_json()
    if not readings:
        return jsonify({'error': 'Invalid or empty data received.'}), 400

    int_features = [int(x) for x in readings.values()]

    # Check if all values are -100
    if all(value == -100 for value in int_features):
        return jsonify({'prediction_text': "You are out of the museum"}), 200

    final_features = [np.array(int_features)]
    roomNum_predict = loaded_big_model.predict(final_features)

    if roomNum_predict == 0:
        return jsonify({'prediction_text': "Predicted room {}".format(roomNum_predict)})

    elif roomNum_predict == 1:
        IN_OUT_predict = loaded_model_1.predict(final_features)
        return jsonify({'prediction_text': "Predicted room {}, Predicted IN/OUT {}".format(roomNum_predict, IN_OUT_predict)})

    elif roomNum_predict == 2:
        IN_OUT_predict = loaded_model_2.predict(final_features)
        return jsonify({'prediction_text': "Predicted room {}, Predicted IN/OUT {}".format(roomNum_predict, IN_OUT_predict)})

    elif roomNum_predict == 3:
        IN_OUT_predict = loaded_model_3.predict(final_features)
        return jsonify({'prediction_text': "Predicted room {}, Predicted IN/OUT {}".format(roomNum_predict, IN_OUT_predict)})

if __name__ == '__main__':
    app.run(debug=True)
