import React from "react"
import Topbar from "./Topbar"

export default function Main({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <Topbar />

      <main className="flex flex-col space-y-4 px-4 py-6">
        {children}
      </main>
    </div>
  )
}