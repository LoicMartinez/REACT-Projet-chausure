import './App.css';
import MenuAppBar from "./components/NavBar";
import userContext from "./contexts/userContext";
import {useState} from "react";
import User from "./models/userModel";
import RoutePage from "./container/Route";
import {sesseionStatus} from "./lib/jwt";

function App() {
    const [user, setUser] = useState(new User(sesseionStatus()));
    console.log(process.env.REACT_APP_NOT_SECRET_CODE)
    return (
     <div className="App">
       <header className="App-header">
       <userContext.Provider value={{ user, setUser }}>
        <MenuAppBar/>
        <RoutePage/>
       </userContext.Provider>
       </header>
     </div>
   );
}

export default App;
