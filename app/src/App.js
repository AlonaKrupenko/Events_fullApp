import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import EventsList from "./routes/EventsList";
import ViewEvent from "./routes/ViewEvent/ViewEvent";
import Register from "./routes/Register";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/view/:id" element={<ViewEvent />} />
        <Route path="/register/:id" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
