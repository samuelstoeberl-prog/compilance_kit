import { Helmet } from 'react-helmet-async'

interface Props {
  title: string
  description: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>[]
}

export default function Seo({ title, description, noindex, jsonLd }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {jsonLd?.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
