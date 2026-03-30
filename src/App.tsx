import React, { useEffect, useState, useRef } from "react";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  MessageCircle, 
  Brain,
  ChevronDown,
  ChevronUp,
  Lock,
  AlertCircle,
  Star,
  Award,
  Globe,
  Users,
  Play,
  ChevronLeft,
  Phone,
  Video,
  ChevronRight,
  Plus,
  Image,
  Mic,
  Camera,
  Smile,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    fbq: any;
  }
}

const CHECKOUT_URL = "https://pay.hotmart.com/V105096489F?checkoutMode=10&bid=1774912147583";

// --- Components ---

const Button = ({ 
  children, 
  className = "", 
  variant = "primary", 
  onClick,
  href,
  disabled = false
}: { 
  children: React.ReactNode, 
  className?: string, 
  variant?: "primary" | "secondary" | "outline" | "white",
  onClick?: () => void,
  href?: string,
  disabled?: boolean
}) => {
  const baseStyles = "w-full py-4 px-8 rounded-[14px] font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:brightness-105 shadow-soft",
    secondary: "bg-dark text-white hover:bg-dark/90 shadow-soft",
    outline: "bg-transparent border border-border text-dark hover:bg-cream",
    white: "bg-warm-white text-primary hover:bg-cream shadow-soft"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a 
        href={href}
        onClick={onClick}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

const Section = ({ 
  children, 
  className = "", 
  id = "", 
  bg = "cream" 
}: { 
  children: React.ReactNode, 
  className?: string, 
  id?: string,
  bg?: "cream" | "white" | "dark"
}) => (
  <section 
    id={id} 
    className={`py-16 md:py-24 ${bg === "white" ? "bg-warm-white" : bg === "dark" ? "bg-dark text-white" : "bg-cream"} ${className}`}
    style={{ contentVisibility: "auto", containIntrinsicSize: "auto 500px" }}
  >
    <div className="container-custom">
      {children}
    </div>
  </section>
);

const Reveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-bold text-lg py-2"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-text" /> : <ChevronDown className="w-5 h-5 text-gray-text" />}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-text leading-relaxed pb-4">
          {answer}
        </div>
      )}
    </div>
  );
};

