"use client";

import DropdownMenu from "@/app/components/common/dropdown-menu/dropdown-menu";
import useProjectQuery from "@/app/hooks/queries/project-queries";
import { useGlobalState } from "@/app/hooks/store/global-state";
import Features from "@/app/pages/[project]/components/features";
import Overview from "@/app/pages/[project]/components/overview";
import { IMenu } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const renderMenu = (
  menu: IMenu[],
  setActiveMenu: (arg: string) => void,
  activeMenu: string,
  hoveredMenu: string | undefined,
  setHoveredMenu: (arg: string | undefined) => void,
  isCollapsed: boolean,
  setIsCollapsed: (arg: boolean) => void,
  isDropdownOpen: boolean,
  setIsDropdownOpen: (arg: boolean) => void,
  handleRouteChange: () => void
) => {
  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="sm:hidden px-6 py-4 flex justify-start items-center gap-4">
        <DropdownMenu
          labelProps={{
            text: "Menu",
            className: "p-4 py-2 text-lg font-semibold text-orange-400",
          }}
          itemProps={{
            className:
              "py-4 px-4 text-md cursor-pointer hover:!text-orange-400",
          }}
          menu={menu}
          handleChange={setIsDropdownOpen}
          footer={
            <>
              <Separator className="my-1" />
              <div className="flex items-center gap-2 h-14">
                <Button
                  className="w-full h-full"
                  variant={"ghost"}
                  onClick={handleRouteChange}
                >
                  <ArrowLeft />
                </Button>
                <Separator orientation="vertical" className="h-[2rem]" />
                <Button className="w-full h-full" variant={"ghost"}>
                  <X />
                </Button>
              </div>
            </>
          }
        >
          <Button variant={"outline"} className="size-14 cursor-pointer">
            {isDropdownOpen ? <X /> : <Menu />}
          </Button>
        </DropdownMenu>
        <motion.p className="text-3xl">{"Project Detail"}</motion.p>
      </div>
      {/* sidebar */}
      <motion.div
        className={cn(
          "border-r border-muted-foreground/10 flex flex-col",
          "transition-all duration-500 ease-in-out",
          isCollapsed ? "md:w-16 xl:w-16" : "min-w-fit",
          "hidden sm:block"
        )}
        animate={{ width: isCollapsed ? "4rem" : "20%" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={cn(
            "flex justify-between w-full  ",
            isCollapsed
              ? "flex-col justify-between items-center p-4 gap-2 py-2 h-fit"
              : "flex-row px-4 p-4"
          )}
        >
          <Button
            variant={"ghost"}
            className={cn(
              "bg-background rounded-full size-14",
              isCollapsed && "rounded-sm"
            )}
            onClick={handleRouteChange}
          >
            <ChevronLeft />
          </Button>
          {isCollapsed && <Separator />}
          <Button
            variant={"ghost"}
            className={cn(
              "bg-background rounded-full size-14",
              isCollapsed && "rounded-sm"
            )}
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ArrowRightToLine /> : <ArrowLeftToLine />}
          </Button>
        </motion.div>

        {menu?.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onMouseEnter={() => setHoveredMenu(item.id)}
              onMouseLeave={() => setHoveredMenu(undefined)}
              onClick={() => {
                setActiveMenu(item.id);
              }}
              className={cn(
                "relative first-letter:w-full min-w-full py-4 px-4 text-md ",
                "hover:bg-muted-foreground/10 transition-all duration-500 cursor-pointer",
                "flex-col gap-2 flex items-start justify-center",
                "border-y border-muted-foreground/10",
                "hover:text-orange-400",
                isCollapsed && "items-center px-2",
                (hoveredMenu === item.id || activeMenu === item.id) &&
                  "text-orange-400"
              )}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    hoveredMenu === item.id || activeMenu === item.id
                      ? "100%"
                      : "0%",
                }}
                className={cn(
                  "w-full h-[0.5px] bg-orange-400 absolute bottom-0 left-0",
                  hoveredMenu === item.id ? "w-full" : "w-0"
                )}
              ></motion.div>
              {/* Wrap both items in a container */}
              <div
                className={cn(
                  "flex flex-col relative",
                  isCollapsed && "items-center"
                )}
              >
                <motion.span
                  initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                  animate={{
                    opacity: 1,
                    y:
                      (hoveredMenu === item.id || activeMenu === item.id) &&
                      !isCollapsed
                        ? -10
                        : 0,
                    filter: "blur(0px)",
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    isCollapsed && "text-center overflow-hidden",
                    "whitespace-nowrap"
                  )}
                >
                  {isCollapsed ? (
                    <motion.span
                      dangerouslySetInnerHTML={{
                        __html: item.icon,
                      }}
                    ></motion.span>
                  ) : (
                    item.title
                  )}
                </motion.span>
                {(hoveredMenu === item.id || activeMenu === item.id) &&
                  !isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-xs text-nowrap"
                    >
                      {item.description}
                    </motion.span>
                  )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

const renderContent = (
  projectDetailHook: ReturnType<typeof useProjectQuery>
) => {
  const {
    projectMenuDetail: { data, isPending, isError, error },
  } = projectDetailHook;
  return (
    <>
      <motion.div className="w-full px-8 py-9">
        {isPending && <p>Loading...</p>}
        {isError && <p className="text-red-600">Error: {error?.message}</p>}
        {data?.content && <Overview data={data.content} />}
        {data?.contents && <Features data={data.contents} />}
        {data?.stacks && <div></div>}
      </motion.div>
    </>
  );
};

const DetailProject = () => {
  const { value: menuItems } = useGlobalState<IMenu[]>("PROJECT_MENU");
  const projectDetailHook = useProjectQuery();
  const router = useRouter();
  const [hoveredMenu, setHoveredMenu] = useState<string | undefined>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    projectMenuDetail,
    projectMenuDetailFilters: { menuId, setMenuId },
  } = projectDetailHook;
  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      setMenuId(menuItems[0].id);
    }
  }, [menuItems, setMenuId]);

  const handleRouteChange = () => {
    router.back();
  };

  useEffect(() => {
    console.log("project Menu detail : ", projectMenuDetail.data);
  }, [projectMenuDetail.data]);

  return (
    <div className="flex flex-col sm:flex-row  w-full h-full bg-background">
      {renderMenu(
        menuItems ?? [],
        setMenuId,
        menuId ?? "",
        hoveredMenu,
        setHoveredMenu,
        isCollapsed,
        setIsCollapsed,
        isDropdownOpen,
        setIsDropdownOpen,
        handleRouteChange
      )}
      {renderContent(projectDetailHook)}
    </div>
  );
};
export default DetailProject;
