export default function Store() {
  const categories = [
    { name: "All Essentials", active: true },
    { name: "Sleep Support", active: false },
    { name: "Stress Relief", active: false },
    { name: "Focus Boost", active: false },
    { name: "Nutrition", active: false },
  ];

  const productsRow1 = [
    {
      name: "Weighted Sleep Mask",
      price: "$45.00",
      insight: "Matches your sleep patterns",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu",
      badge: "Personal Match"
    },
    {
      name: "Magnesium Complex",
      price: "$32.00",
      insight: "Reduces morning cortisol",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98",
      badge: null
    },
    {
      name: "Organic Ceremonial Matcha",
      price: "$58.00",
      insight: "Supports focus goals",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a",
      badge: "Focus Pick"
    }
  ];

  const productsRow2 = [
    {
      name: "Stress-Relief Adaptogen",
      price: "$38.00",
      insight: "Balanced nervous system",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S"
    },
    {
      name: "Linen Weighted Blanket",
      price: "$185.00",
      insight: "Deepens REM cycles",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMi2ZSP69RzDSHuHX-5kjw_oV0FCFGN9EJAERkS8jvu8TRw0kMYufbLdpjl1GkI3B5ZMyltuGBYohiMca6NXF5WQof11kP4waXv1ZO6fjewUfbU_GYouDrfw68nupljwvQppI94lscXA4oySMFEJYfGfao83-vyS6NQoqTqNmYVrXmQ0uNVS7JREYZbnL8-yDP66OwB0lIbW3HAdQkdeYwP_npToblkxzD8TECLLUydS_6GZOHc_HvYX0cPsxt1v_KvSvmHYIxZYNU"
    },
    {
      name: "Ambient Salt Diffuser",
      price: "$65.00",
      insight: "Evening air purification",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChZLIgsggwADCm5J8bVz84jZmHlXtED4ifwmzdo6nxvjzFr1N_8g18taI9ugR3zTa8PXSp0fTXYRB9bt_YzJN6BtD2HNJKUlOtlO8EW8Yh7Sb32_InUm3md3sx87U4aFz7LLoSQc3WVFt2qMRi6gioI6vf4ugd-QoxFih_Tc39XdFq8bz9MhnJV6LDZIXUPV3coHmuDzZb6GvP7rAVULHrWZuhisbCCFaPk3xoy4vk0gpl9XznYRbjICVNszaXry-Yf7Mpx5ereMWO"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mt-6 mb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight">
             Curated for Your <span className="text-primary">Rhythms</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
             Every selection here is calibrated to your recent AI wellness analysis. We've prioritized items that support your current focus goals and evening deceleration.
          </p>
        </div>
        <div className="flex-1 w-full h-80 rounded-[2rem] overflow-hidden wellness-glow">
          <img alt="Serene wellness space" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDND3DiMQEjSKr2xlA3lBMvtzfo-0EN7EEgyI4a65j40CD_QAzUqMuRboeNO4wEyYJeVa2hmnD1sIZX8yoVDpEshS1eCsA6mHzKXypOF9Bw9sTTaaTSbnNTYvj3vGmvmt1XByEpuaBJ8wRrBRVWWPQFjGd-cdtAsWa1U_ksW07mHlIW9ywgjjeLbt4x55eL0QTbOWjoklU2M733vEpOFjg_JrQCsvdti95dA-sk65iYIWiX0KMtkTCxLqANA8mfdCEVuyOGHFznr7ic"/>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-8 py-3 rounded-full font-label text-sm uppercase tracking-widest font-semibold transition-all ${
                cat.active 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-container-high text-stone-500 hover:bg-surface-container-highest'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid - Row 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {productsRow1.map((item, i) => (
          <div key={i} className="group">
             <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden transition-all group-hover:bg-surface-container-highest relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image}/>
                {item.badge && (
                  <div className="absolute top-4 left-4">
                     <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{item.badge}</span>
                  </div>
                )}
             </div>
             <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                   <h3 className="font-headline text-xl font-bold text-on-surface">{item.name}</h3>
                   <span className="text-primary font-bold font-label">{item.price}</span>
                </div>
                <p className="text-primary/80 text-xs font-bold flex items-center gap-1.5">
                   <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                   {item.insight}
                </p>
                <button className="w-full mt-4 bg-white border border-outline-variant/15 py-3.5 rounded-xl font-label text-sm tracking-wide text-stone-500 hover:bg-primary-container hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95">
                   <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                   Add to Bag
                </button>
             </div>
          </div>
        ))}
      </section>

      {/* AI Insight Banner */}
      <section className="my-20">
        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 wellness-glow relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
           <div className="p-4 bg-primary/10 rounded-2xl shrink-0 z-10">
              <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
           </div>
           <div className="flex-1 space-y-3 z-10">
              <h4 className="font-headline text-2xl font-bold text-on-surface">Curated by AI Insight</h4>
              <p className="text-stone-600 font-medium leading-relaxed">Your stress levels were peak on Tuesday; we recommend these calming adaptogens to balance your nervous system before your next heavy work cycle.</p>
           </div>
           <button className="bg-primary text-white px-8 py-4 rounded-xl font-label text-sm tracking-widest uppercase font-bold hover:scale-[0.98] transition-transform whitespace-nowrap shadow-lg shadow-primary/30 z-10">Explore Calming</button>
        </div>
      </section>

      {/* Product Grid - Row 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {productsRow2.map((item, i) => (
           <div key={i} className="group">
             <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden transition-all group-hover:bg-surface-container-highest relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image}/>
             </div>
             <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                   <h3 className="font-headline text-xl font-bold text-on-surface">{item.name}</h3>
                   <span className="text-primary font-bold font-label">{item.price}</span>
                </div>
                <p className="text-primary/80 text-xs font-bold flex items-center gap-1.5">
                   <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                   {item.insight}
                </p>
                <button className="w-full mt-4 bg-white border border-outline-variant/15 py-3.5 rounded-xl font-label text-sm tracking-wide text-stone-500 hover:bg-primary-container hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95">
                   <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                   Add to Bag
                </button>
             </div>
          </div>
        ))}
      </section>

      {/* Floating Action Button (Cart) */}
      <div className="fixed bottom-12 right-12 z-50 hidden md:block">
         <button className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center group hover:bg-primary transition-all duration-300 active:scale-95 border border-outline-variant/10">
            <span className="material-symbols-outlined text-stone-600 group-hover:text-white text-3xl transition-colors">shopping_bag</span>
            <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white"></span>
         </button>
      </div>
    </div>
  )
}
