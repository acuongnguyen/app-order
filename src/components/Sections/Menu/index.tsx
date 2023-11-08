import { useEffect, useState } from "react";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";
import { fetchCategory, fetchFoodData } from "../../../utils/functions";

const Menu = ({ title }: { title?: string }) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems, categories }, dispatch] = useStateValue();
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (!filter && categories && categories.length > 0) {
      setFilter(categories[0].id);
    }
  }, [categories]);


  useEffect(() => {
    // Fetch dữ liệu mỗi khi filter thay đổi
    if (filter) {
      fetchFoodData(dispatch, filter);
    }
  }, [filter, dispatch]);
  return (
    <section className="w-full my-5">
      <Filters filter={filter} setFilter={setFilter} />
      <Container
        className="bg-containerbg "
        col
        scrollOffset={scrollValue}
        items={FilterFood(filter)}
      />
    </section>
  );
};

export default Menu;
