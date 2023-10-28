import { PrevNext as PrevNextButtons, Title } from "..";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";

const Fruits = () => {
  const fruits = FilterFood("chicken");
  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems }, dispatch] = useStateValue();
  return (
    <section className="w-full my-5">
      <div className="w-full flex items-center justify-between">
        <Title title="Best Seller" />
        <PrevNextButtons
          onNext={() => setScrollValue(10000)}
          onPrev={() => setScrollValue(-10000)}
        />
      </div>
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={fruits}
      />
    </section>
  );
};

export default Fruits;
