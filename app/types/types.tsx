export type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  stacks: string[];
  menu: Menu[];
};

export type Menu = {
  id: string;
  title: string;
  description: string;
};

export interface IMG {
  caption: string;
  src: string;
}

export interface IProject {
  img: IMG[] | IMG;
  content: string;
  title: string;
}

export type IProjectDetailData = IProject & { contents: IProject[] };
