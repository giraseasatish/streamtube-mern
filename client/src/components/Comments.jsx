import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: #cc1a00;
  color: white;
  border: none;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // State for input

  // Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  // Handle Post Comment
  const handleComment = async () => {
      if (!newComment) return;
      try {
          const res = await axios.post("http://localhost:3000/api/comments", {
              desc: newComment,
              videoId,
          }, { withCredentials: true }); // Important for Auth

          // Add new comment to list immediately
          setComments([res.data, ...comments]); 
          setNewComment(""); // Clear input
      } catch(err) {
          console.log(err);
      }
  }

  return (
    <Container>
      {currentUser && (
        <NewComment>
          <Avatar src={currentUser.img} />
          <Input 
            placeholder="Add a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleComment}>Send</Button>
        </NewComment>
      )}
      
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;