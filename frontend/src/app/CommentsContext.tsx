'use client';
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface CommentsContextType {
  comments: string[];
  predictions: string[];
  setCommentsData: Dispatch<SetStateAction<{ comments: string[]; predictions: string[] }>>;
}

const CommentsContext = createContext<CommentsContextType | null>(null);

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [commentsData, setCommentsData] = useState<{ comments: string[]; predictions: string[] }>({
    comments: [],
    predictions: []
  });

  return (
    <CommentsContext.Provider value={{ ...commentsData, setCommentsData }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  console.log('hello')
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};
