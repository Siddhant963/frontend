import React from "react";

const AboutCafe = () => {
  return (
    <div className="w-full text-center font-serif py-10 px-5 ">
      <h1 className="text-4xl md:text-5xl font-bold text-amber-800">About Two Cup...</h1>

      <div className="w-full flex flex-col md:flex-row items-center justify-center py-8">
        {/* Image Section */}
        <div className="w-full md:w-5/12 lg:w-1/3 px-3 py-4">
          <img className="rounded-2xl w-full h-auto max-h-[500px] object-cover shadow-lg" 
               src="/img1.jpeg" alt="Two Cup Café" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-7/12 lg:w-2/3 px-5 py-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Welcome to Two Cup Café, where every sip tells a story and every bite brings comfort! 🍵☕
          </h2>
          <p className="font-sans font-semibold text-gray-700 mt-4">
            At Two Cup Café, we believe that great conversations start with a warm cup in hand. Whether you’re a chai lover, a coffee enthusiast, or someone looking for the perfect snack to pair with your drink, we’ve got something special for you.
          </p>

          <h5 className="mt-6 text-amber-800 text-xl md:text-2xl font-bold">What We Offer:</h5>
          <ul className="text-lg md:text-xl text-gray-800 mt-4 space-y-3">
            <li>✅ <b>Refreshing Chai & Aromatic Coffee</b> – From classic masala chai to rich espresso, we serve beverages that awaken your senses.</li>
            <li>✅ <b>Delicious Snacks & Combos</b> – Crispy samosas, buttery cookies, and irresistible sandwiches—perfect for any time of the day!</li>
            <li>✅ <b>Cozy Ambience</b> – A warm, inviting space to relax, work, or catch up with friends over a cup (or two!).</li>
          </ul>

          <p className="text-gray-700 mt-6">
            Whether you need a quick caffeine fix, a peaceful moment to yourself, or a place to unwind with loved ones, 
            <b> Two Cup Café </b> is the perfect destination. Come in, sip, and savor the flavors of happiness! ☕🍪💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCafe;
