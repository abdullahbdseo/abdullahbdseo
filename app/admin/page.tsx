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
  MessageSquare,
  Award,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
  Milestone,
  GraduationCap
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
import { 
  ServiceItem, 
  ProjectItem, 
  BlogPostItem, 
  CertificationItem, 
  PricingPackageItem, 
  ClientGuaranteeItem,
  MetricItemData,
  ExperienceItemData,
  EducationItemData,
  FaqItemData,
  adminPasscode as defaultPasscode 
} from '@/data/portfolioData';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'personal' | 'metrics' | 'services' | 'pricing' | 'certifications' | 'guarantees' | 'experience' | 'projects' | 'blog' | 'faqs' | 'bookings' | 'security' | 'export'>('overview');
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

  // New Certification Form State
  const [isCreatingCert, setIsCreatingCert] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('Verified');
  const [newCertCredId, setNewCertCredId] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [newCertBadgeType, setNewCertBadgeType] = useState<CertificationItem['badgeType']>('google');
  const [newCertDesc, setNewCertDesc] = useState('');

  // New Pricing Package Form State
  const [isCreatingPkg, setIsCreatingPkg] = useState(false);
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgTagline, setNewPkgTagline] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState('$499');
  const [newPkgBilling, setNewPkgBilling] = useState('/month');
  const [newPkgPopular, setNewPkgPopular] = useState(false);
  const [newPkgFeatures, setNewPkgFeatures] = useState('');
  const [newPkgCtaText, setNewPkgCtaText] = useState('Get Started');
  const [newPkgCtaAction, setNewPkgCtaAction] = useState<'book' | 'contact'>('book');

  // New FAQ Form State
  const [isCreatingFaq, setIsCreatingFaq] = useState(false);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // New Experience Form State
  const [isCreatingExp, setIsCreatingExp] = useState(false);
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpOrg, setNewExpOrg] = useState('');
  const [newExpDate, setNewExpDate] = useState('2025 – Present');
  const [newExpDesc, setNewExpDesc] = useState('');

  // New Education Form State
  const [isCreatingEdu, setIsCreatingEdu] = useState(false);
  const [newEduRole, setNewEduRole] = useState('');
  const [newEduOrg, setNewEduOrg] = useState('');
  const [newEduDate, setNewEduDate] = useState('2024');
  const [newEduDesc, setNewEduDesc] = useState('');

  // New Guarantee Form State
  const [isCreatingGuar, setIsCreatingGuar] = useState(false);
  const [newGuarTitle, setNewGuarTitle] = useState('');
  const [newGuarTag, setNewGuarTag] = useState('Safety & Trust');
  const [newGuarDesc, setNewGuarDesc] = useState('');
  const [newGuarColor, setNewGuarColor] = useState('sage');
  const [newGuarIcon, setNewGuarIcon] = useState<ClientGuaranteeItem['iconName']>('shield');

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

  const handleCreateCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    if (!newCertTitle.trim()) {
      showToast('Please enter a certification title.');
      return;
    }

    const newCert: CertificationItem = {
      id: 'cert-' + Date.now(),
      title: newCertTitle.trim(),
      issuer: newCertIssuer.trim() || 'Verified Issuer',
      issueDate: newCertDate.trim() || 'Verified',
      credentialId: newCertCredId.trim() || undefined,
      credentialUrl: newCertUrl.trim() || undefined,
      badgeType: newCertBadgeType,
      description: newCertDesc.trim() || 'Verified technical competency.',
      featured: true
    };

    const updatedCerts = [newCert, ...(data.certifications || [])];
    const updatedData: PortfolioStoreData = { ...data, certifications: updatedCerts };
    setData(updatedData);
    savePortfolioData(updatedData);

    setNewCertTitle('');
    setNewCertIssuer('');
    setNewCertCredId('');
    setNewCertUrl('');
    setNewCertDesc('');
    setIsCreatingCert(false);
    showToast('✓ New certification added successfully!');
  };

  const handleDeleteCertification = (id: string) => {
    if (!data) return;
    const updatedCerts = (data.certifications || []).filter(c => c.id !== id);
    const updatedData: PortfolioStoreData = { ...data, certifications: updatedCerts };
    setData(updatedData);
    savePortfolioData(updatedData);
    showToast('✓ Certification deleted');
  };

  const handleCreatePricingPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    if (!newPkgName.trim() || !newPkgPrice.trim()) {
      showToast('Please enter package name and price.');
      return;
    }

    const featureList = newPkgFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const newPkg: PricingPackageItem = {
      id: 'pkg-' + Date.now(),
      name: newPkgName.trim(),
      tagline: newPkgTagline.trim() || 'Targeted organic growth plan.',
      price: newPkgPrice.trim(),
      billingPeriod: newPkgBilling.trim() || '/month',
      popular: newPkgPopular,
      features: featureList.length > 0 ? featureList : ['Dedicated search growth strategy', 'Monthly performance reporting'],
      ctaText: newPkgCtaText.trim() || 'Get Started',
      ctaAction: newPkgCtaAction
    };

    const updatedPkgs = [...(data.pricingPackages || []), newPkg];
    const updatedData: PortfolioStoreData = { ...data, pricingPackages: updatedPkgs };
    setData(updatedData);
    savePortfolioData(updatedData);

    setNewPkgName('');
    setNewPkgTagline('');
    setNewPkgPrice('$499');
    setNewPkgFeatures('');
    setIsCreatingPkg(false);
    showToast('✓ New pricing package added successfully!');
  };

  const handleDeletePricingPackage = (id: string) => {
    if (!data) return;
    const updatedPkgs = (data.pricingPackages || []).filter(p => p.id !== id);
    const updatedData: PortfolioStoreData = { ...data, pricingPackages: updatedPkgs };
    setData(updatedData);
    savePortfolioData(updatedData);
    showToast('✓ Pricing package deleted');
  };

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !newFaqQ.trim() || !newFaqA.trim()) {
      showToast('Please enter both question and answer.');
      return;
    }
    const newFaq: FaqItemData = {
      id: 'faq-' + Date.now(),
      q: newFaqQ.trim(),
      a: newFaqA.trim()
    };
    const updated = [...(data.faqItems || []), newFaq];
    const updatedData: PortfolioStoreData = { ...data, faqItems: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    setNewFaqQ('');
    setNewFaqA('');
    setIsCreatingFaq(false);
    showToast('✓ FAQ added successfully!');
  };

  const handleDeleteFaq = (id: string) => {
    if (!data) return;
    const updated = (data.faqItems || []).filter(f => f.id !== id);
    const updatedData: PortfolioStoreData = { ...data, faqItems: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    showToast('✓ FAQ deleted');
  };

  const handleCreateExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !newExpRole.trim() || !newExpOrg.trim()) {
      showToast('Please enter role and organization.');
      return;
    }
    const newExp: ExperienceItemData = {
      id: 'exp-' + Date.now(),
      role: newExpRole.trim(),
      org: newExpOrg.trim(),
      date: newExpDate.trim() || '2025 – Present',
      desc: newExpDesc.trim() || 'Key responsibilities and achievements.'
    };
    const updated = [...(data.experienceItems || []), newExp];
    const updatedData: PortfolioStoreData = { ...data, experienceItems: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    setNewExpRole('');
    setNewExpOrg('');
    setNewExpDesc('');
    setIsCreatingExp(false);
    showToast('✓ Work experience added!');
  };

  const handleDeleteExp = (id: string) => {
    if (!data) return;
    const updated = (data.experienceItems || []).filter(x => x.id !== id);
    const updatedData: PortfolioStoreData = { ...data, experienceItems: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    showToast('✓ Experience item deleted');
  };

  const handleCreateEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !newEduRole.trim() || !newEduOrg.trim()) {
      showToast('Please enter degree and institution.');
      return;
    }
    const newEdu: EducationItemData = {
      id: 'edu-' + Date.now(),
      role: newEduRole.trim(),
      org: newEduOrg.trim(),
      date: newEduDate.trim() || '2024',
      desc: newEduDesc.trim() || ''
    };
    const updated = [...(data.educationItems || []), newEdu];
    const updatedData: PortfolioStoreData = { ...data, educationItems: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    setNewEduRole('');
    setNewEduOrg('');
    setNewEduDesc('');
    setIsCreatingEdu(false);
    showToast('✓ Education entry added!');
  };

  const handleDeleteEdu = (id: string) => {
    if (!data) return;
    const updated = (data.educationItems || []).filter(x => x.id !== id);
    const updatedData: PortfolioStoreData = { ...data, educationItems: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    showToast('✓ Education entry deleted');
  };

  const handleCreateGuar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !newGuarTitle.trim()) {
      showToast('Please enter guarantee title.');
      return;
    }
    const newG: ClientGuaranteeItem = {
      id: 'g-' + Date.now(),
      title: newGuarTitle.trim(),
      tag: newGuarTag.trim() || 'Client Trust',
      iconName: newGuarIcon,
      desc: newGuarDesc.trim() || 'Non-negotiable service standard.',
      badgeColor: newGuarColor
    };
    const updated = [...(data.clientGuarantees || []), newG];
    const updatedData: PortfolioStoreData = { ...data, clientGuarantees: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    setNewGuarTitle('');
    setNewGuarDesc('');
    setIsCreatingGuar(false);
    showToast('✓ Client commitment added!');
  };

  const handleDeleteGuar = (id: string) => {
    if (!data) return;
    const updated = (data.clientGuarantees || []).filter(g => g.id !== id);
    const updatedData: PortfolioStoreData = { ...data, clientGuarantees: updated };
    setData(updatedData);
    savePortfolioData(updatedData);
    showToast('✓ Commitment removed');
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
              { id: 'personal', label: 'Profile, Bio & Socials', icon: User },
              { id: 'metrics', label: 'Live Metrics & Stats', icon: TrendingUp },
              { id: 'services', label: 'Services (What I Do)', icon: Briefcase },
              { id: 'pricing', label: 'Pricing & Packages', icon: CreditCard },
              { id: 'certifications', label: 'Certifications', icon: Award },
              { id: 'guarantees', label: 'Client Guarantees', icon: ShieldCheck },
              { id: 'experience', label: 'Work & Education', icon: Milestone },
              { id: 'projects', label: 'Recent Projects', icon: FolderGit2 },
              { id: 'blog', label: 'Blog & Insights', icon: BookOpen },
              { id: 'faqs', label: 'Homepage FAQs', icon: HelpCircle },
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
                  {item.id === 'bookings' && bookings.length > 0 && (
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-sage' : 'bg-emerald-500 text-white shadow-xs animate-pulse'
                    }`}>
                      {bookings.length} New
                    </span>
                  )}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Total Services</span>
                  <div className="text-2xl font-bold font-display text-ink">{data.services.length} Active</div>
                  <button onClick={() => setActiveTab('services')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage Services →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Pricing Packages</span>
                  <div className="text-2xl font-bold font-display text-ink">{(data.pricingPackages || []).length} Tiers</div>
                  <button onClick={() => setActiveTab('pricing')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage Pricing →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Client Guarantees</span>
                  <div className="text-2xl font-bold font-display text-ink">{(data.clientGuarantees || []).length} Commitments</div>
                  <button onClick={() => setActiveTab('guarantees')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage Guarantees →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Work &amp; Education</span>
                  <div className="text-2xl font-bold font-display text-ink">{(data.experienceItems || []).length + (data.educationItems || []).length} Milestones</div>
                  <button onClick={() => setActiveTab('experience')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage Timeline →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Homepage FAQs</span>
                  <div className="text-2xl font-bold font-display text-ink">{(data.faqItems || []).length} Answers</div>
                  <button onClick={() => setActiveTab('faqs')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage FAQs →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Verified Certifications</span>
                  <div className="text-2xl font-bold font-display text-ink">{(data.certifications || []).length} Badges</div>
                  <button onClick={() => setActiveTab('certifications')} className="text-xs text-sage font-semibold mt-3 hover:underline">Manage Certs →</button>
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
                  <span className="text-xs text-muted font-medium block mb-1">Hero Metrics Bar</span>
                  <div className="text-2xl font-bold font-display text-ink">{(data.metrics || []).length} Live Stats</div>
                  <button onClick={() => setActiveTab('metrics')} className="text-xs text-sage font-semibold mt-3 hover:underline">Edit Metrics →</button>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
                  <span className="text-xs text-muted font-medium block mb-1">Live Status</span>
                  <div className="text-2xl font-bold font-display text-emerald-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </div>
                  <Link href="/" target="_blank" className="text-xs text-sage font-semibold mt-3 hover:underline inline-block">Preview Site →</Link>
                </div>
              </div>

              {/* Strategy Bookings Notification Card */}
              {bookings.length > 0 && (
                <div className="bg-card border-2 border-emerald-500/40 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-ink">Incoming Strategy Call Bookings</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                            {bookings.length} New
                          </span>
                        </div>
                        <p className="text-xs text-muted">
                          Clients who scheduled a 15-minute consultation via your website.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="px-4 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      View All Bookings →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {bookings.slice(0, 2).map((b: any) => (
                      <div key={b.id} className="p-3.5 rounded-xl bg-cardSubtle border border-border text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-ink font-semibold">{b.name}</strong>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">{b.platform}</span>
                        </div>
                        <div className="text-muted text-[11px] flex items-center justify-between">
                          <span>📅 {b.date}</span>
                          <span className="text-sage font-medium">⏰ {b.timeSlot.split(' (')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

                {/* ─── ABOUT SECTION CONTROLS ─── */}
                <div className="pt-6 border-t border-border space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-ink mb-1">About Section Story &amp; Philosophy</h3>
                    <p className="text-xs text-muted">Customize the main bio narrative and authority pillars shown in the About section.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">About Section Heading</label>
                    <input
                      type="text"
                      value={data.aboutSection?.heading || ''}
                      onChange={(e) => setData({
                        ...data,
                        aboutSection: { ...data.aboutSection, heading: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Lead Sentence / Hook</label>
                    <input
                      type="text"
                      value={data.aboutSection?.lead || ''}
                      onChange={(e) => setData({
                        ...data,
                        aboutSection: { ...data.aboutSection, lead: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Bio Paragraph 1 (AEO &amp; GEO Context)</label>
                      <textarea
                        rows={3}
                        value={data.aboutSection?.p1 || ''}
                        onChange={(e) => setData({
                          ...data,
                          aboutSection: { ...data.aboutSection, p1: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Bio Paragraph 2 (Technical Rigor)</label>
                      <textarea
                        rows={3}
                        value={data.aboutSection?.p2 || ''}
                        onChange={(e) => setData({
                          ...data,
                          aboutSection: { ...data.aboutSection, p2: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage resize-none"
                      />
                    </div>
                  </div>

                  {/* Authority Pillars */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">3 Core Authority Pillars</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(data.aboutSection?.pillars || []).map((pillar, pIdx) => (
                        <div key={pIdx} className="p-3.5 rounded-xl bg-cardSubtle border border-border space-y-2">
                          <span className="text-[10px] font-bold uppercase text-sage">Pillar #{pIdx + 1}</span>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const updatedPillars = [...(data.aboutSection?.pillars || [])];
                              updatedPillars[pIdx] = { ...updatedPillars[pIdx], title: e.target.value };
                              setData({
                                ...data,
                                aboutSection: { ...data.aboutSection, pillars: updatedPillars }
                              });
                            }}
                            className="w-full px-2 py-1 rounded-lg bg-card border border-border text-xs font-bold text-ink outline-none"
                          />
                          <textarea
                            rows={2}
                            value={pillar.desc}
                            onChange={(e) => {
                              const updatedPillars = [...(data.aboutSection?.pillars || [])];
                              updatedPillars[pIdx] = { ...updatedPillars[pIdx], desc: e.target.value };
                              setData({
                                ...data,
                                aboutSection: { ...data.aboutSection, pillars: updatedPillars }
                              });
                            }}
                            className="w-full px-2 py-1 rounded-lg bg-card border border-border text-xs text-muted outline-none resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── SKILLS & PROFICIENCY ─── */}
                <div className="pt-6 border-t border-border space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-ink mb-1">Technical Skills &amp; Proficiency Percentages</h3>
                    <p className="text-xs text-muted">Adjust skill names and proficiency percentage bars displayed in the About section.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(data.skills || []).map((skill, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-cardSubtle border border-border space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updatedSkills = [...(data.skills || [])];
                              updatedSkills[sIdx] = { ...updatedSkills[sIdx], name: e.target.value };
                              setData({ ...data, skills: updatedSkills });
                            }}
                            className="px-2 py-1 rounded-lg bg-card border border-border text-xs font-semibold text-ink outline-none flex-1 mr-2"
                          />
                          <span className="text-xs font-bold font-mono text-sage">{skill.pct}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={skill.pct}
                          onChange={(e) => {
                            const updatedSkills = [...(data.skills || [])];
                            updatedSkills[sIdx] = { ...updatedSkills[sIdx], pct: Number(e.target.value) };
                            setData({ ...data, skills: updatedSkills });
                          }}
                          className="w-full accent-sage cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end border-t border-border">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  >
                    Save All Profile &amp; Bio Changes
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
               TAB: PRICING & PACKAGES
          ────────────────────────────────── */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">Service Packages &amp; Pricing Plans</h2>
                  <p className="text-xs text-muted">
                    Create, edit, and organize pricing tiers showcased on your website. Changes apply instantly and push to GitHub.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatingPkg(!isCreatingPkg)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> {isCreatingPkg ? 'Cancel' : 'Add New Package'}
                </button>
              </div>

              {/* Add New Package Form */}
              {isCreatingPkg && (
                <form onSubmit={handleCreatePricingPackage} className="bg-card border-2 border-sage/40 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 animate-in zoom-in-95 duration-150">
                  <h3 className="font-bold text-sm text-ink uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-sage" /> Create New Pricing Tier
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Package Name *</label>
                      <input
                        type="text"
                        required
                        value={newPkgName}
                        onChange={(e) => setNewPkgName(e.target.value)}
                        placeholder="e.g. Technical SEO Sprint"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Price (Display) *</label>
                      <input
                        type="text"
                        required
                        value={newPkgPrice}
                        onChange={(e) => setNewPkgPrice(e.target.value)}
                        placeholder="e.g. $499 or Custom"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Billing Period</label>
                      <select
                        value={newPkgBilling}
                        onChange={(e) => setNewPkgBilling(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      >
                        <option value="/month">/month (Recurring)</option>
                        <option value="one-time">one-time (Fixed project)</option>
                        <option value="/quarter">/quarter</option>
                        <option value="starting at">starting at</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={newPkgCtaText}
                        onChange={(e) => setNewPkgCtaText(e.target.value)}
                        placeholder="e.g. Book Strategy Call"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">CTA Action</label>
                      <select
                        value={newPkgCtaAction}
                        onChange={(e) => setNewPkgCtaAction(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      >
                        <option value="book">Open Booking Modal (Recommended)</option>
                        <option value="contact">Scroll to Contact Form</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Tagline / Summary</label>
                    <input
                      type="text"
                      value={newPkgTagline}
                      onChange={(e) => setNewPkgTagline(e.target.value)}
                      placeholder="e.g. Best for high-growth e-commerce brands needing Page 1 organic revenue."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                      Deliverables / Features (One feature per line) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={newPkgFeatures}
                      onChange={(e) => setNewPkgFeatures(e.target.value)}
                      placeholder="Core Web Vitals diagnostic&#10;Google AI Overviews (AEO) readiness&#10;Semantic Schema validation&#10;Bi-weekly 1-on-1 strategy call"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="popularCheck"
                      checked={newPkgPopular}
                      onChange={(e) => setNewPkgPopular(e.target.checked)}
                      className="w-4 h-4 rounded text-sage border-border cursor-pointer"
                    />
                    <label htmlFor="popularCheck" className="text-xs font-semibold text-ink cursor-pointer">
                      Highlight as &quot;Most Popular / Recommended&quot; badge
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingPkg(false)}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-muted hover:text-ink cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                    >
                      Save &amp; Publish Package
                    </button>
                  </div>
                </form>
              )}

              {/* Package List */}
              <div className="space-y-4">
                {(data.pricingPackages || []).map((pkg, index) => (
                  <div key={pkg.id} className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-sage-pal border border-sage/30 text-sage font-bold text-xs flex items-center justify-center">
                          #{index + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-base text-ink font-bold">{pkg.name}</strong>
                            {pkg.popular && (
                              <span className="px-2 py-0.5 rounded-md bg-sage text-white text-[10px] font-bold">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted font-mono">{pkg.price} {pkg.billingPeriod}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeletePricingPackage(pkg.id)}
                        className="p-2 rounded-lg text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-1">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...(data.pricingPackages || [])];
                            updated[index].name = e.target.value;
                            setData({ ...data, pricingPackages: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-1">Price</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...(data.pricingPackages || [])];
                            updated[index].price = e.target.value;
                            setData({ ...data, pricingPackages: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-1">Billing Period</label>
                        <input
                          type="text"
                          value={pkg.billingPeriod}
                          onChange={(e) => {
                            const updated = [...(data.pricingPackages || [])];
                            updated[index].billingPeriod = e.target.value;
                            setData({ ...data, pricingPackages: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted mb-1">Tagline</label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => {
                          const updated = [...(data.pricingPackages || [])];
                          updated[index].tagline = e.target.value;
                          setData({ ...data, pricingPackages: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted mb-1">
                        Features (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(pkg.features || []).join('\n')}
                        onChange={(e) => {
                          const updated = [...(data.pricingPackages || [])];
                          updated[index].features = e.target.value.split('\n').filter(Boolean);
                          setData({ ...data, pricingPackages: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pkg.popular}
                          onChange={(e) => {
                            const updated = [...(data.pricingPackages || [])];
                            updated[index].popular = e.target.checked;
                            setData({ ...data, pricingPackages: updated });
                          }}
                          className="w-3.5 h-3.5 rounded text-sage cursor-pointer"
                        />
                        <span className="font-semibold text-ink">Most Popular Badge</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <span className="text-muted text-[11px]">CTA:</span>
                        <input
                          type="text"
                          value={pkg.ctaText}
                          onChange={(e) => {
                            const updated = [...(data.pricingPackages || [])];
                            updated[index].ctaText = e.target.value;
                            setData({ ...data, pricingPackages: updated });
                          }}
                          className="px-2 py-1 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none w-36"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: CERTIFICATIONS
          ────────────────────────────────── */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">Industry Accreditations &amp; Certifications</h2>
                  <p className="text-xs text-muted">
                    Showcase official credentials from Google, Semrush, HubSpot, Upwork, and Meta.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatingCert(!isCreatingCert)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> {isCreatingCert ? 'Cancel' : 'Add Certification'}
                </button>
              </div>

              {/* Add New Certification Form */}
              {isCreatingCert && (
                <form onSubmit={handleCreateCertification} className="bg-card border-2 border-sage/40 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 animate-in zoom-in-95 duration-150">
                  <h3 className="font-bold text-sm text-ink uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-sage" /> Add New Industry Accreditation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Certificate Title *</label>
                      <input
                        type="text"
                        required
                        value={newCertTitle}
                        onChange={(e) => setNewCertTitle(e.target.value)}
                        placeholder="e.g. Google Analytics 4 Certification"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Issuing Organization *</label>
                      <input
                        type="text"
                        required
                        value={newCertIssuer}
                        onChange={(e) => setNewCertIssuer(e.target.value)}
                        placeholder="e.g. Google Skillshop, Semrush, HubSpot"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Badge Brand / Category</label>
                      <select
                        value={newCertBadgeType}
                        onChange={(e) => setNewCertBadgeType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      >
                        <option value="google">Google</option>
                        <option value="semrush">Semrush</option>
                        <option value="hubspot">HubSpot</option>
                        <option value="upwork">Upwork</option>
                        <option value="meta">Meta</option>
                        <option value="general">General / Accredited</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Issue Date / Status</label>
                      <input
                        type="text"
                        value={newCertDate}
                        onChange={(e) => setNewCertDate(e.target.value)}
                        placeholder="e.g. Verified or 2024"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Credential ID (Optional)</label>
                      <input
                        type="text"
                        value={newCertCredId}
                        onChange={(e) => setNewCertCredId(e.target.value)}
                        placeholder="e.g. GA4-9921"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Verification URL (Optional)</label>
                    <input
                      type="url"
                      value={newCertUrl}
                      onChange={(e) => setNewCertUrl(e.target.value)}
                      placeholder="https://skillshop.credential.net/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Description / Skills Mastered *</label>
                    <textarea
                      rows={2}
                      required
                      value={newCertDesc}
                      onChange={(e) => setNewCertDesc(e.target.value)}
                      placeholder="Summary of skills, e.g. Crawl budget analysis, JavaScript SEO, and GA4 event modeling..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingCert(false)}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-muted hover:text-ink cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                    >
                      Save &amp; Publish Certification
                    </button>
                  </div>
                </form>
              )}

              {/* Certifications List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.certifications || []).map((cert, index) => (
                  <div key={cert.id} className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-3 border-b border-border pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sage block mb-0.5">
                          {cert.issuer}
                        </span>
                        <strong className="text-sm font-bold text-ink block leading-snug">{cert.title}</strong>
                      </div>

                      <button
                        onClick={() => handleDeleteCertification(cert.id)}
                        className="p-2 rounded-lg text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                        title="Delete certification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const updated = [...(data.certifications || [])];
                            updated[index].title = e.target.value;
                            setData({ ...data, certifications: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => {
                            const updated = [...(data.certifications || [])];
                            updated[index].issuer = e.target.value;
                            setData({ ...data, certifications: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Badge Type</label>
                        <select
                          value={cert.badgeType}
                          onChange={(e) => {
                            const updated = [...(data.certifications || [])];
                            updated[index].badgeType = e.target.value as any;
                            setData({ ...data, certifications: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        >
                          <option value="google">Google</option>
                          <option value="semrush">Semrush</option>
                          <option value="hubspot">HubSpot</option>
                          <option value="upwork">Upwork</option>
                          <option value="meta">Meta</option>
                          <option value="general">General</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Credential ID</label>
                        <input
                          type="text"
                          value={cert.credentialId || ''}
                          onChange={(e) => {
                            const updated = [...(data.certifications || [])];
                            updated[index].credentialId = e.target.value;
                            setData({ ...data, certifications: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={cert.description}
                        onChange={(e) => {
                          const updated = [...(data.certifications || [])];
                          updated[index].description = e.target.value;
                          setData({ ...data, certifications: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: METRICS BAR
          ────────────────────────────────── */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-ink mb-1">Hero Statistics &amp; Metrics Bar</h2>
                <p className="text-xs text-muted">
                  Live animated counters displayed right beneath your hero section on the homepage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.metrics || []).map((metric, index) => (
                  <div key={metric.id || index} className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="text-xs font-bold text-sage uppercase tracking-wider">
                        Counter #{index + 1}
                      </span>
                      <span className="text-lg font-bold font-mono text-ink">
                        {metric.prefix}{metric.value}{metric.suffix}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-1">Prefix</label>
                        <input
                          type="text"
                          value={metric.prefix || ''}
                          onChange={(e) => {
                            const updated = [...(data.metrics || [])];
                            updated[index].prefix = e.target.value;
                            setData({ ...data, metrics: updated });
                          }}
                          placeholder="e.g. +"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-1">Number *</label>
                        <input
                          type="number"
                          value={metric.value}
                          onChange={(e) => {
                            const updated = [...(data.metrics || [])];
                            updated[index].value = Number(e.target.value) || 0;
                            setData({ ...data, metrics: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-1">Suffix</label>
                        <input
                          type="text"
                          value={metric.suffix || ''}
                          onChange={(e) => {
                            const updated = [...(data.metrics || [])];
                            updated[index].suffix = e.target.value;
                            setData({ ...data, metrics: updated });
                          }}
                          placeholder="e.g. % or +"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted mb-1">Label / Metric Description *</label>
                      <input
                        type="text"
                        value={metric.label}
                        onChange={(e) => {
                          const updated = [...(data.metrics || [])];
                          updated[index].label = e.target.value;
                          setData({ ...data, metrics: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: CLIENT GUARANTEES
          ────────────────────────────────── */}
          {activeTab === 'guarantees' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">Six Non-Negotiable Client Commitments</h2>
                  <p className="text-xs text-muted">
                    Risk-free client safety standards (White-Hat, Strict NDA, Live Dashboards, No Lock-In, etc.).
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatingGuar(!isCreatingGuar)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> {isCreatingGuar ? 'Cancel' : 'Add Commitment'}
                </button>
              </div>

              {isCreatingGuar && (
                <form onSubmit={handleCreateGuar} className="bg-card border-2 border-sage/40 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 animate-in zoom-in-95 duration-150">
                  <h3 className="font-bold text-sm text-ink uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-sage" /> Add New Guarantee Commitment
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={newGuarTitle}
                        onChange={(e) => setNewGuarTitle(e.target.value)}
                        placeholder="e.g. 100% White-Hat &amp; Penalty Free"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={newGuarTag}
                        onChange={(e) => setNewGuarTag(e.target.value)}
                        placeholder="e.g. Algorithmic Safety"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Icon Style</label>
                      <select
                        value={newGuarIcon}
                        onChange={(e) => setNewGuarIcon(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      >
                        <option value="shield">Shield (Security)</option>
                        <option value="lock">Lock (Privacy/NDA)</option>
                        <option value="trending">Trending (Dashboards/ROI)</option>
                        <option value="zap">Zap (Speed/Flexibility)</option>
                        <option value="message">Message (Slack/WhatsApp)</option>
                        <option value="cpu">CPU (CSE Engineering)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Color Theme</label>
                      <select
                        value={newGuarColor}
                        onChange={(e) => setNewGuarColor(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage"
                      >
                        <option value="emerald">Emerald (Green)</option>
                        <option value="blue">Blue</option>
                        <option value="sage">Sage</option>
                        <option value="amber">Amber</option>
                        <option value="indigo">Indigo</option>
                        <option value="purple">Purple</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={newGuarDesc}
                      onChange={(e) => setNewGuarDesc(e.target.value)}
                      placeholder="Explain this commitment clearly..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingGuar(false)}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-muted hover:bg-cardSubtle"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 shadow-xs cursor-pointer"
                    >
                      Save Commitment
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.clientGuarantees || []).map((item, index) => (
                  <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-3 border-b border-border pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sage block mb-0.5">
                          {item.tag}
                        </span>
                        <strong className="text-sm font-bold text-ink block leading-snug">{item.title}</strong>
                      </div>

                      <button
                        onClick={() => handleDeleteGuar(item.id)}
                        className="p-2 rounded-lg text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                        title="Delete commitment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...(data.clientGuarantees || [])];
                            updated[index].title = e.target.value;
                            setData({ ...data, clientGuarantees: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Tag</label>
                        <input
                          type="text"
                          value={item.tag}
                          onChange={(e) => {
                            const updated = [...(data.clientGuarantees || [])];
                            updated[index].tag = e.target.value;
                            setData({ ...data, clientGuarantees: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) => {
                          const updated = [...(data.clientGuarantees || [])];
                          updated[index].desc = e.target.value;
                          setData({ ...data, clientGuarantees: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: WORK & EDUCATION
          ────────────────────────────────── */}
          {activeTab === 'experience' && (
            <div className="space-y-8">
              {/* Work Experience Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3">
                  <div>
                    <h2 className="text-xl font-bold font-display text-ink mb-0.5 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-sage" /> Work Experience
                    </h2>
                    <p className="text-xs text-muted">
                      Your career timeline, company roles, and professional achievements.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreatingExp(!isCreatingExp)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> {isCreatingExp ? 'Cancel' : 'Add Experience'}
                  </button>
                </div>

                {isCreatingExp && (
                  <form onSubmit={handleCreateExp} className="bg-card border-2 border-sage/40 rounded-3xl p-6 shadow-lg space-y-4 animate-in zoom-in-95 duration-150">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Role / Job Title *</label>
                        <input
                          type="text"
                          required
                          value={newExpRole}
                          onChange={(e) => setNewExpRole(e.target.value)}
                          placeholder="e.g. Lead Web Strategist"
                          className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          value={newExpOrg}
                          onChange={(e) => setNewExpOrg(e.target.value)}
                          placeholder="e.g. Final Touch · Dhaka"
                          className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Time Period</label>
                        <input
                          type="text"
                          value={newExpDate}
                          onChange={(e) => setNewExpDate(e.target.value)}
                          placeholder="e.g. 2025 – Present"
                          className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Responsibilities &amp; Scope *</label>
                      <textarea
                        rows={2}
                        required
                        value={newExpDesc}
                        onChange={(e) => setNewExpDesc(e.target.value)}
                        placeholder="Brief summary of duties and milestones..."
                        className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCreatingExp(false)}
                        className="px-3.5 py-1.5 rounded-xl border border-border text-xs text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 shadow-xs cursor-pointer"
                      >
                        Save Job
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {(data.experienceItems || []).map((item, index) => (
                    <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => {
                              const updated = [...(data.experienceItems || [])];
                              updated[index].role = e.target.value;
                              setData({ ...data, experienceItems: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs font-bold text-ink outline-none"
                          />
                          <input
                            type="text"
                            value={item.org}
                            onChange={(e) => {
                              const updated = [...(data.experienceItems || [])];
                              updated[index].org = e.target.value;
                              setData({ ...data, experienceItems: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-muted outline-none"
                          />
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => {
                              const updated = [...(data.experienceItems || [])];
                              updated[index].date = e.target.value;
                              setData({ ...data, experienceItems: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs font-mono text-sage outline-none"
                          />
                        </div>

                        <button
                          onClick={() => handleDeleteExp(item.id)}
                          className="p-1.5 rounded-lg text-muted hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer shrink-0"
                          title="Delete job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) => {
                          const updated = [...(data.experienceItems || [])];
                          updated[index].desc = e.target.value;
                          setData({ ...data, experienceItems: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3">
                  <div>
                    <h2 className="text-xl font-bold font-display text-ink mb-0.5 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-sage" /> Academic Education
                    </h2>
                    <p className="text-xs text-muted">
                      Degrees, academic institutions, and educational background.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreatingEdu(!isCreatingEdu)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> {isCreatingEdu ? 'Cancel' : 'Add Degree'}
                  </button>
                </div>

                {isCreatingEdu && (
                  <form onSubmit={handleCreateEdu} className="bg-card border-2 border-sage/40 rounded-3xl p-6 shadow-lg space-y-4 animate-in zoom-in-95 duration-150">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Degree / Certificate *</label>
                        <input
                          type="text"
                          required
                          value={newEduRole}
                          onChange={(e) => setNewEduRole(e.target.value)}
                          placeholder="e.g. B.Sc. in CSE"
                          className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Institution *</label>
                        <input
                          type="text"
                          required
                          value={newEduOrg}
                          onChange={(e) => setNewEduOrg(e.target.value)}
                          placeholder="e.g. Northern University, Khulna"
                          className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Year / Period</label>
                        <input
                          type="text"
                          value={newEduDate}
                          onChange={(e) => setNewEduDate(e.target.value)}
                          placeholder="e.g. 2019 – 2023"
                          className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">CGPA / Details</label>
                      <textarea
                        rows={2}
                        value={newEduDesc}
                        onChange={(e) => setNewEduDesc(e.target.value)}
                        placeholder="e.g. CGPA: 3.094 / 4.00 · Software Engineering, Networking..."
                        className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs text-ink outline-none focus:border-sage resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCreatingEdu(false)}
                        className="px-3.5 py-1.5 rounded-xl border border-border text-xs text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 shadow-xs cursor-pointer"
                      >
                        Save Degree
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {(data.educationItems || []).map((item, index) => (
                    <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => {
                              const updated = [...(data.educationItems || [])];
                              updated[index].role = e.target.value;
                              setData({ ...data, educationItems: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs font-bold text-ink outline-none"
                          />
                          <input
                            type="text"
                            value={item.org}
                            onChange={(e) => {
                              const updated = [...(data.educationItems || [])];
                              updated[index].org = e.target.value;
                              setData({ ...data, educationItems: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-muted outline-none"
                          />
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => {
                              const updated = [...(data.educationItems || [])];
                              updated[index].date = e.target.value;
                              setData({ ...data, educationItems: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs font-mono text-sage outline-none"
                          />
                        </div>

                        <button
                          onClick={() => handleDeleteEdu(item.id)}
                          className="p-1.5 rounded-lg text-muted hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer shrink-0"
                          title="Delete degree"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) => {
                          const updated = [...(data.educationItems || [])];
                          updated[index].desc = e.target.value;
                          setData({ ...data, educationItems: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cardSubtle border border-border text-xs text-ink outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────
               TAB: HOMEPAGE FAQS
          ────────────────────────────────── */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-ink mb-1">Frequently Asked Questions</h2>
                  <p className="text-xs text-muted">
                    Manage the accordion questions and answers displayed in the FAQ section.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatingFaq(!isCreatingFaq)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> {isCreatingFaq ? 'Cancel' : 'Add FAQ'}
                </button>
              </div>

              {isCreatingFaq && (
                <form onSubmit={handleCreateFaq} className="bg-card border-2 border-sage/40 rounded-3xl p-6 shadow-lg space-y-4 animate-in zoom-in-95 duration-150">
                  <h3 className="font-bold text-sm text-ink uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-sage" /> Add New FAQ Item
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Question *</label>
                    <input
                      type="text"
                      required
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      placeholder="e.g. Can you work with international US/UK clients?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Answer *</label>
                    <textarea
                      rows={3}
                      required
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      placeholder="Provide a clear, direct answer..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingFaq(false)}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-muted hover:bg-cardSubtle"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 shadow-xs cursor-pointer"
                    >
                      Save FAQ
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {(data.faqItems || []).map((faq, index) => (
                  <div key={faq.id || index} className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-3 border-b border-border pb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-sage font-mono">
                        Q{index + 1}
                      </div>

                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1.5 rounded-lg text-muted hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer shrink-0"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const updated = [...(data.faqItems || [])];
                          updated[index].q = e.target.value;
                          setData({ ...data, faqItems: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm font-semibold text-ink outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted mb-1">Answer</label>
                      <textarea
                        rows={3}
                        value={faq.a}
                        onChange={(e) => {
                          const updated = [...(data.faqItems || [])];
                          updated[index].a = e.target.value;
                          setData({ ...data, faqItems: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none resize-none"
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
