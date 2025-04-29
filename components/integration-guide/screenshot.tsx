import Image from "next/image"

interface ScreenshotProps {
  src: string
  alt: string
  caption?: string
}

export function Screenshot({ src, alt, caption }: ScreenshotProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Image src={src || "/placeholder.svg"} alt={alt} width={800} height={450} className="w-full object-cover" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}
