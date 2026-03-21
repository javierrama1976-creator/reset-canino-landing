
import React, { useEffect, useState, useRef } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Star, 
  Zap,
  X, 
  MessageCircle,
  Brain,
  ChevronDown,
  ChevronUp,
  Lock,
  Play,
  Clock,
  Heart,
  AlertCircle
} from "lucide-react";

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
  variant?: "primary" | "secondary" | "outline",
  onClick?: () => void,
  href?: string,
  disabled?: boolean
}) => {
  const baseStyles = "w-full py-4 px-8 rounded-[14px] font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:brightness-110 shadow-soft",
    secondary: "bg-dark text-white hover:bg-dark/90 shadow-soft",
    outline: "bg-transparent border border-border text-dark hover:bg-gray-bg"
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

// --- Main App ---

export default function App() {
  const [hasClickedCTA, setHasClickedCTA] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, []);
useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    const scrollPercent = (scrollTop + windowHeight) / fullHeight;

    if (scrollPercent > 0.75) {
      setShowPopup(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
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
    Sales de casa… y te vas con la culpa de saber que tu perro se queda sufriendo detrás de la puerta
  </h1>

  <p className="text-xl md:text-2xl mt-4 text-gray-700">
    Ladridos, destrozos, vecinos que se quejan... y la angustia de no saber qué te vas a encontrar al volver.
  </p>

  <p className="mt-4 text-lg font-semibold text-red-500">
    No es mala conducta. Es ansiedad por separación… y si no la corriges ahora, irá a peor.
  </p>
     
            <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}>
              
  <video
  className="w-full h-auto block"
  controls
controlsList="nodownload"
playsInline
  preload="auto"
    poster="/imagen-video-cover.jpg"
  style={{
    width: "100%",
    maxWidth: "700px",
    borderRadius: "16px"
  }}
>
  <source src="/video-landing-rc.mp4" type="video/mp4" />
  Tu navegador no soporta el elemento de video.
</video>
</div>

            <p className="text-xl md:text-2xl text-gray-text mb-10 leading-relaxed max-w-4xl mx-auto">
              Descubre el método que ya está ayudando a cientos de dueños a dejar a su perro solo en casa sin ladridos, sin destrozos y sin miedo a lo que encontrarán al volver.
            </p>

            <div className="bg-primary/5 p-8 rounded-[24px] border border-primary/10 inline-block text-center md:text-left max-w-3xl mb-12">
              <p className="text-lg md:text-xl text-dark font-medium leading-relaxed">
                Un sistema práctico que puedes aplicar en solo 10-15 minutos al día, incluso si ya has probado juguetes, cámaras o consejos de internet que no funcionaron.
              </p>
            </div>

                <video
  className="w-full h-auto block"
  controls
  controlsList="nodownload"              
  playsInline
  preload="auto"  
poster="/imagen2-landing.jpg"
>
  <source src="/testimonio-1.mp4" type="video/mp4" />
</video>
              
            
          </Reveal>
        </div>
      </Section>
      {/* 2) IDENTIFICACIÓN DEL PROBLEMA */}
      <Section bg="gray">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="max-w-4xl mx-auto mt-8 mb-8">
            <div className="shadow-2xl rounded-[24px] border border-border bg-black h-auto overflow-hidden">
      
            </div>
          </div>
 
  <Button 
  onClick={() => handleCheckout('hero_cta')} 
  className="mt-8 text-2xl py-6 max-w-lg mx-auto"
>
  QUIERO QUE MI PERRO SE QUEDE SOLO SIN SUFRIR
</Button>

<p className="text-sm text-gray-600 mt-3">
🔥 Acceso inmediato<br/>
✔ Pago seguro con tarjeta o PayPal
</p>
    <section className="max-w-2xl mx-auto mt-8 px-4 text-center">
  <p className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
    Aquí tienes todo lo que vas a usar para recuperar la calma en casa:
  </p>

  <img
    src="/mockups.png"
    alt="Todo lo que incluye Reset Canino"
    className="w-full rounded-xl shadow-lg"
  />

  <p className="text-base md:text-lg text-gray-700 mt-4">
    El método paso a paso + bonos estratégicos para ayudar a tu perro a sentirse seguro
    cuando te vas, sin castigos, sin improvisar y sin perder más tiempo.
  </p>
</section>
  <p className="text-base md:text-lg text-gray-900 font-semibold mt-2">
  Y sí, todo esto está incluido hoy por solo 19,97€.
</p>        
  <h2 className="text-2xl md:text-4xl font-bold text-center mt-12">
  Mira lo que dicen otros dueños de perros 👇
</h2>
<div className="max-w-2xl mx-auto mt-8">
  <div className="grid grid-cols-2 gap-3">
    <img src="/testimonio.w1.jpeg" className="rounded-lg shadow-sm" />
    <img src="/testimonio.w2.jpeg" className="rounded-lg shadow-sm" />
    <img src="/testimonio.w3.jpeg" className="rounded-lg shadow-sm" />
    <img src="/testimonio.w4.jpeg" className="rounded-lg shadow-sm" />
    <img src="/testimonio.w5.jpeg" className="rounded-lg shadow-sm" />
    <img src="/testimonio.w6.jpeg" className="rounded-lg shadow-sm" />
  </div>
</div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 mt-16">Si tu perro sufre ansiedad por separación, probablemente esto te pasa cada vez que sales de casa:</h2>
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
          <p className="text-xl text-gray-text mt-12 font-medium">
            No es que tu perro sea malo. Es que está entrando en pánico cuando siente que te vas.
          </p>
        </Reveal>
      </Section>
    

      {/* 3) MITO Y SOLUCIÓN */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">El error que hace que la ansiedad por separación de tu perro empeore cada día</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-gray-text leading-relaxed">
                
                <div className="bg-primary/5 p-8 rounded-[20px] border-l-4 border-primary">
                  <p className="text-dark font-bold text-xl mb-2">
La solución real (que casi nadie te dice):
</p>

<p className="text-dark">
No necesitas cansar a tu perro. Necesitas enseñarle a sentirse tranquilo y seguro cuando estás fuera.
</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-[30px] blur-2xl -z-10" />
                <img 
                  src="/perro-mirando.jpg" 
                  alt="Perro tranquilo en casa" 
                  className="rounded-[24px] shadow-2xl border border-border"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
{/* 12) SECCIÓN DE AUTORIDAD */}
<Section bg="gray">
  <div className="max-w-5xl mx-auto">
    <Reveal>
      <div className="flex flex-col md:flex-row gap-12 items-center bg-white p-8 md:p-16 rounded-[32px] border border-border shadow-xl">

        {/* Imagen */}
        <div className="w-full md:w-2/5">
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="/Julieta Márquez.jpg"
              alt="Julieta Márquez - Especialista en ansiedad por separación en perros"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="w-full md:w-3/5">

          <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
            Método basado en casos reales
          </h3>

          <h2 className="text-4xl font-bold mb-4 text-dark">
            Julieta Márquez
          </h2>

          <p className="text-primary font-bold mb-6">
            Especialista en ansiedad por separación y comportamiento canino
          </p>

          <div className="space-y-5 text-lg text-gray-text leading-relaxed">

            <p>
              Durante años he trabajado con perros que no saben gestionar la soledad:
              ladridos constantes, destrozos en casa, estrés extremo… y dueños viviendo con culpa cada vez que salen por la puerta.
            </p>

            <p>
              El problema no es la conducta. Es el estado emocional del perro.
              Y ahí es donde la mayoría de métodos fallan.
            </p>

            <p>
              Por eso creé Reset Canino: un sistema práctico para enseñar a tu perro a sentirse tranquilo y seguro cuando tú no estás,
              sin castigos, sin frustración y sin depender de soluciones temporales.
            </p>

            <p className="italic border-l-4 border-primary/30 pl-6 py-2 text-dark">
              “No necesitas que tu perro aguante.  
              Necesitas que aprenda a estar en calma cuando se queda solo.”
            </p>

          </div>
        </div>

      </div>
    </Reveal>
  </div>
</Section>
   
      {/* 4) PRESENTACIÓN DEL MÉTODO */}
      <Section>
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
              <div key={i} className="bg-gray-bg p-8 rounded-[24px] border border-border text-center relative group hover:border-primary/50 transition-colors">
                <div className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-6 inline-block">
                  {item.phase}
                </div>
                <h4 className="text-2xl font-bold text-dark mb-4">{item.title}</h4>
                <p className="text-gray-text leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <Button onClick={() => handleCheckout('method_section')} className="mb-8 text-xl py-6 max-w-md mx-auto">
            QUIERO EMPEZAR A SOLUCIONARLO HOY
          </Button>
       
        <p className="text-sm text-gray-600 mt-3 text-center">
✓ Empieza hoy mismo<br/>
✓ Solo necesitas 10-15 minutos al día<br/>
✓ Acceso inmediato tras el pago
</p>
 </Reveal>
      </Section>

      {/* 5) PILARES / BENEFICIOS */}
      <Section bg="dark">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Lo que conseguirás con Reset Canino:</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Salir de casa sin culpa ni miedo", 
              desc: "Salir de casa sabiendo que tu perro está tranquilo y seguro.",
              icon: <Brain className="w-10 h-10" />
            },
            { 
              title: "Silencio en casa (y paz con los vecinos)", 
              desc: "Sin ladridos constantes ni quejas del vecindario.",
              icon: <Zap className="w-10 h-10" />
            },
            { 
              title: "Tu perro aprende a quedarse solo con calma", 
              desc: "Sin pánico, sin destrucción y sin estrés.",
              icon: <MessageCircle className="w-10 h-10" />
            },
            { 
              title: "Recuperas tu libertad", 
              desc: "Vuelves a salir, trabajar o viajar sin sentirte atado a casa.",
              icon: <CheckCircle2 className="w-10 h-10" />
            }
          ].map((item, i) => (
            <div key={i}>
              <Reveal className="bg-white/5 backdrop-blur-sm p-8 rounded-[24px] border border-white/10 h-full flex flex-col hover:bg-white/10 transition-colors">
                <div className="text-primary mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* OBJECTIONS SECTION */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">¿Aún tienes dudas?</h2>
            <p className="text-xl text-gray-text mt-4">Esto es para ti, sin importar tu situación actual.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "¿Y si ya he probado de todo?", a: "Reset Canino no es adiestramiento de obediencia. Trabajamos la regulación emocional, la raíz del pánico que otros métodos ignoran." },
              { q: "¿Funciona con perros adultos?", a: "Sí. El cerebro canino es plástico. Cualquier perro, sin importar su edad, puede aprender a sentirse seguro en soledad." },
              { q: "¿Tengo que dedicarle horas?", a: "No. El sistema está diseñado para dueños ocupados. Solo necesitas 10-15 minutos de rutinas estratégicas al día." },
              { q: "¿Puede empeorar la situación?", a: "Al contrario. Al trabajar desde la calma y sin castigos, reducimos el cortisol y el estrés desde el primer día." }
            ].map((obj, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-border shadow-soft">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {obj.q}
                </h4>
                <p className="text-gray-text leading-relaxed">{obj.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 2.5) TRANSFORMACIÓN VISUAL */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Así es como cambia tu casa cuando tu perro supera la ansiedad por separación</h2>
            <p className="text-xl text-gray-text">La diferencia entre vivir con ansiedad… o tener un perro tranquilo cuando sales de casa.</p>
          </Reveal>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[9/16] rounded-[32px] overflow-hidden border border-border shadow-2xl">
                <img 
                  src="/ayd-1.jpg" 
                  alt="Transformación Reset Canino" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    ANTES
                  </span>
                </div>
                <div className="absolute bottom-8 left-8">
                  <span className="bg-green-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    DESPUÉS
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
             
            </div>
          </div>
        </div>
      </Section>

     {/* 9) OFERTA IRRESISTIBLE - PREMIUM BUNDLE MOCKUP */}
      <Section bg="gray" id="oferta">
        <Reveal className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-dark tracking-tight leading-tight">
            Esto no es teoría. Es el sistema completo para recuperar la calma en tu casa.
          </h2>
          <p className="text-xl md:text-2xl text-gray-text max-w-3xl mx-auto leading-relaxed">
            Si tu perro sufre ansiedad por separación, no necesitas más teorías. Necesitas un sistema claro que funcione en casa.
            <br /><br />
            Reset Canino te enseña exactamente cómo hacerlo, paso a paso.
          </p>
        </Reveal>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 md:p-16 rounded-[40px] border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-12 py-3 rotate-45 translate-x-12 translate-y-6 font-bold text-sm tracking-widest z-50">
              OFERTA ESPECIAL
            </div>
            
          

            {/* Price and CTA Block */}
            <div className="border-t border-border pt-12 text-center">
              <div className="grid md:grid-cols-2 gap-8 items-center text-left mb-12">
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-dark">Lo que te llevas hoy:</h4>
                  <ul className="space-y-3">
                    {[
                      { name: "Sistema Reset Canino AIRMIND", val: 39 },
                      { name: "Bono 1: Guía Errores Invisibles", val: 19 },
                      { name: "Bono 2: Audio Guía Regulación", val: 27 },
                      { name: "Bono 3: Masterclass Vídeo Paso a Paso", val: 19 },
                      { name: "Bono 4: Asistente IA 24/7 (Soporte)", val: 67 }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center justify-between gap-4 text-sm md:text-base">
                        <span className="flex items-center gap-2 text-gray-text">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          {item.name}
                        </span>
                        <span className="text-gray-400 font-medium line-through">{item.val}€</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-bg p-8 rounded-[32px] text-center border border-border">
                  <p className="text-xl text-gray-text font-bold mb-2">Hoy no pagarás <span className="line-through">171€</span></p>
                  <p className="text-2xl md:text-4xl font-black text-dark tracking-tight mb-4">
                    Hoy puedes acceder a todo el sistema por solo 19,97€
                  </p>
                  <div className="bg-primary text-white inline-block px-4 py-1 rounded-lg font-bold text-sm mb-6">
                    AHORRAS 151,03€ (88% DTO)
                  </div>
                  <p className="text-sm font-bold text-primary mt-4">Hoy puedes acceder a todo el sistema completo por menos de lo que cuesta un juguete para tu perro.</p>
                </div>
                <Button onClick={() => handleCheckout('offer_section')} className="mt-8 text-xl py-6 max-w-md mx-auto">
                  VER CÓMO FUNCIONA EL MÉTODO
                </Button>
                <p className="text-sm text-gray-600 mt-3 text-center">
✓ Acceso inmediato tras el pago<br/>
✓ Garantía de 7 días<br/>
✓ Pago 100% seguro con tarjeta o PayPal
</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-gray-text uppercase tracking-widest">
                <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-primary" /> Pago Seguro SSL</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Acceso Inmediato</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Garantía 7 Días</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 10) GARANTÍA */}
      <Section>
        <Reveal className="max-w-3xl mx-auto bg-gray-bg p-12 md:p-20 rounded-[40px] border border-border text-center">
          <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-10" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-dark">Pruébalo 7 días sin riesgo</h2>
          <p className="text-2xl text-dark font-bold mb-6">Si después de aplicar el método sientes que no es para ti o que tu perro no mejora, te devolvemos el dinero.</p>
          <p className="text-xl text-gray-text mb-12 leading-relaxed">
            Sin preguntas. Sin complicaciones.
          </p>
          <Button onClick={() => handleCheckout('guarantee')} className="max-w-md mx-auto">
            QUIERO QUE MI PERRO SE QUEDE SOLO SIN SUFRIR
          </Button>
          <p className="text-sm text-gray-600 mt-3 text-center">
✓ Acceso inmediato tras el pago<br/>
✓ Garantía total de 7 días<br/>
✓ Pago 100% seguro
</p>
        </Reveal>
      </Section>

      {/* 11) FAQ */}
      <Section bg="gray">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Resolvemos tus dudas</h2>
          <p className="text-xl text-gray-text">Todo lo que necesitas saber antes de empezar a ayudar a tu perro de verdad.</p>
        </Reveal>
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[32px] border border-border shadow-soft">
          <FAQItem 
            question="¿Funciona con perros adultos o rescatados?" 
            answer="Absolutamente. El sistema nervioso canino mantiene su capacidad de aprendizaje durante toda la vida. Solo adaptamos la intensidad de las rutinas, pero el proceso de regulación emocional es el mismo." 
          />
          <FAQItem 
            question="¿Y si ya he probado otros métodos o educadores?" 
            answer="Muchos métodos fallan porque se centran en el síntoma (el ladrido) y no en la emoción (el pánico). Reset Canino trabaja desde la raíz emocional, por eso funciona donde otros fallan." 
          />
          <FAQItem 
            question="¿Necesito mucho tiempo al día?" 
            answer="No. El método está diseñado para dueños reales con vidas ocupadas. Con 10-15 minutos de rutinas enfocadas al día es suficiente para ver cambios reales." 
          />
          <FAQItem 
            question="¿Es un método amable?" 
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

      {/* 12) CTA FINAL */}
      <Section className="pb-40 md:pb-48">
        <Reveal className="max-w-4xl mx-auto text-center">
          <div className="mb-12 md:mb-16 space-y-5 md:space-y-6">
            <h2 className="text-4xl md:text-7xl font-black text-dark tracking-tight leading-none">
              Tu perro no debería entrar en pánico cada vez que sales de casa.
            </h2>
            <p className="text-xl md:text-2xl text-gray-text max-w-2xl mx-auto">
              Y tú tampoco deberías vivir con miedo a lo que encontrarás al volver.
            </p>
          </div>
          
          <div className="bg-primary px-6 py-10 md:px-10 md:py-14 rounded-[28px] md:rounded-[40px] shadow-2xl text-white relative overflow-hidden max-w-3xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />
            
            <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Por solo 19,97€
            </h3>

            <p className="text-xl font-bold mb-8 uppercase tracking-widest">Recupera la calma hoy.</p>
            
            <Button onClick={() => handleCheckout('final_cta')} className="bg-white text-primary hover:bg-gray-100 border-none shadow-xl mb-4">
              QUIERO QUE MI PERRO APRENDA A QUEDARSE SOLO
            </Button>

            <div className="max-w-sm mx-auto">
              <p className="mt-5 text-xs md:text-sm font-bold uppercase tracking-wide">
✓ Acceso inmediato tras el pago • ✓ Garantía total de 7 días • ✓ Pago 100% seguro
</p>
            </div>
          </div>
        </Reveal>
      </Section>
{showPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl">

      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-dark"
      >
        <X className="w-6 h-6" />
      </button>

      <h3 className="text-2xl font-bold mb-4 text-dark">
        Recupera la calma en casa por solo 19,97€
      </h3>

      <p className="mb-6 text-gray-text leading-relaxed">
        Empieza hoy y deja de sufrir cada vez que sales de casa.
      </p>

      <Button onClick={() => handleCheckout('popup_cta')}>
        QUIERO EMPEZAR AHORA
      </Button>

      <button
        onClick={() => setShowPopup(false)}
        className="mt-4 text-sm text-gray-400 hover:text-dark"
      >
        Seguir viendo
      </button>

    </div>
  </div>
)}
      {/* FOOTER */}
      <footer className="bg-white border-t border-border py-20 px-6 text-center text-gray-text text-sm">
        <div className="container-custom">
          <p className="mb-8 font-bold text-dark text-lg">Reset Canino</p>
          <p className="mb-6">© {new Date().getFullYear()} Todos los derechos reservados.</p>
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

