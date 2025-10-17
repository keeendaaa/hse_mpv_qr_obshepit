import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSuccess: () => void;
}

export function CheckoutModal({ isOpen, onClose, total, onSuccess }: CheckoutModalProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsPaying(true);
    
    setTimeout(() => {
      setIsPaying(false);
      setIsSuccess(true);
      toast.success('Оплата прошла успешно!');
      
      setTimeout(() => {
        onSuccess();
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.2)',
              }}
            >
              <div className="p-6 border-b border-white/30">
                <div className="flex items-center justify-between">
                  <h2>Оплата заказа</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-full"
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {!isSuccess ? (
                  <>
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Сумма заказа</span>
                        <span>{total} ₽</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Сервисный сбор</span>
                        <span>0 ₽</span>
                      </div>
                      <div className="border-t border-white/30 mt-3 pt-3">
                        <div className="flex justify-between items-center">
                          <span>Итого</span>
                          <span className="text-primary">{total} ₽</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label>Номер карты</label>
                      <div
                        className="p-4 rounded-2xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full bg-transparent outline-none"
                          maxLength={19}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-3">
                        <label>Срок действия</label>
                        <div
                          className="p-4 rounded-2xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.8)',
                          }}
                        >
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full bg-transparent outline-none"
                            maxLength={5}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label>CVV</label>
                        <div
                          className="p-4 rounded-2xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.8)',
                          }}
                        >
                          <input
                            type="text"
                            placeholder="***"
                            className="w-full bg-transparent outline-none"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2"
                      style={{
                        background: isPaying 
                          ? 'rgba(20, 184, 166, 0.5)'
                          : 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
                        boxShadow: '0 4px 16px 0 rgba(20, 184, 166, 0.3)',
                      }}
                    >
                      {isPaying ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Обработка...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Оплатить {total} ₽
                        </>
                      )}
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="mb-2">Заказ оформлен!</h2>
                    <p className="text-muted-foreground">
                      Ваш заказ принят и скоро будет готов
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
