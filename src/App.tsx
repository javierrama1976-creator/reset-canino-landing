<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="description" content="Reset Canino: protocolo simple de rutinas y regulación emocional para reducir ansiedad por separación, hiperactividad y destrucción desde la primera semana. Sin castigos." />
  <meta name="theme-color" content="#ff6a00" />
  <title>Reset Canino — Calma real en 7 días</title>

  <!-- Performance: warm up checkout domain -->
  <link rel="dns-prefetch" href="//mascotaequilibrada.com">
  <link rel="preconnect" href="https://mascotaequilibrada.com" crossorigin>

  <!-- (Opcional) Preload de hero si ya tienes la imagen final -->
  <link rel="preload" as="image" href="/img/hero.webp" imagesrcset="/img/hero.webp" />

  <style>
    :root{
      --bg:#ffffff;
      --muted:#f6f7f9;
      --text:#14161a;
      --sub:#4b5563;
      --card:#ffffff;
      --border:rgba(20,22,26,.12);
      --shadow:0 10px 30px rgba(20,22,26,.08);
      --cta:#ff6a00;
      --ctaText:#ffffff;
      --ok:#0f766e;
      --warn:#b45309;
      --container: 980px;
      --radius: 14px;
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    html{scroll-behavior:smooth}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      color:var(--text);
      background:var(--bg);
      line-height:1.55;
      -webkit-font-smoothing:antialiased;
      text-rendering:optimizeLegibility;
    }

    a{color:inherit}
    img{max-width:100%; height:auto; display:block}
    .container{max-width:var(--container); margin:0 auto; padding:0 18px}
    .section{padding:54px 0}
    .section.muted{background:var(--muted)}
    .grid{display:grid; gap:22px; align-items:center}

    @media (min-width: 960px){
      .grid.hero{grid-template-columns: 1.1fr .9fr;}
      .grid.cards3{grid-template-columns: repeat(3,1fr);}
      .grid.cards2{grid-template-columns: repeat(2,1fr);}
      .grid.cards4{grid-template-columns: repeat(4,1fr);}
      .grid.cards5{grid-template-columns: repeat(5,1fr);}
      .grid.phases{grid-template-columns: repeat(3,1fr);}
      .grid.miniProof{grid-template-columns: repeat(3, 1fr);}
      .grid.shots{grid-template-columns: repeat(3, 1fr);}
      .grid.forwho{grid-template-columns: repeat(2,1fr);}
    }

    h1,h2,h3{margin:0 0 10px}
    h1{
      font-size: clamp(30px, 4vw, 44px);
      line-height:1.08;
      letter-spacing:-.02em;
    }
    h2{
      font-size: clamp(22px, 2.4vw, 30px);
      letter-spacing:-.01em;
      line-height:1.15;
    }
    h3{font-size:18px}
    p{margin:0 0 12px; color:var(--sub)}
    .lead{font-size: 18px; color:var(--sub)}
    .kicker{font-weight:700; color:var(--ok); font-size:13px; letter-spacing:.08em; text-transform:uppercase}

    .empathy{
      margin-top:12px;
      padding:12px 14px;
      border:1px solid var(--border);
      border-radius:12px;
      background:rgba(255,106,0,.06);
      color:#3b2a1a;
      font-weight:700;
    }

    .card{
      background:var(--card);
      border:1px solid var(--border);
      border-radius:var(--radius);
      padding:18px;
      box-shadow: var(--shadow);
    }
    .card.soft{box-shadow:none}
    .badge{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:6px 10px;
      border-radius:999px;
      border:1px solid var(--border);
      background:#fff;
      font-size:13px;
      color:var(--sub);
      white-space:nowrap;
    }

    .checklist{margin:14px 0 0; padding:0; list-style:none; display:grid; gap:10px;}
    .checklist li{display:flex; gap:10px; align-items:flex-start; color:var(--text);}
    .check{
      width:22px; height:22px; border-radius:7px;
      display:grid; place-items:center;
      background:rgba(15,118,110,.12);
      color:var(--ok);
      flex:0 0 auto;
      font-weight:900;
    }

    .subnote{font-size:13px; color:var(--sub)}
    .mutedText{color:var(--sub)}
    .center{text-align:center}
    .tight{margin-bottom:6px}
    .mt8{margin-top:8px}
    .mt14{margin-top:14px}
    .mt18{margin-top:18px}
    .mt24{margin-top:24px}
    .mb0{margin-bottom:0}

    .ctaRow{display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-top:16px}
    .btn{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:10px;
      padding:16px 18px;
      border-radius:14px;
      background:var(--cta);
      color:var(--ctaText);
      text-decoration:none;
      font-weight:900;
      letter-spacing:.01em;
      border:1px solid rgba(0,0,0,.06);
      box-shadow: 0 12px 24px rgba(255,106,0,.25);
      min-width: 220px;
      will-change: transform;
      transform: translateZ(0);
      cursor:pointer;
    }
    .btn:active{transform: scale(.99)}
    .btn.secondary{
      background:#111827;
      box-shadow: 0 12px 24px rgba(17,24,39,.18);
    }

    .trustRow{display:flex; gap:12px; flex-wrap:wrap; margin-top:10px}
    .trustRow span{font-size:13px; color:var(--sub)}

    .anchorLinks{display:flex; gap:10px; flex-wrap:wrap; margin-top:14px}
    .anchorLinks a{
      font-size:13px;
      color:var(--sub);
      text-decoration:none;
      border-bottom:1px dashed rgba(75,85,99,.45);
    }

    .btn:focus-visible, a:focus-visible, summary:focus-visible{
      outline: 3px solid rgba(255,106,0,.45);
      outline-offset: 3px;
    }

    .heroMedia{
      border-radius:var(--radius);
      overflow:hidden;
      border:1px solid var(--border);
      background:#fff;
      box-shadow: var(--shadow);
    }
    .heroMedia img{
      width:100%;
      height:auto;
    }

    .offer{
      border:2px solid rgba(255,106,0,.28);
      background: linear-gradient(180deg, rgba(255,106,0,.06), rgba(255,255,255,1));
    }
    .lineItem{
      display:flex; justify-content:space-between; gap:12px;
      padding:10px 0; border-bottom:1px solid var(--border);
      color:var(--text);
    }
    .lineItem:last-child{border-bottom:none}
    .strike{color:var(--sub); text-decoration:line-through; white-space:nowrap}
    .valueRow{
      margin-top:14px;
      padding-top:14px;
      border-top:1px solid var(--border);
      display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;
    }
    .price{
      font-size: clamp(34px, 4vw, 52px);
      letter-spacing:-.02em;
      font-weight:900;
      color:var(--cta);
      line-height:1;
    }
    .smallCaps{
      font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--sub); font-weight:900
    }

    .gift{
      background: #fff7ed;
      border:2px solid rgba(180,83,9,.22);
    }
    .gift .title{
      display:flex; align-items:center; gap:10px;
      font-weight:900;
      color:#7c2d12;
    }

    .urgencyBar{
      padding:14px 16px;
      border:1px dashed rgba(180,83,9,.35);
      border-radius:14px;
      background:#fff;
      margin-top:14px;
      display:flex;
      gap:10px;
      align-items:flex-start;
      justify-content:space-between;
    }
    .urgencyBar strong{color:var(--warn)}
    .urgencyBar .note{font-size:13px; color:var(--sub); margin-top:4px}

    /* Sticky mobile CTA */
    .sticky{
      position:fixed;
      left:0; right:0; bottom:0;
      padding:10px 12px calc(10px + env(safe-area-inset-bottom));
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(10px);
      border-top:1px solid var(--border);
      display:flex;
      gap:10px;
      align-items:center;
      justify-content:space-between;
      z-index:50;
    }
    .sticky .mini{display:flex; flex-direction:column; gap:2px; min-width: 140px;}
    .sticky .mini .p{font-weight:900; color:var(--text)}
    .sticky .mini .s{font-size:12px; color:var(--sub)}
    .sticky .btn{min-width: 0; width: 100%; padding:14px 14px}

    @media (min-width: 960px){ .sticky{display:none} }
    @media (max-width: 959px){ body{padding-bottom:78px} }

    .media{
      border-radius:14px;
      overflow:hidden;
      border:1px solid var(--border);
      background:#fff;
      min-height: 220px;
    }
    .media .ph{aspect-ratio: 16/9; background:linear-gradient(135deg, rgba(0,0,0,.04), rgba(0,0,0,.02))}

    .cv{ content-visibility: auto; contain-intrinsic-size: 900px; }

    /* Reveal */
    .reveal{opacity:0; transform:translateY(14px); transition:opacity .55s ease, transform .55s ease; will-change:opacity,transform;}
    .reveal.is-visible{opacity:1; transform:translateY(0);}
    .reveal.fade{transform:none;}
    .reveal.left{transform:translateX(-14px);}
    .reveal.right{transform:translateX(14px);}
    .reveal.zoom{transform:scale(.98);}
    @media (prefers-reduced-motion: reduce){
      html{scroll-behavior:auto}
      .reveal{opacity:1 !important; transform:none !important; transition:none !important;}
    }

    .miniProofCard{
      display:flex; gap:10px; align-items:flex-start;
      padding:12px 14px;
      border:1px solid var(--border);
      border-radius:14px;
      background:#fff;
      box-shadow: var(--shadow);
    }
    .miniProofCard b{display:block; margin-bottom:2px}
    .star{color:#f59e0b; font-weight:900}

    .psy{
      border:2px solid rgba(15,118,110,.20);
      background: linear-gradient(180deg, rgba(15,118,110,.06), rgba(255,255,255,1));
    }
    .psy .headline{
      display:flex; gap:10px; align-items:flex-start;
      font-weight:900;
      color:#064e3b;
      margin-bottom:10px;
    }

    .shot{
      border-radius:14px;
      border:1px solid var(--border);
      overflow:hidden;
      background:#fff;
      box-shadow: var(--shadow);
    }
    .shot img{width:100%; height:auto;}
    .shot .cap{
      padding:12px 14px;
      border-top:1px solid var(--border);
      font-size:13px;
      color:var(--sub);
    }

    /* Modal compatible (sin <dialog>) */
    .modalOverlay{
      position:fixed; inset:0;
      background: rgba(0,0,0,.45);
      display:none;
      align-items:center;
      justify-content:center;
      padding:14px;
      z-index:80;
    }
    .modalOverlay.is-open{display:flex;}
    .modalBox{
      width:min(560px, calc(100% - 24px));
      background:#fff;
      border-radius: 18px;
      box-shadow: 0 30px 80px rgba(0,0,0,.25);
      overflow:hidden;
    }
    .modalHead{
      padding:16px 18px;
      background: linear-gradient(180deg, rgba(255,106,0,.10), #fff);
      border-bottom:1px solid var(--border);
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:12px;
    }
    .modalHead h3{margin:0; font-size:18px}
    .modalBody{padding:16px 18px}
    .modalClose{
      appearance:none;
      border:1px solid var(--border);
      background:#fff;
      border-radius:12px;
      padding:8px 10px;
      font-weight:900;
      cursor:pointer;
    }
    .modalBody .btn{width:100%; min-width:0}
  </style>
</head>

<body>

  <!-- Sticky CTA (mobile) -->
  <div class="sticky" role="region" aria-label="Acceso rápido al checkout">
    <div class="mini">
      <div class="p">19,97€</div>
      <div class="s">Pago único · Acceso inmediato</div>
    </div>
    <a class="btn" data-cta="sticky" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">Empezar ahora</a>
  </div>

  <!-- HERO -->
  <header class="section">
    <div class="container">
      <div class="grid hero">
        <div>
          <div class="kicker reveal fade">RESET CANINO</div>

          <h1 class="reveal">Tu perro no destruye por rebeldía…<br>entra en pánico cuando te vas.</h1>

          <p class="lead reveal">
            Un <strong>protocolo simple (10–15 min/día)</strong> de rutinas y regulación emocional para reducir
            <strong>ladridos, destrucción y ansiedad por separación</strong> — <strong>sin castigos</strong>.
            Empieza a notar señales desde la <strong>primera semana</strong>.
          </p>

          <div class="card soft mt14 reveal">
            <strong>Ideal si tu perro:</strong>
            <div class="grid cards2 mt14">
              <ul class="checklist" style="margin:0">
                <li><span class="check">✓</span><span>Rasca puertas/paredes al salir</span></li>
                <li><span class="check">✓</span><span>Ladra o llora sin parar</span></li>
                <li><span class="check">✓</span><span>Te sigue como “sombra”</span></li>
              </ul>
              <ul class="checklist" style="margin:0">
                <li><span class="check">✓</span><span>Rompe cojines o muebles</span></li>
                <li><span class="check">✓</span><span>No sabe relajarse solo</span></li>
                <li><span class="check">✓</span><span>Se activa cuando coges llaves/bolso</span></li>
              </ul>
            </div>
          </div>

          <div class="empathy reveal">Cuando cierras la puerta, tu perro no sabe si vas a volver.</div>

          <div class="ctaRow reveal fade">
            <a class="btn" data-cta="hero" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">QUIERO EMPEZAR AHORA</a>
            <a class="btn secondary" href="#oferta">Ver oferta</a>
          </div>

          <div class="trustRow reveal fade" aria-label="Qué recibes">
            <span>📘 PDF + Plan 7 días</span>
            <span>🎧 Audioguía 15 min</span>
            <span>🤖 Asistente IA (link) 24/7</span>
          </div>

          <div class="grid miniProof mt18" aria-label="Prueba social rápida">
            <div class="miniProofCard reveal">
              <div class="star">★</div>
              <div><b>Menos caos</b><span class="mutedText">Más estructura en casa.</span></div>
            </div>
            <div class="miniProofCard reveal" style="transition-delay:80ms">
              <div class="star">★</div>
              <div><b>Más calma</b><span class="mutedText">Rutinas cortas diarias.</span></div>
            </div>
            <div class="miniProofCard reveal" style="transition-delay:160ms">
              <div class="star">★</div>
              <div><b>Sin castigos</b><span class="mutedText">Enfoque amable.</span></div>
            </div>
          </div>

          <div class="trustRow reveal fade" aria-label="Confianza">
            <span>🛡️ Garantía 7 días</span>
            <span>💳 Pago seguro</span>
            <span>✅ Pago único (sin suscripciones)</span>
          </div>

          <div class="anchorLinks reveal fade" aria-label="Secciones">
            <a href="#problema">¿Te pasa esto?</a>
            <a href="#bloque-psico">Por qué pasa</a>
            <a href="#para-quien">Para quién es</a>
            <a href="#metodo">Cómo funciona</a>
            <a href="#prueba">Resultados reales</a>
            <a href="#oferta">Oferta</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>

        <div class="heroMedia" aria-label="Imagen emocional del hero">
          <picture>
            <source srcset="/img/hero.webp" type="image/webp">
            <img
              src="/img/hero.webp"
              alt="Perro mirando la puerta (ansiedad por separación)"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </picture>
        </div>

      </div>
    </div>
  </header>

  <!-- PROBLEMA -->
  <section id="problema" class="section muted cv">
    <div class="container">
      <div class="reveal">
        <h2>¿Te pasa esto cuando estás por salir o cuando ya te fuiste?</h2>
        <p>Si te suena familiar, no estás solo. Y casi nunca es “mala conducta”.</p>
      </div>

      <div class="grid cards2 mt18">
        <div class="card soft reveal left">
          <ul class="checklist">
            <li><span class="check">✓</span><span>Rasca la puerta o paredes</span></li>
            <li><span class="check">✓</span><span>Ladra / llora sin parar</span></li>
            <li><span class="check">✓</span><span>Rompe cojines o muebles</span></li>
          </ul>
        </div>
        <div class="card soft reveal right">
          <ul class="checklist">
            <li><span class="check">✓</span><span>Jadea, se agita, babea</span></li>
            <li><span class="check">✓</span><span>Te sigue como una sombra</span></li>
            <li><span class="check">✓</span><span>No logra relajarse solo</span></li>
          </ul>
        </div>
      </div>

      <div class="card mt18 reveal">
        <strong>Esto suele ser ansiedad por separación / hiperactivación.</strong>
        <span class="mutedText"> La buena noticia: se puede mejorar cuando tu perro aprende a regularse con rutina y micro-pasos.</span>
      </div>
    </div>
  </section>

  <!-- BLOQUE PSICOLÓGICO -->
  <section id="bloque-psico" class="section cv">
    <div class="container">
      <div class="card psy reveal">
        <div class="headline">
          🧠 <span>No es tu culpa. Y no es “rebeldía”: es un sistema nervioso en alarma.</span>
        </div>

        <div class="grid cards2 mt14">
          <div class="card soft reveal left">
            <div class="badge">Lo que está pasando</div>
            <ul class="checklist">
              <li><span class="check">✓</span><span>Tu salida se convierte en un “disparador” (llaves, bolso, puerta).</span></li>
              <li><span class="check">✓</span><span>El cuerpo entra en estrés: ladridos, rascado, destrucción.</span></li>
              <li><span class="check">✓</span><span>No “elige” hacerlo: <strong>no sabe autorregularse</strong>.</span></li>
            </ul>
          </div>

          <div class="card soft reveal right">
            <div class="badge">Lo que suele empeorarlo</div>
            <ul class="checklist">
              <li><span class="check">✓</span><span><strong>Cansarlo más</strong> (más activación/cortisol).</span></li>
              <li><span class="check">✓</span><span><strong>Corregirlo</strong> al volver (asocia tu regreso con tensión).</span></li>
              <li><span class="check">✓</span><span>“Que se acostumbre” a base de pánico repetido.</span></li>
            </ul>
          </div>
        </div>

        <div class="card soft mt18 reveal">
          <strong>Lo que sí funciona:</strong>
          <span class="mutedText"> estructura + regulación + repetición diaria (10–15 min) para enseñar calma real.</span>
          <div class="ctaRow mt14">
            <a class="btn" data-cta="psy" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">Quiero el plan de 7 días</a>
            <div class="subnote">Acceso inmediato · Pago único · Garantía 7 días</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PARA QUIÉN -->
  <section id="para-quien" class="section muted cv">
    <div class="container">
      <h2 class="reveal">¿Para quién es Reset Canino? (y para quién NO)</h2>
      <p class="lead reveal">Esto filtra compradores, reduce devoluciones y mejora CVR en tráfico frío.</p>

      <div class="grid forwho mt18">
        <div class="card reveal left">
          <div class="badge">✅ Es para ti si…</div>
          <ul class="checklist">
            <li><span class="check">✓</span><span>Tu perro se activa cuando te preparas para salir.</span></li>
            <li><span class="check">✓</span><span>Hay ladridos, llanto, rascado o destrucción estando solo.</span></li>
            <li><span class="check">✓</span><span>Quieres un método <strong>amable</strong> (sin castigos ni gritos).</span></li>
            <li><span class="check">✓</span><span>Necesitas algo <strong>simple</strong>: 10–15 min/día.</span></li>
          </ul>
        </div>

        <div class="card reveal right">
          <div class="badge">❌ No es para ti si…</div>
          <ul class="checklist">
            <li><span class="check">✓</span><span>Buscas una “solución mágica” sin aplicar rutinas.</span></li>
            <li><span class="check">✓</span><span>Quieres métodos duros/agresivos para “dominar”.</span></li>
            <li><span class="check">✓</span><span>No puedes dedicar ni 10 minutos al día durante una semana.</span></li>
            <li><span class="check">✓</span><span>Tu caso requiere atención veterinaria urgente (dolor, enfermedad).</span></li>
          </ul>
          <p class="subnote mt14">Si hay síntomas físicos preocupantes, consulta a un veterinario.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ROMPER CREENCIA -->
  <section class="section cv">
    <div class="container">
      <div class="grid cards2">
        <div>
          <h2 class="reveal">No necesita más estímulos… necesita aprender a regular su mente.</h2>
          <p class="lead reveal">Menos “activación”, más calma real. Este cambio mental sube conversiones porque se siente diferente a lo típico.</p>

          <div class="card soft mt14 reveal">
            <div class="lineItem"><span>Más estímulos</span><span class="mutedText">→ más activación</span></div>
            <div class="lineItem"><span>Más correcciones</span><span class="mutedText">→ más miedo</span></div>
            <div class="lineItem"><span><strong>Rutina + regulación</strong></span><span class="mutedText">→ calma real</span></div>
          </div>

          <p class="mt14 reveal"><strong>Funciona incluso</strong> si ya probaste entrenadores, tutoriales o trucos sin resultados.</p>

          <div class="ctaRow reveal fade">
            <a class="btn" data-cta="belief" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">QUIERO EMPEZAR AHORA</a>
          </div>
          <div class="trustRow reveal fade">
            <span>🛡️ Garantía 7 días</span>
            <span>💳 Pago seguro</span>
          </div>
        </div>

        <div class="media reveal zoom" aria-label="Imagen transformacional">
          <div class="ph" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- MÉTODO -->
  <section id="metodo" class="section muted cv">
    <div class="container">
      <h2 class="reveal">Reset Canino: sistema paso a paso para recuperar la calma en casa</h2>
      <p class="lead reveal">Diseñado para dueños normales. Sin castigos. Sin gritos. Sin métodos agresivos.</p>

      <div class="grid cards5 mt18" aria-label="Qué desbloqueas">
        <div class="card reveal"><strong>✅ Regulación Canina</strong><p class="mb0">Baja activación y evita explosiones de energía.</p></div>
        <div class="card reveal" style="transition-delay:80ms"><strong>✅ Rutina Anti-Hiperactividad</strong><p class="mb0">Estructura diaria simple para calma real.</p></div>
        <div class="card reveal" style="transition-delay:160ms"><strong>✅ Comunicación Clara</strong><p class="mb0">Evita errores que confunden y empeoran todo.</p></div>
        <div class="card reveal" style="transition-delay:240ms"><strong>✅ Redirigir Conductas</strong><p class="mb0">Canaliza energía sin caos ni destrucción.</p></div>
        <div class="card reveal" style="transition-delay:320ms"><strong>✅ Plan Reset 7 Días</strong><p class="mb0">Primer paso práctico desde hoy.</p></div>
      </div>

      <h3 class="mt24 reveal">Cómo funciona (3 fases)</h3>
      <div class="grid phases mt14" aria-label="Fases">
        <div class="card reveal left">
          <div class="badge">Fase 1</div>
          <h3 class="tight">Detecta disparadores</h3>
          <p class="mb0">Qué lo activa y en qué momentos exactos ocurre.</p>
        </div>
        <div class="card reveal">
          <div class="badge">Fase 2</div>
          <h3 class="tight">Baja la activación</h3>
          <p class="mb0">Ejercicios simples para reducir estrés y recuperar control emocional.</p>
        </div>
        <div class="card reveal right">
          <div class="badge">Fase 3</div>
          <h3 class="tight">Entrena calma real</h3>
          <p class="mb0">Rutinas que enseñan a tu perro a relajarse cuando toca.</p>
        </div>
      </div>

      <p class="subnote mt14 reveal fade">⏱️ La mayoría de rutinas toman 10–15 min/día.</p>
    </div>
  </section>

  <!-- PRUEBA (capturas reales) -->
  <section id="prueba" class="section cv">
    <div class="container">
      <h2 class="reveal">Resultados reales (capturas)</h2>
      <p class="lead reveal">Pon aquí WhatsApp/IG/Correo (nombre oculto). Este bloque suele ser top-3 de conversión en tráfico frío.</p>

      <div class="grid shots mt18" aria-label="Grid de capturas">
        <figure class="shot reveal left">
          <img src="/img/shot1.webp" alt="Captura real 1 (testimonio)" loading="lazy" decoding="async" />
          <figcaption class="cap">“Dejó de arañar la puerta en 6 días.”</figcaption>
        </figure>

        <figure class="shot reveal">
          <img src="/img/shot2.webp" alt="Captura real 2 (testimonio)" loading="lazy" decoding="async" />
          <figcaption class="cap">“Menos ladridos cuando salgo.”</figcaption>
        </figure>

        <figure class="shot reveal right">
          <img src="/img/shot3.webp" alt="Captura real 3 (testimonio)" loading="lazy" decoding="async" />
          <figcaption class="cap">“Por fin se relaja y duerme más.”</figcaption>
        </figure>

        <figure class="shot reveal left">
          <img src="/img/shot4.webp" alt="Captura real 4 (testimonio)" loading="lazy" decoding="async" />
          <figcaption class="cap">“Rutina de 10–15 min, fácil.”</figcaption>
        </figure>

        <figure class="shot reveal">
          <img src="/img/shot5.webp" alt="Captura real 5 (testimonio)" loading="lazy" decoding="async" />
          <figcaption class="cap">“Me bajó la culpa y la ansiedad.”</figcaption>
        </figure>

        <figure class="shot reveal right">
          <img src="/img/shot6.webp" alt="Captura real 6 (testimonio)" loading="lazy" decoding="async" />
          <figcaption class="cap">“Sin castigos, sin gritos.”</figcaption>
        </figure>
      </div>

      <div class="card soft mt18 reveal">
        <strong>Tip para Meta Ads:</strong>
        <span class="mutedText"> 2–3 capturas con fecha (tapada parcialmente) suelen disparar credibilidad sin exponer datos.</span>
      </div>
    </div>
  </section>

  <!-- SEÑALES -->
  <section class="section muted cv">
    <div class="container">
      <h2 class="reveal">Señales que suelen aparecer en la primera semana</h2>
      <p class="lead reveal">No prometemos “perfección en 7 días”. Prometemos un <strong>inicio claro</strong> y señales medibles.</p>

      <div class="grid cards2 mt18">
        <div class="card soft reveal left">
          <ul class="checklist">
            <li><span class="check">✓</span><span>Menos activación al coger llaves/bolso</span></li>
            <li><span class="check">✓</span><span>Menos rascado/puerta/ventanas</span></li>
            <li><span class="check">✓</span><span>Más pausas y momentos de descanso</span></li>
          </ul>
        </div>
        <div class="card soft reveal right">
          <ul class="checklist">
            <li><span class="check">✓</span><span>Menos ladridos/llanto al salir</span></li>
            <li><span class="check">✓</span><span>Más calma dentro de casa</span></li>
            <li><span class="check">✓</span><span>Menos culpa, más control del día a día</span></li>
          </ul>
        </div>
      </div>

      <div class="card mt18 reveal">
        <strong>No es “solo un ebook”.</strong>
        <span class="mutedText"> Es un sistema para recuperar paz en casa con pasos claros y aplicables.</span>
      </div>
    </div>
  </section>

  <!-- OFERTA -->
  <section id="oferta" class="section cv">
    <div class="container">
      <h2 class="reveal">Hoy obtienes acceso a TODO</h2>
      <p class="lead reveal">Oferta simple, clara y sin distracciones (ideal para tráfico frío de Meta).</p>

      <div class="card offer mt18 reveal">
        <div class="lineItem"><span>📘 Ebook Reset Canino</span><span class="strike">39,97€</span></div>
        <div class="lineItem"><span>🎁 Bono 1 — Errores invisibles con juguetes</span><span class="strike">19€</span></div>
        <div class="lineItem"><span>🎧 Bono 2 — Audioguía Reset Canino (15 min)</span><span class="strike">27€</span></div>
        <div class="lineItem"><span>🎥 Bono 3 — Video resumen del método</span><span class="strike">19€</span></div>

        <div class="card gift mt18 reveal">
          <div class="title">🎁 BONO ESPECIAL (por tiempo limitado)</div>
          <h3 class="tight mt8">Asistente Virtual Reset Canino (IA) 24/7</h3>
          <p>Te acompaña para resolver dudas del método y adaptar los pasos a tu caso.</p>
          <ul class="checklist">
            <li><span class="check">✓</span><span>Qué hacer hoy exactamente</span></li>
            <li><span class="check">✓</span><span>Ajustes según tu perro y tu rutina</span></li>
            <li><span class="check">✓</span><span>Respuestas rápidas 24/7</span></li>
            <li><span class="check">✓</span><span>Acceso vía <strong>link</strong> (tras el pago)</span></li>
          </ul>
          <p class="mt14"><strong>Valor estimado: 67€</strong> · <span style="color:#9a3412;font-weight:900;">Hoy incluido</span></p>
        </div>

        <div class="urgencyBar reveal" role="status" aria-label="Urgencia del bono">
          <div>
            ⏳ <strong>Bono IA incluido por tiempo limitado</strong>
            <div class="note">Cuando se retire, el pack seguirá disponible pero sin el asistente 24/7.</div>
          </div>
          <div class="badge">Edición actual</div>
        </div>

        <div class="card soft mt18 reveal">
          <strong>✅ Recibes hoy mismo:</strong>
          <ul class="checklist" style="margin-top:10px">
            <li><span class="check">✓</span><span>Descarga inmediata del eBook (PDF)</span></li>
            <li><span class="check">✓</span><span>Acceso al audio (audioguía)</span></li>
            <li><span class="check">✓</span><span>Acceso al video resumen</span></li>
            <li><span class="check">✓</span><span>Link del Asistente IA 24/7</span></li>
          </ul>
          <p class="subnote mb0">Todo llega al instante tras el pago.</p>
        </div>

        <div class="valueRow reveal fade">
          <div>
            <div class="smallCaps">Valor total</div>
            <div style="font-weight:900;font-size:20px;color:#111827;">171,97€</div>
            <div class="subnote">Comparación: 1 sesión con adiestrador suele costar mucho más.</div>
          </div>
          <div>
            <div class="smallCaps">Hoy por solo</div>
            <div class="price">19,97€</div>
            <div class="subnote">Pago único · Acceso inmediato</div>
          </div>
        </div>

        <div class="ctaRow mt18 reveal fade">
          <a class="btn" data-cta="offer" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">EMPEZAR RESET CANINO AHORA</a>
        </div>
        <div class="trustRow reveal fade">
          <span>🛡️ Garantía 7 días</span>
          <span>💳 Pago seguro</span>
          <span>✅ Sin suscripciones</span>
        </div>
      </div>
    </div>
  </section>

  <!-- GARANTÍA -->
  <section class="section muted cv">
    <div class="container">
      <div class="card center reveal">
        <h2 class="mb0">🛡️ Garantía de 7 días</h2>
        <p class="lead mt8">Pruébalo. Si no estás satisfecho, solicitas reembolso dentro de 7 días.</p>
        <p class="subnote">Sin preguntas. Sin complicaciones.</p>

        <div class="ctaRow" style="justify-content:center">
          <a class="btn" data-cta="guarantee" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">QUIERO EMPEZAR AHORA</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="section cv">
    <div class="container">
      <h2 class="reveal">Preguntas frecuentes (directas)</h2>
      <p class="lead reveal">Resolvemos objeciones típicas antes de que te frenen.</p>

      <div class="grid cards2 mt18">
        <details class="card reveal">
          <summary style="cursor:pointer;font-weight:900;">“Mi perro solo se porta mal cuando me voy. ¿Esto es para mí?”</summary>
          <p class="mt8">Sí: suele ser <strong>ansiedad por separación</strong> o hiperactivación. Trabajamos <strong>regulación</strong> + <strong>estructura</strong> para que aprenda calma real.</p>
        </details>

        <details class="card reveal" style="transition-delay:80ms">
          <summary style="cursor:pointer;font-weight:900;">“¿Y si ya probé cansarlo más y no funcionó?”</summary>
          <p class="mt8">Es normal: más ejercicio puede subir la activación. Aquí el foco es <strong>bajar el estado interno</strong> con rutinas y micro-pasos.</p>
        </details>

        <details class="card reveal" style="transition-delay:160ms">
          <summary style="cursor:pointer;font-weight:900;">“¿Necesito jaula/transportín?”</summary>
          <p class="mt8">No es obligatorio. Si usas jaula, se integra solo si tu perro ya está cómodo (sin forzarlo).</p>
        </details>

        <details class="card reveal" style="transition-delay:240ms">
          <summary style="cursor:pointer;font-weight:900;">“¿Cuándo veré resultados?”</summary>
          <p class="mt8">Muchos dueños notan <strong>señales</strong> en la primera semana, pero depende del caso y la constancia. Buscamos progreso medible, no magia.</p>
        </details>

        <details class="card reveal">
          <summary style="cursor:pointer;font-weight:900;">“¿Sirve si es adulto / rescatado / cachorro?”</summary>
          <p class="mt8">Sí: el enfoque es regulación y rutina. En rescatados puede requerir más paciencia, por eso el plan guía paso a paso.</p>
        </details>

        <details class="card reveal" style="transition-delay:80ms">
          <summary style="cursor:pointer;font-weight:900;">“¿Esto usa castigos o métodos agresivos?”</summary>
          <p class="mt8">No. La base es <strong>amable</strong> y orientada a reducir estrés. El castigo suele empeorar la ansiedad.</p>
        </details>

        <details class="card reveal" style="transition-delay:160ms">
          <summary style="cursor:pointer;font-weight:900;">“¿Qué pasa si compro y no era lo que esperaba?”</summary>
          <p class="mt8">Tienes <strong>7 días de garantía</strong>. Si no te sirve, pides reembolso dentro del plazo.</p>
        </details>

        <details class="card reveal" style="transition-delay:240ms">
          <summary style="cursor:pointer;font-weight:900;">“¿Cómo recibo el Asistente IA?”</summary>
          <p class="mt8">Tras el pago, recibes un <strong>link de acceso</strong> junto con el ebook y los bonos.</p>
        </details>
      </div>

      <div class="card center mt24 reveal">
        <h2>Tu perro no quiere destruir tu casa.</h2>
        <p class="lead">Solo necesita aprender a regularse… y confiar en que siempre volverás.</p>
        <div class="ctaRow" style="justify-content:center">
          <a class="btn" data-cta="final" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">EMPEZAR AHORA</a>
        </div>
        <div class="trustRow" style="justify-content:center">
          <span>🛡️ Garantía 7 días</span>
          <span>💳 Pago seguro</span>
          <span>✅ Pago único</span>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL (overlay) -->
  <div class="modalOverlay" id="exitOverlay" aria-hidden="true">
    <div class="modalBox" role="dialog" aria-modal="true" aria-label="Antes de irte">
      <div class="modalHead">
        <div>
          <h3>Espera… antes de irte</h3>
          <p class="subnote mb0">Si tu perro se descontrola al salir, esto te lo pone fácil.</p>
        </div>
        <button class="modalClose" type="button" id="closeModal" aria-label="Cerrar">✕</button>
      </div>
      <div class="modalBody">
        <p class="lead" style="margin:0 0 12px;">
          Tu perro <strong>no es malo</strong>. Está ansioso. Con Reset Canino tienes un plan simple para empezar <strong>hoy</strong> y notar señales en la primera semana.
        </p>

        <div class="card soft" style="margin:12px 0;">
          <strong>Incluye:</strong>
          <ul class="checklist" style="margin-top:10px">
            <li><span class="check">✓</span><span>Ebook + Plan 7 días (10–15 min/día)</span></li>
            <li><span class="check">✓</span><span>3 bonos + Asistente IA 24/7 (link)</span></li>
            <li><span class="check">✓</span><span>Garantía 7 días</span></li>
          </ul>
        </div>

        <a class="btn" data-cta="popup" rel="noopener" href="https://mascotaequilibrada.com/cart/57475776184707:1">Sí, quiero empezar ahora</a>
        <p class="subnote">Pago único · Acceso inmediato · Sin suscripciones</p>
      </div>
    </div>
  </div>

  <script>
    (function(){
      const checkoutUrl = "https://mascotaequilibrada.com/cart/57475776184707:1";

      /* 1) Warmup checkout on interaction */
      let warmed = false;
      function warmup(){
        if (warmed) return;
        warmed = true;
        const l = document.createElement("link");
        l.rel = "prefetch";
        l.as = "document";
        l.href = checkoutUrl;
        document.head.appendChild(l);
      }

      function isCta(el){
        return el && el.closest ? el.closest("a[data-cta]") : null;
      }

      document.addEventListener("pointerdown", (e) => { if (isCta(e.target)) warmup(); }, {passive:true});
      document.addEventListener("mouseover", (e) => { if (isCta(e.target)) warmup(); }, {passive:true});

      /* 2) Scroll reveal */
      const revealItems = document.querySelectorAll(".reveal");
      if (revealItems.length){
        const io = new IntersectionObserver((entries) => {
          for (const ent of entries) {
            if (ent.isIntersecting) {
              ent.target.classList.add("is-visible");
              io.unobserve(ent.target);
            }
          }
        }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

        revealItems.forEach(el => io.observe(el));
      }

      /* 3) Modal (80% scroll + exit intent si hubo intención) */
      const overlay = document.getElementById("exitOverlay");
      const closeBtn = document.getElementById("closeModal");
      const POP_KEY = "rc_popup_shown_v3";

      let clickedCta = false;
      let popupShown = localStorage.getItem(POP_KEY) === "1";

      document.addEventListener("click", (e) => {
        if (isCta(e.target)) clickedCta = true;
      }, {passive:true});

      function canShowPopup(){
        if (popupShown) return false;
        if (!overlay) return false;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
        return true;
      }

      function openPopup(){
        if (!canShowPopup()) return;
        popupShown = true;
        localStorage.setItem(POP_KEY, "1");
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
      }

      function closePopup(){
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
      }

      closeBtn && closeBtn.addEventListener("click", closePopup);
      overlay && overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closePopup();
      });

      let lastCheck = 0;
      window.addEventListener("scroll", () => {
        const t = performance.now();
        if (t - lastCheck < 120) return;
        lastCheck = t;

        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
        const clientHeight = doc.clientHeight || window.innerHeight;

        const maxScroll = Math.max(1, scrollHeight - clientHeight);
        const progress = scrollTop / maxScroll;

        if (progress >= 0.80){
          // A 80% lo mostramos incluso sin click CTA: ya consumió contenido (intención)
          openPopup();
        }
      }, {passive:true});

      // Exit intent desktop: solo si clickeó CTA (intención fuerte)
      document.addEventListener("mouseout", (e) => {
        if (!clickedCta) return;
        if (!canShowPopup()) return;
        if (e.clientY <= 0) openPopup();
      }, {passive:true});
    })();
  </script>

</body>
</html>
