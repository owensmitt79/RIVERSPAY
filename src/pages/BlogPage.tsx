import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const articles = [
  {
    category: 'Product',
    title: 'Introducing RiversPay Business Accounts',
    excerpt: 'A complete financial operating system for SMEs and large corporations. Simplify payroll, bulk transfers, and invoicing today.',
    date: 'Oct 12, 2025',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
  },
  {
    category: 'Engineering',
    title: 'How we achieved 99.99% uptime with Kubernetes',
    excerpt: 'A deep dive into RiversPay\'s cloud infrastructure and how we handle thousands of transactions per second reliably.',
    date: 'Sep 28, 2025',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80'
  },
  {
    category: 'Company',
    title: 'RiversPay granted full PSP license by CBN',
    excerpt: 'We are proud to announce our official certification by the Central Bank of Nigeria, unlocking new financial capabilities for our users.',
    date: 'Aug 15, 2025',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80'
  }
];

export default function BlogPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-16 px-6 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-10 left-6 flex items-center gap-2 text-slate-500 hover:text-[#0070E0] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="max-w-5xl mx-auto text-center mt-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6">RiversPay Blog</h1>
          <p className="text-xl text-slate-500">
            News, product updates, engineering deep dives, and company announcements.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-[#0070E0] uppercase tracking-wider mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#0070E0] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-slate-400">{article.date}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#0070E0] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-full hover:border-[#0070E0] hover:text-[#0070E0] transition-all">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
