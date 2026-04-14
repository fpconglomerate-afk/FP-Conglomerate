import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "What is FP Conglomerate?",
    a: "FP Conglomerate is a parent group that coordinates multiple business units across faith, commerce, media, hospitality, and humanitarian impact under one trust framework.",
  },
  {
    q: "How do I engage a specific business unit?",
    a: "Visit the Business Units page, open the unit profile, and submit your request through the Contact page. Your enquiry is routed to the appropriate team.",
  },
  {
    q: "Do you support partnerships?",
    a: "Yes. We consider partnership requests that align with our standards for integrity, service quality, and long-term value creation.",
  },
  {
    q: "Where do updates and announcements appear?",
    a: "We publish updates, insights, and group news through the Blog and News section.",
  },
  {
    q: "How can I apply for roles in the group?",
    a: "Open the Careers page to review current opportunities and follow the application instructions provided for each role.",
  },
  {
    q: "What sectors does FP Conglomerate operate in?",
    a: "Our group operates across ministry, electronics and appliances, real estate and hospitality, media and entertainment, and humanitarian initiatives.",
  },
  {
    q: "Can I request a custom service package for my organization?",
    a: "Yes. Share your goals through the Contact page and our team will review how the most suitable unit can structure support for your needs.",
  },
  {
    q: "How quickly do you respond to enquiries?",
    a: "We review submissions during business hours and route each request to the relevant team for response as promptly as possible.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Yes. Our ambition is Africa-focused, and we evaluate opportunities across regions based on delivery capacity, fit, and long-term value.",
  },
  {
    q: "How do you ensure quality across different business units?",
    a: "Each unit has operating independence but follows shared group expectations on integrity, service discipline, accountability, and delivery standards.",
  },
  {
    q: "Can I collaborate with your NGO initiatives as a partner or donor?",
    a: "Yes. We welcome responsible collaborations for humanitarian and social-impact programs that align with our mission and operating values.",
  },
  {
    q: "Where can I learn more about each business unit in detail?",
    a: "Visit the Business Units page and open any unit profile to view its focus areas, offerings, and dedicated subpages.",
  },
  {
    q: "Do you provide media interviews or brand communications support?",
    a: "Media and communications requests can be submitted through the Contact page under the relevant topic for proper routing.",
  },
  {
    q: "How can I stay updated on group activities and announcements?",
    a: "Follow the Blog and News page regularly for updates, strategic insights, and selected announcements from across the group.",
  },
  {
    q: "Is my information secure when I submit the contact form?",
    a: "Your submission is handled through our website workflow and reviewed for business communication purposes only. For sensitive requests, indicate confidentiality in your message.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">Frequently Asked Questions</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">
            Clear answers for partners, clients, and stakeholders.
          </h1>
        </section>

        <section className="section-shell py-20 md:py-24">
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <article key={item.q} className="border border-border p-7 md:p-9 bg-background">
                <p className="eyebrow mb-3">Question {index + 1}</p>
                <h2 className="font-editorial text-2xl md:text-3xl mb-3">{item.q}</h2>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-28">
          <div className="border border-border bg-secondary/25 p-8 md:p-10">
            <p className="eyebrow mb-3">Need more help?</p>
            <p className="text-muted-foreground leading-relaxed">
              If your question is not covered here, contact us directly and we will guide you to the right team.
            </p>
            <Link to="/contact" className="inline-block mt-6 text-sm text-accent">
              Ask a question →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
