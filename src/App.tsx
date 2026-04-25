/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import VideoShowcase from './components/VideoShowcase';
import Problem from './components/Problem';
import Journey from './components/Journey';
import Benefits from './components/Benefits';
import MarqueeSection from './components/MarqueeSection';
import Instructor from './components/Instructor';
import GodfatherOffer from './components/GodfatherOffer';
import Rejection from './components/Rejection';
import Pricing from './components/Pricing';
import FinalWarning from './components/FinalWarning';
import PackageForm from './components/PackageForm';
import FAQ from './components/FAQ';
import FounderMessage from './components/FounderMessage';
import Footer from './components/Footer';
import FeedbackChallenge from './components/FeedbackChallenge';
import News from './components/News';
import VideoTestimonials from './components/VideoTestimonials';
import NotWhatItIs from './components/NotWhatItIs';
import UseCaseCompare from './components/UseCaseCompare';
import WhoIsThisFor from './components/WhoIsThisFor';
import Roadmap3Days from './components/Roadmap3Days';

const FEEDBACK_ALL = [
  { type: 'single' as const, image: 'slide-1.webp', raw: true },
  { type: 'single' as const, image: 'slide-2.webp', raw: true },
  { type: 'single' as const, image: 'slide-3.webp', raw: true },
  { type: 'single' as const, image: 'slide-4.webp', raw: true },
  { type: 'single' as const, image: 'slide-5.webp', raw: true },
  { type: 'single' as const, image: 'assp1.png', raw: true },
  { type: 'single' as const, image: 'assp2.png', raw: true },
  { type: 'single' as const, image: 'assp3.png', raw: true },
  { type: 'single' as const, image: 'fb1.jpg' },
  { type: 'single' as const, image: 'fb2.jpg' },
  { type: 'pair' as const, images: ['fb3.jpg', 'fb11.jpeg'] as [string, string] },
  { type: 'single' as const, image: 'fb27.jpeg' },
  { type: 'single' as const, image: 'fb10.png' },
  { type: 'single' as const, image: 'fb24.jpeg' },
  { type: 'single' as const, image: 'fb4.jpg' },
  { type: 'single' as const, image: 'fb5.jpg' },
  { type: 'single' as const, image: 'fb6.jpg' },
  { type: 'single' as const, image: 'fb7.jpg' },
  { type: 'single' as const, image: 'fb8.jpg' },
  { type: 'single' as const, image: 'fb26.jpeg' },
  { type: 'narrow' as const, image: 'fb23.jpeg' },
  { type: 'single' as const, image: 'fb29.jpeg' },
  { type: 'single' as const, image: 'fb35.png' },
  { type: 'single' as const, image: 'fb39.png' },
  { type: 'pair' as const, images: ['fb12.jpeg', 'fb18.jpeg'] as [string, string] },
  { type: 'single' as const, image: 'fb13.jpeg' },
  { type: 'single' as const, image: 'fb14.jpeg' },
  { type: 'single' as const, image: 'fb15.jpeg' },
  { type: 'single' as const, image: 'fb16.jpeg' },
  { type: 'single' as const, image: 'fb19.jpeg' },
  { type: 'single' as const, image: 'fb20.jpeg' },
  { type: 'single' as const, image: 'fb21.jpeg' },
];
import StickyCTA from './components/StickyCTA';
import MembershipBanner from './components/MembershipBanner';
import SectionNav from './components/SectionNav';
import VtvButton from './components/VtvButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-dark overflow-x-hidden">
      <MembershipBanner />
      <main>
        <Hero />
        <LogoMarquee />
        <FeedbackChallenge rows={FEEDBACK_ALL} initialVisible={10} />
        <VideoShowcase />
        <Problem />
        <Journey />
        <NotWhatItIs />
        <UseCaseCompare />
        <Benefits />
        <MarqueeSection bgColor="bg-white" />
        <Instructor />
        <MarqueeSection bgColor="bg-white" rows={1} itemBg="bg-[#e5e5e5]" itemColor="text-primary" />
        <GodfatherOffer />
        <MarqueeSection bgColor="bg-white" />
        <WhoIsThisFor />
        <Rejection />
        <VideoTestimonials />
        <Pricing />
        <MarqueeSection bgColor="bg-white" />
        <FinalWarning />
        <PackageForm />
        <Roadmap3Days />
        <FAQ />
        <FounderMessage />
        <News />
      </main>
      <StickyCTA />
      <SectionNav />
      <VtvButton />
      <Footer />
    </div>
  );
}
