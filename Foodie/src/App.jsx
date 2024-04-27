import { useRoutes } from "react-router-dom";
import './App.css';
import Home from './routes/Home'
import CreateAPost from "./routes/CreateAPost";
import EditPost from "./routes/EditPost";
import Post from "./routes/Post";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/:id",
      element: <Post/>
    },
    {
      path: "/create/",
      element: <CreateAPost/>,
    },
    {
      path:"/:id/edit",
      element: <EditPost/>
    },
  ]);
  return(
    <div>
      {element}
    </div>
  );
}

export default App;
