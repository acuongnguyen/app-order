import { PrevNext as PrevNextButtons, Title } from "..";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import { useEffect, useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { fetchFoodPopular } from "../../../utils/functions";
import { SingleFoodItem } from "../../FoodItem";
import { FoodItem } from "../../../../types";

const Fruits = () => {
  const fruits = FilterFood("chicken");
  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems, foodItemsPopular, loading }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      await fetchFoodPopular(dispatch);
    };

    fetchData();
  }, [dispatch]);

  if (loading || !foodItemsPopular) {
    return <div>Loading...</div>;
  }
  return (
    <section className="w-full my-5">
      <div className="w-full flex items-center justify-between mb-4">
        <Title title="Best Seller" />
        <PrevNextButtons
          onNext={() => setScrollValue(10000)}
          onPrev={() => setScrollValue(-10000)}
        />
      </div>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="inline-flex space-x-8 mt-4">
          {foodItemsPopular.map((food: FoodItem) => (
            <div key={food.id} className="w-64">
              <SingleFoodItem item={food} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fruits;
