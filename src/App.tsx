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

const CHECKOUT_URL = "https://mascotaequilibrada.com/cart/57475776184707:1";

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
  const [showPopup, setShowPopup] = useState(false);
  const [hasClickedCTA, setHasClickedCTA] = useState(false);

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

  // Popup Logic
  useEffect(() => {
    const POPUP_COOLDOWN = 24 * 60 * 60 * 1000; // 24h
    const lastShown = localStorage.getItem("popup_last_shown");
    const now = Date.now();

    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.8 && (!lastShown || now - Number(lastShown) > POPUP_COOLDOWN)) {
        setShowPopup(true);
        localStorage.setItem("popup_last_shown", now.toString());
      }
    };

    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && (!lastShown || now - Number(lastShown) > POPUP_COOLDOWN)) {
        setShowPopup(true);
        localStorage.setItem("popup_last_shown", now.toString());
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
      document.addEventListener("mouseleave", handleExitIntent);
    }, 10000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* 1) HERO SECTION */}
      <Section className="pt-12 md:pt-20 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="text-primary font-bold uppercase tracking-[0.2em] mb-6 text-sm">
              MÉTODO PROBADO PARA LA ANSIEDAD POR SEPARACIÓN
            </p>

            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-8 text-dark tracking-tight">
              Haz que tu perro se quede solo en calma
              <span className="block text-primary mt-2">sin llorar, ladrar ni destrozar la casa.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-text mb-10 leading-relaxed max-w-4xl mx-auto">
              Un sistema práctico de 10-15 minutos al día para reducir su ansiedad por separación y devolverte la paz, incluso si ya has probado otros métodos.
            </p>


            <div className="bg-primary/5 p-6 rounded-[20px] border border-primary/10 inline-block text-center md:text-left max-w-3xl">
              <p className="text-lg text-dark font-medium leading-relaxed">
                ¿Sientes culpa cada vez que cierras la puerta? ¿Tus vecinos se quejan de los aullidos? ¿Vuelves a casa con miedo a encontrar un desastre? <span className="text-primary font-bold">Hay una solución real.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 1.5) VIDEO SECTION */}
      <Section className="pt-0 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-lg font-bold text-dark mb-8">
              🔊 Mira este vídeo y entiende por qué tu perro entra en pánico cuando siente que te vas.
            </p>
            <div className="mb-12 shadow-2xl overflow-hidden rounded-[24px] border border-border max-w-[320px] mx-auto bg-black group relative">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="metadata" 
                className="w-full aspect-[9/16] object-cover cursor-pointer" 
                onClick={(e) => {
                  e.currentTarget.muted = false;
                  e.currentTarget.play();
                }}
              >
                <source src="/video-rc-3.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <Play className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
            </div>

            <Button onClick={() => handleCheckout('video')} className="mb-8 text-xl py-6 max-w-md mx-auto">
              Sí, quiero paz en casa
            </Button>

            <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-gray-text uppercase tracking-widest">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Garantía de Satisfacción</span>
              <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-primary" /> Pago 100% Seguro</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Acceso Inmediato</span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* EARLY OFFER SUMMARY */}
      <Section bg="gray" className="py-12">
        <Reveal className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-[32px] border border-border shadow-soft flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Empieza hoy mismo:</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-text"><CheckCircle2 className="w-5 h-5 text-primary" /> Sistema Reset Canino AIRMIND</li>
                <li className="flex items-center gap-2 text-gray-text"><CheckCircle2 className="w-5 h-5 text-primary" /> 4 Bonos de Acción Rápida</li>
                <li className="flex items-center gap-2 text-gray-text"><CheckCircle2 className="w-5 h-5 text-primary" /> Soporte IA 24/7 incluido</li>
              </ul>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-dark">19,97€</span>
                <span className="text-gray-400 line-through text-sm">Valor real: 171€</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 2) IDENTIFICACIÓN DEL PROBLEMA */}
      <Section bg="gray">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Tu perro no te está castigando. Está sufriendo un ataque de pánico.</h2>
          <p className="text-xl text-gray-text mb-12">
            ¿Te suena familiar? Esta es la realidad diaria de miles de dueños que se sienten atrapados en su propia casa:
          </p>
          <div className="grid gap-4 text-left">
            {[
              "Vuelves a casa con el corazón en un puño, temiendo lo que encontrarás tras la puerta.",
              "Tus vecinos te han dejado notas o se quejan de los aullidos constantes.",
              "Has gastado una fortuna en cámaras, juguetes 'mágicos' y nada ha funcionado.",
              "Sientes una culpa inmensa cada vez que tienes que salir, incluso para tirar la basura.",
              "Tu vida social ha desaparecido porque no puedes dejar a tu perro solo ni un segundo."
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-[18px] border border-border shadow-soft">
                <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span className="font-bold text-dark text-lg">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="text-center">
          <div className="inline-block bg-dark text-white p-10 rounded-[24px] shadow-2xl max-w-2xl">
            <p className="text-2xl font-bold mb-4 italic">"¿Por qué lo hace si sabe que está mal?"</p>
            <p className="text-lg text-gray-300 leading-relaxed">
              No es una conducta de venganza. Es una <span className="text-primary font-bold">respuesta fisiológica al miedo extremo</span>. Su cerebro entra en modo supervivencia y no puede evitarlo. Castigarlo solo empeora el pánico.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 3) CAMBIO DE PERSPECTIVA */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">El mito del "perro cansado"</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-gray-text leading-relaxed">
                <p>
                  Muchos dueños intentan cansar más a su perro con paseos interminables o sesiones de juego intensas antes de salir.
                </p>
                <p className="font-bold text-dark">
                  Pero la ansiedad por separación no se cura con ejercicio físico.
                </p>
                <p>
                  De hecho, a veces el exceso de ejercicio aumenta el cortisol (la hormona del estrés), haciendo que el perro esté aún más activado cuando te vas.
                </p>
                <div className="bg-primary/5 p-8 rounded-[20px] border-l-4 border-primary">
                  <p className="text-dark font-bold text-xl mb-2">La solución real:</p>
                  <p className="text-dark">
                    Tu perro necesita aprender a <span className="text-primary font-bold">regularse emocionalmente</span> y a entender que tu ausencia no es una amenaza.
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

      {/* 12) SECCIÓN DE AUTORIDAD (JULIETA MÁRQUEZ) */}
      <Section bg="gray">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-12 items-center bg-white p-8 md:p-16 rounded-[32px] border border-border shadow-xl">
              <div className="w-full md:w-2/5">
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="/julieta-marquez.jpg" 
                    alt="Julieta Márquez - Creadora de Reset Canino" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Experiencia real en bienestar canino</h3>
                <h2 className="text-4xl font-bold mb-6 text-dark">Julieta Márquez</h2>
                <p className="text-primary font-bold mb-6">
                  Especialista en Vínculo y Regulación Emocional
                </p>
                <div className="space-y-6 text-lg text-gray-text leading-relaxed">
                  <p>
                    Tras años observando un patrón de frustración y culpa en cientos de dueños, Julieta Márquez decidió sistematizar una solución que fuera más allá del adiestramiento tradicional.
                  </p>
                  <p>
                    <strong>Reset Canino</strong> no es teoría abstracta; es un método nacido de la práctica diaria, diseñado para transformar el pánico en calma a través de la comunicación biológica y la seguridad emocional.
                  </p>
                  <p className="italic border-l-4 border-primary/30 pl-6 py-2">
                    "Mi objetivo no es que tu perro te obedezca, sino que aprenda a estar en paz consigo mismo cuando tú no estás. Esa es la verdadera libertad para ambos."
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
            Un sistema estructurado, amable y lógico diseñado para que cualquier dueño pueda aplicarlo sin necesidad de conocimientos previos en educación canina.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
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
        </Reveal>
      </Section>

      {/* 5) PILARES / BENEFICIOS */}
      <Section bg="dark">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Calma desde la raíz", 
              desc: "No tapamos el síntoma. Trabajamos la emoción para que el cambio sea real y duradero.",
              icon: <Brain className="w-10 h-10" />
            },
            { 
              title: "Rutinas de 15 minutos", 
              desc: "Diseñado para personas con vidas ocupadas. Eficacia máxima en tiempo mínimo.",
              icon: <Zap className="w-10 h-10" />
            },
            { 
              title: "Comunicación sin Estrés", 
              desc: "Aprende a decirle a tu perro que vas a volver sin necesidad de palabras.",
              icon: <MessageCircle className="w-10 h-10" />
            },
            { 
              title: "Paz Mental para Ti", 
              desc: "Vuelve a salir a cenar o a trabajar sin la angustia de qué encontrarás al volver.",
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">De la destrucción a la calma absoluta</h2>
            <p className="text-xl text-gray-text">Mira la transformación que Reset Canino puede lograr en tu hogar.</p>
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
              <div className="bg-gray-bg p-8 rounded-[24px] border border-border">
                <h4 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                  <XCircle className="text-red-500" /> El Escenario Actual
                </h4>
                <p className="text-gray-text leading-relaxed">
                  Puertas arañadas, vecinos molestos, un perro agotado por el estrés y tú sintiendo una culpa constante cada vez que sales de casa.
                </p>
              </div>
              <div className="bg-primary/5 p-8 rounded-[24px] border border-primary/20">
                <h4 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" /> El Nuevo Escenario
                </h4>
                <p className="text-gray-text leading-relaxed">
                  Un perro que te ve salir y se tumba a descansar. Una casa intacta. La libertad de poder irte sabiendo que tu mejor amigo está en paz.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Reveal className="mt-16 text-center">
  <Button onClick={() => handleCheckout('before_after')} className="max-w-md mx-auto">
    Quiero este cambio para mi perro
  </Button>
</Reveal>
      </Section>

      {/* 8) TESTIMONIOS */}
      <Section bg="gray">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Historias de Éxito</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Más de 1.000 dueños ya han recuperado la paz en sus hogares</h2>
          <p className="text-xl text-gray-text leading-relaxed">
            No son casos aislados. Son personas reales que, como tú, sentían que no había salida.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Laura Martínez",
              province: "Madrid",
              story: "Mi perro destrozaba el sofá cada vez que me iba a trabajar. Probé de todo, pero solo con Reset Canino logré que se quedara durmiendo tranquilo en su cama. En menos de una semana el cambio fue radical. El alivio que siento es indescriptible.",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Carlos Rodríguez",
              province: "Barcelona",
              story: "Los vecinos se quejaban por los ladridos constantes. Estaba desesperado y con miedo a que me echaran del piso. Empecé el plan y desde el tercer día los ladridos cesaron. Ahora puedo salir a cenar sin mirar la cámara cada 5 minutos.",
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Elena Sánchez",
              province: "Sevilla",
              story: "Lola me seguía como una sombra y entraba en pánico al ver las llaves. Gracias a las rutinas de regulación emocional, ahora entiende que volveré y se queda relajada. Es una paz que no tiene precio para las dos.",
              img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Javier Torres",
              province: "Valencia",
              story: "Pensaba que mi perro era rebelde, pero era ansiedad pura. Reset Canino me enseñó a comunicarme con él sin gritos ni castigos. Los arañazos en la puerta son cosa del pasado. ¡Totalmente recomendado!",
              img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
            }
          ].map((testimonial, i) => (
            <div key={i}>
              <Reveal className="bg-white p-10 rounded-[28px] border border-border shadow-soft flex flex-col h-full hover:border-primary/30 transition-all hover:shadow-xl">
                <div className="flex items-center gap-5 mb-8">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary/10"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-dark text-lg leading-tight">{testimonial.name}</h4>
                    <p className="text-sm text-gray-text font-medium">{testimonial.province}, España</p>
                  </div>
                </div>
                <div className="flex text-primary mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-text text-lg leading-relaxed italic mb-8">“{testimonial.story}”</p>
                <div className="mt-auto pt-6 flex items-center gap-3 border-t border-border">
                  <div className="bg-green-100 p-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-text uppercase tracking-widest">Compra Verificada</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* BONUS IA */}
      <Section>
        <Reveal className="max-w-5xl mx-auto">
          <div className="bg-dark p-8 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-10 py-2 font-bold text-sm uppercase tracking-[0.2em]">
              BONUS EXCLUSIVO
            </div>
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-2/5">
                <div className="relative aspect-square rounded-[32px] overflow-hidden border-8 border-white/5 shadow-2xl">
                  <img 
                    src="/movil-1.jpg" 
                    alt="Asistente Virtual Reset Canino" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white flex items-center gap-4">
                  🤖 Tu Soporte 24/7 con IA
                </h2>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                  No estarás solo en este proceso. Tendrás acceso a un asistente inteligente entrenado con todo el método Reset Canino para resolver tus dudas en segundos, a cualquier hora.
                </p>
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-[24px] border border-white/10 mb-10">
                  <p className="font-bold text-white mb-6 text-xl">Resuelve dudas al instante:</p>
                  <ul className="grid gap-4">
                    {[
                      "¿Por qué mi perro ladra justo al cerrar la puerta?",
                      "¿Qué hago si hoy ha tenido una recaída?",
                      "¿Cómo adapto la rutina si tengo poco tiempo hoy?",
                      "¿Cómo sé si está relajado o solo resignado?"
                    ].map((q, i) => (
                      <li key={i} className="flex items-center gap-4 text-gray-300">
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-primary font-bold italic text-lg">
                  Es como tener a Julieta Márquez en tu bolsillo, disponible siempre que la necesites.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 9) OFERTA IRRESISTIBLE - PREMIUM BUNDLE MOCKUP */}
      <Section bg="gray" id="oferta">
        <Reveal className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-dark tracking-tight leading-tight">
            No es solo un libro, es el <span className="text-primary">sistema completo</span> para recuperar tu libertad
          </h2>
          <p className="text-xl md:text-2xl text-gray-text max-w-3xl mx-auto leading-relaxed">
            Llévate hoy el pack "Reset Canino AIRMIND" con todos sus bonos exclusivos y empieza a transformar la vida de tu perro desde el primer minuto.
          </p>
        </Reveal>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 md:p-16 rounded-[40px] border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-12 py-3 rotate-45 translate-x-12 translate-y-6 font-bold text-sm tracking-widest z-50">
              OFERTA ESPECIAL
            </div>
            
            {/* Mockup Visual Composition - Single Image */}
            <div className="relative py-12 md:py-16 mb-12">
              <img 
                src="/reset-canino-portada.jpg" 
                alt="Reset Canino AIRMIND" 
                className="w-full max-w-md mx-auto rounded-[24px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
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
                  <p className="text-sm uppercase tracking-widest text-gray-text font-bold mb-2">Valor Total: 171€</p>
                  <p className="text-6xl md:text-7xl font-black text-dark tracking-tighter mb-4">
                    19,97€
                  </p>
                  <div className="bg-primary text-white inline-block px-4 py-1 rounded-lg font-bold text-sm mb-6">
                    AHORRAS 151,03€ (88% DTO)
                  </div>
                  <Button 
                    onClick={() => handleCheckout('offer_block')} 
                    className="text-lg md:text-xl py-5 md:py-6 shadow-2xl hover:scale-[1.02] active:scale-95"
                  >
                    SÍ, QUIERO PAZ EN CASA
                  </Button>
                </div>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-dark">Tu tranquilidad es lo primero</h2>
          <p className="text-2xl text-dark font-bold mb-6">Pruébalo durante 7 días sin compromiso.</p>
          <p className="text-xl text-gray-text mb-12 leading-relaxed">
            Si después de aplicar el método sientes que no es para ti o que tu perro no ha mejorado, escríbenos. Te devolveremos cada céntimo. <span className="font-bold text-dark">Sin preguntas, sin complicaciones.</span>
          </p>
          <Button onClick={() => handleCheckout('guarantee')} variant="outline" className="max-w-md mx-auto">
            PROBAR SIN RIESGO AHORA
          </Button>
        </Reveal>
      </Section>

      {/* 11) FAQ */}
      <Section bg="gray">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Resolvemos tus dudas</h2>
          <p className="text-xl text-gray-text">Todo lo que necesitas saber antes de empezar.</p>
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
            answer="Cada perro es un mundo, pero la mayoría de dueños notan una reducción en la activación previa a la salida (al coger llaves o zapatos) en los primeros 3 a 5 días." 
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
              No dejes que el miedo controle la vida de tu perro.
            </h2>
            <p className="text-xl md:text-2xl text-gray-text max-w-2xl mx-auto">
              Tú mereces salir de casa tranquilo y tu perro merece sentirse seguro en su hogar.
            </p>
          </div>
          
          <div className="bg-primary px-6 py-10 md:px-10 md:py-14 rounded-[28px] md:rounded-[40px] shadow-2xl text-white relative overflow-hidden max-w-3xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />
            
            <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Recupera la calma hoy por solo 19,97€
            </h3>

            <div className="max-w-sm mx-auto">
              <button
                onClick={() => handleCheckout('final_cta')}
                className="inline-block bg-white text-primary font-bold text-sm md:text-base py-3 px-8 rounded-[14px] shadow-lg active:scale-95 transition-transform"
              >
                SÍ, QUIERO QUE DEJE DE ENTRAR EN PÁNICO
              </button>

              <p className="mt-5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] opacity-90">
                Acceso inmediato • Garantía de 7 días
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

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

      {/* STICKY CTA (Mobile) */}
    </div>
  );
}
