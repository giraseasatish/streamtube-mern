import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  // 1. STATE: Store the list of videos here
  const [videos, setVideos] = useState([]);

  // 2. EFFECT: Run this when the page loads
  useEffect(() => {
    const fetchVideos = async () => {
      // Fetch random videos from our Backend
      // (Using the full URL because we are in Direct Mode)
      const res = await axios.get("http://127.0.0.1:3000/api/videos/random");
      
      // Save the data to State
      setVideos(res.data);
    };
    fetchVideos();
  }, []); // [] means run only once

  return (
    <Container>
      {/* 3. MAP: Loop through the videos and create a Card for each one */}
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;