import { useEffect } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { all, destroy, edit, toggle } from "../../../Store/permission";
import Form from "./Form";

export default function Permission() {
  const { processing, search, permissions } = useAppSelector(state => state.permission)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!processing) {
      dispatch(all())
    }
  }, [])

  return (
    <>
      <Card>
        <Card.Header className="flex items-center space-x-2 p-2">
          <Button.Success 
            onClick={() => {
              dispatch(toggle(true))
            }}
          >
            <i className="mdi mdi-plus" />
            <p className="capitalize font-medium">
              create
            </p>
          </Button.Success>
        </Card.Header>

        <div className="flex-wrap p-4">
          {permissions.filter(permission => permission.name.toLowerCase().includes(search.toLowerCase())).map((permission, i) => (
            <Button 
              key={i}
              className="bg-gray-100 m-[1px] cursor-default"
            >
              <i 
                onClick={() => {
                  dispatch(edit(permission))
                }}
                className="mdi mdi-pencil bg-primary-0 hover:bg-primary-1 text-white rounded-md px-1 cursor-pointer" 
              />

              <p className="capitalize font-medium">
                {permission.name}
              </p>

              <i 
                onClick={() => {
                  dispatch(destroy(permission.id))
                    .unwrap()
                    .finally(() => {
                      dispatch(all())
                    })
                }}
                className="mdi mdi-delete bg-danger-0 hover:bg-danger-1 text-white rounded-md px-1 cursor-pointer" 
              />
            </Button>
          ))}
        </div>
      </Card>

      <Form />
    </>
  )
}