import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const cardsAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const faqAnimation = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Flavor Street, Food City, FC 12345",
      link: "https://maps.google.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (234) 567-890",
      link: "tel:+1234567890",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@annkitchen.com",
      link: "mailto:hello@annkitchen.com",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: "Mon-Fri: 8AM-10PM\nSat: 9AM-11PM\nSun: 9AM-9PM",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div 
            ref={cardsAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-on-scroll ${cardsAnimation.isVisible ? 'is-visible' : ''}`}
          >
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 hero-gradient rounded-full flex items-center justify-center">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{info.details}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div 
            ref={formAnimation.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 animate-scale-in ${formAnimation.isVisible ? 'is-visible' : ''}`}
          >
            {/* Contact Form */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold font-display mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Your Name *</Label>
                    <Input id="contact-name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address *</Label>
                    <Input id="contact-email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input id="contact-phone" type="tel" placeholder="+1 234 567 890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject *</Label>
                    <Input id="contact-subject" placeholder="What's this about?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us what's on your mind..."
                      required
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" className="w-full hero-gradient text-white hover:opacity-90 transition-opacity">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="space-y-6">
              <Card className="h-[400px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2175590862757!2d-73.98823492346655!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ANN's Kitchen Location"
                ></iframe>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      For immediate assistance or to place an order, you can:
                    </p>
                    <div className="flex flex-col gap-2">
                      <a href="tel:+1234567890">
                        <Button variant="outline" className="w-full justify-start">
                          <Phone className="w-4 h-4 mr-2" />
                          Call: +1 (234) 567-890
                        </Button>
                      </a>
                      <a
                        href="https://wa.me/1234567890?text=Hi! I have a question"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="w-4 h-4 mr-2" />
                          WhatsApp Us
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={faqAnimation.ref}
            className={`max-w-3xl mx-auto animate-on-scroll ${faqAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What are your delivery hours?",
                  a: "We deliver during our opening hours: Mon-Fri 8AM-10PM, Saturday 9AM-11PM, and Sunday 9AM-9PM.",
                },
                {
                  q: "Do you cater for events?",
                  a: "Yes! We offer catering services for events of all sizes. Contact us for a custom quote.",
                },
                {
                  q: "Can I customize my order?",
                  a: "Absolutely! We're happy to accommodate dietary restrictions and preferences. Just let us know in the special instructions.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept cash, credit/debit cards, mobile money, and bank transfers.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
