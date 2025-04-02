"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useGlobalState } from "@/app/hooks/store/global-state";
import useProjectQuery from "@/app/hooks/queries/project-queries";
import ImageSlider from "@/app/components/common/img-slider/img-slider";
import { IMG, IProjectDetailData, Menu } from "@/app/types/types";

interface MenuItem {
  id: string;
  title: string;
  description: string;
}

const ProjectPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const { value: menuItems } = useGlobalState<Menu[]>("PROJECT_MENU");
  const [activeContent, setActiveContent] = useState<number>(0);
  const {
    projectMenuDetail,
    projectMenuDetailFilters: { menuId, setMenuId },
  } = useProjectQuery();

  const projectData = projectMenuDetail.data;

  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      setActiveMenu(0);
      setMenuId(menuItems[0].id);
    }
  }, [menuItems, setMenuId]);

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading menu items...
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-background">
      {/* Sidebar Navigation */}
      <div className="w-1/4 border-r border-gray-200/10 p-4 shadow-sm">
        <h1 className="text-xl font-bold mb-6 text-gray-800">
          Project Details
        </h1>
        <div className="space-y-4">
          {menuItems.map((item: MenuItem, index: number) => (
            <motion.div
              key={item.id}
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
                onClick={() => {
                  setMenuId(item.id);
                  setActiveMenu(index);
                }}
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

      <div className="w-3/4 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={menuId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-full w-full py-10 px-6 sm:px-10 lg:px-16 space-y-8"
          >
            {projectMenuDetail.error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                Error: {projectMenuDetail.error.message}
              </div>
            )}

            {projectMenuDetail.isPending && (
              <div className="flex items-center justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            )}

            {projectData && (
              <>
                {projectData.title && (
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-bold"
                  >
                    {projectData.title}
                  </motion.h1>
                )}
                {projectData.contents && (
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-bold"
                  >
                    {projectData.contents[activeContent].title}
                  </motion.h1>
                )}
                {projectData.img && <ImageSlider data={projectData.img} />}
                {projectData.contents && projectData.contents.length > 0 && (
                  <ImageSlider
                    activeIndex={activeContent}
                    setActiveIndex={setActiveContent}
                    data={projectData.contents.map((item) => item.img) as IMG[]}
                  />
                )}
                {/* {renderSampleContent(projectData)} */}
                {renderProjectContent(projectData, activeContent)}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const renderProjectContent = (
  projectData: IProjectDetailData,
  activeContent: number
): React.ReactNode => {
  if (projectData.contents && projectData.contents.length > 0) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          dangerouslySetInnerHTML={{
            __html: projectData.contents[activeContent].content,
          }}
        />
      </>
    );
  } else if (projectData.content) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        dangerouslySetInnerHTML={{
          __html: projectData.content,
        }}
      />
    );
  }

  return null;
};

// const renderSampleContent = (projectData: IProjectDetailData) => {
//   return <>d</>;
// };

export default ProjectPage;
