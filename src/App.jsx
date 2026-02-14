import { useState } from "react";
import classNames from "classnames";
import "./App.css";
import "./falling_stars.css";

import Foto1 from "./assets/Foto1.jpg";
import Foto2 from "./assets/Foto2.jpg";
import Foto3 from "./assets/Foto3.jpg";
import Foto4 from "./assets/Foto4.jpg";
import Foto5 from "./assets/Foto5.jpg";
import Foto6 from "./assets/Foto6.jpg";
import Foto7 from "./assets/Foto7.jpg";
import Foto8 from "./assets/Foto8.jpg";
import Foto9 from "./assets/Foto9.jpg";
import Foto10 from "./assets/Foto10.jpg";

// Structure:
// Sheet 0: Front=Cover, Back=Page 1
// Sheet 1: Front=Page 2, Back=Page 3
// ...
// Sheet 5: Front=Page 10, Back=Page 11
// Sheet 6: Front=Page 12, Back=Back Cover
const TOTAL_PAGES = 12;
const TOTAL_SHEETS = 7;

function App() {
  const [flippedIndex, setFlippedIndex] = useState(0);
  const [images, setImages] = useState([
    null,
    null, // Cover and Page 1 (Dedication)
    Foto1,
    Foto2,
    Foto3,
    Foto4,
    Foto5,
    Foto6,
    Foto7,
    Foto8,
    Foto9,
    Foto10,
    null, // Page 12
    null, // Page 12
  ]);

  const [fallingStars] = useState(() =>
    Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 120 - 20 + "%", // Start wider on left (-20% to 100%)
      top: Math.random() * -100 - 50 + "px",
      animationDuration: Math.random() * 5 + 4 + "s", // Slower: 4 to 9s
      animationDelay: Math.random() * 5 + "s",
    })),
  );

  const handleNext = () => {
    if (flippedIndex < TOTAL_SHEETS) {
      setFlippedIndex(flippedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (flippedIndex > 0) {
      setFlippedIndex(flippedIndex - 1);
    }
  };

  const handleImageUpload = (pageIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[pageIndex] = url;
      setImages(newImages);
    }
  };

  const renderSheet = (i) => {
    const isFlipped = i < flippedIndex;
    const zIndex = isFlipped ? i : TOTAL_SHEETS - i;

    // Determine content for Front and Back of the sheet
    let frontType, backType;
    let frontPageNum = null,
      backPageNum = null;

    if (i === 0) {
      frontType = "cover";
      backType = "page";
      backPageNum = 1;
    } else if (i === TOTAL_SHEETS - 1) {
      // i=6
      frontType = "page";
      frontPageNum = 12;
      backType = "back-cover";
    } else {
      frontType = "page";
      backType = "page";
      // i=1 -> Front=P2, Back=P3
      // i=2 -> Front=P4, Back=P5
      // ...
      frontPageNum = 2 * i;
      backPageNum = 2 * i + 1;
    }

    const canUploadFront = frontPageNum >= 2 && frontPageNum <= 11;
    const canUploadBack = backPageNum >= 2 && backPageNum <= 11;

    return (
      <div
        key={i}
        className={classNames("sheet", { flipped: isFlipped })}
        style={{ zIndex }}
        onClick={() => {
          if (!isFlipped && i === flippedIndex) {
            handleNext();
          } else if (isFlipped && i === flippedIndex - 1) {
            handlePrev();
          }
        }}
      >
        {/* FRONT SIDE */}
        <div
          className={classNames("page front", {
            "cover-page": frontType === "cover",
          })}
        >
          <div className="page-content">
            {frontType === "cover" ? (
              <div className="cover-design">
                <h1>Nuestros recuerdos</h1>
                <div className="moon-icon">🌙</div>
              </div>
            ) : (
              <>
                <div className="page-number">{frontPageNum}</div>
                <div className="content-area">
                  {images[frontPageNum] ? (
                    <img
                      src={images[frontPageNum]}
                      alt={`Page ${frontPageNum}`}
                      className="uploaded-image"
                    />
                  ) : canUploadFront ? (
                    <label className="upload-btn">
                      Choose Image
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(frontPageNum, e)}
                        accept="image/*"
                      />
                    </label>
                  ) : (
                    <div className="placeholder-text">
                      {frontPageNum === 12 ? (
                        <div className="dedication">
                          <p>
                            Todas estas fotos simbolizan parte de nuestro
                            crecimiento, nuestra vida, y nuestro futuro, espero
                            que me sigas acompañando en cada paso que demos, y
                            que siempre estemos con amor. Como las palabras no
                            bastan para demostrar mi amor a ti, espero que esto
                            si sea capaz de hacerlo una parte. Te amo demasiado
                          </p>
                        </div>
                      ) : (
                        `Página ${frontPageNum}`
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className={classNames("page back", {
            "cover-page": backType === "back-cover",
          })}
        >
          <div className="page-content">
            {backType === "back-cover" ? (
              <div className="cover-design back-cover">
                <h1>Fin</h1>
                <div className="heart-icon">💖</div>
              </div>
            ) : (
              <>
                <div className="page-number">{backPageNum}</div>
                <div className="content-area">
                  {images[backPageNum] ? (
                    <img
                      src={images[backPageNum]}
                      alt={`Page ${backPageNum}`}
                      className="uploaded-image"
                    />
                  ) : canUploadBack ? (
                    <label className="upload-btn">
                      Choose Image
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(backPageNum, e)}
                        accept="image/*"
                      />
                    </label>
                  ) : (
                    <div className="placeholder-text">
                      {backPageNum === 1 ? (
                        <div className="dedication">
                          <h2>Para ti ❤️</h2>
                          <p>
                            Este pequeño libro es para conmemorar todos los
                            recuerdos que nos han llevado a que el día de hoy
                            celebremos este día como una pareja que se quiere y
                            ven al futuro. Y que a su vez, puedas ver parte de
                            los recuerdos que me hacen amarte tanto como lo
                            hago, y seguirte amando tanto como lo amo, disfruta
                            :3
                          </p>
                        </div>
                      ) : (
                        `Página ${backPageNum}`
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="stars"></div>
      <div className="falling-stars-container">
        {fallingStars.map((style, i) => (
          <div key={i} className="falling-star" style={style}></div>
        ))}
      </div>
      <div className="book-container">
        <div className="book">
          {Array.from({ length: TOTAL_SHEETS }).map((_, i) => renderSheet(i))}
        </div>
      </div>

      <div className="controls">
        <button onClick={handlePrev} disabled={flippedIndex === 0}>
          Anterior
        </button>
        <div className="pagination">
          {flippedIndex === 0
            ? "Portada"
            : flippedIndex === TOTAL_SHEETS
              ? "Contraportada"
              : `Hojear ${flippedIndex}`}
        </div>
        <button onClick={handleNext} disabled={flippedIndex === TOTAL_SHEETS}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;
