import { useState } from "react";
import { faq } from "../../data/dummy.js";
import Mini from "/home/mini.svg";
import Plus from "/home/plus.svg";
import "../../css/components/home/Faq.css";

const Faq = () => {
  // State to manage which FAQ is open
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Toggle function to open/close the FAQ item
  const toggleFaq = (index) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <div className="fq-outer">
      <div className="fq-inn">
        <h2 className="fq-h2">FAQs</h2>
        <div className="fq-inn-2">
          <h2 className="fq-inn-h2">View all</h2>
          <img src="/home/rightArrow.svg" alt="arrow" className="fq-inn-img" />
        </div>
      </div>
      {faq.map((item, index) => (
        <div key={index} className="fq-inn-out">
          <div className="fq-inn-inner" onClick={() => toggleFaq(index)}>
            <p className="fq-inn-inner-p">{item.question}</p>
            <img
              src={openFaqIndex === index ? Mini : Plus}
              alt="Toggle Icon"
              className="fq-inn-img"
            />
          </div>
          {openFaqIndex === index && <p className="fq-of-p">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default Faq;
