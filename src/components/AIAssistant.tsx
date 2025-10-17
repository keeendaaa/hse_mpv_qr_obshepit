import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: any[];
}

export function AIAssistant({ isOpen, onClose, menuItems }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я AI-ассистент ресторана. Могу рассказать о составе любого блюда, помочь с выбором или ответить на вопросы об аллергенах. Чем могу помочь?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Увеличиваем счетчик вопросов
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);

    setTimeout(() => {
      // Проверяем, нужно ли отвечать "иди нахуй" (каждые 3 вопроса)
      const aiResponse = newQuestionCount % 3 === 0 
        ? 'иди нахуй' 
        : generateAIResponse(input, menuItems);
        
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full md:w-[400px] z-50 p-4 md:p-6"
        >
          <div
            className="h-full rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
            }}
          >
            <div className="p-6 border-b border-white/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2>AI Ассистент</h2>
                </div>
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

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.isUser
                        ? 'rounded-br-sm'
                        : 'rounded-bl-sm'
                    }`}
                    style={
                      message.isUser
                        ? {
                            background: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
                            color: 'white',
                          }
                        : {
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.8)',
                          }
                    }
                  >
                    <p>{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-white/30">
              <div
                className="flex gap-2 p-2 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Задайте вопрос..."
                  className="flex-1 bg-transparent px-3 py-2 outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="p-3 rounded-xl text-white"
                  style={{
                    background: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
                  }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function generateAIResponse(question: string, menuItems: any[]): string {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('бургер')) {
    const burger = menuItems.find((item) => item.name.toLowerCase().includes('бургер'));
    if (burger) {
      return `${burger.name} содержит: ${burger.ingredients.join(', ')}. Калорийность примерно 650 ккал. Идеально подходит для сытного обеда!`;
    }
  }

  if (lowerQuestion.includes('паста') || lowerQuestion.includes('карбонара')) {
    const pasta = menuItems.find((item) => item.name.toLowerCase().includes('паста'));
    if (pasta) {
      return `${pasta.name} - классическое итальянское блюдо. Состав: ${pasta.ingredients.join(', ')}. Калорийность около 550 ккал.`;
    }
  }

  if (lowerQuestion.includes('салат')) {
    const salad = menuItems.find((item) => item.name.toLowerCase().includes('салат'));
    if (salad) {
      return `${salad.name} - легкий и питательный выбор. Ингредиенты: ${salad.ingredients.join(', ')}. Калорийность всего 280 ккал.`;
    }
  }

  if (lowerQuestion.includes('лосось') || lowerQuestion.includes('рыба')) {
    const salmon = menuItems.find((item) => item.name.toLowerCase().includes('лосось'));
    if (salmon) {
      return `${salmon.name} готовится из свежего лосося. Состав: ${salmon.ingredients.join(', ')}. Богат омега-3 жирными кислотами. Калорийность 480 ккал.`;
    }
  }

  if (lowerQuestion.includes('десерт') || lowerQuestion.includes('сладкое')) {
    return 'У нас есть прекрасные десерты: Шоколадный торт и Тирамису. Оба приготовл��ны нашим шеф-кондитером. Могу рассказать подробнее о любом из них!';
  }

  if (lowerQuestion.includes('аллерген') || lowerQuestion.includes('аллергия')) {
    return 'Пожалуйста, уточните, на какой продукт у вас аллергия, и я подскажу безопасные блюда. Мы можем адаптировать большинство блюд под ваши требования.';
  }

  if (lowerQuestion.includes('вегетариан') || lowerQuestion.includes('без мяса')) {
    return 'Из вегетарианских блюд рекомендую салат «Цезарь» (можно без курицы) и пасту Карбонара (можем приготовить в вегетарианском варианте).';
  }

  if (lowerQuestion.includes('рекоменд') || lowerQuestion.includes('посовет')) {
    return 'Сегодня рекомендую попробовать стейк из лосося - свежий улов! А на десерт - наше фирменное тирамису. Это сочетание получает самые восторженные отзывы!';
  }

  return 'Интересный вопрос! Я могу рассказать о составе любого блюда, порекомендовать что-то особенное или помочь с выбором. Просто спросите о конкретном блюде или скажите, что вы любите!';
}
