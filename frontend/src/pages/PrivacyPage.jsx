function PrivacyPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 24px 100px', color: '#F3F0EA' }}>
      <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: '20px' }}>
        Privacy Policy
      </h1>
      <p style={{ fontFamily: "'Geist', system-ui, sans-serif", lineHeight: 1.8, color: '#CBD5E1', marginBottom: '24px' }}>
        Last updated: October 10, 2026
      </p>

      <section style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '28px', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", marginBottom: '12px' }}>1. Information we collect</h2>
        <p style={{ fontFamily: "'Geist', system-ui, sans-serif", lineHeight: 1.8, color: '#CBD5E1' }}>
          Tech&Tales may collect your name, email, phone number, business details, and inquiry information when you contact us or submit a form on the website.
        </p>
      </section>

      <section style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '28px', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", marginBottom: '12px' }}>2. How we use it</h2>
        <p style={{ fontFamily: "'Geist', system-ui, sans-serif", lineHeight: 1.8, color: '#CBD5E1' }}>
          We use this information to respond to inquiries, quote services, improve website experience, and measure website performance using analytics and advertising tools.
        </p>
      </section>

      <section style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '28px', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", marginBottom: '12px' }}>3. Analytics and cookies</h2>
        <p style={{ fontFamily: "'Geist', system-ui, sans-serif", lineHeight: 1.8, color: '#CBD5E1' }}>
          We may use tools like Google Analytics and Google Ads conversion tracking to understand traffic, engagement, and campaign performance. Cookies and similar technologies may be used for this purpose.
        </p>
      </section>

      <section style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '28px', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", marginBottom: '12px' }}>4. Contact</h2>
        <p style={{ fontFamily: "'Geist', system-ui, sans-serif", lineHeight: 1.8, color: '#CBD5E1' }}>
          If you have questions about this Privacy Policy, email us at techandtales.info@gmail.com.
        </p>
      </section>
    </main>
  )
}

export default PrivacyPage
