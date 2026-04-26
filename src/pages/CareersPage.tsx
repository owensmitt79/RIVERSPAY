import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Users } from 'lucide-react';

const positions = [
  { title: 'Senior Backend Engineer', dept: 'Engineering', loc: 'Port Harcourt / Remote', type: 'Full-time' },
  { title: 'Product Manager, Payments', dept: 'Product', loc: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Head of Compliance', dept: 'Legal', loc: 'Abuja, Nigeria', type: 'Full-time' },
  { title: 'Customer Success Specialist', dept: 'Support', loc: 'Port Harcourt, Nigeria', type: 'Full-time' },
  { title: 'Frontend Developer (React)', dept: 'Engineering', loc: 'Remote (Africa)', type: 'Contract' },
];

export default function CareersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Hero */}
      <div className="bg-[#0A2540] text-white pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto relative text-center">
          <button
            onClick={() => navigate('/')}
            className="absolute top-0 left-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-8 mb-6">Build the future of payments.</h1>
          <p className="text-xl text-blue-200 font-light max-w-2xl mx-auto">
            Join the team transforming how money moves across Rivers State and beyond. We are looking for passionate builders, thinkers, and innovators.
          </p>
        </div>
      </div>

      {/* Culture */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 mb-20">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" 
          alt="Team collaboration" 
          className="w-full h-[400px] object-cover rounded-3xl shadow-2xl mb-12"
        />
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-blue-50 text-[#0070E0] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#0A2540]">Inclusive Culture</h3>
            <p className="text-slate-600 text-sm">We believe diverse teams build better products. Everyone has a seat at the table.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#0A2540]">Ownership</h3>
            <p className="text-slate-600 text-sm">You own your work from start to finish. We do not micromanage; we empower.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#0A2540]">Work Anywhere</h3>
            <p className="text-slate-600 text-sm">With our remote-first approach, you can work from wherever you are most productive.</p>
          </div>
        </div>
      </div>

      {/* Openings */}
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#0A2540] mb-8">Open Positions</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {positions.map((job, idx) => (
            <div 
              key={idx} 
              className={`p-6 sm:p-8 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${idx !== positions.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              <div>
                <h3 className="text-xl font-bold text-[#0070E0] mb-2">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 font-medium">
                  <span className="bg-slate-100 px-3 py-1 rounded-full">{job.dept}</span>
                  <span>{job.loc}</span>
                  <span>·</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <button className="whitespace-nowrap px-6 py-2.5 bg-[#0A2540] text-white font-bold rounded-full hover:bg-[#0070E0] transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
