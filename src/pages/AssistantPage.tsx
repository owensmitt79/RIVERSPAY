import { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  ArrowLeft,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// AI KNOWLEDGE BASE – intent matching + responses
// ─────────────────────────────────────────────────────────────────────────────
interface KnowledgeEntry {
  patterns: string[];
  response: string;
  suggestions?: string[];
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start'],
    response:
      "Hello! 👋 I'm the **RiversPay AI Assistant**, here to help you with all your payment and banking needs. I can assist you with:\n\n• Payment status & transactions\n• Account issues & security\n• Fund transfers & bills\n• Getting started & registration\n• TSA payments & government services\n\nWhat can I help you with today?",
    suggestions: ['Check payment status', 'How do I transfer funds?', 'Account security', 'Register an account'],
  },
  {
    patterns: ['payment status', 'check payment', 'my payment', 'track payment', 'payment pending'],
    response:
      "To check your payment status:\n\n1. **Log in** to your RiversPay account at */login*\n2. Go to **Transaction History** in your dashboard\n3. Search by date, amount, or reference number\n4. Select the transaction to view full details\n\nIf a payment shows **Pending** for more than 24 hours, please contact us with your **transaction reference number** for immediate assistance.",
    suggestions: ['Transaction failed', 'Payment not received', 'Request refund'],
  },
  {
    patterns: ['transfer', 'send money', 'funds', 'move money', 'bank transfer'],
    response:
      "Here's how to transfer funds with RiversPay:\n\n1. **Log in** and go to *Transfer Funds*\n2. Enter the **recipient's bank details** or RiversPay ID\n3. Enter the **amount** and add a description\n4. Review the **service charge** (0.5% or ₦50 minimum)\n5. Confirm with your **PIN or biometric**\n\n✅ Transfers are instant for same-bank and usually within **2 hours** for inter-bank.\n\n*Daily limit: ₦5,000,000 for verified accounts*",
    suggestions: ['What are transfer limits?', 'Failed transfer', 'Check beneficiaries'],
  },
  {
    patterns: ['failed', 'declined', 'error', 'not working', 'transaction failed', 'payment failed'],
    response:
      "Sorry to hear that! Here are the most common reasons for failed transactions and how to fix them:\n\n❌ **Insufficient funds** → Top up your wallet or use a different account\n❌ **Wrong PIN/OTP** → Request a new OTP or reset your PIN\n❌ **Network timeout** → Check your internet and retry\n❌ **Daily limit exceeded** → Wait until midnight or upgrade your account tier\n❌ **Inactive account** → Contact support to reactivate\n\nIf your account was debited but the recipient didn't receive funds, the money will be **automatically reversed within 24-48 hours**.",
    suggestions: ['Reverse a transaction', 'Reset PIN', 'Contact support'],
  },
  {
    patterns: ['refund', 'reverse', 'chargeback', 'money back', 'dispute'],
    response:
      "To request a refund or reversal:\n\n1. Note your **Transaction Reference Number** (found in Transaction History)\n2. Go to **Help & Support** → *Dispute a Transaction*\n3. Fill in the dispute form with:\n   - Transaction date & amount\n   - Reason for dispute\n   - Supporting documents (optional)\n\n⏱ **Processing time:** 3–5 business days\n📞 For urgent reversals: Call **+234-800-RIVERSPAY** or email *support@riverspay.ng*",
    suggestions: ['What documents do I need?', 'How long does it take?', 'Contact support'],
  },
  {
    patterns: ['register', 'sign up', 'create account', 'open account', 'get started', 'new account'],
    response:
      "Creating a RiversPay account is quick and free! Here's how:\n\n**Personal Account:**\n- Full name, email, phone number\n- Valid government ID (NIN or BVN)\n- Takes about **5 minutes**\n\n**Sole-Signatory / Corporate:**\n- CAC registration documents\n- Director's ID and phone\n- Takes **1-2 business days** for verification\n\n👉 Visit our **/get-started** page to begin now!",
    suggestions: ['What documents do I need?', 'Personal vs corporate account', 'BVN verification'],
  },
  {
    patterns: ['bvn', 'nin', 'kyc', 'verify', 'verification', 'identity'],
    response:
      "**Identity Verification (KYC) at RiversPay:**\n\nWe require either your **BVN** (Bank Verification Number) or **NIN** (National Identity Number) to verify your account.\n\n🔒 Your data is encrypted and never shared with third parties.\n\n**Verification levels:**\n| Level | Daily Limit | Requirements |\n|---|---|---|\n| Basic | ₦50,000 | Phone + email |\n| Standard | ₦500,000 | BVN or NIN |\n| Premium | ₦5,000,000 | ID + address proof |\n\nTo upgrade your verification level, go to **Profile → Verification** in your account.",
    suggestions: ['How to upgrade my limit', 'BVN not found', 'Privacy policy'],
  },
  {
    patterns: ['password', 'forgot password', 'reset password', 'change password', 'locked', 'login issue'],
    response:
      "To reset your password:\n\n1. Go to **/login** and click **Forgot Password?**\n2. Enter your registered **email address**\n3. Check your email for a **reset link** (valid for 15 minutes)\n4. Create a strong new password (min. 8 chars, 1 uppercase, 1 number)\n\n⚠️ **Account locked?** After 5 failed attempts your account is locked for 30 minutes. Contact support if you need immediate access.\n\n💡 **Tip:** Enable **biometric login** in Settings for faster and more secure sign-in.",
    suggestions: ['Set up biometric login', 'Change my PIN', 'Account security tips'],
  },
  {
    patterns: ['pin', 'change pin', 'forgot pin', 'reset pin'],
    response:
      "**PIN Management:**\n\n🔑 **Forgot your PIN?**\n1. Log in to your account\n2. Go to **Settings → Security → Change PIN**\n3. Verify with OTP sent to your phone\n4. Enter your new 4-digit PIN\n\n⚠️ Never share your PIN with anyone, including RiversPay staff. We will **never** ask for it.",
    suggestions: ['Password reset', 'Account security', 'Enable 2FA'],
  },
  {
    patterns: ['tsa', 'treasury single account', 'government payment', 'government', 'state payment'],
    response:
      "**TSA (Treasury Single Account) Payments via RiversPay:**\n\nRiversPay is an authorized platform for Rivers State Government payments.\n\n**How to make a TSA payment:**\n1. Navigate to the **Recharge / Payment** section\n2. Select the **government service category**\n3. Enter your **reference number** or payer details\n4. Confirm the amount and **proceed to pay**\n5. A payment profile with your **RPN number** will be generated\n\n📄 Keep your **RPN (Reference Payment Number)** as proof of payment for all government transactions.",
    suggestions: ['Generate RSP number', 'Payment confirmation', 'Contact government agency'],
  },
  {
    patterns: ['bills', 'electricity', 'airtime', 'data', 'cable', 'subscription', 'recharge'],
    response:
      "**Bill Payments with RiversPay:**\n\nPay all your bills in one place:\n\n⚡ **Electricity** – PHED, EEDC, AEDC, etc.\n📱 **Airtime & Data** – MTN, Airtel, Glo, 9mobile\n📺 **Cable TV** – DSTV, GOtv, StarTimes\n🌐 **Internet** – Spectranet, Smile, Swift\n💧 **Water bills**\n🏛️ **Government levies & taxes**\n\nGo to the **Recharge** section in your account to get started. Payments are processed **instantly**.",
    suggestions: ['Check payment status', 'Failed bill payment', 'Set up auto-pay'],
  },
  {
    patterns: ['charge', 'fee', 'service charge', 'cost', 'how much', 'pricing'],
    response:
      "**RiversPay Fee Schedule:**\n\n| Service | Fee |\n|---|---|\n| Registration | **Free** |\n| Wallet top-up | Free |\n| Bill payments | ₦50 flat fee |\n| Funds transfer | 0.5% (max ₦1,000) |\n| Airtime purchase | Free |\n| Card maintenance | ₦100/month |\n| Government payments | As specified by agency |\n\n💡 Verified **Premium accounts** enjoy reduced fees and higher limits.",
    suggestions: ['Upgrade my account', 'Transfer limits', 'Contact billing'],
  },
  {
    patterns: ['security', 'safe', 'fraud', 'scam', 'suspicious', 'hack', 'protect'],
    response:
      "**Your Security is Our Priority 🔒**\n\nRiversPay uses bank-grade security:\n- **256-bit SSL encryption** on all connections\n- **Two-factor authentication (2FA)**\n- Real-time **fraud detection AI**\n- Automatic **session timeout** after 10 minutes\n\n**If you suspect fraud:**\n1. 🚨 **Immediately change your password and PIN**\n2. Call **+234-800-RIVERSPAY** (24/7 fraud line)\n3. We will **freeze your account** to prevent further loss\n\n⚠️ **RiversPay will NEVER:**\n- Ask for your PIN or password\n- Send you unsolicited bank links\n- Request remote access to your device",
    suggestions: ['Enable 2FA', 'Report suspicious activity', 'Change password'],
  },
  {
    patterns: ['contact', 'support', 'help', 'speak to agent', 'human', 'phone number', 'email'],
    response:
      "**Contact RiversPay Support:**\n\n📞 **Phone:** +234-800-RIVERSPAY (24/7)\n📧 **Email:** support@riverspay.ng\n💬 **Live Chat:** Available Mon–Fri, 8am–8pm\n🏢 **Head Office:** 1 Revenue House, Port Harcourt, Rivers State\n\n**Response Times:**\n- Phone: Immediate\n- Email: Within 4 business hours\n- Chat: Within 5 minutes\n\nFor urgent issues (fraud, large failed transfers), always **call directly** for fastest resolution.",
    suggestions: ['Report fraud', 'File a complaint', 'Find nearest branch'],
  },
  {
    patterns: ['developer', 'api', 'integration', 'webhook', 'sdk'],
    response:
      "**RiversPay Developer Platform:**\n\nIntegrate payments into your app with our powerful API:\n\n🔑 **Key Features:**\n- RESTful API with JSON responses\n- Webhooks for real-time notifications\n- SDKs in JavaScript, Python, PHP, Go\n- Sandbox for testing\n- 99.9% uptime SLA\n\n📚 Visit the **Developer Portal** at */developers* for full documentation, API keys, and code samples.\n\nFor enterprise integrations, email: **developers@riverspay.ng**",
    suggestions: ['View API docs', 'Get API key', 'Sandbox environment'],
  },
  {
    patterns: ['thank', 'thanks', 'thank you', 'great', 'helpful', 'good'],
    response:
      "You're welcome! 😊 I'm glad I could help.\n\nIs there anything else you'd like to know about RiversPay? I'm here 24/7 to assist you with any payment or account queries.",
    suggestions: ['Contact support', 'Back to home', 'Make a payment'],
  },
  {
    patterns: ['bye', 'goodbye', 'exit', 'done', 'close', 'nothing'],
    response:
      "Thank you for using the **RiversPay AI Assistant**! 👋\n\nHave a wonderful day. For future queries, you can always reach us here, via email, or call our 24/7 support line.\n\n*Simplifying payments across Rivers State.* 💙",
    suggestions: ['Back to home'],
  },
];

