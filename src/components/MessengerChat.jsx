const PAGE_ID = import.meta.env.VITE_FB_PAGE_ID

export default function MessengerChat() {
  if (!PAGE_ID || PAGE_ID === 'YOUR_PAGE_ID_HERE') return null

  return (
    <a
      href={`https://m.me/${PAGE_ID}`}
      target="_blank"
      rel="noopener noreferrer"
      className="aa-messenger-fab"
      aria-label="Chat on Messenger"
    >
      <svg viewBox="0 0 36 36" width="28" height="28" fill="#fff">
        <path d="M18 2C9.163 2 2 8.636 2 16.8c0 4.662 2.327 8.82 5.964 11.537V34l5.478-3.01c1.46.405 3.01.61 4.558.61 8.837 0 16-6.636 16-14.8S26.837 2 18 2zm1.6 19.893l-4.075-4.346-7.95 4.346 8.742-9.28 4.175 4.346 7.85-4.346-8.742 9.28z"/>
      </svg>
    </a>
  )
}
