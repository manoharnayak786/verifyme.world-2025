{
  "brand": {
    "name": "VerifyMe.world",
    "attributes": ["professional", "secure", "global", "trustworthy", "modern", "clean"],
    "tone": "Professional, secure, globally accessible. Web3/security vibe without clichés."
  },
  "tech_stack": {
    "frontend": "Next.js 15 (target), React 18, Tailwind CSS, shadcn/ui",
    "notes": [
      "Default dark theme with high contrast",
      "Use shadcn/ui as primary components",
      "Examples below are .js (no TypeScript) per critical rules"
    ]
  },
  "typography": {
    "fonts": {
      "heading": {
        "family": "Space Grotesk",
        "fallback": "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        "load": "<link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap\" rel=\"stylesheet\">"
      },
      "body": {
        "family": "Inter",
        "fallback": "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        "load": "<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\" rel=\"stylesheet\">"
      }
    },
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl",
      "h2": "text-base md:text-lg",
      "body": "text-base md:text-sm",
      "small": "text-sm",
      "mono": "font-mono tracking-tight tabular-nums"
    },
    "usage": [
      "Apply Space Grotesk for page titles, section headers, metrics",
      "Use Inter for body, labels, tables",
      "Letter-spacing: -0.02em on headings for geometric precision"
    ]
  },
  "color_system": {
    "tokens": {
      "background": "#030712",
      "surface": "#0B1120",
      "surface-hover": "#111827",
      "primary": "#3B82F6",
      "primary-hover": "#2563EB",
      "primary-foreground": "#FFFFFF",
      "accent": "#22C55E",
      "warning": "#F97316",
      "destructive": "#EF4444",
      "text-main": "#F9FAFB",
      "text-muted": "#9CA3AF",
      "border": "#1F2937",
      "ring": "#60A5FA"
    },
    "gradient_policy": {
      "restriction": [
        "Never use dark/saturated purple-pink gradients",
        "Do not exceed 20% viewport coverage",
        "Do not place gradients behind text-heavy content",
        "No gradients on small UI (<100px)"
      ],
      "allowed_usage": [
        "Hero section background only (not content blocks)",
        "Large decorative section backgrounds",
        "Subtle accent overlays"
      ],
      "enforcement": "If gradient area exceeds 20% or harms readability, replace with solid tokens (background/surface).",
      "examples": [
        "bg-[conic-gradient(at_50%_10%,_rgba(59,130,246,0.18),_rgba(34,197,94,0.08),_rgba(3,7,18,0.6))]",
        "bg-gradient-to-b from-[#0B1120] via-[#0C1424] to-[#030712]"
      ]
    }
  },
  "radii_shadows_spacing": {
    "radius": {"sm": "0.3rem", "md": "0.5rem", "lg": "0.75rem", "xl": "1rem", "2xl": "1.5rem"},
    "shadows": {
      "xs": "0 1px 0 rgba(255,255,255,0.03)",
      "sm": "0 2px 8px rgba(0,0,0,0.35)",
      "md": "0 6px 20px rgba(0,0,0,0.35)",
      "glow-primary": "0 0 24px -6px rgba(59,130,246,0.45)",
      "glow-accent": "0 0 24px -6px rgba(34,197,94,0.4)"
    },
    "spacing": {
      "container": "px-4 md:px-6",
      "sectionY": "py-20 md:py-28",
      "gaps": "gap-6 md:gap-8"
    },
    "glass": {
      "panel": "bg-[rgba(11,17,32,0.7)] backdrop-blur-xl border border-white/5",
      "card": "bg-[rgba(31,41,55,0.4)] backdrop-blur-md border border-white/5 hover:border-primary/30"
    }
  },
  "grid_system": {
    "container": "mx-auto max-w-7xl",
    "landing_columns": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12",
    "dashboard": {
      "shell": "grid grid-cols-12 gap-6",
      "sidebar": "col-span-12 lg:col-span-3",
      "main": "col-span-12 lg:col-span-9"
    }
  },
  "components": {
    "Button": {
      "path": "/app/client/src/components/ui/button.tsx",
      "import_js": "import { Button } from '@/components/ui/button'",
      "variants": ["default", "outline", "secondary", "ghost", "destructive", "link"],
      "sizes": ["sm", "default", "lg", "icon"],
      "interaction": {
        "hover": "hover:bg-primary-hover",
        "focus": "focus-visible:ring-1 focus-visible:ring-[--ring]",
        "active": "data-[state=on]:scale-[0.99]"
      },
      "testing": "Add data-testid like data-testid=\"primary-cta-button\" on all primary CTAs"
    },
    "Input": {
      "path": "/app/client/src/components/ui/input.tsx",
      "import_js": "import { Input } from '@/components/ui/input'",
      "states": ["default", "focus", "disabled", "error"],
      "testing": "data-testid=\"search-input\" or data-testid=\"email-input\""
    },
    "Badge": {
      "path": "/app/client/src/components/ui/badge.tsx",
      "import_js": "import { Badge } from '@/components/ui/badge'",
      "variants": ["default", "secondary", "outline", "accent", "destructive"],
      "usage": "Use accent variant to denote Verified/On-chain states",
      "testing": "data-testid=\"status-badge\""
    },
    "Card": {
      "path": "/app/client/src/components/ui/card.tsx",
      "import_js": "import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'",
      "usage": "Wrap key blocks in glass style: 'rounded-2xl border border-border bg-surface/60 backdrop-blur-md'",
      "testing": "data-testid=\"panel-card\""
    },
    "Table": {
      "path": "/app/client/src/components/ui/table.tsx",
      "import_js": "import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'",
      "usage": "Compact dense data tables with subtle row hover 'hover:bg-white/5'",
      "testing": "data-testid=\"results-table\""
    },
    "Tooltip": {
      "path": "/app/client/src/components/ui/tooltip.tsx",
      "import_js": "import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'",
      "testing": "data-testid=\"tooltip-trigger\""
    },
    "Tabs": {
      "path": "/app/client/src/components/ui/tabs.tsx",
      "import_js": "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'",
      "testing": "data-testid=\"dashboard-tabs\""
    },
    "Dialog": {
      "path": "/app/client/src/components/ui/dialog.tsx",
      "import_js": "import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'",
      "testing": "data-testid=\"dialog\""
    },
    "DropdownMenu": {
      "path": "/app/client/src/components/ui/dropdown-menu.tsx",
      "import_js": "import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'",
      "testing": "data-testid=\"dropdown-trigger\""
    },
    "Charts": {
      "path": "/app/client/src/components/ui/chart.tsx",
      "import_js": "import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'",
      "theming": {
        "series": {
          "issued": "#3B82F6",
          "verified": "#22C55E",
          "rejected": "#EF4444"
        },
        "grid": "stroke-[rgba(255,255,255,0.06)]",
        "axes": "text-[rgba(255,255,255,0.6)]"
      },
      "testing": "data-testid=\"analytics-chart\""
    }
  },
  "layouts": {
    "landing_page": {
      "sections": [
        {
          "id": "hero",
          "container": "relative pt-32 md:pt-48 pb-20 md:pb-32",
          "background": "bg-gradient-to-b from-[rgba(59,130,246,0.12)] via-background to-background",
          "content": [
            "Centered stack with h1, supporting copy, dual CTAs",
            "CTA primary: Launch Demo (data-testid=\"primary-cta-button\")",
            "CTA secondary: Verify a credential (data-testid=\"secondary-cta-button\")"
          ]
        },
        {
          "id": "how_it_works",
          "container": "py-24 bg-surface border-y border-border",
          "layout": "grid grid-cols-1 md:grid-cols-3 gap-8",
          "cards": "rounded-2xl border border-border bg-background hover:border-primary/40 transition-colors",
          "testids": ["how-it-works-issue", "how-it-works-share", "how-it-works-verify"]
        },
        {
          "id": "trust_stats",
          "container": "py-20 bg-background",
          "layout": "grid grid-cols-1 md:grid-cols-3 gap-6",
          "components": "StatCard glass",
          "testids": ["stat-issued", "stat-partners", "stat-speed"]
        },
        {
          "id": "cta_band",
          "container": "py-16",
          "pattern": "glass-panel rounded-2xl px-6 py-10 flex flex-col md:flex-row items-center justify-between",
          "testid": "cta-band"
        }
      ]
    },
    "verification_page": {
      "search_bar": "w-full md:max-w-2xl mx-auto flex gap-3",
      "result_cards": "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10",
      "card_style": "rounded-2xl border border-border bg-surface/60 backdrop-blur-md hover:shadow-[var(--shadow-md)] transition-colors",
      "testids": {
        "search_input": "verification-search-input",
        "search_button": "verification-search-button",
        "result_card": "verification-result-card"
      }
    },
    "dashboard": {
      "role_tabs": "Tabs with Learner | Issuer | Verifier",
      "panels": "glass cards, dense tables, compact filters",
      "grid": "grid grid-cols-12 gap-6",
      "examples": {
        "overview": "cards for quick stats + recent verifications",
        "credentials": "table with filters, status chips",
        "verify": "paste hash/URL, immediate result panel",
        "settings": "forms with separators"
      },
      "testids": ["dashboard-tabs", "overview-card", "credentials-table", "verify-panel"]
    },
    "certificate_display": {
      "frame": "max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start",
      "left": "PDF/image preview in bordered glass panel with subtle inner shadow",
      "right": "metadata stack: issuer, subject, status badge, on-chain hash, QR",
      "qr": "Use react-qr-code with bg-background p-3 rounded-lg border border-border",
      "testids": {
        "pdf_preview": "certificate-preview",
        "status_badge": "certificate-status-badge",
        "qr_code": "certificate-qr"
      }
    },
    "analytics": {
      "layout": "grid grid-cols-1 xl:grid-cols-2 gap-6",
      "charts": ["issued-over-time", "verifications-per-region", "failure-reasons"],
      "empty_state": "EmptyState component when no data",
      "testids": ["analytics-chart-issued", "analytics-chart-regions", "analytics-chart-failures"]
    },
    "legal_pages": {
      "layout": "prose-invert max-w-3xl mx-auto py-16",
      "content": "Use headings, ordered lists, anchors; sticky in-page TOC on md+",
      "testid": "legal-content"
    }
  },
  "motion_interactions": {
    "principles": [
      "Micro but meaningful; never block tasks",
      "Use opacity/transform only; avoid layout thrash",
      "Respect prefers-reduced-motion"
    ],
    "durations": {"fast": 120, "base": 220, "slow": 340},
    "examples_js": {
      "button_hover": "transition-colors duration-200",
      "card_hover": "hover:shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:border-primary/40",
      "cta_glow": "shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]",
      "no_transition_all": "Never use transition: all — specify transitioned properties"
    }
  },
  "accessibility": {
    "contrast": "Maintain WCAG AA; text-main on background >= 12.6:1",
    "focus": "Visible ring via focus-visible:ring-1 focus-visible:ring-ring",
    "keyboard": "All menus/tabs/dialogs keyboard operable",
    "i18n": "Use ISO date format on metadata; avoid color-only status cues",
    "reduced_motion": "Respect prefers-reduced-motion: reduce animations"
  },
  "charts": {
    "library": "Recharts (already integrated)",
    "series_colors": {"issued": "#3B82F6", "verified": "#22C55E", "rejected": "#EF4444"},
    "example_js": "import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'\n// ...\n<ChartContainer config={{ issued: { label: 'Issued', color: '#3B82F6' }, verified: { label: 'Verified', color: '#22C55E' } }} data-testid=\"analytics-chart-issued\">\n  {() => (\n    <AreaChart data={data}>\n      <defs>\n        <linearGradient id=\"fillPrimary\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"5%\" stopColor=\"#3B82F6\" stopOpacity={0.3} />\n          <stop offset=\"95%\" stopColor=\"#3B82F6\" stopOpacity={0.02} />\n        </linearGradient>\n      </defs>\n      <XAxis dataKey=\"label\" stroke=\"rgba(255,255,255,0.45)\" />\n      <YAxis stroke=\"rgba(255,255,255,0.45)\" />\n      <ChartTooltip content={<ChartTooltipContent />} />\n      <Area type=\"monotone\" dataKey=\"issued\" stroke=\"#3B82F6\" fill=\"url(#fillPrimary)\" />\n    </AreaChart>\n  )}\n</ChartContainer>",
    "empty_state": "Use EmptyState component with data-testid=\"empty-state\" when dataset length === 0"
  },
  "images_urls": [
    {
      "category": "hero_background",
      "description": "Abstract teal/blue global texture for hero background (subtle, low opacity)",
      "url": "https://images.unsplash.com/photo-1731700128691-16fcc9043d11?crop=entropy&cs=srgb&fm=jpg&q=85"
    },
    {
      "category": "section_overlay",
      "description": "Expressive blue-green abstract pattern usable as masked overlay",
      "url": "https://images.unsplash.com/photo-1754348523153-5cf8e4129ded?crop=entropy&cs=srgb&fm=jpg&q=85"
    },
    {
      "category": "texture_noise",
      "description": "Dark grunge texture for ultra-subtle noise layer on hero (opacity < 6%)",
      "url": "https://images.unsplash.com/photo-1665755151530-0edd24f0c545?crop=entropy&cs=srgb&fm=jpg&q=85"
    }
  ],
  "libraries": {
    "primary": ["shadcn/ui", "framer-motion", "recharts", "sonner"],
    "optional": ["react-qr-code", "lottie-react"],
    "install": {
      "npm": [
        "npm i framer-motion recharts react-qr-code lottie-react",
        "npm i sonner"
      ]
    },
    "usage_notes": [
      "Prefer shadcn components over native HTML for dropdowns, dialogs, toasts, calendars",
      "Use sonner toaster from /app/client/src/components/ui/sonner.tsx",
      "If a calendar is required, use shadcn calendar"
    ]
  },
  "testing_policy": {
    "requirement": "All interactive and key informational elements MUST include a data-testid attribute (kebab-case, role-driven)",
    "examples": [
      "<Button data-testid=\"primary-cta-button\">Launch demo</Button>",
      "<input data-testid=\"verification-search-input\" />",
      "<Card data-testid=\"verification-result-card\" />",
      "<span data-testid=\"user-balance-text\">$1,240</span>",
      "<Dialog data-testid=\"revoke-credential-dialog\" />"
    ]
  },
  "semantic_status": {
    "verified": {"label": "Verified", "badgeClass": "bg-accent/10 text-accent border border-accent/20"},
    "pending": {"label": "Pending", "badgeClass": "bg-primary/10 text-primary border border-primary/20"},
    "revoked": {"label": "Revoked", "badgeClass": "bg-destructive/10 text-destructive border border-destructive/20"}
  },
  "micro_interactions": {
    "buttons": "On hover: color shift only; On press: subtle scale 0.98; Focus: 1px ring",
    "cards": "Elevate shadow and border-primary/40 on hover; translate-y-[1px] on active",
    "navbar": "Blur + border appear after scrollY > 20; slide-in mobile menu",
    "verify_flow": "Loading shimmer on result skeleton, success pulse on Verified badge"
  },
  "access_patterns": {
    "auth": "Email/password or SSO; avoid heavy shadows on inputs; show strength meter",
    "roles": "Role-based tabs (Learner/Issuer/Verifier) with different quick actions",
    "qr": "Certificate shows QR that encodes verification URL; provide copy button"
  },
  "component_path": {
    "button": "/app/client/src/components/ui/button.tsx",
    "input": "/app/client/src/components/ui/input.tsx",
    "badge": "/app/client/src/components/ui/badge.tsx",
    "card": "/app/client/src/components/ui/card.tsx",
    "table": "/app/client/src/components/ui/table.tsx",
    "tooltip": "/app/client/src/components/ui/tooltip.tsx",
    "tabs": "/app/client/src/components/ui/tabs.tsx",
    "dialog": "/app/client/src/components/ui/dialog.tsx",
    "dropdown_menu": "/app/client/src/components/ui/dropdown-menu.tsx",
    "chart": "/app/client/src/components/ui/chart.tsx",
    "sonner_toaster": "/app/client/src/components/ui/sonner.tsx"
  },
  "js_scaffolds": {
    "hero_ctas_jsx": "import { Button } from '@/components/ui/button'\nexport default function HeroCTAs(){\n  return (\n    <div className=\"flex flex-col sm:flex-row items-center justify-center gap-4\">\n      <Button size=\"lg\" className=\"rounded-full\" data-testid=\"primary-cta-button\">Launch live demo</Button>\n      <Button size=\"lg\" variant=\"outline\" className=\"rounded-full border-border\" data-testid=\"secondary-cta-button\">Verify a credential</Button>\n    </div>\n  )\n}",
    "verification_search_jsx": "import { Input } from '@/components/ui/input'\nimport { Button } from '@/components/ui/button'\nexport function VerificationSearch({onSearch}){\n  const [q,setQ] = React.useState('')\n  return (\n    <div className=\"w-full md:max-w-2xl mx-auto flex gap-3\">\n      <Input value={q} onChange={e=>setQ(e.target.value)} placeholder=\"Enter hash, URL, or ID\" data-testid=\"verification-search-input\"/>\n      <Button onClick={()=>onSearch(q)} data-testid=\"verification-search-button\">Search</Button>\n    </div>\n  )\n}",
    "certificate_status_jsx": "import { Badge } from '@/components/ui/badge'\nexport function CertificateStatus({status}){\n  const map={verified:'bg-accent/10 text-accent border border-accent/20',pending:'bg-primary/10 text-primary border border-primary/20',revoked:'bg-destructive/10 text-destructive border border-destructive/20'}\n  return <Badge className=\"px-3 py-1\" data-testid=\"certificate-status-badge\" >\n    <span className=\"\${map[status]||''}\">{status}</span>\n  </Badge>\n}"
  },
  "instructions_to_main_agent": [
    "Keep dark theme by default; set body bg to #030712 and text to #F9FAFB",
    "Use glassmorphic cards for dashboards: bg-surface/60 + backdrop-blur-md + border border-white/5",
    "Apply gradient only to hero section backgrounds; never on content blocks",
    "Use shadcn components for all interactive UI (dropdown, dialog, calendar, toasts)",
    "Add data-testid attributes to every interactive element and key text",
    "Do not use transition: all; scope transitions to colors/opacity/transform",
    "Primary blue (#3B82F6) and Accent green (#22C55E) are the only emphasis colors; orange (#F97316) for warnings",
    "Charts use provided series colors; always include legends and tooltip",
    "Legal pages use prose-invert with generous spacing",
    "Maintain md–xl rounded corners and soft shadows for a premium feel"
  ],
  "references_inspiration": {
    "sources": [
      "Behance: Web3 dashboards (dark SaaS, glassmorphism)",
      "Dribbble: certificate verification, blockchain UI"
    ],
    "notes": "Fuse Vercel/Stripe cleanliness with subtle Web3 accents (no neon overload)"
  },
  "general_ui_ux_design_guidelines": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
