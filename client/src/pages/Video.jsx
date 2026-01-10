import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, like, subscription } from "../redux/userSlice";
import moment from "moment";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: ${(props) => (props.$isSubscribed ? "#aaaaaa" : "#cc1a00")};
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);

  // Derived state to check user interaction
  const isSubscribed = currentUser?.subscribedUsers?.includes(channel._id);
  const isLiked = currentUser?.likedVideos?.includes(video._id);
  const isDisliked = currentUser?.dislikedVideos?.includes(video._id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const videoRes = await axios.get(`http://localhost:3000/api/videos/find/${path}`);
        
        // Only fetch channel if we have a valid userId
        if (videoRes.data.userId) {
            const channelRes = await axios.get(
              `http://localhost:3000/api/users/find/${videoRes.data.userId}`
            );
            setChannel(channelRes.data);
        }
        
        setVideo(videoRes.data);
        await axios.put(`http://localhost:3000/api/videos/view/${path}`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      await axios.put(`http://localhost:3000/api/users/like/${video._id}`, null, { withCredentials: true });
      dispatch(like(video._id));
      
      setVideo((prev) => ({
         ...prev,
         likes: isLiked 
            ? prev.likes.filter((userId) => userId !== currentUser._id) 
            : [...prev.likes, currentUser._id],
         dislikes: prev.dislikes.filter((userId) => userId !== currentUser._id)
      }));
    } catch (err) {}
  };

  const handleDislike = async () => {
    if (!currentUser) return;
    try {
      await axios.put(`http://localhost:3000/api/users/dislike/${video._id}`, null, { withCredentials: true });
      dispatch(dislike(video._id));
      
      setVideo((prev) => ({
         ...prev,
         dislikes: isDisliked 
            ? prev.dislikes.filter((userId) => userId !== currentUser._id) 
            : [...prev.dislikes, currentUser._id],
         likes: prev.likes.filter((userId) => userId !== currentUser._id)
      }));
    } catch (err) {}
  };

  const handleSub = async () => {
    if (!currentUser) return;
    try {
      isSubscribed
        ? await axios.put(`http://localhost:3000/api/users/unsub/${channel._id}`, null, { withCredentials: true })
        : await axios.put(`http://localhost:3000/api/users/sub/${channel._id}`, null, { withCredentials: true });
      
      dispatch(subscription(channel._id));
      
      setChannel((prev) => ({
        ...prev,
        subscribers: isSubscribed ? prev.subscribers - 1 : prev.subscribers + 1,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Content>Loading...</Content>;
  if (!video?._id) return <Content>Video not found.</Content>;

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="520"
            src={video.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{video.title}</Title>
        <Details>
          <Info>
            {video.views} views • {moment(video.createdAt).fromNow()}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} 
              {video.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {isDisliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />} 
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img || "https://placehold.co/50x50/666/fff?text=C"} />
            <ChannelDetail>
              <ChannelName>{channel.username}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{video.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          
          {currentUser && currentUser._id !== video.userId && (
              <Subscribe onClick={handleSub} $isSubscribed={isSubscribed}>
                {isSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
              </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={video._id} />
      </Content>
      
      <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation>
    </Container>
  );
};

export default Video;