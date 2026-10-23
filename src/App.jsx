import React, { useState, useEffect, useRef } from "react";
import { Home, ChevronLeft, Waves, Leaf, Droplets, Sparkles, Volume2 } from "lucide-react";

/* ---------------------------------------------------------
   PAUSE — prototipo interactivo
   Paleta: Moon Ivory #F7F6F2 · Night Blue #233142
           Warm Gray #B8BDC7 · Soft Lavender #DCCFF5 · Moon Gold #D9C27A
   Tipografía: Playpen Sans
--------------------------------------------------------- */

const C = {
  ivory: "#F7F6F2",
  night: "#233142",
  gray: "#B8BDC7",
  lavender: "#DCCFF5",
  gold: "#D9C27A",
};

/* ---------------- Moon mascot ---------------- */
function Moon({ mood = "happy", size = 72 }) {
  const s = size;
  return (
    <div style={{ position: "relative", width: s, height: s }}>
      <svg width={s} height={s} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill={C.gold} />
        <circle cx="66" cy="36" r="34" fill={C.ivory} />
        {/* face group, positioned in the visible crescent */}
        <g transform="translate(34,54)">
          {mood === "happy" && (
            <>
              <path d="M -10 -2 Q -6 -8 -2 -2" stroke={C.night} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 4 -2 Q 8 -8 12 -2" stroke={C.night} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M -8 8 Q 1 14 10 8" stroke={C.night} strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {mood === "panic" && (
            <>
              <circle cx="-6" cy="-3" r="4.5" fill={C.ivory} stroke={C.night} strokeWidth="2.5" />
              <circle cx="-6" cy="-3" r="1.6" fill={C.night} />
              <circle cx="9" cy="-3" r="4.5" fill={C.ivory} stroke={C.night} strokeWidth="2.5" />
              <circle cx="9" cy="-3" r="1.6" fill={C.night} />
              <path d="M -11 -10 L -3 -8" stroke={C.night} strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 14 -10 L 6 -8" stroke={C.night} strokeWidth="2.2" strokeLinecap="round" />
              <ellipse cx="1" cy="9" rx="3.5" ry="4.5" fill={C.night} />
            </>
          )}
          {mood === "dizzy" && (
            <>
              <path d="M -9 -4 a3 3 0 1 1 5 1 a2.4 2.4 0 1 1 -3.6 -1" stroke={C.night} strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 6 -4 a3 3 0 1 1 5 1 a2.4 2.4 0 1 1 -3.6 -1" stroke={C.night} strokeWidth="2" fill="none" strokeLinecap="round" />
              <ellipse cx="1" cy="9" rx="3" ry="2" fill={C.night} />
            </>
          )}
          {mood === "calm" && (
            <>
              <path d="M -10 -3 Q -6 0 -2 -3" stroke={C.night} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 4 -3 Q 8 0 12 -3" stroke={C.night} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M -6 8 Q 1 12 8 8" stroke={C.night} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          )}
          {mood === "sleepy" && (
            <>
              <path d="M -10 -2 L -2 -2" stroke={C.night} strokeWidth="3" strokeLinecap="round" />
              <path d="M 4 -2 L 12 -2" stroke={C.night} strokeWidth="3" strokeLinecap="round" />
              <path d="M -3 8 Q 1 6 5 8" stroke={C.night} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          )}
        </g>
      </svg>
      {mood === "panic" && (
        <div style={{ position: "absolute", top: -4, right: -2, fontSize: s * 0.16 }}>✦</div>
      )}
      {mood === "sleepy" && (
        <div className="zzz" style={{ position: "absolute", top: -10, right: -8, fontFamily: "'Playpen Sans', cursive", fontWeight: 700, color: C.night, fontSize: s * 0.2 }}>
          z
        </div>
      )}
    </div>
  );
}

/* ---------------- Small UI atoms ---------------- */
function PrimaryButton({ children, onClick, style }) {
  return (
    <button className="btn-primary" onClick={onClick} style={style}>
      {children}
    </button>
  );
}
function GhostButton({ children, onClick, active }) {
  return (
    <button className={"btn-ghost" + (active ? " btn-ghost--active" : "")} onClick={onClick}>
      {children}
    </button>
  );
}
function BackChevron({ onClick }) {
  return (
    <button className="back-chevron" onClick={onClick} aria-label="Volver">
      <ChevronLeft size={20} color={C.night} />
    </button>
  );
}
function HomeDock({ onClick }) {
  return (
    <button className="home-dock" onClick={onClick} aria-label="Ir al inicio">
      <Home size={22} color={C.gold} strokeWidth={2} />
    </button>
  );
}

/* ---------------- Data ---------------- */
const CATEGORIES = {
  panico: {
    title: "Entrando en pánico",
    mood: "panic",
    exercises: [
      { key: "resp444", label: "Respiración 4-4-4-4" },
      { key: "grounding", label: "Grounding" },
      { key: "anclaje", label: "Anclaje Sensorial" },
    ],
  },
  cabeza: {
    title: "Mi cabeza no deja de pensar",
    mood: "dizzy",
    exercises: [
      { key: "cuenta100", label: "Cuenta Regresiva" },
      { key: "nombra10", label: "Nombra 10 cosas..." },
      { key: "vaciado", label: "Vaciado Mental" },
    ],
  },
  calmarme: {
    title: "Necesito calmarme",
    mood: "calm",
    exercises: [
      { key: "pausa2", label: "Pausa 2min" },
      { key: "sacudete", label: 'Sacúdete · "Shake it off"' },
      { key: "exhalacion", label: "Exhalación Prolongada" },
    ],
  },
  dormir: {
    title: "Quiero poder dormir",
    mood: "sleepy",
    exercises: [
      { key: "resp478", label: "4-7-8-4" },
      { key: "escaneo", label: "Escaneo Corporal" },
      { key: "sonidos", label: "Sonidos" },
    ],
  },
};

const EXERCISE_META = {
  resp444: { category: "panico", screenTitle: "Vamos a respirar" },
  grounding: { category: "panico", screenTitle: "Vamos a anclarnos" },
  anclaje: { category: "panico", screenTitle: "Vamos a empezar" },
  cuenta100: { category: "cabeza", screenTitle: "Vamos a contar" },
  nombra10: { category: "cabeza", screenTitle: "Vamos a empezar" },
  vaciado: { category: "cabeza", screenTitle: "Vamos a escribir" },
  pausa2: { category: "calmarme", screenTitle: "Vamos a Pausar" },
  sacudete: { category: "calmarme", screenTitle: "Vamos a Sacudirnos" },
  exhalacion: { category: "calmarme", screenTitle: "Vamos a respirar" },
  resp478: { category: "dormir", screenTitle: "Vamos a respirar" },
  escaneo: { category: "dormir", screenTitle: "Sintamos nuestro cuerpo" },
  sonidos: { category: "dormir", screenTitle: "Nos dejamos llevar" },
};

const LETTERS = "ABCDEFGHIJKLMNOPRSTUV".split("");

const SOUNDS = [
  { key: "rosa", label: "Ruido Rosa", icon: Waves, bg: "#E7B9C4", src: "/audio/ruido-rosa.mp3" },
  { key: "naturaleza", label: "Naturaleza", icon: Leaf, bg: "#9FB89A", src: "/audio/naturaleza.mp3" },
  { key: "agua", label: "Agua", icon: Droplets, bg: "#A9C7D8", src: "/audio/agua.mp3" },
  { key: "binaural", label: "Pulsos Binaurales", icon: Sparkles, bg: "#C79C9C", src: "/audio/pulsos-binaurales.mp3" },
];

/* ---------------- Breathing hook ---------------- */
function useBreathing(phases, cycles, active, onComplete) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0][1]);
  const [cycle, setCycle] = useState(0);
  const [scale, setScale] = useState(1);
  const doneRef = useRef(false);

  useEffect(() => {
    setPhaseIdx(0);
    setSecondsLeft(phases[0][1]);
    setCycle(0);
    setScale(1);
    doneRef.current = false;
  }, [active]);

  useEffect(() => {
    const label = phases[phaseIdx][0].toLowerCase();
    if (label.startsWith("inhala")) setScale(1.35);
    else if (label.startsWith("exhala")) setScale(0.82);
  }, [phaseIdx]);

  useEffect(() => {
    if (!active || doneRef.current) return;
    if (secondsLeft <= 0) {
      if (phaseIdx + 1 < phases.length) {
        setPhaseIdx((i) => i + 1);
        setSecondsLeft(phases[phaseIdx + 1][1]);
      } else if (cycle + 1 < cycles) {
        setCycle((c) => c + 1);
        setPhaseIdx(0);
        setSecondsLeft(phases[0][1]);
      } else {
        doneRef.current = true;
        setTimeout(onComplete, 400);
      }
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [active, secondsLeft, phaseIdx, cycle]);

  return { label: phases[phaseIdx][0], secondsLeft, scale, duration: phases[phaseIdx][1], cycle, cycles };
}

/* ---------------- Countdown hook ---------------- */
function useCountdown(start, active, onComplete, stepMs = 1000) {
  const [value, setValue] = useState(start);
  const doneRef = useRef(false);
  useEffect(() => {
    setValue(start);
    doneRef.current = false;
  }, [start, active]);
  useEffect(() => {
    if (!active || doneRef.current) return;
    if (value <= 0) {
      doneRef.current = true;
      setTimeout(onComplete, 400);
      return;
    }
    const t = setTimeout(() => setValue((v) => v - 1), stepMs);
    return () => clearTimeout(t);
  }, [active, value, stepMs]);
  return value;
}

function mmss(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ---------------- Exercise screens ---------------- */
function BreathingScreen({ phases, cycles, onComplete }) {
  const [started, setStarted] = useState(false);
  const b = useBreathing(phases, cycles, started, onComplete);
  return (
    <div className="ex-body">
      <p className="ex-phase-label">{started ? b.label : "Inhala"}</p>
      <div className="breath-circle-wrap">
        <div
          className="breath-circle"
          style={{ transform: `scale(${started ? b.scale : 1})`, transition: `transform ${started ? b.duration : 0.4}s ease-in-out` }}
        >
          <span>{started ? b.secondsLeft || b.duration : phases[0][1]}</span>
        </div>
      </div>
      {!started && (
        <PrimaryButton onClick={() => setStarted(true)}>INICIO</PrimaryButton>
      )}
    </div>
  );
}

function GroundingScreen({ onComplete }) {
  const [active, setActive] = useState(false);
  return (
    <div className="ex-body">
      <p className="ex-copy">
        Apoya firmemente ambos pies descalzos en el suelo, o presiona con fuerza las palmas de tus manos contra una pared sólida.
      </p>
      <p className="ex-copy ex-copy--muted">
        Concéntrate únicamente en la textura, la temperatura y la estabilidad de la superficie que te sostiene.
      </p>
      <div className={"pulse-dot" + (active ? " pulse-dot--on" : "")} />
      <PrimaryButton onClick={() => setActive(true)}>INICIO</PrimaryButton>
      <GhostButton onClick={onComplete}>FIN</GhostButton>
    </div>
  );
}

function AnclajeScreen({ onComplete }) {
  const rows = [
    ["5", "Cosas que podamos ver"],
    ["4", "Cosas que podamos tocar"],
    ["3", "Sonidos que podamos escuchar"],
    ["2", "Olores que podamos percibir"],
    ["1", "Sabor que podamos disfrutar"],
  ];
  return (
    <div className="ex-body">
      <div className="anclaje-list">
        {rows.map(([n, t]) => (
          <div key={n} className="anclaje-row">
            <span className="anclaje-num">{n}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <PrimaryButton onClick={onComplete}>FIN</PrimaryButton>
    </div>
  );
}

function Cuenta100Screen({ onComplete }) {
  const [started, setStarted] = useState(false);
  const v = useCountdown(100, started, onComplete, 90);
  return (
    <div className="ex-body">
      <p className="ex-count">{started ? v : 100}</p>
      {!started && <PrimaryButton onClick={() => setStarted(true)}>INICIO</PrimaryButton>}
    </div>
  );
}

function Nombra10Screen({ onComplete }) {
  const [letter, setLetter] = useState(null);
  const start = () => setLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
  return (
    <div className="ex-body">
      <p className="ex-copy">Nombraremos 10 cosas con la letra</p>
      <p className="ex-letter">{letter || "—"}</p>
      {!letter && <PrimaryButton onClick={start}>INICIO</PrimaryButton>}
      {letter && <GhostButton onClick={onComplete}>FIN</GhostButton>}
    </div>
  );
}

function VaciadoScreen({ onComplete }) {
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(null);
  const seconds = useCountdown(minutes ? minutes * 60 : 0, !!minutes, onComplete);
  return (
    <div className="ex-body">
      <textarea
        className="vaciado-box"
        placeholder="Escribe todo lo que tengas en la mente, sin filtro..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {minutes && <p className="vaciado-timer">{mmss(seconds)}</p>}
      <GhostButton onClick={() => setText("")}>Borrar</GhostButton>
      <div className="row-buttons">
        <GhostButton active={minutes === 5} onClick={() => setMinutes(5)}>5 min</GhostButton>
        <GhostButton active={minutes === 10} onClick={() => setMinutes(10)}>10 min</GhostButton>
      </div>
    </div>
  );
}

function Pausa2Screen({ onComplete }) {
  const [started, setStarted] = useState(false);
  const v = useCountdown(120, started, onComplete);
  return (
    <div className="ex-body">
      <p className="ex-copy">
        Cierra los ojos, tápate los oídos y no respondas a ningún mensaje, notificación ni demanda externa.
      </p>
      <p className="ex-copy ex-copy--quote">"Por los próximos 120 segundos no tengo nada que resolver."</p>
      {started ? <p className="ex-count">{mmss(v)}</p> : <PrimaryButton onClick={() => setStarted(true)}>INICIO</PrimaryButton>}
    </div>
  );
}

function SacudeteScreen({ onComplete }) {
  const [dur, setDur] = useState(null);
  const v = useCountdown(dur || 0, !!dur, onComplete);
  return (
    <div className="ex-body">
      <p className="ex-copy">
        Ponte de pie y sacude vigorosamente los brazos, las manos, las piernas y los hombros, como si quisieras quitarte agua de encima.
      </p>
      {dur ? (
        <p className={"ex-count shake"}>{v}</p>
      ) : (
        <div className="row-buttons">
          <PrimaryButton onClick={() => setDur(30)}>30 segundos</PrimaryButton>
          <PrimaryButton onClick={() => setDur(45)}>45 segundos</PrimaryButton>
        </div>
      )}
    </div>
  );
}

function EscaneoScreen({ onComplete }) {
  return (
    <div className="ex-body">
      <p className="ex-copy">
        Empezando por los dedos de los pies, tensa los músculos fuertemente, luego relájalos por completo. Ve subiendo por las pantorrillas, muslos, abdomen, hombros y rostro.
      </p>
      <p className="ex-copy ex-copy--muted">No hay prisa.</p>
      <PrimaryButton onClick={onComplete}>FIN</PrimaryButton>
    </div>
  );
}

function SonidosScreen({ onComplete }) {
  const [playing, setPlaying] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    // Create one audio element per sound and keep each one looping.
    SOUNDS.forEach((sound) => {
      const audio = new Audio(sound.src);
      audio.loop = true;
      audio.preload = "auto";
      audioRefs.current[sound.key] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      audioRefs.current = {};
    };
  }, []);

  const toggleSound = async (key) => {
    const selectedAudio = audioRefs.current[key];
    if (!selectedAudio) return;

    // Tapping the active sound pauses it.
    if (playing === key) {
      selectedAudio.pause();
      setPlaying(null);
      return;
    }

    // Stop any sound that may already be playing.
    Object.entries(audioRefs.current).forEach(([soundKey, audio]) => {
      if (soundKey !== key) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    try {
      selectedAudio.currentTime = 0;
      await selectedAudio.play();
      setPlaying(key);
    } catch (error) {
      console.error("No se pudo reproducir el audio:", error);
      setPlaying(null);
    }
  };

  const finish = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setPlaying(null);
    onComplete();
  };

  return (
    <div className="ex-body">
      <div className="sonidos-grid">
        {SOUNDS.map((s) => {
          const Icon = s.icon;
          const isPlaying = playing === s.key;
          return (
            <button
              key={s.key}
              className={"sonido-tile" + (isPlaying ? " sonido-tile--on" : "")}
              onClick={() => toggleSound(s.key)}
              aria-label={isPlaying ? `Pausar ${s.label}` : `Reproducir ${s.label}`}
              aria-pressed={isPlaying}
            >
              <div className="sonido-icon" style={{ background: s.bg }}>
                <Icon size={18} color={C.ivory} />
              </div>
              <span>{s.label}</span>
              {isPlaying && (
                <div className="eq">
                  <i /> <i /> <i />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {playing && (
        <GhostButton onClick={finish}>
          <Volume2 size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
          Listo
        </GhostButton>
      )}
    </div>
  );
}

function ExerciseScreen({ exerciseKey, onComplete }) {
  switch (exerciseKey) {
    case "resp444":
      return <BreathingScreen phases={[["Inhala", 4], ["Mantén", 4], ["Exhala", 4], ["Mantén", 4]]} cycles={3} onComplete={onComplete} />;
    case "grounding":
      return <GroundingScreen onComplete={onComplete} />;
    case "anclaje":
      return <AnclajeScreen onComplete={onComplete} />;
    case "cuenta100":
      return <Cuenta100Screen onComplete={onComplete} />;
    case "nombra10":
      return <Nombra10Screen onComplete={onComplete} />;
    case "vaciado":
      return <VaciadoScreen onComplete={onComplete} />;
    case "pausa2":
      return <Pausa2Screen onComplete={onComplete} />;
    case "sacudete":
      return <SacudeteScreen onComplete={onComplete} />;
    case "exhalacion":
      return <BreathingScreen phases={[["Inhala", 4], ["Exhala", 8]]} cycles={4} onComplete={onComplete} />;
    case "resp478":
      return <BreathingScreen phases={[["Inhala", 4], ["Mantén", 7], ["Exhala", 8]]} cycles={4} onComplete={onComplete} />;
    case "escaneo":
      return <EscaneoScreen onComplete={onComplete} />;
    case "sonidos":
      return <SonidosScreen onComplete={onComplete} />;
    default:
      return null;
  }
}

/* ---------------- Screens: splash / menu / category / done / ajustes ---------------- */
function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  const letters = "PAUSE".split("");
  return (
    <div className="screen splash">
      <div className="splash-moon">
        <Moon mood="calm" size={96} />
      </div>
      <h1 className="splash-title">
        {letters.map((l, i) => (
          <span key={i} style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
            {l}
          </span>
        ))}
      </h1>
    </div>
  );
}

function MenuScreen({ onOpenCategory, onAjustes }) {
  const items = [
    { key: "panico", label: "Entrando en pánico" },
    { key: "cabeza", label: "Mi cabeza no deja de pensar" },
    { key: "calmarme", label: "Necesito calmarme" },
    { key: "dormir", label: "Quiero poder dormir" },
  ];
  return (
    <div className="screen menu">
      <p className="menu-question">¿Cómo te sientes en este momento?</p>
      <div className="menu-list">
        {items.map((it) => (
          <button key={it.key} className="menu-item" onClick={() => onOpenCategory(it.key)}>
            <Moon mood={CATEGORIES[it.key].mood} size={26} />
            <span>{it.label}</span>
          </button>
        ))}
      </div>
      <button className="ajustes-link" onClick={onAjustes}>
        Ajustes
      </button>
    </div>
  );
}

function CategoryScreen({ categoryKey, onOpenExercise, onHome }) {
  const cat = CATEGORIES[categoryKey];
  return (
    <div className="screen category">
      <div className="category-top">
        <Moon mood={cat.mood} size={64} />
        <p className="category-question">¿Con qué quieres que empecemos?</p>
      </div>
      <div className="category-list">
        {cat.exercises.map((ex) => (
          <PrimaryButton key={ex.key} onClick={() => onOpenExercise(ex.key)}>
            {ex.label}
          </PrimaryButton>
        ))}
      </div>
      <HomeDock onClick={onHome} />
    </div>
  );
}

function DoneScreen({ onHome }) {
  return (
    <div className="screen done">
      <Moon mood="calm" size={56} />
      <p className="done-title">Muy bien.</p>
      <p className="done-sub">Hemos terminado</p>
      <p className="done-question">¿Cómo te sientes ahora?</p>
      <div className="done-options">
        <button className="done-option" onClick={onHome}>
          <Moon mood="happy" size={26} /> Mejor
        </button>
        <button className="done-option" onClick={onHome}>
          <Moon mood="calm" size={26} /> Igual
        </button>
      </div>
    </div>
  );
}

function AjustesScreen({ onHome }) {
  const [vibra, setVibra] = useState(true);
  const [notif, setNotif] = useState(true);
  return (
    <div className="screen ajustes">
      <p className="ajustes-title">Ajustes</p>
      <div className="ajustes-list">
        <div className="ajustes-row">
          <span>Idioma</span>
          <span className="ajustes-value">Español</span>
        </div>
        <div className="ajustes-row">
          <span>Vibración</span>
          <button className={"switch" + (vibra ? " switch--on" : "")} onClick={() => setVibra((v) => !v)}>
            <i />
          </button>
        </div>
        <div className="ajustes-row">
          <span>Notificaciones</span>
          <button className={"switch" + (notif ? " switch--on" : "")} onClick={() => setNotif((v) => !v)}>
            <i />
          </button>
        </div>
        <div className="ajustes-row">
          <span>Enviar Feedback</span>
          <span className="ajustes-value">›</span>
        </div>
        <div className="ajustes-row">
          <span>Versión</span>
          <span className="ajustes-value">1.0.0</span>
        </div>
      </div>
      <HomeDock onClick={onHome} />
    </div>
  );
}

/* ---------------- App shell ---------------- */
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [categoryKey, setCategoryKey] = useState(null);
  const [exerciseKey, setExerciseKey] = useState(null);

  const goMenu = () => setScreen("menu");
  const openCategory = (k) => {
    setCategoryKey(k);
    setScreen("category");
  };
  const openExercise = (k) => {
    setExerciseKey(k);
    setScreen("exercise");
  };
  const finishExercise = () => setScreen("done");

  return (
    <div className="pause-app">
      <style>{CSS}</style>
      <div className="phone">
        {screen === "splash" && <SplashScreen onDone={goMenu} />}
        {screen === "menu" && <MenuScreen onOpenCategory={openCategory} onAjustes={() => setScreen("ajustes")} />}
        {screen === "category" && categoryKey && (
          <CategoryScreen categoryKey={categoryKey} onOpenExercise={openExercise} onHome={goMenu} />
        )}
        {screen === "exercise" && exerciseKey && (
          <div className="screen exercise">
            <div className="exercise-top">
              <BackChevron onClick={() => setScreen("category")} />
              <Moon mood={CATEGORIES[EXERCISE_META[exerciseKey].category].mood} size={44} />
              <p className="exercise-title">{EXERCISE_META[exerciseKey].screenTitle}</p>
            </div>
            <ExerciseScreen exerciseKey={exerciseKey} onComplete={finishExercise} />
          </div>
        )}
        {screen === "done" && <DoneScreen onHome={goMenu} />}
        {screen === "ajustes" && <AjustesScreen onHome={goMenu} />}
      </div>
    </div>
  );
}

/* ---------------- CSS ---------------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@400;500;600;700;800&display=swap');

.pause-app {
  font-family: 'Playpen Sans', cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 640px;
  background: linear-gradient(180deg, #EFE9F5 0%, #F3EEF8 100%);
  padding: 24px 0;
}
.phone {
  width: 340px;
  height: 660px;
  background: ${C.ivory};
  border-radius: 40px;
  border: 1px solid #e7e3da;
  box-shadow: 0 30px 60px -20px rgba(35,49,66,0.35), 0 0 0 8px #ffffff, 0 0 0 9px #e2ded4;
  overflow: hidden;
  position: relative;
}
.screen {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 28px;
  box-sizing: border-box;
  position: relative;
}

/* splash */
.splash { justify-content: center; }
.splash-moon { animation: fadeIn 0.8s ease both; margin-bottom: 18px; }
.splash-title { display: flex; gap: 2px; font-size: 34px; color: ${C.gold}; font-weight: 700; letter-spacing: 1px; }
.splash-title span { opacity: 0; animation: letterIn 0.5s ease forwards; }
@keyframes letterIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }

/* menu */
.menu-question { font-size: 18px; font-weight: 600; color: ${C.night}; text-align: center; margin: 24px 0 22px; line-height: 1.4; }
.menu-list { display: flex; flex-direction: column; gap: 12px; width: 100%; }
.menu-item {
  display: flex; align-items: center; gap: 12px;
  background: ${C.night}; color: ${C.ivory}; border: none; border-radius: 16px;
  padding: 12px 16px; font-family: inherit; font-size: 14.5px; font-weight: 500; text-align: left;
  cursor: pointer; transition: transform 0.15s ease, opacity 0.15s ease;
}
.menu-item:hover { transform: translateY(-1px); opacity: 0.92; }
.menu-item:active { transform: scale(0.98); }
.ajustes-link { margin-top: auto; background: none; border: none; color: ${C.gold}; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; padding-top: 18px; }

/* category */
.category-top { display: flex; flex-direction: column; align-items: center; margin-bottom: 22px; }
.category-question { font-size: 15.5px; font-weight: 600; color: ${C.night}; text-align: center; margin-top: 10px; line-height: 1.4; max-width: 220px; }
.category-list { display: flex; flex-direction: column; gap: 12px; width: 100%; }

/* buttons */
.btn-primary {
  background: ${C.night}; color: ${C.ivory}; border: none; border-radius: 14px;
  padding: 13px 20px; font-family: inherit; font-size: 14.5px; font-weight: 600;
  cursor: pointer; width: 100%; transition: transform 0.15s ease, opacity 0.15s ease;
}
.btn-primary:hover { opacity: 0.9; }
.btn-primary:active { transform: scale(0.97); }
.btn-ghost {
  background: transparent; color: ${C.night}; border: 1.5px solid ${C.gray};
  border-radius: 14px; padding: 10px 18px; font-family: inherit; font-size: 13.5px; font-weight: 600;
  cursor: pointer; margin-top: 10px; transition: all 0.15s ease;
}
.btn-ghost:hover { border-color: ${C.night}; }
.btn-ghost--active { background: ${C.lavender}; border-color: ${C.lavender}; }
.row-buttons { display: flex; gap: 10px; width: 100%; justify-content: center; }

/* home dock / back chevron */
.home-dock {
  position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
  background: none; border: none; cursor: pointer; padding: 8px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; transition: background 0.15s ease;
}
.home-dock:hover { background: rgba(217,194,122,0.15); }
.back-chevron {
  position: absolute; top: 18px; left: 16px; background: none; border: none; cursor: pointer;
  padding: 6px; border-radius: 50%; display: flex; transition: background 0.15s ease;
}
.back-chevron:hover { background: rgba(35,49,66,0.06); }

/* exercise */
.exercise { padding-top: 18px; }
.exercise-top { display: flex; flex-direction: column; align-items: center; margin-bottom: 18px; }
.exercise-title { font-size: 15.5px; font-weight: 600; color: ${C.night}; margin-top: 8px; }
.ex-body { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; flex: 1; justify-content: center; }
.ex-phase-label { font-size: 14px; color: ${C.night}; opacity: 0.7; margin: 0; }
.ex-copy { font-size: 14px; color: ${C.night}; text-align: center; line-height: 1.55; margin: 0; max-width: 250px; }
.ex-copy--muted { opacity: 0.6; font-size: 13px; }
.ex-copy--quote { font-style: italic; opacity: 0.75; }
.ex-count { font-size: 46px; color: ${C.night}; font-weight: 700; margin: 6px 0; }
.ex-letter { font-size: 56px; color: ${C.night}; font-weight: 700; margin: 4px 0; }

.breath-circle-wrap { width: 150px; height: 150px; display: flex; align-items: center; justify-content: center; }
.breath-circle {
  width: 110px; height: 110px; border-radius: 50%; border: 2px solid ${C.lavender};
  background: rgba(220,207,245,0.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; color: ${C.night}; font-weight: 600;
}

.pulse-dot { width: 14px; height: 14px; border-radius: 50%; background: ${C.gray}; transition: all 0.3s ease; }
.pulse-dot--on { background: ${C.lavender}; animation: pulse 1.8s ease-in-out infinite; }
@keyframes pulse { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.6); opacity: 1; } }

.anclaje-list { display: flex; flex-direction: column; gap: 14px; width: 100%; margin-bottom: 6px; }
.anclaje-row { display: flex; align-items: center; gap: 12px; font-size: 13.5px; color: ${C.night}; }
.anclaje-num { font-size: 20px; font-weight: 700; color: ${C.gold}; width: 20px; text-align: center; }

.vaciado-box {
  width: 100%; height: 150px; border-radius: 14px; border: 1.5px solid ${C.gray};
  background: rgba(184,189,199,0.08); padding: 12px; font-family: inherit; font-size: 13.5px; color: ${C.night};
  resize: none; box-sizing: border-box;
}
.vaciado-box:focus-visible { outline: 2px solid ${C.lavender}; border-color: ${C.lavender}; }
.vaciado-timer { font-size: 13px; color: ${C.gold}; font-weight: 600; margin: 0; }

.shake { animation: shake 0.5s ease-in-out infinite; }
@keyframes shake { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }

.sonidos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
.sonido-tile {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: rgba(184,189,199,0.1); border: 1.5px solid transparent; border-radius: 16px;
  padding: 14px 8px; cursor: pointer; font-family: inherit; font-size: 11.5px; color: ${C.night}; font-weight: 600;
  position: relative; transition: all 0.15s ease;
}
.sonido-tile--on { border-color: ${C.lavender}; background: rgba(220,207,245,0.2); }
.sonido-icon { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.eq { display: flex; gap: 2px; align-items: flex-end; height: 12px; position: absolute; top: 8px; right: 10px; }
.eq i { width: 2.5px; background: ${C.gold}; display: block; animation: eq 0.7s ease-in-out infinite; }
.eq i:nth-child(1) { height: 6px; animation-delay: 0s; }
.eq i:nth-child(2) { height: 12px; animation-delay: 0.15s; }
.eq i:nth-child(3) { height: 8px; animation-delay: 0.3s; }
@keyframes eq { 0%,100% { transform: scaleY(0.6); } 50% { transform: scaleY(1.4); } }

/* done */
.done { justify-content: center; align-items: center; gap: 4px; }
.done-title { font-size: 20px; font-weight: 700; color: ${C.night}; margin: 14px 0 0; }
.done-sub { font-size: 15px; color: ${C.night}; opacity: 0.7; margin: 2px 0 26px; }
.done-question { font-size: 14.5px; color: ${C.night}; font-weight: 600; margin: 0 0 18px; }
.done-options { display: flex; gap: 16px; }
.done-option {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer; font-family: inherit; font-size: 13px; color: ${C.night}; font-weight: 600;
  padding: 10px 16px; border-radius: 14px; transition: background 0.15s ease;
}
.done-option:hover { background: rgba(217,194,122,0.12); }

/* ajustes */
.ajustes-title { font-size: 17px; font-weight: 700; color: ${C.night}; margin: 6px 0 24px; }
.ajustes-list { display: flex; flex-direction: column; gap: 20px; width: 100%; }
.ajustes-row { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: ${C.night}; }
.ajustes-value { color: ${C.night}; opacity: 0.55; }
.switch { width: 40px; height: 22px; border-radius: 20px; background: ${C.gray}; border: none; position: relative; cursor: pointer; transition: background 0.2s ease; }
.switch i { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: ${C.ivory}; display: block; transition: transform 0.2s ease; }
.switch--on { background: ${C.gold}; }
.switch--on i { transform: translateX(18px); }

button:focus-visible, .menu-item:focus-visible { outline: 2px solid ${C.lavender}; outline-offset: 2px; }
`;
