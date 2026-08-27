'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FolderGit2, 
  BookOpen, 
  Download, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Check, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Sparkles,
  FileCode,
  Copy,
  CheckCircle,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Link2,
  X,
  Calendar,
  Video,
  Clock,
  Globe,
  Mail as MailIcon,
  MessageSquare
} from 'lucide-react';
import { 
  loadPortfolioData, 
  savePortfolioData, 
  resetPortfolioData, 
  exportToTypeScript,
  getAdminPasscode,
  setAdminPasscode,
  PortfolioStoreData 
} from '@/lib/portfolioStorage';
import { ServiceItem, ProjectItem, BlogPostItem, adminPasscode as defaultPasscode } from '@/data/portfolioData';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'personal' | 'services' | 'projects' | 'blog' | 'bookings' | 'security' | 'export'>('overview');
  const [bookings, setBookings] = useState<any[]>([]);

  // Portfolio dynamic state
  const [data, setData] = useState<PortfolioStoreData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isPushingGit, setIsPushingGit] = useState(false);

  // New Blog Post Form State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('SEO');
  const [newPostReadTime, setNewPostReadTime] = useState('5 min read');
  const [newPostImage, setNewPostImage] = useState('/blog/images/seo-vs-aeo-vs-geo.webp');
  const [newPostDesc, setNewPostDesc] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [imageUploadMode, setImageUploadMode] = useState<'upload' | 'url' | 'preset'>('upload');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Security / Password Change State
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image is larger than 10MB. Please choose a smaller image.');
      return;
    }

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      callback(base64); // Show preview instantly!

      try {
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, dataBase64: base64 }),
        });
        const json = await res.json();
        if (json.success && json.url) {
          callback(json.url);
          showToast('✓ Image uploaded and saved to public/blog/images/');
        }
      } catch (err) {
        showToast('✓ Image attached (local data URL)');
      } finally {
        setIsUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Check auth on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('portfolio_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    setData(loadPortfolioData());
  }, []);

  // Fetch client bookings
  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem('portfolio_client_bookings') || '[]');
      fetch('/api/bookings')
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.bookings) && json.bookings.length > 0) {
            setBookings(json.bookings);
          } else {
            setBookings(local);
          }
        })
        .catch(() => setBookings(local));
    } catch {
      // ignore
    }
  }, [activeTab]);

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem('portfolio_client_bookings', JSON.stringify(updated));
    showToast('✓ Booking removed');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePasscode = (getAdminPasscode() || defaultPasscode || '').trim();

    if (passcode.trim() === activePasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Access denied.');
    }
  };

  const handleChangePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    const activePasscode = (getAdminPasscode() || defaultPasscode || '').trim();

    if (currentPasswordInput.trim() !== activePasscode) {
      setPasswordError('Current passcode is incorrect.');
      return;
    }

    if (!newPasswordInput || newPasswordInput.trim().length < 4) {
      setPasswordError('New passcode must be at least 4 characters long.');
      return;
    }

    if (newPasswordInput.trim() !== confirmPasswordInput.trim()) {
      setPasswordError('New passcodes do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const cleanPass = newPasswordInput.trim();
      setAdminPasscode(cleanPass);

      const res = await fetch('/api/update-passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPasscode: cleanPass })
      });
      const json = await res.json();

      if (json.success) {
        setPasswordSuccess('✓ Password updated successfully and pushed to GitHub!');
        showToast('✓ Admin passcode updated & pushed to GitHub!');
        setCurrentPasswordInput('');
        setNewPasswordInput('');
        setConfirmPasswordInput('');
      } else {
        setPasswordSuccess('✓ Password updated locally in your browser!');
        showToast('✓ Admin passcode updated in browser!');
      }
    } catch {
      setPasswordSuccess('✓ Password updated in your browser session!');
      showToast('✓ Admin passcode updated in browser!');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  const handleManualGitPush = async () => {
    setIsPushingGit(true);
    showToast('🚀 Pushing all updates to GitHub repository...');
    try {
      const res = await fetch('/api/git-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Manual push from Admin Console - ${new Date().toLocaleTimeString()}` })
      });
      const result = await res.json();
      if (result.success) {
        showToast('✓ Successfully pushed to GitHub! Vercel is now deploying your live site.');
      } else {
        showToast(`Push status: ${result.message || result.error || 'Done'}`);
      }
    } catch {
      showToast('Error communicating with server for Git push.');
    } finally {
      setIsPushingGit(false);
    }
  };

  const handleSave = () => {
    if (!data) return;
    const success = savePortfolioData(data);
    if (success) {
      showToast('✓ Changes saved! Pushing automatically to GitHub (abdullahbdseo)...');
    } else {
      showToast('Error saving changes.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data back to factory defaults?')) {
      const defaults = resetPortfolioData();
      setData(defaults);
      showToast('Data reset to default successfully!');
    }
  };

  const handleCopyCode = () => {
    if (!data) return;
    const code = exportToTypeScript(data);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('TypeScript code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadFile = () => {
    if (!data) return;
    const code = exportToTypeScript(data);
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.ts';
    link.click();
    URL.revokeObjectURL(url);
    showToast('portfolioData.ts downloaded!');
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    if (!newPostTitle.trim()) {
      showToast('Please enter an article title.');
      return;
    }
    if (!newPostDesc.trim()) {
      showToast('Please enter an article excerpt or description.');
      return;
    }

    const newArticle: BlogPostItem = {
      id: Date.now(),
      title: newPostTitle.trim(),
      category: newPostCategory.trim() || 'SEO',
      topicGroup: newPostCategory.trim() || 'SEO',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: newPostReadTime.trim() || '5 min read',
      desc: newPostDesc.trim(),
      content: newPostContent.trim() || undefined,
      image: newPostImage.trim() || '/blog/images/seo-vs-aeo-vs-geo.webp',
      href: '/blog',
    };

    const updatedPosts = [newArticle, ...data.blogPosts];
    const updatedData: PortfolioStoreData = { ...data, blogPosts: updatedPosts };

    setData(updatedData);
    savePortfolioData(updatedData);

    // Reset form
    setNewPostTitle('');
    setNewPostDesc('');
    setNewPostContent('');
    setIsCreatingPost(false);

    showToast('✓ Article published live! It is now visible on your homepage and /blog page.');
  };

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-sage-pal text-sage flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-display text-ink mb-2">Portfolio Admin Console</h1>
            <p className="text-xs text-muted">Enter your secure passcode to manage all website content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage transition-colors pr-10 font-sans"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-500 mt-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-sage text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" /> Unlock Admin Panel
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-muted flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-sage" /> Protected with your active admin passcode
              </span>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <Link href="/" className="text-xs font-medium text-muted hover:text-sage transition-colors inline-flex items-center gap-1">
              ← Return to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row text-ink">
      
      {/* ═══════════════════════════════════
           SIDEBAR
      ═══════════════════════════════════ */}
      <aside className="w-full md:w-64 bg-card border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-sage text-white font-bold text-sm flex items-center justify-center shadow-xs">
              {data.personalInfo.monogram || 'AS'}
            </div>
            <div>
              <h2 className="font-bold text-sm text-ink leading-tight">{data.personalInfo.name}</h2>
              <span className="text-[10px] text-sage font-semibold uppercase tracking-wider">Admin Console</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'personal', label: 'Profile & Contact', icon: User },
              { id: 'services', label: 'Services (What I Do)', icon: Briefcase },
              { id: 'projects', label: 'Recent Projects', icon: FolderGit2 },
              { id: 'blog', label: 'Blog & Insights', icon: BookOpen },
              { id: 'bookings', label: 'Strategy Bookings', icon: Calendar },
              { id: 'security', label: 'Security & Password', icon: Lock },
              { id: 'export', label: 'Export & Code Sync', icon: FileCode },
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sage text-white shadow-xs'
                      : 'text-muted hover:text-ink hover:bg-cardSubtle'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-border space-y-2 mt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-muted hover:text-sage hover:bg-cardSubtle transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Live Site
            </span>
            <span className="text-[10px] bg-sage-pal text-sage px-1.5 py-0.5 rounded font-mono">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════
           MAIN CONTENT AREA
      ═══════════════════════════════════ */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Sticky Bar */}
        <header className="sticky top-0 z-30 bg-card/90 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Section: <span className="text-ink capitalize">{activeTab}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Auto-Sync Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              GitHub Auto-Sync Active
            </div>

            <button
              onClick={handleManualGitPush}
              disabled={isPushingGit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card text-ink text-xs font-semibold hover:border-emerald-500/40 hover:text-emerald-600 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
              title="Push all files and changes directly to GitHub"
            >
              <Upload className={`w-3.5 h-3.5 ${isPushingGit ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">{isPushingGit ? 'Pushing...' : 'Push to GitHub'}</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-sage text-white text-xs font-semibold hover:opacity-90 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" /> Save & Push Live
            </button>
          </div>
        </header>

        {/* Dynamic Section Views */}
        <div className="p-6 sm:p-8 max-w-5xl">

          {/* Toast Alert Notification */}
          {toastMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-sage text-white flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: OVERVIEW
          ────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-ink mb-2">
                  Welcome back, {data.personalInfo.name} 👋
                </h1>
                <p className="text-sm text-muted">
                  Use this console to edit your bio, update contact links, publish new projects and write blog insights.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Total Services</span>
                  <div className="text-2xl font-bold font-display text-ink">{data.services.length} Active</div>
                  <button onClick={() => setActiveTab('services')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage Services →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Portfolio Projects</span>
                  <div className="text-2xl font-bold font-display text-ink">{data.projects.length} Showcased</div>
                  <button onClick={() => setActiveTab('projects')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage Projects →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Blog Articles</span>
                  <div className="text-2xl font-bold font-display text-ink">{data.blogPosts.length} Published</div>
                  <button onClick={() => setActiveTab('blog')} className="text-xs text-sage font-semibold mt-3 hover:underline">Write Article →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Live Status</span>
                  <div className="text-2xl font-bold font-display text-emerald-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </div>
                  <Link href="/" target="_blank" className="text-xs text-sage font-semibold mt-3 hover:underline inline-block">Preview Site →</Link>
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-ink flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sage" /> Quick Sync Tip
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Changes saved here apply <strong>instantly in your browser</strong>. When you are ready to publish permanent source code updates to GitHub or Netlify, go to the <strong>Export & Code Sync</strong> tab and click <em>Download portfolioData.ts</em> or <em>Copy Code</em>.
                </p>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: PERSONAL & PROFILE
          ────────────────────────────────── */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-ink mb-1">Profile & Contact Information</h2>
                <p className="text-xs text-muted">Update your public name, tagline, phone, email, and CV download links.</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={data.personalInfo.name}
                      onChange={(e) => setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, name: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Monogram / Initials</label>
                    <input
                      type="text"
                      value={data.personalInfo.monogram}
                      onChange={(e) => setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, monogram: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Title / Designation</label>
                    <input
                      type="text"
                      value={data.personalInfo.title}
                      onChange={(e) => setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, title: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Badge Text</label>
                    <input
                      type="text"
                      value={data.personalInfo.badge}
                      onChange={(e) => setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, badge: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={data.personalInfo.email}
                      onChange={(e) => setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, email: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Calendly / Cal.com URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. https://calendly.com/your-name/15min"
                      value={data.personalInfo.bookingLink || ''}
                      onChange={(e) => setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, bookingLink: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Location</label>
                    <input
                      type="text"
                      value={data.personalInfo.location}
                      onChange={(e) => setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, location: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Hero Headline / Tagline</label>
                  <input
                    type="text"
                    value={data.personalInfo.heroTagline}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, heroTagline: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Hero Bio Paragraph</label>
                  <textarea
                    rows={3}
                    value={data.personalInfo.heroBio}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, heroBio: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-xl bg-sage text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: SERVICES
          ────────────────────────────────── */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">Services Management</h2>
                  <p className="text-xs text-muted">Manage the &ldquo;What I Do Best&rdquo; offerings shown on the homepage.</p>
                </div>

                <button
                  onClick={() => {
                    const newService: ServiceItem = {
                      id: `service-${Date.now()}`,
                      iconType: 'code',
                      title: 'New Growth Service',
                      desc: 'Describe what makes this service valuable for clients.',
                      tags: ['Custom Strategy', 'Technical Optimization', 'Monthly Reporting'],
                      isFeatured: false,
                    };
                    setData({ ...data, services: [...data.services, newService] });
                    showToast('New service added!');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>

              <div className="space-y-4">
                {data.services.map((srv, index) => (
                  <div key={srv.id} className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-sage-pal text-sage text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => {
                            const updated = [...data.services];
                            updated[index].title = e.target.value;
                            setData({ ...data, services: updated });
                          }}
                          className="font-bold font-display text-base text-ink bg-transparent border-b border-transparent hover:border-border focus:border-sage outline-none px-1"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...data.services];
                            const nextState = !updated[index].isFeatured;
                            updated[index].isFeatured = nextState;
                            if (nextState) {
                              updated[index].badge = 'IN DEMAND';
                            } else {
                              delete updated[index].badge;
                            }
                            setData({ ...data, services: updated });
                          }}
                          className={`text-xs px-2.5 py-1 rounded-full border cursor-pointer font-semibold transition-all ${
                            srv.isFeatured 
                              ? 'bg-amber-500 text-white border-amber-500' 
                              : 'bg-cardSubtle text-muted border-border'
                          }`}
                        >
                          {srv.isFeatured ? '★ In Demand Badge' : 'Standard Card'}
                        </button>

                        <button
                          onClick={() => {
                            if (confirm('Delete this service?')) {
                              setData({ ...data, services: data.services.filter((_, i) => i !== index) });
                              showToast('Service removed.');
                            }
                          }}
                          className="p-1.5 text-muted hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={srv.desc}
                        onChange={(e) => {
                          const updated = [...data.services];
                          updated[index].desc = e.target.value;
                          setData({ ...data, services: updated });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: PROJECTS
          ────────────────────────────────── */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">Recent Projects Portfolio</h2>
                  <p className="text-xs text-muted">Add and edit projects showcased with live screenshots.</p>
                </div>

                <button
                  onClick={() => {
                    const newProj: ProjectItem = {
                      id: Date.now(),
                      title: 'New Client Platform',
                      categoryKey: 'seo',
                      categoryLabel: 'SEO Projects',
                      image: '/blog/images/how-to-rank-in-ai-overviews.webp',
                      link: 'https://example.com',
                    };
                    setData({ ...data, projects: [newProj, ...data.projects] });
                    showToast('New project created!');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="space-y-4">
                {data.projects.map((proj, index) => (
                  <div key={proj.id} className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].title = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="font-bold font-display text-base text-ink bg-transparent border-b border-transparent hover:border-border focus:border-sage outline-none px-1 w-full"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={proj.categoryKey}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            const key = e.target.value as 'seo' | 'web-dev' | 'web-design';
                            updated[index].categoryKey = key;
                            updated[index].categoryLabel = 
                              key === 'seo' ? 'SEO Projects' : key === 'web-dev' ? 'Web Development' : 'Web Design';
                            setData({ ...data, projects: updated });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none"
                        >
                          <option value="seo">SEO Projects</option>
                          <option value="web-dev">Web Development</option>
                          <option value="web-design">Web Design</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm('Delete this project?')) {
                              setData({ ...data, projects: data.projects.filter((_, i) => i !== index) });
                              showToast('Project deleted.');
                            }
                          }}
                          className="p-1.5 text-muted hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Image URL / Path</label>
                        <input
                          type="text"
                          value={proj.image}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].image = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Project Link / URL</label>
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].link = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: BLOG
          ────────────────────────────────── */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">Blog Articles & Guides</h2>
                  <p className="text-xs text-muted">Publish new guides that instantly appear on both the homepage and /blog portal.</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/blog"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cardSubtle border border-border text-ink text-xs font-semibold hover:border-sage transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View /blog
                  </Link>

                  <button
                    onClick={() => setIsCreatingPost(!isCreatingPost)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" /> {isCreatingPost ? 'Close Form' : 'Write New Article'}
                  </button>
                </div>
              </div>

              {/* ──────────────────────────────────
                   NEW ARTICLE CREATION FORM
              ────────────────────────────────── */}
              {isCreatingPost && (
                <form 
                  onSubmit={handlePublishPost}
                  className="bg-card border-2 border-sage/60 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 animate-in fade-in slide-in-from-top-3 duration-200"
                >
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-sage text-white flex items-center justify-center font-bold text-sm">
                        ✍️
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-ink">
                        Create & Publish New Blog Post (নতুন ব্লগ পোস্ট)
                      </h3>
                    </div>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                      Instant Live Sync
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="e.g. Complete Guide to Ranking on AI Overviews & ChatGPT in 2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                        Category / Topic
                      </label>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      >
                        <option value="SEO">SEO</option>
                        <option value="AEO & GEO">AEO & GEO</option>
                        <option value="Technical SEO">Technical SEO</option>
                        <option value="Meta Ads">Meta Ads</option>
                        <option value="Local SEO">Local SEO</option>
                        <option value="AI Search">AI Search</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={newPostReadTime}
                        onChange={(e) => setNewPostReadTime(e.target.value)}
                        placeholder="e.g. 5 min read"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>
                  </div>

                  {/* ──────────────────────────────────
                       FEATURED IMAGE SELECTION & UPLOAD
                  ────────────────────────────────── */}
                  <div className="bg-cardSubtle/60 border border-border/80 rounded-2xl p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider">
                          Featured Thumbnail Image (ব্লগের ছবি) *
                        </label>
                        <span className="text-[11px] text-muted">
                          Upload from computer, paste a web URL, or choose a preset
                        </span>
                      </div>

                      {/* Mode Toggle Tabs */}
                      <div className="flex items-center gap-1 bg-card border border-border p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setImageUploadMode('upload')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                            imageUploadMode === 'upload' 
                              ? 'bg-sage text-white shadow-xs' 
                              : 'text-muted hover:text-ink'
                          }`}
                        >
                          <Upload className="w-3 h-3 inline mr-1" /> Upload PC
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageUploadMode('url')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                            imageUploadMode === 'url' 
                              ? 'bg-sage text-white shadow-xs' 
                              : 'text-muted hover:text-ink'
                          }`}
                        >
                          <Link2 className="w-3 h-3 inline mr-1" /> Image URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageUploadMode('preset')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                            imageUploadMode === 'preset' 
                              ? 'bg-sage text-white shadow-xs' 
                              : 'text-muted hover:text-ink'
                          }`}
                        >
                          <ImageIcon className="w-3 h-3 inline mr-1" /> Presets
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      
                      {/* Left: Input controls based on mode */}
                      <div className="md:col-span-7 space-y-3">
                        {imageUploadMode === 'upload' && (
                          <div className="border-2 border-dashed border-border hover:border-sage rounded-2xl p-6 text-center transition-colors bg-card/50">
                            <label className="cursor-pointer flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-2xl bg-sage-pal text-sage flex items-center justify-center shadow-xs">
                                <Upload className="w-6 h-6" />
                              </div>
                              <span className="text-xs font-bold text-ink">
                                {isUploadingImage ? 'Processing image...' : 'Click to Upload Image from Computer'}
                              </span>
                              <span className="text-[11px] text-muted">
                                Supports JPG, PNG, WEBP (Direct from phone or desktop)
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageFileUpload(e, (url) => setNewPostImage(url))}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}

                        {imageUploadMode === 'url' && (
                          <div>
                            <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                              Paste Web Image Link
                            </label>
                            <input
                              type="text"
                              value={newPostImage}
                              onChange={(e) => setNewPostImage(e.target.value)}
                              placeholder="https://images.unsplash.com/... or /blog/images/..."
                              className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-xs text-ink outline-none focus:border-sage font-mono"
                            />
                            <span className="text-[11px] text-muted mt-1 block">
                              You can paste any direct web link from Unsplash, Imgur, or your website.
                            </span>
                          </div>
                        )}

                        {imageUploadMode === 'preset' && (
                          <div>
                            <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                              Select from Built-in Library
                            </label>
                            <select
                              value={newPostImage}
                              onChange={(e) => setNewPostImage(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-xs text-ink outline-none focus:border-sage"
                            >
                              <option value="/blog/images/seo-vs-aeo-vs-geo.webp">SEO vs AEO vs GEO</option>
                              <option value="/blog/images/how-to-rank-in-ai-overviews.webp">AI Overviews & SGE</option>
                              <option value="/blog/images/technical-seo-checklist-2026.webp">Technical SEO Checklist</option>
                              <option value="/blog/images/what-is-geo.webp">What is GEO Blueprint</option>
                              <option value="/blog/images/meta-ads-complete-guide-2026.webp">Meta Ads Complete Guide</option>
                              <option value="/blog/images/how-to-do-keyword-research-for-seo.webp">Keyword Research</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Right: Live Preview Box */}
                      <div className="md:col-span-5">
                        <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Live Thumbnail Preview</span>
                          <span className="text-[10px] text-sage font-bold">16:9 Ratio</span>
                        </div>
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black/5 shadow-xs">
                          {newPostImage ? (
                            <img
                              src={newPostImage}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted gap-1">
                              <ImageIcon className="w-6 h-6" />
                              <span className="text-[11px]">No Image Selected</span>
                            </div>
                          )}
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-card/95 text-ink border border-border shadow-xs">
                            {newPostCategory || 'SEO'}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Article Excerpt / Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newPostDesc}
                      onChange={(e) => setNewPostDesc(e.target.value)}
                      placeholder="Write a clear, engaging excerpt describing the key takeaways and strategy explained in this article..."
                      className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Full Article Content (Optional - সম্পূর্ণ আর্টিকেলের বিস্তারিত কন্টেন্ট)
                    </label>
                    <textarea
                      rows={5}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Write your complete article content here. Paragraphs and line breaks will be preserved when readers click 'Read Article'..."
                      className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingPost(false)}
                      className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted hover:text-ink hover:bg-cardSubtle transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm flex items-center gap-2"
                    >
                      🚀 Publish Article Now
                    </button>
                  </div>
                </form>
              )}

              {/* ──────────────────────────────────
                   EXISTING BLOG POSTS LIST
              ────────────────────────────────── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted px-1">
                  <span>Total Articles: <strong className="text-ink">{data.blogPosts.length}</strong></span>
                  <span>Changes auto-save or click Save Live Changes</span>
                </div>

                {data.blogPosts.map((post, index) => (
                  <div key={post.id} className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => {
                            const updated = [...data.blogPosts];
                            updated[index].title = e.target.value;
                            setData({ ...data, blogPosts: updated });
                          }}
                          className="font-bold font-display text-base text-ink bg-transparent border-b border-transparent hover:border-border focus:border-sage outline-none px-1 w-full"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={post.category}
                          onChange={(e) => {
                            const updated = [...data.blogPosts];
                            updated[index].category = e.target.value;
                            updated[index].topicGroup = e.target.value;
                            setData({ ...data, blogPosts: updated });
                          }}
                          placeholder="Category"
                          className="w-28 px-2.5 py-1 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...data.blogPosts];
                            const updatedData = { ...data, blogPosts: updated };
                            savePortfolioData(updatedData);
                            showToast('Article updated successfully!');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-sage text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete "${post.title}"?`)) {
                              const updated = data.blogPosts.filter((_, i) => i !== index);
                              const updatedData = { ...data, blogPosts: updated };
                              setData(updatedData);
                              savePortfolioData(updatedData);
                              showToast('Article deleted.');
                            }
                          }}
                          className="p-1.5 text-muted hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Date</label>
                        <input
                          type="text"
                          value={post.date}
                          onChange={(e) => {
                            const updated = [...data.blogPosts];
                            updated[index].date = e.target.value;
                            setData({ ...data, blogPosts: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Read Time</label>
                        <input
                          type="text"
                          value={post.readTime}
                          onChange={(e) => {
                            const updated = [...data.blogPosts];
                            updated[index].readTime = e.target.value;
                            setData({ ...data, blogPosts: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider">Thumbnail Image</label>
                          <label className="text-[11px] text-sage font-bold hover:underline cursor-pointer flex items-center gap-1">
                            <Upload className="w-3 h-3" /> Change / Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                handleImageFileUpload(e, (url) => {
                                  const updated = [...data.blogPosts];
                                  updated[index].image = url;
                                  setData({ ...data, blogPosts: updated });
                                  savePortfolioData({ ...data, blogPosts: updated });
                                });
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-border shrink-0 bg-cardSubtle">
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <input
                            type="text"
                            value={post.image}
                            onChange={(e) => {
                              const updated = [...data.blogPosts];
                              updated[index].image = e.target.value;
                              setData({ ...data, blogPosts: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Article Excerpt</label>
                      <textarea
                        rows={2}
                        value={post.desc}
                        onChange={(e) => {
                          const updated = [...data.blogPosts];
                          updated[index].desc = e.target.value;
                          setData({ ...data, blogPosts: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: CALL BOOKINGS
          ────────────────────────────────── */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">
                    Client Strategy Call Bookings
                  </h2>
                  <p className="text-xs text-muted">
                    Manage 1-on-1 strategy sessions requested by prospective clients through the website.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-sage/10 text-sage text-xs font-bold border border-sage/20">
                    {bookings.length} Total Bookings
                  </span>
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-sage-pal border border-sage/30 text-sage flex items-center justify-center mx-auto">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-ink">No Strategy Calls Booked Yet</h3>
                    <p className="text-xs text-muted max-w-sm mx-auto mt-1">
                      When prospective clients book a 15-minute call via your website, their contact info, website, and scheduled slot will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings.map((booking: any) => (
                    <div 
                      key={booking.id}
                      className="bg-card border border-border rounded-2xl p-5 shadow-xs hover:border-sage/50 transition-all space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-ink">{booking.name}</h3>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-bold border border-emerald-500/20">
                              {booking.platform || 'Google Meet'}
                            </span>
                          </div>
                          <a 
                            href={`mailto:${booking.email}`}
                            className="text-xs text-sage font-medium hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <MailIcon className="w-3 h-3" /> {booking.email}
                          </a>
                        </div>

                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="p-2 rounded-lg text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Remove booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Scheduled Time */}
                      <div className="p-3 rounded-xl bg-cardSubtle border border-border space-y-1 text-xs">
                        <div className="flex items-center justify-between text-muted">
                          <span className="flex items-center gap-1.5 font-semibold text-ink">
                            <Calendar className="w-3.5 h-3.5 text-sage" /> {booking.date}
                          </span>
                          <span className="flex items-center gap-1.5 font-semibold text-sage">
                            <Clock className="w-3.5 h-3.5" /> {booking.timeSlot}
                          </span>
                        </div>
                        {booking.website && booking.website !== 'Not specified' && (
                          <div className="pt-1.5 border-t border-border/60 flex items-center gap-1.5 text-muted">
                            <Globe className="w-3.5 h-3.5 text-muted" />
                            <a 
                              href={booking.website.startsWith('http') ? booking.website : `https://${booking.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-ink hover:text-sage font-mono truncate hover:underline"
                            >
                              {booking.website}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Client Note */}
                      {booking.notes && (
                        <div className="p-3 rounded-xl bg-sage-pal/50 border border-sage/20 text-xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-1">
                            Client Goals / Focus:
                          </span>
                          <p className="text-ink text-xs leading-relaxed italic">
                            &quot;{booking.notes}&quot;
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`mailto:${booking.email}?subject=Confirmation:%20SEO%20Strategy%20Call%20with%20Abdullah%20Saleh&body=Hi%20${encodeURIComponent(booking.name)},%0A%0AThank%20you%20for%20scheduling%20a%20strategy%20call%20for%20${encodeURIComponent(booking.date)}%20at%20${encodeURIComponent(booking.timeSlot)}.%0A%0ALooking%20forward%20to%20speaking%20with%20you!`}
                          className="flex-1 py-2 px-3 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-95 text-center flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MailIcon className="w-3.5 h-3.5" /> Email Client
                        </a>

                        <a
                          href={booking.platform === 'Zoom' ? 'https://zoom.us/start' : 'https://meet.google.com/new'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-cardSubtle border border-border text-ink text-xs font-semibold hover:border-sage flex items-center gap-1.5 transition-colors"
                        >
                          <Video className="w-3.5 h-3.5 text-emerald-500" /> Start Meeting
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: SECURITY & PASSWORD
          ────────────────────────────────── */}
          {activeTab === 'security' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold font-display text-ink mb-1">Security & Passcode Management</h2>
                <p className="text-xs text-muted">
                  Update the secret passcode used to access this Admin Console. Once changed, your new password will also sync to your GitHub repository automatically.
                </p>
              </div>

              {/* Status Card */}
              <div className="p-4 rounded-2xl bg-sage-pal border border-sage/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage text-white flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-ink uppercase tracking-wider block">Admin Console Protection</strong>
                    <span className="text-xs text-muted">Secured with custom passkey authentication</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  Protected
                </span>
              </div>

              {/* Change Passcode Form */}
              <form onSubmit={handleChangePasscode} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <h3 className="text-sm font-bold text-ink font-display uppercase tracking-wider border-b border-border pb-3">
                  Change Admin Passcode
                </h3>

                {passwordError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Current Passcode */}
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Current Passcode (বর্তমান পাসওয়ার্ড)
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        placeholder="Enter current passcode..."
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Passcode */}
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      New Passcode (নতুন পাসওয়ার্ড)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="Enter new passcode (min. 4 characters)..."
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[11px] text-muted mt-1 block">পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।</span>
                  </div>

                  {/* Confirm New Passcode */}
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Confirm New Passcode (নতুন পাসওয়ার্ডটি পুনরায় লিখুন)
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        placeholder="Re-enter new passcode..."
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                      >
                        {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="px-6 py-3 rounded-xl bg-sage hover:opacity-95 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
                  >
                    <Lock className="w-4 h-4" />
                    {isUpdatingPassword ? 'Updating & Pushing...' : 'Update Admin Passcode'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: EXPORT & CODE SYNC
          ────────────────────────────────── */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-ink mb-1">Export & GitHub Synchronization</h2>
                <p className="text-xs text-muted">
                  Keep your GitHub repository and live website updated permanently with automatic git sync.
                </p>
              </div>

              {/* GitHub Auto-Sync Status Card */}
              <div className="p-6 rounded-2xl bg-card border border-emerald-500/30 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-base text-ink font-display">GitHub Auto-Sync & Vercel Live</strong>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-600 border border-emerald-500/25">
                          Active & Connected
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-1">
                        Repository: <a href="https://github.com/abdullahbdseo/abdullahbdseo" target="_blank" rel="noreferrer" className="text-sage font-medium hover:underline font-mono">abdullahbdseo/abdullahbdseo</a> · Branch: <span className="font-mono text-ink font-semibold">main</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleManualGitPush}
                    disabled={isPushingGit}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 shrink-0"
                  >
                    <Upload className={`w-4 h-4 ${isPushingGit ? 'animate-bounce' : ''}`} />
                    {isPushingGit ? 'Pushing to GitHub...' : '🚀 Push to GitHub Now'}
                  </button>
                </div>

                <div className="pt-3 border-t border-border text-xs text-muted leading-relaxed">
                  💡 <strong className="text-ink">অটোমেটিক গিটহাব পুশ চালু আছে:</strong> আপনি এই এডমিন প্যানেল থেকে যেকোনো তথ্য পরিবর্তন করে <strong>&ldquo;Save &amp; Push Live&rdquo;</strong> বাটন চাপলে বা নতুন কোনো ব্লগ আর্টিকেল পাবলিশ করলে, তা স্বয়ংক্রিয়ভাবে গিটহাবে পুশ হয়ে যাবে এবং Vercel আপনার লাইভ ওয়েবসাইটটি সাথে সাথে আপডেট করে ফেলবে!
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={handleDownloadFile}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-sage text-left transition-all shadow-xs group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-sage-pal text-sage flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Download className="w-5 h-5" />
                  </div>
                  <strong className="block text-sm text-ink mb-1">Download portfolioData.ts</strong>
                  <span className="text-xs text-muted">Get the full updated TypeScript file ready to drop into your code.</span>
                </button>

                <button
                  onClick={handleCopyCode}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-sage text-left transition-all shadow-xs group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-sage-pal text-sage flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    {copiedCode ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                  </div>
                  <strong className="block text-sm text-ink mb-1">{copiedCode ? 'Copied!' : 'Copy Code to Clipboard'}</strong>
                  <span className="text-xs text-muted">Copy the clean code to paste directly into your editor.</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-rose-500/50 text-left transition-all shadow-xs group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <strong className="block text-sm text-rose-600 mb-1">Reset to Defaults</strong>
                  <span className="text-xs text-muted">Revert any changes back to the original template defaults.</span>
                </button>
              </div>

              {/* Code Preview */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted font-mono">data/portfolioData.ts (Live Preview)</span>
                  <button
                    onClick={handleCopyCode}
                    className="text-xs text-sage font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                </div>

                <pre className="bg-[#121820] text-slate-200 text-xs p-4 rounded-xl overflow-x-auto max-h-96 font-mono leading-relaxed">
                  {exportToTypeScript(data)}
                </pre>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
