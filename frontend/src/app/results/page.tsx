'use client'; // Ensure this is the first line

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Chart from '../../components/Chart';
import CommentList from '../../components/CommentList';
import Spinner from '../../components/Spinner';
import Link from'next/link';
// import { motion } from 'framer-motion';

// Define TypeScript interfaces
interface SentimentDistribution {
  negative: number;
  neutral: number;
  positive: number;
}

interface AnalysisData {
  sentiment: SentimentDistribution;
  feedback: string;
}

interface VideoDetails {
  title: string;
  top_comments: string[];
}

const Results: React.FC = () => {
  const searchParams = useSearchParams();
  const link = searchParams.get('link');

  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!link) {
      setError('No YouTube link provided.');
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // Fetch analysis data
        const analysisResponse = await fetch('http://localhost:5000/analyze_comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ video_url: link }),
        });

        if (!analysisResponse.ok) {
          throw new Error('Failed to fetch analysis data.');
        }

        const analysis: AnalysisData = await analysisResponse.json();
        setAnalysisData(analysis);

        // Fetch video details (title and top comments)
        const detailsResponse = await fetch('http://localhost:5000/get_video_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ video_url: link }),
        });

        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch video details.');
        }

        const details: VideoDetails = await detailsResponse.json();
        setVideoDetails(details);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }

      }

      setIsLoading(false);
    };

    fetchResults();
  }, [link]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-700 to-black flex flex-col justify-center items-center w-full relative">
        <Spinner />
      </div>
    );
  }

  if (error && !analysisData && !videoDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-700 to-black flex flex-col justify-center items-center w-full relative">
        <div className="text-white text-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-700 to-black flex flex-col items-center w-full relative p-5">
      {/* VIBE-VIEW Text */}
      <div className="typing absolute top-4 left-4 text-6xl font-bold text-black">
        VIBE-VIEW
      </div>

      {/* Navbar */}
      <div className="absolute top-4 right-8 space-x-12 text-red-600 text-2xl">
        <a href="/">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      {/* Feedback Line */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {analysisData?.feedback}
        </h2>
      </div>

      {/* Video Title */}
      {videoDetails && (
        <div className="mt-4 text-center">
          <h3 className="text-2xl text-white">{videoDetails.title}</h3>
        </div>
      )}

      {/* Results Section */}
      <div className="results-section flex flex-col md:flex-row justify-center items-center mt-10 space-y-10 md:space-y-0 md:space-x-10">
        {/* Pie Chart */}
        {analysisData && <Chart sentiment={analysisData.sentiment} />}

        {/* Comment List */}
        {videoDetails && <CommentList comments={videoDetails.top_comments} />}
      </div>

      {/* Styling */}
      <style jsx>{`
        .results-section {
          width: 100%;
          max-width: 1200px;
        }
      `}</style>
      {/* Get All Comments Button */}
      <div className="mt-10">
        <Link href="/allComments">
          <button className="px-4 py-2 bg-red-950-500 text-white rounded-lg">
            Get All Comments
          </button>
        </Link>
      </div>

      {/* Styling */}
      <style jsx>{`
        .results-section {
          width: 100%;
          max-width: 1200px;
        }
      `}</style>
    </div>
  );
};

export default Results;
