import { Icon3dCubeSphere, IconFileUpload } from "@tabler/icons-react";

const pages = {
  id: "models",
  title: "Models",
  type: "group",
  children: [
    {
      id: "files",
      title: "Files",
      type: "item",
      url: "/files",
      icon: IconFileUpload
    },
    {
      id: "fine-tunes",
      title: "Fine-tunes",
      type: "item",
      url: "/fine-tunes",
      icon: Icon3dCubeSphere
    }
  ]
};

export default pages;
