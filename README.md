# Great Learning App

A comprehensive learning management application built with Next.js, featuring activity tracking, filtering, dark mode support, and Progressive Web App (PWA) capabilities.

## 🚀 Features

- **Activity Management** - View, filter, and sort learning activities
- **Advanced Filtering** - Search by keywords, filter by type/status/subject, sort by date/title/status
- **Pagination** - Browse through activities with 4 items per page
- **Dark Mode** - Full light/dark theme support with system preference detection
- **PWA Support** - Installable on desktop and mobile devices, works offline
- **Responsive Design** - Optimized for mobile, tablet, and desktop screens

---

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Android Studio** (for Android builds only)
- **Java JDK 17** (for Android builds only)

---

## 🌐 Running on Web

### Development Mode

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will hot-reload as you make changes

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Access the app**
   - Open [http://localhost:3000](http://localhost:3000)
   - PWA features will be active (install prompt, offline support)

---

## 📱 Building for Android

This app uses **Capacitor** to deploy as a native Android application.

### Initial Setup (One-time)

1. **Install Capacitor**
   ```bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/android
   ```

2. **Initialize Capacitor**
   ```bash
   npx cap init
   ```
   - App name: `Great Learning`
   - Package ID: `com.greatlearning.app`
   - Web asset directory: `out`

3. **Update next.config.ts for static export**
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

4. **Add Android platform**
   ```bash
   npx cap add android
   ```

### Build & Deploy to Android

1. **Build the web app**
   ```bash
   npm run build
   ```

2. **Sync files to Android**
   ```bash
   npx cap sync android
   ```

3. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

4. **In Android Studio:**
   - Connect an Android device or start an emulator
   - Click the green "Run" button
   - The app will install and launch on the device

### Generate APK

1. In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Find the APK in: `android/app/build/outputs/apk/debug/app-debug.apk`
3. Transfer to device and install

---

## 🛠️ Tech Stack & Choices

### Core Technologies

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js 16** | React framework | Server-side rendering, file-based routing, optimized builds |
| **TypeScript** | Type safety | Catch errors early, better IDE support, maintainable code |
| **Tailwind CSS** | Styling | Utility-first, responsive, dark mode support built-in |
| **shadcn/ui** | UI Components | Accessible, customizable, modern design system |
| **next-themes** | Theme switching | Simple dark/light mode implementation |
| **@ducanh2912/next-pwa** | PWA support | Service worker, offline caching, installable app |
| **Capacitor** | Mobile deployment | Cross-platform native apps from web code |

### Key Design Decisions

#### 1. **Webpack instead of Turbopack for builds**
- **Tradeoff**: Slower build times vs PWA compatibility
- **Reason**: PWA plugins don't yet support Turbopack in Next.js 16
- **Impact**: Build takes ~10s instead of ~3s, but enables offline functionality

#### 2. **Client-side filtering and pagination**
- **Tradeoff**: All data loaded upfront vs simpler implementation
- **Reason**: Mock data is small, real API would use server-side filtering
- **Impact**: Fast filtering but not scalable to thousands of activities

#### 3. **SVG icons instead of PNG**
- **Tradeoff**: Some platforms may not display perfectly vs smaller file size
- **Reason**: Scalable, theme-compatible, easy placeholder
- **Impact**: Should replace with proper PNG icons for production

#### 4. **Static export for Capacitor**
- **Tradeoff**: Loses server-side features vs mobile compatibility
- **Reason**: Capacitor requires static HTML/CSS/JS files
- **Impact**: No API routes or server components in mobile build

---

## ⚠️ Current Limitations

1. **Mock Data**: Activities are hardcoded in `lib/constants.ts`
   - Real app would fetch from a backend API
   - Filtering/sorting happens client-side

2. **No Backend**: No user authentication or data persistence
   - User profile is hardcoded
   - Activity progress not saved

3. **PWA Icons**: Using placeholder SVG icons
   - Should create proper PNG icons (192x192, 512x512)
   - Consider using maskable icons for better Android support

4. **No Real-time Updates**: Activities don't update automatically
   - Would need WebSocket or polling for live data

5. **Limited Error Handling**: No retry logic or error boundaries
   - Network failures not gracefully handled

6. **No Analytics**: No tracking of user behavior or app usage

7. **Build Configuration**: Requires `--webpack` flag for PWA
   - Will improve when Next.js Turbopack supports PWA plugins

---

## 🧪 Testing

### Setup Testing Framework

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### Run Tests

```bash
npm test
```

### Test Coverage

```bash
npm test -- --coverage
```

---

## 🎨 Theme Support

The app includes full light/dark mode support:

- **Light Mode**: Clean white background, gray text
- **Dark Mode**: Dark gray background, light text
- **System Preference**: Automatically matches OS theme
- **Manual Toggle**: Click sun/moon icon in menu bar

Theme settings are persisted using `next-themes` and localStorage.

---

## 📦 Project Structure

```
learning-app/
├── public/              # Static assets, PWA files
│   ├── manifest.json    # PWA manifest (Android config)
│   ├── sw.js           # Service worker (auto-generated)
│   └── icons/          # App icons
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── layout.tsx  # Root layout, PWA metadata
│   │   ├── page.tsx    # Home page
│   │   └── (private)/  # Protected routes
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── pages/      # Page-specific components
│   │   └── pagination/ # Pagination component
│   └── lib/            # Utilities and constants
│       ├── constants.ts # Mock data
│       ├── activity.ts  # Type definitions
│       └── utils.ts     # Helper functions
├── next.config.ts      # Next.js + PWA configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── package.json        # Dependencies and scripts
```

---

## 🔜 Next Steps & Improvements

### High Priority

1. **Backend Integration**
   - Connect to a real API for activities
   - Implement user authentication (OAuth, JWT)
   - Add data persistence (PostgreSQL, MongoDB)

2. **Enhanced Features**
   - Activity completion tracking
   - Progress analytics and charts
   - Calendar view for scheduled activities
   - Notifications for upcoming deadlines

3. **Testing**
   - Unit tests for all components
   - Integration tests for user flows
   - E2E tests with Playwright or Cypress
   - Accessibility testing

4. **Performance**
   - Implement virtual scrolling for large lists
   - Add image optimization
   - Code splitting for faster initial load
   - Server-side filtering for large datasets

### Medium Priority

5. **Mobile Optimization**
   - Better touch gestures
   - Pull-to-refresh functionality
   - Native share integration
   - Push notifications

6. **UI/UX Enhancements**
   - Skeleton loaders
   - Animations and transitions
   - Onboarding flow
   - Empty state illustrations

7. **Accessibility**
   - ARIA labels and roles
   - Keyboard navigation
   - Screen reader support
   - High contrast mode

### Nice to Have

8. **Advanced Features**
   - Offline editing with sync
   - Multi-language support (i18n)
   - Export activities to PDF/CSV
   - Activity recommendations

9. **Developer Experience**
   - Storybook for component documentation
   - Husky pre-commit hooks
   - ESLint strict mode
   - Automated deployment pipeline

10. **Production Ready**
    - Replace placeholder icons with brand icons
    - Add proper error boundaries
    - Implement logging and monitoring
    - Add rate limiting and security headers

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production (uses webpack for PWA) |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests (when configured) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Great Learning Team**

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Capacitor](https://capacitorjs.com/) - Native mobile deployment
