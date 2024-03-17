// Comment.js
import React, { useState } from 'react';

const Comment = ({ comment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div className="border p-4">
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full mb-2"
        />
      ) : (
        <p>{comment.content}</p>
      )}
      <div className="flex justify-end">
        {isEditing ? (
          <button onClick={handleSaveEdit} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
            Save
          </button>
        ) : (
          <button onClick={handleEdit} className="mr-2 bg-gray-500 text-white px-2 py-1 rounded">
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
