'use client';

import { useMemo, useRef, useState } from 'react';

type Service = {
  id: string;
  category: 'social' | 'website';
  type?: 'setup' | 'monthly';
  badge: string;
  title: string;
  description: string;
  price: number;
  priceSuffix: string;
  features: string[];
  featured?: boolean;
  media?: string;
};

type EstimateItem = {
  id: string;
  label: string;
  detail: string;
  price: number;
  checked: boolean;
};

const formatLKR = (value: number) => `LKR ${Number(value).toLocaleString('en-LK')}`;

const today = new Intl.DateTimeFormat('en-LK', {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
}).format(new Date());

const socialServices: Service[] = [
  {
    id: 'social-management',
    category: 'social',
    badge: 'Recommended',
    title: 'Social Media Management',
    description: 'A balanced monthly content package for SMEs that want both static visuals and short-form video presence.',
    price: 50000,
    priceSuffix: '/ month',
    featured: true,
    media: '/media/social-media.webp',
    features: ['4 creative image posts', '2 short-form reels', 'Ideal for Instagram, Facebook and LinkedIn', 'Basic content direction included']
  },
  {
    id: 'posts-only',
    category: 'social',
    badge: 'Static Content',
    title: 'Posts-Only Package',
    description: 'For businesses that need branded social media graphics without reels or full monthly handling.',
    price: 35000,
    priceSuffix: '/ month',
    media: '/media/poster-package.webp',
    features: ['5 social media posts', 'Branded visual direction', 'Suitable for announcements and promotions', 'Clean SME-friendly presentation']
  },
  {
    id: 'reels-only',
    category: 'social',
    badge: 'Video Focus',
    title: 'Reels-Only Package',
    description: 'A short-form video package designed for reach, attention and platform-native content discovery.',
    price: 50000,
    priceSuffix: '/ month',
    media: '/media/reels-package.webp',
    features: ['5 short-form reels', 'Best for Instagram Reels, TikTok and Shorts', 'Hook-led content structure', 'Strong visibility-driven format']
  }
];

const websiteServices: Service[] = [
  {
    id: 'static-website',
    category: 'website',
    type: 'setup',
    badge: 'Starter Website',
    title: '3-Page Static Website + Basic SEO',
    description: 'A clean, simple business website for SMEs that need to look professional online quickly.',
    price: 75000,
    priceSuffix: 'Upwards',
    media: '/media/static-website.webp',
    features: ['Home, About and Contact/Service page', 'Basic SEO setup', 'Mobile responsive layout', 'Suitable for new SMEs']
  },
  {
    id: 'advanced-website',
    category: 'website',
    type: 'setup',
    badge: 'Growth Website',
    title: 'Website + Advanced SEO + Speed + Security',
    description: 'A stronger website package for businesses that need visibility, performance and improved technical confidence.',
    price: 150000,
    priceSuffix: 'Upwards',
    featured: true,
    media: '/media/advanced-website.webp',
    features: ['Website setup or improvement', 'Advanced SEO implementation', 'Speed optimisation', 'Basic security setup']
  },
  {
    id: 'maintenance',
    category: 'website',
    type: 'monthly',
    badge: 'Monthly Care',
    title: 'Website Maintenance',
    description: 'Monthly support for SMEs that need their website kept updated, stable and technically monitored.',
    price: 50000,
    priceSuffix: '/ month',
    media: '/media/maintenance.webp',
    features: ['Content updates', 'Plugin/theme update checks', 'Speed and security monitoring', 'Ongoing technical support']
  }
];

const initialEstimateItems: EstimateItem[] = [
  { id: 'social-management', label: 'Social Media Management', detail: '4 images + 2 reels', price: 50000, checked: true },
  { id: 'posts-only', label: 'Posts-Only Package', detail: '5 social media posts', price: 35000, checked: false },
  { id: 'reels-only', label: 'Reels-Only Package', detail: '5 reels', price: 50000, checked: false },
  { id: 'static-website', label: '3-Page Static Website + Basic SEO', detail: 'Basic SEO included', price: 75000, checked: false },
  { id: 'advanced-website', label: 'Advanced Website Package', detail: 'SEO + speed + security', price: 150000, checked: true },
  { id: 'maintenance', label: 'Website Maintenance', detail: 'Monthly website support', price: 50000, checked: true }
];

