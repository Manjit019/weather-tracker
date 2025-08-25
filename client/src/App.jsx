import Home from "./pages/Home";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import WeatherResult from "./pages/WeatherResult";
import NotFound from "./pages/NotFound";
import AppLayout from "./layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/weather/:city",
        element: <WeatherResult />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
