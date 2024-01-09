import { Dispatch, FC, SetStateAction } from "react";

import { FacultySelect } from "../FacultySelect";
import { SignUpTextField } from "../SignUpTextField";
import { ISignUpData } from "../../SignUpModal";

interface PersonalInfoStepProps {
  signUpData: ISignUpData;
  setSignUpData: Dispatch<SetStateAction<ISignUpData>>;
  isError: boolean;
}

const ACTION_TYPES = {
  FIRSTNAME: "firstname",
  LASTNAME: "lastname",
};

const PersonalInfoStep: FC<PersonalInfoStepProps> = ({
  signUpData,
  setSignUpData,
  isError,
}) => {
  return (
    <>
      <SignUpTextField
        type={ACTION_TYPES.FIRSTNAME}
        value={signUpData.firstname}
        setValue={setSignUpData}
        hasError={isError}
      />
      <SignUpTextField
        type={ACTION_TYPES.LASTNAME}
        value={signUpData.lastname}
        setValue={setSignUpData}
        hasError={isError}
      />
      <FacultySelect
        faculty={signUpData.faculty}
        setFaculty={setSignUpData}
        isError={isError}
      />
    </>
  );
};

export { PersonalInfoStep };
