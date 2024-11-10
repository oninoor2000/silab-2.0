/**
 * And array of routes that are accessible to the public
 * These routes do not need authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/laboratorium",
  "/penelitian",
  "/faq",
  "/berita",
  "/tentang-kami",
  "/verifikasi-akun",
];

/**
 * And array of routes that are for authentication
 * These routes will redirect logged in user to /
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/register", "/lupa-password"];

/**
 * And array of api routes
 * Api authentication routes should be open for any request
 * TRPC Api can be left open because it has an independen authentication process upon request
 * @type {string[]}
 */
export const apiAuthPrefix = ["/api/auth", "/api/trpc"];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * And array of routes that are accessible to the 'KEPALA_JURUSAN, TEKNISI, KEPALA_LAB, ADMIN' role
 * These routes will redirect logged in user to /
 * @type {string[]}
 */
export const staffRestrictedRoutes = [
  "/dashboard",
  "/dashboard/peminjaman",
  "/dashboard/pembayaran",
  "/dashboard/tambah-peminjaman",
  "/dashboard/laboratorium",
  "/dashboard/tambah-laboratorium",
  "/dashboard/edit-lab/",
  "/dashboard/berita",
  "/dashboard/tambah-berita",
  "/dashboard/edit-berita",
  "/dashboard/kategori-berita",
  "/dashboard/penelitian",
  "/dashboard/tambah-penelitian",
  "/dashboard/edit-penelitian",
  "/dashboard/kategori-penelitian",
];

/**
 * And array of routes that are accessible to the 'ADMIN' role only
 * These routes will redirect logged in user to /
 * @type {string[]}
 */

export const adminRestrictedRoutes = [
  "/dashboard/kelola-pengguna",
  "/dashboard/tambah-pengguna",
];
