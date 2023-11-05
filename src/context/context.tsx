import React from "react";

// @ts-ignore
const ProjectContext = React.createContext();

export const ProjectProvider = ProjectContext.Provider;
export const ProjectConsumer = ProjectContext.Consumer;

export default ProjectContext;