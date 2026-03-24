# CV Optimizer

Kendi CV’ni bir iş ilanına göre güçlendirmek için küçük bir araç. Metnini yapıştırıyorsun; yapay zekâ özet ve deneyim maddelerini düzenliyor, eksik anahtar kelimeleri ve kabaca bir ATS uyumu öneriyor.

Stack: **Next.js** + **Google Gemini** (API anahtarı sunucuda kalır, tarayıcıya sızmaz.)

**Repo:** [github.com/beidowski/cv-optimizer](https://github.com/beidowski/cv-optimizer)

---

## Hızlı başlangıç

```bash
npm install
```

Kök dizinde `.env.local` oluştur:

```env
GEMINI_API_KEY=senin_anahtarın
```

([Google AI Studio](https://aistudio.google.com/) — örnek isimler için repodaki `.env.example` dosyasına bak; içine gerçek anahtar yazma.)

```bash
npm run dev
```

Tarayıcı: [http://localhost:3000](http://localhost:3000)

---

## Ne var burada?

| Sayfa        | Ne işe yarar? |
|-------------|----------------|
| **Ana sayfa** | CV + ilan yapıştır → **Run analysis** |
| **Templates** | Hazır örnek; **Preview with AI** aynı sayfada sonuç, **Open in editor** ana sayfayı doldurur |
| **History**   | Son çalıştırmalar (tarayıcıda `localStorage`) |
| **About**     | Kısa tanıtım |

---

## Komutlar

- `npm run dev` — geliştirme
- `npm run build` / `npm run start` — production dene
- `npm run lint` — ESLint

---

## Güvenlik hatırlatması

`.env.local` **asla commit’leme** (zaten `.gitignore`’da). Yayına alırken `GEMINI_API_KEY`’i hosting ortam değişkenlerinde tanımla.

---

## Yayın fikri

API route kullandığı için düz **GitHub Pages** tek başına yetmez; **Vercel** benzeri bir yerde deploy etmek genelde en kolayı.

---

## Not

Çıktılar öneridir; başvurmadan önce kendi sesinle gözden geçir.

İyi şanslar.
