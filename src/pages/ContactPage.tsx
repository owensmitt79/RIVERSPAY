import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function ContactPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log('Message sent:', data);
    alert('Thank you for your message! Our team will get back to you shortly.');
    reset();
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A2540] to-[#0070E0] text-white pt-24 pb-32 px-6">
        <div className="max-w-6xl mx-auto relative">
          <button
            onClick={() => navigate('/')}
            className="absolute -top-10 left-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-blue-100 text-lg">
              Have questions about RiversPay, need technical support, or want to explore partnership opportunities? We're here to help.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Contact Cards */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-[#0070E0] rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Call Us</h3>
              <p className="text-slate-500 mb-4 text-sm">Our support team is available 24/7 to assist you.</p>
              <p className="font-semibold text-[#0070E0] text-lg">+234 (0) 800 RIVERSPAY</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Email Us</h3>
              <p className="text-slate-500 mb-4 text-sm">We aim to respond to all inquiries within 2 hours.</p>
              <p className="font-semibold text-emerald-600 text-lg">support@riverspay.ng</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Visit Us</h3>
              <p className="text-slate-500 mb-4 text-sm">RiversPay Headquarters</p>
              <p className="font-semibold text-amber-600">1 Revenue House, Port Harcourt, Rivers State, Nigeria.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-[#0070E0]" />
              <h2 className="text-2xl font-bold text-slate-800">Send us a message</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input 
                    {...register('name', { required: true })} 
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0070E0] outline-none transition" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    {...register('email', { required: true })} 
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0070E0] outline-none transition" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <select 
                  {...register('subject')} 
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0070E0] outline-none transition bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Billing Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea 
                  {...register('message', { required: true })} 
                  rows={6} 
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0070E0] outline-none transition resize-none" 
                  placeholder="How can we help you?" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-4 bg-[#0A2540] hover:bg-[#0070E0] text-white font-bold rounded-xl transition-colors shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
