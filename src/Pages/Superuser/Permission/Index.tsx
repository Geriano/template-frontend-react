import classNames from "classnames";
import { useEffect } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Input from "../../../Components/Input";
import { useAppDispatch, useAppSelector, usePermission } from "../../../hooks";
import { all, destroy, edit, searching, toggle } from "../../../Store/permission";
import Form from "./Form";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Permission() {
  const { processing, search, permissions } = useAppSelector(state => state.permission)
  const dispatch = useAppDispatch()
  const permission = usePermission()

  useEffect(() => {
    if (!processing) {
      dispatch(all())
    }
  }, [])

  return (
    <>
      <div className="flex items-center justify-end">
        <Breadcrumb className="w-fit">
          <Link to="/">
            <Breadcrumb.Item icon={() => <i className="mdi mdi-home mr-1"></i>}>
              Home
            </Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item href="#">
            Builtin
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Permission
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Card>
        <Card.Header className={classNames("flex items-center space-x-2 p-2", {
          'justify-between': permission.has('create permission'),
          'justify-end': !permission.has('create permission'),
        })}>
          {permission.has('create permission') && (
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
          )}

          <div className="w-full max-w-xs">
            <Input 
              onInput={e => {
                dispatch(searching(
                  (e.target as HTMLInputElement).value
                ))
              }}
              color="gray-100"
              label="Search"
            />
          </div>
        </Card.Header>

        <div className="flex-wrap p-4">
          {permissions.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
            <Button 
              key={i}
              className="bg-gray-100 m-[1px] cursor-default"
            >
              {permission.has('edit permission') && (
                <i 
                  onClick={() => {
                    dispatch(edit(p))
                  }}
                  className="mdi mdi-pencil bg-primary-0 hover:bg-primary-1 text-white rounded-md px-1 cursor-pointer" 
                />
              )}

              <p className="capitalize font-medium">
                {p.name}
              </p>

              {permission.has('delete permission') && (
                <i 
                  onClick={() => {
                    dispatch(destroy(p.id))
                      .unwrap()
                      .finally(() => {
                        dispatch(all())
                      })
                  }}
                  className="mdi mdi-delete bg-danger-0 hover:bg-danger-1 text-white rounded-md px-1 cursor-pointer" 
                />
              )}
            </Button>
          ))}
        </div>
      </Card>

      <Form />
    </>
  )
}