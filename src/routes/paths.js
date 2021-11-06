// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    banner: path(ROOTS_DASHBOARD, '/banner')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  // chat: {
  //   root: path(ROOTS_DASHBOARD, '/chat'),
  //   new: path(ROOTS_DASHBOARD, '/chat/new'),
  //   conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  // },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  // kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    // profile: path(ROOTS_DASHBOARD, '/user/profile'),
    // cards: path(ROOTS_DASHBOARD, '/user/cards'),
    // list: path(ROOTS_DASHBOARD, '/user/list'),
    // newUser: path(ROOTS_DASHBOARD, '/user/new'),
    // editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  order: {
    root: path(ROOTS_DASHBOARD, '/order'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/order/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: path(ROOTS_DASHBOARD, '/order/view/:id'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  customorder: {
    root: path(ROOTS_DASHBOARD, '/customorder'),
    list: path(ROOTS_DASHBOARD, '/customorder/list'),
    edit: path(ROOTS_DASHBOARD, '/customorder/edit/:id'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  flavour: {
    root: path(ROOTS_DASHBOARD, '/flavour'),
    list: path(ROOTS_DASHBOARD, '/flavour/list'),
    create: path(ROOTS_DASHBOARD, '/flavour/create'),
    edit: path(ROOTS_DASHBOARD, '/flavour/edit/:id')
  },
  categories: {
    root: path(ROOTS_DASHBOARD, '/categories'),
    list: path(ROOTS_DASHBOARD, '/categories/list'),
    create: path(ROOTS_DASHBOARD, '/categories/create'),
    edit: path(ROOTS_DASHBOARD, '/categories/edit/:id')
  },
  subcategories: {
    root: path(ROOTS_DASHBOARD, '/subcategories'),
    list: path(ROOTS_DASHBOARD, '/subcategories/list'),
    create: path(ROOTS_DASHBOARD, '/subcategories/new'),
    edit: path(ROOTS_DASHBOARD, '/subcategories/edit/:id')
  },
  staff: {
    root: path(ROOTS_DASHBOARD, '/staff'),
    list: path(ROOTS_DASHBOARD, '/staff/list'),
    edit: path(ROOTS_DASHBOARD, '/staff/edit/:id'),
    create: path(ROOTS_DASHBOARD, '/staff/create')
  },
  promocode: {
    root: path(ROOTS_DASHBOARD, '/promocode'),
    list: path(ROOTS_DASHBOARD, '/promocode/list'),
    edit: path(ROOTS_DASHBOARD, '/promocode/edit/:id'),
    create: path(ROOTS_DASHBOARD, '/promocode/create')
  },
  customer: {
    root: path(ROOTS_DASHBOARD, '/customer'),
    list: path(ROOTS_DASHBOARD, '/customer/list')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
