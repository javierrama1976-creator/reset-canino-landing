import React, { useEffect, useState, useRef } from "react";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  X, 
  MessageCircle, 
  Brain,
  ChevronDown,
  ChevronUp,
  Lock,
  AlertCircle,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    fbq: any;
  }
}

const CHECKOUT_URL = "https://pay.hotmart.com/S104982269H";

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
    primary: "bg-primary text-white hover:brightness-110 shadow-soft",
    secondary: "bg-dark text-white hover:bg-dark/90 shadow-soft",
    outline: "bg-transparent border border-border text-dark hover:bg-gray-bg",
    white: "bg-white text-primary hover:bg-gray-50 shadow-soft"
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
  bg = "white" 
}: { 
  children: React.ReactNode, 
  className?: string, 
  id?: string,
  bg?: "white" | "gray" | "dark"
}) => (
  <section 
    id={id} 
    className={`py-16 md:py-24 ${bg === "gray" ? "bg-gray-bg" : bg === "dark" ? "bg-dark" : "bg-white"} ${className}`}
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

const SecurityBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap justify-center gap-4 text-[10px] md:text-xs font-bold text-gray-text uppercase tracking-widest mt-4 ${className}`}>
    <span className="flex items-center gap-1.5">🔒 Pago seguro SSL</span>
    <span className="flex items-center gap-1.5">✅ Acceso inmediato</span>
    <span className="flex items-center gap-1.5">🛡️ Garantía 15 días sin preguntas</span>
  </div>
);

// --- Main App ---

const TestimonialCarousel = () => {
  const testimonials = [
    {
      stars: "★★★★★",
      name: "María G.",
      city: "Ciudad de México",
      dog: "Beagle de 3 años",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Los vecinos se quejaban de los ladridos y me daba pánico salir. Con las instrucciones de Julieta, en 4 días volvió el silencio. Por fin respiro tranquila."
    },
    {
      stars: "★★★★★",
      name: "Carlos R.",
      city: "Bogotá",
      dog: "Labrador de 4 años",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Llegar a casa era ver sillones mordidos y marcos rotos. Estaba agotado. Este método le enseñó a Max a estar solo y ahora me recibe relajado."
    },
    {
      stars: "★★★★★",
      name: "Ana M.",
      city: "Buenos Aires",
      dog: "Pastor Alemán de 5 años",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      text: "Mi perro temblaba al ver las llaves y yo me sentía fatal. Reset Canino cambió eso. Ahora nos despedimos sin dramas. Es otra vida."
    },
    {
      stars: "★★★★★",
      name: "Javier P.",
      city: "Santiago",
      dog: "Galgo de 2 años",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      text: "Lloraba en cuanto cerraba la puerta y nada funcionaba. Entender su lenguaje cambió todo. Ahora se queda dormido antes de que yo salga de la casa."
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
              className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] bg-white p-8 rounded-[32px] border border-border/50 shadow-sm flex flex-col h-full select-none"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-dark/90 leading-relaxed italic mb-8 flex-grow text-lg">"{t.text}"</p>
              <div className="mt-auto pt-6 border-t border-border/30 flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-dark font-bold text-base">{t.name}</p>
                  <p className="text-gray-text text-sm">
                    {t.city} • Dueño de {t.dog}
                  </p>
                </div>
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
              index === i ? "w-10 bg-primary" : "w-2 bg-gray-200"
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
  const [showPopup, setShowPopup] = useState(false);
  const [, setHasClosedPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, []);

  useEffect(() => {
    const popupDismissed = sessionStorage.getItem("popupDismissed") === "true";
    const popupClosed = sessionStorage.getItem("popupClosed") === "true";
    if (popupDismissed || popupClosed) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const scrollPercent = scrollTop / (fullHeight - windowHeight);

      if (scrollPercent > 0.85) {
        setShowPopup(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <Section className="pt-12 md:pt-20 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="text-primary font-bold uppercase tracking-[0.2em] mb-6 text-sm">
              PARA PERROS CON ANSIEDAD POR SEPARACIÓN
            </p>

            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 text-dark">
              ¿Tu perro destroza, ladra y entra en pánico cuando te vas?
            </h1>

            <p className="text-xl md:text-2xl mt-4 text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Reset Canino es el método de regulación emocional que en menos de 2 semanas ha ayudado a más de 1.200 dueños a salir de casa sin culpa, sin destrozos y sin miedo a lo que se van a encontrar al volver.
            </p>

            {/* VSL VIDEO */}
            <div className="mt-10 mb-8 max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-black">
              <video 
                className="w-full h-auto block"
                controls
                playsInline
              >
                <source src="/julieta-vsl.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <p className="text-lg font-bold text-primary">
                ★★★★★ Más de 1.200 dueños ya lo están aplicando
              </p>
            </div>

            <div className="mt-10 mb-2">
              <Button 
                onClick={() => handleCheckout('hero_top_cta')} 
                className="text-xl md:text-2xl py-6 max-w-xl mx-auto shadow-xl hover:scale-[1.02]"
              >
                Acceder ahora por $14.97 USD — Garantía 15 días
              </Button>

              {/* BONUS IA */}
              <div className="mt-8 max-w-xl mx-auto bg-gradient-to-br from-primary/10 to-transparent border-2 border-dashed border-primary/40 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                <div className="flex items-start gap-4 text-left">
                  <div className="bg-primary text-white p-3 rounded-xl shrink-0 shadow-md">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-dark leading-tight mb-2">
                      BONUS ESPECIAL: Asistente de ayuda paso a paso 🤖
                    </h4>
                    <p className="text-sm text-gray-text leading-relaxed mb-4">
                      Resuelve tus dudas al instante mientras aplicas el método con tu perro, para que sepas qué hacer, cuándo hacerlo y cómo corregir errores comunes. ✨
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-tight bg-primary/10 w-fit px-3 py-1 rounded-full">
                      <Zap className="w-3 h-3 fill-primary" />
                      <span>Incluido gratis por tiempo limitado</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex flex-col items-center">
                <img 
                  src="/mockup.png" 
                  alt="Mockup del curso" 
                  className="w-full max-w-3xl rounded-xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <p className="mt-6 text-gray-500 text-sm md:text-base font-medium tracking-wide">
                  Acceso inmediato · Pago único · Garantía 15 días
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 2) PROBLEMA */}
      <Section bg="gray">
        <Reveal className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Si tu perro sufre ansiedad por separación, probablemente esto te pasa cada vez que sales de casa:</h2>
          <div className="grid gap-4 text-left">
            {[
              "Sales de casa con culpa porque sabes que tu perro empezará a ladrar en cuanto cierres la puerta.",
              "Vuelves a casa con miedo de abrir la puerta.",
              "Los vecinos ya se han quejado del ruido.",
              "Has probado juguetes “mágicos”, cámaras o más paseos… y nada cambia."
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-[18px] border border-border shadow-soft">
                <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span className="font-bold text-dark text-lg">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 3) TRANSFORMACIÓN */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-8 tracking-tight">
              De ansiedad y destrozos… a calma y equilibrio
            </h2>
            
            <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-black mb-8">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                playsInline
                controls
              >
                <source src="/video-landing-rc.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>

            <p className="text-xl md:text-2xl text-dark font-bold mb-4 leading-relaxed max-w-3xl mx-auto">
              No es magia. Es entender lo que tu perro siente y aplicar el método correcto.
            </p>
            
            <p className="text-lg text-gray-text font-medium">
              Esto es exactamente lo que aprenderás dentro de Reset Canino.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 4) SOLUCIÓN */}
      <Section bg="gray">
        <Reveal className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Reset Canino: El camino hacia la independencia emocional</h2>
          <p className="text-xl text-gray-text mb-12 leading-relaxed">
            Un método paso a paso para que tu perro aprenda a quedarse solo sin pánico, sin ladridos y sin destrozar la casa. Diseñado para que cualquier dueño pueda aplicarlo sin necesidad de conocimientos previos.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                phase: "Fase 1", 
                title: "Desactivación", 
                desc: "Identificamos y eliminamos los disparadores que ponen a tu perro en alerta máxima antes de que salgas." 
              },
              { 
                phase: "Fase 2", 
                title: "Regulación", 
                desc: "Enseñamos a tu perro herramientas de calma para que aprenda a bajar sus pulsaciones por sí mismo." 
              },
              { 
                phase: "Fase 3", 
                title: "Autonomía", 
                desc: "Consolidamos la seguridad de tu perro para que la soledad sea un momento de descanso, no de pánico." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-border text-center relative group hover:border-primary/50 transition-colors">
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

      {/* 5) QUÉ RECIBES */}
      <Section id="oferta">
        <Reveal className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-dark tracking-tight leading-tight">
            Esto no es teoría. Es el sistema completo para recuperar la calma en tu casa.
          </h2>
        </Reveal>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 md:p-16 rounded-[40px] border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-12 py-3 rotate-45 translate-x-12 translate-y-6 font-bold text-sm tracking-widest z-50">
              OFERTA ESPECIAL
            </div>
            
            <div className="pt-4 text-center">
              <div className="grid md:grid-cols-2 gap-10 items-center text-left mb-12">
                <div className="w-full">
                  <img 
                    src="/imag-ps.png" 
                    alt="Oferta Reset Canino" 
                    className="w-full h-auto rounded-xl shadow-md object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <h4 className="text-2xl font-bold text-dark">Lo que te llevas hoy:</h4>
                      <ul className="space-y-3">
                        {[
                          { name: "Método Reset Canino ", val: 22 },
                          { name: "Bono 1: Guía Errores Invisibles", val: 11 },
                          { name: "Bono 2: Audio Guía Regulación", val: 13 },
                          { name: "Bono 3: Video Resumen Paso a Paso", val: 9 },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center justify-between gap-4 text-sm md:text-base">
                            <span className="flex items-center gap-2 text-gray-text">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                              {item.name}
                            </span>
                            <span className="text-gray-400 font-medium line-through">${item.val} USD</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-bg p-8 rounded-[32px] text-center border border-border">
                      <p className="text-lg text-gray-text font-bold mb-2">Valor total: <span className="line-through">$55 USD</span></p>
                      <p className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                        Hoy por solo $14.97 USD
                      </p>
                      <div className="bg-primary text-white inline-block px-4 py-1 rounded-lg font-bold text-sm mb-6">
                        AHORRAS $40 USD (73% DTO)
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <Button onClick={() => handleCheckout('offer_section')} className="text-xl py-6 w-full max-w-md shadow-xl">
                      QUIERO EMPEZAR HOY POR $14.97 USD
                    </Button>
                    <SecurityBadges className="md:!justify-start" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6) GARANTÍA */}
      <Section bg="gray">
        <Reveal className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[32px] border border-border text-center">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dark">Pruébalo 15 días sin riesgo</h2>
          <p className="text-lg text-dark font-medium mb-4">Si después de aplicar el método sientes que no es para ti o que tu perro no mejora, te devolvemos el dinero.</p>
          <p className="text-base text-gray-text leading-relaxed">
            Sin preguntas. Sin complicaciones.
          </p>
        </Reveal>
      </Section>

      {/* 7) TESTIMONIOS */}
      <Section className="overflow-hidden">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Lo que dicen otros dueños de perros
          </h2>
          <p className="text-gray-text text-lg">Resultados reales de personas que ya han transformado su convivencia.</p>
        </Reveal>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </Section>

      {/* 8) FAQ */}
      <Section bg="gray">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Preguntas frecuentes</h2>
          <p className="text-xl text-gray-text">Todo lo que necesitas saber antes de empezar a ayudar a tu perro de verdad.</p>
        </Reveal>
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[32px] border border-border shadow-soft">
          <FAQItem 
            question="¿Y si ya he probado de todo?" 
            answer="Reset Canino no es adiestramiento de obediencia. Trabajamos la regulación emocional, la raíz del pánico que otros métodos ignoran." 
          />
          <FAQItem 
            question="¿Funciona con perros adultos o rescatados?" 
            answer="Absolutamente. El cerebro canino es plástico. Cualquier perro, sin importar su edad, puede aprender a sentirse seguro en soledad." 
          />
          <FAQItem 
            question="¿Tengo que dedicarle mucho tiempo al día?" 
            answer="No. El método está diseñado para dueños reales con vidas ocupadas. Con 10-15 minutos de rutinas enfocadas al día es suficiente para ver cambios reales." 
          />
          <FAQItem 
            question="¿Puede empeorar la situación?" 
            answer="Al contrario. Al trabajar desde la calma y sin castigos, reducimos el cortisol y el estrés desde el primer día." 
          />
          <FAQItem 
            question="¿Es un método respetuoso?" 
            answer="Sí, 100%. No usamos castigos, ni collares de impulsos, ni encierros forzados. Trabajamos desde la seguridad y el refuerzo de la calma." 
          />
          <FAQItem 
            question="¿Cuándo empezaré a notar cambios?" 
            answer="Muchos dueños empiezan a notar cambios en los primeros días al aplicar las rutinas del método. Cada perro es diferente, pero el objetivo es reducir el estrés y enseñar al perro a sentirse seguro cuando se queda solo." 
          />
          <FAQItem 
            question="¿Cómo recibo el contenido?" 
            answer="Inmediatamente después del pago recibirás un correo con acceso a todo el material digital y al asistente de IA para que puedas empezar hoy mismo." 
          />
        </div>
      </Section>

      {/* 9) CTA FINAL */}
      <Section className="pb-40 md:pb-48">
        <Reveal className="max-w-4xl mx-auto text-center">
          <div className="mb-12 md:mb-16 space-y-5 md:space-y-6">
            <h2 className="text-4xl md:text-7xl font-black text-dark tracking-tight leading-none">
              Tu perro no debería entrar en pánico cada vez que sales de casa.
            </h2>
            <p className="text-xl md:text-2xl text-gray-text max-w-2xl mx-auto">
              Y tú tampoco deberías vivir con miedo a lo que encontrarán al volver.
            </p>
          </div>
          
          <div className="bg-white px-6 py-10 md:px-10 md:py-14 rounded-[28px] md:rounded-[40px] shadow-2xl text-dark border border-border relative overflow-hidden max-w-3xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-bg/50 pointer-events-none" />
            
            <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-dark">
              Por solo $14.97 USD
            </h3>

            <p className="text-lg font-bold mb-2 uppercase tracking-widest text-primary">Recupera la calma hoy.</p>
            <p className="text-sm font-semibold mb-8 text-gray-text">
              ⚠️ El precio sube a $27 USD pronto. Entra hoy y bloquea el precio más bajo.
            </p>
            
            <Button variant="primary" onClick={() => handleCheckout('final_cta')} className="max-w-md mx-auto shadow-xl mb-6">
              QUIERO QUE MI PERRO APRENDA A QUEDARSE SOLO
            </Button>

            {/* BONUS IA FINAL */}
            <div className="max-w-md mx-auto bg-primary/5 border border-dashed border-primary/40 rounded-xl p-5 mb-8 flex items-center gap-4 text-left shadow-sm">
              <div className="bg-primary text-white p-2.5 rounded-lg shadow-sm">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-dark leading-tight mb-1">BONUS: Asistente de ayuda paso a paso 🤖</p>
                <p className="text-[12px] text-gray-text leading-tight mb-2">Resuelve tus dudas al instante mientras aplicas el método. ✨</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">⚡ GRATIS POR TIEMPO LIMITADO</p>
              </div>
            </div>

            <SecurityBadges />
          </div>
        </Reveal>
      </Section>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl">
            <button
              onClick={() => {
                setShowPopup(false);
                setHasClosedPopup(true);
                sessionStorage.setItem("popupClosed", "true");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-dark"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold mb-4 text-dark">
              Recupera la calma en casa por solo $14.97 USD
            </h3>
            <p className="text-sm text-red-500 font-semibold mt-2">
              Hoy puedes cambiar esto. Mañana probablemente seguirás igual.
            </p>
            <p className="mb-6 text-gray-text leading-relaxed">
              Empieza hoy y deja de sufrir cada vez que sales de casa.
            </p>
            <p className="text-lg font-semibold text-center mt-8 text-red-500">
              Cada día que pasa sin actuar, tu perro sigue sufriendo… y tú eres quien puede cambiarlo.
            </p>
            <Button onClick={() => handleCheckout('popup_cta')} className="text-xl py-6 max-w-md mx-auto shadow-xl">
              QUIERO EMPEZAR AHORA
            </Button>
            <SecurityBadges />
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 text-sm text-gray-400 hover:text-dark"
            >
              Prefiero hacerlo más adelante
            </button>
          </div>
        </div>
      )}

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
