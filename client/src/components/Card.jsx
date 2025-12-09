import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: flex;
  gap: 10px;
  flex-direction: ${(props) => (props.type === "sm" ? "row" : "column")}; /* Row for sidebar */
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type !== "sm" && "16px")};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"}; /* Hide avatar in sidebar */
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

// Change arguments to accept 'video'
const Card = ({ type, video }) => { 
  
  // We need to fetch the Channel Info (Avatar/Name) based on video.userId later.
  // For now, we will just show the Video Title and Views.

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        {/* Use Real Image URL */}
        <Image type={type} src={video.imgUrl} />
        
        <Details type={type}>
          <ChannelImage type={type} src="https://yt3.ggpht.com/..." />
          <Texts>
            {/* Use Real Title */}
            <Title>{video.title}</Title>
            <ChannelName>Channel Name</ChannelName>
            {/* Use Real View Count */}
            <Info>{video.views} views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};
export default Card;