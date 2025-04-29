export function CodeSnippet({ children, language = "bash" }) {
  return (
    <div className="my-4">
      <pre className={`language-${language}`}>
        <code>{children}</code>
      </pre>
    </div>
  )
}
