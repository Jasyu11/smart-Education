import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import CourseLayout from './layouts/course';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Assignment from './pages/Assignment';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AssignmentDetail from './pages/AssignmentDetail';
import AssignmentMark from './pages/AssignmentMark';
import Profile from './pages/Profile';
import Register from './pages/Register';
import CreatingAvatar from './pages/CreatingAvatar';
import AssignmentDetailMCQ from './pages/AssignmentMCQ';
import CoursePage from './pages/CoursePage';
import Discussion from './pages/Discussion';
import Upload from './pages/Upload';
import LearningMaterial from './pages/LearningMaterial';
import CreateCourse from './pages/CreateCourse';
import Courses from './pages/AllCourses';
import Assign from './pages/Assign';
import CreateDis from './pages/CreateDis';
import CreatingAssign from './pages/CreatingAssign';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'CreatingCourses', element: <CreateCourse/>},
        { path: 'Courses', element: <Courses/>},
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <Profile/>,},
        { path: 'creatingavatar', element: <CreatingAvatar/>},
      ],
    },
    { path: '/coursepage' ,
    element: <CourseLayout/>,
    children:[
      {element:<Navigate to='/coursepage/app'/>, index: true},
      { path: 'app', element: <CoursePage/>},
      { path: 'user', element: <UserPage /> },
      { path: 'assignment', element: <Assignment /> },
      { path: 'assignmentDetail', element: <AssignmentDetail/>},
        { path: 'assignmentMCQ', element: <AssignmentDetailMCQ />},
        { path: 'assignmentMark', element: <AssignmentMark/>},
      { path: 'Discussion', element: <Discussion/>},
      { path: 'LearningMaterial', element: <LearningMaterial/>},
      { path: 'Upload', element: <Upload/>},
      {path: 'addDiscussion', element: <CreateDis/>},
      {path: 'addAssignment', element: <CreatingAssign/>},

    ]
  },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: 'register', element: <Register/>
    },

    {
      path: 'Assign', element: <Assign/>
    },
  ]);

  return routes;
}
