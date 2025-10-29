import { useEffect, useRef, useState } from "react";
import profileHead from "./assets/profile-head.jpg";
import "./App.css";

const damageStages = [
  {
    face: "🙂",
    message: "Caner sapasağlam ve moral yerinde.",
    bruises: [],
  },
  {
    face: "😕",
    message: "Biraz sendeledi, yanağında hafif bir kızarıklık var.",
    bruises: [{ cx: 62, cy: 64, r: 10, opacity: 0.2 }],
  },
  {
    face: "😣",
    message: "Göz altı morarmaya başladı, kaşı açıldı.",
    bruises: [
      { cx: 45, cy: 58, r: 12, opacity: 0.35 },
      { cx: 73, cy: 65, r: 9, opacity: 0.3 },
    ],
  },
  {
    face: "😵",
    message: "Caner sendeleyip dizlerinin üzerine çöktü.",
    bruises: [
      { cx: 42, cy: 52, r: 16, opacity: 0.45 },
      { cx: 78, cy: 70, r: 12, opacity: 0.38 },
      { cx: 58, cy: 80, r: 9, opacity: 0.34 },
    ],
  },
  {
    face: "💀",
    message: "Caner bayıldı! Bir gül belki onu hayata döndürür.",
    bruises: [
      { cx: 42, cy: 52, r: 18, opacity: 0.55 },
      { cx: 74, cy: 68, r: 14, opacity: 0.45 },
      { cx: 58, cy: 84, r: 12, opacity: 0.4 },
      { cx: 62, cy: 60, r: 20, opacity: 0.5 },
    ],
  },
];

const STATIC_HEAD = {
  url: profileHead,
  size: 103,
  offsetX: 0,
  offsetY: 5,
};

