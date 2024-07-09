import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
import AddNewBlob from "./pages/add-blob";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddNewBlob />} />
      </Routes>
    </div>
  );
}

export default App;
