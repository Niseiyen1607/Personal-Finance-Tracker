import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers"

import Nav from "../components/Nav";

export async function mainLoader() {
    const userName = await fetchData("userName");
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
  