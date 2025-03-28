"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Check } from "lucide-react";
import SectionContainer from "@/app/components/container/section-container";

interface MenuProps {
  title: string;
  description: string;
  content: () => React.ReactNode;
}

const menu: MenuProps[] = [
  {
    title: "Project Overview",
    description: "Comprehensive project insights",
    content: () => (
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Project Overview
        </h2>
        <p className="text-gray-600">
          {` Detailed summary of the project's scope, objectives, and key
          milestones.`}
        </p>
      </div>
    ),
  },
  {
    title: "Technical Stack",
    description: "Technologies and frameworks",
    content: () => (
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Technical Stack
        </h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <Check className="mr-2 text-green-500" size={20} />
            Frontend: React, Next.js
          </li>
          <li className="flex items-center">
            <Check className="mr-2 text-green-500" size={20} />
            Styling: Tailwind CSS
          </li>
          <li className="flex items-center">
            <Check className="mr-2 text-green-500" size={20} />
            State Management: React Hooks
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Design Approach",
    description: "UI/UX methodology",
    content: () => (
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Design Approach
        </h2>
        <p className="text-gray-600">
          Our design philosophy focuses on user-centric interfaces and intuitive
          interactions.
        </p>
      </div>
    ),
  },
  {
    title: "Performance",
    description: "Optimization strategies",
    content: () => (
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Performance Metrics
        </h2>
        <p className="text-gray-600">
          Insights into application performance, loading times, and optimization
          techniques.
        </p>
      </div>
    ),
  },
];

const ProjectPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  // Ensure activeMenu is only set on the client
  useEffect(() => {
    setActiveMenu(0);
  }, []);

  return (
    <SectionContainer className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-200 p-4 shadow-sm">
        <h1 className="text-xl font-bold mb-6 text-gray-800">
          Project Details
        </h1>
        <div className="space-y-4">
          {menu.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`cursor-pointer p-3 rounded-lg transition-all group ${
                  activeMenu === index
                    ? "bg-teal-500/10 text-teal-700"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveMenu(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight
                    className={`text-gray-400 transition-transform group-hover:translate-x-1 ${
                      activeMenu === index ? "text-teal-500" : ""
                    }`}
                    size={20}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-3/4 p-8">
        <AnimatePresence mode="wait">
          {activeMenu !== null && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {menu[activeMenu]?.content()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
};

export default ProjectPage;
