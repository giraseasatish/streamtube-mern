import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch videos from the backend (Port 3000)
        // If type is "trend", it fetches trending. If "sub", it fetches subscribed channels.
        // Defaults to "random" if type is not provided.
        const endpoint = type ? type : "random";
        const res = await axios.get(`http://localhost:3000/api/videos/${endpoint}`);
        setVideos(res.data);
      } catch (err) {
        // console.error("Error fetching videos");
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;