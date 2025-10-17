import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, Search, Menu, QrCode } from 'lucide-react';
import { MenuItemCard } from './components/MenuItemCard';
import { AIAssistant } from './components/AIAssistant';
import { CartDrawer } from './components/CartDrawer';
import { MenuItemDetail } from './components/MenuItemDetail';
import { CheckoutModal } from './components/CheckoutModal';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  calories: number;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Бургер Премиум',
    description: 'Сочная говяжья котлета с карамелизированным луком, беконом и фирменным соусом',
    price: 650,
    image: '/assets/images/burger-premium.jpg',
    ingredients: ['Говя��ина', 'Бекон', 'Сыр чеддер', 'Лук', 'Салат', 'Томаты', 'Фирменный соус'],
    calories: 680,
    category: 'Основное',
  },
  {
    id: '2',
    name: 'Паста Карбонара',
    description: 'Классическая итальянская паста с беконом гуанчиале, яйцом и пармезаном',
    price: 550,
    image: '/assets/images/pasta-carbonara.jpg',
    ingredients: ['Спагетти', 'Бекон гуанчиале', 'Яйца', 'Пармезан', 'Черный перец', 'Чеснок'],
    calories: 520,
    category: 'Основное',
  },
  {
    id: '3',
    name: 'Салат Цезарь',
    description: 'Хрустящий салат романо с курицей гриль, пармезаном и классическим соусом',
    price: 420,
    image: '/assets/images/caesar-salad.jpg',
    ingredients: ['Салат романо', 'Курица', 'Пармезан', 'Гренки', 'Соус Цезарь', 'Лимон'],
    calories: 280,
    category: 'Салаты',
  },
  {
    id: '4',
    name: 'Стейк из лосося',
    description: 'Нежный стейк норвежского лосося с овощами гриль и лимонным маслом',
    price: 890,
    image: '/assets/images/salmon-steak.jpg',
    ingredients: ['Лосось', 'Цукини', 'Болгарский перец', 'Спаржа', 'Лимонное масло', 'Тимьян'],
    calories: 480,
    category: 'Основное',
  },
  {
    id: '5',
    name: 'Шоколадный торт',
    description: 'Насыщенный шоколадный торт с ганашем и свежими ягодами',
    price: 380,
    image: '/assets/images/chocolate-cake.jpg',
    ingredients: ['Шоколад', 'Яйца', 'Мука', 'Сливки', 'Ягоды', 'Сахар'],
    calories: 420,
    category: 'Десерты',
  },
  {
    id: '6',
    name: 'Тирамису',
    description: 'Классический итальянский десерт с маскарпоне и кофе',
    price: 420,
    image: '/assets/images/tiramisu.jpg',
    ingredients: ['Маскарпоне', 'Савоярди', 'Эспрессо', 'Какао', 'Яйца', 'Сахар'],
    calories: 380,
    category: 'Десерты',
  },
];

export default function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');

  const categories = ['Все', 'Основное', 'Салаты', 'Десерты'];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Все' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }];
    });
    toast.success(`${item.name} добавлен в корзину`);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
      toast.info('Товар удален из корзины');
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    toast.success('Ваш заказ отправлен на кухню!');
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C3333 0%, #3A4243 100%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(94, 234, 212, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(45, 212, 191, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className="rounded-3xl p-6"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
                  }}
                >
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1>Меню ресторана</h1>
                  <p className="text-muted-foreground">Стол №12</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAIOpen(true)}
                  className="p-3 rounded-2xl relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className="p-3 rounded-2xl relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </div>

            <div
              className="mb-4 p-3 rounded-2xl flex items-center gap-3"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
              }}
            >
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск блюд..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className="px-5 py-2 rounded-full whitespace-nowrap transition-all"
                  style={
                    activeCategory === category
                      ? {
                          background: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
                          color: 'white',
                        }
                      : {
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                        }
                  }
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MenuItemCard
                {...item}
                onAddToCart={() => addToCart(item)}
                onItemClick={() => setSelectedItem(item)}
              />
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div
              className="inline-block p-8 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Menu className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Блюда не найдены</p>
            </div>
          </motion.div>
        )}
      </div>

      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        menuItems={menuItems}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <MenuItemDetail
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onAddToCart={() => selectedItem && addToCart(selectedItem)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onSuccess={handleCheckoutSuccess}
      />

      <Toaster position="top-center" />
    </div>
  );
}
