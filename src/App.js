import "./styles.css";
import { useState, useEffect, Fragment } from "react";
import { useAnimate, stagger, motion } from "framer-motion";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function UseMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

const itemsList = [
  { ele: "Item 1", id: 1 },
  { ele: "Item 2", id: 2 },
  { ele: "Item 3", id: 3 },
  { ele: "Item 4", id: 4 },
  { ele: "Item 5", id: 5 },
];
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isValue, setValue] = useState({ ele: "Menu" });
  const scope = UseMenuAnimation(isOpen);

  const handleSubmit = (listId) => {
    const filterData = itemsList.find((ele) => ele.id === listId);
    setValue(filterData);
    setIsOpen(false);
  };

  return (
    <Fragment>
      <nav className="menu" ref={scope}>
        <div
          style={{
            position: "fixed",
            bottom: -210,
            left: 200,
            width: 100,
            height: 100,
            background: "white",
          }}
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isValue.ele}
          <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </div>
        </motion.button>
        <ul
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            clipPath: "inset(10% 50% 90% 50% round 10px)",
          }}
        >
          {itemsList.map(({ ele, id }) => (
            <li style={{ cursor: "pointer" }} onClick={() => handleSubmit(id)}>
              {ele}{" "}
            </li>
          ))}
        </ul>
      </nav>
    </Fragment>
  );
}
