// // src/app/page.tsx

// 'use client';

// import { useState } from 'react';
// import AnalyzeButton from '@/components/AnalyzeButton'; // Absolute import
// import Spinner from '@/components/Spinner'; // Assuming you have a Spinner component
// import { useRouter } from 'next/navigation';
// import { useComments } from './CommentsContext';

// const Home: React.FC = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const router = useRouter();


//   const { setCommentsData } = useComments();
//   const handleAnalyze = async () => {
//     if (!youtubeLink) {
//       alert('Please enter a YouTube link.');
//       return;
//     }

//     setIsLoading(true); // Show loading state

//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//       const response = await fetch(`${API_URL}/analyze_comments`, { // Updated endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ video_url: youtubeLink }), // Adjusted payload key
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to analyze comments. Please try again.');
//       }

//       const data = await response.json();
//       console.log('Analysis Result:', data); // Print the output

//       // Optionally, navigate to the Results page with query parameters
//       const params = new URLSearchParams({ link: youtubeLink });
//       router.push(`/results?${params.toString()}`);
//        // Navigate with comments and predictions
//       const query = new URLSearchParams({
//         comments: JSON.stringify(data.comments),
//         predictions: JSON.stringify(data.predictions),
//       });
//       router.push(`/comments?${query.toString()}`);

//     } catch (error: unknown) {
//       console.error('Error analyzing the video:', error);
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-700 to-black flex flex-col justify-center items-center w-full relative">
//       {/* VIBE-VIEW Text */}
//       <div className="typing absolute top-4 left-4 text-6xl font-bold text-black">
//         VIBE-VIEW
//       </div>

//       {/* Navbar */}
//       <div className="absolute top-4 right-8 space-x-12 text-red-600 text-2xl">
//         <a href="/">Home</a>
//         <a href="#">About</a>
//         <a href="#">Contact</a>
//       </div>

//       {/* Input and Analyze Button Container */}
//       <div className="flex flex-col items-center justify-center">
//         <input
//           type="text"
//           value={youtubeLink}
//           onChange={(e) => setYoutubeLink(e.target.value)}
//           placeholder="Enter YouTube link"
//           className="border-2 border-black p-3 rounded-lg text-center mb-5 w-96"
//         />
//         <AnalyzeButton onClick={handleAnalyze} isLoading={isLoading} />
//       </div>

//       {/* Optional: Loading Spinner */}
//       {isLoading && (
//         <div className="absolute bottom-10">
//           <Spinner />
//         </div>
//       )}
//     </div>
  
//   );
  
// };

// export default Home;










'use client';

import { useState } from 'react';
import { useComments } from './CommentsContext';
import AnalyzeButton from '@/components/AnalyzeButton';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setCommentsData } = useComments();

  const handleAnalyze = async () => {
  // const response = await fetch('/api/analyze_comments', { /*...*/ });
  
    if (!youtubeLink) {
      alert('Please enter a YouTube link.');
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/analyze_comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: youtubeLink }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze comments. Please try again.');
      }
      const data = await response.json();
      console.log(data)
      console.log(data.comments,data.predictions)
      const comments=data.comments
      const predictions=data.predictions
      setCommentsData({ comments,predictions });

      
      // router.push('/allComments');
      // const data = await response.json();
      console.log('Analysis Result:', data);

      // Set comments data in context
      // setCommentsData(data);

      // Navigate with comments and predictions
      const query = new URLSearchParams({
        link: youtubeLink,
      });
      router.push(`/results?${query.toString()}`);
      
    } catch (error: unknown) {
      console.error('Error analyzing the video:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-700 to-black flex flex-col justify-center items-center w-full relative">
      {/* VIBE-VIEW Text */}
      <div className="typing absolute top-4 left-4 text-6xl font-bold text-black">
        VIBE-VIEW
      </div>

      {/* Navbar */}
      <div className="absolute top-4 right-8 space-x-12 text-red-600 text-2xl">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      {/* Input and Analyze Button Container */}
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="Enter YouTube link"
          className="border-2 border-black p-3 rounded-lg text-center mb-5 w-96"
        />
        <AnalyzeButton onClick={handleAnalyze} isLoading={isLoading} />
      </div>

      {/* Optional: Loading Spinner */}
      {isLoading && (
        <div className="absolute bottom-10">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Home;
