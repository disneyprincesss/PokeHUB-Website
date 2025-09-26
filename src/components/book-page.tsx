import { useState } from "react";

export default function Book() {
  const pages = [
    { right: "Front", left: "Page 1" },
    { right: "Page 2", left: "Page 3" },
    { right: "Page 4", left: "Page 5" },
    { right: "Page 6", left: "" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = pages.length;
  
  const isBookOpen = currentPage >= 1 && currentPage <= totalPages;

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="h-full flex justify-center items-center bg-amber-200">
      {/* Prev Button */}
      <div
        className={`mx-4 transition-transform duration-300 ${
          isBookOpen ? "-translate-x-64" : "translate-x-0"
        }`}
      >
        <button
          className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md hover:translate-y-0.5 transition-all duration-100"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          ◀
        </button>
      </div>

      {/* Book */}
      <div
        id="book"
        className={`w-120 h-150 flex justify-center items-center relative transition-transform duration-500 ${
          isBookOpen ? "translate-x-1/2" : "translate-x-0"
        }`}
      >
        {pages.map((page, index) => {
          const pageNumber = index + 1;

          const isFlipped =
            pageNumber < pages.length ? currentPage >= pageNumber : false;

          let z;
          if (pageNumber === currentPage) {
            // active page always on top
            z = totalPages;
          } else if (pageNumber < currentPage) {
            // pages before current → lower but unique
            z = pageNumber;
          } else {
            // pages after current → also lower but unique
            z = totalPages - (pageNumber - currentPage);
          }

          console.log(pageNumber, currentPage, z);
          return (
            <div
              key={index}
              className={`pages absolute left-0 top-0 w-full h-full transition-transform duration-700 ${
                isFlipped ? "flip" : ""
              }`}
              style={{
                zIndex: z,
              }}
            >
              <div className="page-right w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 z-1">
                <div className="w-full h-full flex justify-center items-center">
                  <h2 className="text-2xl font-bold">{page.right}</h2>
                </div>
              </div>
              <div className="page-left w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 border-l-4 border-amber-200 z-0">
                <div
                  className="w-full h-full flex justify-center items-center"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <h2 className="text-2xl font-bold">{page.left}</h2>
                </div>
              </div>
            </div>
          );
        })}

        {/* Page 1 */}
        {/* <div
          className={`pages absolute left-0 top-0 w-full h-full transition-transform duration-700 ${
            currentPage >= 1 ? "flip" : ""
          }`}
          style={{ zIndex: currentPage === 1 ? totalPages - currentPage : currentPage }}
        >
          <div className="page-right w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 z-1">
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-2xl font-bold">Front</h2>
            </div>
          </div>
          <div className="page-left w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 border-l-4 border-amber-200">
            <div
              className="w-full h-full flex justify-center items-center"
              style={{ transform: "rotateY(180deg)" }}
            >
              <h2 className="text-2xl font-bold">Page 1</h2>
            </div>
          </div>
        </div> */}

        {/* Page 2 */}
        {/* <div
          className={`pages absolute left-0 top-0 w-full h-full transition-transform duration-700 ${
            currentPage >= 2 ? "flip" : ""
          }`}
          style={{ zIndex: currentPage === 2 ? 2 : 1 }}
        >
          <div className="page-right w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 z-1">
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-2xl font-bold">Page 2</h2>
            </div>
          </div>
          <div className="page-left w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 border-l-4 border-amber-200">
            <div
              className="w-full h-full flex justify-center items-center"
              style={{ transform: "rotateY(180deg)" }}
            >
              <h2 className="text-2xl font-bold">Page 3</h2>
            </div>
          </div>
        </div> */}

        {/* Page 3 */}
        {/* <div
          className={`pages absolute left-0 top-0 w-full h-full transition-transform duration-700 ${
            currentPage > 3 ? "flip" : ""
          }`}
          style={{ zIndex: currentPage === 3 ? 1 : 0 }}
        >
          <div className="page-right w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 z-1">
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-2xl font-bold">Page 4</h2>
            </div>
          </div>
          <div className="page-left w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 border-l-4 border-amber-200">
            <div
              className="w-full h-full flex justify-center items-center"
              style={{ transform: "rotateY(180deg)" }}
            >
              <h2 className="text-2xl font-bold">Page 5</h2>
            </div>
          </div>
        </div> */}
      </div>

      {/* Next Button */}
      <div
        className={`mx-4 transition-transform duration-300 ${
          isBookOpen ? "translate-x-64" : "translate-x-0"
        }`}
      >
        <button
          className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md hover:translate-y-0.5 transition-all duration-100"
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
