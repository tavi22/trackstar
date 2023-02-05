import React, { useContext } from "react";

const FoldersContext = React.createContext()

export function useFolders() {
    return useContext(FoldersContext)
}

export const FoldersProvider = ({children}) => {
    return children;
}