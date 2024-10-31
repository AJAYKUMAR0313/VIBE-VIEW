'use client';

import { useComments } from '../CommentsContext';

const CommentsPage: React.FC = () => {
  const { comments, predictions } = useComments();
  console.log(comments,predictions)
  const getBackgroundColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-300';
      case 'neutral':
        return 'bg-yellow-300';
      case 'negative':
        return 'bg-red-300';
      default:
        return 'bg-gray-200';
    }
  };

  return (
      <div className="p-4">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">ALL COMMENTS SENTIMENTS</h1>
  
        {/* Comments Container */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {comments.map((comment: string, index: number) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded ${getBackgroundColor(predictions[index])}`}
            >
              {comment}
            </div>
          ))}
        </div>
      </div>
    );
  };


export default CommentsPage;
