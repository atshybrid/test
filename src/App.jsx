import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpaperSettings } from './redux/util/ePaperUtils';
import BaseView from './views/layout/BaseView';
import ErrorView from './views/layout/ErrorView';
import EPaper from './views/EPaper';
import PDFViewer from './views/PDFViewer';

const App = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.ePaper.settings)

  useEffect(() => {
    dispatch(fetchEpaperSettings())
  }, [dispatch])

  useEffect(() => {
    if (settings && settings.sitetitle) {
      document.title = settings.sitetitle;
    }

    const updateFavicon = (url) => {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = url;
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    if (settings?.favicon_logo) {
      updateFavicon(settings?.favicon_logo);
    }
  }, [settings]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseView />,
      errorElement: <ErrorView />,
      children: [
        {
          path: "/",
          element: <EPaper />,
        },
        {
          path: "/pdf-view/:id",
          element: <PDFViewer />,
        },
        {
          path: "*",
          element: <ErrorView />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App