from flask import Blueprint, request, jsonify
from app.youtube_api import get_comments, get_video_title, get_top_comments
from app.sentiment_model import classify_comments
from app.utils import generate_feedback, extract_video_id, calculate_sentiment_distribution

# Define the Blueprint for handling sentiment and video details
sentiment_bp = Blueprint('sentiment_bp', __name__)

# Route to analyze comments and provide sentiment analysis
@sentiment_bp.route('/analyze_comments', methods=['POST'])
def analyze_comments():
    data = request.get_json()
    video_url = data.get('video_url')

    if not video_url:
        return jsonify({"error": "No video URL provided"}), 400

    try:
        video_id = extract_video_id(video_url)
        comments = get_comments(video_id)
        predictions = classify_comments(comments)  # ML model to classify sentiment
        response = calculate_sentiment_distribution(predictions)
        # print(response,'eyuu')
        feedback = generate_feedback(response)
        
        return jsonify({
            "sentiment": response,
            "feedback": feedback,
            "predictions":predictions,
            "comments":comments
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to get video details like title and top comments
@sentiment_bp.route('/get_video_details', methods=['POST'])
def get_video_details():
    data = request.get_json()
    video_url = data.get('video_url')

    if not video_url:
        return jsonify({"error": "No video URL provided"}), 400

    try:
        # Extract the video ID from the provided URL
        video_id = extract_video_id(video_url)

        # Fetch the video title using YouTube API
        video_title = get_video_title(video_id)

        # Fetch top comments for the video
        top_comments = get_top_comments(video_id)

        return jsonify({
            "title": video_title,
            "top_comments": top_comments
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
