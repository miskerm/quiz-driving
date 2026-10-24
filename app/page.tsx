'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { ArrowLeft, BarChart3, Bell, BookOpen, Check, CircleHelp, ClipboardList, Clock3, Download, Flame, House, MapPin, MessageSquare, Pencil, ShieldCheck, Sparkles, Trophy, UserRound, LogOut, Users, FileText, Plus, Upload } from 'lucide-react'

const dashboardImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-10-16_21-35-23-B3Fy090WLgQF1rIrdkIYWaoi8lMye7.jpg'
const questions = Array.from({ length: 64 }, (_, index) => index + 1)

type User = { name: string; email: string; plan: 'free' | 'premium_500' | 'premium_1000' } | null

const AuthContext = createContext<{ user: User; login: (user: User) => void; logout: () => void } | undefined>(undefined)

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  return <AuthContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

type PageView = 'pricing' | 'faq' | 'login' | 'feedback' | 'streak' | 'notifications' | 'account' | 'study' | 'practice' | 'full-mock' | 'admin'

function Header({ onHome, onDashboard, onPage, activeView }: { onHome: () => void; onDashboard: () => void; onPage: (page: PageView) => void; activeView: 'home' | 'dashboard' }) {
  const { user, logout } = useAuth()
  return (
    <header className={`sticky top-0 z-20 border-b backdrop-blur ${activeView === 'dashboard' ? 'border-[#b9d8d3] bg-[#e7f6f2]/95' : 'border-[#dce6e4] bg-[#f8faf8]/95'}`}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 lg:px-8">
        <button onClick={onHome} className="flex items-center gap-2.5 text-left">
          <div className="grid size-10 place-items-center rounded-full bg-[#e1f2ef] text-[#066f70]">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <div className="text-[16px] font-extrabold">DrivoPrep</div>
            <div className="text-xs text-[#677775]">Get ready for your learners licence</div>
          </div>
        </button>
        <nav className="hidden items-center gap-2 md:flex">
          <button onClick={onHome} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${activeView === 'home' ? 'bg-[#007b78] text-white shadow-sm' : 'border border-[#bfcecb] bg-white text-[#314957]'}`}>
            <House className="size-4" />
            DrivoPrep Learners
          </button>
          <button onClick={onDashboard} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${activeView === 'dashboard' ? 'bg-[#007b78] text-white shadow-sm' : 'border border-[#bfcecb] bg-white text-[#314957]'}`}><BarChart3 className="size-4" />Dashboard</button>
          <button onClick={() => onPage('pricing')} className="rounded-lg border border-[#bfcecb] bg-white px-4 py-2.5 text-sm">Pricing</button>
          {user ? (
            <>
              {user.plan.startsWith('premium') && <button onClick={() => onPage('admin')} className="rounded-lg border border-[#bfcecb] bg-white px-4 py-2.5 text-sm font-bold">Admin</button>}
              <button onClick={() => { logout(); onHome() }} className="flex items-center gap-2 rounded-lg border border-[#bfcecb] bg-white px-4 py-2.5 text-sm text-red-600">
                <LogOut className="size-4" />
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => onPage('login')} className="rounded-lg border border-[#007b78] bg-white px-4 py-2.5 text-sm font-bold text-[#007b78]">Login</button>
          )}
        </nav>
      </div>
    </header>
  )
}

function LoginPage({ onHome, onDashboard, onAdmin }: { onHome: () => void; onDashboard: () => void; onAdmin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const { login } = useAuth()
  const handleLogin = (plan: 'free' | 'premium_500' | 'premium_1000') => {
    login({ name: 'Lerato M.', email: email || 'user@example.com', plan })
    onDashboard()
  }
  const handleAdminLogin = () => {
    if (email.trim().toLowerCase() === 'lol@gmail.com' && password === '12345678') {
      setAdminError('')
      login({ name: 'Admin', email: 'lol@gmail.com', plan: 'premium_1000' })
      onAdmin()
    } else {
      setAdminError('Use the admin email and password provided.')
    }
  }
  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-5 py-16">
      <button onClick={onHome} className="mb-10 rounded-lg border border-[#bfcecb] bg-white px-4 py-2.5 font-semibold text-[#087f78]">
        Back to home
      </button>
      <section className="max-w-2xl rounded-2xl border border-[#d8e2e0] bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-[#168f82]">DrivoPrep</p>
        <h1 className="mt-3 text-4xl font-extrabold">Welcome back</h1>
        <p className="mt-4 text-lg leading-8 text-[#607477]">Login to your account or create a new one to start learning.</p>
        <div className="mt-7 space-y-3">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setAdminError('') }} className="w-full rounded-lg border border-[#cbd9d7] px-4 py-3" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); setAdminError('') }} className="w-full rounded-lg border border-[#cbd9d7] px-4 py-3" />
          {adminError && <p role="alert" className="text-sm font-semibold text-[#d94c4c]">{adminError}</p>}
          <button onClick={() => handleLogin('free')} className="w-full rounded-lg bg-[#087f78] px-5 py-3 font-bold text-white">
            Login (Free Access)
          </button>
          <button onClick={() => handleLogin('premium_500')} className="w-full rounded-lg bg-[#ff9318] px-5 py-3 font-bold text-white">
            Login (Premium 500 ETB)
          </button>
          <button onClick={() => handleLogin('premium_1000')} className="w-full rounded-lg bg-[#ff6b35] px-5 py-3 font-bold text-white">
            Login (Premium 1000 ETB)
          </button>
          <div className="mt-5 border-t border-[#edf0ef] pt-5">
            <p className="text-sm font-extrabold text-[#314957]">Admin access</p>
            <p className="mt-1 text-xs text-[#718181]">Use the admin credentials to open the control dashboard.</p>
            <button onClick={handleAdminLogin} className="mt-3 w-full rounded-lg border-2 border-[#087f78] bg-white px-5 py-3 font-bold text-[#087f78]">Login to Admin Dashboard</button>
          </div>
        </div>
      </section>
    </main>
  )
}

