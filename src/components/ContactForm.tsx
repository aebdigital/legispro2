'use client';

import { useState, FormEvent } from 'react';

interface ContactFormProps {
    dictionary: {
        form: {
            name: string;
            email: string;
            phone: string;
            service: string;
            message: string;
            submit: string;
            options: {
                startup: string;
                gdpr: string;
                optimization: string;
                duediligence: string;
                commercial: string;
                tax: string;
                ecommerce: string;
                reality: string;
                litigation: string;
                criminal: string;
            };
        };
        success?: string;
        error?: string;
    };
}

export default function ContactForm({ dictionary }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'Nastala chyba pri odosielaní formulára.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setErrorMessage('Nastala chyba pri odosielaní formulára. Skúste to prosím neskôr.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form id="contactForm" onSubmit={handleSubmit}>
            {submitStatus === 'success' && (
                <div className="form-message success">
                    {dictionary.success || 'Ďakujeme! Vaša správa bola úspešne odoslaná. Ozveme sa vám čo najskôr.'}
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="form-message error">
                    {errorMessage || dictionary.error || 'Nastala chyba pri odosielaní formulára.'}
                </div>
            )}

            <div className="form-row">
                <input
                    type="text"
                    name="name"
                    placeholder={dictionary.form.name}
                    required
                    disabled={isSubmitting}
                />
                <input
                    type="email"
                    name="email"
                    placeholder={dictionary.form.email}
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="form-row">
                <input
                    type="tel"
                    name="phone"
                    placeholder={dictionary.form.phone}
                    disabled={isSubmitting}
                />
                <select name="service" disabled={isSubmitting}>
                    <option value="">{dictionary.form.service}</option>
                    <option value="startup">{dictionary.form.options.startup}</option>
                    <option value="gdpr">{dictionary.form.options.gdpr}</option>
                    <option value="optimization">{dictionary.form.options.optimization}</option>
                    <option value="duediligence">{dictionary.form.options.duediligence}</option>
                    <option value="commercial">{dictionary.form.options.commercial}</option>
                    <option value="tax">{dictionary.form.options.tax}</option>
                    <option value="ecommerce">{dictionary.form.options.ecommerce}</option>
                    <option value="reality">{dictionary.form.options.reality}</option>
                    <option value="litigation">{dictionary.form.options.litigation}</option>
                    <option value="criminal">{dictionary.form.options.criminal}</option>
                </select>
            </div>
            <textarea
                name="message"
                placeholder={dictionary.form.message}
                required
                disabled={isSubmitting}
            ></textarea>
            <button
                type="submit"
                className="btn btn-dark"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Odosiela sa...' : dictionary.form.submit}
            </button>
        </form>
    );
}
