from googleapiclient.discovery import build

API_KEY = 'AIzaSyCSMibbApBttKlfRGOoBmARkIH6NPhDsfI'

# Initialize the YouTube API client
youtube = build('youtube', 'v3', developerKey=API_KEY)

def get_comments(video_id):
    """Fetches top comments for a video."""
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=100000
    )
    response = request.execute()

    comments = []
    for item in response['items']:
        comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
        comments.append(comment)

    return comments


def get_video_title(video_id: str) -> str:
    """Fetches the video title for the given video ID using the YouTube Data API."""
    try:
        # Call the YouTube API to get the video details
        response = youtube.videos().list(
            part='snippet',  # 'snippet' contains the title, description, etc.
            id=video_id
        ).execute()

        # Extract video title from the API response
        video_title = response['items'][0]['snippet']['title']
        return video_title
    except Exception as e:
        raise Exception(f"Failed to fetch video title: {str(e)}")


def get_top_comments(video_id: str, max_comments: int = 5) -> list:
    """Fetches the top comments for a video using the YouTube Data API."""
    try:
        # Call the YouTube API to get the top-level comments
        response = youtube.commentThreads().list(
            part='snippet',
            videoId=video_id,
            maxResults=max_comments,
            order='relevance'  # You can also use 'time' for the latest comments
        ).execute()

        # Extract top comments from the API response
        top_comments = [
            item['snippet']['topLevelComment']['snippet']['textDisplay']
            for item in response['items']
        ]
        return top_comments
    except Exception as e:
        raise Exception(f"Failed to fetch top comments: {str(e)}")
