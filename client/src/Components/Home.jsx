import React from "react";
import AddNote from "./AddNote";
import  Notes  from "./Notes";

export const Home = (props) => {
  const {showAlert}=props
  return (
    <>
     <AddNote showAlert={showAlert}/>
      {/* <Notes showAlert={showAlert}/> */}
    </>
  );
};

export default Home;
