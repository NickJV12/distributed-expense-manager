function BackgroundBlobs() {
  return (
    <>
      <div
        className="
          absolute
          -top-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-[#A1F1CA]/40
          blur-3xl
          animate-pulse
        "
      />

      <div
        className="
          absolute
          top-1/3
          -right-28
          h-80
          w-80
          rounded-full
          bg-[#FF6F61]/30
          blur-3xl
          animate-pulse
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-1/4
          h-72
          w-72
          rounded-full
          bg-[#FFD1C7]/40
          blur-3xl
          animate-pulse
        "
      />
    </>
  );
}

export default BackgroundBlobs;