import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    // Logic: We have the Comment Data, but we need the User Data (Name/Pic)
    // We use the 'userId' stored in the comment to fetch the User profile.
    const fetchCommentAuthor = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3000/api/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (err) {}
    };
    fetchCommentAuthor();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.username} <Date>1 day ago</Date>
        </Name>
        <Text>
          {comment.desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;