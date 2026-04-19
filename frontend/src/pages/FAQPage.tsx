import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "What is FP Conglomerate?",
    a: "We are a parent group that brings several business units together under one standard. Our work spans faith, commerce, media, hospitality, and humanitarian impact, with trustworthy service as the through line.",
  },
  {
    q: "How do I engage a specific business unit?",
    a: "Open Business Units, pick the unit that fits your need, then send a message through Contact. We pass your note to the team that can actually help.",
  },
  {
    q: "Do you support partnerships?",
    a: "Yes. If your goals line up with how we work (integrity, solid delivery, and long-term value), we are happy to talk.",
  },
  {
    q: "Where do updates and announcements appear?",
    a: "We share news and longer reads on the Blog and News page. That is the best place to watch what is happening across the group.",
  },
  {
    q: "How can I apply for roles in the group?",
    a: "Head to Careers, choose a role that fits, and follow the steps listed there. Each listing explains what we need and how to apply.",
  },
  {
    q: "What sectors does FP Conglomerate operate in?",
    a: "We touch ministry, general construction and maintenance, electronics and appliances, real estate and hospitality, media and entertainment, brand promotion, and humanitarian initiatives.",
  },
  {
    q: "Can I request a custom service package for my organization?",
    a: "Yes. Tell us what you are trying to achieve on Contact and we will see which unit can shape support around your situation.",
  },
  {
    q: "How quickly do you respond to enquiries?",
    a: "We read messages during business hours and send each one to the right team. You should hear back as soon as they can reply properly.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Yes. Africa is our focus, and we look at each opportunity on whether we can deliver well, whether it fits, and whether it makes sense over time.",
  },
  {
    q: "How do you ensure quality across different business units?",
    a: "Units run day to day in their own way, but we share the same expectations: integrity, discipline, accountability, and delivery you can feel on the ground.",
  },
  {
    q: "Can I collaborate with your NGO initiatives as a partner or donor?",
    a: "Yes. We are open to partners and donors who want to support humanitarian and social impact work in a responsible way that matches how we operate.",
  },
  {
    q: "Where can I learn more about each business unit in detail?",
    a: "Go to Business Units and open any profile. You will see focus areas, what they offer, and extra pages where we go deeper.",
  },
  {
    q: "Do you provide media interviews or brand communications support?",
    a: "For interviews or brand and communications requests, use Contact and pick the topic that matches. That helps your message reach the right people.",
  },
  {
    q: "How can I stay updated on group activities and announcements?",
    a: "Check Blog and News from time to time. We post updates, perspective pieces, and selected announcements from across the group.",
  },
  {
    q: "Is my information secure when I submit the contact form?",
    a: "Your form goes through our site and we use it for normal business follow-up. If something is sensitive, say so in your message and we will treat it accordingly.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Seo
        title="FAQ"
        path="/faq"
        description="Frequently asked questions about FP Conglomerate: business units, partnerships, careers, NGO work, and how to contact us."
      />
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">Frequently Asked Questions</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">
            Straight answers for partners, clients, and anyone curious.
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
              If you do not see your question here, reach out directly and we will point you to the right team.
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
