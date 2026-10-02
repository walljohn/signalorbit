import { Hero } from "@/components/hero/Hero";
import { Process } from "@/components/Process";
import { EmailDemo } from "@/components/EmailDemo";
import { Services } from "@/components/Services";
import { Offer } from "@/components/Offer";
import { Onboarding } from "@/components/Onboarding";
import { Faq } from "@/components/Faq";
import { ConsultationForm } from "@/components/ConsultationForm";
import { Divider } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Divider />
      <div className="section-band">
        <EmailDemo />
      </div>
      <Divider />
      <Services />
      <Offer />
      <Divider />
      <div className="section-band">
        <Onboarding />
      </div>
      <Divider />
      <Faq />
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mesh-aurora opacity-70" />
        <ConsultationForm />
      </div>
    </>
  );
}