const mediaHighlights = [
  {
    title: 'Content that builds visibility',
    text: 'Receive professionally designed social media posts, promotional creatives and short-form reel concepts tailored to your brand.',
    image: '/media/content-showcase.webp'
  },
  {
    title: 'Website & SEO Support',
    text: 'Get a clean business website, improved SEO setup, faster loading speed and basic security support for stronger online credibility.',
    image: '/media/advanced-website.webp'
  },
  {
    title: 'Digital Growth',
    text: 'Build a consistent social media presence that helps your business stay visible, trusted and competitive in your industry.',
    image: '/media/social-media.webp'
  }
];

function ServiceCard({ service, selected, onSelect }: { service: Service; selected: boolean; onSelect: (id: string) => void }) {
  return (
    <article className={`price-card ${service.featured ? 'featured' : ''} ${selected ? 'selected' : ''}`} onClick={() => onSelect(service.id)}>
      <div className="media-frame small-media">
        <img src={service.media} alt="" aria-hidden="true" />
      </div>
      <div className="badge">{service.badge}</div>
      <h3>{service.title}</h3>
      <p className="desc">{service.description}</p>
      <div className="price"><strong>{formatLKR(service.price)}</strong><span>{service.priceSuffix}</span></div>

{service.category === 'social' && (
  <div className="boosting-note">
    <span className="boosting-icon">!</span>
    <span>
      <strong>Boosting not included</strong>
      <small>Paid advertising and media spend are charged separately.</small>
    </span>
  </div>
)}
      <ul className="features">
        {service.features.map((feature) => (
          <li key={feature}><span className="check">✓</span>{feature}</li>
        ))}
      </ul>
      <button className="card-action" type="button">{selected ? 'Selected' : service.category === 'social' ? 'Select Package' : 'Select Service'}</button>
    </article>
  );
}

