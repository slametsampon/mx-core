// plugins/mx-core-metric/src/services/viewService.ts

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function fetchView(name: string, params?: Record<string, string>) {
  try {
    // 🔁 MOCK MODE: Ambil dari /public/mocks/
    if (USE_MOCK) {
      const mockUrl = `/mocks/${name}.json`;
      const res = await fetch(mockUrl);

      if (!res.ok) {
        throw new Error(`Mock data not found: ${mockUrl}`);
      }

      console.info(`[ViewService] 📦 Load MOCK view: ${mockUrl}`);
      return await res.json();
    }

    // 🌐 BACKEND MODE: Ambil dari /api/view/:name
    const url = new URL(
      `/api/view/${name}`,
      process.env.NEXT_PUBLIC_API_BASE_URL
    );

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Failed to fetch view: ${name}`);
    }

    console.info(`[ViewService] 🌐 Load LIVE view: ${url.toString()}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error fetching view: ${name}`, err);
    throw err;
  }
}
