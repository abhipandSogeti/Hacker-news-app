import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StandardLayout from './components/standard-layout/standard-layout';
import { HomePage } from './pages/home/home.page';
import { StoriesPage } from './pages/stories/stories.page';
import { AdminPage } from './pages/admin/admin.page';
import { StoryDetailsPage } from './pages/stories/story.details.page';
import LoginLayout from './components/login-layout/login-layout';


const router = createBrowserRouter([
  {
    element: <StandardLayout />,
    children: [
      { path: '/admin/:adminType', element: <AdminPage /> },
      { path: '/stories/:storyType', element: <StoriesPage /> },
      { path: '/stories/:storyType/:id', element: <StoryDetailsPage />},
     
    ]
  },
   {
    element: <LoginLayout />,
    children: [
      { path: '*', element: <HomePage /> },
      { path: '/login', element: <HomePage /> },
    ]
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
