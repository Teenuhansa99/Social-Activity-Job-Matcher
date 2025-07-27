'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01 z-[0]" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between items-center gap-8 relative z-[1]`}>

      <div className="container mx-auto flex justify-center items-center">
      <a href="/" className="inline-block bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-white/10 hover:border-white/20 px-6 py-2 rounded-lg transition-all duration-300 font-extrabold text-[24px] text-white leading-[30px]">
        PathFinder
      </a>
    </div>
    </div>
  </motion.nav>
);

export default Navbar;
