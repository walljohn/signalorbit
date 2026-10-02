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
      <div className="band-paper">
        <Process />
      </div>
      <div className="band-dark">
        <EmailDemo />
      </div>
      <div className="band-paper">
        <Services />
        <Offer />
        <Onboarding />
        <Faq />
      </div>
      <div className="band-dark">
        <ConsultationForm />
      </div>
    </>
  );
}
