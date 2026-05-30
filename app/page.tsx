'use client'

import { useState, useRef } from 'react'

interface AmenityItem {
  id: string
  emoji: string
  name: string
  cost: number
  description: string
}

interface Tier {
  number: string
  label: string
  sublabel: string
  items: AmenityItem[]
  note?: string
}

const BUDGET = 15

const TIERS: Tier[] = [
  {
    number: 'I',
    label: 'SMALL COMFORTS',
    sublabel: '1 – 3 pts',
    items: [
      { id: 'sleepingbag', emoji: '🛌', name: 'Sleeping Bag',               cost: 1, description: 'Better than the bare floor'                                        },
      { id: 'bathrobe',    emoji: '🩱', name: 'A Bathrobe',               cost: 1, description: 'Stepping out of a shower into a good robe is a daily luxury.'        },
      { id: 'calendar',    emoji: '📅', name: 'A Calendar',               cost: 1, description: 'Cross off each day. Some find it motivating.'                        },
      { id: 'candles',     emoji: '🕯️', name: 'Scented Candles',          cost: 1, description: 'Restocked monthly. A small but meaningful shift in atmosphere.'      },
      { id: 'cards',       emoji: '🃏', name: 'Playing Cards',            cost: 1, description: '52 cards. Infinite ways to waste an afternoon.'                      },
      { id: 'clock',       emoji: '🕰️', name: 'A Clock',                  cost: 1, description: 'Watch the seconds pass. All 31,536,000 of them.'                   },
      { id: 'clothes',     emoji: '👕', name: 'A Change of Clothes',      cost: 1, description: 'Seven outfits, rotated weekly. Basic dignity.'                       },
      { id: 'journal',     emoji: '📓', name: 'A Journal',                cost: 1, description: 'Write it all down. Someone should know what happened in here.'       },
      { id: 'juggling',    emoji: '🤹', name: 'Juggling Balls',           cost: 1, description: "You'll have something to show for the year."                         },
      { id: 'lavalamp',    emoji: '🫧', name: 'A Lava Lamp',              cost: 1, description: 'Slow, hypnotic movement. It will seem profound by week three.'       },
      { id: 'mirror',      emoji: '🪞', name: 'A Mirror',                 cost: 1, description: 'See your own face. For better or worse.'                            },
      { id: 'puzzles',     emoji: '🧩', name: 'Puzzle Books',             cost: 1, description: 'Crosswords, sudoku, logic puzzles — hundreds of them'                },
      { id: 'rubik',       emoji: '🎲', name: "A Rubik's Cube",           cost: 1, description: 'Solve it. Reset it. You have time.'                                 },
      { id: 'desk',        emoji: '🪑', name: 'A Desk & Chair',           cost: 2, description: 'Somewhere to sit that isn\'t the floor or the bed.'                 },
      { id: 'plant',       emoji: '🪴', name: 'A Plant',                  cost: 2, description: 'Something living to look after'                                    },
      { id: 'spices',      emoji: '🧂', name: 'Spices & Condiments',      cost: 2, description: 'Makes the porridge approximately 40% less depressing.'               },
      { id: 'tea',         emoji: '☕', name: 'Tea & Coffee (Daily)',      cost: 2, description: 'The porridge is non-negotiable. This isn\'t.'                       },
      { id: 'toiletries',  emoji: '🪥', name: 'Nice Toiletries',          cost: 2, description: 'Proper shampoo, soap, moisturiser, shaving gear, and scissors.'    },
      { id: 'boardgames',  emoji: '♟️', name: 'Chess & Board Games',       cost: 3, description: 'Chess plus solo-playable variants of 20 classic games.'            },
      { id: 'books',       emoji: '📚', name: '100 Classic Books',        cost: 3, description: 'A curated library of the greatest books ever written'               },
      { id: 'hammock',     emoji: '🌴', name: 'A Hammock',                cost: 3, description: 'Suspend yourself between the walls. The ceiling becomes the sky.'   },
      { id: 'headphones',  emoji: '🎧', name: 'Noise-Cancelling Headphones', cost: 3, description: "You're already in a soundproof room. A personal choice."       },
      { id: 'mattress',    emoji: '🛏️', name: 'Comfy Mattress',           cost: 3, description: 'A decent mattress to actually sleep on'                           },
      { id: 'sketchbook',  emoji: '🎨', name: 'Sketchbook & Art Supplies', cost: 3, description: 'Draw, paint, keep your hands busy'                               },
      { id: 'window',      emoji: '🪟', name: 'A Window',                 cost: 3, description: 'A view of the outside world'                                      },
      { id: 'shower',      emoji: '🚿', name: 'Hot Shower',               cost: 3, description: 'Daily hot shower instead of a basin'                              },
      { id: 'toilet',      emoji: '🚽', name: 'Luxury Japanese Toilet',   cost: 2, description: 'Heated seat, bidet, dryer — a small but meaningful dignity'       },
    ],
  },
  {
    number: 'II',
    label: 'DAILY NEEDS',
    sublabel: '4 – 7 pts',
    items: [
      { id: 'aquarium',   emoji: '🐠', name: 'A Small Aquarium',              cost: 4, description: "Fish don't talk back. After six months, you'll appreciate that."  },
      { id: 'punchbag',   emoji: '🥊', name: 'A Punching Bag',               cost: 4, description: 'Regulation size. The padded walls are not designed for this.'      },
      { id: 'radio',      emoji: '📻', name: 'A Radio',                       cost: 4, description: 'Live broadcasts, whatever happens to be on.'                      },
      { id: 'language',   emoji: '🗣️', name: 'Language Learning Course',      cost: 4, description: 'Come out fluent in something new.'                               },
      { id: 'alcohol',    emoji: '🍷', name: 'Alcohol (Daily Allowance)',      cost: 5, description: 'Beer, wine, or spirits. A reasonable amount, by their definition.' },
      { id: 'dvd',        emoji: '📀', name: 'DVD Player & 100 Movies',       cost: 5, description: '100 films across various genres on a portable player.'            },
      { id: 'guitar',     emoji: '🎸', name: 'A Guitar',                      cost: 5, description: 'No lessons included. Figure it out.'                              },
      { id: 'keyboard',   emoji: '🎹', name: 'A Keyboard & Songbook',         cost: 5, description: 'Easier to learn alone than the guitar. Debatable.'                },
      { id: 'music',      emoji: '🎵', name: 'Record Player & 100 CDs',       cost: 5, description: '100 albums across various genres — selections are not up to you.' },
      { id: 'food',       emoji: '🍔', name: 'Comfort Meal (Daily)',           cost: 5, description: 'One meal of your choice, every day.'                             },
      { id: 'telescope',  emoji: '🔭', name: 'A Telescope',                   cost: 5, description: 'Pairs well with a window. Sold separately.'                      },
      { id: 'laptop',     emoji: '💻', name: 'A Laptop (No Internet)',         cost: 6, description: 'Write, create, organise. Offline only. They checked.'            },
      { id: 'console',    emoji: '🎮', name: 'Console & One Game',            cost: 7, description: 'One console. One game. Choose carefully.'                         },
      { id: 'phone',      emoji: '📞', name: 'Phone Calls',                   cost: 7, description: '30 min/day to anyone on the outside.'                            },
      { id: 'luxurybed',  emoji: '🛋️', name: 'Luxury Bed (Full Amenities)',   cost: 7, description: 'Premium mattress, weighted blanket, memory foam pillows — the works.' },
    ],
  },
  {
    number: 'III',
    label: 'PREMIUM PRIVILEGES',
    sublabel: '8 – 15 pts',
    note: '* A discreet flap is built into the wall. Your pet handles all outdoor needs independently — no walks, no mess, no exceptions.',
    items: [
      { id: 'exercise',    emoji: '🏋️', name: 'Exercise Equipment',          cost: 8,  description: 'A full set to keep your body from falling apart.'                          },
      { id: 'crafts',      emoji: '✂️',  name: 'Unlimited Craft Supplies',    cost: 8,  description: 'Paper, paint, thread, clay — enough to cover every surface if it comes to that.' },
      { id: 'sports',      emoji: '⚽',  name: 'Live Sports Streaming',       cost: 8,  description: 'Every match, every league. Time zones will lose all meaning.'             },
      { id: 'therapist',   emoji: '🧠',  name: 'Therapist (Weekly Session)',  cost: 8,  description: 'One hour a week with a professional who knew this was coming.'             },
      { id: 'trainer',     emoji: '🏃',  name: 'Personal Trainer (Weekly)',   cost: 8,  description: 'Video sessions. Keeps you structured when structure disappears.'          },
      { id: 'cinema',      emoji: '🎬',  name: 'Home Cinema Setup',           cost: 9,  description: 'Projector, surround sound, full screen. Comes with 100 various films.' },
      { id: 'cat',         emoji: '🐈',  name: 'A Cat',                       cost: 10, description: 'Quiet, self-sufficient, and oddly comforting.'                            },
      { id: 'drugs',       emoji: '💊',  name: 'Recreational Drugs',          cost: 10, description: 'A varied monthly supply. The forms you signed covered this.'             },
      { id: 'dog',         emoji: '🐕',  name: 'A Dog',                       cost: 10, description: 'Loyal company through every one of those 365 days.'                      },
      { id: 'kitchen',     emoji: '🍳',  name: 'A Full Kitchen',              cost: 10, description: 'Raw ingredients restocked weekly. Cook whatever you want.'               },
      { id: 'courtyard',   emoji: '🌤️',  name: 'Private Outdoor Courtyard',  cost: 11, description: 'Walled, open sky. Whenever you want, not on a schedule.'                 },
      { id: 'jacuzzi',     emoji: '🫧',  name: 'A Jacuzzi',                   cost: 10, description: 'Plumbed in, jets included. Takes up a third of the room.'             },
      { id: 'companion',   emoji: '🧑',  name: 'Human Companion',             cost: 13, description: 'Someone else shares your room.'                                           },
      { id: 'earlyrelease',emoji: '🗓️',  name: 'Early Release (3 Months)',    cost: 15, description: 'Serve 9 months instead of 12. No questions asked.'                      },
    ],
  },
]

