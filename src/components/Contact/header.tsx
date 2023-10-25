import { MdOutlineKeyboardBackspace, MdOutlineMessage } from "react-icons/md";
import { hideContractform } from "../../utils/functions";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

const ContractHeader = () => {
  const [{}, dispatch] = useStateValue();
  return (
    <div className="w-full flex flex-row-reverse items-center bg-white justify-between px-4 py-2 cursor-pointer">
      <motion.div
        whileTap={{ scale: 0.8 }}
        onClick={() => hideContractform(dispatch)}
      >
        <MdOutlineKeyboardBackspace className="text-textColor text-2xl " />
      </motion.div>

      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 0.9 }}
        className="flex items-center justify-center gap-x-2 px-2"
      >
        <MdOutlineMessage className="text-xl cursor-pointer text-orange-600" />
        <span>CONTRACT US</span>
      </motion.div>
    </div>
  );
};

export default ContractHeader;
