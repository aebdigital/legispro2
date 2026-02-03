import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return (
        <main>
            {/* Hero Section */}
            <section className="service-hero fade-in-up">
                <div className="service-hero-background">
                    <img src="/sources/images/contact-office-1.jpg" alt="Contact - LegisPro" />
                </div>
                <div className="service-hero-overlay"></div>
                <div className="container">
                    <div className="service-hero-content">
                        <h1>{dictionary.contact.title}</h1>
                        <p>{dictionary.contact.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-form fade-in-up" id="contact-info">
                <div className="container">
                    <div className="contact-wrapper">
                        {/* Contact Information */}
                        <div className="contact-info-wrapper">
                            <h2>{dictionary.contact.officeInfo}</h2>
                            <div className="info-items-grid">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>{dictionary.contact.email}</h4>
                                        <p><a href="mailto:office@legispro.sk">office@legispro.sk</a></p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>{dictionary.contact.phone}</h4>
                                        <p><a href="tel:+421948528265">+421 948 528 265</a></p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>{dictionary.contact.address}</h4>
                                        <p>Sládkovičova 1<br />949 01 Nitra</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>{dictionary.contact.hours}</h4>
                                        <p>{dictionary.contact.hoursDetail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-main" id="contact-form">
                            <h2>{dictionary.contact.formTitle}</h2>
                            <form id="contactForm">
                                <div className="form-row">
                                    <input type="text" name="name" placeholder={dictionary.contact.form.name} required />
                                    <input type="email" name="email" placeholder={dictionary.contact.form.email} required />
                                </div>
                                <div className="form-row">
                                    <input type="tel" name="phone" placeholder={dictionary.contact.form.phone} />
                                    <select name="service">
                                        <option value="">{dictionary.contact.form.service}</option>
                                        <option value="startup">{dictionary.contact.form.options.startup}</option>
                                        <option value="gdpr">{dictionary.contact.form.options.gdpr}</option>
                                        <option value="optimization">{dictionary.contact.form.options.optimization}</option>
                                        <option value="duediligence">{dictionary.contact.form.options.duediligence}</option>
                                        <option value="commercial">{dictionary.contact.form.options.commercial}</option>
                                        <option value="tax">{dictionary.contact.form.options.tax}</option>
                                        <option value="ecommerce">{dictionary.contact.form.options.ecommerce}</option>
                                        <option value="reality">{dictionary.contact.form.options.reality}</option>
                                        <option value="litigation">{dictionary.contact.form.options.litigation}</option>
                                        <option value="criminal">{dictionary.contact.form.options.criminal}</option>
                                    </select>
                                </div>
                                <textarea name="message" placeholder={dictionary.contact.form.message} required></textarea>
                                <button type="submit" className="btn btn-dark">{dictionary.contact.form.submit}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
