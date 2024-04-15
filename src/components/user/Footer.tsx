
function Footer() {
  return (
    <div className="bg-footer text-white p-24 ">
    <div className="max-w-6xl  mx-auto flex flex-wrap justify-evenly items-center">
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
       <img src="/src/assets/images/Mediheal.png" alt="" />
      </div>
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h3 className="text-xl font-semibold mb-4">ABOUT US</h3>
        <p className="text-zinc-400 mb-4">Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor cergelit rgh.</p>
        <p className="text-zinc-400">Lorem ipsum dolor sit amet, adipiscing elit.</p>
      </div>
      <div className="w-full md:w-1/3 mb-16">
        <h3 className="text-xl font-semibold mb-4">+564 7885 3222</h3>
        <p className="text-zinc-400 mb-4">youremail@gmail.com</p>
        <div className="flex">
          <input type="text" className="p-2 bg-zinc-700 text-white w-full rounded-l-lg focus:outline-none" placeholder="Your email" />
          <button className="bg-blue-600 p-2 rounded-r-lg text-white">Send</button>
        </div>
      </div>
        <hr className="w-full border-t border-gray-300 mb-4 mt-28"/>
        <p className="text-zinc-400">&copy; 2024 All rights reserved | This template is made with by Colorlib</p>
    </div>
  </div>
  )
}

export default Footer
