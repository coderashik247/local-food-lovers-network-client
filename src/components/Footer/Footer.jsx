import logo from "../../assets/logo.jpg";
import Container from "../header/Container/Container";

const Footer = () => {
  return (
    <footer className="bg-green-900/90">
      <Container>
        <div className="foodContainer pt-16 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
              <img className="w-10 mb-3" src={logo} alt="Logo" />
              <a
                className="flex-none text-xl font-semibold text-white"
                href="#"
                aria-label="Brand"
              >
                Local Food Lovers Network
              </a>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Contact Us</h4>
              <div className="mt-3 grid space-y-3 text-gray-300">
                <p>
                  Food-surplus-saver Mirpur, Dhaka, Bangladesh Road, 1, Block C,
                  Section 11, Mirpur, Dhaka 1216
                </p>
                <p>Tax ID: 74-2227731</p>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Company</h4>
              <div className="mt-3 grid space-y-3">
                {["About us", "Blog", "Careers", "Customers"].map(
                  (item, idx) => (
                    <p
                      key={idx}
                      className="inline-flex gap-x-2 text-gray-300 hover:text-gray-200"
                    >
                      <a href="#">{item}</a>
                      {item === "Careers" && (
                        <span className="inline ml-1 text-xs bg-green-500 text-white py-1 px-2 rounded-md">
                          We're hiring
                        </span>
                      )}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="col-span-2">
              <h4 className="font-semibold text-gray-100">Stay up to date</h4>
              <form>
                <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-md p-2">
                  <div className="w-full">
                    <label htmlFor="hero-input" className="sr-only">
                      Email
                    </label>
                    <input
                      type="text"
                      id="hero-input"
                      name="hero-input"
                      className="py-2 px-4 block w-full border-transparent shadow-sm rounded-md focus:z-10 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <a
                    className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-green-500 hover:bg-green-600 border border-transparent text-white font-medium rounded-md transition py-2 px-4"
                    href="#"
                  >
                    Subscribe
                  </a>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Subscribe to our newsletter to get updates on our latest
                  offers!
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center bg-green-900 foodContainer">
          <p className="text-sm text-gray-300">
            © 2025 Local Food Lovers Network. All rights reserved.
          </p>

          <div className="flex gap-2">
            {/* Example social icons */}
            {["facebook", "twitter", "github", "linkedin"].map((icon, idx) => (
              <a
                key={idx}
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-200 hover:bg-white/10 rounded-md transition"
                href="#"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {/* Replace with proper icon paths */}
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