const SocialProofNotification = () => {
  const notifications = [
    "Ana G. de Ciudad de México acaba de acceder",
    "Carlos M. de Guadalajara compró hace 2 minutos",
    "Laura P. de Monterrey acaba de empezar",
    "Miguel R. de Puebla accedió hace un momento",
    "Sofía V. de Querétaro se unió hace 5 minutos",
    "Alejandro T. de Mérida acaba de comprar",
    "Elena M. de Tijuana empezó su transformación",
    "Roberto G. de León accedió hace poco"
  ];

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNext = () => {
      setCurrent(Math.floor(Math.random() * notifications.length));
      setVisible(true);
      
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    };

    const interval = setInterval(() => {
      showNext();
    }, 10000);

    const initialTimeout = setTimeout(showNext, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-6 left-6 z-[60] bg-white/95 backdrop-blur-sm border border-border/50 p-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-[280px]"
        >
          <div className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <p className="text-xs font-medium text-dark leading-tight">
            {notifications[current]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SecurityBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap justify-center gap-4 text-[10px] md:text-xs font-bold text-gray-text uppercase tracking-widest mt-4 ${className}`}>
    <span className="flex items-center gap-1.5">🔒 Pago seguro SSL</span>
    <span className="flex items-center gap-1.5">✅ Acceso inmediato</span>
    <span className="flex items-center gap-1.5">🛡️ Garantía 15 días sin preguntas</span>
  </div>
);

// --- IPhone Chat Testimonial Carousel ---

const IPhoneChatTestimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "instagram",
      user: "Nuria G.",
      handle: "en línea",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
      messages: [
        {
          type: "text",
          content: "Hola!<br /><br />Compré Reset Canino porque estaba bastante perdida con mi perro y necesitaba algo claro de verdad.<br /><br />Lo empecé a aplicar y en pocos días ya noté cambios en casa, pero sobre todo yo me sentí mucho más tranquila y con más claridad.<br /><br />Está súper bien explicado y se nota que está hecho para poder aplicarlo de verdad.<br /><br />Gracias, de verdad.",
          time: "10:42 AM"
        }
      ]
    },
    {
      type: "whatsapp",
      user: "Mariana L.",
      avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=150&h=150&auto=format&fit=crop",
      messages: [
        {
          type: "received",
          content: "Compré Reset Canino porque sentía que cada día improvisaba con mi perro y eso me estaba agotando muchísimo.\n\nLo que más me gustó es que por fin entendí qué hacer, cómo hacerlo y por qué.\n\nSolo con empezar a aplicar lo del método, ya noté más calma en casa y mucha más seguridad por mi parte.\n\nDe verdad, ha sido una ayuda enorme.",
          time: "19:28"
        }
      ]
    },
    {
      type: "whatsapp",
      user: "Laura M.",
      avatar: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=150&h=150&auto=format&fit=crop",
      messages: [
        {
          type: "received",
          content: "Compré Reset Canino sin esperar demasiado y me sorprendió muchísimo.\n\nCon solo aplicar lo básico, mi perra empezó a estar mucho más tranquila y yo por fin dejé de sentir que hacía todo mal.\n\nMuy recomendable de verdad.",
          time: "15:11"
        }
      ]
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <div className="flex flex-col items-center py-12 px-4 bg-cream/30">
      <div className="relative w-full max-w-[320px] md:max-w-[360px] aspect-[9/19] bg-black rounded-[50px] border-[8px] border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-b-2xl z-20 flex items-center justify-center">
          <div className="w-10 h-1 bg-gray-900 rounded-full"></div>
        </div>

        {/* Screen Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white flex flex-col font-sans"
          >
            {slide.type === "instagram" ? (
              <>
                {/* Instagram Header */}
                <div className="pt-10 pb-3 px-4 border-b border-gray-100 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-3">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                      <img src={slide.avatar} alt={slide.user} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none">{slide.user}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{slide.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-900">
                    <Phone className="w-5 h-5" />
                    <Video className="w-5 h-5" />
                    <Info className="w-5 h-5" />
                  </div>
                </div>

                {/* Instagram Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                  {slide.messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.type === 'sent' ? 'items-end' : 'items-start'} w-full`}>
                      {msg.type === "image" ? (
                        <div className="max-w-[85%] rounded-[22px] overflow-hidden shadow-sm border border-gray-100">
                          <img src={msg.content} alt="Shared" className="w-full h-auto object-cover" />
                        </div>
                      ) : (
                        <div className={`${msg.type === 'sent' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'} p-4 rounded-[22px] shadow-sm text-sm leading-relaxed max-w-[85%]`} dangerouslySetInnerHTML={{ __html: msg.content || "" }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Instagram Footer */}
                <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Envía un mensaje...</span>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Mic className="w-4 h-4" />
                      <Image className="w-4 h-4" />
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* WhatsApp Header */}
                <div className="pt-10 pb-3 px-3 flex items-center justify-between bg-[#075e54] text-white sticky top-0 z-10">
                  <div className="flex items-center gap-1">
                    <ChevronLeft className="w-6 h-6" />
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
                      <img src={slide.avatar} alt={slide.user} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-1">
                      <p className="text-sm font-bold leading-none">{slide.user}</p>
                      <p className="text-[10px] opacity-80 mt-1">en línea</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Video className="w-5 h-5 fill-white" />
                    <Phone className="w-5 h-5 fill-white" />
                    <div className="flex flex-col gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#e5ddd5] relative">
                  {/* WhatsApp Background Pattern Overlay (Simulated) */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  
                  <div className="flex justify-center relative z-10">
                    <span className="bg-[#dcf8c6] text-[10px] text-gray-600 px-3 py-1 rounded-lg shadow-sm font-medium uppercase tracking-wide">Hoy</span>
                  </div>

                  {slide.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} relative z-10`}>
                      <div className={`max-w-[85%] p-2.5 rounded-lg shadow-sm relative ${msg.type === 'sent' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                        <p className="text-sm text-gray-800 leading-snug pr-8 whitespace-pre-wrap">{msg.content}</p>
                        <div className="absolute bottom-1 right-1 flex items-center gap-1">
                          <span className="text-[9px] text-gray-500">{msg.time}</span>
                          {msg.type === 'sent' && (
                            <div className="flex">
                              <CheckCircle2 className="w-3 h-3 text-blue-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Footer */}
                <div className="p-2 bg-[#f0f0f0] flex items-center gap-2">
                  <Plus className="w-6 h-6 text-gray-600" />
                  <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center justify-between shadow-sm">
                    <span className="text-sm text-gray-400">Mensaje</span>
                    <div className="flex items-center gap-3 text-gray-500">
                      <Image className="w-5 h-5" />
                      <Camera className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#075e54] flex items-center justify-center shadow-md">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls Overlay */}
        <div className="absolute inset-y-0 left-0 flex items-center -ml-4 z-30">
          <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-dark hover:text-primary transition-all active:scale-95">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center -mr-4 z-30">
          <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-dark hover:text-primary transition-all active:scale-95">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex gap-2 mt-8">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-primary w-6' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---


const TestimonialCarousel = () => {
  const testimonials = [
    {
      stars: "★★★★★",
      name: "Ricardo Méndez Espinoza",
      city: "CDMX, Col. Narvarte",
      dog: "Bruno",
      breed: "Labrador",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
      text: "Bruno aullaba todo el día y los vecinos ya se quejaban. Con Reset Canino, para el día 9 el silencio en el departamento era total. Ahora trabajo tranquilo sin miedo a las quejas.",
      highlight: "Logramos el silencio total en el departamento tras solo 9 días de práctica."
    },
    {
      stars: "★★★★★",
      name: "Sofía Villarreal Garza",
      city: "Monterrey, San Pedro",
      dog: "Koda",
      breed: "Husky Siberiano",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      text: "Koda destrozaba todo en casa. En solo 14 días con el método de Julieta, dejó de morder los muebles y se queda tranquilo en su cama. Por fin puedo salir sin miedo.",
      highlight: "Cero destrozos en casa después de la segunda semana del método."
    },
    {
      stars: "★★★★★",
      name: "Alejandro Torres Pozos",
      city: "Guadalajara, Zapopan",
      dog: "Pipo",
      breed: "Schnauzer miniatura",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      text: "Pipo gritaba al verme salir y afectaba mi trabajo. Para el día 18, ya se queda tranquilo hasta 6 horas seguidas. Recuperé mi productividad y mi paz mental.",
      highlight: "Pipo pasó de no aguantar ni 5 minutos solo a quedarse 6 horas en calma total."
    }
  ];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setVisibleSlides(window.innerWidth < 768 ? 1 : 3);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!isPaused) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % (testimonials.length - (visibleSlides - 1)));
      }, 5000);
    }
    return () => resetTimeout();
  }, [index, isPaused, testimonials.length, visibleSlides]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && index < testimonials.length - visibleSlides) {
      setIndex(index + 1);
    } else if (info.offset.x > threshold && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div 
      className="w-full relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div 
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: `calc(-${index * (100 / visibleSlides)}% - ${index * (24 / visibleSlides)}px)` }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] bg-warm-white p-8 rounded-[32px] border border-border/50 shadow-sm flex flex-col h-full select-none"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <img 
                  src={t.image} 
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <strong className="text-dark block mb-1">{t.name}</strong>
                  <p className="text-dark/90 leading-relaxed italic text-base">"{t.text}"</p>
                </div>
              </div>
              
              <div className="mt-6 mb-6 p-4 bg-amber-pale/50 rounded-2xl border border-border/30">
                <p className="text-dark font-bold text-sm leading-tight">
                  <span className="text-primary">★</span> {t.highlight}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-border/30">
                <p className="text-gray-text text-xs">
                  {t.city} • {t.dog} ({t.breed})
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="flex justify-center gap-3 mt-10">
        {[...Array(testimonials.length - (visibleSlides - 1))].map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === i ? "w-10 bg-primary" : "w-2 bg-border"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [, setHasClickedCTA] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, []);

  const handleCheckout = (source: string) => {
    setHasClickedCTA(true);

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
      (window as any).fbq("trackCustom", "CTA_Click", { source });
    }

    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen">
      {/* 1) HERO SECTION */}
      <Section bg="cream" className="pt-8 md:pt-12 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-dark tracking-tight">
              Tu perro llora, ladra y rompe cosas cada vez que sales de casa.
            </h1>

            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-primary max-w-3xl mx-auto leading-tight">
              Deja de salir con culpa, volver con miedo y vivir pendiente de tu perro cada vez que cierras la puerta.
            </h2>

            <p className="text-xl md:text-2xl font-bold text-dark mb-10">
              Sin castigos, sin gritos y sin seguir probando cosas que no funcionan.
            </p>

            {/* VSL VIDEO */}
            <div className="mb-8 max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-black relative group cursor-pointer">
              <video 
                className="w-full h-auto block"
                controls
                playsInline
                poster="/poster.jpg"
                preload="metadata"
                onPlay={(e) => e.currentTarget.parentElement?.classList.add('is-playing')}
                onPause={(e) => e.currentTarget.parentElement?.classList.remove('is-playing')}
                onEnded={(e) => e.currentTarget.parentElement?.classList.remove('is-playing')}
              >
                <source src="/vsl.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none group-[.is-playing]:hidden">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-6 bg-red-50 border border-red-100 py-3 px-6 rounded-full inline-flex items-center gap-3">
                <p className="text-red-600 font-bold text-sm md:text-base">
                  ⚠️ 73% OFF disponible hoy
                </p>
              </div>

              <Button 
                onClick={() => handleCheckout('hero_top_cta')} 
                className="text-xl md:text-2xl py-8 max-w-xl mx-auto shadow-lg hover:scale-[1.02] bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-4 border-orange-800"
              >
                QUIERO SALIR DE CASA SIN CULPA
                <CheckCircle2 className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 2) PROBLEMA */}
      <Section bg="white">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10 leading-tight">
            Vivir con un perro que no puede quedarse solo <span className="text-primary">te está robando la paz.</span>
          </h2>
          
          <div className="space-y-4 text-left md:text-center mb-12">
            <p className="text-xl text-dark font-medium leading-relaxed">
              • Sales de casa y a los pocos minutos ya estás pensando: “¿ya empezó?”
            </p>
            <p className="text-xl text-dark font-medium leading-relaxed">
              • Revisas el celular esperando no encontrar otro desastre.
            </p>
            <p className="text-xl text-dark font-medium leading-relaxed">
              • Vuelves con el cuerpo tenso, escuchando si hay quejas de vecinos.
            </p>
          </div>

          <div className="p-8 bg-red-50 rounded-[32px] border border-red-100">
            <p className="text-2xl font-bold text-red-600 mb-4">
              Tu perro no se acostumbra solo. Se hunde más.
            </p>
            <p className="text-lg text-gray-text leading-relaxed">
              Cada vez que entra en crisis, su cerebro aprende que estar solo es un peligro real. Si no cambias el mecanismo, mañana vivirás exactamente lo mismo.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 3) TRANSFORMACIÓN / MECANISMO */}
      <Section bg="cream">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-dark mb-8 tracking-tight">
              No necesitas cansarlo más. Necesitas enseñarle a estar solo.
            </h2>
            
            <div className="max-w-2xl mx-auto text-left mb-12 bg-white p-8 rounded-[32px] border border-border/50 shadow-sm">
              <p className="text-lg text-gray-text font-bold mb-4">Por qué los métodos comunes fallan:</p>
              <ul className="space-y-3 mb-6">
                {["Más juguetes", "Más paseos", "Más gritos", "Esperar a que se le pase"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-dark font-medium">
                    <span className="text-red-500 text-xl">✕</span> {item}
                  </li>
                ))}
              </ul>
              <p className="text-xl text-primary font-bold">La ansiedad no se corrige distrayendo a tu perro. Se corrige reentrenando cómo vive tu ausencia.</p>
            </div>

            <div className="max-w-4xl mx-auto relative group">
              <div className="relative bg-dark text-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/10">
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight text-center">
                    Eso es exactamente lo que trabaja <span className="text-primary">Reset Canino:</span>
                  </h3>
                  <p className="text-xl font-medium leading-relaxed opacity-90 text-center">
                    Un proceso <span className="text-white font-bold">simple y guiado</span> para que tu perro deje de entrar en crisis cuando te vas.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 4) SOLUCIÓN */}
      <Section bg="white">
        <Reveal className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Del pánico a la calma en 3 pasos</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                phase: "Paso 1", 
                title: "Entiende el problema", 
                desc: "Dejas de adivinar y entiendes por fin qué le pasa a tu perro." 
              },
              { 
                phase: "Paso 2", 
                title: "Primeros resultados", 
                desc: "Empiezas a ver los primeros minutos de silencio real." 
              },
              { 
                phase: "Paso 3", 
                title: "Sal de casa con calma", 
                desc: "Vuelve a salir sin miedo a encontrar ladridos, quejas de vecinos o destrozos al regresar." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-warm-white p-8 rounded-[24px] border border-border text-center group hover:border-primary/50 transition-colors">
                <div className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-6 inline-block">
                  {item.phase}
                </div>
                <h4 className="text-2xl font-bold text-dark mb-4">{item.title}</h4>
                <p className="text-gray-text leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 4.5) AUTORIDAD */}
      <Section bg="cream">
        <Reveal className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-10 md:p-16 rounded-[40px] border border-border shadow-xl">
            <div className="shrink-0">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-primary p-1 shadow-lg">
                <img 
                  src="/experta.png" 
                  alt="Julieta Márquez" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="text-center md:text-left space-y-4">
              <h3 className="text-3xl font-serif font-bold text-dark">Hola, soy Julieta Márquez</h3>
              <p className="text-lg text-gray-text leading-relaxed">
                He dedicado los últimos 10 años a entender la conducta canina. Mi enfoque no es la obediencia ciega, sino la regulación emocional.
              </p>
              <p className="text-lg text-gray-text leading-relaxed font-medium">
                He ayudado a <span className="text-primary font-bold">+1,200 familias</span> a recuperar su libertad y a sus perros a vivir sin miedo.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">10+ Años de Experiencia</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">Especialista en Etología</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 5) QUÉ RECIBES */}
      <Section id="oferta" bg="cream">
        <Reveal className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-dark tracking-tight leading-tight">
            El sistema completo para recuperar la calma en tu casa.
          </h2>
          <img 
            src="/mockup.ia.png" 
            alt="Mockup IA" 
            className="w-full max-w-3xl mx-auto h-auto rounded-2xl shadow-xl mt-8"
            referrerPolicy="no-referrer"
          />
        </Reveal>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 md:p-12 rounded-[28px] md:rounded-[40px] shadow-2xl text-dark border border-border relative overflow-hidden max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center text-left">
              <div className="w-full space-y-6">
                <img 
                  src="/mockup.png" 
                  alt="Mockup Reset Canino" 
                  className="w-full h-auto rounded-xl shadow-md object-contain"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="/imag-ps.png" 
                  alt="Oferta Completa Reset Canino" 
                  className="w-full h-auto rounded-xl shadow-md object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="space-y-6">
                <p className="text-xl font-bold leading-tight text-dark">
                  Esto es lo que te llevas hoy:
                </p>

                <ul className="space-y-4">
                  {[
                    { icon: "✅", name: "Reset Canino — Sistema completo", val: 22 },
                    { icon: "🎁", name: "Guía de Errores Invisibles", val: 11 },
                    { icon: "🎁", name: "Audio de Regulación Emocional", val: 13 },
                    { icon: "🎁", name: "Video Resumen Paso a Paso", val: 9 },
                    { icon: "🎁", name: "Asistente IA de Acompañamiento", val: 15 },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 font-bold text-dark">
                        <span>{item.icon}</span>
                        {item.name}
                      </span>
                      <span className="text-gray-400 font-medium line-through shrink-0">${item.val} USD</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-bg p-6 rounded-2xl border border-border text-center">
                  <p className="text-sm text-gray-text font-bold mb-1 line-through opacity-50">Valor total: $70 USD</p>
                  <p className="text-4xl font-black text-dark tracking-tight mb-2">
                    Hoy: solo $14.97 USD
                  </p>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest">Pago único • Acceso de por vida</p>
                </div>
                
                <Button variant="primary" onClick={() => handleCheckout('offer_section')} className="w-full shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 btn-shine border-2 border-white/20 text-xl py-8">
                  QUIERO SALIR DE CASA SIN CULPA
                </Button>

                <SecurityBadges />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6) GARANTÍA */}
      <Section bg="white">
        <Reveal className="max-w-4xl mx-auto bg-warm-white p-8 md:p-16 rounded-[40px] border border-border text-center shadow-xl">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-dark">Garantía de 15 días</h2>
          
          <div className="space-y-6 text-lg md:text-xl text-dark font-medium leading-relaxed mb-12">
            <p>Si aplicas el método y sientes que tu perro no está más tranquilo cuando te vas, te devolvemos tu dinero.</p>
            <p className="font-bold">Sin preguntas. Sin complicaciones.</p>
          </div>

          <div className="max-w-xl mx-auto">
            <Button 
              variant="primary" 
              onClick={() => handleCheckout('guarantee_section')} 
              className="w-full text-xl md:text-2xl py-8 shadow-lg bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-4 border-orange-800"
            >
              QUIERO SALIR DE CASA SIN CULPA
              <CheckCircle2 className="w-6 h-6 ml-2" />
            </Button>
            <SecurityBadges />
          </div>
        </Reveal>
      </Section>

      {/* 7) TESTIMONIOS CHAT */}
      <Section bg="white" className="pb-0">
        <Reveal className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-4">
            Lo que dicen nuestros alumnos
          </h2>
          <p className="text-gray-text text-lg">Estos son algunos de los mensajes que recibimos a diario</p>
        </Reveal>
        <IPhoneChatTestimonial />
      </Section>

      {/* 7) TESTIMONIOS */}

      <Section bg="cream" className="overflow-hidden">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-4">
            Resultados reales de dueños reales
          </h2>
          <p className="text-gray-text text-lg">Personas que ya han transformado su convivencia y recuperado su libertad.</p>
        </Reveal>
        
        <div className="max-w-6xl mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </Section>

      {/* 8) FAQ */}
      <Section bg="white">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Preguntas frecuentes</h2>
        </Reveal>
        <div className="max-w-3xl mx-auto bg-warm-white p-8 md:p-12 rounded-[32px] border border-border shadow-soft">
          <FAQItem 
            question="¿Funciona para casos extremos?" 
            answer="Sí. Reset Canino regula el sistema nervioso de tu perro. Hemos trabajado con casos de años de ansiedad con éxito, incluso cuando otros entrenadores se dieron por vencidos." 
          />
          <FAQItem 
            question="¿Es otro curso de obediencia?" 
            answer="No. No enseñamos a sentarse ni a dar la pata. Es un sistema de rehabilitación emocional diseñado para atacar la raíz del pánico por separación." 
          />
          <FAQItem 
            question="¿Cuánto tiempo necesito?" 
            answer="Solo entre 15 y 20 minutos al día. Lo importante no es la cantidad de tiempo, sino la calidad y constancia de las rutinas que te enseñamos." 
          />
          <FAQItem 
            question="¿Tengo garantía?" 
            answer="Totalmente. Tienes 15 días para probar el método. Si no ves una mejora real en la calma de tu perro, te devolvemos el 100% de tu dinero sin preguntas." 
          />
          <FAQItem 
            question="¿Recibiré el acceso de inmediato?" 
            answer="Sí. Al pagar recibes un correo automático con tus datos de acceso para entrar a la plataforma y empezar hoy mismo." 
          />
          <FAQItem 
            question="¿Por qué cuesta tan poco si funciona de verdad?" 
            answer="Es una oferta especial de lanzamiento. Queremos que el precio no sea una barrera para que recuperes la paz en casa. Es un sistema práctico y accionable, sin rellenos innecesarios, enfocado 100% en resultados." 
          />
        </div>
      </Section>

      {/* 9) CTA FINAL */}
      <Section bg="cream" className="py-20">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10 text-dark">
            Deja de volver a casa con miedo a los ladridos y destrozos.
          </h2>

          <Button 
            variant="primary" 
            onClick={() => handleCheckout('final_cta')} 
            className="text-xl md:text-2xl py-8 max-w-2xl mx-auto shadow-lg hover:scale-[1.02] bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-4 border-orange-800"
          >
            QUIERO SALIR DE CASA SIN CULPA
            <CheckCircle2 className="w-6 h-6 ml-2" />
          </Button>
          
          <div className="mt-8">
            <SecurityBadges />
          </div>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-border py-20 px-6 text-center text-gray-text text-sm">
        <div className="container-custom">
          <p className="mb-8 font-bold text-dark text-lg">Reset Canino</p>
          <p className="mb-2">© {new Date().getFullYear()} Todos los derechos reservados.</p>
          <p className="mb-6 text-xs opacity-60">resetcanino.com · contacto@resetcanino.com</p>
          <div className="flex justify-center gap-8 mb-10 opacity-60">
            <a href="/aviso-legal" className="hover:text-primary transition-colors">Aviso Legal</a>
            <a href="/privacidad" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="/cookies" className="hover:text-primary transition-colors">Cookies</a>
          </div>
          <p className="max-w-3xl mx-auto opacity-40 text-[10px] leading-relaxed uppercase tracking-widest">
            Este sitio no forma parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca registrada de FACEBOOK, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
