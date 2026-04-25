import React from 'react';

type Article = {
  title: string;
  image: string;
  url: string;
};

const ARTICLES: Article[] = [
  {
    title: 'Livestream Hết Thời Béo Bở?',
    image: 'https://photo.znews.vn/w1250/Uploaded/zgsgtn/2024_08_26/nvcc.jpg',
    url: 'https://znews.vn/livestream-het-thoi-beo-bo-post1589620.html',
  },
  {
    title: 'Temu Lấy Gì Để "Đe Dọa" Shopee, TikTok Shop?',
    image: 'https://photo.znews.vn/w1250/Uploaded/spluaaa/2024_10_26/temu_plastic_bag_mockup_01.jpeg.jpg',
    url: 'https://znews.vn/temu-lay-gi-de-de-doa-shopee-tiktok-shop-post1507532.html',
  },
  {
    title: 'Temu Khó Thắng Shopee, TikTok Shop',
    image: 'https://photo.znews.vn/w1250/Uploaded/hfryz/2024_10_26/13_znews.jpg',
    url: 'https://znews.vn/temu-kho-thang-shopee-tiktok-shop-post1506655.html',
  },
];

const SOURCE_LABEL = 'Znews.vn';

export default function News() {
  return (
    <section className="bg-white section-padding" id="news">
      <div className="container-padding">
        <h2 className="font-display uppercase text-[30px] md:text-[62px] leading-tight text-black text-center mb-10 md:mb-14">
          Góc báo chí
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10">
            {ARTICLES.map((a) => (
              <a
                key={a.url}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col py-8 md:py-0 md:px-8"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-xl mb-5"
                />
                <p className="!font-sans text-[11px] font-bold tracking-[0.25em] uppercase text-black/40 mb-2">
                  {SOURCE_LABEL}
                </p>
                <h3 className="!font-sans !normal-case font-bold text-lg md:text-xl text-black leading-snug tracking-normal group-hover:underline decoration-[#6500b9] decoration-2 underline-offset-4 transition-all">
                  {a.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
