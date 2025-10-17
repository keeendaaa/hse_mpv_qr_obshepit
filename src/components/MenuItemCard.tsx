import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  onAddToCart: () => void;
  onItemClick: () => void;
}

export function MenuItemCard({
  name,
  description,
  price,
  image,
  onAddToCart,
  onItemClick,
}: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl cursor-pointer group"
      onClick={onItemClick}
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="flex-1">{name}</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="ml-3 p-2 rounded-full transition-colors"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
        
        <p className="text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-primary">{price} ₽</span>
        </div>
      </div>
    </motion.div>
  );
}
