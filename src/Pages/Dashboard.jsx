import route from "../route";

export default function Dashboard() {
  return (
    <h1 className="text-7xl text-red-500">
      {route('user', 'paginate')}
    </h1>
  )
}