'use client';

import { useState } from 'react';

export default function FAQ({ items, schemaId }) {
  const [openIndex, setOpenIndex] = useState(null);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="faq-section">
        <h2 className="section-title">❓ الأسئلة الشائعة</h2>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div className="faq-answer">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
