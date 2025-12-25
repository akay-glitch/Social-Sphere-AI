import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Plus, 
  Zap, 
  Video, 
  PenTool, 
  TrendingUp, 
  MessageSquare, 
  Settings,
  X,
  ChevronRight,
  Globe,
  Tag,
  DollarSign,
  Heart,
  Info,
  Mail,
  ShieldCheck,
  FileText
} from 'lucide-react';

// ========================================================
// --- DATA: CURATED AI TOOLS FOR SOCIAL MEDIA ---
// ========================================================

const INITIAL_TOOLS = [
  {
    id: 1,
    name: "OpusClip",
    category: "Video & Reels",
    description: "AI-powered tool that turns long-form videos into high-quality viral shorts for TikTok, Reels, and Shorts.",
    url: "https://www.opus.pro/",
    pricing: "Freemium",
    tags: ["Repurposing", "Short-form", "Viral"],
    featured: true
  },
  {
    id: 2,
    name: "Jasper AI",
    category: "Copy & Captions",
    description: "Enterprise-grade AI platform for creating high-converting social copy, blog posts, and marketing campaigns.",
    url: "https://www.jasper.ai/",
    pricing: "Paid",
    tags: ["Copywriting", "Team", "SEO"],
    featured: true
  },
  {
    id: 3,
    name: "Buffer AI",
    category: "Management",
    description: "Generate post variations, repurpose content, and schedule everything across multiple platforms automatically.",
    url: "https://buffer.com/",
    pricing: "Freemium",
    tags: ["Scheduling", "Analytics", "Multi-platform"],
    featured: false
  },
  {
    id: 4,
    name: "Predis.ai",
    category: "Strategy & Creative",
    description: "AI social media manager that creates complete posts with images, carousels, and captions from a simple prompt.",
    url: "https://predis.ai/",
    pricing: "Freemium",
    tags: ["Design", "Content Plan", "Carousels"],
    featured: false
  },
  {
    id: 5,
    name: "Lumen5",
    category: "Video & Reels",
    description: "Transform blog posts and articles into engaging social media videos using intelligent scene matching.",
    url: "https://lumen5.com/",
    pricing: "Freemium",
    tags: ["Blog-to-Video", "Stock Assets", "Easy"],
    featured: false
  },
  {
    id: 6,
    name: "Flick AI",
    category: "Strategy & Creative",
    description: "AI hashtag generator and content planner designed to help you reach more people on Instagram.",
    url: "https://www.flick.social/",
    pricing: "Paid",
    tags: ["Hashtags", "Planning", "Instagram"],
    featured: false
  },
  {
    id: 7,
    name: "Copy.ai",
    category: "Copy & Captions",
    description: "Generate captions, product descriptions, and ad copy in seconds with powerful templates.",
    url: "https://www.copy.ai/",
    pricing: "Freemium",
    tags: ["Social Copy", "Brainstorming", "Ads"],
    featured: false
  },
  {
    id: 8,
    name: "InVideo AI",
    category: "Video & Reels",
    description: "Create ready-to-publish videos with script, media, and voiceover just by typing an idea.",
    url: "https://invideo.io/",
    pricing: "Freemium",
    tags: ["Text-to-Video", "Voiceover", "Stock"],
    featured: true
  },
  {
    id: 9,
    name: "Sprout Social",
    category: "Management",
    description: "Deep social listening and sentiment analysis to understand how your audience feels about your brand.",
    url: "https://sproutsocial.com/",
    pricing: "Paid",
    tags: ["Analytics", "Listening", "Enterprise"],
    featured: false
  },
  {
    id: 10,
    name: "AdCreative.ai",
    category: "Strategy & Creative",
    description: "Generate data-backed, high-converting ad creatives for Facebook, Instagram, and LinkedIn.",
    url: "https://www.adcreative.ai/",
    pricing: "Paid",
    tags: ["Ads", "Design", "Conversion"],
    featured: false
  },
  {
    id: 11,
    name: "CapCut Desktop",
    category: "Video & Reels",
    description: "The gold standard for TikTok editing, now with AI captions, background removal, and auto-reframing.",
    url: "https://www.capcut.com/",
    pricing: "Free",
    tags: ["Editing", "TikTok", "Auto-Captions"],
    featured: true
  },
  {
    id: 12,
    name: "Canva Magic Studio",
    category: "Strategy & Creative",
    description: "A complete AI design suite for social posts, including text-to-image and magic resize for all platforms.",
    url: "https://www.canva.com/",
    pricing: "Freemium",
    tags: ["Design", "Templates", "Brand"],
    featured: true
  },
  {
    id: 13,
    name: "HeyGen",
    category: "Video & Reels",
    description: "Create AI video avatars that speak your script with perfect lip-syncing for talking head videos.",
    url: "https://www.heygen.com/",
    pricing: "Paid",
    tags: ["Avatar", "Video", "Translation"],
    featured: false
  },
  {
    id: 14,
    name: "Midjourney",
    category: "Strategy & Creative",
    description: "High-end AI image generation for unique, high-quality social media assets and custom graphics.",
    url: "https://www.midjourney.com/",
    pricing: "Paid",
    tags: ["Art", "Images", "Prompts"],
    featured: false
  },
  {
    id: 15,
    name: "Riverside.fm",
    category: "Video & Reels",
    description: "Record remote podcasts and use AI to instantly clip the best moments for social media repurposing.",
    url: "https://riverside.fm/",
    pricing: "Freemium",
    tags: ["Podcast", "Clips", "High-Quality"],
    featured: false
  },
  {
    id: 16,
    name: "Adobe Express",
    category: "Strategy & Creative",
    description: "All-in-one design app with Firefly AI for text-to-image, generative fill, and social scheduling.",
    url: "https://www.adobe.com/express/",
    pricing: "Freemium",
    tags: ["Design", "Firefly", "All-in-one"],
    featured: true
  },
  {
    id: 17,
    name: "Microsoft Designer",
    category: "Strategy & Creative",
    description: "Fully AI-powered design tool that creates stunning social posts and images from simple text descriptions.",
    url: "https://designer.microsoft.com/",
    pricing: "Free",
    tags: ["DALL-E 3", "Graphics", "Free"],
    featured: false
  },
  {
    id: 18,
    name: "Leonardo.ai",
    category: "Strategy & Creative",
    description: "Advanced generative AI platform for creating production-quality images for thumbnails and social assets.",
    url: "https://leonardo.ai/",
    pricing: "Freemium",
    tags: ["Art", "Thumbnails", "Images"],
    featured: false
  },
  {
    id: 19,
    name: "Grammarly AI",
    category: "Copy & Captions",
    description: "AI writing assistant that helps you adjust tone, fix grammar, and polish your social media captions.",
    url: "https://www.grammarly.com/",
    pricing: "Freemium",
    tags: ["Editing", "Grammar", "Tone"],
    featured: false
  },
  {
    id: 20,
    name: "Headline Analyzer",
    category: "Copy & Captions",
    description: "Analyze your social media hooks and headlines to ensure they grab attention and drive clicks.",
    url: "https://coschedule.com/headline-analyzer",
    pricing: "Free",
    tags: ["Hooks", "SEO", "Copywriting"],
    featured: false
  },
  {
    id: 21,
    name: "Remove.bg",
    category: "Strategy & Creative",
    description: "Instantly remove backgrounds from photos using AI—perfect for product posts and portraits.",
    url: "https://www.remove.bg/",
    pricing: "Freemium",
    tags: ["Editing", "Product", "Images"],
    featured: false
  },
  {
    id: 22,
    name: "ChatGPT",
    category: "Strategy & Creative",
    description: "The essential tool for brainstorming social media content calendars, captions, and platform strategies.",
    url: "https://chatgpt.com/",
    pricing: "Freemium",
    tags: ["Brainstorming", "Strategy", "Prompts"],
    featured: true
  }
];

