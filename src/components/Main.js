import React from "react";
import Dash from "./Dash";
import Locations from "./Locations";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const userData = React.useContext(CurrentUserContext);
  return (
    <main>
      <Dash
        setDashInfoData={props.setDashInfoData}
        openAddLocationOverlay={props.openAddLocationOverlay}
        openDashImageOverlay={props.openDashImageOverlay}
        openDashInfoOverlay={props.openDashInfoOverlay}
        userData={userData}
      />
      <Locations
        handleLikePress={props.handleLikePress}
        openDeleteLocationOverlay={props.openDeleteLocationOverlay}
        setDeleteLocationData={props.setDeleteLocationData}
        setImageOverlayData={props.setImageOverlayData}
        openImageOverlay={props.openImageOverlay}
        locationsData={props.locationsData}
      />
    </main>
  );
}

export default Main;
