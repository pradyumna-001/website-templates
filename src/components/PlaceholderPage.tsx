interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>This view is a placeholder and will be built out from site config.</p>
    </section>
  )
}