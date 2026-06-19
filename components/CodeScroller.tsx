// Decorative server component — no client JS, CSS-only scroll animation

const KEYWORDS = new Set([
  'import','export','from','const','let','var','function','return',
  'if','else','try','catch','finally','async','await','new','throw',
  'type','interface','extends','class','default','null','undefined',
  'true','false','for','of','in','while','do','as','typeof','void',
])

const BUILTINS = new Set([
  'useState','useEffect','useCallback','useRef','useMemo','useContext',
  'Promise','Error','fetch','setTimeout','clearTimeout','AbortController',
  'console','JSON','Object','Array','Math',
])

type Token = { c: string; t: string }

function tokenize(line: string): Token[] {
  const out: Token[] = []
  let i = 0
  while (i < line.length) {
    // Comment
    if (line[i] === '/' && line[i + 1] === '/') {
      out.push({ c: 'cmt', t: line.slice(i) }); break
    }
    // String
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i]; let j = i + 1
      while (j < line.length && line[j] !== q) { if (line[j] === '\\') j++; j++ }
      out.push({ c: 'str', t: line.slice(i, j + 1) })
      i = j + 1; continue
    }
    // Number
    if (/\d/.test(line[i])) {
      const m = line.slice(i).match(/^\d+(\.\d+)?/)!
      out.push({ c: 'num', t: m[0] }); i += m[0].length; continue
    }
    // Identifier
    if (/[a-zA-Z_$]/.test(line[i])) {
      const m = line.slice(i).match(/^[a-zA-Z_$]\w*/)!
      const w = m[0]; const nx = line[i + w.length]
      const c = KEYWORDS.has(w) ? 'kw'
        : BUILTINS.has(w) ? 'blt'
        : /^[A-Z]/.test(w) ? 'typ'
        : nx === '(' ? 'blt'
        : 'vr'
      out.push({ c, t: w }); i += w.length; continue
    }
    // Angle bracket (JSX)
    if (line[i] === '<' && /[A-Za-z/]/.test(line[i + 1] ?? '')) {
      out.push({ c: 'jsx', t: line[i] }); i++; continue
    }
    out.push({ c: '', t: line[i] }); i++
  }
  return out
}

