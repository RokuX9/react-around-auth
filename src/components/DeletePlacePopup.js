import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {
  return (
    <PopupWithForm
      name="deleteLocation"
      header="Are you sure?"
      inputs={[
        {
          type: "hidden",
          name: "id",
          id: "location-id",
          value: props.formState.id,
        },
      ]}
      buttonText="Yes"
      isOpen={props.isOpen}
      formState={props.formState}
      initialState={props.initialState}
      setFormState={props.setFormState}
      submit={props.submit}
      closeAllPopups={props.closeAllPopups}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;
