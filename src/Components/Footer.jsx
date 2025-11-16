import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="mt-10 border border-green-300 rounded-2xl">
      <footer className="footer sm:footer-horizontal flex items-center justify-between   p-10">
        <aside>
          <Link to="/" className="text-3xl font-bold text-green-500">
            Trackify
          </Link>
          <p>
            together, we can clean, protect, <br /> and transform our
            environment.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M18.901 1.153h3.66l-8.02 9.18 9.46 12.514H16.17l-5.214-6.817-5.96 6.817H1.332l8.56-9.81L.078 1.153h6.887l4.713 6.231 7.223-6.231zm-1.282 20.52h2.03L6.346 3.39H4.17l13.45 18.283z" />
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
      <div className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          Trackify
        </p>
      </div>
    </div>
  );
};

export default Footer;
