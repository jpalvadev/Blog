import { createContext, useContext, useState } from 'react';

// createContext returns an object, this is the object that holds the state and we are going to export it.
export const AppContext = createContext();

// we are going to create a custom hook so we can avoid the import of useContext in every file
// The goal of this custom hook is to avoid doing this in every file that needs the context
// import { useContext } from 'react';
// import { TaskContext } from '../context/taskContext';
// Now we can replace the 2 lines from above with this one simgle line
// import {useTasks} from '../context/taskContext';

export const useAppContext = () => {
  // the variable context will now have the context. This variable is what will be using to export
  return useContext(AppContext);
};

// returns a component. This component will have other components inside it, (children).
export const AppProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [titleString, setTitleString] = useState('');
  const [showBackground, setShowBackground] = useState(false);
  const [backgroundString, setBackgroundString] = useState('');

  return (
    <AppContext.Provider
      value={{
        showSearch,
        setShowSearch,
        showCategoryList,
        setShowCategoryList,
        showPlayer,
        setShowPlayer,
        showTitle,
        setShowTitle,
        titleString,
        setTitleString,
        showBackground,
        setShowBackground,
        backgroundString,
        setBackgroundString,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
