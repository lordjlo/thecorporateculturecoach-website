import React, { useEffect } from 'react';
import tamsinImage from './assets/tamsin.jpg';
import logoImage from './assets/logo.png';
import './index.css';

// Reusing Icons as fake logos for the strip
import { Hexagon, Triangle, Circle, Square, Star, Diamond, Activity, RefreshCw, Zap } from 'lucide-react';

const StatCounter = ({ end, label }) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        let startTimestamp = null;
        const duration = 1500;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // easeOutQuad
          const easeOut = progress * (2 - progress);
          setCount(Math.floor(easeOut * end));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={nodeRef} className="reveal">
      <div className="h1-display text-gold" style={{ marginBottom: '8px' }}>
        {label.includes('%') || label.includes('x') || label.includes('+') ? 
          <>{count}{label.replace(/[0-9.]/g, '')}</>
          : count}
      </div>
      <div className="section-label" style={{ color: 'var(--color-cream)' }}>{label.replace(/[^a-zA-Z\s]/g, '')}</div>
    </div>
  );
};

const SectionHeader = ({ label }) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.querySelector('.gold-rule').classList.add('revealed');
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.gold-rule-wrapper').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="gold-rule-wrapper reveal">
      <div className="gold-rule"></div>
      <div className="section-label">{label}</div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container bg-charcoal">
      
      {/* Navigation */}
      <nav className="nav reveal">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={logoImage} alt="The Corporate Culture Coach Logo" style={{ height: '32px' }} />
          <span className="section-label" style={{ color: 'var(--color-cream)' }}>The Corporate Culture Coach</span>
        </div>
      </nav>

      {/* Split Hero */}
      <header className="split-hero">
        <div className="split-hero-content bg-charcoal">
          <div className="reveal">
            <div style={{ marginBottom: '40px' }}>
              <img src={logoImage} alt="The Corporate Culture Coach" style={{ width: '100%', maxWidth: '320px', height: 'auto', borderRadius: '8px' }} />
            </div>
            <h1 className="h1-display text-cream" style={{ marginBottom: '24px' }}>
              Culture is the Competitive Advantage You're Not Measuring.
            </h1>
            <p className="body-text text-taupe" style={{ marginBottom: '48px', maxWidth: '440px' }}>
              Executive advisory for leaders who know that people performance is bottom-line performance.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-gold">Start the Conversation</a>
              <a href="#methodology" className="btn btn-outline text-cream" style={{ borderColor: 'var(--color-taupe)' }}>See the Methodology</a>
            </div>
          </div>
        </div>
        <div className="split-hero-img-wrapper">
          <img src={tamsinImage} alt="Tamsin Kaminski" className="split-hero-img ken-burns" />
        </div>
      </header>

      {/* Trust Strip */}
      <section className="bg-cream" style={{ padding: '80px 0' }}>
        <div className="container reveal text-center">
          <div className="section-label" style={{ marginBottom: '32px', textTransform: 'uppercase' }}>Companies that trust us</div>
          <div className="logo-strip-grid">
            <Hexagon size={32} /><Triangle size={32} /><Circle size={32} /><Square size={32} /><Star size={32} /><Diamond size={32} />
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="section bg-cream">
        <div className="container">
          <div style={{ maxWidth: '600px', marginBottom: '80px' }}>
            <SectionHeader label="The Diagnostic Approach" />
            <h2 className="h2-heading reveal">Transforming Friction Into Flow.</h2>
          </div>
          
          <div className="bento-grid">
            <div className="bg-offwhite hover-card reveal stagger-1" style={{ padding: '48px' }}>
              <Activity size={32} className="text-gold" style={{ marginBottom: '32px' }} />
              <h3 className="h3-heading">Diagnose</h3>
              <p className="body-text text-taupe">Map the silent roadblocks. We start with a comprehensive culture audit to uncover the hidden friction suppressing your growth.</p>
            </div>
            <div className="bg-charcoal text-cream hover-card reveal stagger-2" style={{ padding: '48px' }}>
              <Zap size={32} className="text-gold" style={{ marginBottom: '32px' }} />
              <h3 className="h3-heading">Design</h3>
              <p className="body-text" style={{ color: 'var(--color-taupe)' }}>Architect the environment. We engineer a bespoke blueprint that aligns your team's everyday actions with strategic vision.</p>
            </div>
            <div className="bg-offwhite hover-card reveal stagger-3" style={{ padding: '48px' }}>
              <RefreshCw size={32} className="text-gold" style={{ marginBottom: '32px' }} />
              <h3 className="h3-heading">Embed</h3>
              <p className="body-text text-taupe">Move from theory to practice. Implementation frameworks and executive coaching that ensure new culture is self-sustaining.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Results */}
      <section className="section bg-charcoal text-cream text-center">
        <div className="container">
          <div className="stats-grid">
            <StatCounter end={50} label="50+ Organisations Transformed" />
            <StatCounter end={94} label="94% Client Satisfaction" />
            <StatCounter end={90} label="90 Days to Measurable Impact" />
            <StatCounter end={3} label="3.2x Average ROI" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-cream">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto 120px', textAlign: 'center' }}>
            <div className="gold-rule" style={{ width: '40px', margin: '0 auto 48px' }}></div>
            <blockquote className="pull-quote" style={{ marginBottom: '32px' }}>
              “Tamsin completely revolutionized our leadership team's dynamic. Within six months, internal friction fell to zero, translating directly to our bottom line.”
            </blockquote>
            <div className="section-label">James Peterson — CEO, TechScale Solutions</div>
          </div>

          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="gold-rule" style={{ width: '40px', margin: '0 auto 48px' }}></div>
            <blockquote className="pull-quote" style={{ marginBottom: '32px' }}>
              “Culture is often dismissed as soft HR. The Corporate Culture Coach frames it as sharp commercial strategy. The only coaching engagement we’ve definitively tracked back to revenue.”
            </blockquote>
            <div className="section-label">Sarah Jenkins — Regional Director, NHS Trust</div>
          </div>
        </div>
      </section>

      {/* Services / Two Pathways */}
      <section id="services" className="section bg-charcoal text-cream">
        <div className="container">
          <div style={{ maxWidth: '600px', marginBottom: '80px' }}>
            <SectionHeader label="Executive Pathways" />
            <h2 className="h2-heading reveal">Two frameworks to scale culture.</h2>
          </div>

          <div style={{ display: 'grid', gap: '80px' }}>
            
            {/* Pathway 1: Corporate */}
            <div className="reveal">
              <h3 className="h3-heading" style={{ marginBottom: '16px', color: 'var(--color-cream)' }}>Corporate Culture Transformation</h3>
              <div className="gold-rule" style={{ width: '60px', marginBottom: '40px' }}></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
                <div className="hover-card" style={{ border: '1px solid rgba(120, 113, 108, 0.3)', padding: '40px' }}>
                  <div className="section-label text-gold" style={{ marginBottom: '16px' }}>01 / Strategic Architecture</div>
                  <p className="body-text text-taupe">A business scales safely only when implicit rules become explicit strategies. We audit your operational history and build essential frameworks.</p>
                </div>
                <div className="hover-card" style={{ border: '1px solid rgba(120, 113, 108, 0.3)', padding: '40px' }}>
                  <div className="section-label text-gold" style={{ marginBottom: '16px' }}>02 / Operational Alignment</div>
                  <p className="body-text text-taupe">Eradicate siloed working. When accountability is mapped clearly, your organisation begins to run with clockwork efficiency.</p>
                </div>
                <div className="hover-card" style={{ border: '1px solid rgba(120, 113, 108, 0.3)', padding: '40px' }}>
                  <div className="section-label text-gold" style={{ marginBottom: '16px' }}>03 / Revenue Unblocking</div>
                  <p className="body-text text-taupe">Growth is rarely linear. We diagnose the friction points in your economic engine and deploy solutions to reignite momentum.</p>
                </div>
                <div className="hover-card" style={{ border: '1px solid rgba(120, 113, 108, 0.3)', padding: '40px' }}>
                  <div className="section-label text-gold" style={{ marginBottom: '16px' }}>04 / Executive Mastery</div>
                  <p className="body-text text-taupe">Modern complexities require dynamic leadership. 1-2-1 and group executive coaching elevating operators to forward-thinking visionaries.</p>
                </div>
              </div>
            </div>

            {/* Pathway 2: SME */}
            <div className="reveal">
              <h3 className="h3-heading" style={{ marginBottom: '16px', color: 'var(--color-cream)' }}>SME Growth Accelerator</h3>
              <div className="gold-rule" style={{ width: '60px', marginBottom: '40px' }}></div>
              <div className="hover-card bg-cream" style={{ color: 'var(--color-charcoal)', padding: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                 <div>
                   <div className="section-label text-gold" style={{ marginBottom: '16px' }}>The 6-Month Mastermind</div>
                   <h4 className="h3-heading">Ambitious business coaching for revenues under £500,000.</h4>
                 </div>
                 <p className="body-text text-taupe" style={{ maxWidth: '800px' }}>
                   Delivered over six half-day intensive sessions and limited to 12 forward-thinking founders. By leveraging the core frameworks of the proven Tricres model, we systematically build a fitter, healthier business architecture spanning Culture, Strategy, and Economic Engines. Spread the investment over six months and accelerate to the next tier safely.
                 </p>
                 <div style={{ marginTop: '16px' }}>
                   <a href="mailto:hello@thecorporateculturecoach.co.uk" className="btn btn-gold">Inquire About Cohorts</a>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer id="contact" className="bg-cream text-center" style={{ paddingTop: '120px' }}>
        <div className="container reveal" style={{ paddingBottom: '120px' }}>
          <h2 className="h1-display" style={{ margin: '0 auto 48px', maxWidth: '800px' }}>Ready to make culture your competitive advantage?</h2>
          <a href="#contact" className="btn btn-gold" style={{ fontSize: '16px', padding: '24px 64px' }}>Start the Conversation</a>
        </div>

        {/* Real Footer */}
        <div className="bg-charcoal text-cream" style={{ padding: '64px 0 32px' }}>
          <div className="container">
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', textAlign: 'left', marginBottom: '80px' }}>
                <div style={{ gridColumn: '1 / -1', maxWidth: '300px' }}>
                  <img src={logoImage} alt="The Corporate Culture Coach Logo" style={{ height: '80px', width: 'auto', marginBottom: '24px', borderRadius: '4px' }} />
                  <p className="body-text" style={{ color: 'var(--color-taupe)' }}>The Corporate Culture Coach</p>
                </div>
                <div>
                  <div className="section-label" style={{ marginBottom: '24px', color: 'var(--color-taupe)' }}>Stay Connected</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px' }}><a href="mailto:hello@thecorporateculturecoach.co.uk" className="body-text" style={{ color: 'var(--color-cream)', textDecoration: 'none', fontSize: '14px' }}>Email</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="https://www.instagram.com/thecorporporateculturecoach/" className="body-text" style={{ color: 'var(--color-cream)', textDecoration: 'none', fontSize: '14px' }}>Instagram</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="https://www.facebook.com/profile.php?id=61576665399316" className="body-text" style={{ color: 'var(--color-cream)', textDecoration: 'none', fontSize: '14px' }}>Facebook</a></li>
                  </ul>
                </div>
                <div>
                  <div className="section-label" style={{ marginBottom: '24px', color: 'var(--color-taupe)' }}>Quick Links</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px' }}><a href="https://paperbell.me/thecorporateculturecoach" className="body-text" style={{ color: 'var(--color-cream)', textDecoration: 'none', fontSize: '14px' }}>Individual Coaching</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="https://app.paperbell.com/checkout/packages/164767" className="body-text" style={{ color: 'var(--color-cream)', textDecoration: 'none', fontSize: '14px' }}>Digital Downloads</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="https://app.paperbell.com/checkout/packages/157373" className="body-text" style={{ color: 'var(--color-cream)', textDecoration: 'none', fontSize: '14px' }}>Young Female Leadership</a></li>
                  </ul>
                </div>
                <div>
                   <div className="section-label" style={{ marginBottom: '24px', color: 'var(--color-taupe)' }}>Legal</div>
                   <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Privacy Policy</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Terms of Service</a></li>
                  </ul>
                </div>
             </div>
             <div className="section-label" style={{ textAlign: 'center', color: 'var(--color-taupe)', borderTop: '1px solid rgba(120,113,108,0.2)', paddingTop: '32px' }}>
               © {new Date().getFullYear()} The Corporate Culture Coach. All rights reserved.
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
