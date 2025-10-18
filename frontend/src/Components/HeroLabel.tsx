const HeroLabel = () => {
  return (
    <div className="flex items-center justify-center bg-slate-100">
      <div className="w-full h-[200px] flex items-center justify-center text">
        <div className="flex-col">
          <div className="text-2xl font-bold mb-4">
            "The customer service I received was <br /> exceptional. The support
            team went above <br /> and beyonf to address my concers"
          </div>
          <div className="text-lg font-semibold">Jules Winnfield</div>
          <div className="font-light text-md">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
};

export default HeroLabel;
