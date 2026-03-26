'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogoCompact } from '@/components/Logo';
import { FormInput } from '@/components/FormInput';
import { supabase } from '@/lib/supabase';

export default function CourtPage() {
  const [formData, setFormData] = useState({
    court_name: '',
    contact_name: '',
    whatsapp: '',
    city: '',
    court_count: '',
    booking_methods: [] as string[],
    unfilled_rate: '',
    commission_acceptance: '',
    featured_interest: '',
    open_feedback: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.booking_methods.length === 0) {
      setErrorMessage('Please select at least one booking method.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const { error } = await supabase
      .from('court_signups')
      .insert([{
        court_name: formData.court_name,
        contact_name: formData.contact_name,
        whatsapp: formData.whatsapp,
        city: formData.city,
        court_count: formData.court_count,
        booking_methods: formData.booking_methods,
        unfilled_rate: formData.unfilled_rate,
        commission_acceptance: formData.commission_acceptance,
        featured_interest: formData.featured_interest,
        open_feedback: formData.open_feedback || null
      }]);

    if (error) {
      console.error(error);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-coal flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden transition-opacity duration-500 opacity-100">
        <div className="flex flex-col items-center text-center max-w-md mx-auto z-10">
          <h1 className="font-condensed font-black text-volt text-[56px] leading-tight uppercase tracking-[2px] mb-4">
            YOU&apos;RE IN.
          </h1>
          <p className="font-sans font-normal text-chalk text-[16px] mb-12">
            We&apos;ll reach out when Padel Eleven launches in your city.
          </p>
          <Link href="/" className="font-sans font-medium text-plasma hover:opacity-80 transition-opacity">
            ← Back to padelelevn.com
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-coal flex flex-col items-center p-6 sm:p-12">
      <div className="w-full max-w-[560px] flex items-center mb-12 mt-4 sm:mt-8 gap-4">
        <Link href="/" className="text-chalk hover:opacity-80 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </Link>
        <div className="w-[1px] h-6 bg-[#333]"></div>
        <LogoCompact />
      </div>

      <div className="w-full max-w-[560px] flex flex-col mb-10">
        <h1 className="font-condensed font-extrabold text-chalk text-[48px] leading-[1] uppercase tracking-[2px] mb-4">
          LIST YOUR COURT
        </h1>
        <p className="font-sans font-normal text-[#666] text-[16px]">
          Free to list. No upfront fees. We send you players and handle payment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-[560px] flex flex-col">
        <FormInput 
          type="text" name="court_name" label="1. Court / facility name" required 
          value={formData.court_name} onChange={(e) => handleChange('court_name', e.target.value)} 
        />
        <FormInput 
          type="text" name="contact_name" label="2. Owner / manager name" required 
          value={formData.contact_name} onChange={(e) => handleChange('contact_name', e.target.value)} 
        />
        <FormInput 
          type="tel" name="whatsapp" label="3. WhatsApp number" required 
          value={formData.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} 
        />
        <FormInput 
          type="select" name="city" label="4. City" required 
          options={['Lahore', 'Karachi', 'Islamabad', 'Other']}
          value={formData.city} onChange={(e) => handleChange('city', e.target.value)} 
        />
        <FormInput 
          type="select" name="court_count" label="5. How many courts does your facility have?" required 
          options={['1', '2', '3', '4', '5+']}
          value={formData.court_count} onChange={(e) => handleChange('court_count', e.target.value)} 
        />
        <FormInput 
          type="checkbox" name="booking_methods" label="6. How do you currently manage bookings?" required 
          options={['WhatsApp only', 'Phone calls', 'Walk-ins', 'Playtomic', 'Other app or software']}
          value={formData.booking_methods} onChange={(val) => handleChange('booking_methods', val)} 
        />
        <FormInput 
          type="select" name="unfilled_rate" label="7. Roughly what percentage of your time slots go unfilled each week?" required 
          options={['Less than 10%', '10–25%', '25–50%', 'More than 50%', 'Not sure']}
          value={formData.unfilled_rate} onChange={(e) => handleChange('unfilled_rate', e.target.value)} 
        />
        <FormInput 
          type="radio" name="commission_acceptance" label="8. Padel Eleven takes 10% of bookings processed through the app. Courts receive 90%, automatically. Is this acceptable?" required 
          options={['Yes', 'Need to discuss', 'No']}
          value={formData.commission_acceptance} onChange={(val) => handleChange('commission_acceptance', val)} 
        />
        <FormInput 
          type="radio" name="featured_interest" label="9. Would you pay a flat monthly fee for featured placement at the top of search results?" required 
          options={['Yes, interested', 'Maybe', 'No']}
          value={formData.featured_interest} onChange={(val) => handleChange('featured_interest', val)} 
        />
        <FormInput 
          type="textarea" name="open_feedback" label="10. Anything else?" 
          value={formData.open_feedback} onChange={(e) => handleChange('open_feedback', e.target.value)} 
        />

        <div className="mt-8 mb-16">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center h-[42px] px-6 rounded-lg bg-volt text-coal font-condensed font-bold text-[16px] uppercase tracking-[2px] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === 'loading' ? 'SUBMITTING...' : 'REGISTER YOUR COURT'}
          </button>
          {status === 'error' && (
            <p className="mt-4 text-plasma font-sans text-sm text-center">{errorMessage}</p>
          )}
        </div>
      </form>
    </main>
  );
}
