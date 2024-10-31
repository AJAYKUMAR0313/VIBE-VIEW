'use client'; // Required for Client Component features

import React from 'react';
// import Link from 'next/link';

// const Navbar = () => {
//   return (
//     <nav className="bg-black text-white py-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/">
//           <a className="text-2xl font-bold text-red-500">VIBE VIEW</a>
//         </Link>
//         <div>
//           <Link href="/">
//             <a className="mx-4 hover:text-gray-300">Home</a>
//           </Link>
//           <Link href="/about">
//             <a className="mx-4 hover:text-gray-300">About</a>
//           </Link>
//           <Link href="/contact">
//             <a className="mx-4 hover:text-gray-300">Contact</a>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };
const Navbar = () => {
    return (
      <nav className="bg-transparent text-white fixed top-0 w-full p-4 z-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold">VIBE VIEW</h1>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition">Home</a>
          <a href="#" className="hover:text-gray-300 transition">About</a>
          <a href="#" className="hover:text-gray-300 transition">Contact</a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
// export default Navbar;
// import React from 'react';
// import Link from 'next/link';
// import styles from './Navbar.module.css'; // Create a CSS module for styling

// const Navbar = () => {
//     return (
//         <nav className={styles.navbar}>
//             <div className={styles.logo}>VIBE-VIEW</div>
//             <div className={styles.menu}>
//                 <Link href="/">Home</Link>
//                 <Link href="/about">About</Link>
//                 <Link href="/contact">Contact</Link>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
