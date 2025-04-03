export type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  stacks: string[];
  menu: IMenu[];
};

export interface IMenu {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface IMG {
  caption: string;
  src: string;
}

export interface IProject {
  img: IMG[] | IMG;
  content: string;
  title: string;
}

export type IProjectDetailData = IProject & {
  contents: IProject[];
  stacks: string[];
};
