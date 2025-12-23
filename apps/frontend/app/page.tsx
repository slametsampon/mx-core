// apps/frontend/app/page.tsx

import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'Beranda | Frontend',
  description: 'Mx Core Frontend - Entry point untuk Mx-Core System',
};

export default function HomePage() {
  return <HomePageClient />;
}
