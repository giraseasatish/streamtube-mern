import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme } from "./utils/Theme";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Menu from "./components/Menu"; 
import Navbar from "./components/Navbar";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

const MenuWrapper = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <BrowserRouter>
          {/* 2. WRITE IT HERE (The Left Sidebar) */}
          <Menu />

          {/* MAIN CONTENT */}
          <Main>
            <Navbar /> {/* <--- ADD THIS HERE */}
            <div style={{color:"white", padding:"10px"}}>Navbar</div>
            
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video/:id" element={<Video />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;