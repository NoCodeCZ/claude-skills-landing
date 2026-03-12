export default function TerminalBar({ title }) {
  return (
    <div className="aa-terminal-bar">
      <span className="aa-dot r" />
      <span className="aa-dot y" />
      <span className="aa-dot g" />
      <span className="aa-terminal-title">{title}</span>
    </div>
  )
}
