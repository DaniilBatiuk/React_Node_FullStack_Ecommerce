import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './redux/store';
import App from './App';

const Home = React.lazy(() => import('./pages/Home'));
const Categories = React.lazy(() => import('./pages/Categories'));
const ProductSelect = React.lazy(() => import('./pages/ProductSelect'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));
const Profile = React.lazy(() => import('./pages/Profile'));

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <App />,
    errorElement:
      <Suspense>
        <ErrorPage />
      </Suspense>,
    children: [
      {
        path: "/",
        element:
          <Suspense>
            <Home />
          </Suspense>,
      },
      {
        path: "/Categories/:category",
        element:
          <Suspense>
            <Categories />
          </Suspense>,
      }
      ,
      {
        path: "/Product/:id",
        element:
          <Suspense>
            <ProductSelect />
          </Suspense>,
      }
      ,
      {
        path: "/Profile",
        element:
          <Suspense>
            <Profile />
          </Suspense>,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

