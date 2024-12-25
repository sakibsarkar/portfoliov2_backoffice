const FethingOverlay = () => {
  return (
    <span className="absolute w-full h-full top-0 left-0 bg-[#bbbbbb59] center flex-col">
      Loading...
      <span className="relative w-20 h-20 mx-auto">
        <span className="absolute inset-0 border-4 border-[#00FFF0]/20 rounded-full" />
        <span className="absolute inset-0 border-4 border-[#ffffff] rounded-full border-t-transparent animate-spin" />
      </span>
    </span>
  );
};

export default FethingOverlay;
