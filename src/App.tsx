import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, ShieldCheck, ArrowRight, Star, User, BookOpen, Zap, X } from "lucide-react";

const ExitIntentModal = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only desktop, only once per session, and only when moving to the top
      if (
        window.innerWidth >= 1024 && 
        e.clientY <= 0 && 
        !sessionStorage.getItem("exit_intent_shown")
      ) {
        setIsVisible(true);
        sessionStorage.setItem("exit_intent_shown", "true");
      }
    };
    const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) return;

  const progress = scrollTop / docHeight;

  if (
    window.innerWidth < 1024 &&
    progress >= 0.6 &&
    !sessionStorage.getItem("exit_intent_shown")
  ) {
    setIsVisible(true);
    sessionStorage.setItem("exit_intent_shown", "true");
  }
};

    document.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("scroll", handleScroll);

return () => {
  document.removeEventListener("mouseleave", handleMouseLeave);
  document.removeEventListener("scroll", handleScroll);
};

  }, []);

  if (!isVisible) return null;

  const handleClose = () => setIsVisible(false);
  const handleConfirm = () => {
    window.location.href = "https://mascotaequilibrada.com/cart/add?id=57475776184707&quantity=1";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-dark border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center"
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6 inline-flex p-4 bg-secondary/10 rounded-full">
          <Zap className="w-8 h-8 text-secondary" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">No es rebeldía. Es ansiedad por separación. 🐶</h2>
        
        <p className="text-lg text-slate-300 mb-10 leading-relaxed">
          

Si cierras ahora, seguirá entrando en pánico cada vez que lo dejes solo.

Pero puedes empezar hoy mismo a devolverle la calma — sin castigos y con 7 días de garantía.

</p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleConfirm}
            className="w-full py-4 bg-secondary hover:bg-green-600 text-white font-bold text-xl rounded-full shadow-lg shadow-secondary/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Quiero devolverle la calma
          </button>
          
          <button 
            onClick={handleClose}
            className="w-full py-3 text-slate-500 hover:text-slate-300 font-medium transition-colors"
          >
            Ahora no
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const CTAButton = ({ children, className = "", primary = true, href = "https://mascotaequilibrada.com/cart/57475776184707:1" }: { children: React.ReactNode, className?: string, primary?: boolean, href?: string }) => {
  const handleClick = () => {
    // Meta Pixel Tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    window.location.href = href;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
        primary 
          ? "bg-primary text-white hover:bg-orange-600" 
          : "bg-secondary text-white hover:bg-green-600"
      } ${className}`}
    >
      {children}
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  );
};

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-5xl mx-auto">
      {children}
    </div>
  </section>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-dark">
      <ExitIntentModal />
      {/* HERO SECTION - DARK */}
      <Section className="bg-dark text-white pt-24 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6 tracking-wider uppercase">
              Método de Reeducación Emocional
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Tu perro no está siendo “malo”… <span className="text-primary">está entrando en pánico cuando te vas.</span>
           <p className="text-lg md:text-xl text-slate-300 mb-8 font-medium">
  Descubre el método Reset Canino que ya está ayudando a dueños a eliminar la ansiedad por separación y volver a tener un hogar tranquilo.
</p>

<p className="text-md text-slate-400 mb-6">
Cuando cierras la puerta, tu perro no sabe si vas a volver.
</p>
           
            <p className="text-sm text-slate-400 mb-6">
  ✅ 7 días de garantía • ⭐ 5.0 valorado por dueños • Acceso inmediato
</p>
           

            <CTAButton className="mb-6" href="https://mascotaequilibrada.com/cart/57475776184707:1">Quiero devolverle la calma</CTAButton>
            <p className="text-center text-xs text-slate-300 mt-2">
  🛡️ 7 días de garantía – Prueba sin riesgo
</p>
            
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?img=${i+10}`} 
                    className="w-8 h-8 rounded-full border-2 border-dark" 
                    alt="User" 
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <p>Cientos de dueños ya han aplicado este método</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="relative group perspective-1000">
            {/* Table Surface Effect */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-black/20 blur-xl rounded-full"></div>
            
            <div className="relative z-10 rounded-r-lg overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transform transition-all duration-700 group-hover:rotate-y-[-5deg] group-hover:translate-x-2">
              {/* This is the eBook Mockup Container */}
              <div className="relative aspect-[3/4] bg-slate-800">
               
                {/* Fondo emocional */}
<img
src="/dog-anxiety-hero.jpeg"
  alt="Perro con ansiedad por separación"
  className="absolute inset-0 w-full h-full object-cover opacity-80"
/>

{/* Capa oscura para que el texto/badge se lea bien */}
<div className="absolute inset-0 bg-black/25" />


              
              {/* Badge on image */}
              <div className="absolute top-6 right-6 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2 z-20">
                <BookOpen className="w-4 h-4" />
                LIBRO DIGITAL
              </div>
            </div>
            
            {/* Glow effects */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          </FadeIn>
        </div>
      </Section>

      {/* NEW SECTION: EL DOLOR - DARK */}
      <Section className="bg-dark text-white border-y border-white/10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Te sientes identificado con alguna de estas situaciones?</h2>
            <p className="text-lg text-slate-300">Tener un perro con ansiedad no solo afecta a tu mascota, destruye tu calidad de vida.</p>
          </div>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <XCircle className="text-primary" />, text: "El nudo en el estómago cada vez que abres la puerta de casa." },
            { icon: <XCircle className="text-primary" />, text: "La culpa insoportable por haber perdido los nervios con él." },
            { icon: <XCircle className="text-primary" />, text: "El miedo a que los vecinos se quejen por los ladridos." },
            { icon: <XCircle className="text-primary" />, text: "Gastar cientos de euros en muebles que terminan destrozados." }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white/5 p-6 rounded-2xl border-2 border-white/10 h-full flex flex-col items-center text-center hover:border-primary transition-colors">
                <div className="mb-4">{item.icon}</div>
                <p className="text-slate-300 font-medium leading-relaxed">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.4}>
          <p className="text-center mt-12 text-xl font-bold text-primary italic">
            "No eres un mal dueño, solo te falta el método adecuado para resetear su mente."
          </p>
        </FadeIn>
      </Section>

      {/* BLOQUE 2 - LO QUE VAS A LOGRAR - DARK */}
      <Section className="bg-dark text-white">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Lo que vas a desbloquear con <span className="text-primary">Reset Canino</span>
          </h2>
        </FadeIn>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Cómo eliminar la ansiedad por separación",
            "Cómo detener destrozos y conductas destructivas",
            "Método paso a paso para crear equilibrio emocional",
            "Técnicas prácticas para calmar sin castigos",
            "Cómo fortalecer el vínculo y generar obediencia natural",
            "Rutinas simples que transforman el comportamiento"
          ].map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 shadow-sm hover:border-primary/50 transition-all">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <p className="font-semibold text-slate-200">{item}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* BLOQUE 3 - EXPLICACIÓN DEL MÉTODO - DARK */}
      <Section className="bg-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Esto no es otro manual genérico de adiestramiento.</h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Reset Canino es un sistema práctico y probado para reeducar la mente y el comportamiento de tu perro desde la raíz.
            </p>
          </FadeIn>
          
          <div className="grid gap-8 text-left">
            <FadeIn delay={0.1}>
              <div className="bg-white/5 p-8 rounded-3xl border-2 border-white/10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Zap className="text-primary" /> No trabajamos solo la conducta.
                </h3>
                <p className="text-lg text-slate-200 font-medium">Trabajamos la emoción que la provoca.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6 text-lg text-slate-300">
                <p>Vas a entender:</p>
                <ul className="space-y-4">
                  <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0" /> Por qué tu perro actúa así.</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0" /> Qué estás haciendo sin darte cuenta que refuerza el problema.</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0" /> Cómo reprogramar su comportamiento con rutinas simples y efectivas.</li>
                </ul>
                <p className="font-bold text-white border-l-4 border-primary pl-4 py-2 bg-primary/10">
                  Nada de teorías vacías. Es directo, claro y aplicable desde el primer día.
                </p>
                <p className="text-2xl font-bold text-center pt-8">El objetivo es uno solo: <span className="text-primary underline decoration-2 underline-offset-8">Recuperar la calma en tu hogar.</span></p>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.4} className="mt-16">
            <CTAButton className="mx-auto" primary={true} href="https://mascotaequilibrada.com/cart/57475776184707:1">Quiero devolverle la calma</CTAButton>
          </FadeIn>
        </div>
      </Section>

      {/* BLOQUE 4 - PASO A PASO DEL MÉTODO - DARK */}
      <Section className="bg-dark text-white">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">El Método Paso a Paso</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Entender la raíz emocional",
              desc: "Descubre cómo la ansiedad se forma y cómo empezar a neutralizarla desde el primer día."
            },
            {
              step: "02",
              title: "Reeducar comportamiento con estructura",
              desc: "Aprende el sistema de rutinas que generan estabilidad y seguridad emocional."
            },
            {
              step: "03",
              title: "Consolidar equilibrio y obediencia natural",
              desc: "Implementa el método que transforma estrés en tranquilidad duradera."
            }
          ].map((item, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <div className="relative p-8 bg-white/5 rounded-3xl border-2 border-white/10 hover:border-primary transition-colors h-full">
                <span className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white flex items-center justify-center rounded-xl font-bold text-xl shadow-lg">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mb-4 mt-4 text-white">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* BLOQUE 5 - EJEMPLO VISUAL / HISTORIA - DARK */}
      <Section className="bg-dark text-white overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Imagina salir de casa sin miedo a encontrar destrozos.</h2>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h4 className="text-red-400 font-bold uppercase tracking-wider text-sm">La Pesadilla Actual:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-400"><XCircle className="w-4 h-4" /> Miedo al volver a casa</li>
                  <li className="flex items-center gap-2 text-slate-400"><XCircle className="w-4 h-4" /> Dinero tirado en destrozos</li>
                  <li className="flex items-center gap-2 text-slate-400"><XCircle className="w-4 h-4" /> Gritos y frustración</li>
                  <li className="flex items-center gap-2 text-slate-400"><XCircle className="w-4 h-4" /> Ansiedad compartida</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-secondary font-bold uppercase tracking-wider text-sm">Tu Nueva Realidad:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-white font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> Silencio y paz al entrar</li>
                  <li className="flex items-center gap-2 text-white font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> Un perro que sabe esperar</li>
                  <li className="flex items-center gap-2 text-white font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> Vínculo basado en amor</li>
                  <li className="flex items-center gap-2 text-white font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> Libertad para salir</li>
                </ul>
              </div>
            </div>
            
            <p className="text-lg text-slate-300 italic border-l-2 border-secondary pl-6">
              Eso es lo que ocurre cuando aplicas Reset Canino. Funciona porque trabaja mente, emoción y comportamiento al mismo tiempo.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://i.postimg.cc/Y0m9RNkN/Diseno-sin-titulo-(12).png" 
                alt="Transformación Reset Canino" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

     {/* BLOQUE EXTRA - BONOS - NEUTRAL */}
<Section className="bg-neutral">
  <FadeIn className="text-center">
    <h2 className="text-3xl md:text-5xl font-bold mb-3">
      Y eso no es todo… Llévate estos{" "}
      <span className="text-primary">Bonos</span> para cortar el caos más rápido
    </h2>

    <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10">
      Pensados para el peor momento: <b>ladridos</b>, <b>puerta arañada</b>, <b>muebles rotos</b> y la
      sensación de “no puedo más”. <span className="text-green-700 font-bold">Hoy van GRATIS</span> con tu compra.
    </p>

    <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-white/70 shadow-xl overflow-hidden">
      <div className="px-6 md:px-10 pt-8 pb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-4">
          🎁 Bonos VIP incluidos hoy
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold mb-1">
          Hoy recibes <span className="text-primary">3 Bonos VIP</span>
        </h3>
        <p className="text-slate-600 mb-8">para acelerar resultados desde el primer día</p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {/* BONO 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  🧯
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">BONO 1</p>
                  <p className="text-lg font-extrabold leading-snug">
                    Protocolo “Me voy de casa”
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                HOY GRATIS
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4">
              Qué hacer <b>antes de salir</b> para reducir el pánico: menos ladridos, menos arañazos
              y menos destrozos desde el inicio.
            </p>

            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="line-through text-slate-400">19€</span>
              <span className="text-green-700">HOY GRATIS</span>
            </div>
          </div>

          {/* BONO 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  🎧
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">BONO 2</p>
                  <p className="text-lg font-extrabold leading-snug">
                    Audio guiado (15 min): “Calma antes de salir”
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                HOY GRATIS
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4">
              Un audio corto para aplicar en rutina y empezar a reeducar el estado emocional del perro
              <b> sin gritos ni castigos</b>.
            </p>

            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="line-through text-slate-400">17€</span>
              <span className="text-green-700">HOY GRATIS</span>
            </div>
          </div>

          {/* BONO 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  🎬
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">BONO 3</p>
                  <p className="text-lg font-extrabold leading-snug">
                    Video resumen (5 min): “Qué hacer HOY”
                  </p>
                </div>
              </div>
              {/* SUPER BONO IA */}
<div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm">

<h3 className="text-2xl font-bold mb-4">🎁 SUPER BONO ESPECIAL</h3>

<p className="mb-4">
Al adquirir <b>Reset Canino</b> recibirás acceso a un <b>Asistente Inteligente con IA</b>
que te acompañará mientras aplicas el método.
</p>

<p className="mb-4">
Podrás preguntarle cualquier duda sobre:
</p>

<ul className="mb-4 space-y-2">
<li>✔ Cómo aplicar los ejercicios correctamente</li>
<li>✔ Qué hacer si tu perro sigue ladrando</li>
<li>✔ Cómo adaptar el método a tu caso</li>
<li>✔ Resolver cualquier duda sobre el comportamiento de tu perro</li>
</ul>

<p className="mb-4 font-semibold">
Disponible 24 horas al día, 7 días a la semana.
</p>

<p className="mb-6">
Es como tener un entrenador canino personal acompañándote durante todo el proceso.
</p>

<div className="text-xl font-bold">
Valor real: <span className="line-through">39€</span>
<span className="text-green-600 ml-2">HOY GRATIS</span>
</div>

</div>

            <p className="text-slate-600 leading-relaxed mb-4">
              Si tienes poco tiempo, te deja clarísimo lo esencial para empezar hoy y evitar el ciclo:
              <b> te vas → ladra → rompe → vuelves con culpa</b>.
            </p>

            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="line-through text-slate-400">19€</span>
              <span className="text-green-700">HOY GRATIS</span>
            </div>
          </div>
        </div>
<div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm">

<h3 className="text-2xl font-bold mb-4">
🎁 SUPER BONO ESPECIAL
</h3>

<p className="mb-4">
Al adquirir Reset Canino, recibirás acceso a un asistente inteligente exclusivo que te acompañará durante todo el proceso.
</p>

<p className="mb-4">
Podrás usarlo para:
</p>

<ul className="mb-4 space-y-2">
<li>✔ resolver cualquier duda sobre el método</li>
<li>✔ adaptar los ejercicios a tu perro</li>
<li>✔ recibir orientación paso a paso</li>
<li>✔ obtener ayuda cuando la necesites</li>
</ul>

<p className="mb-4">
Disponible 24 horas al día, 7 días a la semana.
</p>

<p className="mb-4">
Es como tener un entrenador canino personal acompañándote durante todo el proceso.
</p>

<p className="mb-4">
💡 Este asistente fue creado específicamente para complementar el método Reset Canino y ayudarte a obtener mejores resultados.
</p>

<p className="font-bold">
Valor de este bono: $39€
</p>

<p className="text-green-600 font-bold mt-2">
Pero hoy lo recibes GRATIS con tu acceso a Reset Canino.
</p>

<div className="mt-8 text-center">

<p className="text-lg">Programa Reset Canino → $49€</p>

<p className="text-lg">Bonus Rutina Anti Ansiedad → $19€</p>
<p className="text-lg">Bonus Audio guiado (15 min):Calma antes de salir → $17€</p>
<p className="text-lg">Bonus Video resumen(5 min): → $19€</p>

<p className="text-lg font-bold">🎁 Asistente Inteligente IA → $39€</p>

<hr className="my-4"/>

<p className="text-lg">Valor total real: $143€</p>

<p className="text-xl font-bold mt-2">
Pero hoy no pagarás $143€
</p>

<p className="text-lg mt-2">
Hoy puedes acceder a todo por solo:
</p>

<p className="text-3xl font-extrabold text-green-600 mt-2">
$19.97€
</p>

</div>
        <div className="mt-8 text-center">
          <p className="text-xl font-extrabold">
            Valor total: <span className="line-through text-slate-400">32,91€</span>{" "}
            <span className="text-green-700">HOY GRATIS</span>
          </p>
          <p className="text-slate-600 mt-1">
            Te los llevas sin coste adicional. Solo pagas <b>19,97€</b> por todo.
          </p>
        </div>
      </div>
    </div>
  </FadeIn>
</Section>

    

      {/* BLOQUE EXTRA - TESTIMONIOS - DARK */}
      <Section className="bg-dark text-white border-y border-white/10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Lo que dicen otros dueños que ya han <span className="text-primary">recuperado la paz</span>
          </h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "María García",
              city: "Madrid",
              dog: "Lucas (Beagle, 3 años)",
              story: "Lucas rascaba la puerta hasta sangrar y aullaba sin parar cada vez que me iba. En solo 12 días aplicando el método, se queda tranquilo en su cama. He recuperado mi libertad y él su paz.",
              photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Javier López",
              city: "Barcelona",
              dog: "Thor (Pastor Alemán, 5 años)",
              story: "Los vecinos me amenazaron con denuncias por los ladridos constantes de Thor. Estaba desesperado. Tras 2 semanas con el método, su nivel de alerta ha bajado radicalmente. Ahora duerme profundamente incluso si hay gente en el pasillo.",
              photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              name: "Elena Martínez",
              city: "Valencia",
              dog: "Lola (Golden Retriever, 2 años)",
              story: "Lola destrozaba las patas de las mesas y marcos de puertas por ansiedad. Gasté una fortuna en etólogos sin éxito. Con Reset Canino, en 15 días dejó de morder muebles y por fin descansa tranquila.",
              photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150&h=150"
            }
          ].map((testimonial, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col h-full hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-primary text-xs font-medium">{testimonial.city}, España</p>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider mt-1">{testimonial.dog}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-slate-300 italic leading-relaxed text-sm">"{testimonial.story}"</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* BLOQUE 6 - OFERTA - DARK */}
      <Section className="bg-dark text-white">
        <div className="max-w-4xl mx-auto bg-white/5 rounded-[3rem] p-8 md:p-16 border-2 border-primary/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 bg-primary text-white px-8 py-2 font-bold transform rotate-45 translate-x-10 translate-y-4 shadow-lg">
            OFERTA HOY
          </div>
          
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Hoy puedes acceder por solo <span className="text-primary">19,97€</span></h2>
            <p className="text-xl text-slate-400 line-through mb-4">Antes 29,97€</p>
            
            <div className="flex flex-col items-center gap-1 mb-8">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">🚀 Oferta de Lanzamiento</span>
              <span className="text-slate-300 text-sm">Precio Especial por tiempo limitado</span>
              <span className="text-red-400 text-xs font-semibold">⚠️ El precio subirá a 29,97€ pronto</span>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl mb-12 text-left border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <BookOpen className="text-primary" /> Acceso inmediato al eBook completo Reset Canino:
              </h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 font-medium text-slate-200"><CheckCircle2 className="text-primary w-5 h-5" /> Método completo paso a paso</li>
                <li className="flex items-center gap-3 font-medium text-slate-200"><CheckCircle2 className="text-primary w-5 h-5" /> Aplicación práctica desde el primer día</li>
                <li className="flex items-center gap-3 font-medium text-slate-200"><CheckCircle2 className="text-primary w-5 h-5" /> Acceso digital inmediato</li>
                <li className="flex items-center gap-3 font-medium text-slate-200"><CheckCircle2 className="text-primary w-5 h-5" /> Actualizaciones incluidas</li>
              </ul>
            </div>
            
            <CTAButton className="mx-auto scale-110" primary={true} href="https://mascotaequilibrada.com/cart/57475776184707:1">Quiero devolverle la calma</CTAButton>
          </FadeIn>
        </div>
      </Section>

      {/* BLOQUE 7 - GARANTÍA - DARK */}
      <Section className="bg-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="inline-block p-4 bg-white/5 border-2 border-primary rounded-full shadow-xl mb-8">
              <ShieldCheck className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">7 Días de Garantía Total</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Si en 7 días no notas cambios reales en la conducta de tu perro, te devolvemos el dinero sin preguntas.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <span>Sin riesgo</span>
              <span>•</span>
              <span>Sin preguntas</span>
              <span>•</span>
              <span>Sin complicaciones</span>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* BLOQUE 8 - PARA QUIÉN ES - DARK */}
      <Section className="bg-dark text-white">
        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Este método es para ti si:</h2>
            <ul className="space-y-6">
              {[
                "Te sientes prisionero en tu propia casa por no poder dejarlo solo.",
                "Estás harto de gastar dinero en soluciones que no funcionan.",
                "Sientes que tu vínculo con él se está rompiendo por el estrés.",
                "Te duele verlo sufrir y no saber cómo ayudarlo a calmarse."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg font-medium text-slate-300">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="bg-white/5 text-white p-10 rounded-[2.5rem] shadow-xl border border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-primary">No necesitas:</h2>
              <ul className="space-y-6">
                {[
                  "Ser adiestrador",
                  "Tener experiencia previa",
                  "Usar castigos"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-slate-400">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-10 font-bold text-xl text-center text-white">
                Solo necesitas aplicar el paso a paso.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* BLOQUE 9 - SOBRE EL AUTOR - DARK */}
      <Section className="bg-dark text-white">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <FadeIn className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-primary/20 shadow-2xl">
              <img 
                src="https://i.postimg.cc/MHVVYQzf/Gemini-Generated-Image-z4n2dez4n2dez4n2.png" 
                alt="Especialista en comportamiento canino" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <Star className="w-5 h-5 text-primary fill-primary" />
              <Star className="w-5 h-5 text-primary fill-primary" />
              <Star className="w-5 h-5 text-primary fill-primary" />
              <Star className="w-5 h-5 text-primary fill-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Sobre el Autor</h2>
            <p className="text-xl font-semibold text-primary mb-6">Más de 12 años transformando la vida de perros y sus familias.</p>
            
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-8">
              <p>
                Mi enfoque no se basa en la obediencia ciega, sino en la <span className="text-white font-bold">reeducación emocional</span>. Entender qué siente el perro es la única forma de cambiar lo que hace.
              </p>
              
              <p>
                <span className="text-primary font-bold">¿Por qué creé Reset Canino?</span> Porque estaba harto de ver cómo los métodos tradicionales fallaban al tratar solo los síntomas (los destrozos, los ladridos) sin tocar la raíz: el miedo y la inseguridad.
              </p>
              
              <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-primary italic">
                "Hace años, mi propio perro Max sufría una ansiedad tan severa que los 'expertos' me recomendaron medicación de por vida. Me negué a aceptarlo. Esa búsqueda desesperada de una solución real fue lo que dio vida a este método."
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <User className="text-primary w-5 h-5" />
                <span className="font-bold text-slate-200 text-sm">+500 Casos de Éxito</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <Zap className="text-primary w-5 h-5" />
                <span className="font-bold text-slate-200 text-sm">Método 100% Práctico</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* BLOQUE FINAL - CIERRE DE CONVERSIÓN - DARK */}
      <Section className="bg-dark text-white text-center py-32">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            La diferencia entre seguir igual… <br />
            o recuperar la tranquilidad… <br />
            <span className="text-primary italic">es una decisión.</span>
          </h2>
          
          <p className="text-2xl mb-12 text-slate-300">Hoy está disponible por <span className="text-white font-bold">19,97€</span>.</p>
          
          <p className="text-lg mb-12 text-slate-400">Haz clic ahora y empieza el cambio.</p>
          
          <div className="flex flex-col items-center gap-8">
            <CTAButton className="scale-125" primary={true} href="https://mascotaequilibrada.com/cart/57475776184707:1">QUIERO EMPEZAR EL CAMBIO</CTAButton>
            
            <div className="flex items-center gap-4 text-slate-500">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-widest">Pago 100% Seguro & Encriptado</span>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* FOOTER */}
      <footer className="bg-dark border-t border-white/5 py-12 px-6 text-center text-slate-600 text-sm">
        <div className="max-w-5xl mx-auto">
          <p className="mb-4">© {new Date().getFullYear()} Reset Canino. Todos los derechos reservados.</p>
          <p className="max-w-2xl mx-auto opacity-50">
            Este sitio no forma parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca registrada de FACEBOOK, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
