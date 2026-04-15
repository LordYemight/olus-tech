'use client';

// DESIGN DECISIONS:
// Layout Energy: dense
// Depth Treatment: glassmorphic
// Divider Style: D-STAT
// Typography Personality: mono-accent

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Server, BarChart2, Shield, Activity, Zap, Cpu, Layers, Lock, Eye, 
  Menu, X, ArrowRight, Loader2, CheckCheck, Mail, MapPin, ImageOff, Phone
} from 'lucide-react';

const BRAND = {
  name: "Olu's Tech",
  tagline: "Building the Future of Lagos.",
  description: "High-performance enterprise software merging sleek fintech aesthetics with robust engineering. Led by Oluwadamilare, we deliver mission-critical solutions for the continent's most ambitious firms.",
  industry: "tech",
  region: "nigeria",
  currency: "₦",
  contact: {
    whatsapp: "",
    instagram: "@olutech",
    email: "ops@olutech.io",
    address: "Yaba Tech District, Lagos, Nigeria"
  }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?q=80&w=2000",
  products: [
    "https://images.unsplash.com/photo-1674027001844-6ad209efd09e?q=80&w=1000",
    "https://images.unsplash.com/photo-1636819488537-a9b1ffb315ce?q=80&w=1000",
    "https://images.unsplash.com/photo-1680781632885-ab108445f5e3?q=80&w=1000"
  ]
};

const PRODUCTS = [
  { name: "Startup Launchpad", description: "Rapid deployment of scalable MVPs with fintech-grade security and modern UI.", price: "₦5,000,000" },
  { name: "Enterprise Scale", description: "Robust architecture migration and high-concurrency systems for established corporations.", price: "₦20,000,000" },
  { name: "Custom R&D", description: "Experimental engineering and proprietary algorithm development for niche industries.", price: "₦50,000,000" }
];

const FEATURES = [
  { title: "99.9% Uptime", description: "Redundant cloud infrastructure ensuring your service never sleeps.", icon: Server },
  { title: "Real-Time Analytics", description: "Sub-50ms data processing for immediate business intelligence.", icon: BarChart2 },
  { title: "Secure by Default", description: "Zero-trust architecture protecting every layer of your stack.", icon: Shield }
];

const TESTIMONIALS = [
  { name: "Tunde", role: "CTO, Yaba Logistics", text: "Olu's Tech transformed our backend. We handled 500k signups in 48 hours without a single glitch." },
  { name: "Chichi", role: "Founder, VI Wealth", text: "The sleekest fintech UI I've seen coming out of Lagos. Pure engineering art." },
  { name: "Babajide", role: "Director, Lekki Cyber", text: "Mission-critical is the right word. They are our go-to for secure R&D." }
];

// --- HOOKS ---
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) return (
    <div className={`flex items-center justify-center bg-[#111] ${className}`}>
      <ImageOff className="text-white/10" />
    </div>
  );
  return (
    <Image src={src} alt={alt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined}
      className={className} priority={priority} onError={() => setError(true)} />
  );
}

