import classNames from "classnames";
import { useEffect } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Input from "../../../Components/Input";
import { useAppDispatch, useAppSelector, usePermission } from "../../../hooks";
import route from "../../../route";
import { destroy, edit, paginate, searching, toggle } from "../../../Store/user";
import Form from "./Form";

export default function User() {
  const { search, paginator } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const permission = usePermission()

  useEffect(() => {
    dispatch(paginate())
  }, [])

  return (
    <>
      <Card>
        <Card.Header className={classNames("flex items-center space-x-2 p-2", {
          'justify-between': permission.has('create user'),
          'justify-end': !permission.has('create user'),
        })}>
          {permission.has('create user') && (
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
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Permission</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {paginator.data.map((user, i) => (
                  <tr key={i}>
                    <td className="text-center font-medium">{i + 1}</td>
                    <td className="w-24">
                      <div className="flex items-center justify-center w-20 h-20 border rounded-full">
                        {
                          user.profile_photo_url ?
                          (<img src={route('static', { path: user.profile_photo_url })} alt={user.name} className="object-cover object-center rounded-full" />) :
                          (<i className="mdi mdi-account text-5xl"></i>)
                        }
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{user.name}</td>
                    <td className="whitespace-nowrap">{user.email}</td>
                    <td className="whitespace-nowrap">{user.username}</td>
                    <td>
                      {user.roles.map((role, i) => (
                        <Button 
                          key={i}
                          className="bg-gray-100 m-[1px] cursor-default"
                        >
                          <p className="capitalize font-medium text-xs">
                            {role.name}
                          </p>
                        </Button>
                      ))}
                    </td>
                    <td>
                      {user.permissions.map((permission, i) => (
                        <Button 
                          key={i}
                          className="bg-gray-100 m-[1px] cursor-default"
                        >
                          <p className="capitalize font-medium text-xs">
                            {permission.name}
                          </p>
                        </Button>
                      ))}
                    </td>
                    <td className="w-0">
                      <div className="flex items-center space-x-1">
                        {permission.has('edit user') && (
                          <i 
                            onClick={() => {
                              dispatch(edit({
                                ...user,
                                password: '',
                                password_confirmation: '',
                                permissions: user.permissions.map(permission => permission.id) || [],
                                roles: user.roles.map(role => role.id),
                              }))
                            }}
                            className="mdi mdi-pencil bg-primary-0 hover:bg-primary-1 text-white rounded-md px-1 cursor-pointer" 
                          />
                        )}

                        {permission.has('delete user') && (
                          <i 
                            onClick={() => {
                              dispatch(destroy(user.id))
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