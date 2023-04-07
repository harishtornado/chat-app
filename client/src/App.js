import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Chat from "./pages/chat";
import SetAvatar from "./pages/setAvatar";
import DashBoard from './pages/dashboard'
// import { AuthProvider } from "./contexts/authContext";
import styled from "styled-components";


function App() {
  return (
    <Container>
      <Router>
        {/* <AuthProvider> */}
          <Routes>
            <Route path="/chat" Component={Chat} />
            <Route path="/signup" Component={Signup} />
            <Route path="/login" Component={Login} />
            <Route exact path="/" Component={DashBoard} />
            <Route path="/setAvatar" Component={SetAvatar} />
          </Routes>
        {/* </AuthProvider> */}
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background:linear-gradient(45deg, #840eab,#ab0e8e,#ab0e61);
`
