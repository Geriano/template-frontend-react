import route from "../route";

export default function Dashboard() {
  return (
    <h1 className="text-7xl text-red-500">
      {route('permission.update', {
        id: 2
      })}
    </h1>
  )
}