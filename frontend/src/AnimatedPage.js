import {motion} from "framer-motion";

const animation = {
  initial: {opacity: 0, y: 100},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: -100}
}
const AnimatedPage = ({children}) => {

  return (
    <motion.div  className="" variants={animation} initial="initial" animate="animate" exit="exit" transition={{duration: 0.3}}>
      {children}
    </motion.div>
  );
}
export default AnimatedPage;