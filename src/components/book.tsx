export default function Book() {
  return (
    <main className="bg-[url('/image/library-bg.gif')] bg-cover bg-center w-full h-screen flex items-center justify-center">
      <div className="container">
        <div className="sprite-wrapper">
          <div className="book">
            <div className="carousel --slides-4">
              <div className="sprite"></div>
              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p>
                        🧩 Overview This project is a pure CSS-based dynamic
                        interactive book that simulates page-flipping animations
                        using cutting-edge features available in modern Chrome
                        (134–135+). It seamlessly combines several powerful CSS
                        technologies to create a fully scrollable, sprite-driven
                        animated experience resembling a book with turning
                        pages.
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      <p>🚀 Core Features</p>
                      <p>📚 Book-like Page Flipping</p>
                      <p>
                        Each "slide" or section of the book corresponds to a
                        virtual page. The animation mimics a realistic flipping
                        effect using sprite sheets and scroll-driven animations.
                      </p>
                      <p>🔧 Technologies Used</p>
                      <ul>
                        <li>Scroll Snap</li>
                        <li>View Timeline + Scroll Timeline</li>
                        <li>Sprite Sheets (mod, round)</li>
                        <li>Dynamic Sizing</li>
                        <li>Dynamic Sprite Calculation</li>
                      </ul>
                      <p>🧠 Dynamic Behavior</p>
                      <p>
                        All animations are automatically adjusted when changing
                        the number of slides via the --slides variable. Frame
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p>
                        count, sprite layout, and total animation length adapt
                        based on user-defined CSS variables. The animation is
                        responsive to scroll progress using scroll-timeline and
                        is scoped per element using timeline-scope.
                      </p>
                      <p>🖼️ Visual Layers</p>
                      <p>
                        The book page uses a layered sprite system: One sprite
                        sheet per page flip animation Positioned and animated
                        via background-image The correct frame is selected based
                        on scroll or button input
                      </p>
                      <p>🧪 Browser Support</p>
                      <p>
                        Requires Chrome 134+ for experimental CSS features like
                        scroll-timeline, animation-timeline, ::scroll-button,
                        and ::scroll-marker Best viewed with flags enabled or
                        origin trials if needed
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      <p>📦 Use Cases</p>
                      <p>
                        Digital storytelling Visual novels Portfolio
                        presentations Interactive learning materials
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis qui quibusdam suscipit unde velit veritatis
                        vitae voluptas? Aliquid deleniti deserunt dolorem
                        expedita id in iusto libero maiores minima molestiae
                        natus non odio perferendis placeat provident quae
                        quaerat qui quidem reiciendis, rem repellendus sit sunt
                        tempore unde vero vitae voluptatum. Earum ipsum rem
                        tempora voluptas? Debitis eaque, labore natus sit
                        voluptatem voluptatum. Asperiores assumenda autem
                        consequatur deleniti eligendi magnam natus nihil quidem
                        repudiandae, soluta veniam voluptates. Eaque eveniet sed
                        sunt voluptas.
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      <p>🚀 Core Features</p>
                      <p>📚 Book-like Page Flipping</p>
                      <p>
                        Each "slide" or section of the book corresponds to a
                        virtual page. The animation mimics a realistic flipping
                        effect using sprite sheets and scroll-driven animations.
                      </p>
                      <p>🔧 Technologies Used</p>
                      <ul>
                        <li>Scroll Snap</li>
                        <li>View Timeline + Scroll Timeline</li>
                        <li>Sprite Sheets (mod, round)</li>
                        <li>Dynamic Sizing</li>
                        <li>Dynamic Sprite Calculation</li>
                      </ul>
                      <p>🧠 Dynamic Behavior</p>
                      <p>
                        All animations are automatically adjusted when changing
                        the number of slides via the --slides variable. Frame
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="page-container">
                  <div className="page left-page">
                    <div>
                      <p>
                        🧩 Overview This project is a pure CSS-based dynamic
                        interactive book that simulates page-flipping animations
                        using cutting-edge features available in modern Chrome
                        (134–135+). It seamlessly combines several powerful CSS
                        technologies to create a fully scrollable, sprite-driven
                        animated experience resembling a book with turning
                        pages.
                      </p>
                    </div>
                  </div>
                  <div className="page right-page">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nobis qui quibusdam suscipit unde velit veritatis vitae
                      voluptas? Aliquid deleniti deserunt dolorem expedita id in
                      iusto libero maiores minima molestiae natus non odio
                      perferendis placeat provident quae quaerat qui quidem
                      reiciendis, rem repellendus sit sunt tempore unde vero
                      vitae voluptatum. Earum ipsum rem tempora voluptas?
                      Debitis eaque, labore natus sit voluptatem voluptatum.
                      Asperiores assumenda autem consequatur deleniti eligendi
                      magnam natus nihil quidem repudiandae, soluta veniam
                      voluptates. Eaque eveniet sed sunt voluptas.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
