# 📊 Performance Profiling Report (TreS Frontend)

## 🔍 Methodology of Profiling

To analyze the performance of the TreS frontend application, we applied the following profiling methods:

- **React Profiler (React DevTools):** Used to identify re-render patterns and measure rendering time for React components.
- **Chrome DevTools Performance Tab:** Used for JavaScript execution profiling and measuring time to first paint and interactivity.
- **Lighthouse Audit (Chrome):** Generated performance scores and key loading metrics.
- **Bundle Analysis:** Conducted using `source-map-explorer` and `vite-plugin-visualizer` to analyze bundle size and contents.

Testing was performed in both development and production builds using sample navigation and interaction flows in the app (e.g. viewing tickets, switching pages).

---

## 📈 Collected Performance Metrics

### Lighthouse (Before Optimization)

| Metric                       | Value  |
| ---------------------------- | ------ |
| Performance Score            | 47     |
| First Contentful Paint (FCP) | ~2.1s  |
| Largest Contentful Paint     | ~7.7s  |
| Total Blocking Time          | ~330ms |
| Cumulative Layout Shift      | ~0.001 |
| Speed Index                  | ~2.8s  |

### React Profiler

| Component        | Render Time | Notes                  |
| ---------------- | ----------- | ---------------------- |
| `<TicketList />` | ~20-24ms    | Frequent re-renders    |
| `<TicketCard />` | ~9-13ms     | Unmemoized, re-renders |
| `<Sidebar />`    | ~1ms        | Stable                 |

### Bundle Size

- Main bundle: ~560KB (after Vite build)
- Notable contributors: `react-icons`, `axios`, `@tanstack/react-query`

---

## 🔥 Bottlenecks Analysis

1. **Repeated re-rendering** of list components due to missing memoization.
2. **Monolithic JS bundle** causing slow initial load.
3. **No lazy loading** of route-based content.
4. **Redundant calculations** during render.
5. **No caching** for fetched data, leading to unnecessary re-fetches.

---

## 🛠️ Implemented Optimizations

- **Memoization:** Wrapped `TicketCard`, `TicketList` with `React.memo`. Used `useMemo` and `useCallback`.
- **Code Splitting:** Applied `React.lazy` and `Suspense` to route-level components.
- **Data Caching:** Integrated `@tanstack/react-query` for caching API responses.
- **Lazy Loading:** Added lazy loading for images.
- **Bundle Analysis & Cleanup:** Removed unused imports and dependencies, optimized imports.

---

## 📊 Before & After Comparison

| Metric                   | Before | After      | Improvement |
| ------------------------ | ------ | ---------- | ----------- |
| Performance Score (LH)   | 47     | **90**     | +43         |
| First Contentful Paint   | ~2.1s  | **~0.9s**  | 233%        |
| Largest Contentful Paint | ~7.7s  | **~2.0s**  | 385%        |
| Total Blocking Time      | ~330ms | **~0ms**   | 1000%       |
| Cumulative Layout Shift  | ~0.001 | **~0.003** | 300%        |
| Speed Index              | ~2.8s  | **~0.9s**  | 311%        |

React Profiler (render times):

| Component        | Before   | After  |
| ---------------- | -------- | ------ |
| `<TicketList />` | ~20-24ms | ~4-6ms |
| `<TicketCard />` | ~9-13ms  | ~1-3ms |

## ✅ Conclusion

The optimization process significantly improved the performance of the TreS frontend application. Rendering times, loading speed, and overall responsiveness have improved without compromising the application structure. These optimizations also make the application more scalable for increased data and user interaction in the future.
