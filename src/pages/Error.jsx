import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-[3em]">
          <h1>Oops!</h1>
          <h2 className="text-orange-500">{error.status}</h2>
          <p>{error.statusText}</p>
        </div>
      );
    } else {
      return <div>Oops</div>;
    }
}
