/**
 * Enhanced State Management for Efex Luxury V2
 * Real-time Sync, Simulated Auth & DB
 */

const STORAGE_KEY = 'efex_db_v2';

// Dummy Data
const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: 'The Royal Agbada', 
    price: 150000, 
    category: 'Suits', 
    department: 'Men',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    name: 'Velvet Evening Gown', 
    price: 95000, 
    category: 'Dresses', 
    department: 'Women',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    name: 'Onyx Gold Watch', 
    price: 450000, 
    category: 'Accessories', 
    department: 'Men',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    name: 'Lagos City Loafers', 
    price: 65000, 
    category: 'Shoes',
    department: 'Men', 
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop' 
  },
  {
    id: 5,
    name: 'Silk Ankara Scarf',
    price: 25000,
    category: 'Accessories',
    department: 'Women',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Kids Festiva Set',
    price: 35000,
    category: 'Cloths',
    department: 'Children',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop'
  }
];

const defaultState = {
  user: null, // Current logged in user
  users: [], // Registered users database
  cart: [], // { productId, qty }
  products: INITIAL_PRODUCTS,
  orders: [], // User orders
  cms: {
    heroText: "Experience the Future of Luxury Fashion",
    heroSubText: "Curated for the bold. Authentic. Timeless.",
  }
};

const loadState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  // Merge defaults if products missing (migration hack for dev)
  const loaded = stored ? JSON.parse(stored) : defaultState;
  if (!loaded.products || loaded.products.length === 0) loaded.products = INITIAL_PRODUCTS;
  return loaded;
};

const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Reactive Store
const listeners = new Set();

const createStore = () => {
  const data = loadState();

  const handler = {
    set(target, prop, value) {
      target[prop] = value;
      saveState(data);
      notify();
      return true;
    },
    get(target, prop) {
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return new Proxy(target[prop], handler);
      }
      return target[prop];
    }
  };

  const proxy = new Proxy(data, handler);

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const notify = () => {
    listeners.forEach(cb => cb(proxy));
  };

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      const newState = JSON.parse(e.newValue);
      Object.assign(data, newState);
      notify();
    }
  });

  return { state: proxy, subscribe };
};

export const { state, subscribe } = createStore();

// Actions
export const actions = {
  register: (email, password, phone, location) => {
    if (state.users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    const newUser = { 
      email, 
      password, 
      phone, 
      location,
      name: email.split('@')[0], 
      role: 'user' 
    };
    state.users.push(newUser);
    state.user = newUser; // Auto login
    saveState(state); // Force save for array push
    return newUser;
  },

  login: (email, password) => {
    const user = state.users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    state.user = user;
    return user;
  },

  logout: () => {
    state.user = null;
  },

  addToCart: (product) => {
    const existing = state.cart.find(item => item.productId === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ productId: product.id, qty: 1, product });
    }
    saveState(state); // Force save
    listeners.forEach(cb => cb(state)); // Force notify
  },

  removeFromCart: (productId) => {
    state.cart = state.cart.filter(item => item.productId !== productId);
  },

  clearCart: () => {
    state.cart = [];
  },

  // Admin Actions
  addProduct: (product) => {
    const newProduct = {
        ...product,
        // Default department if not provided
        department: product.department || 'Accessories', 
        id: Date.now(), // Simple unique ID
    };
    state.products.unshift(newProduct);
    saveState(state);
    listeners.forEach(cb => cb(state));
  },

  toggleOrderStatus: (orderId) => {
     // Admin only in real app, but simplified here
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = order.status === 'Pending' ? 'Paid' : 'Pending';
      saveState(state);
      listeners.forEach(cb => cb(state));
    }
  },

  checkout: () => {
    if (state.cart.length === 0) return;
    
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      total: '₦' + state.cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0).toLocaleString(),
      status: 'Pending',
      items: state.cart.map(i => ({
        name: i.product.name,
        image: i.product.image,
        qty: i.qty
      }))
    };
    
    state.orders.unshift(newOrder); // Add to top
    state.cart = [];
    saveState(state);
    listeners.forEach(cb => cb(state));
  }
};
