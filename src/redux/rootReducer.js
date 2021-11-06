import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import orderReducer from './slices/admin/orders';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import customOrderReducer from './slices/admin/customorders';
import categoriesReducer from './slices/admin/categories';
import flavourReducer from './slices/admin/flavours';
import staffReducer from './slices/admin/staff';
import customerReducer from './slices/admin/customer';
import promoCodeReducer from './slices/admin/promocode';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  order: orderReducer,
  categories: categoriesReducer,
  flavour: flavourReducer,
  staff: staffReducer,
  customOrder: customOrderReducer,
  customer: customerReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  promocode: promoCodeReducer,
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };
