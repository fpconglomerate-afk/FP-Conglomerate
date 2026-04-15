import { MessageCircle } from "lucide-react";

const phone = "2348060197012";
const text =
  "Hello FP Conglomerate team, I am reaching out from your website and would like to learn more about your services. Thank you.";

const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FP Conglomerate on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
