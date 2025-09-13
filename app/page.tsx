"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function HomePage() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [showTalentModal, setShowTalentModal] = useState(false)

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      const res = await fetch("/api/waitlist", { method: "POST", body: formData })
      if (!res.ok) throw new Error("Request failed")
      setShowWaitlistModal(false)
      alert("Thank you for joining the waitlist!")
      form.reset()
    } catch (err) {
      alert("Sorry, something went wrong. Please try again.")
    }
  }

  const handleTalentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      const res = await fetch("/api/talent", { method: "POST", body: formData })
      if (!res.ok) throw new Error("Request failed")
      setShowTalentModal(false)
      alert("Thank you for joining the talent waitlist!")
      form.reset()
    } catch (err) {
      alert("Sorry, something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-coral-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src="/logo.png" alt="Watermelon Dating Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Watermelon Dating</h1>
            <div className="h-0.5 bg-gradient-to-r from-red-500 via-pink-400 to-coral-400 rounded-full"></div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-gray-600 hover:text-gray-800 font-medium relative">
            Home
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-pink-400 rounded-full"></div>
          </a>
          <a href="#vows" className="text-gray-600 hover:text-gray-800 font-medium">
            Our Vows
          </a>
          <a href="#why-we-exist" className="text-gray-600 hover:text-gray-800 font-medium">
            Our Story
          </a>
          <a href="#join-us" className="text-gray-600 hover:text-gray-800 font-medium">
            Join Us
          </a>
          <a href="#careers" className="text-gray-600 hover:text-gray-800 font-medium">
            Careers
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowWaitlistModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow-lg transition-colors"
          >
            Join the Waitlist
          </button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowTalentModal(true)}
          >
            Join Talent Waitlist
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div id="hero" className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">Not just another</h2>
              <h3 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">dating app</h3>
              <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-500 to-coral-500 bg-clip-text text-transparent leading-tight">
                A movement
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 text-lg max-w-md">
                Where love meets purpose and what's broken is healed. Connect through shared values for Palestinian
                liberation while supporting orphans with every match.
              </p>
              {/* Updated orphan funding text with healing emoji and expanded message */}
              <p className="text-sm text-gray-500 max-w-md">
                ❤️‍🩹 Every connection funds safety, healing, and a brighter future for Palestinian orphans.
              </p>
            </div>

            <button
              onClick={() => setShowWaitlistModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg transition-colors"
            >
              Join the Waitlist
            </button>
          </div>

          {/* Right Content - Phone Mockups */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Red Phone */}
              <div className="bg-gradient-to-br from-red-400 to-pink-400 rounded-3xl p-6 shadow-2xl transform rotate-3 max-w-sm mx-auto">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <img
                    src="/dating-profile-portrait.jpg"
                    alt="Dating profile portrait"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center bg-red-500">
                    <h4 className="text-xl font-semibold text-white">Love with Purpose</h4>
                  </div>
                </div>
              </div>

              {/* Coral Phone */}
              <div className="absolute -right-8 top-16 bg-gradient-to-br from-coral-500 to-red-500 rounded-3xl p-6 shadow-xl transform -rotate-6 w-48 z-20">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <img
                    src="/smiling-person-with-rainbow-flag.jpg"
                    alt="Person with rainbow"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3 text-center bg-red-600 text-white font-semibold text-sm">Meet People</div>
                </div>
              </div>

              {/* Pink Phone */}
              <div className="absolute -right-4 -bottom-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-3xl p-6 shadow-xl transform rotate-12 w-52 z-30">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <img
                    src="/demonstrator.jpg"
                    alt="Activists with protest signs"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3 text-center bg-pink-500">
                    <h4 className="text-sm font-semibold italic text-white">Made with Love</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Arrow */}
            <div className="absolute -left-16 bottom-20 z-40">
              <svg width="120" height="60" viewBox="0 0 120 60" className="text-gray-800">
                <path
                  d="M10 30 Q 40 10, 80 30 Q 90 35, 100 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M95 25 L100 30 L95 35"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">✊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">A Movement, Not Just an App</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The first dating app built around justice, healing, and love. Where finding your partner also supports
              Palestinian orphans.
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">❤️‍🩹</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">100% for the Cause</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every dollar of profit goes directly to Palestinian orphans. Love here funds safety, healing, and
              long-term futures.
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Built Different</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Designed to fix what's broken in dating apps. No ghosting, no paywalls, no bots — only real people, real
              love, real purpose.
            </p>
          </Card>
        </div>

        {/* The Watermelon Dating Vows - Rich Content Section */}
        <section id="vows" className="py-24">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6">
              <img src="/logo.png" alt="Watermelon Dating Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">The Watermelon Dating Vows</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We don't just say we're different — we live it. These vows define who we are, what we stand for, and what
              we will never compromise.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                num: "1",
                title: "Truth Is Attractive — Lies Are Not Welcome",
                desc: "Too many dating apps are filled with catfish, fake jobs, and staged realities. We say enough. Who you are on the app is who you are in real life. No illusions. No games. Just truth — because authenticity is the only filter that matters.",
              },
              {
                num: "2",
                title: "We're Not Playing Ghostbusters — Stop Ghosting",
                desc: "Dating apps made people disposable. Matches vanish, conversations die, and feelings get discarded like yesterday's news. But every profile here belongs to a real human being with dreams, hopes, and emotions. Ghosting isn't clever — it's cruel.",
              },
              {
                num: "3",
                title: "This Is Not TikTok — Every Swipe Is a Human Being",
                desc: "We are not entertainment. We are not infinite scroll. We are not shallow validation games. Every swipe you make is a living, breathing human being who could change your life. Slow down. Be present.",
              },
              {
                num: "4",
                title: "Love Can't Exist Without Safety",
                desc: "Safety isn't just a feature — it's the foundation. Too many apps turn a blind eye to harassment, unsolicited pictures, and toxic behavior. We don't. Boundaries are sacred. Harassment will never be tolerated.",
              },
              {
                num: "5",
                title: "Real Accounts",
                desc: "You're tired of bots. You're tired of scams. You're tired of catfish hiding behind fake pictures and fake lives. So are we. On Watermelon Dating, every profile is verified. Every face is a real person.",
              },
              {
                num: "6",
                title: "Shared Values Over Shallow Matches",
                desc: "Attraction matters. Chemistry matters. But what happens when beauty fades, when the spark shifts, when life tests your bond? Shared values are what last. We connect people whose hearts beat for Palestinian liberation.",
              },
              {
                num: "7",
                title: "Love Without a Price Tag",
                desc: "Other apps have turned love into a marketplace. Pay to be seen. Pay to get boosted. But real love doesn't belong behind a paywall. At Watermelon Dating, visibility is fair. Everyone deserves the same chance to be seen.",
              },
              {
                num: "8",
                title: "Quality Over Quantity",
                desc: "Swiping endlessly doesn't make people closer. It makes them empty. Dating apps encourage chasing numbers, but numbers don't make love. Fewer swipes. Deeper chats. More meaningful dates.",
              },
              {
                num: "9",
                title: "The Best Part: Every Match Supports Palestinian Orphans",
                desc: "What makes Watermelon Dating different isn't just the love you'll find — it's the love you'll give. Every match supports Palestinian orphans. Your story of love directly funds stories of survival, healing, and hope.",
              },
              {
                num: "10",
                title: "Hope Lives in Every Love Story",
                desc: "In the end, this app isn't just about dating. It's about rebuilding lives. It's about creating hope in a world that desperately needs it. Together, we are proving that love isn't selfish — it's powerful.",
              },
            ].map((vow, i) => (
              <Card
                key={i}
                className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {vow.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">{vow.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{vow.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Watermelon Dating Exists - Rich Narrative Section */}
        <section id="why-we-exist" className="py-24 bg-gradient-to-r from-red-5 to-pink-5 rounded-3xl">
          <div className="max-w-4xl mx-auto px-12 text-center space-y-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto">
              <img src="/logo.png" alt="Watermelon Dating Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">Why Watermelon Dating Exists</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-left">
              <p>
                We asked ourselves: what if dating could be more than swipes, more than hookups, more than shallow
                exchanges? What if it could mean something? What if it could heal the loneliness of individuals{" "}
                <em>and</em> the suffering of a people?
              </p>
              <p>
                Watermelon Dating is the answer to that question. We were born out of frustration with legacy dating
                apps that have lost their way. They prioritize profits over people, quick dopamine over deep love, and
                corporate shareholders over community.
              </p>
              <p className="font-semibold text-red-600">
                We're here to change that. To fix what's broken. To create a space where authenticity wins. To honor
                love as sacred. To use technology not for exploitation, but for liberation.
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories - REPLACED WITH JOIN US FROM THE START */}
        <section id="join-us" className="py-24">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6">
              <img src="/logo.png" alt="Watermelon Dating Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Join Us From the Start</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're at the beginning of something bigger than all of us. Early members won't just be users — they'll be
              co-creators of a community that redefines modern dating.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-br from-red-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-400 rounded-2xl overflow-hidden mx-auto text-2xl">
                  🌱
                </div>
                <h3 className="text-xl font-bold text-gray-800">Co-Creators, Not Users</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your feedback, your stories, and your voice will shape this platform into what the world needs most.
                  You're not just joining an app — you're building the future of conscious dating.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-pink-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl overflow-hidden mx-auto text-2xl">
                  💝
                </div>
                <h3 className="text-xl font-bold text-gray-800">Love with Meaning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every connection you make here carries purpose beyond yourself. You're not just finding love — you're
                  participating in a movement that proves technology can have a conscience.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-red-50 to-coral-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-coral-500 rounded-2xl overflow-hidden mx-auto text-2xl">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-gray-800">Pioneer Status</h3>
                <p className="text-gray-600 leading-relaxed">
                  As an early member, you'll help us redefine what dating apps can be. Your experience will guide our
                  development, ensuring we stay true to our mission of authentic connection and social impact.
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Be Part of Something Revolutionary?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join the waitlist and become a founding member of a dating platform that puts humanity first, justice at
                the center, and love as the ultimate force for change.
              </p>
              <button
                onClick={() => setShowWaitlistModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-colors text-lg"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section id="careers" className="py-24">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6">
              <img src="/logo.png" alt="Watermelon Dating Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Careers at Watermelon Dating</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Build the first values-driven dating app — where love meets purpose and 100% of profits support
              Palestinian orphans.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-12 bg-gradient-to-br from-red-50 to-pink-50 border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Work With Us?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We practice what we preach. If we treat our employees this well, imagine how we'll treat our
                      users.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">⏰</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">4-Day Workweek</h4>
                        <p className="text-gray-600 text-sm">
                          32–36 hours per week, because life matters more than endless hustle.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🏖️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Unlimited PTO</h4>
                        <p className="text-gray-600 text-sm">
                          With minimums encouraged — we want you to actually take time off.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">💰</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Top-of-Market Pay</h4>
                        <p className="text-gray-600 text-sm">Competitive compensation that reflects your true value.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🌍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Fully Remote & Flexible</h4>
                        <p className="text-gray-600 text-sm">Work from anywhere, anytime that works for you.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Culture</h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-gray-700 font-medium">Ship fast, stay humane</p>
                        <p className="text-gray-600 text-sm">
                          Move quickly without sacrificing our humanity or values.
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-gray-700 font-medium">Zero burnout culture</p>
                        <p className="text-gray-600 text-sm">
                          Sustainable pace, sustainable impact, sustainable careers.
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-gray-700 font-medium">Craft, character, conviction</p>
                        <p className="text-gray-600 text-sm">
                          We hire for technical skill, personal integrity, and shared values.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowTalentModal(true)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-colors"
                    >
                      Join the Talent Waitlist
                    </button>
                    <p className="text-gray-500 text-sm mt-3">
                      Join a team that's changing the world, one connection at a time.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-red-600 rounded-3xl text-white text-center">
          <div className="max-w-4xl mx-auto px-8 space-y-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto">
              <img src="/logo.png" alt="Watermelon Dating Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Join the Movement</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed text-white">
              Watermelon Dating isn't just an app. It's a revolution in how we love, how we connect, and how we give
              back. When you sign up, you're not just creating a profile — you're making a stand for authenticity over
              illusion, respect over ghosting, safety over toxicity, and love that gives back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowWaitlistModal(true)}
                className="bg-white text-red-600 hover:bg-gray-100 font-bold px-10 py-4 rounded-full shadow-lg transition-colors text-lg"
              >
                Join the Waitlist
              </button>
              <button
                onClick={() => setShowWaitlistModal(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-colors text-lg"
              >
                Get Early Access
              </button>
            </div>
            <p className="text-sm opacity-75 text-white">
              Free to join • 100% of profits donated • Start making a difference today
            </p>
          </div>
        </section>
      </main>

      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Join the Waitlist</h3>
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Be among the first to experience love with purpose. Join our waitlist and help us build the future of
              conscious dating.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowWaitlistModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTalentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Join Our Team</h3>
              <button onClick={() => setShowTalentModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Help us build the first values-driven dating app. Join our talent waitlist and be part of a team that's
              changing the world.
            </p>

            <form onSubmit={handleTalentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
                <input
                  type="file"
                  required
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTalentModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold"
                >
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
