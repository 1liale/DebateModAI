export const YoutubeEmbed = ({ videoId }: { videoId: string }) => (
  <div className="relative pb-[56.25%] h-0">
    <iframe
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);
