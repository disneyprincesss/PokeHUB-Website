export default function Book() {
  let currentPage = 1;
  let totalPages = 5;
  let maxPages = totalPages + 1;

  const paper1 = document.getElementById("p1");
  const paper2 = document.getElementById("p2");
  const paper3 = document.getElementById("p3");
  const book = document.getElementById("book");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  const openBook = () => {
    book?.style.setProperty("transform", "translateX(50%)");
    prevButton?.style.setProperty("transform", "translateX(-250px)");
    nextButton?.style.setProperty("transform", "translateX(250px)");
  };
  const closeBook = (initialState: boolean) => {
    if (initialState) {
      book?.style.setProperty("transform", "translateX(0%)");
    } else {
      book?.style.setProperty("transform", "translateX(100%)");
    }
    prevButton?.style.setProperty("transform", "translateX(0%)");
    nextButton?.style.setProperty("transform", "translateX(0%)");
  };

  const prevPage = () => {
    if (currentPage > 1) {
      switch (currentPage) {
        case 2:
          closeBook(true);
          paper1?.classList.remove("flip");
          paper1?.style.setProperty("z-index", "3");
          break;
        case 3:
          paper2?.classList.remove("flip");
          paper2?.style.setProperty("z-index", "2");
          break;
        case 4:
          openBook();
          paper3?.classList.remove("flip");
          paper3?.style.setProperty("z-index", "1");
          break;
        default:
          throw new Error("unknown state");
      }
      currentPage--;
    }
  };

  const nextPage = () => {
    if (currentPage < maxPages) {
      switch (currentPage) {
        case 1:
          openBook();
          paper1?.classList.add("flip");
          paper1?.style.setProperty("z-index", "1");
          break;
        case 2:
          paper2?.classList.add("flip");
          paper2?.style.setProperty("z-index", "2");
          break;
        case 3:
          paper3?.classList.add("flip");
          paper3?.style.setProperty("z-index", "3");
          closeBook(false);
          break;
        default:
          throw new Error("unknown state");
      }
      currentPage++;
    }
  };

  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const totalPages = 5;

  return (
    <div className="h-full flex justify-center items-center bg-amber-200">
      <div id="prev-button" className="mx-4 z-5">
        <button
          className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md hover:translate-y-0.5 transition-all duration-100"
          // disabled={currentPage === 1}
          // onClick={() => setCurrentPage((p) => p - 1)}
          onClick={prevPage}
        >
          ◀
        </button>
      </div>
      <div
        id="book"
        className="w-120 h-150 flex justify-center items-center relative"
      >
        {/* Page 1 */}
        <div id="p1" className="pages absolute left-0 top-0 w-full h-full z-3">
          <div className="page-right w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 z-1">
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-2xl font-bold">Front</h2>
            </div>
          </div>
          <div className="page-left w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 border-l-4 border-amber-200">
            <div className="w-full h-full flex justify-center items-center transform -rotate-y-180">
              <h2 className="text-2xl font-bold">Page 1</h2>
            </div>
          </div>
        </div>
        {/* Page 2 */}
        <div id="p2" className="pages absolute left-0 top-0 w-full h-full z-2">
          <div className="page-right w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 z-1">
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-2xl font-bold">Page 2</h2>
            </div>
          </div>
          <div className="page-left w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 border-l-4 border-amber-200">
            <div className="w-full h-full flex justify-center items-center transform -rotate-y-180">
              <h2 className="text-2xl font-bold">Page 3</h2>
            </div>
          </div>
        </div>
        {/* Page 3 */}
        <div id="p3" className="pages absolute left-0 top-0 w-full h-full z-1">
          <div className="page-right w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 z-1">
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-2xl font-bold">Page 4</h2>
            </div>
          </div>
          <div className="page-left w-full h-full bg-emerald-600 absolute left-0 top-0 text-zinc-900 border-l-4 border-amber-200">
            <div className="w-full h-full flex justify-center items-center transform -rotate-y-180">
              <h2 className="text-2xl font-bold">Page 5</h2>
            </div>
          </div>
        </div>
      </div>
      <div id="next-button" className="mx-4 z-5">
        <button
          className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md  hover:translate-y-0.5 transition-all duration-100"
          // disabled={currentPage === totalPages}
          // onClick={() => setCurrentPage((p) => p + 1)}
          onClick={nextPage}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