const LINES = [
  '// src/lib/api.ts — dheerajsaxena.dev',
  '',
  "import { useState, useEffect, useCallback } from 'react'",
  "import type { FC, ReactNode } from 'react'",
  '',
  "const BASE = 'https://api.dheerajsaxena.dev/v1'",
  'const TIMEOUT = 8000',
  '',
  'interface ApiResponse<T> {',
  '  data: T',
  '  status: number',
  '  message: string',
  '}',
  '',
  'interface Project {',
  '  id: string',
  '  title: string',
  '  description: string',
  '  tech: string[]',
  '  liveUrl: string | null',
  '  githubUrl: string',
  '  featured: boolean',
  '  year: number',
  '}',
  '',
  "type Status = 'idle' | 'loading' | 'success' | 'error'",
  '',
  'async function apiFetch<T>(',
  '  path: string,',
  '  init?: RequestInit',
  '): Promise<T> {',
  '  const ac = new AbortController()',
  '  const timer = setTimeout(() => ac.abort(), TIMEOUT)',
  '  try {',
  '    const res = await fetch(BASE + path, {',
  "      headers: { 'Content-Type': 'application/json' },",
  '      signal: ac.signal,',
  '      ...init,',
  '    })',
  '    clearTimeout(timer)',
  '    if (!res.ok) {',
  "      throw new Error('HTTP ' + res.status)",
  '    }',
  '    const json: ApiResponse<T> = await res.json()',
  '    return json.data',
  '  } catch (err) {',
  '    clearTimeout(timer); throw err',
  '  }',
  '}',
  '',
  'export const getProjects = () =>',
  "  apiFetch<Project[]>('/projects')",
  '',
  'export function useAsync<T>(',
  '  fn: () => Promise<T>',
  ') {',
  '  const [data, setData] = useState<T | null>(null)',
  "  const [status, setStatus] = useState<Status>('idle')",
  '  const [error, setError] = useState<string | null>(null)',
  '',
  '  const run = useCallback(async () => {',
  "    setStatus('loading')",
  '    setError(null)',
  '    try {',
  '      const result = await fn()',
  '      setData(result)',
  "      setStatus('success')",
  '    } catch (e) {',
  '      setError((e as Error).message)',
  "      setStatus('error')",
  '    }',
  '  }, [])',
  '',
  '  useEffect(() => { run() }, [run])',
  '  return { data, status, error, refetch: run }',
  '}',
  '',
  'const Badge: FC<{ label: string }> = ({ label }) => (',
  '  <span className="badge">{label}</span>',
  ')',
  '',
  'function ProjectCard({',
  '  project,',
  '}: { project: Project }) {',
  '  const [hover, setHover] = useState(false)',
  '',
  '  return (',
  '    <article',
  '      className="project-card"',
  '      onMouseEnter={() => setHover(true)}',
  '      onMouseLeave={() => setHover(false)}',
  '    >',
  '      <div className="card-header">',
  '        <h3>{project.title}</h3>',
  '        {project.featured && (',
  '          <Badge label="Featured" />',
  '        )}',
  '      </div>',
  '      <p>{project.description}</p>',
  '      <ul className="tech-list">',
  '        {project.tech.map(tag => (',
  '          <li key={tag}><Badge label={tag} /></li>',
  '        ))}',
  '      </ul>',
  '      {hover && project.liveUrl && (',
  '        <a href={project.liveUrl} target="_blank"',
  '           rel="noreferrer">',
  '          Live Demo ↗',
  '        </a>',
  '      )}',
  '    </article>',
  '  )',
  '}',
  '',
  'export default function Portfolio() {',
  '  const {',
  '    data: projects,',
  '    status,',
  '    error,',
  '  } = useAsync(getProjects)',
  '',
  "  if (status === 'loading') {",
  '    return <div className="spinner" />',
  '  }',
  '',
  '  return (',
  '    <main className="portfolio">',
  '      <section id="hero">',
  '        <h1>Dheeraj Saxena</h1>',
  '        <p className="tagline">Full Stack Developer</p>',
  '        <nav>',
  '          <a href="#projects">View Work</a>',
  '          <a href="#contact">Contact</a>',
  '        </nav>',
  '      </section>',
  '      <section id="projects">',
  '        <div className="grid">',
  '          {(projects ?? []).map(p => (',
  '            <ProjectCard',
  '              key={p.id}',
  '              project={p}',
  '            />',
  '          ))}',
  '        </div>',
  '      </section>',
  '      <section id="contact">',
  '        <h2>Get In Touch</h2>',
  '        <a href="mailto:dheeraj@dheerajsaxena.dev">',
  '          dheeraj@dheerajsaxena.dev',
  '        </a>',
  '      </section>',
  '    </main>',
  '  )',
  '}',
]

function CodeLine({ line, num }: { line: string; num: number }) {
  const numStr = String(num).padStart(3, ' ')
  if (!line.trim()) {
    return (
      <div className="cs-line">
        <span className="cs-ln">{numStr}</span>
        <span className="cs-ct">&nbsp;</span>
      </div>
    )
  }
  return (
    <div className="cs-line">
      <span className="cs-ln">{numStr}</span>
      <span className="cs-ct">
        {tokenize(line).map(({ c, t }, i) =>
          c ? <span key={i} className={`cs-${c}`}>{t}</span> : t
        )}
      </span>
    </div>
  )
}

function Block() {
  return (
    <div className="cs-block">
      {LINES.map((line, i) => (
        <CodeLine key={i} line={line} num={i + 1} />
      ))}
    </div>
  )
}

export default function CodeScroller() {
  return (
    <div className="cs-wrap" aria-hidden="true" role="presentation">
      {/* Gradient fades */}
      <div className="cs-fade cs-fade-top" />
      <div className="cs-fade cs-fade-bottom" />
      <div className="cs-fade cs-fade-left" />
      {/* Scrolling track — two copies for seamless loop */}
      <div className="cs-track">
        <Block />
        <Block />
      </div>
    </div>
  )
}
