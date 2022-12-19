import { Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="font-sans antialiased flex flex-col items-center space-y-4 justify-center w-screen h-screen">
      <h1 className="text-[16rem] font-bold">404</h1>
      <div className="flex items-center justify-center">
        <Link to="/">
          <Tooltip content="Home">
            <i className="mdi mdi-home text-5xl"></i>
          </Tooltip>
        </Link>
      </div>
      <h3 className="text-5xl font-semibold capitalize">not found</h3>
    </div>
  )
}