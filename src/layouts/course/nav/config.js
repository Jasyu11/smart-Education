// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/coursepage/user',
    icon: icon('ic_user'),
  },
  {
    title: 'assignment',
    path: '/coursepage/assignment',
    icon: icon('ic_user'),
  },
  {
    title: 'Discussion',
    path: '/coursepage/discussion',
    icon: icon('ic_cart'),
  },
  {
    title: 'LearningMaterial',
    path: '/coursepage/learningmaterial',
    icon: icon('ic_blog'),
  },

];

export default navConfig;
