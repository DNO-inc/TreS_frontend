import { Dispatch, FC, SetStateAction } from "react";

import { FacultySelect } from "../FacultySelect";
import { SignUpTextField } from "../SignUpTextField";

interface PersonalInfoStepProps {
  firstname: string;
  setFirstname: Dispatch<SetStateAction<string>>;
  lastname: string;
  setLastname: Dispatch<SetStateAction<string>>;
  faculty: number | null;
  setFaculty: Dispatch<SetStateAction<number | null>>;
  isError: boolean;
}

const PersonalInfoStep: FC<PersonalInfoStepProps> = ({
  firstname,
  setFirstname,
  lastname,
  setLastname,
  faculty,
  setFaculty,
  isError,
}) => {
  return (
    <>
      <SignUpTextField
        type={"firstname"}
        value={firstname}
        setValue={setFirstname}
        hasError={isError}
      />
      <SignUpTextField
        type={"lastname"}
        value={lastname}
        setValue={setLastname}
        hasError={isError}
      />
      <FacultySelect
        faculty={faculty}
        setFaculty={setFaculty}
        isError={isError}
      />
    </>
  );
};

export { PersonalInfoStep };