const FALLBACK_RESPONSES = [
  "I'm not quite sure I understand that. Could you rephrase your question? Or choose from the suggestions below to get started.",
  "That's a great question! While I don't have a specific answer, I'd recommend contacting our support team at **support@riverspay.ng** or calling **+234-800-RIVERSPAY** for personalized help.",
  "I want to make sure I give you accurate information. Could you provide more details about your issue? You can also use the quick suggestions below.",
];

// ─────────────────────────────────────────────────────────────────────────────
// AI ENGINE
// ─────────────────────────────────────────────────────────────────────────────
function getAIResponse(input: string): { response: string; suggestions?: string[] } {
  const lower = input.toLowerCase().trim();

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.patterns.some((p) => lower.includes(p))) {
      return { response: entry.response, suggestions: entry.suggestions };
    }
  }

  // Fallback
  const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  return {
    response: fallback,
    suggestions: ['Check payment status', 'Transfer funds', 'Contact support', 'Account security'],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  feedback?: 'up' | 'down' | null;
}

// Render markdown-lite (bold, bullet points)
function renderContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold **text**
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    const formatted2 = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());
    return (
      <span
        key={i}
        className={`block ${isBullet ? 'pl-2' : ''} ${i > 0 && line === '' ? 'h-3' : ''}`}
        dangerouslySetInnerHTML={{ __html: formatted2 }}
      />
    );
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        "Hello! 👋 I'm the **RiversPay AI Assistant**, here to help you with all your payment and banking needs. I can assist you with:\n\n• Payment status & transactions\n• Account issues & security\n• Fund transfers & bills\n• Getting started & registration\n• TSA payments & government services\n\nWhat can I help you with today?",
      timestamp: new Date(),
      suggestions: ['Check payment status', 'How do I transfer funds?', 'Account security', 'Register an account'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay (600ms – 1.4s based on response length)
    const { response, suggestions } = getAIResponse(text);
    const delay = 600 + Math.min(response.length * 2, 800);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        suggestions,
        feedback: null,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleFeedback = (msgId: string, type: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedback: type } : m))
    );
  };

  const handleCopy = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Chat cleared. How can I help you?",
        timestamp: new Date(),
        suggestions: ['Check payment status', 'Transfer funds', 'Contact support'],
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F0F4F8] font-sans">
      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 overflow-hidden">
                <img src="/logo.png" alt="RiversPay" className="w-9 h-9 object-contain" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <p className="font-bold text-[#0A2540] text-sm leading-tight">RiversPay Assistant</p>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                AI Online · Replies instantly
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Clear chat"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          New chat
        </button>
      </header>

      {/* ── Messages ─────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Avatar */}
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow border border-slate-100 overflow-hidden">
                <img src="/logo.png" alt="RiversPay" className="w-7 h-7 object-contain" />
              </div>
            )}

            <div className={`flex flex-col gap-2 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {/* Bubble */}
              <div
                className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#0070E0] text-white rounded-tr-sm'
                    : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100'
                }`}
              >
                <div className="space-y-0.5">
                  {renderContent(msg.content)}
                </div>
              </div>

              {/* Time + actions (assistant only) */}
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[10px] text-slate-400">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="Copy"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {msg.feedback === null && (
                    <>
                      <button
                        onClick={() => handleFeedback(msg.id, 'up')}
                        className="text-slate-400 hover:text-emerald-500 transition-colors"
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, 'down')}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Not helpful"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  {msg.feedback === 'up' && <span className="text-[10px] text-emerald-500">Thanks! 👍</span>}
                  {msg.feedback === 'down' && <span className="text-[10px] text-red-400">Noted, we'll improve!</span>}
                </div>
              )}

              {/* Quick reply suggestions */}
              {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#0070E0] text-[#0070E0] hover:bg-[#0070E0] hover:text-white transition-all font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User avatar */}
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-slate-500" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow border border-slate-100 overflow-hidden">
              <img src="/logo.png" alt="RiversPay" className="w-7 h-7 object-contain" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* ── Input Bar ────────────────────────────────────────────── */}
      <div className="bg-white border-t border-slate-200 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {/* Disclaimer */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-3 justify-center">
            <AlertCircle className="w-3 h-3" />
            AI responses are for guidance only. Contact support for account-specific issues.
          </div>

          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-[#0070E0] focus-within:ring-2 focus-within:ring-blue-50 transition-all shadow-sm">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about RiversPay…"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                disabled={isTyping}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 flex-shrink-0 bg-[#0070E0] hover:bg-[#0052A3] text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-blue-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400 mt-3 font-medium tracking-widest uppercase">
            Powered by RiversPay Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
