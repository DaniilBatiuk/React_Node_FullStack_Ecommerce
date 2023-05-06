import { useRouteError } from "react-router-dom";

interface ErrorType {
  status: number;
  statusText: string;
  error: {
    message: string;
  };
}

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  if (typeof error !== "object" || error === null) {
    return (
      <>
        <h2>Oops!</h2>
        <div>The page requested not found!</div>
      </>
    );
  }

  return (
    <>
      <h2>Oops!</h2>
      <div>The page requested not found!</div>
      {error && (
        <>
          <div>
            {(error as ErrorType).status}. {(error as ErrorType).statusText}
          </div>
          <div>
            <i>{(error as ErrorType).error.message}</i>
          </div>
        </>
      )}
    </>
  );
}
