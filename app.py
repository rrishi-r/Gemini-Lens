import google.generativeai as genai
from flask import Flask, request
from flask_cors import CORS
import logging
import PIL.Image

# import cv2
import os
import shutil

# import cv2


app = Flask(__name__)
CORS(app)
# Add code for getting the api key from the environment variable
api_key = "INSERT_API_KEY_HERE"
genai.configure(api_key=api_key)


# Define the route for general queries
@app.route("/query", methods=["POST"])
def query():

    query = request.form.get("question")

    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    prompt = (
        "You are a professional and well-accredited tour guide. Your job is to cater to the needs of sightseers who are looking for information about a specific place. You are given a query of "
        + query
        + " and you will provide a description of the place, along with answering any questions that the sightseer may have. "
        + "You will provide a brief description of the place, including the history of the place, the types of activities that are available in the area, and the best times to visit the place. "
        + "If the place is known for being historical, you should indicate this in your response. "
        + "If the place is known for being modern, you should indicate this in your response. "
        + "If the place is known for being a mix of historical and modern, you should indicate this in your response. "
        + "Keep your response to less than 5 sentences. "
        + "If the user has follow up questions, you should be able to answer them to the best of your ability, and always assume to only give information that is within walking distance."
    )
    response = model.generate_content(prompt)
    print(response.text)
    app.logger.info(response.text)
    return response.text


# Define the route for when the nearby hotels are requested
@app.route("/hotels", methods=["POST"])
def hotels():
    desc = request.form.get("desc")
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    localTime = request.form.get("localTime")
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    prompt = (
        "You are a professional and well-accredited tour guide. Your job is to cater to the needs of sightseers who are looking for a place to stay. You are given a latitude of "
        + latitude
        + " and a longitude of "
        + longitude
        + " and a local time of "
        + localTime
        + " and you will provide a description of the best hotels in the area. Use information from your previous response analyzing a photograph to determine the exact area: "
        + desc
        + "You will provide a list of the top 3 hotels in the area, and give a brief description of each hotel, including the price range, the overall rating of the hotel, and the type of rooms they offer. "
        + "If any part of the description indicates a style of room, such as a suite or a single room, the top 3 hotels should offer that style of room. "
        + "If the area is not known for a specific style of room, then the top 3 hotels should be picked at your discretion. "
        + "If there are not enough hotels in the area, you should indicate this in your response. Also, the total length of your response should be less than 4 sentences. "
        + "If it is more likely to not be able to get a hotel reservation due to the time of day, you should indicate this in your response."
        + "If the user has follow up questions, you should be able to answer them to the best of your ability, and always assume to only give hotels that are within walking distance."
    )
    response = model.generate_content(prompt)
    print(response.text)
    app.logger.info(response.text)
    return response.text


# Define the route for when the user wants to know the safety of the area
@app.route("/safety", methods=["POST"])
def safety():
    desc = request.form.get("desc")
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    local_time = request.form.get("localTime")
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    prompt = (
        "You are a professional and well-accredited tour guide. Your job is to alert sightseers of potential dangers in the area. You are given a latitude of "
        + latitude
        + " and a longitude of "
        + longitude
        + " and a local time of "
        + local_time
        + " and you will provide a description of the safety of the area. Use information from your previous response analyzing a photograph to determine the exact area: "
        + desc
        + "You will provide a description of the area, including the overall safety of the area, the types of crimes that are common in the area, and the best ways to stay safe in the area. "
        + "If the area is known for being unsafe, you should indicate this in your response. "
        + "If the area is known for being safe, you should indicate this in your response. "
        + "If the area is known for being unsafe at night, you should indicate this in your response. Same with during the day, just make the decision at your discretion. "
        + "If the area is known for being unsafe, you should indicate this in your response. Keep your response to less than 4 sentences. "
        + "If the user has follow up questions, you should be able to answer them to the best of your ability, and always assume to only give information that is within walking distance."
    )
    response = model.generate_content(prompt)
    print(response.text)
    app.logger.info(response.text)
    return response.text


# Define the route for when the user wants to know about similar landmarks / locations to visit
@app.route("/more-places", methods=["POST"])
def history():
    desc = request.form.get("desc")
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    prompt = (
        "You are a professional and well-accredited tour guide. Your job is to cater to the needs of sightseers who are looking for new places to visit. You are given a latitude of "
        + latitude
        + " and a longitude of "
        + longitude
        + " and you will identify 3 famous landmarks in the area. Use information from your previous response analyzing a photograph to determine the exact area: "
        + desc
        + "If the area is known for being historical, you should indicate this in your response. "
        + "If the area is known for being modern, you should indicate this in your response. "
        + "If the area is known for being a mix of historical and modern, you should indicate this in your response. Keep your response to less than 5 sentences. "
        + "If there is an overwhelmingly popular historical landmark in the area, you should indicate this in your response. "
        + "If the user has follow up questions, you should be able to answer them to the best of your ability, and always assume to only give information that is within walking distance."
    )
    response = model.generate_content(prompt)
    print(response.text)
    app.logger.info(response.text)
    return response.text


# Define the route for the analyzeImage endpoint
@app.route("/analyzeImage", methods=["POST"])
def analyzeImage():
    # app.logger.info(request.data)
    print("image function")
    json = request.files.get("ImageData")
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    print("JSON: ", json)
    # image_parameters = json.loads(json)
    # data = json.get("uri")

    model = genai.GenerativeModel("gemini-1.5-pro-latest")

    # data = request.form.get("uri")
    # app.logger.info("DATA: ", data)

    img = PIL.Image.open(json)
    prompt = (
        "You are a professional and well-renown tour guide. Your job is to cater to what you believe sightseers would like to know about a specific place. You are given a picture, with a latitude of "
        + latitude
        + ", a longitude of "
        + longitude
        + " and you will provide a description as explained earlier, of the landmark seen in the picture or video. Use the coordinates to pinpoint the building, but keep the description less than 3 sentences and don't mention the coordinates in your response. "
        + "This being said, testing has proven that the coordinates are not always accurate, so use your best judgement to determine the location of the building. "
        + "With this in mind, give a detailed description of the photo, and what you believe the sightseers would be the most interested in, ie if the picture is quite literally a specific building, and not much else, your response should be about the building rather than the surrounding environment."
        + " However, if the photo is too generic or simple, give a brief warning to the user that the photo is too simple to give an ample description, and instead give a brief description of the photo. "
    )
    response = model.generate_content([prompt, img])
    print(response.text)
    app.logger.info(response.text)
    return response.text


# @app.route("/analyzeImage", methods=["POST"])
# def analyzeImage():
#     # app.logger.info(request.data)
#     json = request.files.get("ImageData")
#     print("JSON: ", json)
#     # image_parameters = json.loads(json)
#     # data = json.get("uri")

#     model = genai.GenerativeModel("gemini-1.5-pro-latest")

#     # data = request.form.get("uri")
#     # app.logger.info("DATA: ", data)

#     img = PIL.Image.open(json)
#     prompt = "You are a professional and well-accredited tour guide. You are given a picture or video, with a near enough location, and you are to provide a description of the landmark seen in the picture or video. You will write what you see fit, but keep it less than 3 sentences."
#     response = model.generate_content([prompt, img])
#     print(response.text)
#     app.logger.info(response.text)
#     return response.text


# Main function to run the app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
