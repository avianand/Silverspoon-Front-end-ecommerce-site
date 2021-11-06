import { AutoAwesome, Category, DesignServices, Fastfood, LocalOffer, People, SupervisedUserCircle, ViewCarousel } from '@material-ui/icons';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';


// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  // blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  // chat: getIcon('ic_chat'),
  // mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  // kanban: getIcon('ic_kanban'),
  // banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  // analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  // booking: getIcon('ic_booking'),
  staffs: <People/>,
  banners: <ViewCarousel/>,
  customorders: <DesignServices/>,
  customers: <SupervisedUserCircle/>,
  flavours: <AutoAwesome/>,
  categories: <Category/>,
  promocodes: <LocalOffer/>,
  products: <Fastfood/>
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce }
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'My Account',
        path: PATH_DASHBOARD.user.account,
        icon: ICONS.user
        // children: [
        //   { title: 'profile', path: PATH_DASHBOARD.user.account },
        //   // { title: 'cards', path: PATH_DASHBOARD.user.cards },
        //   // { title: 'list', path: PATH_DASHBOARD.user.list },
        //   // { title: 'create', path: PATH_DASHBOARD.user.newUser },
        //   // { title: 'edit', path: PATH_DASHBOARD.user.account },
        //   // { title: 'account', path: PATH_DASHBOARD.user.account }

        // ]
      },

      // MANAGEMENT : Orders
      {
        title: 'orders',
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.cart,
        info: <Label color="error">2</Label>,
        children: [
          { title: 'list', path: PATH_DASHBOARD.order.list },
          { title: 'view', path: PATH_DASHBOARD.order.view }
        ]
      },

      // MANAGEMENT : Custom orders
      {
        title: 'custom orders',
        path: PATH_DASHBOARD.customorder.root,
        icon: ICONS.customorders,
        info: <Label color="error">2</Label>,
        children: [
          { title: 'view', path: PATH_DASHBOARD.customorder.list },
          // { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
          { title: 'edit', path: PATH_DASHBOARD.customorder.edit }
        ]
      },

      // MANAGEMENT : Products
      {
        title: 'products',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.products,
        children: [
          { title: 'view', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById }
        ]
      },

      // MANAGEMENT : Categories
      {
        title: 'categories',
        path: PATH_DASHBOARD.categories.root,
        icon: ICONS.categories,
        children: [
          { title: 'list', path: PATH_DASHBOARD.categories.list },
          { title: 'subcategories', path: PATH_DASHBOARD.subcategories.list },
          { title: 'create', path: PATH_DASHBOARD.categories.create },
          { title: 'edit', path: PATH_DASHBOARD.categories.edit }
        ]
      },

      // MANAGEMENT : Promo Codes
      {
        title: 'promocodes',
        path: PATH_DASHBOARD.promocode.root,
        icon: ICONS.promocodes,
        children: [
          { title: 'list', path: PATH_DASHBOARD.promocode.list },
          { title: 'create', path: PATH_DASHBOARD.promocode.create },
          { title: 'edit', path: PATH_DASHBOARD.promocode.edit }
        ]
      },

      // MANAGEMENT : Staff
      {
        title: 'staffs',
        path: PATH_DASHBOARD.staff.root,
        icon: ICONS.staffs,
        children: [
          { title: 'list', path: PATH_DASHBOARD.staff.list },
          { title: 'create', path: PATH_DASHBOARD.staff.create },
          { title: 'edit', path: PATH_DASHBOARD.staff.edit }
        ]
      },

      // MANAGEMENT : Banners
      {
        title: 'banners',
        path: PATH_DASHBOARD.general.banner,
        icon: ICONS.banners
      },

      // MANAGEMENT : Flavours
      {
        title: 'flavours',
        path: PATH_DASHBOARD.flavour.root,
        icon: ICONS.flavours,
        children: [
          { title: 'list', path: PATH_DASHBOARD.flavour.list },
          { title: 'create', path: PATH_DASHBOARD.flavour.create },
          { title: 'edit', path: PATH_DASHBOARD.flavour.edit }
        ]
      },

      // MANAGEMENT : Custom orders
      {
        title: 'customers',
        path: PATH_DASHBOARD.customer.root,
        icon: ICONS.customers,
        children: [{ title: 'list', path: PATH_DASHBOARD.customer.list }]
      }

      // { title: 'flavours', path: PATH_DASHBOARD.eCommerce.list },
      // { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      // { title: 'customers', path: PATH_DASHBOARD.eCommerce.list },
      // { title: 'banners', path: PATH_DASHBOARD.eCommerce.list },
      // { title: 'categories', path: PATH_DASHBOARD.eCommerce.list },
      // { title: 'promocodes', path: PATH_DASHBOARD.eCommerce.list },
      // { title: 'staffs', path: PATH_DASHBOARD.user.cards },
      // { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },

      // { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      // { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      // { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      // { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      // { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }

      // MANAGEMENT : BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
      //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
      //   ]
      // }
    ]
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      // {
      //   title: 'mail',
      //   path: PATH_DASHBOARD.mail.root,
      //   icon: ICONS.mail,
      //   info: <Label color="error">2</Label>
      // },
      // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar }
      // {
      //   title: 'kanban',
      //   path: PATH_DASHBOARD.kanban,
      //   icon: ICONS.kanban
      // }
    ]
  }
];

export default sidebarConfig;
