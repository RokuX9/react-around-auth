import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  return (
    <PopupWithForm
      name="dashImage"
      header="Change profile picture"
      inputs={[
        {
          type: "url",
          placeHolder: "Avatar Image Link",
          name: "avatar",
          id: "dash-image",
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

export default EditAvatarPopup;
