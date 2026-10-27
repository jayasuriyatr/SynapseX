# SynapseX Frontend Architecture Specification

> **Purpose**
>
> This document defines the complete frontend context for SynapseX, a
> software-only EEG Intelligence Platform. It is intended for AI coding
> agents (Cursor, Claude Code, Codex, Windsurf, Lovable, etc.) as the
> authoritative frontend implementation guide.
>
> **Scope**
>
> This document intentionally excludes visual design, branding, color
> palette, typography, spacing, and theme because those are maintained
> in a separate Markdown document.
>
> ## Goals
>
> -   Production-grade Next.js frontend.
> -   Frontend acts as a presentation layer only.
> -   All intelligence resides in the Python/FastAPI backend.
> -   Modular, scalable architecture.
>
> ------------------------------------------------------------------------
>
> # Information Architecture
>
> Primary navigation:
>
> -   Dashboard
> -   Analysis
> -   Brain Visualization
> -   Explainability
> -   Datasets
> -   Models
> -   Training
> -   Reports
> -   Analytics
> -   System Monitor
> -   Settings
> -   About
>
> ## Dashboard
>
> Include:
>
> -   Platform overview
> -   AI engine status
> -   Model version
> -   Recent analyses
> -   System statistics
> -   Live inference metrics
> -   Interactive 3D brain summary widget
> -   Recent activity timeline
>
> ## Analysis Workspace
>
> Include:
>
> -   Drag-and-drop EEG upload
> -   Supported formats (EDF, BDF, CSV, MAT, NumPy)
> -   File validation
> -   EEG preview
> -   Processing pipeline visualization
> -   Prediction cards
> -   Confidence indicators
> -   Explainability summary
> -   Export actions
>
> ## Brain Visualization
>
> Include:
>
> -   Interactive 3D brain
> -   Region highlighting
> -   Heatmaps
> -   Channel overlays
> -   Timeline playback
> -   Camera controls
>
> ## Explainability
>
> Include:
>
> -   Channel importance
> -   Brain-region contribution
> -   Confidence analysis
> -   Spike visualization
> -   Attention visualization
> -   Decision explanation
>
> ## Dataset Management
>
> Show available datasets:
>
> -   TUH EEG
> -   CHB-MIT
> -   DEAP
> -   SEED
> -   SEED-IV
> -   DREAMER
> -   BCI Competition datasets
>
> Each dataset page includes metadata, statistics, preview, and
> documentation links.
>
> ## Models
>
> Display:
>
> -   Shared SNN backbone
> -   Seizure head
> -   Emotion head
> -   Cognition head
> -   Version history
> -   Performance metrics
>
> ## Training
>
> Visualize training lifecycle, metrics, epochs, validation, confusion
> matrices, ROC curves, and checkpoints.
>
> ## Reports
>
> Generate PDF, JSON, CSV summaries.
>
> ## Analytics
>
> Historical trends, prediction distribution, latency, throughput,
> accuracy.
>
> ## System Monitor
>
> Backend/API health, inference queue, CPU, GPU, memory, storage.
>
> ## Settings
>
> User preferences, preprocessing options, model selection, export
> preferences.
>
> # Component Principles
>
> -   Reusable React components.
> -   Feature-based folder organization.
> -   Server state separated from UI state.
> -   Strict TypeScript.
> -   Responsive.
> -   Accessible.
> -   Optimistic UI where appropriate.
>
> # Suggested Next.js Structure
>
> ``` text
> app/
> components/
> features/
> hooks/
> lib/
> services/
> store/
> types/
> utils/
> ```
>
> # API Interaction
>
> Frontend never performs ML.
>
> It communicates only with FastAPI through REST/WebSocket endpoints.
>
> Upload -\> Processing -\> Inference -\> Visualization -\> Report.
>
> # Functional Requirements
>
> -   Upload EEG
> -   View preprocessing progress
> -   View predictions
> -   Inspect explainability
> -   Compare results
> -   Export reports
> -   Monitor backend
>
> # Non-functional Requirements
>
> -   Modular
> -   Maintainable
> -   Scalable
> -   Responsive
> -   Production-ready
> -   AI-agent friendly
>
> # AI Coding Instructions
>
> -   Never embed ML logic in frontend.
> -   Treat backend as source of truth.
> -   Build reusable components.
> -   Prefer composition over duplication.
> -   Separate layout, presentation, and data fetching.
>
> # Future Extensions
>
> -   Live EEG streaming
> -   Multi-user collaboration
> -   Cloud deployment
> -   Authentication
> -   Role-based access
> -   Mobile companion app
>
> This document is intentionally architecture-focused and should be used
> together with the separate design/theme specification.
