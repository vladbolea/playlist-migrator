import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useEffect } from 'react';

// import Image1 from '../static/loader/1.webp';
// import Image2 from '../static/loader/2.webp';
// import Image3 from '../static/loader/3.webp';
// import Image4 from '../static/loader/4.webp';
// import Image5 from '../static/loader/5.webp';
// import Image6 from '../static/loader/6.webp';

// const container = {
//   show: {
//     transition: {
//       staggerCildren: 0.35,
//     },
//   },
// };

// const item = {
//   hidden: {
//     opacity: 0,
//     y: 200,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       ease: [0.6, 0.01, -0.05, 0.95],
//       duration: 1.6,
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: -200,
//     transition: {
//       ease: 'easeInOut',
//       duration: 0.8,
//     },
//   },
// };

// const Loader: FC = ({ setLoading }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 4000);
//     return clearTimeout(timer);
//   });

//   return (
//     <div className="">
//       <motion.div
//         variants={container}
//         initial="hidden"
//         animate="show"
//         exit="exit"
//       >
//         <div className="absolute left-5 top-7">
//           <ImageBlock
//             variants={item}
//             src={Image1}
//             dimension={250}
//             delay={0.25}
//           />
//         </div>
//         <div className="absolute right-10 top-3">
//           <ImageBlock
//             variants={item}
//             src={Image2}
//             dimension={210}
//             delay={1.25}
//           />
//         </div>
//         <div className="absolute right-0 bottom-16">
//           <ImageBlock
//             variants={item}
//             src={Image3}
//             dimension={300}
//             delay={0.5}
//           />
//         </div>
//         <div className="absolute left-0 bottom-0">
//           <ImageBlock variants={item} src={Image4} dimension={280} delay={1} />
//         </div>
//         <div className="absolute -left-[70px] top-1/3">
//           <ImageBlock
//             variants={item}
//             src={Image5}
//             dimension={320}
//             delay={0.75}
//           />
//         </div>
//         <div className="absolute left-1/2 top-1/3">
//           <ImageBlock
//             variants={item}
//             src={Image6}
//             dimension={370}
//             delay={1.5}
//           />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Loader;

export const ImageBlock = ({ src, dimension, variants, delay }: any) => (
  <motion.div
    animate={{
      scale: 0.5,
      transition: {
        duration: 1,
        delay,
      },
    }}
    variants={variants}
  >
    {/* <Image src={src} width={dimension} height={dimension} alt={src} /> */}
  </motion.div>
);
