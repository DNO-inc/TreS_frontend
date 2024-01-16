import { useSearchParams } from "react-router-dom";

import { urlKeys } from "../../constants";

const useChangeURL = (): ((
  urlKey: string,
  value: string,
  isReturnToStart?: boolean
) => void) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeURL = (
    urlKey: string,
    value: string,
    isReturnToStart: boolean = false
  ): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has(urlKey)) {
      params.set(urlKey, value);
    } else {
      params.append(urlKey, value);
    }

    if (isReturnToStart) {
      if (params.has(urlKeys.CURRENT_PAGE)) {
        params.set(urlKeys.CURRENT_PAGE, "1");
      } else {
        params.append(urlKeys.CURRENT_PAGE, "1");
      }
    }

    setSearchParams(params.toString());
  };

  return changeURL;
};

export { useChangeURL };