// --- COMPONENTS ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: "System Status", href: "#metrics" },
    { name: "The Stack", href: "#stack" },
    { name: "Solutions", href: "#products" },
    { name: "Terminal", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-heading font-bold text-2xl tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-sm text-primary">O</div>
            <span>TECH<span className="text-accent">_</span></span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {links.map(l => (
              <a key={l.name} href={l.href} className="text-sm font-mono uppercase tracking-[0.2em] text-white/60 hover:text-accent transition-colors">
                {l.name}
              </a>
            ))}
            <a href="#contact" className="bg-white/5 border border-white/10 px-5 py-2 rounded-full text-xs font-bold hover:bg-accent hover:text-primary transition-all duration-300">
              INITIALIZE
            </a>
          </div>
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-white"><Menu /></button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X /></button>
          <div className="flex flex-col gap-8">
            {links.map(l => (
              <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="text-2xl font-heading font-bold">
                {l.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-8 bg-accent text-primary text-center py-4 font-black">
              GET STARTED
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="home" className="min-h-screen grid md:grid-cols-[1.2fr_1fr] items-stretch bg-primary overflow-hidden">
      <div className="flex flex-col justify-center px-8 md:px-20 py-32 relative">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/10 blur-[100px] pointer-events-none" />
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-70">
            Node: Lagos_Cluster_01
          </p>
          <h1 className="font-heading text-5xl md:text-[5rem] font-bold text-white leading-[0.9] tracking-tighter">
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Digital Sovereignty</span>
          </h1>
          <p className="text-white/45 mt-8 text-lg max-w-md leading-relaxed font-light">
            We build high-performance software for enterprises that demand nothing less than perfection. Modern. Robust. Mission-Critical.
          </p>
          <div className="flex gap-4 mt-12 flex-wrap">
            <a href="#contact" className="bg-accent text-primary px-10 py-5 font-bold hover:scale-[1.02] transition-all duration-300 rounded-sm">
              INITIALIZE PROJECT
            </a>
            <a href="#products" className="border border-white/10 px-10 py-5 font-medium hover:bg-white/5 transition-all">
              VIEW SOLUTIONS
            </a>
          </div>
        </div>
      </div>
      <div className={`relative min-h-[40vh] md:min-h-full transition-all duration-1000 delay-300 overflow-hidden ${isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
        <SafeImage src={IMAGES.hero} alt="Lagos Cluster" fill className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)/10,transparent_70%)]" />
      </div>
    </section>
  );
};

const Stack = () => {
  const { ref, isVisible } = useScrollReveal();
  const layers = [
    { name: "Scalable Cloud", detail: "Kubernetes-orchestrated infrastructure.", icon: Server },
    { name: "Real-time API", detail: "Low-latency GraphQL & gRPC interfaces.", icon: Zap },
    { name: "Responsive UI", detail: "Next.js fueled high-performance frontends.", icon: Cpu }
  ];
  return (
    <section id="stack" ref={ref} className="py-28 bg-[#0c1e36] px-6 relative scanline-effect">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">The Architecture</h2>
            <p className="text-accent font-mono text-sm tracking-widest uppercase">3-Layer Engineering Excellence</p>
          </div>
          <div className="text-white/30 font-mono text-xs max-w-xs md:text-right">
            System status: Operational<br />
            Regional delivery: Nigeria / West Africa
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {layers.map((l, i) => (
            <div key={i} className={`p-10 bg-primary/50 border border-white/5 rounded-2xl hover:border-accent/40 transition-all duration-500 group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <l.icon className="text-accent mb-8 w-10 h-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">{l.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{l.detail}</p>
              <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-2/3 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Metrics = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: '99.9%', label: 'Uptime', icon: Activity },
    { number: '<50ms', label: 'Latency', icon: Zap },
    { number: '1.2M+', label: 'Requests/hr', icon: Cpu }
  ];
  return (
    <section id="metrics" ref={ref} className="bg-accent py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10">
        {stats.map((s, i) => (
          <div key={i} className={`px-12 py-8 text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <s.icon size={20} className="text-primary/60" />
              <p className="text-primary/50 text-xs font-mono uppercase tracking-[0.2em] font-bold">{s.label}</p>
            </div>
            <p className="text-5xl font-heading font-bold text-primary tracking-tight">{s.number}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-32 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl font-bold text-white mb-6">Technical Prowess</h2>
          <p className="text-white/40 max-w-xl mx-auto">Built for High-Performance Environments in the continent's most ambitious hubs.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className={`p-10 rounded-2xl border border-white/5 bg-white/3 hover:bg-accent/5 hover:border-accent/20 transition-all duration-500 group cursor-default transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="mb-6 text-white/30 group-hover:text-accent transition-colors"><f.icon size={36} strokeWidth={1.5} /></div>
              <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-4">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: '1.2M', label: 'Requests Handled' },
    { number: '0', label: 'Security Breaches' },
    { number: '24/7', label: 'Active Monitoring' }
  ];
  return (
    <section id="about" ref={ref} className="py-32 px-6 bg-[#081220] overflow-hidden border-y border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        <div className={`md:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="w-16 h-1 w-accent mb-8" />
          <h2 className="font-heading text-5xl font-bold text-white leading-tight mb-8">Led by <br /><span className="text-accent">Oluwadamilare</span></h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            With a decade of experience in the Lagos tech ecosystem, our lead engineer merges technical rigour with localized fintech insights to build the future. Sharp delivery, nationwide.
          </p>
          <div className="grid grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-white">{s.number}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`md:w-1/2 relative aspect-square transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="absolute inset-0 border border-accent/20 rounded-3xl translate-x-6 translate-y-6" />
          <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl rounded-3xl" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden grayscale contrast-125">
             <SafeImage src={IMAGES.products[1]} alt="Engineering Rigour" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="products" ref={ref} className="py-32 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="font-heading text-6xl font-bold text-white mb-4">Solutions</h2>
            <p className="text-white/40">Select your deployment tier.</p>
          </div>
          <p className="text-accent font-mono text-xs max-w-xs md:text-right border-l md:border-l-0 md:border-r border-accent/30 pl-4 md:pr-4">
            Custom proprietary algorithm development for niche industries.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((p, i) => (
            <div key={i} className={`group relative h-[450px] rounded-2xl overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute inset-0 border border-white/5 group-hover:border-accent/30 transition-colors pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Deployment Tier 0{i+1}</span>
                <h3 className="text-3xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-white/50 text-sm mb-8 line-clamp-2">{p.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">{p.price}</span>
                  <a href="#contact" className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300">
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-32 bg-[#0c1e36] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex items-center gap-6">
        <h2 className="font-heading text-4xl font-bold text-white">Founder Briefings</h2>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused] px-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className={`w-80 md:w-[450px] shrink-0 bg-primary/40 border border-white/5 rounded-2xl p-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${(i%3) * 80}ms` }}>
              <div className="flex gap-2 mb-8">
                {[1,2,3,4].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-xl font-heading">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-white/30 text-xs font-mono uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-20 items-start relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-heading text-6xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter mb-10">Secure a <br /><span className="text-accent">Consultation</span></h2>
          <div className="space-y-8">
            <div className="flex items-center gap-6 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Mail className="text-accent" />
              </div>
              <div>
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest">Secure Comms</p>
                <p className="text-white/80 font-bold">{BRAND.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <MapPin className="text-accent" />
              </div>
              <div>
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest">Base of Operations</p>
                <p className="text-white/80 font-bold">{BRAND.contact.address}</p>
              </div>
            </div>
            <div className="pt-10 flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                <span className="font-mono text-xs font-bold">IG</span>
               </a>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {sent ? (
            <div className="bg-white/5 p-12 rounded-3xl border border-accent/20 text-center animate-scaleIn">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8 border border-accent/30">
                <CheckCheck size={40} className="text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Transmission Received</h3>
              <p className="text-white/50">Our team will review your inquiry and respond within 24 standard business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl pointer-events-none" />
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="FULL NAME" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-accent outline-none font-mono text-sm tracking-wider"
                    onChange={e => setForm({...form, name: e.target.value})} />
                  <input type="email" placeholder="SECURE EMAIL" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-accent outline-none font-mono text-sm tracking-wider"
                    onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <input type="text" placeholder="PHONE (OPTIONAL)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-accent outline-none font-mono text-sm tracking-wider"
                  onChange={e => setForm({...form, phone: e.target.value})} />
                <textarea rows={5} placeholder="PROJECT PARAMETERS" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-accent outline-none font-mono text-sm tracking-wider resize-none"
                  onChange={e => setForm({...form, message: e.target.value})} />
                <button type="submit" disabled={loading}
                  className="w-full bg-accent text-primary py-5 rounded-xl font-black flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : <>EXECUTE_TRANSMISSION <ArrowRight size={20}/></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-xs">
          <a href="#" className="font-heading font-bold text-3xl tracking-tighter flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm text-primary">O</div>
            <span>TECH</span>
          </a>
          <p className="text-white/30 text-sm leading-relaxed">
            Leading engineering firm dedicated to the digital sovereignty of the continent. Mission-critical systems built in Lagos for the world.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div>
            <p className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navigation</p>
            <div className="flex flex-col gap-4 text-sm text-white/40">
              <a href="#metrics" className="hover:text-accent transition-colors">System Status</a>
              <a href="#stack" className="hover:text-accent transition-colors">The Stack</a>
              <a href="#products" className="hover:text-accent transition-colors">Solutions</a>
            </div>
          </div>
          <div>
            <p className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</p>
            <div className="flex flex-col gap-4 text-sm text-white/40">
              <a href="#" className="hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent transition-colors">GitHub</a>
            </div>
          </div>
          <div>
            <p className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</p>
            <div className="flex flex-col gap-4 text-sm text-white/40">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
        <p>&copy; {new Date().getFullYear()} OLU'S TECH LTD. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <span>LAT: 6.5244° N</span>
          <span>LONG: 3.3792° E</span>
          <span className="text-accent/40 underline underline-offset-4">STATUS: OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Stack />
      <Metrics />
      <Features />
      <About />
      <Products />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}