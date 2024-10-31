import re

# # Preprocess comments
# def preprocess_comment(comment):
#     comment = re.sub(r"http\S+|www\S+|https\S+", '', comment)
#     comment = re.sub(r'\@\w+|\#', '', comment)
#     return comment.lower()

# # Function to calculate sentiment distribution
# def calculate_sentiment_distribution(labels):
#     positive = sum([1 for l in labels if l == 2])
#     neutral = sum([1 for l in labels if l == 1])
#     negative = sum([1 for l in labels if l == 0])
    
#     return {
#         "positive": positive,
#         "neutral": neutral,
#         "negative": negative
#     }

# # Function to generate feedback
# def generate_feedback(sentiment_data):
#     positive, neutral, negative = sentiment_data['positive'], sentiment_data['neutral'], sentiment_data['negative']
    
#     if positive > neutral and positive > negative:
#         return "The video has received mostly positive feedback."
#     elif negative > positive and negative > neutral:
#         return "The video has received mostly negative feedback."
#     else:
#         return "The video has received mixed feedback."
# ===================
# import re
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer   

# import pickle

# # Load the tokenizer from file/
# with open('model/tokenizer.pickle', 'rb') as handle:
#     tokenizer = pickle.load(handle)

# ... rest of your code ...
# ============================

# Load the tokenizer (must be saved after model training)
tokenizer = Tokenizer(num_words=5000)  # This should match your trained model

# def preprocess_comment(comment):
#     # Remove URLs, mentions, and other noise
#     print(comment,'eyuu')
#     comment = re.sub(r"http\S+|www\S+|https\S+", '', comment)
#     comment = re.sub(r'\@\w+|\#', '', comment)
#     print(comment)
#     return comment.lower()
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
stopwords_list=set(stopwords.words('english'))
TAG_RE=re.compile(r'<[^>]+>')
def remove_tags(text):
    '''Remove HTML TAGS'''
    return TAG_RE.sub('',text)
def preprocess_comment(sentence):
    # Remove URLs, mentions, and other noise
    # print(sentence)
    sentence = sentence.lower()
    sentence = remove_tags(sentence)
    sentence = re.sub('[^a-zA-Z]', ' ', sentence)  # Remove punctuations and numbers
    sentence = re.sub(r"\s+[a-zA-Z]\s+", ' ', sentence)  # Remove single characters
    sentence = re.sub(r'\s+', ' ', sentence)  # Remove multiple spaces
    # print(sentence)
    # Remove stopwords
    pattern = re.compile(r'\b(' + r'|'.join(stopwords_list) + r')\b\s*')
    sentence = pattern.sub('', sentence)

    return sentence

# Function to tokenize the comments (same as during training)
def tokenize_comments(comments):
    tokenizer=Tokenizer()
    tokenizer.fit_on_texts(comments)
    X = tokenizer.texts_to_sequences(comments)
    maxlen=100
    X= pad_sequences(X, padding='post', maxlen=maxlen)
    vocab_length=len(tokenizer.word_index)+1
    # print(X)
    return X  # Assuming maxlen used during training was 100
# def tokenize_comments(comments):
#     sequences = tokenizer.texts_to_sequences(comments)
#     print(sequences)
#     return pad_sequences(sequences, maxlen=100)  # Assuming maxlen used during training was 100

def extract_video_id(url):
    """
    Extracts the video ID from a YouTube URL.
    Handles both long and short YouTube URL formats.
    """
    pattern = r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|e)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})'
    match = re.search(pattern, url)
    if match:
        # print(match.group(1))
        return match.group(1)  # Return the video ID (11 characters)
    else:
        raise ValueError("Invalid YouTube URL")
    
    # Function to calculate the distribution of sentiments
def calculate_sentiment_distribution(predictions):
    """
    Calculate the distribution of sentiments.
    
    Arguments:
    predictions -- list of predicted sentiments (e.g., ['positive', 'negative', 'neutral', ...])
    
    Returns:
    A dictionary with the count of positive, negative, and neutral comments.
    """
    sentiment_counts = {
        'positive': 0,
        'negative': 0,
        'neutral': 0
        
    }
    # sentiment_counts = {
    #     'positive': 30,
    #     'negative': 40,
    #     'neutral': 20,
    # }
    for sentiment in predictions:
        if sentiment == 'positive':
            sentiment_counts['positive'] += 1
        elif sentiment == 'negative':
            sentiment_counts['negative'] += 1
        else:
            sentiment_counts['neutral'] += 1
    print(sentiment_counts)
    return sentiment_counts

def generate_feedback(sentiment_counts):
    """
    Generate feedback based on the sentiment distribution.
    
    Arguments:
    sentiment_counts -- dictionary with sentiment counts, e.g., {'positive': 10, 'negative': 5, 'neutral': 3, 'irrelevant': 2}
    
    Returns:
    A string with the general feedback.
    """
    # print(sentiment_counts)
    total_comments = len(sentiment_counts)
    print(total_comments)
    # print('hiiiiii')
    # # Calculate percentages
    # positive_percentage = (sentiment_counts['positive'] / total_comments) * 100
    # negative_percentage = (sentiment_counts['negative'] / total_comments) * 100
    # neutral_percentage = (sentiment_counts['neutral'] / total_comments) * 100
    # irrelevant_percentage = (sentiment_counts['irrelevant'] / total_comments) * 100

    # print(positive_percentage,negative_percentage,neutral_percentage)
    # Provide feedback based on the sentiment distribution
    if sentiment_counts['positive'] > 50:
        return "The overall sentiment is highly positive."
    elif sentiment_counts['negative'] > 50:
        return "The overall sentiment is largely negative."
    elif sentiment_counts['neutral'] > 50:
        return "The video has a neutral reception."
    # if positive_percentage > 50:
    #     return "The overall sentiment is highly positive."
    # elif negative_percentage > 50:
    #     return "The overall sentiment is largely negative."
    # elif neutral_percentage > 50:
    #     return "The video has a neutral reception."
    # elif irrelevant_percentage > 30:
    #     return "Many comments are irrelevant to the content."
    else:
        return "The video has mixed feedback with positive, negative, neutral sentiments."
