import { useSearchParams } from "react-router-dom";

const useChangeURL = (): ((value: string) => void) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeURL = (value: string): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("current_page")) {
      params.set("current_page", value);
    } else {
      params.append("current_page", value);
    }

    setSearchParams(params.toString());
  };

  return changeURL;
};

export { useChangeURL };
