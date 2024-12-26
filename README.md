# 🎉 Interactive Birthday Card Template 🎉
![Logo](public/logo.png)

> A powerful, interactive, and shareable birthday card built with **Next.js**, **Tailwind CSS**, **Turbopack**, **upstash**, **vercel blob storage**, **redis**, **postgres** and **Prisma**.

---

## 🌟 **Features**

### 🎂 **Personalized Cards**
Create unique cards with tailored visuals and messages.

![Card](/public/images/landing.png)

---

### 🔥 **Interactive Candles**
Blow out candles with dynamic animations based on the user's generation.

![Candles](/public/images/candles.png)

---

### ✍️ **Signatures and Wishes**
Invite friends to sign the card and leave heartfelt messages.

![Signatures](/public/images/signatures.png)

---

### 🔗 **Shareable Links**
Easily share personalized cards with secure OAuth-based authentication.

![Shareable](/public/images/sharepage.png)

---

### **Gallery**
Share personalized images in an auto-scroll gallery, performs manipulations to ensure the perfect fit.
Images are drawn randomly through the app, dynamic image rendering based on the slug (params),
Served from Vercel Blobs and optimized in addition to NextJS Image optimization for lazy performant loads.

>Credits to **Sora by OpenAI** for video generation.

![Gallery](/public/images/gallery.png)

---

### 🛠 **Built With**
- **Next.js**: For server-side rendering and the App Router.
- **Turbopack**: For lightning-fast builds.
- **Tailwind CSS**: For responsive and beautiful UI.
- **Prisma**: For database ORM.
- **NextAuth**: For secure OAuth.
- **Upstash**: KV Store
- **Vercel Storage Blob**: Store static assets -images acts as our CDN
- **Redis**: Storage of hot key pair for user's birthday wishes

![Next.js](https://img.icons8.com/color/96/000000/nextjs.png) ![Tailwind CSS](https://img.icons8.com/color/96/000000/tailwindcss.png) ![Prisma](https://img.icons8.com/color/96/000000/prisma-orm.png) ![NextAuth](https://img.icons8.com/color/96/000000/lock.png)

---

## 🚀 **Getting Started**

### Prerequisites
- ![Node.js](https://img.icons8.com/color/24/000000/nodejs.png) Node.js v18+
- ![Redis](https://img.icons8.com/color/24/000000/redis.png) Upstash Redis account for storage.


## License

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International. See the [LICENSE](https://github.com/ericgitangu/interactive-birthday-card/blob/main/LICENSE.md) file for details.
