# SynapseX

SynapseX is a neurological intelligence platform for exploring EEG data through a single, explainable workspace. The long-term product combines EEG preprocessing, multi-task inference, brain-region visualisation, model monitoring, and report generation.

The repository currently contains the **Next.js frontend prototype**. It provides the complete product surface and a typed API integration layer that runs in mock mode by default. A FastAPI/Python backend is planned; no backend implementation is included in this repository yet.

## What is implemented

The frontend includes:

- A public landing page describing the platform.
- A dashboard with platform status, recent analyses, inference metrics, and activity.
- An analysis workspace for the planned EEG upload and inference flow.
- Brain visualisation and timeline-oriented UI surfaces.
- Explainability views for channel importance, brain regions, attention, and spike activity.
- Dataset, model, training, report, analytics, system-monitor, settings, and about pages.
- Reusable charts, dashboard shell components, landing-page sections, UI primitives, and visualisation components.
- A typed API layer with:
  - mock responses for local development;
  - REST request handling for a future FastAPI service;
  - normalized API errors;
  - request timeouts;
  - EEG upload support;
  - WebSocket job-stream support.

## Current status

| Area | Status |
| --- | --- |
| Product UI and navigation | Implemented |
| Responsive dashboard and landing experience | Implemented |
| Mock data mode | Implemented and enabled by default |
| Typed frontend API surface | Implemented |
| Real FastAPI backend | Planned |
| EEG preprocessing and ML inference | Planned for the backend |
| Authentication and authorization | Planned |
| Production deployment configuration | Not yet included |

The screens currently demonstrate the intended product experience. Mock mode is not a machine-learning implementation and should not be used to interpret real EEG recordings.

## Technology stack

- **Next.js 16** with the App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **React Icons**
- **ESLint 9**
- Planned backend: **Python, FastAPI, PyTorch, MNE-Python, and an SNN framework**

## Repository structure

```text
SynapseX/
├── frontend/
│   ├── app/                  # App Router pages and global styles
│   ├── components/
│   │   ├── charts/           # Reusable chart components
│   │   ├── dashboard/        # Shell, navigation, headers, and widgets
│   │   ├── landing/          # Landing-page sections
│   │   ├── ui/               # Shared UI primitives and icons
│   │   └── visuals/          # EEG and brain visualisations
│   ├── lib/
│   │   ├── dashboard-nav.ts  # Navigation definitions
│   │   ├── landing-content.ts
│   │   ├── mock-data.ts      # Local demo data
│   │   └── utils.ts
│   ├── services/
│   │   ├── api.ts            # Typed feature-level API methods
│   │   └── http.ts           # HTTP, errors, mock resolver, WebSocket helper
│   ├── types/                # Shared TypeScript contracts
│   ├── public/               # Static images and assets
│   ├── .env.example          # Environment variable template
│   └── package.json
├── assets/                   # Project and product reference images
├── .kiro/                    # Workspace engineering guidance
├── deep-research-report.md   # Research and technical direction
├── SynapseX_Enterprise_Brand_System_v1.md
└── SynapseX_Frontend_Context_Specification.md
```

## Prerequisites

Install the following before running the project:

- Node.js 20 or newer
- npm 10 or newer
- Git

Check your versions:

```bash
node --version
npm --version
```

## Local setup

From the repository root:

```bash
cd frontend
npm ci
copy .env.example .env.local
npm run dev
```

On macOS or Linux, use `cp .env.example .env.local` instead of `copy`.

