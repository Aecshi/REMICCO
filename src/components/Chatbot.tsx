import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Bot, User, Minimize2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FAQItem {
  question: string;
  keywords: string[];
  answer: string;
  category: 'membership' | 'loans' | 'savings' | 'general' | 'services';
}

// Comprehensive FAQ Database
const faqDatabase: FAQItem[] = [
  // Membership Questions
  {
    question: "How do I become a member?",
    keywords: ['member', 'join', 'membership', 'sign up', 'register', 'become'],
    answer: "To become a REMICCO member: 1) Be a resident of Oriental or Occidental Mindoro, 2) Pay the membership fee of ₱100, 3) Subscribe to a minimum share capital of ₱500, 4) Submit valid government ID and proof of residency. Visit our office in Victoria to complete your membership application!",
    category: 'membership'
  },
  {
    question: "What are membership requirements?",
    keywords: ['requirements', 'require', 'need', 'documents', 'papers'],
    answer: "Membership requirements: Valid government ID (UMID, Driver's License, Passport, etc.), Proof of residence (barangay certificate, utility bill), Completed membership form, Membership fee (₱100), and Initial share capital (minimum ₱500). Additional documents may be required for specific services.",
    category: 'membership'
  },
  {
    question: "What are member benefits?",
    keywords: ['benefit', 'advantage', 'perks', 'why join'],
    answer: "Member benefits include: Competitive loan interest rates, Annual dividends on share capital, Access to savings and time deposit programs, Educational scholarships, Emergency financial assistance, Life insurance coverage, Participation in cooperative governance, and Community outreach programs.",
    category: 'membership'
  },
  
  // Loan Questions
  {
    question: "What types of loans do you offer?",
    keywords: ['loan', 'borrow', 'lend', 'credit', 'utang'],
    answer: "REMICCO offers: 1) Personal Loans (for personal expenses), 2) Emergency Loans (quick release for urgent needs), 3) Business/Livelihood Loans (capital for business ventures), 4) Educational Loans (for tuition and school expenses), 5) Housing Loans (for home purchase or renovation), and 6) Appliance Loans. Terms and rates vary by loan type.",
    category: 'loans'
  },
  {
    question: "How do I apply for a loan?",
    keywords: ['apply', 'application', 'process', 'how to loan'],
    answer: "Loan application process: 1) Be a member in good standing for at least 3 months, 2) Submit loan application form, 3) Provide required documents (ID, proof of income, collateral if applicable), 4) Attend loan counseling, 5) Wait for approval (usually 3-5 business days), 6) Release of loan proceeds. Visit our office for detailed assistance!",
    category: 'loans'
  },
  {
    question: "What is the loan interest rate?",
    keywords: ['interest', 'rate', 'percentage', 'charges', 'fees'],
    answer: "Our interest rates are competitive and member-friendly, ranging from 1% to 2% per month depending on loan type and term. Rates are significantly lower than commercial banks and lending institutions. Visit our office for current rates and complete fee schedule, including service fees and insurance charges.",
    category: 'loans'
  },
  {
    question: "How much can I borrow?",
    keywords: ['amount', 'limit', 'maximum', 'borrow limit', 'how much'],
    answer: "Loan amounts vary based on: Your share capital (typically 3-5x your shares), Length of membership, Payment history, and Type of loan. Emergency loans: ₱5,000-₱20,000. Personal loans: Up to ₱200,000. Business loans: Up to ₱500,000. Housing loans can go higher with proper collateral.",
    category: 'loans'
  },
  {
    question: "What is the payment term?",
    keywords: ['term', 'duration', 'payment', 'months', 'years', 'pay'],
    answer: "Payment terms are flexible: Emergency loans: 3-6 months, Personal loans: 6-36 months, Business loans: 12-60 months, Housing loans: Up to 15 years. Payments are typically monthly through salary deduction or over-the-counter. Early payment is allowed without penalty!",
    category: 'loans'
  },
  
  // Savings Questions
  {
    question: "What savings products are available?",
    keywords: ['savings', 'save', 'deposit', 'account', 'ipon'],
    answer: "REMICCO savings products: 1) Regular Savings (minimum ₱100 initial deposit, withdrawable anytime), 2) Time Deposits (higher interest rates, 3-12 months term), 3) Voluntary Shares (earns dividends, part of equity), 4) Kids Savings Account (for children's future). All insured up to ₱100,000 by PDIC.",
    category: 'savings'
  },
  {
    question: "What is the interest rate on savings?",
    keywords: ['savings rate', 'interest savings', 'earn', 'dividend'],
    answer: "Regular savings earn 2% annual interest. Time deposits earn 3-5% depending on term. Voluntary shares earn annual dividends (historically 8-12%, varies yearly). Interest is credited quarterly for savings, and dividends are distributed during our Annual General Assembly.",
    category: 'savings'
  },
  {
    question: "Can I withdraw my savings anytime?",
    keywords: ['withdraw', 'get money', 'kuha', 'cash out'],
    answer: "Yes! Regular savings can be withdrawn anytime during office hours. Time deposits have a maturity date but can be withdrawn early with reduced interest. Voluntary shares require a written request and board approval. Maintaining a minimum balance of ₱500 is recommended to keep your account active.",
    category: 'savings'
  },
  
  // General/Operations Questions
  {
    question: "What are your office hours?",
    keywords: ['hours', 'schedule', 'open', 'time', 'when'],
    answer: "REMICCO office hours: Monday to Friday, 8:00 AM - 5:00 PM (with lunch break 12:00-1:00 PM). We are closed on weekends, national holidays, and special cooperative holidays. For urgent matters, you can reach us through our hotline or Facebook page.",
    category: 'general'
  },
  {
    question: "Where is your office located?",
    keywords: ['location', 'address', 'where', 'office', 'saan'],
    answer: "Our main office is located in Victoria, Oriental Mindoro. For complete address, contact numbers, and directions, please visit the Contact page on our website or call us during business hours. We also conduct extension services in select barangays monthly.",
    category: 'general'
  },
  {
    question: "How can I contact REMICCO?",
    keywords: ['contact', 'call', 'phone', 'email', 'facebook'],
    answer: "You can reach us through: Phone (during office hours), Email (check our Contact page), Facebook page (REMICCO Credit Cooperative), or visit us personally in Victoria. We respond to messages within 24 hours on business days. For urgent matters, calling is recommended.",
    category: 'general'
  },
  {
    question: "Is my money safe with REMICCO?",
    keywords: ['safe', 'secure', 'insured', 'protected', 'pdic'],
    answer: "Yes, absolutely! REMICCO is: 1) Registered with the Cooperative Development Authority (CDA), 2) Insured by PDIC up to ₱100,000 per depositor, 3) Regularly audited by independent auditors and CDA, 4) Governed by an elected Board of Directors from our members, 5) Operating under cooperative principles of transparency and member welfare.",
    category: 'general'
  },
  {
    question: "Do you have scholarships?",
    keywords: ['scholarship', 'study', 'student', 'education', 'school'],
    answer: "Yes! REMICCO offers educational scholarships to qualified dependents of members. Scholarships cover tuition fees for college, senior high school, and vocational courses. Applications open annually in May-June. Requirements include good academic standing, proof of enrollment, and member in good standing status.",
    category: 'services'
  },
  {
    question: "What is the Annual General Assembly?",
    keywords: ['assembly', 'aga', 'general assembly', 'meeting'],
    answer: "The Annual General Assembly (AGA) is our yearly gathering where members: 1) Receive financial reports, 2) Elect Board of Directors, 3) Vote on important cooperative matters, 4) Receive dividends and patronage refunds, 5) Participate in raffles and programs. Attendance is encouraged as it's your right and responsibility as a member!",
    category: 'general'
  },
  
  // Greetings
  {
    question: "Hello",
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'kumusta'],
    answer: "Hello! Welcome to REMICCO Credit Cooperative! I'm here to help answer your questions. You can ask about membership, loans, savings, or any of our services. How can I assist you today?",
    category: 'general'
  }
];

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for exact or close matches first
  for (const faq of faqDatabase) {
    for (const keyword of faq.keywords) {
      if (lowerMessage.includes(keyword)) {
        return faq.answer;
      }
    }
  }
  
  // Default response with helpful suggestions
  return "I'm not sure about that specific question, but I can help you with:\n\n• Membership requirements and benefits\n• Loan types and application process\n• Savings accounts and interest rates\n• Office hours and location\n• Scholarships and other services\n\nTry clicking one of the suggested questions below, or visit our office for personalized assistance!";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Welcome to REMICCO Credit Cooperative! I\'m here to answer your questions about membership, loans, savings, and our services. Choose a topic below or type your question!',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleMinimize = useCallback(() => {
    console.log('Toggle minimize - current state:', isMinimized);
    setIsMinimized(prev => !prev);
  }, [isMinimized]);

  const closeChat = useCallback(() => {
    console.log('Close chat');
    setIsOpen(false);
  }, []);

  const openChat = useCallback(() => {
    console.log('Open chat');
    setIsOpen(true);
  }, []);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const resetChat = () => {
    setMessages([{
      id: '1',
      content: '👋 Welcome to REMICCO Credit Cooperative! I\'m here to answer your questions about membership, loans, savings, and our services. Choose a topic below or type your question!',
      sender: 'bot',
      timestamp: new Date(),
    }]);
  };

  const quickQuestions = [
    'How do I become a member?',
    'What types of loans do you offer?',
    'How do I apply for a loan?',
    'What is the loan interest rate?',
    'What savings products are available?',
    'Can I withdraw my savings anytime?',
    'What are your office hours?',
    'Do you have scholarships?',
    'What are member benefits?',
    'Is my money safe?'
  ];

  const categories = [
    { name: '👤 Membership', questions: quickQuestions.slice(0, 3) },
    { name: '💰 Loans', questions: quickQuestions.slice(3, 6) },
    { name: '🏦 Savings & Services', questions: quickQuestions.slice(6, 10) }
  ];

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={openChat}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group pointer-events-auto"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full animate-pulse flex items-center justify-center">
          <HelpCircle className="w-3 h-3 text-white" />
        </span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[9999] bg-card border-2 border-primary/20 rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden pointer-events-auto flex flex-col",
        isMinimized ? "w-80 h-16" : "w-[400px] h-[600px] max-h-[80vh]"
      )}
    >
      {/* Header - Always Visible */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 bg-gradient-to-r from-primary to-secondary text-white relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base">REMICCO Assistant</h3>
            <p className="text-xs text-white/90 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online • Always ready
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 relative z-50">
          <button
            type="button"
            className="h-9 w-9 text-white hover:bg-white/20 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            onClick={toggleMinimize}
            aria-label="Minimize chat"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="h-9 w-9 text-white hover:bg-white/20 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            onClick={closeChat}
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-background">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in-up",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === 'bot' && (
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border rounded-bl-sm"
                  )}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {message.content}
                </div>
                {message.sender === 'user' && (
                  <div className="w-9 h-9 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 items-center animate-fade-in">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions by Category - Always Visible */}
          <div className="flex-shrink-0 px-4 py-3 border-t-2 border-primary/10 bg-card/50 backdrop-blur-sm max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-primary flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Select a Question:
              </p>
              {messages.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    resetChat();
                  }}
                  className="text-xs h-7 px-2 text-muted-foreground hover:text-primary pointer-events-auto"
                >
                  Reset Chat
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name}>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">{category.name}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.questions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSendMessage(q);
                        }}
                        className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-200 cursor-pointer pointer-events-auto border border-primary/20 hover:scale-105"
                        disabled={isTyping}
                      >
                        {q.length > 25 ? q.substring(0, 25) + '...' : q}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-3 pt-2 border-t border-border/50">
              For detailed assistance, visit our office or call us!
            </p>
          </div>
        </>
      )}
    </div>
  );
}
