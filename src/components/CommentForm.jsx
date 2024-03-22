// CommentForm.js
import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';


const CommentForm = ({ onAddComment }) => {
  const [commentContent, setCommentContent] = useState('');
  const { user } = useAuth();

  const handleInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user){
      console.log("you must be logged in");
    }

    if (commentContent.trim() === '') {
      // Alert or validation message for empty comment
      return;
    }
    onAddComment(commentContent);
    setCommentContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={commentContent}
        onChange={handleInputChange}
        placeholder="Write a comment..."
        className="w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
