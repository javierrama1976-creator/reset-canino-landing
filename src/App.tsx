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
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    fbq: any;
  }
}

const CHECKOUT_URL = "https://pay.hotmart.com/V105096489F";

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

// --- Main App ---

const TestimonialCarousel = () => {
  const testimonials = [
    {
      stars: "★★★★★",
      name: "Ricardo Méndez Espinoza",
      city: "CDMX, Col. Narvarte",
      dog: "Bruno",
      breed: "Beagle",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      text: "El vecino del 4B ya me había dejado dos notas en la puerta porque Bruno se la pasaba aullando desde que me iba a la oficina hasta que regresaba. La verdad ya me daba pena hasta subirme al elevador y ni modo de dejar de trabajar, pero los difusores de feromonas que compré antes no le hicieron ni cosquillas. Con Reset Canino entendí qué estaba haciendo mal al salir y para el día 9 el silencio en el departamento ya era otro rollo. Ahora puedo irme tranquilo a ver el fut con mis amigos sin el miedo de que me hablen de la administración para quejarse.",
      highlight: "Logramos el silencio total en el departamento tras solo 9 días de práctica."
    },
    {
      stars: "★★★★★",
      name: "Sofía Villarreal Garza",
      city: "Monterrey, San Pedro",
      dog: "Koda",
      breed: "Husky Siberiano",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      text: "Koda se comió literal medio sillón y me deshizo tres pares de tenis en una sola tarde, ya no sabía qué hacer para que dejara de destruir todo. Gasté un dineral en juguetes 'indestructibles' y en un entrenador que solo me decía que lo sacara a correr más, pero el problema seguía igualito. Empecé el método de Julieta y en 14 días exactos Koda dejó de morder los muebles y por fin se queda echado en su cama cuando salgo al súper. La neta me regresó el alma al cuerpo porque ya puedo comprar cosas para mi casa sin miedo a que amanezcan destrozadas.",
      highlight: "Cero destrozos en casa después de la segunda semana del método."
    },
    {
      stars: "★★★★★",
      name: "Alejandro Torres Pozos",
      city: "Guadalajara, Zapopan",
      dog: "Pipo",
      breed: "Schnauzer miniatura",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      text: "Yo trabajo por mi cuenta y de plano ya estaba por cancelar contratos porque Pipo se ponía a gritar en cuanto me veía agarrar el maletín. La neta estaba bien escéptico por lo que cuesta el curso, pensé que por 300 pesos iba a ser puro cuento o información que ya está en YouTube, pero me callaron la boca. Para el día 18 del plan, Pipo ya se queda tranquilo hasta 6 horas seguidas sin estresarse para nada. De verdad que esto me salvó la chamba y mi paz mental, ya puedo ser productivo otra vez.",
      highlight: "Pipo pasó de no aguantar ni 5 minutos solo a quedarse 6 horas en calma total."
    },
    {
      stars: "★★★★★",
      name: "Mariana López Guerrero",
      city: "CDMX, Coyoacán",
      dog: "Luna",
      breed: "Mestizo",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
      text: "Sentía una culpa horrible cada vez que salía a ver a mis nietos porque Luna se quedaba temblando y rascando la puerta principal. Intenté darle premios caros y dejarle la tele prendida, pero la pobre ni tocaba la comida del puro pánico que le daba quedarse sola. Con las rutinas de Julieta, ese drama desapareció en menos de 12 días y Luna aprendió a confiar en que yo siempre vuelvo. Ahora disfruto mis tardes fuera de casa sin ese nudo en el estómago de sentirme una mala dueña.",
      highlight: "Eliminamos el pánico y el rascado de puertas en solo 12 días."
    },
    {
      stars: "★★★★★",
      name: "Gerardo Ruiz Cantú",
      city: "Monterrey, Guadalupe",
      dog: "Rocky",
      breed: "Border Collie",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
      text: "Ya le habíamos dado a Rocky hasta flores de Bach y pagamos dos sesiones con un conductista carísimo, pero nada más no veíamos claro. Compré Reset Canino casi por no dejar, pensando que sería otro intento fallido más, pero el enfoque de Julieta es totalmente diferente a lo que nos habían dicho. Al llegar a la tercera semana, Rocky ya ni se levanta cuando oye que prendo la camioneta para irme a mi turno de noche. Ya no tengo que estar pidiendo favores a mi familia para que lo cuiden, por fin somos independientes los dos.",
      highlight: "Resultados reales tras gastar miles de pesos en otros métodos que no sirvieron."
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
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-tight mb-8 text-dark tracking-tight">
              Tu perro llora, ladra y rompe cosas cada vez que te vas.
            </h1>

            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-primary max-w-3xl mx-auto leading-tight">
              Haz que se quede solo en calma — sin quejas de vecinos y sin miedo a lo que vas a encontrar al volver.
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-10">
              Sin castigos. Sin gritos. Sin seguir probando cosas que no funcionan.
            </p>

            <div className="flex flex-col items-center mt-10 mb-4">
              <p className="text-dark font-medium text-lg max-w-3xl leading-relaxed">
                Método creado por <span className="font-bold">Julieta Márquez</span>, <span className="text-gray-text text-sm">10+ años en conducta canina · Formada en etología aplicada · +1,200 familias</span>
              </p>
            </div>

            {/* VSL VIDEO */}
            <div className="mt-10 mb-8 max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-black relative group cursor-pointer">
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
              
              {/* Play Button Overlay (visible before playing) */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none group-[.is-playing]:hidden"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <p className="text-lg font-bold text-primary">
                ★★★★★ Más de 1,200 dueños ya recuperaron el silencio en casa
              </p>
            </div>

            <div className="mt-10 mb-2">
              <div className="mb-6 bg-red-50 border border-red-100 py-3 px-6 rounded-full inline-flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <p className="text-red-600 font-bold text-sm md:text-base">
                  ⚠️ Oferta de lanzamiento: 73% OFF disponible hoy
                </p>
              </div>

              <Button 
                onClick={() => handleCheckout('hero_top_cta')} 
                className="text-xl md:text-2xl py-8 max-w-xl mx-auto shadow-[0_20px_50px_rgba(232,160,64,0.3)] hover:scale-[1.02] bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-4 border-orange-800"
              >
                Quiero salir de casa sin culpa
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
            Si tu perro no puede quedarse solo, esto ya no es solo un problema. <span className="text-primary">Te está robando la paz todos los días.</span>
          </h2>
          
          <div className="space-y-6 text-left md:text-center">
            <p className="text-xl md:text-2xl text-dark font-medium leading-relaxed">
              Sales de casa… y a los pocos minutos ya estás pensando: <span className="italic">“¿ya empezó?”</span>
            </p>
            <p className="text-xl md:text-2xl text-dark font-medium leading-relaxed">
              Revisas el celular esperando no encontrarte con otro desastre
            </p>
            <p className="text-xl md:text-2xl text-dark font-medium leading-relaxed">
              Vuelves con el cuerpo tenso, no con tranquilidad
            </p>
            <p className="text-xl md:text-2xl text-dark font-medium leading-relaxed">
              Escuchas cualquier ruido o mensaje… y sientes que ahora sí te van a reclamar
            </p>
            <p className="text-xl md:text-2xl text-dark font-medium leading-relaxed">
              Te da culpa irte, pero también te está agotando vivir así
            </p>
          </div>

          <div className="mt-16 p-8 bg-red-50 rounded-[32px] border border-red-100">
            <p className="text-2xl md:text-3xl font-bold text-red-600 mb-6">
              Y lo peor es que mientras tú intentas aguantarlo…
            </p>
            <p className="text-xl md:text-2xl text-dark font-bold mb-4">
              tu perro no se acostumbra. Se hunde más.
            </p>
            <p className="text-lg md:text-xl text-gray-text leading-relaxed mb-6">
              No porque quiera hacerte la vida imposible. Sino porque cada vez que se queda solo, su cuerpo aprende que está en peligro.
            </p>
            <p className="text-2xl md:text-3xl font-serif font-bold text-dark italic">
              Y si no cambias eso… mañana vas a volver a vivir exactamente lo mismo.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 3) TRANSFORMACIÓN */}
      <Section bg="cream">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-dark mb-8 tracking-tight">
              De ansiedad y destrozos… a calma y equilibrio
            </h2>
            
            <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-white mb-8 group">
              <img 
                src="/experta.png" 
                alt="Experta Julieta Márquez" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
                <div className="bg-dark/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                  <Award className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Etología Aplicada</span>
                </div>
                <div className="bg-dark/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                  <Users className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">+1,200 Familias</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xl font-bold text-dark">Julieta Márquez</p>
              <p className="text-sm text-gray-text font-medium">10+ años en conducta canina · Formada en etología aplicada · +1,200 familias</p>
            </div>

            <p className="text-2xl md:text-3xl text-dark font-bold mb-8 leading-tight max-w-3xl mx-auto">
              No necesitas cansarlo más. Necesitas enseñarle a estar solo sin entrar en pánico.
            </p>

            <div className="max-w-2xl mx-auto text-left mb-12 bg-white/50 p-8 rounded-[32px] border border-border/50">
              <p className="text-lg md:text-xl text-gray-text font-bold mb-4">La mayoría de los dueños intenta resolver esto con:</p>
              <ul className="space-y-3 mb-6">
                {["más juguetes", "más premios", "más paseos", "más “a ver si esta vez aguanta”"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-dark font-medium">
                    <span className="text-primary text-xl">•</span> {item}
                  </li>
                ))}
              </ul>
              <p className="text-xl text-primary font-bold italic">Y por eso el problema sigue.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 mb-12">
              <p className="text-xl md:text-2xl text-dark font-medium leading-relaxed">
                Porque la ansiedad por separación <span className="font-bold underline decoration-primary/30">no se corrige distrayendo a tu perro.</span>
              </p>
              <p className="text-2xl md:text-3xl text-dark font-bold leading-tight">
                Se corrige reentrenando cómo vive tu ausencia.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-orange-600/20 rounded-[44px] blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-dark text-white p-10 md:p-16 rounded-[40px] shadow-2xl overflow-hidden border border-white/10">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px bg-primary/50 flex-grow" />
                    <span className="text-primary font-bold text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap">Método Probado</span>
                    <div className="h-px bg-primary/50 flex-grow" />
                  </div>

                  <h3 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight text-center">
                    Eso es exactamente lo que trabaja <span className="text-primary">Reset Canino:</span>
                  </h3>

                  <div className="max-w-2xl mx-auto text-center mb-12">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-90">
                      Un proceso <span className="text-white font-bold">simple, guiado y aplicable en casa</span> para que tu perro deje de entrar en crisis cuando te vas.
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="shrink-0">
                      <div className="w-20 h-20 rounded-full border-2 border-primary p-1">
                        <img 
                          src="/experta.png" 
                          alt="Julieta Márquez" 
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-lg md:text-xl font-medium leading-relaxed italic opacity-90">
                        Desarrollado por <span className="text-primary font-bold">Julieta Márquez</span>, <span className="text-white/70 text-sm block md:inline not-italic">10+ años en conducta canina · Formada en etología aplicada · +1,200 familias</span>
                      </p>
                      
                      {/* Trust Badges */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                          <Award className="w-4 h-4 text-primary" />
                          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">10+ años exp.</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                          <Globe className="w-4 h-4 text-primary" />
                          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">Etología Aplicada</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">+1,200 Familias</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 4) SOLUCIÓN */}
      <Section bg="white">
        <Reveal className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Del miedo a la libertad en 3 pasos</h2>
          <p className="text-xl text-gray-text mb-12 leading-relaxed">
            Un método paso a paso para que tu perro aprenda a quedarse solo sin pánico, sin ladridos y sin destrozar la casa. Diseñado para que cualquier dueño pueda aplicarlo sin necesidad de conocimientos previos.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                phase: "Fase 1", 
                title: "El Alivio de Entender", 
                desc: "Dejas de adivinar y entiendes por fin qué le pasa a tu perro. Sientes que hay una luz al final del túnel." 
              },
              { 
                phase: "Fase 2", 
                title: "La Calma de Avanzar", 
                desc: "Empiezas a ver los primeros minutos de silencio real. Sientes que recuperas el control de tu tiempo." 
              },
              { 
                phase: "Fase 3", 
                title: "La Libertad Total", 
                desc: "Sales de casa con la seguridad de que al volver todo estará en orden. Sientes paz mental absoluta." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-warm-white p-8 rounded-[24px] border border-border text-center relative group hover:border-primary/50 transition-colors">
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
      <Section id="oferta" bg="cream">
        <Reveal className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-dark tracking-tight leading-tight">
            Esto no es teoría. Es el sistema completo para recuperar la calma en tu casa.
          </h2>
        </Reveal>

        {/* MOCKUP IA */}
        <div className="mb-12 max-w-3xl mx-auto">
          <img 
            src="/mockup.ia.png" 
            alt="Asistente IA Mockup" 
            className="w-full h-auto rounded-2xl shadow-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* MOCKUP */}
        <div className="mb-16 flex flex-col items-center">
          <img 
            src="/mockup.png" 
            alt="Mockup del curso" 
            className="w-full max-w-3xl rounded-xl shadow-lg"
            referrerPolicy="no-referrer"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-dark font-bold">
              <div className="bg-primary/10 p-2 rounded-full">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm md:text-base">Acceso inmediato</span>
            </div>
            <div className="flex items-center gap-2 text-dark font-bold">
              <div className="bg-primary/10 p-2 rounded-full">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm md:text-base">Pago único</span>
            </div>
            <div className="flex items-center gap-2 text-dark font-bold">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm md:text-base">Garantía 15 días</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 md:p-12 rounded-[28px] md:rounded-[40px] shadow-2xl text-dark border border-border relative overflow-hidden max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center text-left">
              <div className="w-full">
                <img 
                  src="/imag-ps.png" 
                  alt="Oferta Completa Reset Canino" 
                  className="w-full h-auto rounded-xl shadow-md object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-bold leading-tight text-dark">
                  Hoy puedes seguir viviendo con ladridos, culpa y destrozos… o empezar a terminar con esto.
                </p>
                <p className="text-lg font-medium text-gray-text">
                  Esto es lo que te llevas con Reset Canino:
                </p>

                <ul className="space-y-6">
                  {[
                    { icon: "✅", name: "Reset Canino — Sistema completo paso a paso", desc: "Aprende cómo hacer que tu perro tolere tu ausencia sin entrar en crisis", val: 22 },
                    { icon: "🎁", name: "Guía de Errores Invisibles", desc: "Corrige lo que empeora la ansiedad sin darte cuenta", val: 11 },
                    { icon: "🎁", name: "Audio de Regulación Emocional", desc: "Ayuda a bajar la ansiedad antes de trabajar la separación", val: 13 },
                    { icon: "🎁", name: "Video Resumen Paso a Paso", desc: "Para aplicar el método sin perderte", val: 9 },
                    { icon: "🎁", name: "Asistente IA de Acompañamiento", desc: "Te guía cuando no sepas qué hacer", val: 15 },
                  ].map((item, i) => (
                    <li key={i} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 font-bold text-dark text-lg">
                          <span>{item.icon}</span>
                          {item.name}
                        </span>
                        <span className="text-gray-400 font-medium line-through shrink-0">${item.val} USD</span>
                      </div>
                      <p className="text-sm text-gray-text ml-8">{item.desc}</p>
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-bg p-6 rounded-2xl border border-border text-center">
                  <p className="text-sm text-gray-text font-bold mb-1 line-through opacity-50">Valor total: $70 USD</p>
                  <p className="text-4xl font-black text-dark tracking-tight mb-2">
                    Hoy: solo $14.97 USD
                  </p>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">
                    ⚠️ Precio de lanzamiento activo por tiempo limitado
                  </p>
                </div>
                
                <Button variant="primary" onClick={() => handleCheckout('offer_section')} className="w-full shadow-[0_0_30px_rgba(234,88,12,0.4)] bg-gradient-to-r from-orange-500 to-orange-600 btn-shine border-2 border-white/20 text-xl py-8">
                  QUIERO SALIR DE CASA TRANQUILO
                </Button>

                <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-xs font-bold text-gray-text uppercase tracking-widest mt-4">
                  <span className="flex items-center gap-1.5">🔒 Pago seguro</span>
                  <span className="flex items-center gap-1.5">✅ Acceso inmediato</span>
                  <span className="flex items-center gap-1.5">🛡️ Garantía de 15 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6) GARANTÍA */}
      <Section bg="white">
        <Reveal className="max-w-4xl mx-auto bg-warm-white p-8 md:p-16 rounded-[40px] border border-border text-center shadow-xl">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-dark">No quiero que compres con duda.</h2>
          
          <div className="space-y-6 text-lg md:text-xl text-dark font-medium leading-relaxed mb-12">
            <p>Quiero que entres, lo apliques y veas el cambio. Por eso tienes una <span className="text-primary font-bold">garantía de 15 días.</span></p>
            <p>Si entras a Reset Canino, aplicas el método y sientes que tu perro no está más tranquilo cuando te vas, solo nos escribes y te devolvemos tu dinero.</p>
            <p className="font-bold">Sin preguntas. Sin peleas. Sin complicaciones.</p>
          </div>

          <div className="h-px bg-border w-full mb-12" />

          <div className="space-y-8 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-tight">El riesgo no es entrar. El riesgo es seguir viviendo lo mismo.</h3>
            
            <div className="grid gap-3 text-left max-w-2xl mx-auto">
              {[
                "Seguir saliendo con culpa.",
                "Seguir volviendo con miedo.",
                "Seguir escuchando ladridos, soportando quejas y encontrando destrozos.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <p className="text-lg text-gray-text font-medium">{text}</p>
                </div>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-dark font-bold italic">
              Y mientras tanto… tu perro sigue sufriendo cada vez que cierras la puerta.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[40px] mb-12 group">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?q=80&w=1200&auto=format&fit=crop" 
                alt="Perro tranquilo en casa" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/85 to-dark/95 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-16 text-left md:text-center">
              <p className="text-2xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight">
                Tu perro <span className="text-primary italic">sí puede</span> aprender a quedarse solo. <br className="hidden md:block" />
                Pero no va a pasar si sigues improvisando.
              </p>
              
              <div className="max-w-2xl mx-auto mb-10">
                <p className="text-lg text-white/70 font-medium mb-6 uppercase tracking-widest">Puedes seguir con:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {["los ladridos", "la culpa", "los destrozos", "las quejas", "el miedo de salir"].map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-bold text-sm md:text-base backdrop-blur-sm">
                      <span className="text-red-400 mr-2">✕</span>{item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="inline-block px-8 py-4 bg-primary/20 border border-primary/30 rounded-2xl backdrop-blur-md">
                <p className="text-2xl md:text-4xl font-serif font-bold text-primary">
                  O puedes empezar hoy a cambiar eso de verdad.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <Button 
              variant="primary" 
              onClick={() => handleCheckout('guarantee_section')} 
              className="w-full text-xl md:text-2xl py-8 shadow-[0_20px_50px_rgba(232,160,64,0.3)] bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-4 border-orange-800"
            >
              QUIERO SALIR DE CASA TRANQUILO
              <CheckCircle2 className="w-6 h-6 ml-2" />
            </Button>

            <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-xs font-bold text-gray-text uppercase tracking-widest mt-6">
              <span className="flex items-center gap-1.5">🔒 Pago seguro</span>
              <span className="flex items-center gap-1.5">✅ Acceso inmediato</span>
              <span className="flex items-center gap-1.5">🛡️ Garantía de 15 días</span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 7) TESTIMONIOS */}
      <Section bg="cream" className="overflow-hidden">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-4">
            Resultados reales de dueños reales
          </h2>
          <p className="text-gray-text text-lg">Personas que ya han transformado su convivencia y recuperado su libertad.</p>
        </Reveal>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {/* Testimonio 1 */}
          <div className="bg-warm-white p-8 rounded-[32px] shadow-sm border border-border flex flex-col hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://picsum.photos/seed/selfie-man/200/200" 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
                alt="Juan Carlos R."
              />
              <div>
                <p className="text-dark font-bold leading-tight text-lg">Juan Carlos R.</p>
                <p className="text-xs text-gray-text font-medium">Thor · Husky Siberiano</p>
                <p className="text-[10px] text-gray-text opacity-70">📍 CDMX, Col. Roma</p>
              </div>
            </div>
            <h4 className="text-dark font-bold mb-3 leading-tight">“Mi Husky convertía cada salida en una pesadilla”</h4>
            <p className="text-dark/80 text-sm md:text-base leading-relaxed mb-6 flex-grow italic">“Yo ya no podía salir ni 20 minutos sin abrir la cámara para ver qué estaba pasando. Thor aullaba, arañaba la puerta y ya me habían tocado los vecinos dos veces. Empecé a aplicar Reset Canino y en menos de 10 días el ruido bajó muchísimo. Por primera vez sentí que sí había una salida real.”</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
            </div>
          </div>

          {/* Testimonio 2 */}
          <div className="bg-warm-white p-8 rounded-[32px] shadow-sm border border-border flex flex-col hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=200&h=200&auto=format&fit=crop" 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
                alt="Elena Villarreal"
              />
              <div>
                <p className="text-dark font-bold leading-tight text-lg">Elena Villarreal</p>
                <p className="text-xs text-gray-text font-medium">Milo · Bulldog Francés</p>
                <p className="text-[10px] text-gray-text opacity-70">📍 Guadalajara, Jalisco</p>
              </div>
            </div>
            <h4 className="text-dark font-bold mb-3 leading-tight">“Mi Frenchie no me dejaba vivir tranquila”</h4>
            <p className="text-dark/80 text-sm md:text-base leading-relaxed mb-6 flex-grow italic">“Antes no podía ir ni al cine sin sentir culpa. Milo lloraba, ladraba y me iba con el corazón apretado cada vez que salía. Después de aplicar el método, pude salir varias horas y al volver estaba calmado. No fue solo un cambio para él… fue un descanso mental para mí.”</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
            </div>
          </div>

          {/* Testimonio 3 */}
          <div className="bg-warm-white p-8 rounded-[32px] shadow-sm border border-border flex flex-col hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
                alt="Roberto Garza"
              />
              <div>
                <p className="text-dark font-bold leading-tight text-lg">Roberto Garza</p>
                <p className="text-xs text-gray-text font-medium">Nala · Pastor Australiano</p>
                <p className="text-[10px] text-gray-text opacity-70">📍 Monterrey, N.L.</p>
              </div>
            </div>
            <h4 className="text-dark font-bold mb-3 leading-tight">“Pensé que mi perro era un caso perdido”</h4>
            <p className="text-dark/80 text-sm md:text-base leading-relaxed mb-6 flex-grow italic">“Había probado juguetes, premios y videos de internet, pero nada cambia de verdad. Nala seguía ladrando, corriendo por toda la casa y rompiendo cosas cuando me iba. Con Reset Canino logramos los primeros 30 minutos de calma real y ahí entendí que no necesitaba seguir improvisando.”</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
            </div>
          </div>
        </div>
      </Section>

      {/* 8) FAQ */}
      <Section bg="white">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Preguntas frecuentes</h2>
          <p className="text-xl text-gray-text">Todo lo que necesitas saber antes de empezar a ayudar a tu perro de verdad.</p>
        </Reveal>
        <div className="max-w-3xl mx-auto bg-warm-white p-8 md:p-12 rounded-[32px] border border-border shadow-soft">
          <FAQItem 
            question="¿Y si mi perro es muy ansioso / caso extremo?" 
            answer="Precisamente por eso existe Reset Canino. El método no se basa en 'trucos', sino en regular el sistema nervioso de tu perro. Hemos trabajado con casos que llevaban años de ansiedad y han logrado quedarse solos con éxito." 
          />
          <FAQItem 
            question="¿Esto funciona o es otro curso que no sirve?" 
            answer="Entiendo tu miedo, muchos dueños llegan aquí después de gastar fortunas en entrenadores que no entienden la ansiedad. Este no es un curso de obediencia (sentarse o dar la pata); es un sistema de rehabilitación emocional diseñado para resultados reales y medibles." 
          />
          <FAQItem 
            question="¿Cuánto tiempo al día necesito dedicarle?" 
            answer="El método está diseñado para personas con vidas ocupadas. Solo necesitas entre 15 y 20 minutos al día para realizar los ejercicios prácticos. Lo más importante es la constancia, no la cantidad de horas." 
          />
          <FAQItem 
            question="¿Recibiré el acceso de inmediato?" 
            answer="¡Sí! En cuanto completes tu pago, recibirás un correo electrónico automático con tus datos de acceso a la plataforma. Podrás empezar a ver las lecciones y aplicar el método hoy mismo, sin esperas." 
          />
          <FAQItem 
            question="¿Por qué cuesta tan poco si funciona de verdad?" 
            answer="Porque Julieta Márquez cree que la paz mental no debería ser un lujo. Queremos que el precio no sea la excusa para que tu perro siga sufriendo. Es un pago único que te ahorra cientos de dólares en muebles destruidos y sesiones de entrenamiento presencial." 
          />
        </div>
      </Section>

      {/* 9) CTA FINAL */}
      <Section bg="cream" className="py-20">
        <Reveal className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-primary/20">
            <Zap className="w-4 h-4 fill-primary" />
            <span>Oferta por tiempo limitado</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10 text-dark">
            ¿Listo para recuperar tu libertad y la paz de tu perro?
          </h2>

          <Button 
            variant="primary" 
            onClick={() => handleCheckout('final_cta')} 
            className="text-xl md:text-2xl py-8 max-w-2xl mx-auto shadow-[0_20px_50px_rgba(232,160,64,0.3)] hover:scale-[1.02] bg-gradient-to-r from-primary to-orange-600 btn-shine border-b-4 border-orange-800"
          >
            Quiero salir de casa sin culpa
            <CheckCircle2 className="w-6 h-6 ml-2" />
          </Button>
          
          <div className="mt-8">
            <SecurityBadges />
          </div>
          
          <p className="mt-6 text-gray-text text-sm font-medium">
            Únete a más de 1,200 familias que ya transformaron su vida.
          </p>
        </Reveal>
      </Section>

      <SocialProofNotification />

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
