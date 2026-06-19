import CodeScroller from '@/components/CodeScroller'
import Card3D from '@/components/Card3D'

const AvatarIcon = (
  <img src="/avatar.jpg" alt="Dheeraj Saxena" />
)


/* Star positions: top%, left%, size px, animation duration s, delay s */
const STARS: [number, number, number, number, number][] = [
  [8,   12,  2, 2.8, 0.0],
  [14,  72,  1, 3.5, 0.6],
  [6,   88,  2, 2.2, 1.1],
  [22,  5,   1, 4.0, 0.3],
  [30,  55,  2, 3.1, 1.8],
  [18,  40,  1, 2.6, 0.9],
  [42,  90,  2, 3.8, 0.4],
  [55,  8,   1, 2.4, 1.5],
  [60,  65,  2, 3.3, 0.7],
  [70,  30,  1, 4.2, 0.2],
  [78,  78,  2, 2.9, 1.3],
  [85,  15,  1, 3.6, 0.8],
  [90,  50,  2, 2.7, 1.6],
  [92,  92,  1, 3.0, 0.1],
  [35,  25,  1, 4.5, 1.0],
  [48,  48,  2, 2.3, 0.5],
  [63,  82,  1, 3.9, 1.2],
  [75,  60,  2, 2.5, 0.4],
]

export default function Home() {
  return (
    <main className="page">

      {/* ── Circuit board background ── */}
      <svg
        className="circuit-svg"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left cluster — traces going NE */}
        <g stroke="#00D9F0" fill="none">
          {/* Main left trace with branch */}
          <path d="M -60 700 L 110 480 L 195 480 L 460 10" strokeWidth="1.5" opacity="0.22" />
          <circle cx="110" cy="480" r="5" fill="#00D9F0" opacity="0.5" filter="url(#glow)" />
          <circle cx="195" cy="480" r="3" fill="#00D9F0" opacity="0.35" />

          {/* Secondary left trace */}
          <path d="M -110 700 L 55 525 L 320 5" strokeWidth="1" opacity="0.13" />
          <circle cx="55" cy="525" r="3" fill="#00D9F0" opacity="0.25" />

          {/* Third trace with branch */}
          <path d="M 30 700 L 165 540 L 245 540 L 500 95" strokeWidth="1.5" opacity="0.18" />
          <circle cx="165" cy="540" r="4" fill="#00D9F0" opacity="0.38" filter="url(#glow)" />
          <circle cx="245" cy="540" r="3" fill="#00D9F0" opacity="0.25" />

          {/* Fourth trace */}
          <path d="M 80 700 L 210 570 L 285 570 L 540 165" strokeWidth="1" opacity="0.1" />
          <circle cx="210" cy="570" r="3" fill="#00D9F0" opacity="0.2" />

          {/* Short bottom-left segment */}
          <path d="M -15 700 L 90 610 L 160 610" strokeWidth="1" opacity="0.14" />
          <circle cx="90" cy="610" r="3" fill="#00D9F0" opacity="0.25" />

          {/* Very faint outermost trace */}
          <path d="M -150 700 L 20 560 L 260 30" strokeWidth="1" opacity="0.08" />
        </g>

        {/* Right cluster — traces going NW from right */}
        <g stroke="#00D9F0" fill="none">
          {/* Main right trace with branch */}
          <path d="M 1260 30 L 1080 185 L 1005 185 L 745 580" strokeWidth="1.5" opacity="0.22" />
          <circle cx="1080" cy="185" r="5" fill="#00D9F0" opacity="0.5" filter="url(#glow)" />
          <circle cx="1005" cy="185" r="3" fill="#00D9F0" opacity="0.35" />

          {/* Secondary right trace */}
          <path d="M 1290 130 L 1135 260 L 895 660" strokeWidth="1" opacity="0.13" />
          <circle cx="1135" cy="260" r="3" fill="#00D9F0" opacity="0.25" />

          {/* Third right trace with branch */}
          <path d="M 1220 -20 L 1055 130 L 975 130 L 810 370" strokeWidth="1.5" opacity="0.18" />
          <circle cx="1055" cy="130" r="4" fill="#00D9F0" opacity="0.38" filter="url(#glow)" />
          <circle cx="975" cy="130" r="3" fill="#00D9F0" opacity="0.25" />

          {/* Fourth right trace */}
          <path d="M 1250 320 L 1105 415 L 1010 415" strokeWidth="1" opacity="0.1" />
          <circle cx="1105" cy="415" r="3" fill="#00D9F0" opacity="0.2" />

          {/* Short top-right segment */}
          <path d="M 1290 440 L 1175 510 L 1090 510" strokeWidth="1" opacity="0.12" />
          <circle cx="1175" cy="510" r="3" fill="#00D9F0" opacity="0.22" />

          {/* Outermost faint trace */}
          <path d="M 1300 250 L 1180 350 L 980 700" strokeWidth="1" opacity="0.08" />
        </g>
      </svg>

      {/* ── Scrolling code background ── */}
      <CodeScroller />

      {/* ── Star particles ── */}
      {STARS.map(([top, left, size, dur, dly], i) => (
        <span
          key={i}
          className="star"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: size,
            height: size,
            '--dur': `${dur}s`,
            '--dly': `${dly}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Main content ── */}
      <div className="content">

        {/* Avatar */}
        <div className="avatar-ring anim-fade-up d-100">
          <span className="avatar-initials">DS</span>
        </div>

        {/* Name */}
        <p className="avatar-name anim-fade-up d-200">Dheeraj Saxena</p>

        {/* Heading */}
        <h1 className="page-title">Coming Soon</h1>

        {/* Card3D row */}
        <div className="anim-fade-up d-500 card-row">
          <Card3D
            title="Builder, Creator, Developer"
            description="I take ideas and turn them into real, working software. I handle everything from the first sketch to the finished product."
            icon={AvatarIcon}
          />
          <Card3D
            title="Long-term Thinker and Investor"
            description="I don't just write code and move on. I invest in the people and projects I work with, because the best work happens when relationships are built to last."
            icon={AvatarIcon}
          />
          <Card3D
            title="Selective Farmer, a Minimalist"
            description="I chose farming because it's real. No shortcuts, no overnight results — just hard work, good values, and trust in the process. I carry my family values in whatever I build, build right!"
            icon={AvatarIcon}
          />
        </div>

        {/* Buttons */}
        <div className="btn-group anim-fade-up d-800">
          <a href="mailto:dheeraj@dheerajsaxena.dev" className="btn btn-primary">
            Let&apos;s talk your project..
          </a>
        </div>
      </div>

</main>
  )
}
