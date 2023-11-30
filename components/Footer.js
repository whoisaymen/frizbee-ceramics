import Image from "next/image";

const navigation = {
  footer: [
    { name: "Professionals", href: "#" },
    { name: "Stores", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
  ],
  socials: [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
  ],
  header: [
    { name: "Shop", href: "#" },
    { name: "Projects", href: "#" },
    { name: "About", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    // <div className='relative max-w-7xl mx-auto border border-black my-6'>
    // 	<div className='bg-black bg-cover bg-no-repeat bg-center relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'></div>
    // 	<div className='relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40'>
    // 		<div className='pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32'>Test 2</div>
    // 		{/* bg-[url('/images/gradientSvg.svg')] */}
    // 	</div>
    // </div>
    <footer
      className="bg-gradient-to-b from-gray-100 bg-white lg:from-white font-light tracking-tight fixed left-0 right-0 z-50 bottom-[29px] h-[35px] hidden md:block"
      aria-labelledby="footer-heading"
    >
      {/* <div className="md:hidden border-t border-black border-b">
        <span className="sr-only">Frizbee Ceramics</span>
        <Image
          src="/images/comics.png"
          height={1000}
          width={1000}
          className="w-auto mx-auto z-50"
          alt="Frizbee Ceramics logo"
          style={{
            maxWidth: "100%",
            height: "auto"
          }}></Image>
      </div> */}

      <div className="px-4 lg:px-0">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="mx-auto border-t border-b border-black">
          <div className="lg:flex uppercase justify-between">
            <div className="flex justify-between items-center lg:w-1/2 pl-4">
              <div>
                <ul role="list" className="space-y-0">
                  {/* {navigation.socials.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-black hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))} */}
                  <li className="uppercase text-sm leading-6 text-gray-900">
                    Shipping & Return policy
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 border-l border-black flex items-center justify-between -mt-[1px] -mb-[1px]">
              <h3 className="text-sm leading-6 text-gray-900 w-1/2 pl-4">
                Subscribe to our newsletter
              </h3>
              <form className="sm:flex sm:max-w-md sm:w-1/2">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="min-w-0 text-sm font-light appearance-none border border-black bg-white px-3 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  w-full uppercase"
                  placeholder="Enter your email"
                />
                <div className="mt-4 sm:mt-0 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center bg-black px-3 py-2 text-sm text-white shadow-sm hover:bg-white hover:text-black uppercase"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="mt-6 sm:mt-20 md:flex md:items-center md:justify-between">
            <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0 pb-2">
              &copy; 2023 Frizbee Ceramics. All rights reserved.
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
