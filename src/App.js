import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";  // if we put or not put file extension then react auto treat it as js file.
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => {  // React component -> It is a fuction that return some piece of jsx
  
  return (
    <div className="app">
      <Header />
    
      <Outlet /> {/* It is a component. Whenever there is change in path the outlet will be filled children according to the path. (it replaced by the component acc to path not shown in html) */}
    </div>
  );
}

// Chunking
//  code splitting
// dynamic bundling
//  lazy loading
// On demand loading
//  dynamic import 

// Breakdown your app into smaller logical chunks (make smaller bundles of applicaion.) .

// Page - 60
// Lazy loading -> How to make diff bundle for Grocery and Delivery in our Application. [ Distribute our code into diff chunks ] -> to reduce bundle size of App.

// Page -> 61 (Lazy Loading/ on Demand Loading) -> if we directly import Grocery then when App.js load it also load the code of Grocery.
// By we want if we go to the grocery then only code of grocery will be loaded there that is K/as lazy Loading / on demand loading.
// Lazy come from react as name import which take call back fun & in call back fun we write our import & the import is basically a function and this fun take the path of the grocery.

// when we run our app then in inspect(network) we see only index.js which don't have grocery code but when we go to grocery page then it load the code for grocery so
// in inspect(network) we have index and grocery.js(which have grocery code) file. And Grocery code load only when we go to grocery page.

// when we go to grocery react give error bcz grocery code take some time to come & react is very fast. so in that particular time (middle sate)
// when the code is not there react show error . so to handle this we wrap our Grocery component in Suspense (which come from react as named import).
// We can give fallback to suspense so that what should react render when the code is not avaiable (kind of loading screen). we can only pass JSX (we can pass compenent also (like shimmer)).

const Grocery = lazy(() => import("./components/Grocery"));

// create children route so that our header is same for all page and just body is chage.
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // it also take array of object.
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/Grocery",
        element: <Suspense fallback={<h1>Loading ...</h1>}>  <Grocery />  </Suspense>
        // element:  <Suspense fallback={<Shimmer/>}>  <Grocery />  </Suspense>
      },
      {
        path: "/restaurant/:resId", // use to make dynamic component here resId is dynamic means it change acc to rest id (we tell it is dynamic path by giving ':')
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout/>)

root.render(<RouterProvider router={appRouter} />)  // by this we provide router configuration to render it