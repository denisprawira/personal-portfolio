import { db } from "@/app/firebase/config";
import { IProjectDetailData, Project } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";

export enum ProjectQueries {
  PROJECT_LIST = "projects",
  PROJECT_MENU_DETAIL = "project-menu-detail",
}

const fetchProjects = async () => {
  const collectionRef = collection(db, "projects");
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map((item) => item.data() as Project);
};

const fetchMenuDetail = async (menuId: string) => {
  const collectionRef = doc(db, "project_details", menuId);
  const querySnapshot = await getDoc(collectionRef);
  return querySnapshot.data() as IProjectDetailData;
};

const useProjectQuery = () => {
  const [menuId, setMenuId] = useState<string>();

  const projectList = useQuery({
    queryKey: [ProjectQueries.PROJECT_LIST],
    queryFn: fetchProjects,
  });

  const projectMenuDetail = useQuery({
    queryKey: [ProjectQueries.PROJECT_MENU_DETAIL, menuId],
    queryFn: () => fetchMenuDetail(menuId!),
    enabled: !!menuId,
  });

  return {
    projectList,
    projectMenuDetail,
    projectMenuDetailFilters: {
      menuId,
      setMenuId,
    },
  };
};

export default useProjectQuery;
