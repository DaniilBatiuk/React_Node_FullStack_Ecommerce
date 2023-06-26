import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './redux/store';

const App = React.lazy(() => import('./App'));
const Home = React.lazy(() => import('./pages/Home'));
const Categories = React.lazy(() => import('./pages/Categories'));
const ProductSelect = React.lazy(() => import('./pages/ProductSelect'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <React.Suspense>
        <App />
      </React.Suspense>,
    errorElement:
      <React.Suspense>
        <ErrorPage />
      </React.Suspense>,
    children: [
      {
        path: "/",
        element:
          <React.Suspense>
            <Home />
          </React.Suspense>,
      },
      {
        path: "/Categories/:category",
        element:
          <React.Suspense>
            <Categories />
          </React.Suspense>,
      }
      ,
      {
        path: "/Product/:id",
        element:
          <React.Suspense>
            <ProductSelect />
          </React.Suspense>,
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