const CATEGORIES = [
  { name: "All", icon: <Globe size={18} /> },
  { name: "Video & Reels", icon: <Video size={18} /> },
  { name: "Copy & Captions", icon: <PenTool size={18} /> },
  { name: "Management", icon: <Settings size={18} /> },
  { name: "Strategy & Creative", icon: <TrendingUp size={18} /> }
];

// --- COMPONENT: Google Ad Placeholder ---
const AdSlot = ({ label = "Sponsored" }) => (
  <div className="w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-6 min-h-[250px] flex flex-col items-center justify-center text-center">
    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">{label}</span>
    <div className="w-full h-full border border-dashed border-slate-700 rounded-xl flex items-center justify-center bg-slate-800/20">
      <p className="text-slate-500 text-sm">Advertisement Space</p>
    </div>
    <p className="text-[10px] text-slate-700 mt-4 italic">Google AdSense / Mediavine Slot</p>
  </div>
);

// --- MAIN COMPONENT ---
export default function App() {
  const [view, setView] = useState('directory'); // 'directory', 'privacy', 'terms'
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const CONTACT_EMAIL = "akshitrana7700@gmail.com";

  const [formData, setFormData] = useState({
    name: "",
    category: "Video & Reels",
    description: "",
    url: "",
    pricing: "Freemium"
  });

  // --- SEO & Schema Effects ---
  useEffect(() => {
    const categoryTitle = activeCategory === "All" ? "Best Social Media AI Tools" : `${activeCategory} AI Tools`;
    document.title = `${categoryTitle} | SocialSphere AI Directory 2025`;
    window.scrollTo(0, 0);
  }, [activeCategory, view]);

  useEffect(() => {
    const saved = localStorage.getItem('socialsphere-favs');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('socialsphere-favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const isFavorite = favorites.includes(tool.id);
      return showFavoritesOnly ? matchesSearch && matchesCategory && isFavorite : matchesSearch && matchesCategory;
    });
  }, [tools, searchTerm, activeCategory, showFavoritesOnly, favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Automatic Email Trigger
    const mailSubject = `New AI Tool Submission: ${formData.name}`;
    const mailBody = `
      Tool Name: ${formData.name}
      Category: ${formData.category}
      Pricing: ${formData.pricing}
      Website: ${formData.url}
      Description: ${formData.description}
    `.trim();

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;

    // Optional: add to local session UI
    const newTool = { ...formData, id: Date.now(), tags: ["Community"], featured: false };
    setTools([newTool, ...tools]);
    setShowModal(false);
    setFormData({ name: "", category: "Video & Reels", description: "", url: "", pricing: "Freemium" });
  };

  const renderDirectory = () => (
    <>
      <header className="pt-32 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300">Updated for Dec 2025</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {showFavoritesOnly ? "Your Saved" : "The Best AI tools for"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              {showFavoritesOnly ? "Resources" : "Social Media Professionals"}
            </span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {showFavoritesOnly 
              ? "Access your shortlisted AI tools and resources in one place." 
              : "Explore the most powerful AI platforms for content creation, scheduling, and analytics. Hand-curated for modern social media workflows."}
          </p>

          <div className="relative max-w-xl mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search AI tools (e.g. video editor, copywriting...)" 
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-[10px] text-slate-500 bg-slate-900/50 border border-slate-800 px-3 py-1 rounded-full uppercase tracking-widest">
          <Info size={12} /> Ad Disclosure: Some links may be affiliate resources
        </div>
      </div>

      <main id="main-content" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setShowFavoritesOnly(false); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeCategory === cat.name && !showFavoritesOnly
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20" 
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
          <div className="w-px h-8 bg-slate-800 mx-2 hidden sm:block"></div>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
              showFavoritesOnly 
                ? "bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/20" 
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800"
            }`}
          >
            <Heart size={18} fill={showFavoritesOnly ? "currentColor" : "none"} />
            Saved Only
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
          {filteredTools.map((tool, index) => (
            <React.Fragment key={tool.id}>
              {index === 3 && <AdSlot />}
              <article className="group relative bg-[#131316] border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5 flex flex-col h-full">
                {tool.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-purple-500/30 whitespace-nowrap">
                    Editor's Top Choice
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <button onClick={() => toggleFavorite(tool.id)} className={`p-2 rounded-xl transition-all ${favorites.includes(tool.id) ? "bg-pink-500/10 text-pink-500 border border-pink-500/20" : "bg-slate-800/50 text-slate-600 hover:text-pink-400 border border-transparent"}`}>
                    <Heart size={18} fill={favorites.includes(tool.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="mb-5 pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-purple-400 bg-purple-400/5 border border-purple-400/10 px-2 py-1 rounded-lg">{tool.category}</span>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mr-10"><DollarSign size={12} /> {tool.pricing}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{tool.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tool.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-800/30 px-2 py-1 rounded-md"><Tag size={10} /> {tag}</span>
                    ))}
                  </div>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all group-hover:bg-purple-600 shadow-sm">
                    Visit {tool.name} <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            </React.Fragment>
          ))}
        </div>
      </main>
    </>
  );

  const renderPrivacy = () => (
    <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8 text-purple-400">
        <ShieldCheck size={32} />
        <h2 className="text-4xl font-bold text-white">Privacy Policy</h2>
      </div>
      <div className="prose prose-invert prose-purple max-w-none space-y-6 text-slate-400 leading-relaxed">
        <p>Last updated: December 2025</p>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">1. Data We Collect</h3>
          <p>We do not require user registration. However, we may collect anonymous usage data via cookies to improve directory performance. If you submit a tool, we process the information provided to verify the tool's suitability.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">2. How We Use Information</h3>
          <p>Information is used solely to maintain the directory, facilitate community submissions, and provide a personalized "Favorites" experience via browser local storage.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">3. Third-Party Links</h3>
          <p>Our site contains links to external websites. We are not responsible for the privacy practices or content of these third-party sites. We recommend reviewing their policies independently.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">4. Contact Us</h3>
          <p>For any privacy-related concerns, please contact us at {CONTACT_EMAIL}.</p>
        </section>
      </div>
      <button onClick={() => setView('directory')} className="mt-12 text-purple-400 font-bold hover:underline flex items-center gap-2">
        <ChevronRight className="rotate-180" size={20} /> Back to Directory
      </button>
    </div>
  );

  const renderTerms = () => (
    <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8 text-purple-400">
        <FileText size={32} />
        <h2 className="text-4xl font-bold text-white">Terms of Service</h2>
      </div>
      <div className="prose prose-invert prose-purple max-w-none space-y-6 text-slate-400 leading-relaxed">
        <p>Welcome to SocialSphere AI.</p>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">1. Acceptance of Terms</h3>
          <p>By accessing this directory, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">2. Use of Content</h3>
          <p>The content provided is for informational purposes. While we strive for accuracy, we do not guarantee the efficacy of tools listed. Users assume all responsibility for tool implementation.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">3. Submissions</h3>
          <p>When you submit a tool, you grant us the right to review and potentially list the tool on our platform. We reserve the right to reject any submission for any reason.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-2">4. Limitation of Liability</h3>
          <p>SocialSphere AI shall not be liable for any damages arising from the use of or inability to use the tools or resources listed in this directory.</p>
        </section>
      </div>
      <button onClick={() => setView('directory')} className="mt-12 text-purple-400 font-bold hover:underline flex items-center gap-2">
        <ChevronRight className="rotate-180" size={20} /> Back to Directory
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-purple-500/30">
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${isScrolled ? "bg-[#0a0a0c]/80 backdrop-blur-lg border-slate-800 py-3" : "bg-transparent border-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { setView('directory'); setActiveCategory("All"); setShowFavoritesOnly(false); window.scrollTo(0,0); }}>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Zap className="text-white fill-current" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">SocialSphere<span className="text-purple-400">AI</span></h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <button onClick={() => { setView('directory'); setShowFavoritesOnly(false); }} className={`${view === 'directory' && !showFavoritesOnly ? 'text-white font-bold' : 'hover:text-white'} transition-colors`}>Directory</button>
            <button onClick={() => { setView('directory'); setShowFavoritesOnly(true); }} className={`${showFavoritesOnly ? 'text-white font-bold' : 'hover:text-white'} transition-colors flex items-center gap-1.5`}>
              Saved {favorites.length > 0 && <span className="text-[10px] bg-purple-500 text-white px-1.5 rounded-full">{favorites.length}</span>}
            </button>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">Contact</a>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95">
            <Plus size={16} /> Submit Tool
          </button>
        </div>
      </nav>

      {view === 'directory' && renderDirectory()}
      {view === 'privacy' && renderPrivacy()}
      {view === 'terms' && renderTerms()}

      <footer className="border-t border-slate-900 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Zap className="text-purple-500 fill-current" size={24} />
              <span className="text-xl font-bold text-white">SocialSphereAI</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">The #1 source for social media marketers looking to leverage AI. Hand-curated for peak efficiency.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
            <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setView('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="text-slate-500 text-sm">© 2025 SocialSphere. All rights reserved.</div>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/40">
          <div className="bg-[#131316] border border-slate-800 w-full max-w-lg rounded-[2rem] p-8 relative animate-in fade-in zoom-in duration-200 shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-white mb-2">Submit a Resource</h2>
            <p className="text-slate-400 text-sm mb-8">Found a great tool? Share it with the community.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tool Name</label>
                <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white" placeholder="e.g. CreatorFlow" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                  <select className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    {CATEGORIES.filter(c => c.name !== "All").map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Pricing</label>
                  <select className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white" value={formData.pricing} onChange={(e) => setFormData({...formData, pricing: e.target.value})}>
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Website URL</label>
                <input required type="url" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white" placeholder="https://..." value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Short Description</label>
                <textarea required rows="3" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white" placeholder="What does it do for social media?" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98]">Submit & Email Admin</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}