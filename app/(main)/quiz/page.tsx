export default function Quiz() {
  const options = [
    {
      title: "Morning Vitality",
      description: "I peak early and wind down naturally by sunset.",
      icon: "wb_sunny",
      selected: false,
    },
    {
      title: "Consistent Flow",
      description: "Balanced energy with steady focus throughout the day.",
      icon: "bolt",
      selected: true,
    },
    {
      title: "Night Owl",
      description: "My creative spark ignites when the world goes quiet.",
      icon: "bedtime",
      selected: false,
    },
    {
      title: "Seeking Recharge",
      description: "Currently feeling depleted and in need of restoration.",
      icon: "battery_horiz_000",
      selected: false,
    }
  ];

  return (
    <div className="w-full relative min-h-screen pt-12 pb-32 flex flex-col">
      {/* Progress Indicator */}
      <div className="mb-12 max-w-4xl w-full mx-auto px-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#1b6d24] font-bold mb-2">Personalization Journey</span>
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Curating Your Experience</h1>
          </div>
          <div className="text-right">
            <span className="text-2xl font-headline font-extrabold text-primary">45%</span>
          </div>
        </div>
        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[45%] rounded-full transition-all duration-1000"></div>
        </div>
      </div>

      {/* Quiz Section: Asymmetric Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start max-w-4xl w-full mx-auto px-6">
        {/* Question Content */}
        <div className="md:col-span-5 lg:col-span-4 sticky top-28">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-secondary-container/50 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">Focus: Lifestyle</span>
            <h2 className="text-3xl font-headline font-extrabold leading-tight text-on-surface mb-6">How do you feel throughout the day?</h2>
            <p className="text-stone-600 leading-relaxed font-medium">Understanding your <span className="text-primary font-bold">Daily Energy Levels</span> helps us recommend rituals that align with your natural rhythm.</p>
          </div>
          <div className="hidden md:block">
            <img alt="Lifestyle" className="rounded-3xl w-full aspect-[3/4] object-cover opacity-80 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjhKxn78UQUr-zx3fpB9jM835oKak1bDOgZ18XfUYM0Ptl4kpHBzfABsGTUlV4NzcpngYT64mur50K9p5tE7Yxb5ks9YE9yTJJ4m88HwD_SoYQRsxVg7P3d3BG86tnU0XZt1pYfqZ_d5msF6PXrJDFnEtco2yhVzb8z4AqDzZv1rUfw2Yj-GTCQ0oiu5ieFGxzZSLMILEetT5DPmR0WrtvI8WTPfWj01I4M5Sc199OFyOUjK0wknK0aW9FHU7iQRNZ2P2pXUniLq5M"/>
          </div>
        </div>

        {/* Answer Options: Bento Style Grid */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          {options.map((opt, i) => (
            <div key={i} className="group cursor-pointer">
               <div className={`rounded-3xl p-6 transition-all duration-300 group-active:scale-[0.98] ${
                 opt.selected 
                   ? 'bg-surface-container-lowest wellness-glow ring-2 ring-primary relative' 
                   : 'bg-surface-container-low hover:bg-surface-container-highest border border-outline-variant/10'
               }`}>
                  <div className="flex items-center gap-6">
                     <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center overflow-hidden shrink-0 ${opt.selected ? 'bg-primary/10 text-primary' : 'bg-white text-primary wellness-glow'}`}>
                        <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>{opt.icon}</span>
                     </div>
                     <div className="flex-1">
                        <h3 className="font-headline font-bold text-xl text-on-surface mb-1">{opt.title}</h3>
                        <p className="text-stone-500 font-medium text-sm leading-relaxed">{opt.description}</p>
                     </div>
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                       opt.selected ? 'border-2 border-primary' : 'border-2 border-outline-variant group-hover:border-primary'
                     }`}>
                        <div className={`w-3 h-3 rounded-full bg-primary transition-transform ${opt.selected ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <footer className="fixed bottom-0 md:left-72 right-0 z-40 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-10 pb-6 pt-4 border-t border-outline-variant/10">
         <button className="flex items-center gap-2 text-stone-500 font-bold text-sm uppercase tracking-widest hover:text-primary transition-all">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Back</span>
         </button>
         <div className="flex items-center gap-8">
            <span className="hidden sm:inline-block text-[10px] text-stone-400 font-bold uppercase tracking-widest cursor-pointer hover:text-stone-600">Skip this for now</span>
            <button className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-xl font-label text-sm font-bold tracking-widest uppercase shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                Continue to Nutrition
            </button>
         </div>
      </footer>
    </div>
  )
}