Open [http://localhost:3000](http://localhost:3000) in a browser.

The default `.env.example` configuration enables mock mode, so the frontend can run without a backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK=true
```

Restart the development server after changing environment variables.

## Available commands

Run these commands from `frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Product landing page |
| `/dashboard` | Platform overview and live metrics |
| `/analysis` | EEG analysis workspace |
| `/brain-visualization` | Brain regions, overlays, and timeline views |
| `/explainability` | Prediction explanations and feature importance |
| `/datasets` | Dataset catalogue and metadata |
| `/models` | Model catalogue and performance |
| `/training` | Training runs, curves, and evaluation |
| `/reports` | Generated report history and exports |
| `/analytics` | Historical trends and distributions |
| `/system-monitor` | API, queue, and resource health |
| `/settings` | Workspace and application preferences |
| `/about` | Platform information |

## API configuration

The frontend communicates through [`frontend/services/api.ts`](./frontend/services/api.ts). Feature components should use this typed API surface rather than calling `fetch` directly.

### Mock mode

Mock mode is enabled unless `NEXT_PUBLIC_USE_MOCK` is exactly `false`:

```env
NEXT_PUBLIC_USE_MOCK=true
```

In this mode, the API layer returns local data from `frontend/lib/mock-data.ts`. EEG uploads return a synthetic job ID and WebSocket streams are no-ops. This is the recommended mode for UI development.

### Backend mode

When a compatible FastAPI backend is available:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK=false
```

The API layer expects REST resources such as:

```text
GET  /dashboard
GET  /analytics
GET  /stats
GET  /analyses/recent
POST /analyses
GET  /analyses/{analysisId}/predictions
GET  /analyses/{analysisId}/channels
GET  /analyses/{analysisId}/regions
GET  /datasets
GET  /models/current
GET  /training/runs
GET  /training/runs/{runId}/curve
GET  /reports
GET  /system/resources
GET  /system/queue
WS   /ws/jobs/{jobId}
```

These paths describe the current frontend contract. The backend must return payloads compatible with the types in `frontend/types/index.ts`. API changes should update both sides of the contract together.

## Frontend architecture

The frontend is a presentation layer. It does not perform EEG preprocessing, machine-learning inference, or clinical interpretation.

The intended data flow is:

```text
User selects EEG file
        |
        v
Frontend uploads file and configuration
        |
        v
FastAPI creates an analysis job
        |
        v
Frontend receives progress over REST/WebSocket
        |
        v
Backend returns predictions and explanations
        |
        v
Frontend renders charts, brain views, and reports
```

Important boundaries:

1. Keep backend communication in `frontend/services/`.
2. Keep shared response contracts in `frontend/types/`.
3. Keep demo-only values in `frontend/lib/mock-data.ts`.
4. Keep reusable presentation logic in `frontend/components/`.
5. Do not place ML algorithms or EEG processing in React components.
6. Treat backend responses as the source of truth when mock mode is disabled.

## Planned backend direction

The research and architecture documents describe a future backend with:

- EDF, BDF, CSV, MAT, and NumPy EEG ingestion.
- Standardized resampling, filtering, channel handling, segmentation, and normalization.
- A shared spiking-neural-network backbone with task-specific heads.
- Seizure, emotion, and cognitive-state analysis.
- Explainability through channel importance, brain-region contribution, attention, and perturbation analysis.
- Report export and system monitoring.

Candidate public datasets include TUH EEG, CHB-MIT, DEAP, SEED/SEED-IV, DREAMER, and BCI datasets. Dataset licensing, consent, preprocessing, and clinical-use limitations must be checked before implementation or redistribution.

## Contributing

1. Create a focused branch from `main`.
2. Keep changes inside the appropriate frontend layer.
3. Do not commit `.env.local`, credentials, API keys, or generated build output.
4. Run `npm run lint` and `npm run build` from `frontend/`.
5. Update the typed API contract and this README when a user-visible integration changes.
6. Open a pull request with a short summary, screenshots for visual changes, and validation results.

## Security and privacy

SynapseX is a research and software project, not a medical device. Do not upload identifiable or sensitive EEG data to a development environment. Use de-identified data and follow the terms of each dataset. Keep secrets in local environment files; never commit them.

## Documentation

- [Frontend README](./frontend/README.md)
- [Frontend context specification](./SynapseX_Frontend_Context_Specification.md)
- [Enterprise brand system](./SynapseX_Enterprise_Brand_System_v1.md)
- [Deep research report](./deep-research-report.md)

## License

No license has been declared yet. Until a license is added to the repository, all rights are reserved by the copyright holder.
