# AI Development Guidelines

This document provides rules and guidelines for AI-driven development on this project. The goal is to maintain code quality, consistency, and adhere to the established architecture.

## Tech Stack Overview

This project is built with a modern, type-safe, and efficient technology stack:

-   **Framework**: React with Vite for a fast development experience.
-   **Language**: TypeScript for type safety and improved developer experience.
-   **UI Components**: shadcn/ui, a collection of beautifully designed, accessible components built on Radix UI.
-   **Styling**: Tailwind CSS for a utility-first styling approach. All styling should be done via Tailwind classes.
-   **Routing**: React Router (`react-router-dom`) for all client-side routing.
-   **Data Fetching & Server State**: TanStack Query (`@tanstack/react-query`) for managing asynchronous operations, caching, and server state.
-   **Icons**: Lucide React (`lucide-react`) for a consistent and clean set of icons.
-   **Forms**: React Hook Form (`react-hook-form`) for performant form state management, paired with Zod for schema validation.
-   **Animations**: `tailwindcss-animate` is used to power animations defined in `tailwind.config.ts`.

## Library Usage Rules

To ensure consistency, please adhere to the following rules when adding or modifying features:

1.  **UI Components**:
    -   **ALWAYS** use components from the `src/components/ui` directory (shadcn/ui components) for building the user interface.
    -   If a required component does not exist, create a new reusable component in `src/components/` using Tailwind CSS for styling and following the existing architectural patterns.
    -   **DO NOT** introduce new component libraries (e.g., Material UI, Ant Design, Chakra UI).

2.  **Styling**:
    -   **ONLY** use Tailwind CSS utility classes for styling.
    -   Avoid writing custom CSS in `.css` files. Global styles are defined in `src/index.css` and should only be modified for base theme changes (e.g., CSS variables).

3.  **Routing**:
    -   All application routes **MUST** be defined in `src/App.tsx` using `react-router-dom`.
    -   For navigation links that require an "active" state, use the custom `NavLink` component from `src/components/NavLink.tsx`.

4.  **State Management**:
    -   For server state, data fetching, caching, and mutations, **ALWAYS** use `@tanstack/react-query`.
    -   For simple, local component state, use React's built-in `useState` and `useReducer` hooks.
    -   **DO NOT** add global state management libraries like Redux, Zustand, or MobX without explicit instruction.

5.  **Icons**:
    -   **EXCLUSIVELY** use icons from the `lucide-react` package. This ensures visual consistency across the application.

6.  **Forms**:
    -   All forms **MUST** be built using `react-hook-form`.
    -   Schema validation **MUST** be handled using `zod`.

7.  **Notifications (Toasts)**:
    -   Use the custom `useToast` hook from `src/hooks/use-toast.ts` for displaying toast notifications that match the shadcn/ui theme.
    -   `sonner` is available for more complex or differently styled notifications if required, but the custom hook is preferred for consistency.