function PricingPage({ onHome }: { onHome: () => void }) {
  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-5 py-16">
      <button onClick={onHome} className="mb-10 rounded-lg border border-[#bfcecb] bg-white px-4 py-2.5 font-semibold text-[#087f78]">
        Back to home
      </button>
      <section className="rounded-2xl border border-[#d8e2e0] bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-extrabold">Premium access</h1>
        <p className="mt-4 text-lg leading-8 text-[#607477]">Choose your plan to unlock all features.</p>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-[#d8e2e0] p-6">
            <h2 className="text-2xl font-extrabold">Premium 500 ETB</h2>
            <p className="mt-2 text-4xl font-bold text-[#168f82]">500 ETB</p>
            <p className="mt-2 text-sm text-[#607477]">Monthly plan</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3"><Check className="size-5 text-[#168f82]" /><span>All practice questions</span></li>
              <li className="flex items-center gap-3"><Check className="size-5 text-[#168f82]" /><span>Full mock tests</span></li>
              <li className="flex items-center gap-3"><Check className="size-5 text-[#168f82]" /><span>Progress tracking</span></li>
              <li className="flex items-center gap-3"><Check className="size-5 text-[#168f82]" /><span>Study materials</span></li>
            </ul>
            <button className="mt-8 w-full rounded-lg bg-[#ff9318] px-5 py-3 font-bold text-white">Get Started</button>
          </div>

          <div className="rounded-xl border-2 border-[#ff9318] bg-[#fffaf0] p-6">
            <div className="inline-block rounded-full bg-[#ff9318] px-3 py-1 text-xs font-bold text-white">Most Popular</div>
            <h2 className="mt-4 text-2xl font-extrabold">Premium 1000 ETB</h2>
            <p className="mt-2 text-4xl font-bold text-[#ff9318]">1000 ETB</p>
            <p className="mt-2 text-sm text-[#607477]">Annual plan (better value)</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3"><Check className="size-5 text-[#ff9318]" /><span>All monthly features</span></li>
              <li className="flex items-center gap-3"><Check className="size-5 text-[#ff9318]" /><span>Priority support</span></li>
              <li className="flex items-center gap-3"><Check className="size-5 text-[#ff9318]" /><span>Offline access</span></li>
              <li className="flex items-center gap-3"><Check className="size-5 text-[#ff9318]" /><span>Certificate of completion</span></li>
            </ul>
            <button className="mt-8 w-full rounded-lg bg-[#ff9318] px-5 py-3 font-bold text-white">Get Started</button>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoPage({ page, onHome, onMock }: { page: PageView; onHome: () => void; onMock: () => void }) {
  const content = {
    faq: ['Frequently asked questions', 'Find answers about studying, practice sessions, and mock test results.'],
    feedback: ['Share your feedback', 'Tell us what helped you prepare and what we can improve.'],
    streak: ['Your learning streak', 'You have practised for 2 days in a row. Keep going to build confident learner habits.'],
    notifications: ['Notifications', 'Good job! You completed your latest practice session. Keep your momentum going and review one more topic today.'],
    account: ['Lerato M. account', 'Your learner profile is active. Your progress, streak, and premium access are ready from this frontend dashboard.'],
  }[page] || ['Page not found', 'The page you are looking for does not exist.']
  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-5 py-16">
      <button onClick={onHome} className="mb-10 rounded-lg border border-[#bfcecb] bg-white px-4 py-2.5 font-semibold text-[#087f78]">
        Back to home
      </button>
      <section className="max-w-2xl rounded-2xl border border-[#d8e2e0] bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-[#168f82]">DrivoPrep</p>
        <h1 className="mt-3 text-4xl font-extrabold">{content[0]}</h1>
        <p className="mt-4 text-lg leading-8 text-[#607477]">{content[1]}</p>
        {page === 'streak' && <div className="mt-8"><div className="flex items-end justify-between"><span className="text-sm font-bold text-[#607477]">Day 2 of 50</span><Flame className="size-10 text-[#ff7d55]" /></div><div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">{Array.from({ length: 50 }, (_, index) => <div key={index} className={`grid aspect-square place-items-center rounded-lg text-xs font-bold ${index < 2 ? 'bg-[#ff7d55] text-white' : 'border border-[#d8e2e0] bg-[#f8fbfa] text-[#78908d]'}`}>{index + 1}</div>)}</div><p className="mt-4 text-sm font-semibold text-[#087f78]">Keep practising daily to light up all 50 days.</p></div>}
        {page === 'feedback' ? <textarea aria-label="Message" placeholder="Write your message..." className="mt-7 min-h-32 w-full rounded-lg border border-[#cbd9d7] p-3" /> : null}
      </section>
    </main>
  )
}

function StudyPage({ onBack }: { onBack: () => void }) {
  const { user } = useAuth()
  const [openModule, setOpenModule] = useState<string | null>(null)
  const notes = [
    { topic: 'Signs & Signals', content: 'Learn the meanings of South African road signs. Red signs are regulatory, yellow are warnings, and blue are informational.', image: '/study-road-scene.png' },
    { topic: 'Vehicle Controls', content: 'Master pedals, steering, mirrors, lights, and the safety controls you need before your first test.', image: '/study-road-scene.png' },
    { topic: 'Rules of the Road', content: 'Understand speed limits, right of way, lane discipline, intersections, and parking regulations.', image: '/study-road-scene.png' },
    { topic: 'Safe Driving', content: 'Build defensive driving habits that help you stay alert, calm, and safe on the road.', image: '/study-road-scene.png' },
  ]
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-[#e3e8e6] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-7 py-4">
          <h1 className="text-2xl font-extrabold">Study Materials</h1>
          <button onClick={onBack} className="flex items-center gap-2 rounded-lg border border-[#bfcecb] px-4 py-2.5 font-semibold text-[#087f78]">
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-7 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {notes.map((note, i) => (
            <article key={i} className="overflow-hidden rounded-xl border border-[#d8e2e0] bg-white shadow-sm">
              <img src={note.image} alt={`${note.topic} study illustration`} className="h-36 w-full object-cover" />
              <div className="p-6"><div className="flex items-center gap-3">
                <BookOpen className="size-6 text-[#168f82]" />
                <h2 className="text-lg font-extrabold">{note.topic}</h2>
              </div>
              <p className="mt-4 leading-6 text-[#607477]">{note.content}</p>
              <button onClick={() => setOpenModule(openModule === note.topic ? null : note.topic)} className="mt-6 rounded-lg border border-[#087f78] bg-white px-4 py-2 font-bold text-[#087f78]">{openModule === note.topic ? 'Close module' : 'Open module notes'}</button>{openModule === note.topic && <div className="mt-4 rounded-lg bg-[#effafa] p-4 text-sm leading-6 text-[#38575a]"><strong>Key lesson:</strong> Read the signs carefully, check mirrors before moving, and practise one safe decision at a time. This module is ready for learner review.</div>}
              </div></article>
          ))}
        </div>
      </div>
    </main>
  )
}

function PracticePage({ onBack }: { onBack: () => void }) {
  const [current, setCurrent] = useState(1)
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [activeModule, setActiveModule] = useState('Road Signs')
  
  const modules = [
    { name: 'Road Signs', detail: 'Warning, regulatory, and information signs.' },
    { name: 'Rules of the Road', detail: 'Speed limits, lanes, intersections, and right of way.' },
    { name: 'Vehicle Controls', detail: 'Mirrors, pedals, lights, and safety checks.' },
    { name: 'Safe Driving', detail: 'Defensive driving habits and hazard awareness.' },
  ]
  const practiceQuestions = [
    { id: 1, question: 'What does a red triangular sign mean?', options: ['Mandatory action', 'Warning', 'Information'], correct: 'Warning' },
    { id: 2, question: 'What is the speed limit in a residential area?', options: ['40 km/h', '60 km/h', '80 km/h'], correct: '60 km/h' },
  ]
  const q = practiceQuestions[current - 1]
  
  return (
    <main className="min-h-screen bg-[#f6faf9]">
      <div className="border-b border-[#e3e8e6] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-7 py-4">
          <h1 className="text-2xl font-extrabold">Practice Questions</h1>
          <button onClick={onBack} className="flex items-center gap-2 rounded-lg border border-[#bfcecb] px-4 py-2.5 font-semibold text-[#087f78]">
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1000px] px-7 py-12">
        <section className="mb-6 rounded-xl border border-[#d8e2e0] bg-white p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-extrabold">Practice modules</h2><p className="mt-1 text-sm text-[#607477]">Choose a topic, then answer questions in a clear order.</p></div><span className="rounded-full bg-[#e6f5f3] px-3 py-1 text-xs font-bold text-[#087f78]">Free practice</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{modules.map((module, index) => <button key={module.name} onClick={() => { setActiveModule(module.name); setCurrent(1); setSelected(null); setAnswered(false) }} className={`rounded-lg border p-4 text-left ${activeModule === module.name ? 'border-[#168f82] bg-[#e6f5f3]' : 'border-[#d8e2e0] bg-white'}`}><span className="text-xs font-bold text-[#168f82]">MODULE {index + 1}</span><strong className="mt-1 block">{module.name}</strong><span className="mt-1 block text-sm text-[#607477]">{module.detail}</span></button>)}</div></section>
        <div className="rounded-xl border border-[#d8e2e0] bg-white p-8">
          <p className="text-sm font-bold uppercase text-[#168f82]">{activeModule} · Question {current} of {practiceQuestions.length}</p>
          <h2 className="mt-4 text-2xl font-extrabold">{q.question}</h2>
          <div className="mt-8 space-y-3">
            {q.options.map((option) => (
              <button key={option} onClick={() => { setSelected(option); setAnswered(true) }} className={`w-full rounded-lg border-2 p-4 text-left font-semibold transition ${selected === option ? 'border-[#168f82] bg-[#e6f5f3]' : 'border-[#d8e2e0] bg-white'}`}>
                {option}
                {answered && option === q.correct && <Check className="float-right size-5 text-[#168f82]" />}
              </button>
            ))}
          </div>
          {answered && (
            <div className="mt-8 rounded-lg bg-[#e6f5f3] p-4">
              <p className="font-bold text-[#087f78]">{selected === q.correct ? '✓ Good job! Correct answer.' : '✗ Not quite yet'}</p>
              <p className="mt-2 text-sm">The correct answer is: <strong>{q.correct}</strong></p>
            </div>
          )}
          {answered && current < practiceQuestions.length && <button onClick={() => { setCurrent(current + 1); setSelected(null); setAnswered(false) }} className="mt-6 w-full rounded-lg bg-[#168f82] px-4 py-3 font-bold text-white">Next Question</button>}
          {answered && current === practiceQuestions.length && <button onClick={onBack} className="mt-6 w-full rounded-lg bg-[#087f78] px-4 py-3 font-bold text-white">Complete & Go Back</button>}
        </div>
      </div>
    </main>
  )
}

function FullMockTestPage({ onBack }: { onBack: () => void }) {
  const [current, setCurrent] = useState(64)
  const [selected, setSelected] = useState('Interior mirror')
  const [submitted, setSubmitted] = useState(false)
  const options = ['Nr 9', 'Interior mirror', 'Nr 11']
  
  return (
    <main className="min-h-screen bg-[#f6faf9] text-[#142238]">
      <div className="border-b border-[#dbe5e4] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-5 py-4">
          <div className="flex items-center gap-3 text-xl font-extrabold">
            <ShieldCheck className="size-9 text-[#0b7e7a]" />
            Code 2 Full Mock Test
          </div>
          <div className="ml-auto flex items-center gap-3 font-bold">
            <Clock3 className="text-[#168e8a]" />
            52:45 <span>{current} / 64</span>
            <div className="hidden h-2 w-80 rounded-full bg-[#20a49d] sm:block" />
          </div>
          <button onClick={onBack} className="hidden rounded-lg border border-[#8eb7b3] px-4 py-2.5 font-semibold text-[#176d6b] sm:block">
            <ArrowLeft className="mr-2 inline size-4" />
            Back
          </button>
          <button onClick={() => setSubmitted(true)} className="rounded-lg bg-[#cf2638] px-4 py-2.5 font-semibold text-white">
            Submit
          </button>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-5 p-5 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-[#dfe7e6] bg-white p-3">
          <h2 className="font-extrabold">Questions (64)</h2>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {questions.map((question) => (
              <button key={question} onClick={() => setCurrent(question)} className={`rounded-md border px-1 py-1 text-xs font-bold ${question === current ? 'border-[#e5bc45] bg-[#fff8da]' : question < current ? 'border-[#bce3df] bg-[#e6f5f3] text-[#106c69]' : 'border-[#dbe8e6] bg-white text-[#116c69]'}`}>
                Q{question}
              </button>
            ))}
          </div>
        </aside>
        <section className="rounded-xl border border-[#dfe7e6] bg-white p-7">
          <p className="text-sm font-bold uppercase text-[#168f82]">Question {current} - Vehicle Controls</p>
          <h2 className="mt-3 text-2xl font-extrabold">Which numbered foot control slows or stops the vehicle?</h2>
          <div className="mt-8 space-y-3">
            {options.map((option) => (
              <label key={option} className={`flex items-center gap-4 rounded-lg border-2 p-4 cursor-pointer ${selected === option ? 'border-[#168f82] bg-[#e6f5f3]' : 'border-[#d8e2e0] bg-white'}`}>
                <input type="radio" checked={selected === option} onChange={() => setSelected(option)} className="size-5 accent-[#168f82]" />
                <span className="font-semibold">{option}</span>
              </label>
            ))}
          </div>
          {submitted && <div className="mt-8 rounded-lg bg-[#fff3cd] p-4 text-center font-bold text-[#856404]">Mock test submitted! Score: 52/64</div>}
        </section>
      </div>
    </main>
  )
}

function AdminDashboard({ onBack, onPage }: { onBack: () => void; onPage: (page: PageView) => void }) {
  const [students] = useState([

    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Premium 500 ETB', status: 'Active', progress: 75 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Premium 1000 ETB', status: 'Active', progress: 92 },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', plan: 'Premium 500 ETB', status: 'Inactive', progress: 45 },
  ])
  const [questionText, setQuestionText] = useState('')
  const [questionOptions, setQuestionOptions] = useState('')
  const [addedQuestions, setAddedQuestions] = useState<string[]>([])
  const [uploadedFile, setUploadedFile] = useState('')

  function addQuestion() {
    if (!questionText.trim()) return
    setAddedQuestions((items) => [...items, questionText.trim()])
    setQuestionText('')
    setQuestionOptions('')
  }

  return (
    <main className="min-h-screen bg-[#f6faf9]">
      <div className="border-b border-[#dce6e4] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-7 py-4">
          <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
          <button onClick={onBack} className="flex items-center gap-2 rounded-lg border border-[#bfcecb] px-4 py-2.5 font-semibold text-[#087f78]">
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-7 py-12">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-xl border border-[#d8e2e0] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#607477]">Total Students</p>
                <p className="text-3xl font-extrabold mt-2">243</p>
              </div>
              <Users className="size-8 text-[#168f82]" />
            </div>
          </div>
          <div className="rounded-xl border border-[#d8e2e0] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#607477]">Revenue (ETB)</p>
                <p className="text-3xl font-extrabold mt-2">450,000</p>
              </div>
              <Trophy className="size-8 text-[#ff9318]" />
            </div>
          </div>
          <div className="rounded-xl border border-[#d8e2e0] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#607477]">Mock Tests Taken</p>
                <p className="text-3xl font-extrabold mt-2">1,240</p>
              </div>
              <ClipboardList className="size-8 text-[#0b7e7a]" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#d8e2e0] bg-white p-6">
          <h2 className="text-xl font-extrabold mb-6">Paid Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#d8e2e0]">
                  <th className="px-4 py-3 text-left font-bold">Name</th>
                  <th className="px-4 py-3 text-left font-bold">Email</th>
                  <th className="px-4 py-3 text-left font-bold">Plan</th>
                  <th className="px-4 py-3 text-left font-bold">Status</th>
                  <th className="px-4 py-3 text-left font-bold">Progress</th>
                  <th className="px-4 py-3 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-[#edf0ef]">
                    <td className="px-4 py-3 font-semibold">{student.name}</td>
                    <td className="px-4 py-3 text-[#607477]">{student.email}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#168f82]">{student.plan}</td>
                    <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-bold ${student.status === 'Active' ? 'bg-[#e6f5f3] text-[#087f78]' : 'bg-[#f3f3f3] text-[#666]'}`}>{student.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="w-24 h-2 bg-[#e3e8e6] rounded-full">
                        <div className="h-full bg-[#168f82] rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><button className="flex items-center gap-1 text-[#168f82] font-semibold"><Download className="size-4" />Export</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-[#d8e2e0] bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-extrabold">Learning modules</h2><p className="mt-1 text-sm text-[#607477]">Open the same learner areas to review and control their content.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => onPage('study')} className="rounded-lg bg-[#168f82] px-3 py-2 text-sm font-bold text-white">Open Study</button><button onClick={() => onPage('practice')} className="rounded-lg bg-[#1784c0] px-3 py-2 text-sm font-bold text-white">Open Practice</button><button onClick={() => onPage('full-mock')} className="rounded-lg bg-[#ef6a57] px-3 py-2 text-sm font-bold text-white">Open Mock Test</button></div></div></div>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <div className="rounded-xl border border-[#d8e2e0] bg-white p-6">
            <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2"><FileText className="size-5" />Upload Study Materials</h2>
            <div className="border-2 border-dashed border-[#d8e2e0] rounded-lg p-8 text-center">
              <Upload className="mx-auto size-8 text-[#168f82]" />
              <p className="mt-2 text-[#607477]">Add a PDF study guide for learners.</p>
              <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#087f78] px-4 py-2 font-bold text-white"><Upload className="size-4" />Choose PDF<input type="file" accept=".pdf" className="sr-only" onChange={(event) => setUploadedFile(event.target.files?.[0]?.name ?? '')} /></label>
              {uploadedFile && <p className="mt-3 text-sm font-semibold text-[#168f82]">Ready: {uploadedFile}</p>}
            </div>
          </div>
          <div className="rounded-xl border border-[#d8e2e0] bg-white p-6">
            <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2"><ClipboardList className="size-5" />Manage Mock Tests</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border border-[#d8e2e0] hover:bg-[#f6faf9] font-semibold">Code 2 Mock Test - 64 Questions</button>
              <button className="w-full text-left p-3 rounded-lg border border-[#d8e2e0] hover:bg-[#f6faf9] font-semibold">Code B Mock Test - 50 Questions</button>
            </div>
            <div className="mt-5 border-t border-[#edf0ef] pt-5">
              <h3 className="font-extrabold">Add question to mock test</h3>
              <input value={questionText} onChange={(event) => setQuestionText(event.target.value)} placeholder="Question text" className="mt-3 w-full rounded-lg border border-[#cbd9d7] p-3" />
              <input value={questionOptions} onChange={(event) => setQuestionOptions(event.target.value)} placeholder="Options separated by commas" className="mt-2 w-full rounded-lg border border-[#cbd9d7] p-3" />
              <button onClick={addQuestion} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#168f82] px-4 py-2 font-bold text-white"><Plus className="size-4" />Add Question</button>
              {addedQuestions.length > 0 && <p className="mt-3 text-sm font-semibold text-[#168f82]">{addedQuestions.length} question{addedQuestions.length === 1 ? '' : 's'} added to the draft mock test.</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Dashboard({ onMock, onHome, onPage }: { onMock: () => void; onHome: () => void; onPage: (page: PageView) => void }) {
  const { user } = useAuth()
  const [personalised, setPersonalised] = useState(false)
  
  const canAccess = (feature: string) => {
    if (feature === 'study' || feature === 'practice') return true
    return user?.plan.startsWith('premium')
  }

  return (
    <main className="min-h-screen bg-white text-[#142238]">
      <div className="border-b border-[#e3e8e6] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-5 px-7 py-4 text-sm font-bold text-[#1b5553]">
          <button onClick={onMock} className="flex items-center gap-2">
            <Sparkles className="size-4" />
            Start Quick Quiz
          </button>
          <button onClick={() => onPage('streak')} className="flex items-center gap-2">
            <Flame className="size-4 text-[#ff7d55]" />
            2 Day Streak
          </button>
          <button onClick={() => onPage('faq')} aria-label="Help" className="grid size-9 place-items-center rounded-lg border border-[#ced9d7]">
            <CircleHelp className="size-4" />
          </button>
          <button onClick={() => onPage('notifications')} aria-label="Notifications" className="relative grid size-9 place-items-center rounded-lg border border-[#ced9d7]">
            <Bell className="size-4" />
            <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#ef594f] text-[10px] text-white">2</span>
          </button>
          <button onClick={() => onPage('account')} className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-[#0f928b] text-white">LM</span>
            {user?.name}⌄
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-7 pb-12 pt-9">
<h1 className="text-4xl font-extrabold tracking-tight">Welcome back, {user?.name ?? 'Learner'}!</h1>
  <p className="mt-1 font-semibold text-[#607477]">Let&apos;s build your road confidence.</p>
  <p className="mt-4 max-w-2xl text-[#53686a]">Choose a learning path below. Study and Practice are ready to use now; premium mock tests unlock the full 64-question experience.</p>
        
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Feature 
            title="Study" 
            text="Read clear notes on signs, rules, and vehicle controls." 
            action="Start Studying"
            icon={BookOpen}
            tone="teal"
            onClick={() => onPage('study')}
          />
          <Feature 
            title="Practice" 
            text="Answer learner-style questions and check your understanding." 
            action="Start Practicing"
            icon={Pencil}
            tone="blue"
            onClick={() => onPage('practice')}
          />
          <Feature 
            title="Full Mock Test" 
            text="Complete a full simulation with progress and results."
            action={canAccess('mock') ? 'Start Mock Test' : 'Unlock Premium'}
            icon={ClipboardList}
            tone="coral"
            onClick={() => onPage(canAccess('mock') ? 'full-mock' : 'pricing')}
          />
          <Feature 
            title="Quick Quiz" 
            text="Try a short warm-up question to test your knowledge." 
            action="Start Quick Quiz"
            icon={Sparkles}
            tone="gold"
            onClick={onMock}
          />
        </div>

        <section className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            ['Overall Progress', '42%', 'Good progress!'],
            ['Topics Completed', '18 / 43', 'Topics'],
            ['Practice Questions', '126', 'Answered'],
            ['Average Score', '74%', 'Across all practice'],
            ['Current Streak', '2 days', 'Keep it going!'],
          ].map(([label, value, caption]) => (
            <div key={label} className="rounded-xl border border-[#dfe7e5] bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-[#53686a]">{label}</p>
              <p className="mt-5 text-2xl font-extrabold">{value}</p>
              <p className="mt-1 text-xs font-semibold text-[#718181]">{caption}</p>
            </div>
          ))}
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1.1fr_1fr]">
          <div className="rounded-xl border border-[#dfe7e5] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><h2 className="text-lg font-extrabold">Recent Results</h2><button onClick={() => onPage('practice')} className="font-bold text-[#087f78]">View all results</button></div>
            <div className="mt-5 flex flex-col gap-4">
              {['Mock Test - General Knowledge', 'Practice - Road Signs', 'Quick Quiz'].map((item, index) => <button key={item} onClick={index === 0 ? () => onPage('full-mock') : () => onPage('practice')} className="flex items-center justify-between border-b border-[#edf0ef] pb-3 text-left"><span><span className="block font-bold">{item}</span><span className="text-xs text-[#718181]">{index === 0 ? 'Today, 10:24' : 'Yesterday, 16:45'}</span></span><span className="font-extrabold text-[#168f82]">{[78, 80, 60][index]}%</span></button>)}
            </div>
          </div>
          <div className="rounded-xl border border-[#dfe7e5] bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-lg font-extrabold">Focus Areas</h2><button onClick={() => onPage('study')} className="font-bold text-[#087f78]">View all topics</button></div><div className="mt-5 flex flex-col gap-5">{[['Road Signs','60%','bg-[#f4b928]'],['Right of Way','45%','bg-[#ef514c]'],['Traffic Officers','75%','bg-[#23a36c]'],['Speed Limits','30%','bg-[#ef514c]']].map(([name, score, color]) => <button key={name} onClick={() => onPage('study')} className="text-left"><div className="flex justify-between text-sm font-bold"><span>{name}</span><span>{score}</span></div><div className="mt-2 h-2 rounded-full bg-[#e6e9e8]"><div className={`h-2 rounded-full ${color}`} style={{ width: score }} /></div></button>)}</div></div>
          <div className="rounded-xl border border-[#dfe7e5] bg-white p-5 shadow-sm"><h2 className="text-lg font-extrabold">Get Full Access</h2><ul className="mt-5 flex flex-col gap-3 text-sm font-semibold text-[#53686a]"><li>✓ Unlimited practice questions</li><li>✓ Full mock tests anytime</li><li>✓ Track detailed progress</li><li>✓ Access on all devices</li></ul><button onClick={() => onPage('pricing')} className="mt-7 w-full rounded-lg bg-[#0c978d] px-4 py-3 font-bold text-white">Request Full Access</button></div>
        </section>
        <div className="mt-5 rounded-xl border border-[#dfe7e5] bg-white p-5 text-sm font-semibold text-[#53686a] shadow-sm">SA Learners is here to help you become a confident and responsible driver. Always remember: roads are shared. Drive safe, stay alert, stay alive.</div>
      </div>
    </main>
  )
}

function Feature({ title, text, action, icon: Icon, tone, onClick }: { title: string; text: string; action: string; icon: typeof BookOpen; tone: string; onClick?: () => void }) {
  const tones: Record<string, string> = {
    teal: 'bg-[#f0fcf8] border-[#bfe5da] text-[#087f78]',
    blue: 'bg-[#f1f9ff] border-[#c5e0f0] text-[#1784c0]',
    coral: 'bg-[#fff6f3] border-[#f2d1c6] text-[#f26a57]',
    gold: 'bg-[#fffaf0] border-[#f2dfac] text-[#edaa16]',
  }
  return (
    <div className={`rounded-xl border p-5 ${tones[tone]}`}>
      <Icon className="size-10" />
      <h2 className="mt-4 text-lg font-extrabold">{title}</h2>
      <div className="mt-3 min-h-24 rounded-lg bg-white p-3 text-sm font-semibold leading-6 text-[#475e60]">{text}</div>
      <button onClick={onClick} className="mt-5 w-full rounded-lg bg-[#168f82] px-4 py-3 font-bold text-white shadow-sm">
        {action}
      </button>
    </div>
  )
}

function Landing({ onDashboard, onMock }: { onDashboard: () => void; onMock: () => void }) {
  return (
    <>
      <section id="home" className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-14 pt-16 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:pb-20 lg:pt-20">
        <div>
          <h1 className="max-w-[520px] text-6xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">
            Get ready<br />for your<br />learner&apos;s<br />test
          </h1>
          <p className="mt-6 max-w-[500px] text-lg leading-8 text-[#203c58]">
            A mobile-first study app with practice-style questions, clear explanations, and a full mock test simulation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onDashboard} className="rounded-lg bg-[#ff9318] px-4 py-3 font-semibold text-white">
              Open Dashboard
            </button>
            <button onClick={onMock} className="rounded-lg border border-[#007b78] bg-white px-4 py-3 font-semibold text-[#007b78]">
              Start Quick Quiz
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#314957]">
            <span>♧ Practice on your schedule</span>
            <span>◉ Learner-safe practice content</span>
            <span>♧ Full Access upgrade</span>
          </div>
        </div>
        <button onClick={onDashboard} className="rounded-xl border border-[#d5e0de] bg-white p-2 text-left shadow-[0_24px_60px_rgba(20,55,60,.08)]">
          <img src={dashboardImage} alt="DrivoPrep learner dashboard preview; tap to open dashboard" className="w-full rounded-lg" />
        </button>
      </section>
      <section className="mx-auto grid max-w-[1280px] grid-cols-2 border-y border-[#d3e1df] bg-[#effafa] text-center md:grid-cols-5">
        <div className="border-r border-[#d3e1df] px-4 py-9">
          <CircleHelp className="mx-auto text-[#168f82]" />
          <h3 className="mt-4 font-extrabold">Practice-style questions</h3>
          <p className="mt-3 text-[#5d7171]">Built around the learner test structure.</p>
        </div>
        <div className="border-r border-[#d3e1df] px-4 py-9">
          <BookOpen className="mx-auto text-[#168f82]" />
          <h3 className="mt-4 font-extrabold">Study signs, rules & controls</h3>
          <p className="mt-3 text-[#5d7171]">Clear study cards for all topics that matter.</p>
        </div>
        <div className="border-r border-[#d3e1df] px-4 py-9 md:border-r-0">
          <CircleHelp className="mx-auto text-[#168f82]" />
          <h3 className="mt-4 font-extrabold">Clear explanations</h3>
          <p className="mt-3 text-[#5d7171]">Simple feedback after each practice answer.</p>
        </div>
        <div className="border-r border-[#d3e1df] px-4 py-9 md:border-r">
          <Trophy className="mx-auto text-[#168f82]" />
          <h3 className="mt-4 font-extrabold">Full mock test</h3>
          <p className="mt-3 text-[#5d7171]">Practise section results before test day.</p>
        </div>
        <div className="px-4 py-9">
          <ShieldCheck className="mx-auto text-[#168f82]" />
          <h3 className="mt-4 font-extrabold">Free starter access</h3>
          <p className="mt-3 text-[#5d7171]">Start with a focused free set of questions.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 py-16 text-center">
        <h2 className="text-2xl font-extrabold">How it works</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[['Study', 'Review signs, rules, and controls through clear study cards.', BookOpen], ['Practice', 'Answer practice-style questions and get instant feedback.', Pencil], ['Mock Test', 'Take a full practice simulation and see section results.', Trophy]].map(([title, text, Icon]) => <button key={title as string} onClick={() => title === 'Study' ? onDashboard() : onMock()} className="rounded-xl p-5 text-center transition hover:bg-[#effafa]"><span className="mx-auto grid size-12 place-items-center rounded-xl bg-[#e5f4f0] text-[#087f78]"><Icon className="size-6" /></span><h3 className="mt-4 font-extrabold">{title as string}</h3><p className="mt-3 text-[#5d7171]">{text as string}</p></button>)}
        </div>
      </section>
      <section className="mx-auto mb-12 grid max-w-[1280px] gap-6 rounded-xl border border-[#c8dfdc] bg-[#effafa] p-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div><h2 className="text-2xl font-extrabold">Your progress, all in one place</h2><p className="mt-3 text-[#53686a]">Track section readiness, review results, and focus on what matters next.</p><ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-[#53686a]"><li>✓ Section readiness overview</li><li>✓ Quick access to Study, Practice, and Mock Test</li><li>✓ Results and weak areas at a glance</li></ul><button onClick={onDashboard} className="mt-6 rounded-lg border border-[#087f78] bg-white px-4 py-3 font-bold text-[#087f78]">View dashboard</button></div><div className="grid gap-3 rounded-xl border border-[#d8e2e0] bg-white p-5 sm:grid-cols-3"><div className="grid place-items-center rounded-lg bg-[#f8fbfa] p-5 text-center"><strong className="text-4xl text-[#087f78]">76%</strong><span className="mt-2 text-xs font-bold text-[#718181]">Mock result</span></div><div className="flex flex-col gap-3 p-2 text-sm"><span>Road Signs <b className="float-right">80%</b></span><div className="h-2 rounded-full bg-[#e4e9e8]"><div className="h-2 w-4/5 rounded-full bg-[#1a9d92]" /></div><span>Rules of the Road <b className="float-right">70%</b></span><div className="h-2 rounded-full bg-[#e4e9e8]"><div className="h-2 w-[70%] rounded-full bg-[#1a9d92]" /></div></div><div className="flex flex-col gap-3 p-2"><button onClick={onDashboard} className="rounded-lg border border-[#d2dfdc] p-3 text-left font-bold">Review wrong answers</button><button onClick={onDashboard} className="rounded-lg border border-[#d2dfdc] p-3 text-left font-bold">Practise Vehicle Controls</button><button onClick={onMock} className="rounded-lg border border-[#d2dfdc] p-3 text-left font-bold">Retake mock test</button></div></div></section>
    </>
  )
}

export default function Page() {
  const [view, setView] = useState<'home' | 'dashboard' | 'mock' | PageView>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/admin') return 'admin'
      const module = new URLSearchParams(window.location.search).get('module')
      if (module === 'study' || module === 'practice' || module === 'full-mock') return module
    }
    return 'home'
  })

  return (
    <AuthProvider>
      <MainApp view={view} setView={setView} />
    </AuthProvider>
  )
}

function MainApp({ view, setView }: { view: PageView | 'home' | 'dashboard' | 'mock'; setView: (v: PageView | 'home' | 'dashboard' | 'mock') => void }) {
  const { user } = useAuth()
  const navigate = setView as (page: PageView) => void

  if (view === 'mock') return <MockTest onBack={() => setView('dashboard')} />
  if (view === 'study') return <StudyPage onBack={() => setView('dashboard')} />
  if (view === 'practice') return <PracticePage onBack={() => setView('dashboard')} />
  if (view === 'full-mock') return <FullMockTestPage onBack={() => setView('dashboard')} />
  if (view === 'admin') return <AdminDashboard onBack={() => setView('dashboard')} onPage={navigate} />

  return (
    <main className="min-h-screen bg-[#f6faf9] text-[#111b2d]">
      <Header activeView={view === 'dashboard' ? 'dashboard' : 'home'} onHome={() => setView('home')} onDashboard={() => setView('dashboard')} onPage={navigate} />
      {view === 'login' ? (
        <LoginPage onHome={() => setView('home')} onDashboard={() => setView('dashboard')} onAdmin={() => setView('admin')} />
      ) : view === 'pricing' ? (
        <PricingPage onHome={() => setView('home')} />
      ) : view === 'dashboard' ? (
        <Dashboard onMock={() => setView('mock')} onHome={() => setView('home')} onPage={setView as (page: PageView) => void} />
      ) : view !== 'home' && view !== 'mock' ? (
        <InfoPage page={view as PageView} onHome={() => setView('home')} onMock={() => setView('mock')} />
      ) : (
        <Landing onDashboard={() => setView('dashboard')} onMock={() => setView('mock')} />
      )}
    </main>
  )
}

function MockTest({ onBack }: { onBack: () => void }) {
  const [current, setCurrent] = useState(64)
  const [selected, setSelected] = useState('Interior mirror')
  const [submitted, setSubmitted] = useState(false)
  const options = ['Nr 9', 'Interior mirror', 'Nr 11']

  return (
    <main className="min-h-screen bg-[#f6faf9] text-[#142238]">
      <div className="border-b border-[#dbe5e4] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-5 py-4">
          <div className="flex items-center gap-3 text-xl font-extrabold">
            <ShieldCheck className="size-9 text-[#0b7e7a]" />
            Code 2 Mock Test
          </div>
          <div className="ml-auto flex items-center gap-3 font-bold">
            <Clock3 className="text-[#168e8a]" />
            52:45 <span>{current} / 64</span>
            <div className="hidden h-2 w-80 rounded-full bg-[#20a49d] sm:block" />
          </div>
          <button onClick={onBack} className="hidden rounded-lg border border-[#8eb7b3] px-4 py-2.5 font-semibold text-[#176d6b] sm:block">
            <ArrowLeft className="mr-2 inline size-4" />
            Back to overview
          </button>
          <button onClick={() => setSubmitted(true)} className="rounded-lg bg-[#cf2638] px-4 py-2.5 font-semibold text-white">
            Submit
          </button>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-5 p-5 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-[#dfe7e6] bg-white p-3">
          <h2 className="font-extrabold">Questions (64)</h2>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {questions.map((question) => (
              <button key={question} onClick={() => setCurrent(question)} className={`rounded-md border px-1 py-1 text-xs font-bold ${question === current ? 'border-[#e5bc45] bg-[#fff8da]' : question < current ? 'border-[#bce3df] bg-[#e6f5f3] text-[#106c69]' : 'border-[#dbe8e6] bg-white text-[#116c69]'}`}>
                Q{question}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-[#f3faf9] p-3 text-xs leading-5">
            <CircleHelp className="mr-2 inline size-5 text-[#1fa39d]" />
            <b>Tip:</b> You can jump between questions anytime.
          </div>
        </aside>
        <section className="rounded-xl border border-[#dfe7e6] bg-white p-7">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#e6f5f3] px-3 py-1 text-xs font-bold uppercase text-[#168f82]">Question {current}</span>
            <span className="text-xs font-bold uppercase text-[#168f82]">Vehicle Controls</span>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold">Which numbered foot control slows or stops the vehicle?</h2>
          <div className="mt-8 space-y-3">
            {options.map((option) => (
              <label key={option} className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 ${selected === option ? 'border-[#168f82] bg-[#e6f5f3]' : 'border-[#d8e2e0] bg-white'}`}>
                <input type="radio" checked={selected === option} onChange={() => setSelected(option)} className="size-5 accent-[#168f82]" />
                <span className="font-semibold">{option}</span>
              </label>
            ))}
          </div>
          {submitted && <div className="mt-8 rounded-lg bg-[#e4f5e9] p-4 text-center font-bold text-[#21855b]">✓ Mock test submitted! Your score: 52/64</div>}
        </section>
      </div>
    </main>
  )
}