function Character({
  damageLevel,
  givingFlower,
  isShaking,
  flowerActionKey,
  onHit,
  isDead,
  impactBruises,
  hitEffectKey,
  starsEffect,
}) {
  const { face, bruises } = damageStages[damageLevel];
  const svgRef = useRef(null);
  const headMaskId = useRef(
    `head-mask-${Math.random().toString(36).slice(2, 9)}`
  );
  const headSize = STATIC_HEAD.size;
  const headPos = {
    x: 60 - headSize / 2 + STATIC_HEAD.offsetX,
    y: 55 - headSize / 2 + STATIC_HEAD.offsetY,
  };
  const latestImpact = impactBruises.length
    ? impactBruises[impactBruises.length - 1]
    : null;
  const effectX = latestImpact?.x ?? 60;
  const effectY = latestImpact?.y ?? 100;

  const handlePointerDown = (event) => {
    if (isDead) {
      return;
    }

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    let coords = null;
    const svgElement = svgRef.current;
    if (svgElement && event) {
      const rect = svgElement.getBoundingClientRect();
      const rawX = ((event.clientX - rect.left) / rect.width) * 120;
      const rawY = ((event.clientY - rect.top) / rect.height) * 180;
      const x = Math.min(120, Math.max(0, rawX));
      const y = Math.min(180, Math.max(0, rawY));
      coords = { x, y, pointer: true };
    }

    if (onHit) {
      onHit(coords);
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      if (onHit) {
        onHit({ x: 60, y: 90, pointer: false });
      }
    }
  };

  return (
    <div
      className={`character${givingFlower ? " character--flower" : ""}${
        isShaking ? " character--shake" : ""
      }${isDead ? " character--dead" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Canerı tıkla, dayak at"
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
    >
      <svg
        className="character-figure"
        viewBox="0 0 120 180"
        role="img"
        aria-labelledby="Caner-ve-aksiyon"
        ref={svgRef}
      >
        <title id="Caner-ve-aksiyon">
          Dayak yiyen ama çiçek de verebilen Caner
        </title>
        <defs>
          <linearGradient id="jacketGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1f2e" />
            <stop offset="100%" stopColor="#0d0d14" />
          </linearGradient>
          <linearGradient id="shirtGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0e0e0" />
          </linearGradient>
          <linearGradient id="pantsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12121c" />
            <stop offset="100%" stopColor="#05050a" />
          </linearGradient>
          <radialGradient id="rosePetalGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ff8a9e" />
            <stop offset="40%" stopColor="#ff456f" />
            <stop offset="100%" stopColor="#c2185b" />
          </radialGradient>
          <linearGradient id="roseStemGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#66bb6a" />
            <stop offset="100%" stopColor="#2e7d32" />
          </linearGradient>
          <linearGradient id="deathGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="rainbowArc" x1="20" y1="60" x2="100" y2="10">
            <stop offset="0%" stopColor="#ff1744" />
            <stop offset="14%" stopColor="#ff9100" />
            <stop offset="28%" stopColor="#ffd600" />
            <stop offset="42%" stopColor="#00e676" />
            <stop offset="57%" stopColor="#00b0ff" />
            <stop offset="71%" stopColor="#2979ff" />
            <stop offset="85%" stopColor="#651fff" />
            <stop offset="100%" stopColor="#d500f9" />
          </linearGradient>
          <radialGradient id="heartGradient" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#a7ffeb" />
            <stop offset="55%" stopColor="#82b1ff" />
            <stop offset="100%" stopColor="rgba(129, 212, 250, 0)" />
          </radialGradient>
        </defs>
        <circle className="character-head" cx="60" cy="55" r="32" />
        <clipPath id={headMaskId.current}>
          <circle cx="60" cy="55" r="30" />
        </clipPath>
        <image
          href={STATIC_HEAD.url}
          x={headPos.x}
          y={headPos.y}
          width={headSize}
          height={headSize}
          clipPath={`url(#${headMaskId.current})`}
          preserveAspectRatio="xMidYMid slice"
          className="character-head-photo"
        />
        <rect
          className="character-leg"
          x="38"
          y="145"
          width="12"
          height="35"
          rx="4"
        />
        <rect
          className="character-leg"
          x="70"
          y="145"
          width="12"
          height="35"
          rx="4"
        />
        <rect
          className="character-shirt"
          x="35"
          y="85"
          width="50"
          height="60"
          rx="8"
        />
        <rect
          className="character-jacket"
          x="32"
          y="82"
          width="56"
          height="66"
          rx="10"
        />
        <path
          className="character-jacket-lapel"
          d="M32 82 L54 116 L40 118 L28 90 Z"
        />
        <path
          className="character-jacket-lapel"
          d="M88 82 L66 116 L80 118 L92 90 Z"
        />
        <polygon
          className="character-tie-knot"
          points="60,101 57,106 60,110 63,106"
        />
        <path
          className="character-tie-lower"
          d="M60 110 L55 130 L60 138 L65 130 Z"
        />
        {bruises.map((bruise, index) => (
          <circle
            key={index}
            className="character-bruise"
            cx={bruise.cx}
            cy={bruise.cy}
            r={bruise.r}
            style={{ opacity: bruise.opacity }}
          />
        ))}
        {hitEffectKey > 0 && (
          <>
            {/* DIŞ grup: konum */}
            <g transform={`translate(${effectX} ${effectY})`}>
              {/* İÇ grup: animasyon */}
              <g key={`flare-${hitEffectKey}`} className="character-hit-flare">
                <circle cx="0" cy="0" r="24" />
                <circle cx="0" cy="0" r="38" />
              </g>
            </g>

            <g transform={`translate(${effectX} ${effectY})`}>
              <g
                key={`sparks-${hitEffectKey}`}
                className="character-hit-sparks"
              >
                <line x1="0" y1="-24" x2="0" y2="-54" />
                <line x1="-18" y1="-16" x2="-40" y2="-36" />
                <line x1="18" y1="-16" x2="40" y2="-36" />
                <line x1="-20" y1="18" x2="-46" y2="24" />
                <line x1="20" y1="18" x2="46" y2="24" />
              </g>
            </g>
          </>
        )}

        {impactBruises.map((impact) => (
          <g key={impact.id} className="character-impact">
            <circle cx={impact.x} cy={impact.y} r="5.2" />
            <circle cx={impact.x} cy={impact.y} r="10" />
          </g>
        ))}
        {givingFlower && (
          <>
            {/* DIŞ GRUP: SADECE KONUM */}
            <g transform="translate(60 55)">
              {/* İÇ GRUP: ANİMASYON/STİL — transform YOK */}
              <g className="character-rainbow">
                <path
                  d="M-58 0 A 58 58 0 0 1 58 0"
                  stroke="url(#rainbowArc)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="180"
                  strokeDashoffset="180"
                />
                <path
                  d="M-44 0 A 44 44 0 0 1 44 0"
                  stroke="url(#rainbowArc)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="6 9"
                  fill="none"
                  opacity="0.55"
                />
                <path
                  d="M-30 0 A 30 30 0 0 1 30 0"
                  stroke="url(#rainbowArc)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="3 8"
                  fill="none"
                  opacity="0.45"
                />
              </g>
            </g>

            {/* Kalpler aynı kalsın */}
            <g
              className="character-heart-cloud"
              transform={`translate(${effectX} ${effectY - 18})`}
            >
              <g
                className="character-heart character-heart--left"
                transform="translate(-26 -12) scale(0.68)"
              >
                <path d="M0 -10 C-6 -22 -26 -20 -28 -6 C-30 12 -10 24 0 30 C10 24 30 12 28 -6 C26 -20 6 -22 0 -10 Z" />
              </g>
              <g
                className="character-heart character-heart--center"
                transform="translate(0 -18) scale(0.82)"
              >
                <path d="M0 -12 C-8 -26 -34 -22 -36 -6 C-38 14 -12 28 0 36 C12 28 38 14 36 -6 C34 -22 8 -26 0 -12 Z" />
              </g>
              <g
                className="character-heart character-heart--right"
                transform="translate(26 -12) scale(0.68)"
              >
                <path d="M0 -10 C-6 -22 -26 -20 -28 -6 C-30 12 -10 24 0 30 C10 24 30 12 28 -6 C26 -20 6 -22 0 -10 Z" />
              </g>
            </g>
          </>
        )}

        {starsEffect.active && (
          <g
            key={`stars-${starsEffect.key}`}
            className="character-stars"
            transform="translate(0 0)"
          >
            <g className="character-stars__orbit character-stars__orbit--outer">
              <polygon points="60,12 63,18 70,19 65,24 66,31 60,28 54,31 55,24 50,19 57,18" />
              <polygon points="82,28 84,32 88,33 85,36 86,40 82,38 78,40 79,36 76,33 80,32" />
              <polygon points="38,28 40,32 44,33 41,36 42,40 38,38 34,40 35,36 32,33 36,32" />
            </g>
            <g className="character-stars__orbit character-stars__orbit--inner">
              <polygon points="60,26 62,30 66,31 63,34 64,38 60,36 56,38 57,34 54,31 58,30" />
              <polygon points="72,40 74,43 78,44 75,47 76,51 72,49 68,51 69,47 66,44 70,43" />
              <polygon points="48,40 50,43 54,44 51,47 52,51 48,49 44,51 45,47 42,44 46,43" />
            </g>
          </g>
        )}
        <g
          key={flowerActionKey}
          className={`character-rose${
            givingFlower ? " character-rose--active" : ""
          }`}
        >
          <g className="character-rose__stem" transform="translate(0 0)">
            <path
              d="M96 90 C86 108, 82 124, 78 140"
              stroke="url(#roseStemGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M90 110 C84 108, 78 110, 74 116"
              stroke="url(#roseStemGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M88 118 C86 124, 84 128, 80 132"
              stroke="url(#roseStemGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          <g className="character-rose__petals">
            <path
              d="M96 84 C92 78, 82 80, 80 90 C78 100, 88 108, 96 102 C104 96, 102 88, 96 84 Z"
              fill="url(#rosePetalGradient)"
            />
            <path
              d="M96 84 C94 90, 98 94, 102 96 C100 90, 100 86, 96 84 Z"
              fill="#ad1457"
            />
            <path
              d="M84 92 C82 88, 92 82, 98 84 C104 86, 106 94, 102 100 C98 106, 90 102, 84 92 Z"
              fill="rgba(255, 255, 255, 0.12)"
            />
            <path
              d="M92 86 C88 92, 90 100, 98 104"
              stroke="#f8bbd0"
              strokeWidth="1.8"
              fill="none"
            />
            <circle cx="94" cy="92" r="3.4" fill="#fff176" opacity="0.8" />
          </g>
        </g>
        <g
          className={`character-rose-trail${
            givingFlower ? " character-rose-trail--active" : ""
          }`}
        >
          <circle cx="82" cy="104" r="3" />
          <circle cx="75" cy="114" r="2.2" />
          <circle cx="88" cy="120" r="2.6" />
        </g>
        <rect
          className="character-arm character-arm--left"
          x="15"
          y="95"
          width="18"
          height="12"
          rx="6"
        />
        <rect
          className="character-arm character-arm--right"
          x="87"
          y="95"
          width="18"
          height="12"
          rx="6"
        />
        {isDead && (
          <g className="character-death-glow" transform="translate(0 12)">
            <ellipse cx="60" cy="150" rx="45" ry="16" fill="rgba(0,0,0,0.4)" />
            <ellipse
              cx="60"
              cy="45"
              rx="38"
              ry="24"
              fill="url(#deathGlow)"
              opacity="0.7"
            />
          </g>
        )}
      </svg>
      <div
        className={`character-face${isDead ? " character-face--dead" : ""}`}
        aria-hidden="true"
      >
        {face}
      </div>
      {isDead && (
        <div className="character-death-effect" aria-hidden="true">
          <div className="character-death-effect__pulse" />
          <div className="character-death-effect__fume character-death-effect__fume--left" />
          <div className="character-death-effect__fume character-death-effect__fume--right" />
        </div>
      )}
    </div>
  );
}

function App() {
  const [damageState, setDamageState] = useState({ level: 0, progress: 0 });
  const [isGivingFlower, setIsGivingFlower] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [flowerActionKey, setFlowerActionKey] = useState(0);
  const [impactBruises, setImpactBruises] = useState([]);
  const [hitEffectKey, setHitEffectKey] = useState(0);
  const [starsEffect, setStarsEffect] = useState({ active: false, key: 0 });
  const shakeTimerRef = useRef(null);
  const flowerTimerRef = useRef(null);
  const impactTimeoutsRef = useRef({});
  const audioContextRef = useRef(null);
  const starsTimerRef = useRef(null);
  const maxDamageLevel = damageStages.length - 1;
  const { level: damageLevel, progress: damageProgress } = damageState;
  const isDead = damageLevel === maxDamageLevel;
  const DAMAGE_STEP = 0.4;

  const ensureAudioContext = () => {
    const AudioContextClass =
      typeof window !== "undefined"
        ? window.AudioContext || window.webkitAudioContext
        : null;
    if (!AudioContextClass) {
      return null;
    }
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }
    return audioContextRef.current;
  };

  const playHitSound = () => {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  };

  const playFlowerSound = () => {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      const startTime = now + index * 0.05;
      gain.gain.exponentialRampToValueAtTime(
        0.18 / (index + 1),
        startTime + 0.04
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);
      osc.connect(gain).connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
  };

  const pushImpact = (coords) => {
    if (
      !coords ||
      typeof coords.x !== "number" ||
      typeof coords.y !== "number"
    ) {
      return;
    }

    const id = `${Date.now()}-${Math.round(Math.random() * 10000)}`;
    setImpactBruises((prev) => {
      const trimmed = prev.length > 6 ? prev.slice(prev.length - 6) : prev;
      return [...trimmed, { ...coords, id }];
    });

    impactTimeoutsRef.current[id] = setTimeout(() => {
      setImpactBruises((prev) => prev.filter((impact) => impact.id !== id));
      delete impactTimeoutsRef.current[id];
    }, 1600);
  };

  const handleHit = (impact) => {
    if (isDead) {
      return;
    }

    if (impact && impact.pointer) {
      pushImpact(impact);
    } else {
      pushImpact({ x: 60, y: 100, pointer: false });
    }

    if (shakeTimerRef.current) {
      clearTimeout(shakeTimerRef.current);
    }
    setDamageState((prev) => {
      if (prev.level === maxDamageLevel) {
        return prev;
      }
      let totalProgress = prev.progress + DAMAGE_STEP;
      let nextLevel = prev.level;
      while (totalProgress >= 1 && nextLevel < maxDamageLevel) {
        totalProgress -= 1;
        nextLevel += 1;
      }
      return {
        level: nextLevel,
        progress: nextLevel === maxDamageLevel ? 0 : totalProgress,
      };
    });
    setIsGivingFlower(false);
    setIsShaking(true);
    shakeTimerRef.current = setTimeout(() => {
      setIsShaking(false);
    }, 600);
    playHitSound();
    setHitEffectKey((prev) => prev + 1);
    setStarsEffect((prev) => ({ active: true, key: prev.key + 1 }));
    if (starsTimerRef.current) {
      clearTimeout(starsTimerRef.current);
    }
    starsTimerRef.current = setTimeout(() => {
      setStarsEffect((prev) => ({ ...prev, active: false }));
    }, 1600);
  };

  const clearImpactBruises = () => {
    Object.values(impactTimeoutsRef.current).forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    impactTimeoutsRef.current = {};
    setImpactBruises([]);
  };

  const handleGiveFlower = () => {
    if (flowerTimerRef.current) {
      clearTimeout(flowerTimerRef.current);
    }
    setIsGivingFlower(true);
    setFlowerActionKey((prev) => prev + 1);
    setIsShaking(false);
    setStarsEffect((prev) => ({ ...prev, active: false }));
    flowerTimerRef.current = setTimeout(() => {
      setIsGivingFlower(false);
    }, 1400);
    playFlowerSound();
  };
  const handleResetCombat = () => {
    setDamageState({ level: 0, progress: 0 });
    setIsGivingFlower(false);
    setIsShaking(false);
    clearImpactBruises();
    setStarsEffect({ active: false, key: 0 });
  };

  const healthPercent =
    maxDamageLevel === 0
      ? 100
      : Math.max(
          0,
          ((maxDamageLevel -
            Math.min(maxDamageLevel, damageLevel + damageProgress)) /
            maxDamageLevel) *
            100
        );

  useEffect(() => {
    return () => {
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
      }
      if (flowerTimerRef.current) {
        clearTimeout(flowerTimerRef.current);
      }
      Object.values(impactTimeoutsRef.current).forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      if (starsTimerRef.current) {
        clearTimeout(starsTimerRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Dayak ve Çiçek Simülatörü</h1>
        <p>
          Bir buton dayak atıyor, diğeri kalpleri yumuşatıyor. Caner'in
          dayanıklılığına bak ve üç aşamalı hasarı takip et!
        </p>
      </header>
      <main className="app__content">
        <Character
          damageLevel={damageLevel}
          givingFlower={isGivingFlower}
          isShaking={isShaking}
          flowerActionKey={flowerActionKey}
          onHit={handleHit}
          isDead={isDead}
          impactBruises={impactBruises}
          hitEffectKey={hitEffectKey}
          starsEffect={starsEffect}
        />
        <div className="status-panel">
          <div
            className="status-panel__meter"
            role="progressbar"
            aria-valuenow={Math.round(healthPercent)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Canerın canı"
          >
            <div
              className="status-panel__meter-fill"
              style={{ width: `${healthPercent}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="status-panel__health">
            Can: %{Math.max(0, Math.round(healthPercent))}
          </p>
          <p className="status-panel__message">
            {damageStages[damageLevel].message}
          </p>
        </div>
        <div className="controls">
          <button
            type="button"
            className="controls__button controls__button--hit"
            onClick={() => handleHit()}
          >
            Dayak At
          </button>
          <button
            type="button"
            className="controls__button controls__button--flower"
            onClick={handleGiveFlower}
          >
            Çiçek Ver
          </button>
          {isDead && (
            <button
              type="button"
              className="controls__button controls__button--reset"
              onClick={handleResetCombat}
            >
              Affet ve Yeniden Döv
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
