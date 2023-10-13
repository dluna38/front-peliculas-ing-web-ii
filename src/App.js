import HomeView from "./components/HomeView";
import AdmistrarView from "./components/AdmistrarView";

import Nav from "./components/helpers/NavBar";
import {Route, Routes} from "react-router-dom";
import SimpleLoader from "./components/helpers/loading2";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path={"/"} element={<HomeView/>}/>
        <Route path={"/administrar"} element={<AdmistrarView/>}/>
        <Route path={"/test"} element={<SimpleLoader/>}/>
      </Routes>
    </div>
  );
}


export default App;
