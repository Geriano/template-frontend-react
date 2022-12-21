import classNames from "classnames";
import { useEffect } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Input from "../../../Components/Input";
import { useAppDispatch, useAppSelector, usePermission } from "../../../hooks";
import { destroy, edit, paginate, searching, toggle } from "../../../Store/role";
import Form from "./Form";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Role() {
  const { search, paginator } = useAppSelector(state => state.role)
  const dispatch = useAppDispatch()
  const permission = usePermission()

  useEffect(() => {
    dispatch(paginate())
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
            Role
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Card>
        <Card.Header className={classNames("flex items-center space-x-2 p-2", {
          'justify-between': permission.has('create role'),
          'justify-end': !permission.has('create role'),
        })}>
          {permission.has('create role') && (
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
              value={search}
              onInput={e => {
                dispatch(searching(
                  (e.target as HTMLInputElement).value
                ))

                dispatch(paginate())
              }}
              color="gray-100"
              label="Search"
            />
          </div>
        </Card.Header>

        <div className="flex-wrap p-4">
          <div className="overflow-x-auto border rounded-md">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Permissions</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {paginator.data.map((role, i) => (
                  <tr key={i}>
                    <td className="text-center font-medium">{i + 1}</td>
                    <td className="whitespace-nowrap">{role.name}</td>
                    <td>
                      {role.permissions.map((permission, i) => (
                        <Button 
                          key={i}
                          className="bg-gray-100 m-[1px] cursor-default"
                        >
                          <p className="capitalize font-medium text-xs">
                            {permission.name}
                          </p>

                          {/* <i 
                            onClick={() => {
                              // 
                            }}
                            className="mdi mdi-delete bg-danger-0 hover:bg-danger-1 text-white rounded-md px-1 cursor-pointer" 
                          /> */}
                        </Button>
                      ))}
                    </td>

                    <td>
                      <div className="flex items-center space-x-1">
                        {permission.has('edit role') && (
                          <i 
                            onClick={() => {
                              dispatch(edit({
                                id: role.id,
                                name: role.name,
                                permissions: role.permissions.map(permission => permission.id),
                              }))
                            }}
                            className="mdi mdi-pencil bg-primary-0 hover:bg-primary-1 text-white rounded-md px-1 cursor-pointer" 
                          />
                        )}

                        {permission.has('delete role') && (
                          <i 
                            onClick={() => {
                              dispatch(destroy(role.id))
                                .unwrap()
                                .then(() => dispatch(paginate()))
                            }}
                            className="mdi mdi-delete bg-danger-0 hover:bg-danger-1 text-white rounded-md px-1 cursor-pointer" 
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Form />
    </>
  )
}