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

const getDayName = () => {
  const days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
  return days[new Date().getDay()];
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-5xl font-black font-mono tracking-widest">
      {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
    </div>
  );
};

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

// --- WhatsApp Style Testimonial ---

const WhatsAppTestimonial = ({ user, message, time, group, avatar, reaction = "❤️", reply }: { user: string, message: string, time: string, group: string, avatar: string, reaction?: string, reply?: { user: string, text: string } }) => (
  <div className="max-w-md mx-auto mb-8">
    <div className="bg-[#0b141a] rounded-2xl border-2 border-[#25d366] overflow-hidden shadow-2xl font-sans">
      {/* Header */}
      <div className="bg-[#202c33] p-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-5 h-5 text-white/70" />
          <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
            <img src={avatar} alt={group} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{group}</p>
            <p className="text-white/50 text-[10px]">2 en línea</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
        <div className="bg-[#202c33] rounded-xl p-3 relative shadow-sm max-w-[90%]">
          <p className="text-[#e8a040] font-bold text-xs mb-1">{user}</p>
          
          {reply && (
            <div className="bg-[#111b21] border-l-4 border-primary/50 rounded-lg p-2 mb-2 opacity-80">
              <p className="text-primary font-bold text-[10px]">{reply.user}</p>
              <p className="text-white/60 text-xs line-clamp-2">{reply.text}</p>
            </div>
          )}

          <p className="text-[#e9edef] text-sm leading-relaxed mb-4 whitespace-pre-line">
            {message}
          </p>
          <div className="flex items-center justify-end gap-1">
            <span className="text-[#8696a0] text-[10px]">{time}</span>
          </div>
          
          {/* Reaction */}
          <div className="absolute -bottom-3 -left-1 bg-[#202c33] rounded-full p-1 border border-white/10 shadow-lg">
            <span className="text-xs">{reaction}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---


const TestimonialCarousel = () => {
  const testimonials = [
    {
      stars: "★★★★★",
      name: "Marta S.",
      city: "Madrid",
      dog: "Lola",
      breed: "Golden Retriever",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop",
      text: "“Yo ya no salía tranquila. Cerraba la puerta y a los 2 minutos ya estaba pensando si mi perro estaba ladrando. Con Reset Canino entendí qué estaba empeorando todo sin querer y en pocos días empecé a notar más calma. Hoy salgo con mucha menos culpa y mucha más tranquilidad.”",
      highlight: "Hoy salgo con mucha menos culpa y mucha más tranquilidad."
    },
    {
      stars: "★★★★★",
      name: "Juan P.",
      city: "Barcelona",
      dog: "Toby",
      breed: "Border Collie",
      image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=400&h=400&auto=format&fit=crop",
      text: "“Mi perro rompía todo cuando se quedaba solo y yo ya no sabía qué más esconder. Probé mil cosas y nada cambiaba de verdad. Con Reset Canino por fin entendí el problema y empecé a ver menos destrucción y más control en casa.”",
      highlight: "Empecé a ver menos destrucción y más control en casa."
    },
    {
      stars: "★★★★★",
      name: "Elena R.",
      city: "Valencia",
      dog: "Max",
      breed: "Beagle",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
      text: "“Ya me daba vergüenza salir porque mi perro ladraba apenas me iba y los vecinos empezaban a quejarse. Lo que más me ayudó fue dejar de improvisar y tener pasos claros. En pocos días noté menos ladridos y mucha más paz mental.”",
      highlight: "En pocos días noté menos ladridos y mucha más paz mental."
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
              className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] bg-[#1A1A1A] p-10 rounded-[40px] border border-primary/30 shadow-[0_0_30px_rgba(232,160,64,0.1)] flex flex-col items-center text-center h-full select-none"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-primary p-1 shadow-[0_0_20px_rgba(232,160,64,0.3)]">
                  <img 
                    src={t.image} 
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <h4 className="text-2xl font-black tracking-[0.2em] uppercase text-white mb-8">{t.name}</h4>

              <div className="flex-grow space-y-6 mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t.text}
                </p>
              </div>

              <div className="w-full h-px bg-white/10 mb-8" />

              <p className="text-primary font-bold italic text-xl leading-snug">
                "{t.highlight}"
              </p>
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
      <Section bg="cream" className="pt-12 md:pt-20 pb-16 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-amber-light/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center">
            {/* Main Title */}
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 text-dark tracking-tighter uppercase">
              Sal de casa sin que <br className="hidden md:block" />
              <span className="text-primary">tu perro colapse</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-dark/90 max-w-4xl mx-auto leading-tight">
              El método para frenar lloros, ladridos y destrozos por ansiedad en solo 7 días
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-text mb-12 max-w-3xl mx-auto leading-relaxed">
              Sin castigos, sin gritos y sin seguir improvisando cada vez que cierras la puerta. Solo un sistema claro para que tu perro aprenda a quedarse solo — incluso si ya entra en pánico apenas te ve salir.
            </p>

            {/* Hero Mockup Image */}
            <div className="mb-12 max-w-4xl mx-auto">
              <img 
                src="/imagen hero.png" 
                alt="Reset Canino Mockup" 
                className="w-full h-auto rounded-2xl shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-6">
              <Button 
                onClick={() => handleCheckout('hero_top_cta')} 
                className="text-xl md:text-3xl py-10 px-12 max-w-2xl mx-auto shadow-[0_20px_50px_rgba(232,160,64,0.3)] hover:scale-[1.02] bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-8 border-orange-800 rounded-[24px] uppercase tracking-tight"
              >
                ¡QUIERO EL MÉTODO AHORA!
                <Zap className="w-8 h-8 ml-2 fill-white" />
              </Button>
              
              <div className="flex items-center gap-4 text-gray-text font-bold text-sm uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green" /> Garantía total</span>
                <span className="w-1 h-1 bg-border rounded-full"></span>
                <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-green" /> Pago 100% Seguro</span>
              </div>
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
          {/* VSL VIDEO */}
          <div className="mb-16 max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-black relative group cursor-pointer">
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
            <div className="text-center md:text-left space-y-6">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-dark">Hola, soy Julieta Márquez</h3>
              
              <div className="space-y-4 text-lg md:text-xl text-gray-text leading-relaxed font-medium">
                <p className="text-dark font-bold italic">
                  Y no, no creo en castigar a un perro que en realidad está colapsando por dentro.
                </p>
                <p>
                  Durante los últimos 10 años he trabajado con perros que ladran, lloran, destruyen, se desesperan o directamente entran en pánico cuando se quedan solos.
                </p>
                <p>
                  He ayudado a <span className="text-primary font-bold">más de 1,200 familias</span> a recuperar la calma en casa sin romper el vínculo con su perro.
                </p>
                <p>
                  Mi enfoque no es la obediencia por miedo.<br />
                  Es enseñar al perro a <span className="text-dark font-bold underline decoration-primary/30">regularse emocionalmente de verdad</span>.
                </p>
                <p className="text-dark font-bold">
                  Porque cuando entiendes el problema real,<br />
                  por fin puedes empezar a resolverlo.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/20">10+ Años de Experiencia</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/20">Especialista en Etología</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 4.7) PARA QUIÉN ES */}
      <Section bg="white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Reveal className="bg-cream p-8 md:p-12 rounded-[40px] border border-border shadow-sm">
            <h3 className="text-3xl font-serif font-bold mb-8 text-dark">Esto es para ti si…</h3>
            <ul className="space-y-4">
              {[
                "Tu perro ladra, llora, aúlla o destruye cuando te vas",
                "Ya probaste consejos sueltos y nada cambió de verdad",
                "Sales de casa con culpa y vuelves con tensión",
                "Tienes miedo de que el problema empeore o los vecinos exploten",
                "Quieres ayudar a tu perro sin gritarle ni castigarle"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg text-dark font-medium leading-tight">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="bg-dark text-white p-8 md:p-12 rounded-[40px] shadow-xl">
            <h3 className="text-3xl font-serif font-bold mb-8 text-white">Esto NO es para ti si…</h3>
            <ul className="space-y-4">
              {[
                "Quieres una solución mágica sin aplicar nada",
                "Buscas “dominancia”, castigo o control por miedo",
                "Prefieres seguir improvisando antes que corregir el problema de raíz"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg font-medium leading-tight opacity-90">
                  <span className="text-red-500 text-2xl leading-none shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 5) QUÉ RECIBES */}
      <Section id="oferta" bg="cream">
        <Reveal className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-dark tracking-tight leading-tight">
            Todo lo que necesitas para dejar de vivir pendiente de tu perro cada vez que sales de casa
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

                <ul className="space-y-6">
                  {[
                    { 
                      icon: "✅", 
                      name: "Reset Canino — Sistema completo", 
                      val: 22,
                      desc: "El paso a paso para reducir lloros, ladridos, destrucción y pánico al quedarse solo."
                    },
                    { 
                      icon: "🎁", 
                      name: "Guía de Errores Invisibles", 
                      val: 11,
                      desc: "Descubre las cagadas “bienintencionadas” que empeoran la ansiedad sin que te des cuenta."
                    },
                    { 
                      icon: "🎁", 
                      name: "Audio de Regulación Emocional", 
                      val: 13,
                      desc: "Un recurso práctico para ayudar a bajar activación y crear un contexto más estable."
                    },
                    { 
                      icon: "🎁", 
                      name: "Video Resumen Paso a Paso", 
                      val: 9,
                      desc: "Para que sepas exactamente qué hacer sin perderte entre teoría."
                    },
                    { 
                      icon: "🎁", 
                      name: "Asistente IA de Acompañamiento", 
                      val: 15,
                      desc: "Para resolver dudas, ajustar pasos y no abandonar a mitad del proceso."
                    },
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 font-bold text-dark text-lg">
                          <span>{item.icon}</span>
                          {item.name} — <span className="line-through opacity-60 font-medium">${item.val} USD</span>
                        </span>
                      </div>
                      <p className="text-gray-text text-sm ml-8 leading-snug">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="text-center mb-8">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    <span className="ml-2 text-xs font-bold text-gray-text">5/5</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-xl text-gray-text line-through opacity-50 font-bold">$70 USD</span>
                    <span className="text-4xl font-black text-dark">$14.97 USD</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-dark text-white text-xs font-bold mb-8">
                    <Zap className="w-3 h-3 fill-primary text-primary" />
                    Oferta -73% OFF sólo 20 cupos
                  </div>

                  <div className="bg-red-900 text-white p-8 rounded-[32px] shadow-2xl mb-6 relative overflow-hidden">
                    {/* Decorative background elements for the box */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                    
                    <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight relative z-10">
                      OFERTA HOY {getDayName()} !!!
                    </h4>
                    
                    <div className="space-y-1 mb-8 opacity-90 relative z-10">
                      <p className="text-sm font-bold leading-tight">Reserva válida por 15 minutos.</p>
                      <p className="text-sm leading-tight">Si no accedés, tu descuento pasa a la siguiente persona.</p>
                    </div>
                    
                    <div className="relative z-10">
                      <CountdownTimer />
                      <div className="flex justify-center gap-12 mt-2 text-[10px] uppercase font-bold tracking-widest opacity-70">
                        <span>Minutos</span>
                        <span>Segundos</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <p className="flex items-center justify-center gap-2 text-primary font-black animate-pulse text-lg">
                      <Zap className="w-5 h-5 fill-primary" />
                      Últimos 3 Cupos en Oferta!
                    </p>
                    <p className="text-xs text-gray-text font-bold uppercase tracking-widest">
                      Pago único • Acceso de por vida
                    </p>
                  </div>
                </div>
                
                <Button variant="primary" onClick={() => handleCheckout('offer_section')} className="w-full shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 btn-shine border-2 border-white/20 text-xl py-8">
                  👉 QUIERO SALIR DE CASA SIN CULPA
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

      {/* 7) TESTIMONIOS WHATSAPP */}
      <Section bg="white" className="pb-0">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-4">
            Lo que dicen nuestros alumnos
          </h2>
          <p className="text-gray-text text-lg">Estos son algunos de los mensajes que recibimos a diario</p>
        </Reveal>
        
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <WhatsAppTestimonial 
            group="Laura M."
            user="Laura M."
            time="21:15"
            avatar="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=150&h=150&auto=format&fit=crop"
            message="Chicas, de verdad que Reset Canino me ha cambiado la vida. Antes no podía ni ir a tirar la basura sin que Lucas empezara a aullar y rascar la puerta. Hoy me he ido 2 horas a cenar y cuando he vuelto estaba durmiendo en el sofá. No me lo creo ni yo. Gracias por enseñarme a entenderle por fin."
          />
          <WhatsAppTestimonial 
            group="Carlos R."
            user="Carlos R."
            time="18:30"
            reaction="🙏"
            avatar="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=150&h=150&auto=format&fit=crop"
            message="Lo mejor de todo es el acompañamiento. He probado mil adiestradores y ninguno me explicó que el problema era emocional y no de obediencia. Ver a mi perra tranquila cuando cojo las llaves es la mayor paz que he tenido en años. Ojalá os hubiera encontrado antes."
          />
        </div>

        <div className="max-w-md mx-auto px-4 mt-8">
          <WhatsAppTestimonial 
            group="Yami Gutiérrez"
            user="Yami Gutiérrez"
            time="19:46"
            avatar="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=150&h=150&auto=format&fit=crop"
            reaction="🔥"
            reply={{
              user: "Tú",
              text: "Este es un mensajito en el otro grupo, el reto hoy está cerrado pero con Reset Canino estamos trabajando en mejorar..."
            }}
            message={"Lo recomiendo mil veces porque Reset Canino no es solo adiestramiento, es entender a tu perro. Lo que hace la diferencia es el apoyo constante y saber que no estás sola cuando las cosas se ponen difíciles.\n\nGracias a este método, por fin puedo salir de casa sin que mi perro sufra y yo sin sentirme culpable."}
          />
        </div>
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
          <div className="space-y-6 mb-12">
            <p className="text-2xl md:text-3xl font-bold text-dark">
              Tu perro no necesita que sigas probando al azar.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              Necesita que por fin le enseñes a estar solo sin sufrir.**
            </p>
            <p className="text-xl md:text-2xl text-gray-text">
              Cada día que pasa sin corregir esto,<br />
              el problema se sigue reforzando.
            </p>
            <p className="text-xl md:text-2xl text-dark font-medium italic">
              Puedes seguir saliendo con culpa,<br />
              volviendo con miedo<br />
              y esperando que “algún día se le pase”…
            </p>
            <p className="text-2xl md:text-4xl font-serif font-bold text-dark mt-8">
              o puedes empezar hoy a cambiarlo de verdad.
            </p>
          </div>

          <Button 
            variant="primary" 
            onClick={() => handleCheckout('final_cta')} 
            className="text-xl md:text-3xl py-10 px-12 max-w-2xl mx-auto shadow-[0_20px_50px_rgba(232,160,64,0.3)] hover:scale-[1.02] bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-8 border-orange-800 rounded-[24px] uppercase tracking-tight"
          >
            👉 QUIERO SALIR DE CASA SIN CULPA
          </Button>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm md:text-base font-bold text-gray-text uppercase tracking-widest">
            <span className="flex items-center gap-2">🔒 Pago seguro SSL</span>
            <span className="flex items-center gap-2">✅ Acceso inmediato</span>
            <span className="flex items-center gap-2">🛡️ Garantía 15 días sin preguntas</span>
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
