import React, { useEffect, useState, useRef } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  BookOpen, 
  Zap,
  X, 
  MessageCircle,
  PlayCircle,
  Headphones,
  Brain,
  Clock,
  ChevronDown,
  ChevronUp,
  Lock,
  RefreshCw,
  Maximize2,
  Sparkles,
  Loader2
} from "lucide-react";
import { generateHeroImage, editHeroImage } from "./services/imageService";
import { GoogleGenAI } from "@google/genai";

const CHECKOUT_URL = "https://mascotaequilibrada.com/cart/57475776184707:1";

// --- Components ---

const Button = ({ 
  children, 
  className = "", 
  variant = "primary", 
  onClick,
  disabled = false
}: { 
  children: React.ReactNode, 
  className?: string, 
  variant?: "primary" | "secondary" | "outline",
  onClick?: () => void,
  disabled?: boolean
}) => {
  const baseStyles = "w-full py-4 px-8 rounded-[14px] font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:brightness-110 shadow-soft",
    secondary: "bg-dark text-white hover:bg-dark/90 shadow-soft",
    outline: "bg-transparent border border-border text-dark hover:bg-gray-bg"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
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

// --- Main App ---

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasClickedCTA, setHasClickedCTA] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const imageUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      const img = await generateHeroImage();
      if (img) setHeroImage(img);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOutpaintImage = async () => {
    if (!heroImage && !document.querySelector('img[alt="Perro arañando la puerta por ansiedad"]')) return;
    
    setIsGenerating(true);
    try {
      const currentSrc = heroImage || (document.querySelector('img[alt="Perro arañando la puerta por ansiedad"]') as HTMLImageElement).src;
      const base64 = await imageUrlToBase64(currentSrc);
      const extendedImg = await editHeroImage(base64);
      if (extendedImg) setHeroImage(extendedImg);
    } catch (error) {
      console.error("Error outpainting image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // handleGenerateImage(); // Removed to use the static hero image requested by the user
  }, []);

  const handleCheckout = () => {
    setHasClickedCTA(true);
    window.location.href = CHECKOUT_URL;
  };

  const scrollToOffer = () => {
    setHasClickedCTA(true);
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
  };

  // Popup Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.8 && !localStorage.getItem("popup_shown")) {
        setShowPopup(true);
        localStorage.setItem("popup_shown", "true");
      }
    };

    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && hasClickedCTA && !localStorage.getItem("popup_shown")) {
        setShowPopup(true);
        localStorage.setItem("popup_shown", "true");
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleExitIntent);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [hasClickedCTA]);

  return (
    <div className="min-h-screen">
      {/* 1) HERO (Impacto inmediato) */}
      <Section className="pt-12 md:pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm">
              Atención: Si tu perro sufre cuando te vas...
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-dark tracking-tight">
              ¿Tu perro ladra, destruye cosas o araña puertas cuando sales de casa?
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-primary mb-6">
              No es desobediencia. Es ansiedad por separación.
            </p>
            <p className="text-xl md:text-2xl text-gray-text mb-8 leading-relaxed max-w-2xl mx-auto">
              Con el método Reset Canino aprenderás cómo ayudar a tu perro a recuperar la calma en casa en solo 10-15 minutos al día.
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <Button onClick={handleCheckout} className="text-xl py-6 shadow-xl mb-4">
                Quiero ayudar a mi perro ahora
              </Button>
              <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-text uppercase tracking-widest">
                <span className="flex items-center gap-1">✔ Acceso inmediato</span>
                <span className="flex items-center gap-1">✔ Pago seguro</span>
                <span className="flex items-center gap-1">✔ Garantía 7 días</span>
              </div>
            </div>

            <div className="bg-gray-bg p-6 rounded-[14px] border border-border mb-8 inline-block text-left">
              <p className="text-lg text-dark leading-relaxed">
                Aprenderá a calmarse solo en casa sin necesidad de fármacos ni métodos costosos.
              </p>
              <p className="mt-4 font-bold text-dark flex flex-wrap gap-4">
                <span>Sin castigos.</span>
                <span>Sin métodos agresivos.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 1.5) VIDEO + CTA + GARANTÍAS */}
      <Section className="pt-0 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-lg font-bold text-dark mb-6">
              🔊 Activa el sonido. En menos de 30 segundos entenderás por qué tu perro se descontrola cuando sales de casa.
            </p>
            <div className="mb-10 shadow-2xl overflow-hidden rounded-[20px] border border-border max-w-[320px] mx-auto bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="auto" 
                className="w-full aspect-[9/16] object-cover cursor-pointer" 
                style={{ borderRadius: "20px" }}
                onClick={(e) => {
                  e.currentTarget.muted = false;
                  e.currentTarget.play();
                }}
              >
                <source src="/video-rc-3.mp4" type="video/mp4" />
              </video>
            </div>

            <Button onClick={handleCheckout} className="mb-6 text-xl py-6 max-w-md mx-auto">
              Quiero empezar Reset Canino ahora
            </Button>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-text uppercase tracking-wider">
              <span className="flex items-center gap-1">✔ Garantía 7 días</span>
              <span className="flex items-center gap-1">✔ Pago seguro</span>
              <span className="flex items-center gap-1">✔ Acceso inmediato</span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 1.55) LA HISTORIA DETRÁS DEL MÉTODO */}
      <Section bg="gray">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">La razón por la que creé Reset Canino</h2>
            <div className="space-y-6 text-lg text-gray-text leading-relaxed">
              <p>
                Todo empezó con Bruno. Cada vez que cogía las llaves, su mirada cambiaba. Al volver, encontraba la puerta arañada y a Bruno agotado de tanto ladrar.
              </p>
              <p>
                Pensaba que era exceso de energía y lo paseaba más, pero nada funcionaba. Fue entonces cuando entendí que el problema no era físico, sino <strong>ansiedad anticipatoria</strong>.
              </p>
              <p>
                Bruno no era un "perro malo", solo estaba aterrorizado por mi ausencia. Diseñé estas rutinas para enseñarle a sentirse seguro solo. Hoy, Bruno duerme tranquilo mientras yo no estoy, y esa paz es la que quiero para ti y tu perro.
              </p>
            </div>
            <div className="mt-12 text-center">
              <Button onClick={handleCheckout} className="max-w-md mx-auto">
                Empezar Reset Canino ahora
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 1.6) IMAGEN DEL PERRO ARAÑANDO */}
      <Section className="pt-0 pb-16">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-[20px] blur-2xl -z-10" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] shadow-2xl border border-border">
                <img 
                  src={heroImage || "/perro-puerta.jpg"} 
                  alt="Perro arañando la puerta por ansiedad" 
                  className={`w-full h-full object-cover transition-all duration-700 ${isGenerating ? 'opacity-40 scale-105 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
                  fetchPriority="high"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                      <span className="text-sm font-bold text-dark bg-white/80 px-3 py-1 rounded-full">Adaptando formato 1080x1350...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button 
                  onClick={handleOutpaintImage}
                  disabled={isGenerating}
                  className="bg-white/90 hover:bg-white text-dark p-3 rounded-full shadow-lg transition-all active:scale-90 disabled:opacity-50 z-10 border border-border"
                  title="Adaptar a formato vertical (1080x1350)"
                >
                  <Maximize2 className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : ''}`} />
                </button>
                <button 
                  onClick={handleGenerateImage}
                  disabled={isGenerating}
                  className="bg-white/90 hover:bg-white text-dark p-3 rounded-full shadow-lg transition-all active:scale-90 disabled:opacity-50 z-10 border border-border"
                  title="Regenerar imagen"
                >
                  <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>


      {/* 2) IDENTIFICACIÓN DEL PROBLEMA */}
      <Section bg="gray">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Si tu perro hace esto cuando te vas…</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left mt-8">
            {[
              "Araña la puerta cuando sales",
              "Ladra o llora durante horas",
              "Rompe cosas en casa",
              "Se activa cuando coges las llaves",
              "No sabe relajarse solo"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-5 rounded-[14px] border border-border shadow-soft">
                <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                <span className="font-bold text-dark">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="text-center">
          <div className="inline-block bg-white p-8 rounded-[14px] border border-border shadow-soft max-w-2xl">
            <p className="text-xl font-bold text-dark mb-4">Esto no es mala conducta.</p>
            <p className="text-lg text-gray-text leading-relaxed">
              Es un problema de <span className="text-primary font-bold">activación emocional</span> y ansiedad anticipatoria.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* PARA QUIÉN ES / PARA QUIÉN NO */}
      <Section>
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Para quién es Reset Canino? (y para quién NO)</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[14px] border border-border shadow-soft">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-6 h-6" /> Es para ti si…
            </h3>
            <ul className="space-y-4">
              {[
                "Se activa cuando te preparas para salir.",
                "Hay ladridos, llanto, rascado o destrucción estando solo.",
                "Quieres un método amable (sin castigos ni gritos).",
                "Necesitas algo simple: 10–15 min/día."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-text leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-[14px] border border-border shadow-soft">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-600">
              <XCircle className="w-6 h-6" /> No es para ti si…
            </h3>
            <ul className="space-y-4">
              {[
                "Buscas una “solución mágica” sin aplicar rutinas.",
                "Quieres métodos duros/agresivos para “dominar”.",
                "No puedes dedicar ni 10 minutos al día durante una semana.",
                "Tu caso requiere atención veterinaria urgente (dolor, enfermedad)."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-text leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 2.5) VISUALIZACIÓN DE LA TRANSFORMACIÓN (ESTÁTICA) */}
      <Section bg="dark">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <div className="w-[90%] md:w-full mx-auto">
              <div className="relative aspect-[9/16] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl mb-8">
                <img 
                  src="/ayd-1.jpg" 
                  alt="Transformación Reset Canino: Antes y Después" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay labels for clarity since it's a single image */}
                <div className="absolute top-6 left-6">
                  <span className="bg-red-600/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    ANTES
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-green-600/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    DESPUÉS
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-center">
                <p className="text-gray-400 text-lg font-medium">
                  ANTES: ansiedad y destrucción cuando te vas
                </p>
                <p className="text-primary text-lg font-bold">
                  DESPUÉS: calma y tranquilidad en casa
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <Button onClick={scrollToOffer} className="max-w-md mx-auto">
                Sí, quiero que mi perro esté tranquilo
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 3) CAMBIO DE PERSPECTIVA */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">El error que cometen la mayoría de dueños</h2>
            <div className="space-y-6 text-lg text-gray-text leading-relaxed">
              <p>Muchos intentan cansar más al perro.</p>
              <div className="flex flex-col gap-2 font-bold text-dark">
                <span>Más paseos.</span>
                <span>Más juego.</span>
              </div>
              <p>Pero eso no soluciona la activación mental.</p>
              <p className="bg-primary/5 p-6 rounded-[14px] border-l-4 border-primary text-dark font-medium">
                Tu perro necesita aprender a <span className="text-primary font-bold">regularse emocionalmente</span>. Eso es lo que enseña Reset Canino.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 4) PRESENTACIÓN DEL MÉTODO */}
      <Section bg="gray">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Reset Canino: sistema paso a paso para recuperar la calma en casa</h2>
          <p className="text-lg text-primary font-bold mb-8">
            Basado en principios de comportamiento canino y aplicado por más de 1.000 dueños que querían ayudar a su perro a quedarse tranquilo en casa.
          </p>
          <p className="text-xl text-gray-text mb-12">Diseñado para dueños normales.</p>
          <div className="flex flex-wrap justify-center gap-8 text-lg font-bold text-dark">
            <div className="flex items-center gap-2"><XCircle className="text-primary" /> Sin castigos</div>
            <div className="flex items-center gap-2"><XCircle className="text-primary" /> Sin gritos</div>
            <div className="flex items-center gap-2"><XCircle className="text-primary" /> Sin métodos agresivos</div>
          </div>
        </Reveal>
      </Section>

      {/* 5) LOS PILARES DEL SISTEMA */}
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Regulación Canina", 
              desc: "Tu perro aprende a bajar su activación antes de que explote.",
              icon: <Brain className="w-8 h-8" />
            },
            { 
              title: "Rutina Anti-Hiperactividad", 
              desc: "10-15 minutos diarios que cambian su estado mental.",
              icon: <Zap className="w-8 h-8" />
            },
            { 
              title: "Comunicación Clara", 
              desc: "Tu perro entiende qué esperar cuando sales.",
              icon: <MessageCircle className="w-8 h-8" />
            },
            { 
              title: "Redirección de Conductas", 
              desc: "Canalizas su energía sin destruir tu casa.",
              icon: <ArrowRight className="w-8 h-8" />
            }
          ].map((item, i) => (
            <div key={i}>
              <Reveal className="bg-white p-8 rounded-[14px] border border-border shadow-soft h-full flex flex-col">
                <div className="text-primary mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-dark">{item.title}</h3>
                <p className="text-gray-text leading-relaxed">{item.desc}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* 6) CÓMO FUNCIONA */}
      <Section bg="gray">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo funciona el Reset Canino</h2>
        </Reveal>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { phase: "Fase 1", title: "Detectar disparadores" },
            { phase: "Fase 2", title: "Bajar activación emocional" },
            { phase: "Fase 3", title: "Entrenar calma real" }
          ].map((item, i) => (
            <div key={i}>
              <Reveal className="bg-white p-8 rounded-[14px] border border-border shadow-soft text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                  {item.phase}
                </div>
                <h4 className="text-xl font-bold text-dark mt-4">{item.title}</h4>
              </Reveal>
            </div>
          ))}
        </div>
        <Reveal className="mt-16 text-center">
          <p className="text-2xl font-bold text-primary">Solo 10-15 minutos al día.</p>
        </Reveal>
      </Section>

      {/* 7) RESULTADOS */}
      <Section>
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Resultados que muchos dueños empiezan a notar en la primera semana</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Menos activación al coger llaves",
            "Menos arañazos en puertas",
            "Menos ladridos al salir",
            "Más momentos de calma",
            "Mejor descanso en casa"
          ].map((item, i) => (
            <div key={i}>
              <Reveal className="flex items-center gap-4 bg-gray-bg p-6 rounded-[14px] border border-border">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <span className="font-bold text-dark">{item}</span>
              </Reveal>
            </div>
          ))}
        </div>

        {/* 7.5) PRECIO TEASER */}
        <Reveal className="mt-20 max-w-2xl mx-auto text-center bg-primary/5 p-10 rounded-[24px] border border-primary/20">
          <h2 className="text-3xl font-bold mb-4 text-dark">Empieza a aplicar Reset Canino hoy</h2>
          <p className="text-lg text-gray-text mb-6">
            Accede al sistema completo para ayudar a tu perro a relajarse cuando se queda solo en casa.
          </p>
          <p className="text-xl font-bold text-primary mb-8">
            Por menos de lo que cuesta un juguete para perros.
          </p>
          <Button onClick={scrollToOffer} className="max-w-md mx-auto">
            Ver cómo empezar hoy
          </Button>
        </Reveal>
      </Section>

      {/* 8) TESTIMONIOS */}
      <Section bg="gray">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Prueba Social</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Más de 1.000 dueños ya han aplicado Reset Canino para recuperar la calma en casa.</h2>
          <p className="text-gray-text">Historias reales de personas que han recuperado la paz en sus hogares.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Laura Martínez",
              province: "Madrid",
              story: "Mi perro destrozaba el sofá cada vez que me iba a trabajar. Probé de todo, pero solo con Reset Canino logré que se quedara durmiendo tranquilo en su cama. En menos de una semana el cambio fue radical.",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Carlos Rodríguez",
              province: "Barcelona",
              story: "Los vecinos se quejaban por los ladridos constantes. Estaba desesperado. Empecé el plan de 7 días y desde el tercer día los ladridos cesaron. Ahora puedo salir a cenar sin mirar la cámara cada 5 minutos.",
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Elena Sánchez",
              province: "Sevilla",
              story: "Lola me seguía como una sombra y entraba en pánico al ver las llaves. Gracias a las rutinas de regulación emocional, ahora entiende que volveré y se queda relajada. Es una paz que no tiene precio.",
              img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Javier Torres",
              province: "Valencia",
              story: "Pensaba que mi perro era rebelde, pero era ansiedad pura. Reset Canino me enseñó a comunicarme con él sin gritos. Los arañazos en la puerta son cosa del pasado. ¡Totalmente recomendado!",
              img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
            }
          ].map((testimonial, i) => (
            <div key={i}>
              <Reveal className="bg-white p-8 rounded-[14px] border border-border shadow-soft flex flex-col h-full hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/10"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-dark leading-tight">{testimonial.name}</h4>
                    <p className="text-xs text-gray-text font-medium">{testimonial.province}, España</p>
                  </div>
                </div>
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-text leading-relaxed italic">“{testimonial.story}”</p>
                <div className="mt-auto pt-6 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-[10px] font-bold text-gray-text uppercase tracking-widest">Compra Verificada</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* BONUS IA */}
      <Section bg="gray">
        <Reveal className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[24px] border-2 border-primary/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-6 py-1 font-bold text-xs uppercase tracking-widest">
              BONUS EXCLUSIVO
            </div>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-full flex items-center justify-center relative overflow-hidden border-4 border-primary/10 shadow-xl">
                  <img 
                    src="/movil-1.jpg" 
                    alt="Asistente Virtual Reset Canino" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold mb-6 text-dark flex items-center gap-3">
                  🤖 Asistente Virtual Reset Canino (IA 24/7)
                </h2>
                <p className="text-lg text-gray-text mb-8 leading-relaxed">
                  Tendrás acceso a un asistente inteligente disponible 24/7 que responderá todas tus dudas sobre el comportamiento de tu perro.
                </p>
                <div className="bg-gray-bg p-6 rounded-[14px] border border-border mb-8">
                  <p className="font-bold text-dark mb-4">Podrás preguntarle cosas como:</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-text">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      ¿Por qué mi perro ladra cuando me voy?
                    </li>
                    <li className="flex items-center gap-3 text-gray-text">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      ¿Qué hago si araña la puerta?
                    </li>
                    <li className="flex items-center gap-3 text-gray-text">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      ¿Estoy aplicando bien el método?
                    </li>
                    <li className="flex items-center gap-3 text-gray-text">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      ¿Cómo aplico la rutina correctamente?
                    </li>
                  </ul>
                </div>
                <p className="text-sm font-medium text-primary italic">
                  Este asistente ha sido entrenado con todo el contenido del programa Reset Canino.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 9) OFERTA */}
      <Section id="oferta">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Lo que recibes hoy al unirte</h2>
          <div className="mt-8 mb-12 flex justify-center">
            <img 
              src="https://i.postimg.cc/yxr02NC3/Diseno-sin-titulo-(10).png" 
              alt="Mockup Libro Digital Reset Canino" 
              className="w-full max-w-sm h-auto rounded-[14px] shadow-soft"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </Reveal>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[20px] border-2 border-border shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-8 py-2 rotate-45 translate-x-8 translate-y-4 font-bold text-sm">
              OFERTA HOY
            </div>
            
            <ul className="space-y-6 mb-12">
              {[
                { name: "Ebook Reset Canino", value: 39 },
                { name: "Audio guía paso a paso", value: 27 },
                { name: "Video resumen del método", value: 19 },
                { name: "Bonus: errores invisibles al usar juguetes", value: 19 },
                { name: "🤖 Asistente virtual Reset Canino IA 24/7", value: 67 }
              ].map((item, i) => (
                <li key={i} className="text-lg font-bold text-dark flex items-center justify-between gap-3 border-b border-border pb-4">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item.name}
                  </span>
                  <span className="text-gray-text font-medium">valor {item.value}€</span>
                </li>
              ))}
            </ul>
 
            <div className="border-t border-border pt-12 text-center">
              <p className="text-2xl text-gray-text line-through mb-2">Valor total: 171€</p>
              <p className="text-6xl font-black text-dark mb-4 tracking-tighter">
                Hoy solo <span className="text-primary">19,97€</span>
              </p>
              <div className="space-y-2 mb-8">
                <p className="text-primary font-bold animate-pulse">
                  Oferta de lanzamiento disponible por tiempo limitado.
                </p>
                <p className="text-sm text-gray-text font-medium italic">
                  Cuando termine el lanzamiento el precio volverá a 39€.
                </p>
              </div>
              <Button onClick={handleCheckout} className="text-2xl py-8 shadow-xl">
                👉 Empezar Reset Canino ahora
              </Button>
              <p className="mt-6 text-sm font-bold text-gray-text uppercase tracking-widest">
                Acceso inmediato · Pago único · Sin cuotas
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 10) GARANTÍA */}
      <Section bg="gray">
        <Reveal className="max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-[20px] border border-border shadow-soft text-center">
          <ShieldCheck className="w-20 h-20 text-primary mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Garantía de 7 días</h2>
          <p className="text-xl text-dark font-bold mb-4">Pruébalo sin riesgo.</p>
          <p className="text-lg text-gray-text mb-10 leading-relaxed">
            Si no ves cambios o no estás satisfecho, puedes pedir reembolso. <span className="font-bold text-dark">Sin preguntas.</span>
          </p>
          <Button onClick={handleCheckout} variant="outline">QUIERO EMPEZAR AHORA</Button>
        </Reveal>
      </Section>

      {/* 11) FAQ */}
      <Section>
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <FAQItem 
            question="¿Mi perro solo se porta mal cuando me voy. ¿Esto es para mí?" 
            answer="Sí. Eso es precisamente ansiedad por separación. Reset Canino está diseñado para atacar ese pánico que siente cuando te preparas para salir." 
          />
          <FAQItem 
            question="¿Y si ya probé cansarlo más y no funcionó?" 
            answer="Cansarlo físicamente a veces aumenta el cortisol (estrés). Aquí trabajamos la regulación mental, que es lo que realmente permite que se relaje." 
          />
          <FAQItem 
            question="¿Necesito jaula/transportín?" 
            answer="No es obligatorio. El método se adapta a tu espacio y a cómo vivas con tu perro." 
          />
          <FAQItem 
            question="¿Cuándo veré resultados?" 
            answer="Muchos dueños notan las primeras señales (menos activación al coger llaves) en los primeros 3-5 días si aplican las rutinas." 
          />
          <FAQItem 
            question="¿Sirve si es adulto / rescatado / cachorro?" 
            answer="Sí. El sistema nervioso canino funciona igual. Solo adaptamos la intensidad de las rutinas según su edad y energía." 
          />
          <FAQItem 
            question="¿Esto usa castigos o métodos agresivos?" 
            answer="Rotundamente no. El miedo no cura la ansiedad. Usamos refuerzo de calma y estructura clara." 
          />
          <FAQItem 
            question="¿Qué pasa si compro y no era lo que esperaba?" 
            answer="Tienes 7 días de garantía total. Nos escribes y te devolvemos el 100% de tu dinero." 
          />
          <FAQItem 
            question="¿Cómo recibo el Asistente IA?" 
            answer="Tras el pago, recibirás un PDF con un enlace directo para empezar a chatear con tu asistente 24/7." 
          />
        </div>
      </Section>

      {/* 12) CTA FINAL */}
      <Section bg="gray" className="pb-40">
        <Reveal className="max-w-3xl mx-auto text-center">
          <div className="mb-12 space-y-4">
            <p className="text-2xl font-bold text-dark">Tu perro no está intentando portarse mal.</p>
            <p className="text-xl text-gray-text">Está intentando manejar una emoción que no sabe controlar.</p>
            <p className="text-xl font-bold text-primary">
              Con las rutinas correctas puedes enseñarle a sentirse seguro y tranquilo incluso cuando se queda solo en casa.
            </p>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-dark tracking-tight">
            Tu perro no quiere destruir tu casa.
          </h2>
          <p className="text-2xl text-gray-text mb-6">Solo necesita aprender a regularse.</p>
          <p className="text-xl font-bold text-primary mb-12">
            Empieza hoy y ayuda a tu perro a recuperar la calma en casa.
          </p>
          <div className="max-w-md mx-auto">
            <Button onClick={handleCheckout} className="text-xl py-6 shadow-2xl mb-4">
              Empezar Reset Canino ahora
            </Button>
            <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-text uppercase tracking-widest">
              <span className="flex items-center gap-1">✔ Acceso inmediato</span>
              <span className="flex items-center gap-1">✔ Pago seguro</span>
              <span className="flex items-center gap-1">✔ Garantía 7 días</span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-border py-16 px-6 text-center text-gray-text text-sm">
        <div className="container-custom">
          <p className="mb-6 font-bold">© {new Date().getFullYear()} Reset Canino. Todos los derechos reservados.</p>
          <p className="max-w-3xl mx-auto opacity-50 text-[10px] leading-relaxed uppercase tracking-widest">
            Este sitio no forma parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca registrada de FACEBOOK, Inc.
          </p>
        </div>
      </footer>

      {/* STICKY CTA (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-5 z-50 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div>
          <p className="text-2xl font-black text-dark">19,97€</p>
          <p className="text-[10px] text-gray-text font-bold uppercase tracking-wider">Acceso inmediato</p>
        </div>
        <button 
          onClick={handleCheckout}
          className="bg-primary text-white px-8 py-4 rounded-[14px] font-bold text-sm active:scale-95 transition-transform shadow-lg"
        >
          Empezar ahora
        </button>
      </div>

      {/* POPUP / MODAL (Exit Intent) */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-dark/90 backdrop-blur-md" 
            onClick={() => setShowPopup(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-[20px] p-10 md:p-16 shadow-2xl overflow-hidden text-center">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-6 right-6 text-gray-text hover:text-dark transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <h2 className="text-3xl font-black mb-4 text-dark">Antes de irte…</h2>
            <p className="text-lg text-gray-text mb-6 leading-relaxed">
              Tu perro seguirá sintiendo ansiedad cada vez que salgas de casa.
            </p>
            <p className="text-xl font-bold text-dark mb-10 leading-relaxed">
              Pero hoy puedes empezar a ayudarlo con el método Reset Canino.
            </p>
            <div className="flex flex-col gap-4">
              <Button onClick={handleCheckout}>Quiero ayudar a mi perro ahora</Button>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-text font-bold hover:text-dark transition-colors"
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
