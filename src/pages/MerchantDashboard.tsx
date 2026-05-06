import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Clock, 
  Settings, 
  HelpCircle, 
  Bell, 
  Search,
  Filter,
  Download,
  CreditCard,
  Users,
  ChevronRight,
  TrendingUp,
  MoreVertical,
  LogOut
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', amount: 4000 },
  { name: 'Tue', amount: 3000 },
  { name: 'Wed', amount: 2000 },
  { name: 'Thu', amount: 2780 },
  { name: 'Fri', amount: 1890 },
  { name: 'Sat', amount: 2390 },
  { name: 'Sun', amount: 3490 },
];

const transactions = [
  { id: 'TX-9021', customer: 'Sarah Johnson', email: 'sarah@example.com', amount: '₦45,000.00', status: 'Success', date: 'Oct 24, 2026', type: 'Card' },
  { id: 'TX-9022', customer: 'Michael Chen', email: 'm.chen@tech.org', amount: '₦12,500.00', status: 'Success', date: 'Oct 24, 2026', type: 'Bank Transfer' },
  { id: 'TX-9023', customer: 'Rivers State Water', email: 'billing@rswater.gov', amount: '₦8,200.00', status: 'Pending', date: 'Oct 23, 2026', type: 'USSD' },
  { id: 'TX-9024', customer: 'David Okoro', email: 'david@okoro.me', amount: '₦120,000.00', status: 'Failed', date: 'Oct 23, 2026', type: 'Card' },
  { id: 'TX-9025', customer: 'Emma Wilson', email: 'emma.w@gmail.com', amount: '₦5,400.00', status: 'Success', date: 'Oct 22, 2026', type: 'Wallet' },
];

export default function MerchantDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Transactions', icon: ArrowUpRight },
    { name: 'Payouts', icon: Wallet },
    { name: 'Customers', icon: Users },
    { name: 'Settlements', icon: Clock },
    { name: 'API Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B] text-slate-400 flex flex-col border-r border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1a9e87] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">RiversPay</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.name 
                  ? 'bg-[#1a9e87] text-white shadow-lg shadow-[#1a9e87]/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-white' : 'text-slate-500 group-hover:text-[#1a9e87]'}`} />
              <span className="font-medium text-sm">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">JD</div>
              <div className="flex-1 overflow-hidden">
                <p className="text-white text-sm font-semibold truncate">Jane Doe</p>
                <p className="text-xs text-slate-500 truncate">TechNova Ltd.</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-[#1a9e87] rounded-full text-sm outline-none transition-all w-64"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Welcome & Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 flex items-center justify-between shadow-sm">
              <div>
                <h3 className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-xs">Settlement Balance</h3>
                <p className="text-4xl font-bold text-slate-800 mb-6">₦2,450,000.85</p>
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 bg-[#1a9e87] text-white rounded-xl font-bold hover:bg-[#158070] transition-all shadow-lg shadow-[#1a9e87]/20 flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4" />
                    Request Payout
                  </button>
                  <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all">
                    View Ledger
                  </button>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="w-24 h-24 bg-[#1a9e87]/10 rounded-3xl flex items-center justify-center">
                  <Wallet className="w-12 h-12 text-[#1a9e87]" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-[2rem] text-white flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-[#1a9e87]" />
                  </div>
                  <span className="text-[10px] font-bold bg-[#1a9e87] px-2 py-0.5 rounded-full uppercase">Virtual Terminal</span>
                </div>
                <p className="text-slate-400 text-xs mb-1">Total Collections Today</p>
                <p className="text-2xl font-bold">₦482,900.00</p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </div>
                <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors">
                  View Insights
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Charts & Quick Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Revenue Chart */}
            <div className="xl:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Transaction Volume</h4>
                  <p className="text-sm text-slate-500">Revenue overview for the last 7 days</p>
                </div>
                <select className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#1a9e87]">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a9e87" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#1a9e87" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 12}}
                      dy={10}
                    />
                    <YAxis 
                      hide
                    />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                      itemStyle={{color: '#1a9e87', fontWeight: 'bold'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#1a9e87" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions & Stats */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4">Quick Stats</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">Success Rate</span>
                    </div>
                    <span className="font-bold text-slate-800">98.4%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <ArrowDownLeft className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">Pending Ref.</span>
                    </div>
                    <span className="font-bold text-slate-800">4</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a9e87] p-6 rounded-[2rem] text-white shadow-lg shadow-[#1a9e87]/20">
                <h4 className="font-bold mb-2">Integration Active</h4>
                <p className="text-white/80 text-xs mb-4 leading-relaxed">Your live API keys are ready. You can start accepting real payments immediately.</p>
                <button className="w-full py-2.5 bg-white text-[#1a9e87] rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                  View API Keys
                </button>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-800">Recent Transactions</h4>
                <p className="text-sm text-slate-500">Latest payments received across all channels</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all border border-slate-200">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all border border-slate-200">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-8 py-4">Transaction ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Method</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5 text-sm font-bold text-slate-800">{tx.id}</td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">{tx.customer}</span>
                          <span className="text-xs text-slate-400">{tx.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500">{tx.date}</td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-800">{tx.amount}</td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">{tx.type}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          tx.status === 'Success' ? 'bg-emerald-100 text-emerald-600' :
                          tx.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <button className="p-2 text-slate-400 hover:text-[#1a9e87] rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
              <button className="text-sm font-bold text-[#1a9e87] hover:underline">View All Transactions</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
