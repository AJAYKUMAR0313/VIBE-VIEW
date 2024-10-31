# import numpy as np
# from tensorflow.keras.models import load_model
# from app.utils import preprocess_comment

# # Load the pre-trained model
# model = load_model('model/sentiment_model.h5')

# def classify_comments(comments):
#     preprocessed_comments = [preprocess_comment(c) for c in comments]
    
#     # Convert comments to tokenized form (this part will depend on how you preprocess data during training)
#     tokenized_comments = tokenize_comments(preprocessed_comments)
    
#     # Predict the sentiment for each comment
#     predictions = model.predict(tokenized_comments)
    
#     # Return the sentiment as positive, negative, or neutral
#     labels = np.argmax(predictions, axis=1)  # 0 for negative, 1 for neutral, 2 for positive
#     return labels
import numpy as np
from tensorflow.keras.models import load_model
from app.utils import preprocess_comment, tokenize_comments

# Load the pre-trained LSTM model
model = load_model('model/cnn_model.h5')

# print(model)
# Define the mapping between numerical classes and sentiment labels
# labels_map = {0: 'negative', 1: 'neutral', 2: 'positive'}
labels_map = {0: 'negative', 1: 'neutral', 2: 'positive'}

def classify_comments(comments):
    # Preprocess comments
    preprocessed_comments = [preprocess_comment(c) for c in comments]
    # print(preprocessed_comments)
    # Tokenize the comments using the tokenizer used during training
    tokenized_comments = tokenize_comments(preprocessed_comments)
    # print(tokenized_comments)
    
    # Use the LSTM model to predict sentiment
    predictions = model.predict(tokenized_comments)
    # print(predictions)
    
    # Get the sentiment label for each comment
    sentiment_labels = [labels_map[np.argmax(prediction)] for prediction in predictions]
    print(sentiment_labels)
    
    return sentiment_labels
