'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogoCompact } from '@/components/Logo';
import { FormInput } from '@/components/FormInput';
import { supabase } from '@/lib/supabase';

export default function PlayerPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    whatsapp: '',
    city: '',
    play_frequency: '',
    booking_methods: [] as string[],
    used_playtomic: '',
    finding_players: '',
    matchmaking_interest: '',
    premium_willingness: '',
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
      .from('player_signups')
      .insert([{
        full_name: formData.full_name,
        whatsapp: formData.whatsapp,
        city: formData.city,
        play_frequency: formData.play_frequency,
        booking_methods: formData.booking_methods,
        used_playtomic: formData.used_playtomic === 'Yes',
        finding_players: formData.finding_players,
        matchmaking_interest: parseInt(formData.matchmaking_interest, 10),
        premium_willingness: formData.premium_willingness,
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
          JOIN THE WAITLIST
        </h1>
        <p className="font-sans font-normal text-[#666] text-[16px]">
          We&apos;re building the matchmaking layer Pakistan&apos;s padel scene is missing. Tell us about how you play.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-[560px] flex flex-col">
        <FormInput 
          type="text" name="full_name" label="1. Full name" required 
          value={formData.full_name} onChange={(e) => handleChange('full_name', e.target.value)} 
        />
        <FormInput 
          type="tel" name="whatsapp" label="2. WhatsApp number" placeholder="+92 3XX XXXXXXX" required 
          value={formData.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} 
        />
        <FormInput 
          type="select" name="city" label="3. City" required 
          options={['Lahore', 'Karachi', 'Islamabad', 'Other']}
          value={formData.city} onChange={(e) => handleChange('city', e.target.value)} 
        />
        <FormInput 
          type="select" name="play_frequency" label="4. How often do you play padel?" required 
          options={['A few times a week', 'Once a week', 'A few times a month', 'Occasionally']}
          value={formData.play_frequency} onChange={(e) => handleChange('play_frequency', e.target.value)} 
        />
        <FormInput 
          type="checkbox" name="booking_methods" label="5. How do you currently find courts and book?" required 
          options={['WhatsApp groups', 'Calling the court directly', 'Playtomic', 'Through friends only']}
          value={formData.booking_methods} onChange={(val) => handleChange('booking_methods', val)} 
        />
        <FormInput 
          type="radio" name="used_playtomic" label="6. Have you used Playtomic?" required 
          options={['Yes', 'No']}
          value={formData.used_playtomic} onChange={(val) => handleChange('used_playtomic', val)} 
        />
        <FormInput 
          type="select" name="finding_players" label="7. How do you currently find players to play with?" required 
          options={['My own network only', 'WhatsApp groups', 'I struggle to find players', 'Mix of the above']}
          value={formData.finding_players} onChange={(e) => handleChange('finding_players', e.target.value)} 
        />
        <FormInput 
          type="radio-scale" name="matchmaking_interest" label="8. How interested are you in skill-based matchmaking?" required 
          minLabel="Not interested" maxLabel="Very interested"
          value={formData.matchmaking_interest} onChange={(val) => handleChange('matchmaking_interest', val)} 
        />
        <FormInput 
          type="radio" name="premium_willingness" label="9. Would you pay for a premium tier with advanced stats and priority matching?" required 
          options={['Yes, definitely', 'Maybe, depends on price', 'Probably not', 'No']}
          value={formData.premium_willingness} onChange={(val) => handleChange('premium_willingness', val)} 
        />
        <FormInput 
          type="textarea" name="open_feedback" label="10. Anything else you want us to know?" placeholder="Open feedback..." 
          value={formData.open_feedback} onChange={(e) => handleChange('open_feedback', e.target.value)} 
        />

        <div className="mt-8 mb-16">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center h-[42px] px-6 rounded-lg bg-volt text-coal font-condensed font-bold text-[16px] uppercase tracking-[2px] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === 'loading' ? 'SUBMITTING...' : 'REGISTER INTEREST'}
          </button>
          {status === 'error' && (
            <p className="mt-4 text-plasma font-sans text-sm text-center">{errorMessage}</p>
          )}
        </div>
      </form>
    </main>
  );
}
