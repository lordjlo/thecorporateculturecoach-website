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
            <div className="gold-rule-wrapper text-cream" style={{ marginBottom: '24px' }}>
              <div className="section-label">Tamsin Kaminski</div>
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
          <div className="section-label" style={{ marginBottom: '32px' }}>Trusted By Forward-Thinking Organisations</div>
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

      {/* Services */}
      <section className="section bg-charcoal text-cream">
        <div className="container">
          <div style={{ maxWidth: '600px', marginBottom: '80px' }}>
            <SectionHeader label="Ways of Working" />
            <h2 className="h2-heading reveal">Architected For Impact.</h2>
          </div>

          <div className="services-grid">
            {/* 1 */}
            <div className="hover-card reveal stagger-1" style={{ border: '1px solid var(--color-taupe)', padding: '48px', borderColor: 'rgba(120, 113, 108, 0.3)' }}>
              <div className="section-label text-gold" style={{ marginBottom: '16px' }}>01 / Discovery</div>
              <h3 className="h3-heading" style={{ marginBottom: '24px' }}>Diagnose the gap in a single intensive session</h3>
              <p className="body-text" style={{ color: 'var(--color-taupe)', marginBottom: '48px' }}>
                A high-impact executive workshop to surface immediate structural pressures and map foundational alignment.
              </p>
              <a href="#contact" className="btn btn-outline text-cream" style={{ width: '100%' }}>Start the Conversation</a>
            </div>

            {/* 2 */}
            <div className="hover-card reveal stagger-2 bg-cream" style={{ padding: '48px', color: 'var(--color-charcoal)' }}>
               <div className="section-label text-gold" style={{ marginBottom: '16px' }}>02 / Transformation Programme</div>
              <h3 className="h3-heading" style={{ marginBottom: '24px', color: 'var(--color-charcoal)' }}>A 12-week embedded culture redesign</h3>
              <p className="body-text text-taupe" style={{ marginBottom: '48px' }}>
                Deep-dive stakeholder interviews, custom implementation roadmaps, and psychometric profiling to rebuild your operational rhythm.
              </p>
              <a href="#contact" className="btn btn-gold" style={{ width: '100%' }}>Start the Conversation</a>
            </div>

            {/* 3 */}
            <div className="hover-card reveal stagger-3" style={{ border: '1px solid var(--color-taupe)', padding: '48px', borderColor: 'rgba(120, 113, 108, 0.3)' }}>
               <div className="section-label text-gold" style={{ marginBottom: '16px' }}>03 / Strategic Retainer</div>
              <h3 className="h3-heading" style={{ marginBottom: '24px' }}>Ongoing advisory for leaders scaling culture</h3>
              <p className="body-text" style={{ color: 'var(--color-taupe)', marginBottom: '48px' }}>
                Continuous review iterations, on-call executive sparring, and behavioral mapping as you navigate hyper-growth.
              </p>
              <a href="#contact" className="btn btn-outline text-cream" style={{ width: '100%' }}>Start the Conversation</a>
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
                  <img src={logoImage} alt="The Corporate Culture Coach Logo" style={{ height: '40px', marginBottom: '24px', filter: 'brightness(0) invert(1)' }} />
                  <p className="body-text" style={{ color: 'var(--color-taupe)' }}>The Corporate Culture Coach</p>
                </div>
                <div>
                  <div className="section-label" style={{ marginBottom: '24px', color: 'var(--color-taupe)' }}>Services</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Discovery</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Transformation</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Retainer</a></li>
                  </ul>
                </div>
                <div>
                  <div className="section-label" style={{ marginBottom: '24px', color: 'var(--color-taupe)' }}>Company</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>About Tamsin</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Methodology</a></li>
                    <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Contact</a></li>
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
