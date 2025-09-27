// SCHOOL2CAREER - Standardized Header Component
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import SCButton from './SCButton';

const SCHeader = ({
  variant = 'default',
  fixed = true,
  transparent = false,
  showUserMenu = true,
  showLanguageSwitcher = true,
  className = ''
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ar');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // محتوى متعدد اللغات
  const content = {
    ar: {
      direction: 'rtl',
      nav: {
        home: 'الرئيسية',
        features: 'المميزات',
        assessments: 'التقييمات',
        about: 'حولنا',
        contact: 'اتصل بنا',
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        dashboard: 'لوحة التحكم',
        profile: 'الملف الشخصي',
        settings: 'الإعدادات',
        logout: 'تسجيل الخروج',
        cta: 'ابدأ الآن'
      }
    },
    en: {
      direction: 'ltr',
      nav: {
        home: 'Home',
        features: 'Features',
        assessments: 'Assessments',
        about: 'About',
        contact: 'Contact',
        login: 'Login',
        signup: 'Sign Up',
        dashboard: 'Dashboard',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        cta: 'Get Started'
      }
    },
    fr: {
      direction: 'ltr',
      nav: {
        home: 'Accueil',
        features: 'Fonctionnalités',
        assessments: 'Évaluations',
        about: 'À propos',
        contact: 'Contact',
        login: 'Connexion',
        signup: 'S\'inscrire',
        dashboard: 'Tableau de bord',
        profile: 'Profil',
        settings: 'Paramètres',
        logout: 'Déconnexion',
        cta: 'Commencer'
      }
    }
  };

  const t = content[currentLang];

  useEffect(() => {
    checkUser();
    document.documentElement.dir = t.direction;
    document.documentElement.lang = currentLang;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    if (fixed) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentLang, t.direction, fixed]);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setShowDropdown(false);
    router.push('/');
  }

  const baseClasses = [
    'sc-header',
    'sc-transition',
    'sc-performance-optimized'
  ];

  const variantClasses = {
    default: 'sc-header-default',
    glass: 'sc-header-glass',
    solid: 'sc-header-solid'
  };

  const classes = [
    ...baseClasses,
    variantClasses[variant],
    fixed && 'sc-header-fixed',
    transparent && !scrolled && 'sc-header-transparent',
    scrolled && 'sc-header-scrolled',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      <div className="sc-container">
        <div className="sc-header-content">
          {/* Logo */}
          <Link href="/" className="sc-logo">
            <span className="sc-text-gradient sc-font-bold sc-text-2xl">
              School2Career
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="sc-nav-desktop">
            <Link href="/" className="sc-nav-link">
              {t.nav.home}
            </Link>
            <Link href="/#features" className="sc-nav-link">
              {t.nav.features}
            </Link>
            <Link href="/assessments" className="sc-nav-link">
              {t.nav.assessments}
            </Link>
            <Link href="/#about" className="sc-nav-link">
              {t.nav.about}
            </Link>
            <Link href="/#contact" className="sc-nav-link">
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="sc-header-actions">
            {/* Language Switcher */}
            {showLanguageSwitcher && (
              <select
                className="sc-lang-switcher"
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
              >
                <option value="ar">عربي</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            )}

            {/* User Menu */}
            {showUserMenu && (
              <>
                {user ? (
                  <div className="sc-user-menu">
                    <button
                      className="sc-user-button"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <div className="sc-user-avatar">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="sc-user-name">
                        {user.email?.split('@')[0]}
                      </span>
                      <span className={`sc-dropdown-arrow ${showDropdown ? 'open' : ''}`}>
                        ↓
                      </span>
                    </button>

                    {showDropdown && (
                      <div className="sc-dropdown">
                        <Link href="/dashboard" className="sc-dropdown-item">
                          <span>📊</span>
                          {t.nav.dashboard}
                        </Link>
                        <Link href="/profile" className="sc-dropdown-item">
                          <span>👤</span>
                          {t.nav.profile}
                        </Link>
                        <Link href="/settings" className="sc-dropdown-item">
                          <span>⚙️</span>
                          {t.nav.settings}
                        </Link>
                        <div className="sc-dropdown-divider"></div>
                        <button
                          className="sc-dropdown-item"
                          onClick={handleSignOut}
                        >
                          <span>🚪</span>
                          {t.nav.logout}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="sc-auth-buttons">
                    <Link href="/login" className="sc-nav-link">
                      {t.nav.login}
                    </Link>
                    <SCButton
                      variant="primary"
                      size="sm"
                      onClick={() => router.push('/signup')}
                    >
                      {t.nav.signup}
                    </SCButton>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="sc-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="sc-nav-mobile">
            <Link href="/" className="sc-nav-mobile-link">
              {t.nav.home}
            </Link>
            <Link href="/#features" className="sc-nav-mobile-link">
              {t.nav.features}
            </Link>
            <Link href="/assessments" className="sc-nav-mobile-link">
              {t.nav.assessments}
            </Link>
            <Link href="/#about" className="sc-nav-mobile-link">
              {t.nav.about}
            </Link>
            <Link href="/#contact" className="sc-nav-mobile-link">
              {t.nav.contact}
            </Link>
            
            {!user && (
              <>
                <div className="sc-nav-divider"></div>
                <Link href="/login" className="sc-nav-mobile-link">
                  {t.nav.login}
                </Link>
                <Link href="/signup" className="sc-nav-mobile-link">
                  {t.nav.signup}
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default SCHeader;