const ALL_ITEMS = TIERS.flatMap(t => t.items)
const ITEM_MAP = Object.fromEntries(ALL_ITEMS.map(i => [i.id, i]))

const ITEM_PROMPTS: Record<string, string> = {
  console:    'Which game?',
  language:   'Which language?',
  food:       'What meal?',
  cat:        "What's their name?",
  dog:        "What's their name?",
  companion:  'Who?',
  drugs:      'Any preferences?',
  herbgarden: 'Which herbs?',
}

function pointColor(remaining: number) {
  if (remaining < 0)  return '#f87171'
  if (remaining === 0) return '#f59e0b'
  if (remaining > 9)  return '#4ade80'
  if (remaining > 4)  return '#fbbf24'
  return '#fb923c'
}

export default function Home() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [itemInputs, setItemInputs] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [errorInputs, setErrorInputs] = useState<Set<string>>(new Set())
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const spent = Array.from(selected).reduce((sum, id) => sum + (ITEM_MAP[id]?.cost ?? 0), 0)
  const remaining = BUDGET - spent
  const color = pointColor(remaining)

  const toggle = (item: AmenityItem) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(item.id)) {
        next.delete(item.id)
      } else {
        next.add(item.id)
      }
      return next
    })
  }

  const formatForDiscord = () => {
    const lines: string[] = []
    lines.push('🔒 **ONE YEAR IN ISOLATION** — My Picks')
    lines.push('')
    TIERS.forEach(tier => {
      const picks = tier.items.filter(i => selected.has(i.id))
      if (picks.length === 0) return
      lines.push(`**— ${tier.label} —**`)
      picks.forEach(item => {
        let line = `${item.emoji}  ${item.name} · ${item.cost}pt`
        const input = itemInputs[item.id]?.trim()
        if (input) line += `  *(${input})*`
        lines.push(line)
      })
      lines.push('')
    })
    lines.push(`**${BUDGET}/${BUDGET} points spent · ${selected.size} item${selected.size !== 1 ? 's' : ''}**`)
    return lines.join('\n')
  }

  const handleShare = async () => {
    const empty = ALL_ITEMS.filter(
      i => selected.has(i.id) && ITEM_PROMPTS[i.id] && !itemInputs[i.id]?.trim()
    )
    if (empty.length > 0) {
      const firstId = empty[0].id
      setErrorInputs(new Set(empty.map(i => i.id)))
      inputRefs.current[firstId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      inputRefs.current[firstId]?.focus()
      setTimeout(() => setErrorInputs(new Set()), 1500)
      return
    }
    await navigator.clipboard.writeText(formatForDiscord())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#d4cfc7]" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#181818]">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="hidden sm:block text-[10px] tracking-[0.2em] text-[#666] uppercase select-none">
            ISOLATION PROTOCOL · FORM A7
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest text-[#666]">BUDGET</span>
            <span
              className="text-xl font-bold tabular-nums transition-colors duration-500"
              style={{ color }}
            >
              {remaining}
            </span>
            <span className="text-[10px] tracking-widest text-[#666]">/ {BUDGET} PTS</span>
            {remaining < 0 && (
              <span className="text-[9px] tracking-widest uppercase transition-colors duration-300" style={{ color: '#f87171' }}>
                OVER BUDGET
              </span>
            )}
          </div>
        </div>
        <div className="h-[2px] bg-[#111]">
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: `${Math.max(0, (remaining / BUDGET) * 100)}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {/* ── Hero / Scenario ── */}
      <div
        className="relative border-b border-[#141414] overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(20,0,0,0.6) 0%, transparent 100%),
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.012) 39px, rgba(255,255,255,0.012) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.008) 39px, rgba(255,255,255,0.008) 40px)
          `,
        }}
      >
        <div className="max-w-5xl mx-auto px-5 pt-16 pb-14">

          {/* Divider label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-[#222]" />
            <span className="text-[9px] tracking-[0.3em] text-[#555] uppercase select-none">
              SENTENCED · YEAR ONE · COMMENCING IMMEDIATELY
            </span>
            <div className="h-px flex-1 bg-[#222]" />
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tight leading-[0.9] mb-8 text-[#e8e2d9] uppercase">
            One Full Year<br />
            <span style={{ color: '#8b1a1a' }}>in Isolation</span>
          </h1>

          {/* Scenario body */}
          <div className="max-w-xl space-y-3 text-[13px] leading-[1.8] text-[#888] mb-10">
            <p>
              You have been assigned to a fully padded, soundproofed room.
              No windows. No natural light. No outside contact. The walls, floor,
              and ceiling are covered in grey acoustic foam. You will remain here
              for{' '}
              <strong className="text-[#bbb]">365 consecutive days</strong>.
            </p>
            <p>
              Basic sustenance is provided: three daily portions of nutritionally
              complete porridge and water. You will not be deficient in anything.
              You will not enjoy it.
            </p>
            <p>
              A basic toilet is provided. Showering is done under a single head
              delivering hand-warm water. You are issued one grey jumpsuit,
              exchanged every three days. Temperature is fixed at 20°C.
              There is nothing else.
            </p>
            <p className="text-[#777]">
              You have been allocated{' '}
              <strong className="text-[#e8e2d9]">15 points</strong> to spend on
              amenities. Choose wisely. This selection is final.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 text-[10px] tracking-widest">
            {[
              { label: 'DURATION',  value: '365 DAYS' },
              { label: 'BUDGET',    value: `${remaining} / ${BUDGET} PTS`, colored: true },
              { label: 'SELECTED',  value: `${selected.size} ITEMS` },
            ].map(({ label, value, colored }) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="text-[#555]">{label}</div>
                <div style={colored ? { color } : { color: '#d4cfc7' }} className="transition-colors duration-500">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tiers ── */}
      <div className="max-w-5xl mx-auto px-5 py-14 space-y-16">
        {TIERS.map(tier => (
          <section key={tier.number}>

            {/* Tier label */}
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[9px] tracking-[0.25em] text-[#555] uppercase font-bold shrink-0">
                TIER {tier.number}
              </span>
              <div className="h-px flex-1 bg-[#222]" />
              <span className="text-[10px] tracking-[0.2em] text-[#d4cfc7] uppercase shrink-0">{tier.label}</span>
              <div className="hidden sm:block h-px w-6 bg-[#222]" />
              <span className="hidden sm:block text-[9px] tracking-widest text-[#666] shrink-0">{tier.sublabel}</span>
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
              {tier.items.map(item => {
                const isSelected = selected.has(item.id)

                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item)}
                    className="text-left rounded-[3px] border overflow-hidden group transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: isSelected ? '#f59e0b' : '#161616',
                      backgroundColor: isSelected ? '#120f00' : '#0f0f0f',
                      boxShadow: isSelected ? '0 0 24px rgba(245,158,11,0.12)' : 'none',
                    }}
                  >
                    {/* Image area */}
                    <div
                      className="flex items-center justify-center py-7 transition-colors duration-300 relative"
                      style={{
                        backgroundColor: isSelected ? '#1a1300' : '#111111',
                        borderBottom: `1px solid ${isSelected ? '#2a1e00' : '#161616'}`,
                      }}
                    >
                      <span className="text-[2.75rem] leading-none select-none">{item.emoji}</span>

                      {/* Checkmark badge */}
                      {isSelected && (
                        <div
                          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#f59e0b' }}
                        >
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.2 5.5L8 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Text area */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className="text-[13px] font-bold tracking-wide leading-tight transition-colors duration-300"
                          style={{ color: isSelected ? '#f59e0b' : '#c8c2bb' }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-[2px] shrink-0 transition-colors duration-300"
                          style={{
                            backgroundColor: isSelected ? '#f59e0b' : '#1e1e1e',
                            color: isSelected ? '#000' : '#777',
                          }}
                        >
                          {item.cost}PT
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777] italic leading-relaxed">
                        {item.description}
                      </p>
                      {isSelected && ITEM_PROMPTS[item.id] && (
                        <input
                          ref={el => { inputRefs.current[item.id] = el }}
                          key={errorInputs.has(item.id) ? `${item.id}-error` : item.id}
                          type="text"
                          value={itemInputs[item.id] ?? ''}
                          onChange={e => setItemInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                          onClick={e => e.stopPropagation()}
                          placeholder={ITEM_PROMPTS[item.id]}
                          className={`mt-3 w-full bg-transparent border-b text-[12px] text-[#d4cfc7] placeholder-[#444] outline-none pb-1 ${errorInputs.has(item.id) ? 'input-error' : 'transition-colors duration-200'}`}
                          style={{ borderColor: errorInputs.has(item.id) ? '#ef4444' : itemInputs[item.id] ? '#f59e0b' : '#333' }}
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {tier.note && (
              <p className="text-[11px] text-[#555] italic leading-relaxed">
                {tier.note}
              </p>
            )}
          </section>
        ))}
      </div>

      {/* ── Selection summary footer ── */}
      {selected.size > 0 && (
        <div className="border-t border-[#141414] bg-[#0b0b0b]">
          <div className="max-w-5xl mx-auto px-5 py-8">
            <div className="text-[9px] tracking-[0.25em] text-[#666] uppercase mb-4">
              YOUR SELECTION
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {ALL_ITEMS.filter(i => selected.has(i.id)).map(i => (
                <div
                  key={i.id}
                  className="text-[10px] tracking-wider px-3 py-1 rounded-[2px]"
                  style={{
                    backgroundColor: '#140f00',
                    border: '1px solid rgba(245,158,11,0.25)',
                    color: '#f59e0b',
                  }}
                >
                  {i.emoji} {i.name} · {i.cost}pt
                </div>
              ))}
            </div>
            <div className="text-[9px] tracking-widest text-[#555] uppercase">
              {spent} of {BUDGET} points allocated ·{' '}
              {remaining > 0 ? `${remaining} unspent` : 'budget depleted'}
            </div>
          </div>
        </div>
      )}

      {/* ── Spacer ── */}
      <div className="h-32" />

      {/* ── Share bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out"
        style={{ transform: remaining === 0 ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <div className="border-t border-[#f59e0b]/30 bg-[#080808]/95 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-[#666] tracking-wide">
              15 / 15 points spent — your choices are locked in.
            </p>
            <button
              onClick={handleShare}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] text-[12px] font-bold tracking-widest uppercase transition-all duration-200"
              style={{
                backgroundColor: copied ? '#166534' : '#f59e0b',
                color: copied ? '#bbf7d0' : '#000',
              }}
            >
              {copied ? (
                <>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M4.5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5M8 1h4m0 0v4m0-4L5.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copy for Discord
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
