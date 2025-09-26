
import Book from "../components/book";
import BookPage from "../components/book-page";
import Navbar from "../components/navbar";

export default function BattlePage() {
  return (
      <main className="relative w-full">
          <Navbar />
          <div className="bg-[url('/image/library-bg.gif')] h-screen bg-cover bg-center flex flex-col justify-center items-center overflow-auto">
              <BookPage />
              {/* <Book/> */}
          </div>
    </main>
  );
}
