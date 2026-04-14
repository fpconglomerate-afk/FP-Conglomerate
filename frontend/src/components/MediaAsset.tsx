type MediaAssetProps = {
  src?: string;
  alt: string;
  className?: string;
  /** Use for above-the-fold / LCP images only */
  priority?: boolean;
};

function isVideoSource(src: string) {
  return (
    src.startsWith("data:video/") ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src)
  );
}

export default function MediaAsset({ src, alt, className, priority }: MediaAssetProps) {
  if (!src) {
    return <div className={className} aria-label={alt} />;
  }

  if (isVideoSource(src)) {
    return (
      <video
        src={src}
        className={className}
        controls
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
