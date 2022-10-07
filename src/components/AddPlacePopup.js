import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  return (
    <PopupWithForm
      name="addLocation"
      header="New Place"
      inputs={[
        {
          type: "text",
          placeHolder: "Location Name",
          name: "name",
          minLength: 1,
          maxLength: 30,
          id: "location-name",
          value: props.formState.name,
        },
        {
          type: "url",
          placeHolder: "Location image URL",
          name: "link",
          id: "location-url",
          value: props.formState.url,
        },
      ]}
      buttonText="Save"
      isOpen={props.isOpen}
      formState={props.formState}
      initialState={props.initialState}
      setFormState={props.setFormState}
      submit={props.submit}
      closeAllPopups={props.closeAllPopups}
    ></PopupWithForm>
  );
}

export default AddPlacePopup;
