import Auth from '../../../../services/Auth';

/**
 * lists of links to display in the menu
 */

// menu for guests
export const guest = [
  {
    to: '/',
    label: 'home'
  },
  {
    to: '/signup',
    label: 'signup'
  },
  {
    to: '/login',
    label: 'login'
  }
];

// menu for logged users
export const user = [
  {
    to: '/',
    label: 'home'
  },
  {
    to: '/upload',
    label: 'upload'
  },
  {
    to: () => '/gallery/' + Auth.getUser().slug,
    label: 'my gallery'
  },
  {
    to: '/profile',
    label: 'profile'
  },
  {
    label: 'logout',
    onClick: Auth.logout,
    className: 'color-red-darken-2'
  }
];
