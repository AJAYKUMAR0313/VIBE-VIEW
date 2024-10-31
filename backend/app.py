from flask import Flask
from app.routes import sentiment_bp

app = Flask(__name__)

# Function to handle CORS headers
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Register the blueprint
app.register_blueprint(sentiment_bp)

# Add the CORS headers after each request
app.after_request(add_cors_headers)

# Handle the preflight OPTIONS request
@app.route('/<path:path>', methods=['OPTIONS'])
def options_handler(path):
    response = app.make_default_options_response()
    return add_cors_headers(response)

if __name__ == "__main__":
    app.run(debug=True)


# from flask import Flask
# from app.routes import sentiment_bp

# app = Flask(__name__)

# def add_cors_headers(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     return response

# # Register the blueprint
# app.register_blueprint(sentiment_bp)

# app.after_request(add_cors_headers)

# if __name__ == "__main__":
#     app.run(debug=True)