export default function Page() {
  const pageRef = useRef<HTMLElement | null>(null);
  const [selectedSocial, setSelectedSocial] = useState('social-management');
  const [selectedWebsite, setSelectedWebsite] = useState('advanced-website');
  const [websiteFilter, setWebsiteFilter] = useState<'all' | 'monthly'>('all');
  const [estimateItems, setEstimateItems] = useState(initialEstimateItems);
  const [clientName, setClientName] = useState('');
  const [toast, setToast] = useState('');
  const [isPdfBusy, setIsPdfBusy] = useState(false);

  const selectedEstimate = useMemo(() => estimateItems.filter((item) => item.checked), [estimateItems]);
  const estimateTotal = useMemo(() => selectedEstimate.reduce((sum, item) => sum + item.price, 0), [selectedEstimate]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2000);
  };

  const toggleEstimateItem = (id: string) => {
    setEstimateItems((items) => items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const downloadEstimatePdf = async () => {
    setIsPdfBusy(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const margin = 16;
      let y = 18;

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 45, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Communica Solutions', margin, y);
      y += 8;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('SME Digital Package Estimate', margin, y);
      y += 7;
      doc.setTextColor(203, 213, 225);
      doc.text(`Date: ${today}`, margin, y);
      y += 8;
      if (clientName.trim()) {
        doc.text(`Prepared for: ${clientName.trim()}`, margin, y);
      }

      y = 58;
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Selected Services', margin, y);
      y += 9;

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      selectedEstimate.forEach((item, index) => {
        doc.setFillColor(index % 2 === 0 ? 248 : 255, index % 2 === 0 ? 250 : 255, index % 2 === 0 ? 252 : 255);
        doc.roundedRect(margin, y - 5, 178, 16, 2, 2, 'F');
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.text(item.label, margin + 4, y + 1);
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.text(item.detail, margin + 4, y + 6);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.text(formatLKR(item.price), 194, y + 1, { align: 'right' });
        y += 18;
      });

      y += 4;
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(margin, y, 178, 22, 3, 3, 'F');
      doc.setTextColor(203, 213, 225);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Estimated Total', margin + 6, y + 8);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(formatLKR(estimateTotal), 194, y + 14, { align: 'right' });

      y += 36;
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const note = 'Final pricing can be adjusted depending on number of pages, content volume, video complexity, ad boosting, photography, and urgency.';
      doc.text(doc.splitTextToSize(note, 178), margin, y);

      y += 18;
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y, 194, y);
      y += 9;
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.text('Contact', margin, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text('info@communicasolutions.com | communicasolutions.com | +94 77 761 4719', margin, y);

      doc.save(`SME-Digital-Estimate-${clientName.trim() || 'Client'}.pdf`);
      showToast('Estimate PDF downloaded');
    } catch (error) {
      console.error(error);
      showToast('PDF export failed');
    } finally {
      setIsPdfBusy(false);
    }
  };

  const downloadFullPagePdf = async () => {
    const target = pageRef.current;
    if (!target) return;

    setIsPdfBusy(true);
    const previousFilter = websiteFilter;
    setWebsiteFilter('all');

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 120));
      document.body.classList.add('pdf-mode');

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      const canvas = await html2canvas(target, {
        scale: Math.min(2, window.devicePixelRatio || 1.5),
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#020617',
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Communica-Solutions-SME-Digital-Package-Full-Page.pdf');
      showToast('Full page PDF downloaded');
    } catch (error) {
      console.error(error);
      showToast('Full page PDF failed');
    } finally {
      document.body.classList.remove('pdf-mode');
      setWebsiteFilter(previousFilter);
      setIsPdfBusy(false);
    }
  };

  const filteredWebsiteServices = websiteFilter === 'monthly'
    ? websiteServices.filter((service) => service.type === 'monthly')
    : websiteServices;

  return (
    <main className="page" ref={pageRef}>
      <nav className="nav hide-in-pdf" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="SME Digital Media Package home">
          <div className="logo">C</div>
          <div className="brand-text">
            <strong>Communica Solutions</strong>
            <span>SME Digital Media Packages</span>
          </div>
        </a>

        <div className="nav-links">
          <a href="#social">Social Media</a>
          <a href="#website">Website</a>
          <a href="#combo">Combo Pack</a>
          <a href="#media">Media</a>
        </div>

        <button className="nav-cta" type="button" onClick={downloadFullPagePdf} disabled={isPdfBusy}>
          {isPdfBusy ? 'Preparing PDF…' : 'Download Full Page PDF'}
        </button>
      </nav>

      <section className="hero" id="top">
        <div>
          <div className="eyebrow"><span className="pulse"></span> SME-ready digital growth packages</div>
          <h1><span className="gradient-text">Simple pricing.</span><br />Stronger digital presence.</h1>
          <p>
            A clean interactive price guide for SMEs that need practical social media content, professional website support,
            SEO setup, speed optimisation, security improvements and monthly maintenance.
          </p>
          <div className="hero-actions hide-in-pdf">
            <a className="btn btn-primary" href="#combo">Build Estimate</a>
            <a className="btn btn-secondary" href="#social">Compare Services</a>
            <button className="btn btn-secondary" type="button" onClick={downloadFullPagePdf} disabled={isPdfBusy}>Download Page PDF</button>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Digital package summary">
          <div className="dashboard">
            <div className="dash-top">
              <div>
                <span>Starting from</span>
                <strong>LKR 35,000</strong>
              </div>
              <div className="status-pill">SME Friendly</div>
            </div>

            <div className="media-frame hero-media">
              <img src="/media/hero-showcase.webp" alt="SME digital package dashboard preview" />
            </div>

            <div className="mini-grid">
              <div className="metric"><small>Posts Package</small><b>5</b><div className="bar"><i style={{ '--w': '78%' } as React.CSSProperties}></i></div></div>
              <div className="metric"><small>Reels Package</small><b>5</b><div className="bar"><i style={{ '--w': '70%' } as React.CSSProperties}></i></div></div>
              <div className="metric"><small>Static Website</small><b>3 Pages</b><div className="bar"><i style={{ '--w': '64%' } as React.CSSProperties}></i></div></div>
              <div className="metric"><small>Maintenance</small><b>Monthly</b><div className="bar"><i style={{ '--w': '85%' } as React.CSSProperties}></i></div></div>
            </div>
          </div>
        </aside>
      </section>

      <section className="section" id="social">
        <div className="section-header">
          <div>
            <div className="section-kicker">Price Guide 01</div>
            <h2>Social Media Services</h2>
          </div>
          <p>Choose between monthly management, posts-only content or reels-only content depending on the client’s immediate visibility goal.</p>
        </div>

        <div className="price-grid">
          {socialServices.map((service) => (
            <ServiceCard key={service.id} service={service} selected={selectedSocial === service.id} onSelect={setSelectedSocial} />
          ))}
        </div>
      </section>

      <section className="section" id="website">
        <div className="section-header">
          <div>
            <div className="section-kicker">Price Guide 02</div>
            <h2>Website & SEO Services</h2>
          </div>
          <p>Website packages for SMEs that need a credible web presence, better search setup, stronger performance and ongoing technical support.</p>
        </div>

        <div className="toggle-wrap hide-in-pdf" aria-label="Website package filter">
          <button className={`tab-btn ${websiteFilter === 'all' ? 'active' : ''}`} onClick={() => setWebsiteFilter('all')} type="button">All Website Services</button>
          <button className={`tab-btn ${websiteFilter === 'monthly' ? 'active' : ''}`} onClick={() => setWebsiteFilter('monthly')} type="button">Monthly Support</button>
        </div>

        <div className="price-grid website-grid">
          {filteredWebsiteServices.map((service) => (
            <ServiceCard key={service.id} service={service} selected={selectedWebsite === service.id} onSelect={setSelectedWebsite} />
          ))}
        </div>
      </section>

      <section className="section" id="combo">
        <div className="section-header">
          <div>
            <div className="section-kicker">Combo Service</div>
            <h2>SME Digital Growth Combo Pack</h2>
          </div>
          <p>A complete starter-to-growth service combining website improvement, social content and monthly maintenance support.</p>
        </div>

        <div className="combo-area">
          <article className="combo-card">
            <div className="badge">Best Value Combo</div>
            <h3>SME Digital Growth Combo</h3>
            <p>For SMEs that want one practical package covering website presence, SEO strength, content visibility and basic ongoing website care.</p>

            <div className="media-frame combo-media">
              <img src="/media/combo-showcase.webp" alt="Digital growth combo visual" />
            </div>

            <div className="combo-price">
              <small>Package Price</small>
              <strong>LKR 250,000</strong>
              <span>one-off project + first month support</span>
            </div>

            <ul className="combo-list">
              <li><span className="check">✓</span>Website + Advanced SEO + Speed + Security — LKR 150,000</li>
              <li><span className="check">✓</span>Social Media Management — LKR 50,000</li>
              <li><span className="check">✓</span>Website Maintenance, first month — LKR 50,000</li>
            </ul>
          </article>

          <aside className="builder" aria-label="Package estimator">
            <h3>Interactive Package Estimator</h3>
            <p>Select services to calculate a custom SME package estimate. Then download it as a clean client-ready PDF.</p>

            <label className="client-field hide-in-pdf">
              <span>Client name / business name</span>
              <input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Example: ABC Holdings" />
            </label>

            <div className="option-list">
              {estimateItems.map((item) => (
                <label className="option" key={item.id}>
                  <span className="option-left">
                    <input type="checkbox" checked={item.checked} onChange={() => toggleEstimateItem(item.id)} />
                    <span><strong>{item.label}</strong><span>{item.detail}</span></span>
                  </span>
                  <span className="option-price">{formatLKR(item.price).replace('LKR ', '')}</span>
                </label>
              ))}
            </div>

            <div className="total-box">
              <div>
                <span>Estimated Total</span>
                <strong>{formatLKR(estimateTotal)}</strong>
              </div>
              <button className="copy-btn hide-in-pdf" onClick={downloadEstimatePdf} disabled={isPdfBusy} type="button">
                {isPdfBusy ? 'Preparing…' : 'Download Estimate PDF'}
              </button>
            </div>

            <p className="note">Final pricing can be adjusted depending on number of pages, content volume, video complexity, ad boosting, photography, and urgency.</p>
          </aside>
        </div>
      </section>

      <section className="section" id="media">
        <div className="section-header">
          <div>
            <div className="section-kicker">Media Area</div>
            <h2>See how your brand can look online</h2>
          </div>
          
        </div>

        <div className="media-grid">
          {mediaHighlights.map((item) => (
            <article className="media-card" key={item.title}>
              <div className="media-frame wide-media"><img src={item.image} alt="" aria-hidden="true" /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-panel" id="contact">
        <div>
          <h2>Looking for the right media solution for your brand?</h2>
          <p>Explore our platform network, content opportunities and visibility options designed to connect brands with relevant audiences across Sri Lanka.</p>
          <p>For partnerships, media collaborations and customised proposals, speak with our team.</p>
          <div className="contact-line">info@communicasolutions.com · communicasolutions.com · +94 77 761 4719</div>
        </div>
        <div className="cta-actions hide-in-pdf">
          <a className="btn btn-primary" href="mailto:info@communicasolutions.com?subject=SME%20Digital%20Media%20Package%20Enquiry">Email Us</a>
          <button className="btn btn-secondary" type="button" onClick={downloadFullPagePdf} disabled={isPdfBusy}>Download Full PDF</button>
        </div>
      </section>

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </main>
  );
}
