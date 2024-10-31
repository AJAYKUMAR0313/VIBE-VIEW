// components/CommentList.tsx

import React from 'react';

// Define the props for the CommentList component
interface CommentListProps {
  comments: string[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="bg-white bg-opacity-90 p-5 rounded-lg w-full max-w-md">
      <h3 className="text-xl font-bold mb-4 text-black">Top Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-700">No comments available.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li key={index} className="text-left">
              <p className="text-gray-800">{comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
