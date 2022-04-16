import React, {createContext, useState, useContext} from 'react';

const DrawerContext = createContext();

function DrawerContextProvider({children}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const[listOpen, setListOpen] = useState(false);

    const handleDrawer = (val) => {
        setDrawerOpen(val);
    }

    const handleListOpen = (val) => {
        setListOpen(val);
    }

    return (
        <DrawerContext.Provider value={{drawerOpen, handleDrawer, listOpen, handleListOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}

function useDrawerContext() {
    return useContext(DrawerContext)
}


export { DrawerContextProvider, useDrawerContext};