import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers"

// components
import Nav from "../components/Nav";

// loader
export function mainLoader() {
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData();
  
    return (
      <div>
        <Nav userName={userName} />
        <main>
          <Outlet />
        </main>
      </div>
    );
  };

  export default Main;
  