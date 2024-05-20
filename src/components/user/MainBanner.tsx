import Nav from "./Nav"

function MainBanner() {
    return (
        <>
          <Nav/>
          <section className="relative bg-[url(/public/assets/images/banner.jpg)] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
              <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                <h1 className="text-3xl font-extrabold sm:text-5xl text-admin">Expert Care for 
                  <strong className="block font-extrabold text-adminBlue"> Your Health. </strong>
                </h1>
                <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                Trust our experienced doctors for personalized treatment tailored to your needs. From routine check-ups to specialized care, we're here to keep you healthy.
                </p>
          
                <div className="mt-8 flex flex-wrap gap-4 text-center">
                <button className="block w-full rounded bg-adminBlue px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                    Get Started
                  </button>
          
                  <button className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )
}

export default MainBanner
