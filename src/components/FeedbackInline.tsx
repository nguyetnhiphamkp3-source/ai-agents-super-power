import React from 'react';

interface Props {
  image: string;
  narrow?: boolean;
}

export default function FeedbackInline({ image, narrow = false }: Props) {
  return (
    <div className={`${narrow ? 'max-w-[440px]' : 'max-w-[900px]'} w-full mx-auto my-8 md:my-12`}>
      <img
        src={`${import.meta.env.BASE_URL}feedback/${image}`}
        alt="Feedback from challenge participant"
        className="w-full h-auto rounded-xl md:rounded-2xl shadow-sm"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
