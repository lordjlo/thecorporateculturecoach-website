import React, { useEffect } from 'react';
import { ArrowRight, ChevronDown, Award, TrendingUp, Users, CheckCircle, Quote } from 'lucide-react';

const App = () => {
  useEffect(() => {
    // Simple intersection observer to trigger fade up animations when scrolling
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.style.opacity = 1;
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-on-scroll').forEach((el) => {
      el.style.opacity = 0;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-content">
          <div className="logo">Tamsin Kaminski</div>
          <div className="nav-links">
            <a href="#framework">Methodology</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Results</a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '10px 24px' }}>Book Discovery Call</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero section-large">
        <div className="container hero-grid fade-on-scroll">
          <div className="hero-content">
            <span className="text-accent" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: '600' }}>
              Executive Leadership Coach UK
            </span>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', marginTop: '16px' }}>
              We transform corporate culture to multiply your business valuation.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-support)', marginBottom: '40px', maxWidth: '500px' }}>
              For SME Founders and MDs who know that their people are the key to unlocking sustainable growth and achieving maximum exit value.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Book a Discovery Call <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Tamsin Kaminski, Corporate Culture Coach"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="hero-stat bg-dominant">
              <span className="stat-number text-accent">300%</span>
              <span className="stat-label" style={{ color: 'var(--color-secondary)', fontSize: '14px' }}>Average ROI on leadership alignment</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator fade-on-scroll">
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Scroll to explore</span>
          <ChevronDown size={20} style={{ marginTop: '8px' }} />
        </div>
      </header>

      {/* Trust Bar */}
      <section className="trust-bar bg-surface section fade-on-scroll">
        <div className="container text-center">
          <p style={{ color: 'var(--color-support)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', marginBottom: '32px' }}>
            Trusted by forward-thinking SMEs & Leadership Teams
          </p>
          <div className="logo-strip">
            <Award size={40} className="text-accent" />
            <span style={{ fontWeight: '600', fontSize: '24px', fontFamily: 'var(--font-heading)' }}>TRICRES</span>
            <Users size={32} color="var(--color-support)" />
            <TrendingUp size={32} color="var(--color-support)" />
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="framework" className="methodology section-large fade-on-scroll">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>The Core Methodology</h2>
            <p style={{ color: 'var(--color-support)', maxWidth: '600px', margin: '0 auto' }}>
              My proprietary approach blends rigorous audit techniques with deep behavioral psychology to embed lasting change.
            </p>
          </div>
          <div className="pillar-grid">
            <div className="pillar-card">
              <div className="pillar-number text-accent">01</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Diagnose</h3>
              <p style={{ color: 'var(--color-support)', marginBottom: '24px' }}>
                We start with a comprehensive culture audit and leadership gap analysis to uncover the hidden blockers to your growth.
              </p>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {['Leadership Alignment', 'Employee Engagement Index', 'Organizational Friction'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', fontSize: '14px' }}>
                    <CheckCircle size={16} className="text-accent" style={{ marginRight: '8px' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pillar-card">
              <div className="pillar-number text-accent">02</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Design</h3>
              <p style={{ color: 'var(--color-support)', marginBottom: '24px' }}>
                We engineer a bespoke culture blueprint that aligns your team's everyday actions with your strategic vision.
              </p>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {['Values & Behaviors Mapping', 'Leadership Operating Rhythm', 'Performance Frameworks'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', fontSize: '14px' }}>
                    <CheckCircle size={16} className="text-accent" style={{ marginRight: '8px' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pillar-card bg-dominant">
              <div className="pillar-number text-accent" style={{ opacity: 1 }}>03</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--color-white)' }}>Embed</h3>
              <p style={{ color: 'var(--color-secondary)', marginBottom: '24px' }}>
                We move from theory to practice, implementing coaching structures that ensure your new culture becomes self-sustaining.
              </p>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {['Executive Coaching', 'Management Training', 'Continuous Review Iteration'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', fontSize: '14px', color: 'var(--color-white)' }}>
                    <CheckCircle size={16} className="text-accent" style={{ marginRight: '8px' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials bg-surface section-large fade-on-scroll">
        <div className="container">
           <h2 style={{ fontSize: '2.5rem', marginBottom: '64px', textAlign: 'center' }}>Executive Outcomes</h2>
           <div className="testimonial-card">
              <Quote size={48} className="text-accent" style={{ marginBottom: '24px', opacity: 0.5 }} />
              <p style={{ fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '32px', lineHeight: '1.4' }}>
                "Tamsin completely revolutionized our leadership team's dynamic. Within six months, our internal friction reduced entirely, and we saw a direct translation to our bottom line. An essential partner for any founder scaling up."
              </p>
              <div className="testimonial-author">
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>James Peterson</div>
                <div style={{ color: 'var(--color-support)', fontSize: '0.9rem' }}>Founder & CEO, TechScale Solutions</div>
              </div>
           </div>
        </div>
      </section>
      
      {/* Services */}
      <section id="services" className="services section-large fade-on-scroll">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Ways of Working</h2>
            <p style={{ color: 'var(--color-support)', maxWidth: '600px', margin: '0 auto' }}>
              Tailored interventions designed to meet you where your business is today.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-header">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>The Fact Find</h3>
                <p style={{ color: 'var(--color-support)', fontSize: '0.9rem' }}>Comprehensive Diagnostic</p>
              </div>
              <div className="service-price text-accent" style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', margin: '24px 0' }}>£1,500</div>
              <ul className="service-features" style={{ listStyle: 'none', padding: '0', marginBottom: '32px' }}>
                <li style={{ padding: '12px 0', borderBottom: '1px solid var(--color-surface)', fontSize: '14px' }}>Deep-dive stakeholder interviews</li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid var(--color-surface)', fontSize: '14px' }}>Culture diagnostic report</li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid var(--color-surface)', fontSize: '14px' }}>Custom implementation roadmap</li>
              </ul>
              <a href="#contact" className="btn btn-outline" style={{ width: '100%' }}>Inquire Now</a>
            </div>
            
            <div className="service-card featured">
              <div className="featured-badge bg-accent">Most Popular</div>
              <div className="service-header" style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Executive Coaching</h3>
                <p style={{ color: 'var(--color-support)', fontSize: '0.9rem' }}>1-on-1 Leadership Development</p>
              </div>
              <div className="service-price text-accent" style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', margin: '24px 0' }}>Custom</div>
              <ul className="service-features" style={{ listStyle: 'none', padding: '0', marginBottom: '32px' }}>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>6-month engagement structure</li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>Bi-weekly deep coaching sessions</li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>On-demand advisory access</li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>Psychometric profiling</li>
              </ul>
              <a href="#contact" className="btn btn-primary" style={{ width: '100%' }}>Apply for Coaching</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer id="contact" className="footer bg-dominant section-large fade-on-scroll" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--color-white)', marginBottom: '24px' }}>Ready to elevate your impact?</h2>
          <p style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>
            Book a complimentary 30-minute discovery call to discuss your current challenges and explore if we're a fit.
          </p>
          <a href="#" className="btn btn-primary" style={{ fontSize: '16px', padding: '20px 48px' }}>
            Schedule Discovery Call
          </a>
          
          <div className="footer-bottom" style={{ marginTop: '80px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', color: 'var(--color-support)', fontSize: '14px' }}>
            <div>© {new Date().getFullYear()} The Corporate Culture Coach.</div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
