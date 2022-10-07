import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    props.setFormState({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="dashInfo"
      header="Edit Profile"
      inputs={[
        {
          type: "text",
          placeHolder: "Name",
          name: "name",
          minLength: 2,
          maxLength: 40,
          id: "dash-name",
          value: props.formState.name,
        },
        {
          type: "text",
          placeHolder: "About",
          name: "about",
          minLength: 2,
          maxLength: 200,
          id: "dash-subtitle",
          value: props.formState.about,
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

export default EditProfilePopup;
