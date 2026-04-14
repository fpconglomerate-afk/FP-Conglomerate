import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(40, "Use a shorter number")
    .optional(),
  organization: z.string().trim().max(120, "Shorten the organization name").optional(),
  topic: z.enum(["general", "partnership", "media", "careers", "other"], {
    required_error: "Choose a topic",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please add a bit more detail (at least 20 characters)")
    .max(2500, "Message is too long (max 2,500 characters)"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const topicLabels: Record<ContactFormValues["topic"], string> = {
  general: "General inquiry",
  partnership: "Partnership or investment",
  media: "Press or media",
  careers: "Careers",
  other: "Other",
};

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : undefined;
}

export default function ContactPage() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { content } = useSiteContent();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      topic: "general",
      message: "",
    },
  });

  const messageLen = form.watch("message")?.length ?? 0;
  const phoneLink = telHref(content.brand.phone);

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Thank you. Your message has been received.", {
      description: "We will respond as soon as we can.",
    });
    form.reset({
      name: "",
      email: "",
      phone: "",
      organization: "",
      topic: "general",
      message: "",
    });
  };

  const inputClass =
    "h-11 rounded-md border-border bg-background/90 shadow-sm transition-shadow focus-visible:border-accent/60 focus-visible:ring-accent/25";

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-32 section-shell" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 xl:gap-16">
          <div
            className={cn(
              "lg:col-span-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <p className="eyebrow mb-4">Contact</p>
            <h1 className="font-editorial text-5xl md:text-6xl text-foreground mb-8 max-w-xl">
              Start a trusted business conversation.
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-md">
              Have a partnership idea, media request, career inquiry, or general
              question? Use the form or contact us directly.
            </p>

            <div className="space-y-8 border-t border-border pt-8">
              <div>
                <p className="eyebrow mb-2">Email</p>
                <a
                  href={`mailto:${content.brand.contactEmail}`}
                  className="text-foreground underline-offset-4 hover:underline decoration-accent/60"
                >
                  {content.brand.contactEmail}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Phone</p>
                {phoneLink ? (
                  <a
                    href={phoneLink}
                    className="text-foreground underline-offset-4 hover:underline decoration-accent/60"
                  >
                    {content.brand.phone}
                  </a>
                ) : (
                  <p className="text-foreground">{content.brand.phone}</p>
                )}
              </div>
              <div>
                <p className="eyebrow mb-2">Office</p>
                <p className="text-foreground">{content.brand.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-12">
              {(content.pageImages?.contact ?? []).map((image, index) => (
                <MediaAsset
                  key={`${image}-${index}`}
                  src={image}
                  alt={`Contact visual ${index + 1}`}
                  className="w-full h-32 md:h-36 object-cover border border-border dark:brightness-75"
                />
              ))}
            </div>
          </div>

          <div
            className={cn(
              "lg:col-span-7 lg:col-start-6 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <div className="relative border border-border bg-card shadow-sm overflow-hidden rounded-lg">
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/70 to-highlight/90"
                aria-hidden
              />
              <div className="pl-5 pr-6 py-8 md:px-10 md:py-10 border-l border-border/60">
                <div className="mb-8">
                  <h2 className="font-editorial text-2xl md:text-3xl text-foreground mb-2">Send a message</h2>
                  <p className="text-sm text-muted-foreground max-w-lg">
                    Fields marked with an asterisk are required. We read every submission and reply during business
                    hours.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-normal">
                              Full name <span className="text-accent">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete="name"
                                placeholder="Jane Doe"
                                className={inputClass}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-normal">
                              Work email <span className="text-accent">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                autoComplete="email"
                                placeholder="you@company.com"
                                className={inputClass}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-normal">
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                autoComplete="tel"
                                placeholder="+234 …"
                                className={inputClass}
                              />
                            </FormControl>
                            <FormDescription>Optional. Include country code if outside Nigeria.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-normal">
                              Organization
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete="organization"
                                placeholder="Company or project"
                                className={inputClass}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-normal">
                            Topic <span className="text-accent">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={cn(inputClass, "h-11")}>
                                <SelectValue placeholder="Choose a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {(Object.keys(topicLabels) as ContactFormValues["topic"][]).map((key) => (
                                <SelectItem key={key} value={key}>
                                  {topicLabels[key]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-normal">
                            Message <span className="text-accent">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="What would you like us to know?"
                              rows={6}
                              className={cn(
                                inputClass,
                                "min-h-[140px] resize-y py-3 leading-relaxed",
                              )}
                            />
                          </FormControl>
                          <div className="flex justify-between gap-4 text-xs text-muted-foreground">
                            <FormDescription className="!mt-0 max-w-[28ch]">
                              Share context so we can route your note to the right team.
                            </FormDescription>
                            <span
                              className={cn(
                                "tabular-nums shrink-0",
                                messageLen > 2500 && "text-destructive",
                              )}
                              aria-live="polite"
                            >
                              {messageLen} / 2500
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        className="rounded-md px-8 h-12 gap-2 font-medium tracking-wide"
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="size-4" aria-hidden />
                            Send message
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground max-w-xs leading-snug">
                        This demo currently stores submissions locally only. In
                        production, connect the form to your preferred backend or
                        form service.
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
