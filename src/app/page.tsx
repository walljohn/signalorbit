import { Hero } from "@/components/hero/Hero";
import { Process } from "@/components/Process";
import { EmailDemo } from "@/components/EmailDemo";
import { Services } from "@/components/Services";
import { Offer } from "@/components/Offer";
import { Onboarding } from "@/components/Onboarding";
import { Faq } from "@/components/Faq";
import { ConsultationForm } from "@/components/ConsultationForm";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Uneven band rhythm: paper → dark demo → panel services → paper offer/onboard → ink FAQ stripe → dark form */}
      <div className="band-paper">
        <Process />
      </div>
      <div className="band-dark">
        <EmailDemo />
      </div>
      <div className="band-panel">
        <Services />
      </div>
      <div className="band-paper">
        <Offer />
        <Onboarding />
      </div>
      <div className="band-paper border-t border-[var(--edge-light)]">
        <Faq />
      </div>
      <div className="band-dark">
        <ConsultationForm />
      </div>
    </>
  );
}
