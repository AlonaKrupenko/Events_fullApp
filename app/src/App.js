import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import EventsList from "./routes/EventsList";
import ViewEvent from "./routes/ViewEvent/ViewEvent";
import Register from "./routes/Register";
import NoMatch from "./components/NoMatch";

function App() {
  //! Make No match found to work properly (such id do not exist)
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/view/:id" element={<ViewEvent />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
