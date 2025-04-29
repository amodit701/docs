export function Screenshot({ src, alt, caption }) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm italic text-gray-500">{caption}</figcaption>}
    </figure>
  )
}
