import { motion, AnimatePresence } from 'motion/react';
import { X, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  calories: number;
}

interface MenuItemDetailProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

export function MenuItemDetail({ item, isOpen, onClose, onAddToCart }: MenuItemDetailProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.2)',
                maxHeight: '90vh',
              }}
            >
              <div className="relative">
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-3 rounded-full text-white"
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
                <div>
                  <h2 className="mb-2">{item.name}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>

                <div>
                  <h3 className="mb-3">Состав</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ingredient, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(255, 255, 255, 0.7)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {ingredient}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Калорийность</span>
                    <span>{item.calories} ккал</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-1">Цена</p>
                    <span className="text-primary">{item.price} ₽</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onAddToCart();
                      onClose();
                    }}
                    className="flex-1 py-4 rounded-2xl text-white flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
                      boxShadow: '0 4px 16px 0 rgba(20, 184, 166, 0.3)',
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    В корзину
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
