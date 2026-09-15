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
      <EmailDemo />
      <Divider />
      <Services />
      <Offer />
      <Divider />
      <Onboarding />
      <Divider />
      <Faq />
      <ConsultationForm />
    </>
  );
}
